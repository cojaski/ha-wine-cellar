"""Wine lookup via Vivino, UPC Item DB, and Open Food Facts."""

from __future__ import annotations

import asyncio
import json
import logging
import re
from html import unescape
from typing import Any
from urllib.parse import quote_plus

import aiohttp

from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

VIVINO_SEARCH_URL = "https://www.vivino.com/search/wines?q={query}"
OFF_API_URL = "https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
UPC_DB_URL = "https://api.upcitemdb.com/prod/trial/lookup?upc={barcode}"

# Vivino's mobile-app-facing backend. Unlike the site's search (broken for
# automated `q` queries) and HTML scraping (price is boilerplate/fake), this
# needs no special headers, cookies, or session — but still has no price
# endpoint. Only useful once a wine's id is already known from a prior
# match; it's a by-id lookup, not a search.
VIVINO_MOBILE_API_URL = "https://api.vivino.com"

# Small, stable reference tables — fetched/cached once per process instead
# of per-wine. Grape names are proper nouns (Grenache, Syrah...) that don't
# meaningfully vary by language, but food names very much do ("Vegetarian"
# vs "Végétarien") — keyed by (language, id) so a first fetch in one
# language doesn't permanently poison every other language for the rest of
# the process's life.
_GRAPE_NAME_CACHE: dict[int, str] = {}
_FOOD_NAME_CACHE: dict[tuple[str, int], str] = {}

# Vivino itself knows no whisky, but the generic barcode databases it falls
# back to (Open Food Facts, UPC Item DB) do. These words in a product title
# or category mark the hit as type "whisky" instead of the default "red".
WHISKY_KEYWORDS = ("whisky", "whiskey", "bourbon", "scotch", "single malt")


def _looks_like_whisky(text: str) -> bool:
    text = text.lower()
    return any(kw in text for kw in WHISKY_KEYWORDS)


# The mobile API's region.country is a bare ISO code ("fr"), not a display
# name — common wine-producing countries only, good enough since region/
# country are always-overwrite fields on a manual refresh (see
# ws_refresh_wine), so a stale name from before this map existed still
# gets corrected. Keyed by the country code, then by the configured
# metadata language — a name that comes back in the wrong language means
# the exact same country ends up as two different filter entries in the
# app (English from here, French from Gemini's already-localized output),
# so this must track _language_prefix's language set.
COUNTRY_CODE_NAMES: dict[str, dict[str, str]] = {
    "fr": {"en": "France", "fr": "France"},
    "it": {"en": "Italy", "fr": "Italie"},
    "es": {"en": "Spain", "fr": "Espagne"},
    "pt": {"en": "Portugal", "fr": "Portugal"},
    "de": {"en": "Germany", "fr": "Allemagne"},
    "at": {"en": "Austria", "fr": "Autriche"},
    "ch": {"en": "Switzerland", "fr": "Suisse"},
    "us": {"en": "United States", "fr": "États-Unis"},
    "ca": {"en": "Canada", "fr": "Canada"},
    "mx": {"en": "Mexico", "fr": "Mexique"},
    "au": {"en": "Australia", "fr": "Australie"},
    "nz": {"en": "New Zealand", "fr": "Nouvelle-Zélande"},
    "ar": {"en": "Argentina", "fr": "Argentine"},
    "cl": {"en": "Chile", "fr": "Chili"},
    "uy": {"en": "Uruguay", "fr": "Uruguay"},
    "za": {"en": "South Africa", "fr": "Afrique du Sud"},
    "gr": {"en": "Greece", "fr": "Grèce"},
    "hu": {"en": "Hungary", "fr": "Hongrie"},
    "ge": {"en": "Georgia", "fr": "Géorgie"},
    "gb": {"en": "United Kingdom", "fr": "Royaume-Uni"},
    "uk": {"en": "United Kingdom", "fr": "Royaume-Uni"},
}


def _country_name(code: str, language: str) -> str:
    names = COUNTRY_CODE_NAMES.get((code or "").lower())
    if not names:
        return ""
    return names.get(language) or names["en"]


# Reverse of COUNTRY_CODE_NAMES's English name, for sources that hand back a
# plain country name instead of an ISO code — Open Food Facts does this, in
# whatever language its own product data happens to be tagged in (usually
# English), regardless of the language this integration is configured for.
_EN_COUNTRY_NAME_TO_TRANSLATIONS = {
    names["en"].lower(): names for names in COUNTRY_CODE_NAMES.values()
}


