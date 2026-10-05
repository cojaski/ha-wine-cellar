import { tGroup } from "./i18n";

export interface TastingNotes {
  aroma: string;
  taste: string;
  finish: string;
  overall: string;
}

export interface Wine {
  id: string;
  barcode: string;
  name: string;
  winery: string;
  region: string;
  country: string;
  vintage: number | null;
  type: WineType;
  grape_variety: string;
  rating: number | null;
  ratings_count: number | null;
  image_url: string;
  back_image_url: string;
  price: number | null;
  retail_price: number | null;
  retail_price_currency: string | null;
  purchase_date: string;
  drink_by: string;
  notes: string;
  description: string;
  // Language ("en"/"fr"/"de") the description was last written in — lets a
  // later AI analysis tell a stale-language description apart from a
  // manually-curated one and refresh it instead of leaving it as-is.
  description_language?: string;
  food_pairings: string;
  alcohol: string;
  // Ideal serving temperature range (e.g. "16-18°C"), AI-filled only —
  // Vivino has no equivalent data.
  serving_temp: string;
  cabinet_id: string;
  row: number | null;
  col: number | null;
  depth: number;
  zone: string;
  user_rating: number | null;
  tasting_notes: TastingNotes | null;
  added_at: string;
  // Where the bottle came from ("vivino_cellar", "manual", ...). Bottles
  // whose source starts with "vivino" take part in Vivino reconciliation.
  source?: string;
  disposition: string;
  // "auto" when disposition.py's date-based rule set this; absent or any
  // other value means Gemini AI or a human set it, which the auto-recompute
  // never overwrites.
  disposition_source?: string;
  drink_window: string;
  // Specific peak maturity window (when the wine is at its absolute best),
  // distinct from drink_window (entire suitable-to-drink period).
  // Format: "YYYY-YYYY" or "YYYY" for a single year. AI-filled only.
  peak_window?: string;
  ai_ratings: Record<string, number> | null;
  // `*_updated_at` is when the data last actually changed; `*_checked_at` is
  // when the source was last consulted. A checked_at newer than updated_at
  // means the last lookup found nothing new — which is worth knowing, and
  // was impossible to tell when one field carried both meanings.
  vivino_updated_at: string | null;
  vivino_checked_at: string | null;
  ai_updated_at: string | null;
  ai_checked_at: string | null;
  vivino_id: number | null;
  // When cabinet_id/row/col/zone last actually changed — what a zone's
  // temp/humidity sensor is checked against before it's trusted as this
  // bottle's own temperature (see utils/chambering.ts).
  location_updated_at?: string;
}

export type StorageRowType = "bulk" | "box" | "shelf" | "stepped";

export const STORAGE_ROW_TYPE_LABELS: Record<StorageRowType, string> = {
  bulk: "Bulk Bin",
  box: "Wine Box",
  shelf: "Shelf (Front/Back)",
  stepped: "Compressor Shelf",
};

// Same labels, translated per HA's display language (src/i18n/{en,fr}.json)
// — falls back to the English STORAGE_ROW_TYPE_LABELS above for a language
// with no catalog yet.
export function getStorageRowTypeLabels(language?: string): Record<StorageRowType, string> {
  return tGroup("storageRowType", language) as Record<StorageRowType, string>;
}

export const BOX_SIZES = [1, 3, 6, 12, 24] as const;

export interface StorageRow {
  row: number;
  name: string;
  type: StorageRowType;
  capacity: number;
  boxes?: number[];  // for type="box": array of box sizes, e.g. [6, 12, 3]
  // for type="shelf": one entry per physical shelf board, bottom to top.
  // A fridge-style shelf commonly holds a different count in its front lane
  // than in the lane behind it (and a 2-board shelf often flips which lane
  // is bigger between the bottom and top board).
  shelf_levels?: { front: number; back: number }[];
  // for type="stepped": one entry per physical row, bottom to top, single
  // depth (no front/back lane — see getSteppedLevels). Models the shallow
  // area above a fridge's compressor bump, where bottles lie one-deep and
  // each row above the bottom one nests into the gaps of the row below.
  stepped_levels?: number[];
}

