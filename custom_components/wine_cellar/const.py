"""Constants for Wine Cellar Tracker."""

DOMAIN = "wine_cellar"
STORAGE_KEY = "wine_cellar"
STORAGE_VERSION = 1

# "whisky" is the one non-wine type. It reuses the wine fields (winery =
# distillery, grape_variety = cask/maturation, vintage = distillation year)
# so nothing in the storage shape changes. Vivino has no whisky data at
# all, so every Vivino path skips it and only the AI enrichment applies.
WINE_TYPES = ["red", "white", "rosé", "sparkling", "dessert", "whisky"]

WINE_TYPE_COLORS = {
    "red": "#722F37",
    "white": "#F5E6CA",
    "rosé": "#E8A0BF",
    "sparkling": "#D4E09B",
    "dessert": "#DAA520",
    "whisky": "#B5651D",
}

DEFAULT_CABINETS = [
    {
        "id": "cabinet-1",
        "name": "Section 1",
        "type": "grid",
        "rows": 10,
        "cols": 9,
        "depth": 1,
        "has_bottom_zone": False,
        "bottom_zone_name": "",
        "storage_rows": [{"row": 9, "name": "Box Storage", "type": "bulk", "capacity": 20}],
        "order": 0,
    },
    {
        "id": "cabinet-2",
        "name": "Section 2",
        "type": "grid",
        "rows": 10,
        "cols": 9,
        "depth": 1,
        "has_bottom_zone": False,
        "bottom_zone_name": "",
        "storage_rows": [{"row": 9, "name": "Box Storage", "type": "bulk", "capacity": 20}],
        "order": 1,
    },
    {
        "id": "cabinet-3",
        "name": "Section 3",
        "type": "grid",
        "rows": 10,
        "cols": 9,
        "depth": 1,
        "has_bottom_zone": False,
        "bottom_zone_name": "",
        "storage_rows": [{"row": 9, "name": "Box Storage", "type": "bulk", "capacity": 20}],
        "order": 2,
    },
]

CONF_CABINETS = "cabinets"
CONF_WINES = "wines"
CONF_BARCODE_CACHE = "barcode_cache"
# Enough that a normal cellar never evicts; small enough that the store
# file cannot grow without bound from scanning alone.
BARCODE_CACHE_MAX = 500
CONF_BUY_LIST = "buy_list"
CONF_WINE_HISTORY = "wine_history"
CONF_SETTINGS = "settings"

CONF_GEMINI_API_KEY = "gemini_api_key"
CONF_GEMINI_MODEL = "gemini_model"
DEFAULT_GEMINI_MODEL = "gemini-2.5-flash"

# AI provider: "gemini" (Google direct) or "openai_compatible" (any relay /
# aggregator / self-hosted server exposing the standard chat completions API).
CONF_AI_PROVIDER = "ai_provider"
CONF_AI_BASE_URL = "ai_base_url"
CONF_AI_API_KEY = "ai_api_key"
CONF_AI_MODEL = "ai_model"
DEFAULT_AI_PROVIDER = "gemini"
AI_PROVIDERS = ["gemini", "openai_compatible"]

CONF_METADATA_LANGUAGE = "metadata_language"
DEFAULT_METADATA_LANGUAGE = "en"
SUPPORTED_METADATA_LANGUAGES = ["en", "fr", "de"]

CONF_METADATA_CURRENCY = "metadata_currency"
DEFAULT_METADATA_CURRENCY = "USD"
SUPPORTED_METADATA_CURRENCIES = ["USD", "EUR", "GBP", "CHF"]

# When Vivino finds no confident match, offer AI as a fallback instead of
# applying automatically. "always" skips asking and just uses AI every time.
CONF_AI_FALLBACK_ALWAYS = "ai_fallback_always"

# Whether "whisky" is offered as a selectable bottle type in the UI (add-wine
# type dropdown, edit-type dropdown, filter chips). Off by default: most
# cellars track wine only. Existing whisky-typed bottles keep displaying
# correctly either way — this only gates what's offered, not what's stored.
CONF_ENABLE_WHISKY = "enable_whisky"