def _translate_country_name(name: str, language: str) -> str:
    """Best-effort translation of a plain (usually English) country name.

    Falls back to the name as given for anything not in the small
    wine-producing-country table above — better than an error, and no
    worse than what came in.
    """
    if not name or language == "en":
        return name
    # A multi-value field ("Italy,France") only ever needs its first entry
    # translated — the rest is unusual enough for a wine that guessing
    # further would do more harm than good.
    first = name.split(",")[0].strip()
    names = _EN_COUNTRY_NAME_TO_TRANSLATIONS.get(first.lower())
    return names.get(language, name) if names else name


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
    ),
    "Accept": "application/json",
}

# Without an explicit Accept-Language, Vivino's HTML page (food pairings,
# description) comes back server-side-localized based on IP/session
# heuristics rather than a fixed language — pin it to whatever the user has
# picked instead of leaving it to chance.
ACCEPT_LANGUAGE_BY_CODE = {
    "en": "en-US,en;q=0.9",
    "fr": "fr-FR,fr;q=0.9,en;q=0.5",
    "de": "de-DE,de;q=0.9,en;q=0.5",
}


def _accept_language(language: str) -> str:
    return ACCEPT_LANGUAGE_BY_CODE.get(language, ACCEPT_LANGUAGE_BY_CODE["en"])


def _prefer_matching_type(
    results: list[dict[str, Any]], wine_type: str | None
) -> list[dict[str, Any]]:
    """Reorder results to put ones matching the wine's own type first.

    The same producer can sell a Bronzinelle (say) as a red, a rosé and a
    white under the identical name — nothing in the query text tells those
    three apart, so without this
    Vivino's own ranking decides which one comes back, and a red can
    silently pick up a rosé's rating, photo and tasting notes. Reorders
    rather than filters, for the same reason _prefer_matching_vintage
    does: a type Vivino doesn't have indexed under that exact name is
    still a better fallback than nothing.
    """
    if not wine_type or not results:
        return results
    matching = [r for r in results if r.get("type") == wine_type]
    if not matching or len(matching) == len(results):
        return results
    non_matching = [r for r in results if r.get("type") != wine_type]
    return matching + non_matching


def _prefer_matching_vintage(
    results: list[dict[str, Any]], vintage: int | None
) -> list[dict[str, Any]]:
    """Reorder results to put an exact vintage match first, if one exists.

    Vivino's search commonly returns several vintages of the same wine —
    each has its own rating/price/photo — and the query text alone doesn't
    guarantee the best-ranked result is the one for the wine's actual
    vintage. Reorders rather than filters: the rest are kept as fallback so
    a wine whose exact vintage isn't indexed still gets a close match.
    """
    if not vintage or not results:
        return results
    for i, r in enumerate(results):
        if r.get("vintage") == vintage:
            if i == 0:
                return results
            return [r] + results[:i] + results[i + 1:]
    return results