// A true quinconce alternates: the bottom row holds `firstRow` bottles: the
// row above nests into its gaps and holds one fewer, the row above that
// realigns with the bottom row's own positions and is back to `firstRow`,
// and so on — odd rows (1st, 3rd, 5th...) at `firstRow`, even rows at
// `firstRow - 1`. It does not taper off monotonically.
export function getSteppedLevels(firstRow: number, rows: number): number[] {
  const first = Math.max(0, firstRow);
  const second = Math.max(0, first - 1);
  const count = Math.max(1, rows);
  return Array.from({ length: count }, (_, i) => (i % 2 === 0 ? first : second));
}

export interface SteppedSlotGroup {
  level: number;  // 0 = bottom row
  start: number;  // first flat depth index in this level
  size: number;
}

// Flattens a stepped zone's levels into (level, depth-range) groups, mirroring
// getShelfSlotGroups above but with a single lane per level. The backend's
// WineCellarStorage._storage_row_capacity sums the same levels in the same
// order, so the two must stay in step if this ever changes.
export function getSteppedSlotGroups(levels: number[] | undefined): SteppedSlotGroup[] {
  const groups: SteppedSlotGroup[] = [];
  let offset = 0;
  for (let level = 0; level < (levels?.length || 0); level++) {
    const size = levels![level];
    if (size > 0) groups.push({ level, start: offset, size });
    offset += size;
  }
  return groups;
}

export interface ShelfSlotGroup {
  level: number;   // 0 = bottom board
  lane: "front" | "back";
  start: number;   // first flat depth index in this group
  size: number;
}

// Flattens a shelf's levels into (level, lane) groups with their depth-index
// range, bottom-to-top, front-then-back within each level. This ordering is
// the single source of truth for how a flat `wine.depth` index maps onto a
// physical (level, lane, position) slot — the backend's
// WineCellarStorage._storage_row_capacity sums the same levels in the same
// order, so the two must stay in step if this ever changes.
export function getShelfSlotGroups(levels: { front: number; back: number }[] | undefined): ShelfSlotGroup[] {
  const groups: ShelfSlotGroup[] = [];
  let offset = 0;
  for (let level = 0; level < (levels?.length || 0); level++) {
    const { front, back } = levels![level];
    if (front > 0) groups.push({ level, lane: "front", start: offset, size: front });
    offset += front;
    if (back > 0) groups.push({ level, lane: "back", start: offset, size: back });
    offset += back;
  }
  return groups;
}

export interface Cabinet {
  id: string;
  name: string;
  type: "grid" | "zone";
  rows: number;
  cols: number;
  depth: number;
  has_bottom_zone: boolean;
  bottom_zone_name: string;
  storage_rows: StorageRow[];
  order: number;
  // Live temp/humidity sensors of this zone (the whole rack card) — shown in
  // its title banner, and what bottles stored here are assumed to be at
  // (see utils/chambering.ts).
  temp_sensor_entity_id: string;
  humidity_sensor_entity_id: string;
}

export interface CellarStats {
  total_bottles: number;
  total_capacity: number;
  placed_bottles: number;
  unplaced_bottles: number;
  available_slots: number;
  total_value: number;
  total_cost: number;
  by_type: Record<string, number>;
  by_cabinet: Record<string, number>;
}

export interface BarcodeLookupResult {
  name: string;
  winery: string;
  region: string;
  country: string;
  vintage: number | null;
  type: WineType;
  grape_variety: string;
  rating: number | null;
  image_url: string;
  price: number | null;
  source: string;
  // Returned by the backend and read by the add dialog, but never declared —
  // which is what the four standing TS2339 warnings were. The compiler was
  // not checking that code path at all.
  ratings_count?: number | null;
  description?: string;
  food_pairings?: string;
  alcohol?: string;
  serving_temp?: string;
  vivino_id?: number | null;
}