# Which wine type the add-wine form starts on. Moved here (an in-card
# setting) from Home Assistant's own config/options flow, which is a
# better fit for account/connection-level settings (API keys, Vivino
# cookie) than a per-cellar display preference like this one.
CONF_DEFAULT_WINE_TYPE = "default_wine_type"
DEFAULT_WINE_TYPE = "red"

# How the drink/hold/past-peak disposition is drawn on a bottle: "letter"
# (default) is the classic D/H/P badge; "dot" is a plain colored circle with
# no letter (green/blue/purple) for a subtler look.
CONF_DISPOSITION_DISPLAY = "disposition_display"
DISPOSITION_DISPLAY_LETTER = "letter"
DISPOSITION_DISPLAY_DOT = "dot"
DISPOSITION_DISPLAY_CHOICES = [DISPOSITION_DISPLAY_LETTER, DISPOSITION_DISPLAY_DOT]
DEFAULT_DISPOSITION_DISPLAY = DISPOSITION_DISPLAY_LETTER

# How many timestamped server backups to keep on disk. Older ones are pruned
# after each new save; 0 keeps every backup forever.
# Arrangement findings the user has waved off for good. Kept as a list of
# stable finding ids so a dismissed suggestion never comes back on re-analysis.
CONF_DISMISSED_ARRANGEMENTS = "dismissed_arrangements"

CONF_SERVER_BACKUP_KEEP = "server_backup_keep"
DEFAULT_SERVER_BACKUP_KEEP = 10
SERVER_BACKUP_KEEP_CHOICES = [0, 5, 10, 20, 50]

CONF_VIVINO_SESSION_COOKIE = "vivino_session_cookie"
CONF_VIVINO_CELLAR_URL = "vivino_cellar_url"
CONF_VIVINO_AUTO_SYNC = "vivino_auto_sync"

# What the Vivino connection is allowed to do. "import" mirrors the Vivino
# cellar into Cork Dork and never writes to the user's Vivino account;
# "sync" is the full two-way reconcile that also pushes Cork Dork changes
# back to Vivino. Import is the default so connecting an account never
# modifies it unless the user explicitly opts in.
CONF_VIVINO_MODE = "vivino_mode"
VIVINO_MODE_SYNC = "sync"
VIVINO_MODE_IMPORT = "import"
VIVINO_MODES = [VIVINO_MODE_IMPORT, VIVINO_MODE_SYNC]
DEFAULT_VIVINO_MODE = VIVINO_MODE_IMPORT

VIVINO_AUTO_SYNC_INTERVAL_HOURS = 12

# Where the wine is brought up to serving temperature ("chambering"). A
# single global sensor — not per-zone, per-cabinet fields below are the
# storage-side temperature/humidity, this is the separate room-side one.
CONF_CHAMBERING_ROOM_SENSOR = "chambering_room_sensor"

# Thermal time constant (tau) of a bottle warming in still room air, per
# Newton's law of heating: the gap to the room temperature shrinks by a
# factor e every tau minutes. A rough starting point from a back-of-envelope
# estimate (not a measurement) — meant to be tuned by timing a real bottle.
CONF_CHAMBERING_TIME_CONSTANT_MINUTES = "chambering_time_constant_minutes"
DEFAULT_CHAMBERING_TIME_CONSTANT_MINUTES = 75

# How long a bottle must have sat in its current zone before that zone's
# sensor reading is trusted as the bottle's own temperature.
CONF_CHAMBERING_EQUILIBRATION_HOURS = "chambering_equilibration_hours"
DEFAULT_CHAMBERING_EQUILIBRATION_HOURS = 24

ATTR_TOTAL_BOTTLES = "total_bottles"
ATTR_TOTAL_CAPACITY = "total_capacity"

FRONTEND_VERSION = "20261004i"