class VivinoClient:
    """Client for looking up wine data from multiple sources."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the client."""
        self._hass = hass

    async def lookup_barcode(self, barcode: str, language: str = "en") -> dict[str, Any] | None:
        """Look up a wine by barcode using multiple sources.

        The two barcode databases are asked at the same time and the answer is
        then picked by preference, not by whichever replied first — UPC Item DB
        still wins over Open Food Facts. They used to be tried one after the
        other, so a barcode neither of them knew paid both waits end to end
        before anything else could happen. That is the common case for wine:
        most bottles are not in a grocery barcode database, and the caller
        falls back to photographing the label, so the "no match" verdict is
        worth reaching quickly.

        Vivino's HTML search stays out of that pair deliberately. It is the
        slow one and it rarely recognises a barcode at all, so firing it every
        time would add a heavy request to every successful scan to save a
        rounding error on the rare one it answers.
        """
        upc_result, off_result = await asyncio.gather(
            self._lookup_upc_itemdb(barcode),
            self._search_open_food_facts(barcode, language),
            return_exceptions=True,
        )
        for result in (upc_result, off_result):
            if result and not isinstance(result, BaseException):
                return result

        html_results = await self._search_vivino_html(barcode, language)
        if html_results:
            return html_results[0]

        _LOGGER.warning("No results found for barcode: %s", barcode)
        return None

    # ── Vivino Mobile API (by-id lookup) ──────────────────────────────

    async def get_wine_by_id(
        self, vivino_id: int, vintage: int | None = None, language: str = "en"
    ) -> dict[str, Any] | None:
        """Look up a wine directly by its Vivino wine id.

        Far more reliable than text search for a wine we've already
        matched once (no query ambiguity, no relevance guessing) — but
        it's a lookup, not a search, so it only helps once `vivino_id` is
        already known. Still has no price data.
        """
        session = async_get_clientsession(self._hass)
        try:
            timeout = aiohttp.ClientTimeout(total=15)
            async with session.get(
                f"{VIVINO_MOBILE_API_URL}/wines/{vivino_id}",
                headers={"Accept": "application/json", "Accept-Language": _accept_language(language)},
                timeout=timeout,
            ) as resp:
                if resp.status != 200:
                    _LOGGER.debug(
                        "Vivino mobile API status %s for wine id %s", resp.status, vivino_id
                    )
                    return None
                wine_data = await resp.json()
        except Exception as err:
            _LOGGER.debug("Vivino mobile API wine lookup failed for id %s: %s", vivino_id, err)
            return None

        winery = (wine_data.get("winery") or {}).get("name", "")
        region_obj = wine_data.get("region") or {}
        region = region_obj.get("name", "")
        country = _country_name(region_obj.get("country") or "", language)
        wine_type = _map_wine_type(wine_data.get("type_id"))
        stats = wine_data.get("statistics") or {}
        rating = stats.get("ratings_average")
        if rating and isinstance(rating, (int, float)) and rating > 0:
            rating = round(float(rating), 1)
        else:
            rating = None

        # Find the entry for the wine's actual vintage year, if given —
        # the wine-level id/statistics above are aggregated across every
        # vintage, but image/description/alcohol/grapes are per-vintage.
        vintage_id = None
        if vintage:
            for v in wine_data.get("vintages") or []:
                if str(v.get("year")) == str(vintage):
                    vintage_id = v.get("id")
                    break

        result: dict[str, Any] = {
            "name": wine_data.get("name", ""),
            "winery": winery,
            "region": region,
            "country": country,
            "vintage": vintage,
            "type": wine_type,
            "grape_variety": "",
            "rating": rating,
            "ratings_count": stats.get("ratings_count"),
            "image_url": "",
            "price": None,
            "alcohol": "",
            "description": "",
            "food_pairings": "",
            "vivino_id": vivino_id,
            "source": "vivino_api",
        }

        if vintage_id:
            result.update(await self._get_vintage_details(vintage_id, language))

        return result

    async def _get_vintage_details(self, vintage_id: int, language: str = "en") -> dict[str, Any]:
        """Fetch vintage-specific extras: image, description, alcohol, grapes, food."""
        session = async_get_clientsession(self._hass)
        details: dict[str, Any] = {}
        try:
            timeout = aiohttp.ClientTimeout(total=15)
            async with session.get(
                f"{VIVINO_MOBILE_API_URL}/vintages/{vintage_id}",
                headers={"Accept": "application/json", "Accept-Language": _accept_language(language)},
                timeout=timeout,
            ) as resp:
                if resp.status != 200:
                    return details
                data = await resp.json()
        except Exception as err:
            _LOGGER.debug("Vivino mobile API vintage lookup failed for id %s: %s", vintage_id, err)
            return details

        image_url = (data.get("image") or {}).get("location", "")
        if image_url:
            if image_url.startswith("//"):
                image_url = "https:" + image_url
            details["image_url"] = image_url

        description = data.get("description") or ""
        if description:
            details["description"] = description

        wine_facts = data.get("wine_facts") or {}
        alcohol = wine_facts.get("alcohol")
        if alcohol and isinstance(alcohol, (int, float)) and alcohol > 0:
            details["alcohol"] = f"{alcohol}%"

        wine_obj = data.get("wine") or {}

        grape_composition = data.get("grape_composition") or {}
        if grape_composition:
            grape_parts = await self._resolve_grape_composition(grape_composition)
            if grape_parts:
                details["grape_variety"] = ", ".join(grape_parts)

        food_ids = wine_obj.get("foods") or []
        if food_ids:
            food_names = await self._resolve_food_names(food_ids, language)
            if food_names:
                details["food_pairings"] = ", ".join(food_names)

        return details

    async def _resolve_grape_composition(self, composition: dict[str, Any]) -> list[str]:
        """Resolve grape ids to names, prefixed with blend % for actual blends.

        `composition` is `{grape_id: percent}`. A single-grape wine just
        shows the name ("Merlot"); a blend shows each share ("70% Cabernet
        Sauvignon, 30% Merlot") sorted by descending percentage.
        """
        entries = sorted(
            composition.items(), key=lambda kv: -(kv[1] or 0)
        )
        show_percent = len(entries) > 1
        wanted: list[tuple[int, Any]] = []
        for gid_str, pct in entries[:5]:
            try:
                wanted.append((int(gid_str), pct))
            except (TypeError, ValueError):
                continue
        if not wanted:
            return []

        # One request per grape, asked together rather than one after the
        # other: a five-grape blend used to serialise five round trips to
        # build one string. Results stay in blend order regardless of which
        # replies first.
        names = await asyncio.gather(
            *(self._resolve_grape_name(gid) for gid, _ in wanted),
            return_exceptions=True,
        )

        parts: list[str] = []
        for (_, pct), name in zip(wanted, names):
            if not name or isinstance(name, BaseException):
                continue
            parts.append(f"{pct:g}% {name}" if show_percent and pct else name)
        return parts

    async def _resolve_grape_name(self, gid: int) -> str | None:
        """Resolve a single grape id to its name (cached)."""
        if gid in _GRAPE_NAME_CACHE:
            return _GRAPE_NAME_CACHE[gid]
        session = async_get_clientsession(self._hass)
        try:
            timeout = aiohttp.ClientTimeout(total=10)
            async with session.get(
                f"{VIVINO_MOBILE_API_URL}/grapes/{gid}",
                headers={"Accept": "application/json"},
                timeout=timeout,
            ) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    name = data.get("name")
                    if name:
                        _GRAPE_NAME_CACHE[gid] = name
                        return name
        except Exception as err:
            _LOGGER.debug("Vivino grape lookup failed for id %s: %s", gid, err)
        return None

    async def _resolve_food_names(self, food_ids: list[int], language: str = "en") -> list[str]:
        """Resolve food ids to names via the small (~20-entry) foods table."""
        if not any((language, fid) in _FOOD_NAME_CACHE for fid in food_ids):
            session = async_get_clientsession(self._hass)
            try:
                timeout = aiohttp.ClientTimeout(total=10)
                async with session.get(
                    f"{VIVINO_MOBILE_API_URL}/foods",
                    headers={"Accept": "application/json", "Accept-Language": _accept_language(language)},
                    timeout=timeout,
                ) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        for item in data:
                            if item.get("id") is not None and item.get("name"):
                                _FOOD_NAME_CACHE[(language, item["id"])] = item["name"]
            except Exception as err:
                _LOGGER.debug("Vivino foods table fetch failed: %s", err)
        return [_FOOD_NAME_CACHE[(language, fid)] for fid in food_ids if (language, fid) in _FOOD_NAME_CACHE]

    async def search_wine(
        self,
        query: str,
        language: str = "en",
        currency: str = "USD",
        vintage: int | None = None,
        wine_type: str | None = None,
    ) -> list[dict[str, Any]]:
        """Search for wines by name/text query, via the HTML search page.

        This used to try Vivino's explore API first, for its prices. That API
        ignores `q` entirely for unauthenticated requests — the same five
        trending wines come back for any query, "zzqx nonsense" included
        (re-confirmed live 2026-10-04) — so every field it returned, price
        included, belonged to some trending bottle, not the one searched for.
        The word-overlap guard meant to catch that let a trending wine
        through whenever it shared a grape name with the query ("Cabernet
        Sauvignon"), writing its price, rating, photo and vivino_id onto an
        unrelated wine — and onto every other wine that hit the same trending
        bottle. The HTML page does real text search and returns everything the
        explore API did except price, which Vivino offers nowhere reliably;
        callers already fall back to an AI estimate when `price` is None.

        `currency` is accepted for call-site compatibility only; nothing here
        is priced. `vintage`/`wine_type`, when given, reorder results so an
        exact match is used instead of whatever Vivino ranked first.
        """
        results = await self._search_vivino_html(query, language)
        results = _prefer_matching_type(results, wine_type)
        return _prefer_matching_vintage(results, vintage)

    # ── Vivino HTML Search (scrape) ──────────────────────────────────

    async def _search_vivino_html(self, query: str, language: str = "en") -> list[dict[str, Any]]:
        """Search Vivino by scraping the HTML search results page."""
        session = async_get_clientsession(self._hass)

        try:
            url = VIVINO_SEARCH_URL.format(query=quote_plus(query))
            timeout = aiohttp.ClientTimeout(total=15)
            headers = {**HEADERS, "Accept": "text/html", "Accept-Language": _accept_language(language)}

            async with session.get(
                url, headers=headers, timeout=timeout, allow_redirects=True
            ) as resp:
                if resp.status != 200:
                    _LOGGER.debug("Vivino HTML search status %s", resp.status)
                    return []

                html_text = await resp.text()

                # Vivino embeds wine data as HTML-encoded JSON in React component props
                results = _parse_vivino_html(html_text)
                if results:
                    _LOGGER.debug(
                        "Vivino HTML search found %d results", len(results)
                    )
                    return results

        except Exception as err:
            _LOGGER.debug("Vivino HTML search error: %s", err)

        return []

    # ── UPC Item DB ──────────────────────────────────────────────────

    async def _lookup_upc_itemdb(self, barcode: str) -> dict[str, Any] | None:
        """Look up barcode via UPC Item DB (free trial API)."""
        session = async_get_clientsession(self._hass)

        try:
            url = UPC_DB_URL.format(barcode=barcode)
            timeout = aiohttp.ClientTimeout(total=10)
            async with session.get(url, timeout=timeout) as resp:
                if resp.status != 200:
                    _LOGGER.debug("UPC Item DB status %s for %s", resp.status, barcode)
                    return None

                data = await resp.json()
                items = data.get("items", [])
                if not items:
                    return None

                item = items[0]
                title = item.get("title", "")
                brand = item.get("brand", "")

                if not title:
                    return None

                # Check if this looks like a wine product
                title_lower = title.lower()
                wine_keywords = [
                    "wine",
                    "cabernet",
                    "merlot",
                    "chardonnay",
                    "pinot",
                    "sauvignon",
                    "blend",
                    "red",
                    "white",
                    "rosé",
                    "rose",
                    "champagne",
                    "prosecco",
                    "brut",
                    "750ml",
                    "bottle",
                ]
                is_wine = any(kw in title_lower for kw in wine_keywords)
                is_whisky = _looks_like_whisky(title_lower)
                if not is_wine and not is_whisky:
                    _LOGGER.debug(
                        "UPC Item DB result doesn't look like wine: %s", title
                    )
                    return None

                # Infer wine type from title
                wine_type = "red"
                if is_whisky:
                    wine_type = "whisky"
                elif "white" in title_lower or "chardonnay" in title_lower:
                    wine_type = "white"
                elif "rosé" in title_lower or "rose" in title_lower:
                    wine_type = "rosé"
                elif any(
                    kw in title_lower
                    for kw in ["sparkling", "champagne", "prosecco", "brut"]
                ):
                    wine_type = "sparkling"

                # Try to extract vintage from title
                vintage = None
                year_match = re.search(r"\b(19|20)\d{2}\b", title)
                if year_match:
                    vintage = int(year_match.group())

                return {
                    "name": title,
                    "winery": brand,
                    "region": "",
                    "country": "",
                    "vintage": vintage,
                    "type": wine_type,
                    "grape_variety": "",
                    "rating": None,
                    "image_url": "",
                    "price": None,
                    "source": "upc_itemdb",
                }

        except Exception as err:
            _LOGGER.debug("UPC Item DB error: %s", err)

        return None

    # ── Open Food Facts ──────────────────────────────────────────────

    async def _search_open_food_facts(self, barcode: str, language: str = "en") -> dict[str, Any] | None:
        """Fall back to Open Food Facts for barcode lookup."""
        session = async_get_clientsession(self._hass)

        try:
            # Try both the original and zero-padded barcode
            for bc in [barcode, barcode.zfill(13)]:
                url = OFF_API_URL.format(barcode=bc)
                timeout = aiohttp.ClientTimeout(total=10)
                async with session.get(url, timeout=timeout) as resp:
                    if resp.status != 200:
                        continue

                    data = await resp.json()
                    if data.get("status") != 1:
                        continue

                    product = data.get("product") or {}
                    name = product.get("product_name", "")
                    if not name:
                        continue

                    brand = product.get("brands", "")
                    categories = product.get("categories", "").lower()
                    image = product.get("image_url", "")
                    origin = product.get("origins", "")
                    country = _translate_country_name(product.get("countries", ""), language)

                    wine_type = "red"
                    if _looks_like_whisky(categories) or _looks_like_whisky(name):
                        wine_type = "whisky"
                    elif "white" in categories or "blanc" in categories:
                        wine_type = "white"
                    elif "rosé" in categories or "rose" in categories:
                        wine_type = "rosé"
                    elif "sparkling" in categories or "champagne" in categories:
                        wine_type = "sparkling"

                    vintage = None
                    year_match = re.search(r"(19|20)\d{2}", name)
                    if year_match:
                        vintage = int(year_match.group())

                    return {
                        "name": name,
                        "winery": brand,
                        "region": origin,
                        "country": country,
                        "vintage": vintage,
                        "type": wine_type,
                        "grape_variety": "",
                        "rating": None,
                        "image_url": image,
                        "price": None,
                        "source": "open_food_facts",
                    }

        except Exception as err:
            _LOGGER.debug("Open Food Facts lookup error: %s", err)

        return None