export interface WineListItem {
  index: number;
  name: string;
  winery: string;
  vintage: number | null;
  type: WineType;
  region: string;
  country: string;
  grape_variety: string;
  list_price: number | null;
  list_price_currency: string;
  glass_price: number | null;
  bottle_size: string;
  // Enriched by Vivino
  vivino_rating: number | null;
  vivino_ratings_count: number | null;
  vivino_price: number | null;
  vivino_image_url: string;
  // Enriched by AI
  ai_ratings: Record<string, number> | null;
  ai_description: string;
  ai_disposition: string;
  ai_drink_window: string;
  ai_estimated_price: number | null;
  // Status
  vivino_status: "pending" | "loading" | "done" | "error";
  ai_status: "pending" | "loading" | "done" | "error" | "skipped";
}

export interface WineHistoryItem {
  id: string;
  original_id: string;
  name: string;
  winery: string;
  vintage: number | null;
  type: string;
  region: string;
  country: string;
  grape_variety: string;
  rating: number | null;
  price: number | null;
  image_url: string;
  added_at: string;
  removed_at: string;
  reason: string;
  // Tasting log, filled by the Drink button or later from History.
  personal_rating?: number | null;
  drink_notes?: string;
  buy_again?: boolean;
  buy_list_item_id?: string;
}

export const REMOVAL_REASONS = [
  { id: "drank", label: "Drank" },
  { id: "gifted", label: "Gifted" },
  { id: "sold", label: "Sold" },
  { id: "broken", label: "Broken" },
  { id: "spoiled", label: "Spoiled" },
  { id: "other", label: "Other" },
] as const;

// Same reasons, translated per HA's display language — `id` (the stored
// value) is never translated, only `label`. Falls back to the English
// label above for any reason not yet translated into the target language.
export function getRemovalReasons(language?: string): { id: string; label: string }[] {
  const labels = tGroup("removalReason", language);
  return REMOVAL_REASONS.map((r) => ({ id: r.id, label: labels[r.id] || r.label }));
}

// "whisky" is the one non-wine type. It reuses the wine fields (winery =
// distillery, grape_variety = cask/maturation, vintage = distillation year),
// so nothing in the data shape changes; only the field labels follow the
// type, see producerLabel/varietyLabel below. Mirrors WINE_TYPES in const.py.
export type WineType = "red" | "white" | "rosé" | "sparkling" | "dessert" | "whisky";

export const WINE_TYPE_COLORS: Record<WineType, string> = {
  red: "#722F37",
  white: "#F5E6CA",
  rosé: "#E8A0BF",
  sparkling: "#D4E09B",
  dessert: "#DAA520",
  whisky: "#B5651D",
};

// Text colour that reads on a filled WINE_TYPE_COLORS swatch: white on the
// dark ones, a deep shade of the same hue on the pale ones.
export const WINE_TYPE_INK: Record<WineType, string> = {
  red: "#fff",
  white: "#4a3a1c",
  rosé: "#5c1f3b",
  sparkling: "#3a4614",
  dessert: "#3d2a00",
  whisky: "#fff",
};

// Inline custom properties for a .type-chip (see typeChipStyles in
// styles.ts). "all" and unknown ids get none and keep the wine-red default.
export function typeChipStyle(id: string): string {
  const color = WINE_TYPE_COLORS[id as WineType];
  if (!color) return "";
  return `--chip-color:${color};--chip-tint:${color}33;--chip-glow:${color}66;--chip-ink:${WINE_TYPE_INK[id as WineType]}`;
}

export const WINE_TYPE_LABELS: Record<WineType, string> = {
  red: "Red",
  white: "White",
  rosé: "Rosé",
  sparkling: "Sparkling",
  dessert: "Dessert",
  whisky: "Whisky",
};

// Same labels, translated per HA's display language (src/i18n/{en,fr}.json)
// — falls back to the English WINE_TYPE_LABELS above for a language with
// no catalog yet, or for any type not yet translated within one that
// exists.
export function getWineTypeLabels(language?: string): Record<WineType, string> {
  return tGroup("wineType", language) as Record<WineType, string>;
}

// Field labels that read wrong for a whisky: the producer is a distillery
// (or independent bottler) and the "grape variety" field holds the cask.
export function producerLabel(type?: string, language?: string): string {
  const t = tGroup("bottleFields", language);
  return type === "whisky" ? t.distillery : t.winery;
}

export function varietyLabel(type?: string, short = false, language?: string): string {
  const t = tGroup("bottleFields", language);
  if (type === "whisky") return t.cask;
  return short ? t.grape : t.grapeVariety;
}

// The [type, label] pairs to offer in a type dropdown or filter chip list —
// "whisky" only when the cellar has opted in (Vivino/AI Settings), so a
// cellar that doesn't track whisky doesn't see it as an option. An existing
// whisky-typed bottle keeps displaying correctly either way; this only
// gates what's *offered*, not what's stored.
export function getSelectableWineTypes(enableWhisky: boolean, language?: string): [WineType, string][] {
  const entries = Object.entries(getWineTypeLabels(language)) as [WineType, string][];
  return enableWhisky ? entries : entries.filter(([value]) => value !== "whisky");
}

// Every physical (row, col) grid slot in a cabinet, in display order,
// skipping rows configured as bulk/box storage zones.
export function getRackSlots(cabinet: Cabinet): { row: number; col: number }[] {
  const storageRowSet = new Set((cabinet.storage_rows || []).map((sr) => sr.row));
  const slots: { row: number; col: number }[] = [];
  for (let r = 0; r < cabinet.rows; r++) {
    if (storageRowSet.has(r)) continue;
    for (let c = 0; c < cabinet.cols; c++) slots.push({ row: r, col: c });
  }
  return slots;
}

export interface WineLocation {
  text: string;
  cabinet: Cabinet | null;
  zone: string;
  storageRow: StorageRow | null;
}

// A precise, human-readable location for a wine: cabinet name, plus the
// zone name and slot number when it's in a bulk bin or wine box, or the
// rack's linear slot number when it's in a grid cell.
export function getWineLocation(wine: Wine, cabinets: Cabinet[], language?: string): WineLocation {
  const loc = tGroup("wineLocation", language);
  const cabinet = wine.cabinet_id ? cabinets.find((c) => c.id === wine.cabinet_id) || null : null;
  if (!cabinet) return { text: loc.unassigned, cabinet: null, zone: "", storageRow: null };

  if (wine.row !== null && wine.col !== null) {
    const slotIdx = getRackSlots(cabinet).findIndex((s) => s.row === wine.row && s.col === wine.col);
    const slotLabel = slotIdx >= 0 ? `${loc.slot} ${slotIdx + 1}` : `R${wine.row + 1}C${wine.col + 1}`;
    return { text: `${cabinet.name} · ${slotLabel}`, cabinet, zone: "", storageRow: null };
  }

  if (wine.zone && wine.zone !== "bottom") {
    const rowIdx = parseInt(wine.zone.replace("storage-", ""), 10);
    const storageRow = (cabinet.storage_rows || []).find((sr) => sr.row === rowIdx) || null;
    const zoneName = storageRow?.name || loc.storage;
    return { text: `${cabinet.name} · ${zoneName} · ${loc.slot} ${(wine.depth || 0) + 1}`, cabinet, zone: wine.zone, storageRow };
  }

  if (wine.zone === "bottom") {
    return { text: `${cabinet.name} · ${cabinet.bottom_zone_name || loc.storage}`, cabinet, zone: "bottom", storageRow: null };
  }

  return { text: cabinet.name, cabinet, zone: "", storageRow: null };
}