# The search page embeds JSON inside HTML, and these fields are pulled out of
# it by regex rather than parsed. That means the captured text still carries
# JSON escapes — \u00e2 for â, \" for a quote, \/ for a slash — which nothing
# decoded, so a French winery reached the cellar spelled "Ch\u00e2teau".
_JSON_STR = r'((?:[^"\\]|\\.)*)'


def _json_text(value: str) -> str:
    """Decode a JSON string body captured by regex."""
    if "\\" not in value:
        return value
    try:
        decoded = json.loads(f'"{value}"')
    except (json.JSONDecodeError, ValueError):
        return value
    return decoded if isinstance(decoded, str) else value


def _as_float(value: str) -> float | None:
    """A number, or None — the pattern that finds these accepts "4.5.6"."""
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _as_int(value: str) -> int | None:
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _parse_vivino_html(html: str) -> list[dict[str, Any]]:
    """Extract wine results from Vivino's HTML search page.

    Vivino embeds wine data as JSON in the HTML. We extract up to 5
    wine results using regex patterns against the decoded HTML.
    """
    results: list[dict[str, Any]] = []
    try:
        decoded = unescape(html)

        # Find wines via "seo_name":"slug","name":"Wine Name" pattern
        wine_iter = list(re.finditer(
            rf'"seo_name":"{_JSON_STR}","name":"{_JSON_STR}"', decoded
        ))
        if not wine_iter:
            return []

        seen_names: set[str] = set()

        for idx, match in enumerate(wine_iter[:10]):  # scan up to 10, keep up to 5
            wine_name = _json_text(match.group(2))

            # Skip duplicates
            if wine_name in seen_names:
                continue
            seen_names.add(wine_name)

            # The slice of page this wine's fields are read from. It used to
            # reach 200 characters past where the next wine's entry begins,
            # and back into the previous one — so a wine missing a winery or
            # a rating silently picked up its neighbour's. Confirmed on a
            # synthetic page: the first wine came back with the second one's
            # producer. Bounded by the neighbours now.
            lower = wine_iter[idx - 1].end() if idx else 0
            start = max(lower, match.start() - 200)
            if idx + 1 < len(wine_iter):
                end = wine_iter[idx + 1].start()
            else:
                end = min(len(decoded), match.end() + 3000)
            segment = decoded[start:end]

            # Extract vintage from wine name
            vintage = None
            year_match = re.search(r"\b(19|20)\d{2}\b", wine_name)
            if year_match:
                vintage = int(year_match.group())

            # Extract winery name
            winery = ""
            winery_match = re.search(
                rf'"winery":{{"id":\d+,"name":"{_JSON_STR}"', segment
            )
            if winery_match:
                winery = _json_text(winery_match.group(1))

            # Extract region name
            region = ""
            region_match = re.search(
                rf'"region":{{"id":\d+,"name":"{_JSON_STR}"', segment
            )
            if region_match:
                region = _json_text(region_match.group(1))

            # Extract country name
            country = ""
            country_match = re.search(
                rf'"country":{{"code":"[^"]*","name":"{_JSON_STR}"', segment
            )
            if country_match:
                country = _json_text(country_match.group(1))

            # Extract wine type
            type_match = re.search(r'"type_id":(\d+)', segment)
            wine_type = _map_wine_type(
                _as_int(type_match.group(1)) if type_match else None
            )

            # Extract rating
            rating = None
            for pattern in [r'"wine_ratings_average":([\d.]+)',
                            r'"ratings_average":([\d.]+)']:
                m = re.search(pattern, segment)
                if m:
                    val = _as_float(m.group(1))
                    if val and val > 0:
                        rating = round(val, 1)
                        break

            # Extract image URL
            image_url = ""
            for img_pattern in [
                r'"location":"((?:https?:)?//[^"]+images\.vivino\.com[^"]+)"',
                r'"image":\{"location":"((?:https?:)?//[^"]+)"',
                r'"image":\{[^}]*"location":"((?:https?:)?//[^"]+)"',
                r'"bottle_large":"((?:https?:)?//[^"]+)"',
                r'"bottle_medium":"((?:https?:)?//[^"]+)"',
            ]:
                img_match = re.search(img_pattern, segment)
                if img_match:
                    image_url = img_match.group(1)
                    if image_url.startswith("//"):
                        image_url = "https:" + image_url
                    break

            # Extract grape variety
            grape = ""
            grape_match = re.search(
                rf'"grapes":\[{{"name":"{_JSON_STR}"', segment
            )
            if grape_match:
                grape = _json_text(grape_match.group(1))

            # Extract ratings count
            ratings_count = None
            for rc_pattern in [
                r'"wine_ratings_count":(\d+)',
                r'"ratings_count":(\d+)',
            ]:
                rc_match = re.search(rc_pattern, segment)
                if rc_match:
                    count = _as_int(rc_match.group(1))
                    if count and count > 0:
                        ratings_count = count
                        break

            # Extract wine style description
            description = ""
            desc_match = re.search(
                r'"description":"([^"]{10,500})"', segment
            )
            if desc_match:
                desc_text = desc_match.group(1).replace("\\n", " ").strip()
                error_keywords = ("forbidden", "underage", "try searching", "page is blocked")
                if not any(kw in desc_text.lower() for kw in error_keywords):
                    description = desc_text

            # Extract food pairings
            food_pairings = ""
            food_matches = re.findall(
                r'"food":\[([^\]]+)\]', segment
            )
            if food_matches:
                food_names = re.findall(r'"name":"([^"]+)"', food_matches[0])
                if food_names:
                    food_pairings = ", ".join(food_names)

            # Extract alcohol content
            alcohol = ""
            alc_match = re.search(r'"alcohol":([\d.]+)', segment)
            if alc_match:
                alcohol = f"{alc_match.group(1)}%"

            # NOTE: Do NOT extract price from HTML scraping — the page contains
            # boilerplate/template prices that are the same for every search query.
            # Vivino has no reliable per-wine price anywhere (see search_wine).
            price = None

            # Extract Vivino's own numeric wine id — vivino.com/w/{id} always
            # redirects to the wine's real page regardless of slug, so this
            # alone is enough to link to it without reconstructing the slug.
            vivino_id = None
            id_match = re.search(r'"wine":\{"id":(\d+)', segment)
            if id_match:
                vivino_id = _as_int(id_match.group(1))

            results.append({
                "name": wine_name,
                "winery": winery,
                "region": region,
                "country": country,
                "vintage": vintage,
                "type": wine_type,
                "grape_variety": grape,
                "rating": rating,
                "ratings_count": ratings_count,
                "image_url": image_url,
                "description": description,
                "food_pairings": food_pairings,
                "alcohol": alcohol,
                "price": price,
                "vivino_id": vivino_id,
                "source": "vivino",
            })

            if len(results) >= 5:
                break

    except Exception as err:
        _LOGGER.debug("Failed to parse Vivino HTML: %s", err)

    return results


def _map_wine_type(type_id: int | None) -> str:
    """Map Vivino wine type ID to our type string."""
    mapping = {
        1: "red",
        2: "white",
        3: "sparkling",
        4: "rosé",
        7: "dessert",
    }
    return mapping.get(type_id, "red") if type_id else "red"
