import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Wine, Cabinet, WineType, WINE_TYPE_COLORS, WINE_TYPE_LABELS, getWineTypeLabels, WineHistoryItem, getWineLocation, getRemovalReasons } from "../models";
import { t } from "../i18n";
import { sharedStyles, touchStyles } from "../styles";
import "./star-rating";
import {
  matchesQuery,
  normalizeText,
  drinkByYear,
  compareNullable,
  splitMulti,
  collectFacet,
} from "../utils/search";
import { categorizeFoodPairing, FOOD_CATEGORY_IDS } from "../utils/foodCategories";

// One icon per food category, for the Pairings chooser.
const FOOD_ICONS: Record<string, string> = {
  aperitif: "🫒",
  charcuterie: "🥓",
  cheese: "🧀",
  seafood: "🦪",
  fish: "🐟",
  duck: "🦆",
  poultry: "🍗",
  lamb: "🐑",
  game: "🦌",
  beef: "🥩",
  pork: "🐖",
  stew: "🍲",
  grill: "🔥",
  spicy: "🌶️",
  mediterranean: "🍅",
  salad: "🥗",
  vegetarian: "🥦",
  dessert: "🍰",
  other: "🍽️",
};
import "./wine-detail-dialog";

type SortField =
  | "name"
  | "winery"
  | "vintage"
  | "type"
  | "rating"
  | "user_rating"
  | "price"
  | "drink_by"
  | "urgency"
  | "purchase_date"
  | "added_at"
  | "cabinet";
type SortDir = "asc" | "desc";
type Preset = "all" | "drink_this_year" | "past_peak" | "unrated" | "incomplete" | "recent";

// Persisted so the inventory reopens the way it was left; the search query is
// deliberately excluded — a stale query silently hiding the cellar is far more
// confusing than a stale sort order.
const PREFS_KEY = "wine_cellar_inventory_prefs_v1";

const DEFAULT_FILTERS = {
  typeFilter: "all",
  dispositionFilter: "all",
  countryFilter: "all",
  grapeFilter: "all",
  foodFilter: "all",
  cabinetFilter: "all",
  minRating: 0,
  maxPrice: null as number | null,
  vintageMin: null as number | null,
  vintageMax: null as number | null,
  preset: "all" as Preset,
};

@customElement("inventory-dialog")
export class InventoryDialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) wines: Wine[] = [];
  @property({ attribute: false }) cabinets: Cabinet[] = [];
  @property({ type: Boolean }) hasGemini = false;
  @property({ type: Boolean }) enableWhisky = false;
  @property({ type: String }) currency = "USD";
  // Batch AI / Vivino scans run in the card (they outlive this dialog); these
  // only mirror their progress so the review button can show it.
  @property({ type: Boolean }) analyzing = false;
  @property({ type: Boolean }) batchVivino = false;
  // Opened from the card's "Pairings" button: start on the food chooser,
  // then show the inventory filtered to what goes with the pick.
  @property({ type: Boolean }) pairingMode = false;
  @state() private _showPairingPicker = false;

  @state() private _searchQuery = "";
  @state() private _typeFilter = DEFAULT_FILTERS.typeFilter;
  @state() private _dispositionFilter = DEFAULT_FILTERS.dispositionFilter;
  @state() private _countryFilter = DEFAULT_FILTERS.countryFilter;
  @state() private _grapeFilter = DEFAULT_FILTERS.grapeFilter;
  @state() private _foodFilter = DEFAULT_FILTERS.foodFilter;
  @state() private _cabinetFilter = DEFAULT_FILTERS.cabinetFilter;
  @state() private _minRating = DEFAULT_FILTERS.minRating;
  @state() private _maxPrice: number | null = DEFAULT_FILTERS.maxPrice;
  @state() private _vintageMin: number | null = DEFAULT_FILTERS.vintageMin;
  @state() private _vintageMax: number | null = DEFAULT_FILTERS.vintageMax;
  @state() private _preset: Preset = DEFAULT_FILTERS.preset;
  @state() private _showFilters = false;
  @state() private _sortField: SortField = "name";
  @state() private _sortDir: SortDir = "asc";
  @state() private _detailWine: Wine | null = null;
  @state() private _showDetail = false;
  @state() private _backingUp = false;
  @state() private _importing = false;
  @state() private _restoring = false;
  @state() private _confirmRestore = false;
  @state() private _restoreData: any = null;
  @state() private _confirmImport = false;
  @state() private _pendingImport: any[] | null = null;
  @state() private _importMatches = 0;
  @state() private _statusMsg = "";
  @state() private _serverBackingUp = false;
  @state() private _serverBackupLabel = "";
  @state() private _showServerRestore = false;
  @state() private _serverBackups: any[] = [];
  @state() private _serverRestoring = false;
  @state() private _backupKeep = 10;
  @state() private _backupKeepChoices: number[] = [0, 5, 10, 20, 50];
  @state() private _storageInfo: any = null;
  @state() private _enriching: "" | "vivino" | "ai" = "";
  @state() private _confirmEnrich: "" | "vivino" | "ai" = "";
  @state() private _confirmEnrichRetry = false;
  @state() private _showReview = false;
  @state() private _viewMode: "inventory" | "history" = "inventory";
  @state() private _historyItems: WineHistoryItem[] = [];
  @state() private _historyLoading = false;
  @state() private _buyAgainOnly = false;
  @state() private _editingHistoryId = "";
  @state() private _editRating = 0;
  @state() private _editNotes = "";
  @state() private _editBuyAgain = false;
  @state() private _historySaving = false;

  // HA websocket errors can arrive as a plain string, an Error, or a
  // {code, message} object depending on where they're thrown from — a bare
  // `err.message || err` shows "[object Object]" for the last shape instead
  // of anything useful. This tries the common shapes in order before
  // falling back to a JSON dump.
  private _formatError(err: any): string {
    if (typeof err === "string") return err;
    if (err?.message && err?.code) return `${err.message} (${err.code})`;
    if (err?.message) return err.message;
    if (err?.error && typeof err.error === "string") return err.error;
    if (err?.body && typeof err.body === "string") return err.body;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }

  private _logStatus(context: string, err: any): string {
    const message = this._formatError(err);
    console.error(`Cork Dork: ${context}`, err);
    return message;
  }

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  static styles = [
    sharedStyles,
    css`
      .inv-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px 8px;
      }

      .inv-header-title {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--wc-text);
      }

      .inv-close {
        background: none;
        border: none;
        font-size: 1.3em;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 8px;
        color: var(--wc-text-secondary);
      }

      .inv-close:hover {
        background: var(--wc-hover);
      }

      .inv-header-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .inv-review-btn {
        background: #37474f;
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 5px 12px;
        font-size: 0.8em;
        cursor: pointer;
      }

      .inv-review-btn:disabled {
        opacity: 0.6;
        cursor: default;
      }

      .inv-review-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .inv-review-option {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: none;
        border-radius: 10px;
        padding: 10px 14px;
        color: #fff;
        cursor: pointer;
        text-align: left;
        font-size: 0.9em;
        font-weight: 500;
      }

      .inv-pairing-box {
        max-width: 520px;
        max-height: 85%;
        overflow-y: auto;
      }

      .inv-pairing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
        margin-bottom: 12px;
      }

      .inv-pairing-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 10px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        background: var(--wc-hover);
        color: var(--wc-text);
        cursor: pointer;
        font-size: 0.8em;
      }

      .inv-pairing-option:hover {
        border-color: var(--wc-accent, #722f37);
      }

      .inv-pairing-icon {
        font-size: 1.8em;
        line-height: 1.2;
      }

      .inv-pairing-label {
        font-weight: 500;
        text-align: center;
      }

      .inv-pairing-option small {
        color: var(--wc-text-secondary);
      }

      .inv-pairing-missing {
        display: block;
        margin-bottom: 12px;
        color: var(--wc-text-secondary);
      }

      .inv-pairing-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin: 0 16px 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: var(--wc-hover);
        font-size: 0.9em;
        font-weight: 500;
        color: var(--wc-text);
      }

      .inv-review-option small {
        font-size: 0.8em;
        font-weight: 400;
        opacity: 0.85;
      }

      .inv-stats {
        display: flex;
        gap: 16px;
        padding: 4px 20px 10px;
        flex-wrap: wrap;
        font-size: 0.82em;
        color: var(--wc-text-secondary);
      }

      .inv-stats .stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .inv-stats .stat-value {
        font-weight: 600;
        color: var(--wc-text);
      }

      .inv-type-dot-sm {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
      }

      .inv-controls {
        display: flex;
        gap: 8px;
        padding: 0 16px 8px;
        align-items: center;
        flex-wrap: wrap;
      }

      .inv-search-wrapper {
        flex: 1;
        min-width: 140px;
        position: relative;
      }

      .inv-search-wrapper input {
        width: 100%;
        padding: 8px 12px 8px 30px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        font-size: 0.88em;
        background: var(--wc-bg);
        color: var(--wc-text);
        box-sizing: border-box;
      }

      .inv-search-wrapper input:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .inv-search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.85em;
        pointer-events: none;
      }

      .inv-sort {
        display: flex;
        gap: 4px;
        align-items: center;
      }

      /* One height for the whole sort row. The select drops its native
         appearance because Safari otherwise ignores height on it. */
      .inv-sort select,
      .inv-sort-dir,
      .inv-filter-toggle {
        box-sizing: border-box;
        height: 32px;
      }

      .inv-sort select {
        -webkit-appearance: none;
        appearance: none;
        padding: 0 26px 0 12px;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        background: var(--wc-bg)
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
          no-repeat right 10px center;
        color: var(--wc-text);
        font-size: 0.8em;
        cursor: pointer;
      }

      .inv-sort-dir {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        padding: 0 9px;
        cursor: pointer;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1;
      }

      .inv-sort-dir:hover {
        background: var(--wc-hover);
      }

      .inv-filter-toggle {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
      }

      .inv-filter-toggle:hover {
        background: var(--wc-hover);
      }

      .inv-filter-toggle.active {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
      }

      .inv-filter-badge {
        background: var(--wc-primary);
        color: #fff;
        border-radius: 9px;
        padding: 1px 6px;
        font-size: 0.85em;
        font-weight: 600;
      }

      .inv-filter-panel {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px 12px;
        padding: 12px 16px;
        margin: 0 16px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        background: var(--wc-bg);
      }

      .inv-filter-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-filter-field select,
      .inv-filter-field input {
        padding: 6px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-card-bg, var(--wc-bg));
        color: var(--wc-text);
        font-size: 1.05em;
        width: 100%;
        box-sizing: border-box;
      }

      .inv-filter-field select:focus,
      .inv-filter-field input:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .inv-filter-range {
        display: flex;
        gap: 6px;
      }

      .inv-filter-hint {
        font-size: 0.9em;
        opacity: 0.75;
        line-height: 1.3;
      }

      .inv-active-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin: 0 16px 10px;
        padding: 6px 10px;
        border-radius: 8px;
        background: rgba(114, 47, 55, 0.08);
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-clear-filters {
        background: none;
        border: none;
        color: var(--wc-primary);
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
        padding: 2px 4px;
        white-space: nowrap;
      }

      .inv-clear-filters:hover {
        text-decoration: underline;
      }

      .inv-drink-by {
        opacity: 0.8;
      }

      .inv-enrich {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 0 16px 10px;
        padding: 8px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-enrich-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      }

      .inv-enrich-row.retry {
        opacity: 0.75;
        border-top: 1px solid var(--wc-border);
        padding-top: 6px;
      }

      .inv-enrich-text {
        line-height: 1.4;
      }

      .inv-enrich-text strong {
        color: var(--wc-text);
      }

      .inv-enrich-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .inv-storage-info {
        margin: 0 16px 8px;
        padding: 6px 10px;
        border-radius: 8px;
        background: var(--wc-bg);
        border: 1px solid var(--wc-border);
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
      }

      .inv-storage-info.heavy {
        border-color: #c98a00;
      }

      .inv-keep-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .inv-keep-row select {
        padding: 5px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-bg);
        color: var(--wc-text);
        font-size: 1em;
        cursor: pointer;
      }

      .inv-backup-list {
        max-height: 250px;
        overflow-y: auto;
        margin: 8px 0;
      }

      .inv-backup-row {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
      }

      .inv-backup-pick {
        flex: 1;
        text-align: left;
        font-size: 0.82em;
        padding: 8px 12px;
      }

      .inv-backup-meta {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
      }

      .inv-backup-del {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        color: var(--wc-text-secondary);
        cursor: pointer;
        padding: 0 10px;
        font-size: 0.9em;
      }

      .inv-backup-del:hover {
        border-color: #c62828;
        color: #c62828;
      }

      .inv-chips {
        display: flex;
        gap: 4px;
        padding: 0 16px 10px;
        flex-wrap: wrap;
      }

      .inv-chip.preset.active {
        background: var(--wc-text-secondary);
        border-color: var(--wc-text-secondary);
      }

      .inv-chip {
        padding: 4px 10px;
        border-radius: 14px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.75em;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .inv-chip:hover {
        background: rgba(114, 47, 55, 0.08);
      }

      .inv-chip.active {
        background: var(--wc-primary);
        color: #fff;
        border-color: var(--wc-primary);
      }

      .inv-list {
        max-height: 55vh;
        overflow-y: auto;
        padding: 0 16px 8px;
      }

      .inv-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--wc-border);
        cursor: pointer;
        transition: background 0.15s;
      }

      .inv-item:hover {
        background: var(--wc-hover);
      }

      .inv-item:last-child {
        border-bottom: none;
      }

      .inv-thumb {
        width: 48px;
        height: 66px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .inv-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .inv-info {
        flex: 1;
        min-width: 0;
      }

      .inv-name {
        font-weight: 600;
        font-size: 0.88em;
        color: var(--wc-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inv-meta {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inv-right {
        text-align: right;
        flex-shrink: 0;
        min-width: 60px;
      }

      .inv-price {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--wc-text);
      }

      .inv-location {
        font-size: 0.72em;
        color: var(--wc-text-secondary);
      }

      .inv-empty {
        text-align: center;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
        font-size: 0.9em;
      }

      .inv-footer {
        display: flex;
        gap: 8px;
        padding: 10px 16px 16px;
        border-top: 1px solid var(--wc-border);
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .inv-count {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .inv-footer-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .inv-btn {
        font-size: 0.76em;
        padding: 5px 12px;
        border-radius: 16px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s;
      }

      .inv-btn:hover {
        background: var(--wc-hover);
        border-color: var(--wc-text-secondary);
      }

      .inv-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .inv-status {
        width: 100%;
        text-align: center;
        font-size: 0.78em;
        padding: 4px 0 0;
        color: #2e7d32;
        font-weight: 500;
      }

      /* Restore confirm overlay */
      .inv-confirm-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 16px;
      }

      .inv-confirm-box {
        background: var(--wc-bg);
        border-radius: 12px;
        padding: 24px;
        max-width: 380px;
        width: 90%;
        text-align: center;
      }

      .inv-confirm-box h3 {
        margin: 0 0 8px;
        font-size: 1em;
        color: var(--wc-text);
      }

      .inv-confirm-box p {
        margin: 0 0 16px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
      }

      .inv-confirm-stats {
        font-size: 0.82em;
        color: var(--wc-text);
        margin: 0 0 16px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
      }

      .inv-confirm-btns {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      .inv-confirm-btns button {
        padding: 8px 20px;
        border-radius: 20px;
        border: none;
        font-size: 0.85em;
        cursor: pointer;
        font-weight: 500;
      }

      .inv-confirm-cancel {
        background: var(--wc-hover);
        color: var(--wc-text);
      }

      .inv-confirm-go {
        background: #e65100;
        color: #fff;
      }

      .inv-toggle {
        display: flex;
        margin: 0 16px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        overflow: hidden;
      }

      .inv-toggle button {
        flex: 1;
        padding: 6px 0;
        border: none;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.82em;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .inv-toggle button.active {
        background: var(--wc-primary);
        color: #fff;
      }

      .inv-history-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--wc-border);
      }

      .inv-history-item:last-child {
        border-bottom: none;
      }

      .inv-history-item {
        flex-wrap: wrap;
      }

      .inv-buy-again {
        margin-right: 4px;
        cursor: help;
      }

      .inv-drink-notes {
        font-size: 0.78em;
        font-style: italic;
        color: var(--wc-text-secondary);
        margin-top: 3px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: pre-line;
      }

      .inv-history-editor {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 0 2px;
      }

      .inv-history-editor textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text);
        font: inherit;
        font-size: 0.85em;
        resize: vertical;
      }

      .inv-history-editor label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85em;
        color: var(--wc-text);
        cursor: pointer;
      }

      .inv-history-editor .inv-editor-btns {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .inv-history-filter {
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px 0;
      }

      .inv-btn.active {
        background: var(--wc-primary);
        border-color: var(--wc-primary);
        color: #fff;
      }

      .inv-reason-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.72em;
        font-weight: 500;
        background: rgba(114, 47, 55, 0.12);
        color: var(--wc-primary);
      }

      @media (max-width: 599px) {
        .inv-controls {
          flex-direction: column;
          gap: 6px;
        }
        .inv-search-wrapper {
          width: 100%;
        }
        .inv-stats {
          gap: 8px;
          font-size: 0.78em;
          padding: 4px 16px 8px;
        }
        .inv-list {
          max-height: 60vh;
        }
        .inv-footer {
          justify-content: center;
        }
        .inv-footer-btns {
          justify-content: center;
        }
      }
    `,
    touchStyles,
  ];

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("open") && this.open) {
      // Only the search query is transient. Sort order and filters are
      // restored from localStorage on connect and must survive a reopen —
      // resetting them here would silently undo the saved preferences.
      this._searchQuery = "";
      this._showDetail = false;
      this._detailWine = null;
      this._statusMsg = "";
      this._confirmRestore = false;
      this._confirmEnrich = "";
      this._confirmEnrichRetry = false;
      this._confirmImport = false;
      this._pendingImport = null;
      this._showServerRestore = false;
      this._restoreData = null;
      this._viewMode = "inventory";
      this._historyItems = [];
      this._buyAgainOnly = false;
      this._editingHistoryId = "";
      this._showPairingPicker = this.pairingMode;
    }
    // A Pairings visit is a one-off lookup: leaving it (✕, backdrop, or
    // jumping to a bottle) must not leave its food filter saved for the
    // next plain Inventory open.
    if (changedProps.has("open") && !this.open && this.pairingMode) {
      this._clearFilters();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close"));
  }

  // ── Preferences (sort + filters survive a reopen) ─────────────

  connectedCallback() {
    super.connectedCallback();
    this._loadPrefs();
  }

  private _loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p.sortField) this._sortField = p.sortField;
      if (p.sortDir) this._sortDir = p.sortDir;
      if (p.typeFilter) this._typeFilter = p.typeFilter;
      if (p.dispositionFilter) this._dispositionFilter = p.dispositionFilter;
      if (p.countryFilter) this._countryFilter = p.countryFilter;
      if (p.grapeFilter) this._grapeFilter = p.grapeFilter;
      // Older builds saved the French category label itself; only a known
      // category id is a valid filter now.
      if (p.foodFilter && (p.foodFilter === "all" || FOOD_CATEGORY_IDS.includes(p.foodFilter))) {
        this._foodFilter = p.foodFilter;
      }
      if (p.cabinetFilter) this._cabinetFilter = p.cabinetFilter;
      if (typeof p.minRating === "number") this._minRating = p.minRating;
      if (p.maxPrice !== undefined) this._maxPrice = p.maxPrice;
      if (p.vintageMin !== undefined) this._vintageMin = p.vintageMin;
      if (p.vintageMax !== undefined) this._vintageMax = p.vintageMax;
      if (p.preset) this._preset = p.preset;
    } catch {
      // A corrupt or unavailable localStorage must never keep the dialog
      // from opening — fall back to defaults silently.
    }
  }

  private _savePrefs() {
    try {
      localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({
          sortField: this._sortField,
          sortDir: this._sortDir,
          typeFilter: this._typeFilter,
          dispositionFilter: this._dispositionFilter,
          countryFilter: this._countryFilter,
          grapeFilter: this._grapeFilter,
          foodFilter: this._foodFilter,
          cabinetFilter: this._cabinetFilter,
          minRating: this._minRating,
          maxPrice: this._maxPrice,
          vintageMin: this._vintageMin,
          vintageMax: this._vintageMax,
          preset: this._preset,
        })
      );
    } catch {
      // Private browsing / full quota — not worth surfacing.
    }
  }

  private _clearFilters() {
    this._typeFilter = DEFAULT_FILTERS.typeFilter;
    this._dispositionFilter = DEFAULT_FILTERS.dispositionFilter;
    this._countryFilter = DEFAULT_FILTERS.countryFilter;
    this._grapeFilter = DEFAULT_FILTERS.grapeFilter;
    this._foodFilter = DEFAULT_FILTERS.foodFilter;
    this._cabinetFilter = DEFAULT_FILTERS.cabinetFilter;
    this._minRating = DEFAULT_FILTERS.minRating;
    this._maxPrice = DEFAULT_FILTERS.maxPrice;
    this._vintageMin = DEFAULT_FILTERS.vintageMin;
    this._vintageMax = DEFAULT_FILTERS.vintageMax;
    this._preset = DEFAULT_FILTERS.preset;
    this._searchQuery = "";
    this._savePrefs();
  }

  // Everything that is currently narrowing the list, so a persisted filter
  // can never silently hide half the cellar.
  private _activeFilterCount(): number {
    let n = 0;
    if (this._typeFilter !== "all") n++;
    if (this._dispositionFilter !== "all") n++;
    if (this._countryFilter !== "all") n++;
    if (this._grapeFilter !== "all") n++;
    if (this._foodFilter !== "all") n++;
    if (this._cabinetFilter !== "all") n++;
    if (this._minRating > 0) n++;
    if (this._maxPrice !== null) n++;
    if (this._vintageMin !== null) n++;
    if (this._vintageMax !== null) n++;
    if (this._preset !== "all") n++;
    return n;
  }

  // ── Facets ────────────────────────────────────────────────────

  private _countryOptions(): string[] {
    return collectFacet(this.wines, (w) => (w.country ? [w.country] : []));
  }

  private _grapeOptions(): string[] {
    return collectFacet(this.wines, (w) => splitMulti(w.grape_variety));
  }

  // The AI's food pairings are free text ("daube de bœuf", "bœuf
  // bourguignon", "carbonnade flamande"…), which left unfiltered would
  // balloon this dropdown into dozens of near-synonyms. Each split pairing
  // is mapped to a generic category (see foodCategories.ts) so the filter
  // stays short — the wine detail view still shows the original AI text.
  // Options are category ids, sorted by their translated label.
  private _foodOptions(): string[] {
    return collectFacet(this.wines, (w) => splitMulti(w.food_pairings).map(categorizeFoodPairing)).sort(
      (a, b) => this._foodLabel(a).localeCompare(this._foodLabel(b))
    );
  }

  private _foodLabel(id: string): string {
    return this._t(`foodCategory.${id}`);
  }

  // Picking a food clears every other filter first: a leftover saved type
  // or rating filter would otherwise hide wines that pair, with nothing on
  // screen saying why.
  private _pickPairing(id: string) {
    this._clearFilters();
    this._foodFilter = id;
    this._savePrefs();
    this._showPairingPicker = false;
  }

  private _renderPairingPicker() {
    if (!this._showPairingPicker) return nothing;
    const counts = new Map<string, number>();
    for (const w of this.wines) {
      for (const id of new Set(splitMulti(w.food_pairings).map(categorizeFoodPairing))) {
        counts.set(id, (counts.get(id) ?? 0) + 1);
      }
    }
    const options = this._foodOptions();
    const missing = this._winesWithoutPairings();
    return html`
      <div class="inv-confirm-overlay" @click=${() => (this._showPairingPicker = false)}>
        <div class="inv-confirm-box inv-pairing-box" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this._t("ui.inventory.pairingTitle")}</h3>
          <p>${options.length ? this._t("ui.inventory.pairingIntro") : this._t("ui.inventory.pairingEmpty")}</p>
          <div class="inv-pairing-grid">
            ${options.map(
              (id) => html`
                <button class="inv-pairing-option" @click=${() => this._pickPairing(id)}>
                  <span class="inv-pairing-icon">${FOOD_ICONS[id] ?? "🍽️"}</span>
                  <span class="inv-pairing-label">${this._foodLabel(id)}</span>
                  <small>${counts.get(id) ?? 0}</small>
                </button>
              `
            )}
          </div>
          ${missing
            ? html`<small class="inv-pairing-missing">${missing > 1
                ? this._t("ui.inventory.missingPairingsHintMany", { n: missing })
                : this._t("ui.inventory.missingPairingsHintOne", { n: missing })}</small>`
            : nothing}
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._showPairingPicker = false)}>
              ${this._t("ui.common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _winesWithoutPairings(): number {
    return this.wines.filter((w) => !splitMulti(w.food_pairings).length).length;
  }

  // ── Enrichment ────────────────────────────────────────────────

  // Vivino is the *only* source of food pairings; it also supplies the
  // description. Rating and photo are deliberately not part of the test —
  // Vivino has no match for plenty of bottles, and a wine that will never
  // gain a photo must not sit in this list forever nagging the user.
  private _missingVivinoData(w: Wine): boolean {
    return !w.food_pairings || !w.description;
  }

  // The AI supplies the drinking verdict and window; it never returns food
  // pairings. Critic scores are excluded for the same reason as the photo
  // above — the AI legitimately has none for many wines.
  private _missingAIData(w: Wine): boolean {
    return !w.disposition || !w.drink_window;
  }

  // Never consulted: the source has genuinely not been asked yet.
  private _winesNeedingVivino(): Wine[] {
    return this.wines.filter((w) => !w.vivino_checked_at && this._missingVivinoData(w));
  }

  private _winesNeedingAI(): Wine[] {
    return this.wines.filter((w) => !w.ai_checked_at && this._missingAIData(w));
  }

  // Asked, and the source had nothing. Kept apart from the counts above so a
  // retry is a deliberate act rather than an endless nag: Vivino does add
  // bottles to its catalogue over time, so retrying later is worth offering,
  // just not automatically.
  private _winesVivinoNotFound(): Wine[] {
    return this.wines.filter((w) => !!w.vivino_checked_at && this._missingVivinoData(w));
  }

  private _winesAINotFound(): Wine[] {
    return this.wines.filter((w) => !!w.ai_checked_at && this._missingAIData(w));
  }

  private async _runEnrich(source: "vivino" | "ai", retry = false) {
    const wines = retry
      ? source === "vivino"
        ? this._winesVivinoNotFound()
        : this._winesAINotFound()
      : source === "vivino"
        ? this._winesNeedingVivino()
        : this._winesNeedingAI();
    this._confirmEnrich = "";
    this._confirmEnrichRetry = false;
    if (!wines.length) return;

    const sourceLabel = source === "vivino" ? "Vivino" : this._t("ui.inventory.whatAiInfer");
    this._enriching = source;
    this._statusMsg = this._t("ui.inventory.refreshingWines", { n: wines.length, source: sourceLabel });
    try {
      const result = await this.hass.callWS({
        type: source === "vivino" ? "wine_cellar/batch_refresh_vivino" : "wine_cellar/batch_analyze_wines",
        wine_ids: wines.map((w) => w.id),
      });
      if (result?.error) {
        this._statusMsg = this._t("ui.inventory.refreshFailed", { error: result.error });
      } else {
        const updated = result?.updated ?? 0;
        const unchanged = result?.unchanged ?? 0;
        const errors = result?.errors ?? 0;
        const source = sourceLabel;
        const parts = [this._t("ui.inventory.enrichUpdated", { n: updated })];
        if (unchanged) parts.push(this._t("ui.inventory.enrichUnchanged", { n: unchanged, source }));
        if (errors) parts.push(this._t("ui.inventory.enrichErrors", { n: errors }));
        this._statusMsg =
          `${parts.join(", ")}.` +
          (unchanged
            ? retry
              ? " " + this._t("ui.inventory.enrichRetryNote")
              : " " + this._t("ui.inventory.enrichMoveToRetryNote")
            : "");
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.refreshFailed", { error: this._logStatus("enrich refresh failed", err) });
    }
    this._enriching = "";
  }

  // ── Filtering & sorting ───────────────────────────────────────

  private _matchesPreset(wine: Wine, currentYear: number, recentCutoff: string): boolean {
    switch (this._preset) {
      case "drink_this_year": {
        if (wine.disposition === "P") return false;
        const year = drinkByYear(wine);
        return year !== null ? year <= currentYear : wine.disposition === "D";
      }
      case "past_peak":
        return wine.disposition === "P";
      case "unrated":
        return !wine.user_rating;
      case "incomplete":
        return (
          !wine.food_pairings || !wine.description || !wine.drink_window || !wine.image_url
        );
      case "recent":
        return !!wine.added_at && wine.added_at >= recentCutoff;
      default:
        return true;
    }
  }

  private _getFilteredAndSortedWines(): Wine[] {
    let wines = [...this.wines];

    if (this._typeFilter !== "all") {
      wines = wines.filter((w) => w.type === this._typeFilter);
    }

    if (this._dispositionFilter !== "all") {
      const want = this._dispositionFilter;
      wines = wines.filter((w) =>
        want === "none" ? !w.disposition : w.disposition === want
      );
    }

    if (this._countryFilter !== "all") {
      const want = normalizeText(this._countryFilter);
      wines = wines.filter((w) => normalizeText(w.country) === want);
    }

    if (this._grapeFilter !== "all") {
      const want = normalizeText(this._grapeFilter);
      wines = wines.filter((w) => normalizeText(w.grape_variety).includes(want));
    }

    if (this._foodFilter !== "all") {
      wines = wines.filter((w) =>
        splitMulti(w.food_pairings).some((p) => categorizeFoodPairing(p) === this._foodFilter)
      );
    }

    if (this._cabinetFilter !== "all") {
      const known = new Set(this.cabinets.map((c) => c.id));
      wines = wines.filter((w) =>
        this._cabinetFilter === "unassigned"
          ? !w.cabinet_id || !known.has(w.cabinet_id)
          : w.cabinet_id === this._cabinetFilter
      );
    }

    if (this._minRating > 0) {
      wines = wines.filter((w) => (w.rating || 0) >= this._minRating);
    }

    // "Under X" can only be answered for wines that actually carry a price —
    // an unpriced bottle is unknown, not cheap.
    if (this._maxPrice !== null) {
      const max = this._maxPrice;
      wines = wines.filter((w) => {
        const price = w.retail_price || w.price;
        return !!price && price <= max;
      });
    }

    if (this._vintageMin !== null) {
      const min = this._vintageMin;
      wines = wines.filter((w) => w.vintage !== null && w.vintage >= min);
    }
    if (this._vintageMax !== null) {
      const max = this._vintageMax;
      wines = wines.filter((w) => w.vintage !== null && w.vintage <= max);
    }

    if (this._preset !== "all") {
      const currentYear = new Date().getFullYear();
      const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
      wines = wines.filter((w) => this._matchesPreset(w, currentYear, cutoff));
    }

    if (this._searchQuery) {
      wines = wines.filter((w) => matchesQuery(w, this._searchQuery, this.cabinets));
    }

    const dir = this._sortDir === "asc" ? 1 : -1;
    wines.sort((a, b) => {
      switch (this._sortField) {
        case "name":
          return dir * a.name.localeCompare(b.name);
        case "winery":
          return dir * (a.winery || "").localeCompare(b.winery || "");
        case "vintage":
          return dir * ((a.vintage || 0) - (b.vintage || 0));
        case "type":
          return dir * (a.type || "").localeCompare(b.type || "");
        case "rating":
          return dir * ((a.rating || 0) - (b.rating || 0));
        case "user_rating":
          return dir * ((a.user_rating || 0) - (b.user_rating || 0));
        case "price":
          return dir * ((a.retail_price || a.price || 0) - (b.retail_price || b.price || 0));
        case "drink_by":
          return compareNullable(drinkByYear(a), drinkByYear(b), dir, (x, y) => x - y);
        case "urgency": {
          // Past peak first, then drink-now, then hold, then unanalyzed —
          // within a bucket, the soonest drink-by year leads.
          const rank = (w: Wine) =>
            w.disposition === "P" ? 0 : w.disposition === "D" ? 1 : w.disposition === "H" ? 2 : 3;
          const byRank = rank(a) - rank(b);
          if (byRank !== 0) return dir * byRank;
          return compareNullable(drinkByYear(a), drinkByYear(b), dir, (x, y) => x - y);
        }
        case "purchase_date":
          return compareNullable(
            a.purchase_date || null,
            b.purchase_date || null,
            dir,
            (x, y) => x.localeCompare(y)
          );
        case "added_at":
          return dir * (a.added_at || "").localeCompare(b.added_at || "");
        case "cabinet": {
          const cabA = this.cabinets.find((c) => c.id === a.cabinet_id)?.name || "";
          const cabB = this.cabinets.find((c) => c.id === b.cabinet_id)?.name || "";
          return dir * cabA.localeCompare(cabB);
        }
        default:
          return 0;
      }
    });

    return wines;
  }

  private _computeStats(wines: Wine[]) {
    const count = wines.length;
    let totalValue = 0;
    const byType: Record<string, number> = {};

    for (const w of wines) {
      if (w.retail_price) totalValue += w.retail_price;
      else if (w.price) totalValue += w.price;
      const t = w.type || "unknown";
      byType[t] = (byType[t] || 0) + 1;
    }

    return { count, totalValue, byType };
  }

  // ── History ──────────────────────────────────────────────────

  private async _switchToHistory() {
    this._viewMode = "history";
    this._historyLoading = true;
    this._loadStorageInfo();
    try {
      const result = await this.hass.callWS({ type: "wine_cellar/get_wine_history" });
      this._historyItems = (result?.history || []).sort(
        (a: WineHistoryItem, b: WineHistoryItem) =>
          (b.removed_at || "").localeCompare(a.removed_at || "")
      );
    } catch (err) {
      console.error("Failed to load wine history", err);
      this._historyItems = [];
    }
    this._historyLoading = false;
  }

  private async _clearHistory() {
    try {
      await this.hass.callWS({ type: "wine_cellar/clear_wine_history" });
      this._historyItems = [];
      this._loadStorageInfo();
      this._statusMsg = this._t("ui.inventory.historyCleared");
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  }

  private async _restoreFromHistory(historyId: string) {
    try {
      await this.hass.callWS({ type: "wine_cellar/restore_wine", history_id: historyId });
      this._historyItems = this._historyItems.filter((i) => i.id !== historyId);
      this._statusMsg = this._t("ui.inventory.wineRestoredUnassigned");
      this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
    } catch (err) {
      console.error("Failed to restore wine from history", err);
      this._statusMsg = this._t("ui.inventory.restoreWineFailed");
    }
  }

  private _startEditHistory(item: WineHistoryItem) {
    if (this._editingHistoryId === item.id) {
      this._editingHistoryId = "";
      return;
    }
    this._editingHistoryId = item.id;
    this._editRating = item.personal_rating ?? 0;
    this._editNotes = item.drink_notes || "";
    this._editBuyAgain = !!item.buy_again;
  }

  private async _saveHistoryEntry(historyId: string) {
    this._historySaving = true;
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/update_history_entry",
        history_id: historyId,
        personal_rating: this._editRating || null,
        drink_notes: this._editNotes.trim(),
        buy_again: this._editBuyAgain,
      });
      this._historyItems = this._historyItems.map((i) => (i.id === historyId ? result.entry : i));
      this._editingHistoryId = "";
      this._statusMsg = this._t("ui.inventory.historySaved");
      // Buy again changes the Buy List the card shows.
      this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
    } catch (err) {
      console.error("Failed to save history entry", err);
      this._statusMsg = this._t("ui.inventory.historySaveFailed");
    }
    this._historySaving = false;
  }

  private _renderHistoryEditor(item: WineHistoryItem) {
    return html`
      <div class="inv-history-editor">
        <div style="display:flex;align-items:center;gap:8px;font-size:0.85em;color:var(--wc-text-secondary)">
          ${this._t("ui.inventory.myRatingLabel")}
          <star-rating
            .value=${this._editRating}
            .size=${22}
            @rating-change=${(e: CustomEvent) => (this._editRating = e.detail.value)}
          ></star-rating>
        </div>
        <textarea
          rows="3"
          placeholder="${this._t("ui.inventory.drinkNotesPlaceholder")}"
          .value=${this._editNotes}
          @input=${(e: Event) => (this._editNotes = (e.target as HTMLTextAreaElement).value)}
        ></textarea>
        <label>
          <input type="checkbox" .checked=${this._editBuyAgain}
            @change=${(e: Event) => (this._editBuyAgain = (e.target as HTMLInputElement).checked)} />
          <span>🛒 ${this._t("ui.inventory.buyAgainLabel")}
            <small style="color:var(--wc-text-secondary)"> — ${this._t("ui.inventory.buyAgainHint")}</small></span>
        </label>
        <div class="inv-editor-btns">
          <button class="inv-btn" @click=${() => (this._editingHistoryId = "")}>${this._t("ui.common.cancel")}</button>
          <button class="inv-btn active" ?disabled=${this._historySaving}
            @click=${() => this._saveHistoryEntry(item.id)}>${this._t("ui.common.save")}</button>
        </div>
      </div>
    `;
  }

  private _formatReason(reason: string): string {
    const labels = getRemovalReasons(this.hass?.language);
    return labels.find((r) => r.id === reason)?.label || reason;
  }

  private _formatDate(iso: string): string {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch { return iso; }
  }

  private _renderHistory() {
    if (this._historyLoading) {
      return html`<div class="inv-empty">${this._t("ui.inventory.loadingHistory")}</div>`;
    }
    if (this._historyItems.length === 0) {
      return html`
        ${this._renderStorageInfo()}
        <div class="inv-empty">${this._t("ui.inventory.noHistory")}</div>
        <div class="inv-footer">
          <span class="inv-count">${this._t("ui.inventory.winesRemoved", { n: 0 })}</span>
        </div>
      `;
    }
    const buyAgainCount = this._historyItems.filter((i) => i.buy_again).length;
    const items = this._buyAgainOnly ? this._historyItems.filter((i) => i.buy_again) : this._historyItems;
    return html`
      ${this._renderStorageInfo()}
      <div class="inv-history-filter">
        <button class="inv-btn ${this._buyAgainOnly ? "active" : ""}"
          @click=${() => (this._buyAgainOnly = !this._buyAgainOnly)}
        >${this._t("ui.inventory.buyAgainOnly")} (${buyAgainCount})</button>
      </div>
      <div class="inv-list">
        ${items.length === 0
          ? html`<div class="inv-empty">${this._t("ui.inventory.noBuyAgain")}</div>`
          : nothing}
        ${items.map(item => html`
          <div class="inv-history-item">
            ${item.image_url
              ? html`<img class="inv-thumb" src="${item.image_url}" alt="" loading="lazy" />`
              : html`<div class="inv-dot" style="background:${WINE_TYPE_COLORS[item.type as WineType] || "#999"}"></div>`}
            <div class="inv-info">
              <div class="inv-name">
                ${item.buy_again
                  ? html`<span class="inv-buy-again" title="${this._t("ui.inventory.buyAgainTitle")}">🛒</span>`
                  : nothing}${item.name}
              </div>
              <div class="inv-meta">
                ${item.winery}${item.vintage ? ` · ${item.vintage}` : ""}
                · <span class="inv-reason-badge">${this._formatReason(item.reason)}</span>
              </div>
              ${item.personal_rating
                ? html`<star-rating .value=${item.personal_rating} .size=${14} readonly></star-rating>`
                : nothing}
              ${item.drink_notes ? html`<div class="inv-drink-notes">${item.drink_notes}</div>` : nothing}
            </div>
            <div class="inv-right">
              ${item.price ? html`<div class="inv-price">${this.currency} ${item.price.toFixed(0)}</div>` : nothing}
              <div class="inv-location">${this._formatDate(item.removed_at)}</div>
              <div style="display:flex;flex-direction:column;gap:4px;margin-top:4px;align-items:flex-end">
                <button class="inv-btn" @click=${() => this._startEditHistory(item)}>
                  ${item.drink_notes || item.personal_rating
                    ? this._t("ui.inventory.editNotesBtn")
                    : this._t("ui.inventory.addNotesBtn")}
                </button>
                <button class="inv-btn" @click=${() => this._restoreFromHistory(item.id)}>${this._t("ui.inventory.restoreBtn")}</button>
              </div>
            </div>
            ${this._editingHistoryId === item.id ? this._renderHistoryEditor(item) : nothing}
          </div>
        `)}
      </div>
      <div class="inv-footer">
        <span class="inv-count">${this._t("ui.inventory.winesRemoved", { n: this._historyItems.length })}</span>
        ${this._statusMsg
          ? html`<div class="inv-status">${this._statusMsg}</div>`
          : nothing}
        <div class="inv-footer-btns">
          <button class="inv-btn" @click=${this._clearHistory}>${this._t("ui.inventory.clearHistoryBtn")}</button>
        </div>
      </div>
    `;
  }

  // Sits under the list: how many bottles are still missing data, and the two
  // actions that can fill it. Each source is labelled with what it actually
  // supplies, so nobody runs AI hoping for food pairings.
  private _renderEnrichRow(
    source: "vivino" | "ai",
    wines: Wine[],
    retry: boolean,
    text: unknown,
    label: string
  ) {
    if (!wines.length) return nothing;
    if (source === "ai" && !this.hasGemini) return nothing;
    const busy = !!this._enriching;
    return html`
      <div class="inv-enrich-row ${retry ? "retry" : ""}">
        <span class="inv-enrich-text">${text}</span>
        <button
          class="inv-btn"
          ?disabled=${busy}
          @click=${() => {
            this._confirmEnrich = source;
            this._confirmEnrichRetry = retry;
          }}
        >
          ${this._enriching === source ? this._t("ui.inventory.working") : `${label} (${wines.length})`}
        </button>
      </div>
    `;
  }

  private _renderEnrichBar() {
    const needVivino = this._winesNeedingVivino();
    const needAI = this._winesNeedingAI();
    const missVivino = this._winesVivinoNotFound();
    const missAI = this._winesAINotFound();
    if (!needVivino.length && !needAI.length && !missVivino.length && !missAI.length) {
      return nothing;
    }

    return html`
      <div class="inv-enrich">
        ${this._renderEnrichRow(
          "vivino",
          needVivino,
          false,
          html`<strong>${needVivino.length}</strong> ${this._t("ui.inventory.enrichMissingVivino")}`,
          this._t("ui.inventory.fillFromVivino")
        )}
        ${this._renderEnrichRow(
          "ai",
          needAI,
          false,
          html`<strong>${needAI.length}</strong> ${this._t("ui.inventory.enrichMissingAI")}`,
          this._t("ui.inventory.analyzeWithAi")
        )}
        ${this._renderEnrichRow(
          "vivino",
          missVivino,
          true,
          html`<strong>${missVivino.length}</strong> ${this._t("ui.inventory.enrichRetryVivino")}`,
          this._t("ui.inventory.retryVivino")
        )}
        ${this._renderEnrichRow(
          "ai",
          missAI,
          true,
          html`<strong>${missAI.length}</strong> ${this._t("ui.inventory.enrichRetryAI")}`,
          this._t("ui.inventory.retryAI")
        )}
      </div>
    `;
  }

  private _startReview(kind: "ai" | "vivino") {
    this._showReview = false;
    this.dispatchEvent(new CustomEvent(kind === "ai" ? "batch-ai-scan" : "batch-vivino-scan"));
  }

  private _renderReviewChooser() {
    if (!this._showReview) return nothing;
    return html`
      <div class="inv-confirm-overlay" @click=${() => (this._showReview = false)}>
        <div class="inv-confirm-box" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this._t("ui.inventory.reviewTitle")}</h3>
          <p>${this._t("ui.inventory.reviewIntro")}</p>
          <div class="inv-review-options">
            ${this.hasGemini ? html`
              <button class="inv-review-option" style="background:#1565c0" @click=${() => this._startReview("ai")}>
                <span>${this._t("ui.card.aiBatchScanBtn")}</span>
                <small>${this._t("ui.card.fullAiAnalysisTitle")}</small>
              </button>
            ` : nothing}
            <button class="inv-review-option" style="background:#8e24aa" @click=${() => this._startReview("vivino")}>
              <span>${this._t("ui.card.vivinoBatchScanBtn")}</span>
              <small>${this._t("ui.card.refreshVivinoTitle")}</small>
            </button>
          </div>
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._showReview = false)}>
              ${this._t("ui.common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderEnrichConfirm() {
    if (!this._confirmEnrich) return nothing;
    const source = this._confirmEnrich;
    const retry = this._confirmEnrichRetry;
    const count = retry
      ? source === "vivino"
        ? this._winesVivinoNotFound().length
        : this._winesAINotFound().length
      : source === "vivino"
        ? this._winesNeedingVivino().length
        : this._winesNeedingAI().length;
    return html`
      <div class="inv-confirm-overlay" @click=${() => (this._confirmEnrich = "")}>
        <div class="inv-confirm-box" @click=${(e: Event) => e.stopPropagation()}>
          <h3>
            ${source === "vivino"
              ? retry
                ? this._t("ui.inventory.retryVivinoQ")
                : this._t("ui.inventory.fillFromVivinoQ")
              : retry
                ? this._t("ui.inventory.retryAiQ")
                : this._t("ui.inventory.analyzeWithAiQ")}
          </h3>
          <p>
            ${count > 1
              ? this._t("ui.inventory.enrichConfirmBodyMany", { count })
              : this._t("ui.inventory.enrichConfirmBodyOne", { count })}
          </p>
          <div class="inv-confirm-stats">
            ${retry
              ? this._t("ui.inventory.retryExplain")
              : this._t("ui.inventory.newExplain", { source: source === "vivino" ? this._t("ui.inventory.vivinoCatalogue") : this._t("ui.inventory.whatAiInfer") })}
          </div>
          <div class="inv-confirm-stats">
            ${source === "vivino"
              ? this._t("ui.inventory.vivinoFillsExplain")
              : this._t("ui.inventory.aiFillsExplain")}
          </div>
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._confirmEnrich = "")}>
              ${this._t("ui.common.cancel")}
            </button>
            <button class="inv-confirm-go" @click=${() => this._runEnrich(source, retry)}>
              ${this._t("ui.common.start")}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderStorageInfo() {
    const info = this._storageInfo;
    if (!info) return nothing;
    const share = info.total_bytes
      ? Math.round((info.history_bytes / info.total_bytes) * 100)
      : 0;
    const heavy = info.history_bytes > 512 * 1024;
    return html`
      <div class="inv-storage-info ${heavy ? "heavy" : ""}">
        ${this._t("ui.inventory.dbSize", { total: this._formatBytes(info.total_bytes), history: this._formatBytes(info.history_bytes), share, wines: info.wines_count, archived: info.history_count })}
        ${heavy
          ? html`<br /><small>${this._t("ui.inventory.heavyHistoryHint")}</small>`
          : nothing}
      </div>
    `;
  }

  // ── Export CSV ─────────────────────────────────────────────────

  private _exportCSV() {
    const wines = this._getFilteredAndSortedWines();
    const headers = [
      "ID",
      "Name", "Winery", "Vintage", "Type", "Region", "Country",
      "Grape Variety", "Rating", "Ratings Count", "Purchase Price",
      "Retail Price", "Purchase Date", "Drink By", "Drink Window",
      "Disposition", "Notes", "Description", "Food Pairings",
      "Alcohol", "Cabinet", "Row", "Col", "Zone", "Depth",
      "User Rating", "Added At",
    ];

    const escapeCSV = (val: any): string => {
      if (val === null || val === undefined) return "";
      const str = String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = wines.map((w) =>
      [
        w.id,
        w.name, w.winery, w.vintage, w.type, w.region, w.country,
        w.grape_variety, w.rating, w.ratings_count, w.price,
        w.retail_price, w.purchase_date, w.drink_by, w.drink_window,
        w.disposition, w.notes, w.description, w.food_pairings,
        w.alcohol,
        this.cabinets.find((c) => c.id === w.cabinet_id)?.name || "",
        w.row !== null ? w.row + 1 : "",
        w.col !== null ? w.col + 1 : "",
        w.zone, w.depth, w.user_rating, w.added_at,
      ]
        .map(escapeCSV)
        .join(",")
    );

    // Excel only recognizes a CSV as UTF-8 when it starts with a BOM;
    // without it every accented wine name comes back mangled.
    const csv = "\ufeff" + [headers.join(","), ...rows].join("\n");
    this._downloadFile(
      csv,
      `wine-cellar-inventory-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv;charset=utf-8;"
    );
  }

  // ── Backup JSON ───────────────────────────────────────────────

  private async _backupJSON() {
    this._backingUp = true;
    this._statusMsg = "";
    try {
      const result = await this.hass.callWS({ type: "wine_cellar/get_backup" });
      const json = JSON.stringify(result, null, 2);
      this._downloadFile(
        json,
        `wine-cellar-backup-${new Date().toISOString().slice(0, 10)}.json`,
        "application/json"
      );
      this._statusMsg = this._t("ui.inventory.backupSaved", { wines: result.wines?.length || 0, cabinets: result.cabinets?.length || 0, buyList: result.buy_list?.length || 0 });
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.backupFailed", { error: this._logStatus("local backup save failed", err) });
    }
    this._backingUp = false;
  }

  // ── Import CSV ────────────────────────────────────────────────

  private _triggerImportCSV() {
    const input = this.shadowRoot?.querySelector("#inv-csv-input") as HTMLInputElement;
    if (input) {
      input.value = "";
      input.click();
    }
  }

  private async _handleImportCSV(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this._statusMsg = "";

    let wines: any[];
    try {
      wines = this._parseCSV(await file.text());
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.importFailed", { error: this._logStatus("CSV parse failed", err) });
      return;
    }

    if (wines.length === 0) {
      this._statusMsg = this._t("ui.inventory.noWinesInCsv");
      return;
    }

    // A CSV exported from here carries each bottle's ID. When those IDs match
    // wines already in the cellar the user almost certainly edited an export
    // (bulk price or drinking-window changes) and wants those bottles
    // updated, not duplicated — so ask instead of silently doubling the cellar.
    const knownIds = new Set(this.wines.map((w) => w.id));
    this._importMatches = wines.filter((w) => w.id && knownIds.has(w.id)).length;

    if (this._importMatches > 0) {
      this._pendingImport = wines;
      this._confirmImport = true;
      return;
    }

    await this._runImport(wines, "add");
  }

  private async _runImport(wines: any[], mode: "add" | "update") {
    this._confirmImport = false;
    this._pendingImport = null;
    this._importing = true;
    this._statusMsg = "";

    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/import_wines",
        wines,
        mode,
      });

      const added = result.imported || 0;
      const updated = result.updated || 0;
      const skipped = result.location_skipped || 0;
      const base = updated
        ? this._t("ui.inventory.importUpdated", { updated, addedPart: added ? this._t("ui.inventory.importAddedPart", { n: added }) : "" })
        : this._t("ui.inventory.importSuccess", { n: added });
      this._statusMsg = skipped
        ? `${base} ${skipped > 1
            ? this._t("ui.inventory.importSkippedNoteMany", { skipped })
            : this._t("ui.inventory.importSkippedNoteOne", { skipped })}`
        : base;
      this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.importFailed", { error: this._logStatus("wine import failed", err) });
    }
    this._importing = false;
  }

  private _parseCSV(text: string): any[] {
    const rows = this._parseCSVRows(text.replace(/^\ufeff/, ""));
    if (rows.length < 2) return [];

    // Parse header row
    const headers = rows[0].map((h) => h.trim().toLowerCase());

    // Map CSV headers to wine fields
    const fieldMap: Record<string, string> = {
      name: "name",
      winery: "winery",
      vintage: "vintage",
      type: "type",
      region: "region",
      country: "country",
      "grape variety": "grape_variety",
      grape_variety: "grape_variety",
      rating: "rating",
      "ratings count": "ratings_count",
      ratings_count: "ratings_count",
      "purchase price": "price",
      price: "price",
      "retail price": "retail_price",
      retail_price: "retail_price",
      "purchase date": "purchase_date",
      purchase_date: "purchase_date",
      "drink by": "drink_by",
      drink_by: "drink_by",
      "drink window": "drink_window",
      drink_window: "drink_window",
      disposition: "disposition",
      notes: "notes",
      description: "description",
      "food pairings": "food_pairings",
      food_pairings: "food_pairings",
      alcohol: "alcohol",
      zone: "zone",
      "user rating": "user_rating",
      user_rating: "user_rating",
      barcode: "barcode",
      id: "id",
      depth: "depth",
      cabinet: "cabinet",
      row: "row",
      col: "col",
      "added at": "added_at",
      added_at: "added_at",
    };

    const numericFields = new Set([
      "vintage", "rating", "ratings_count", "price",
      "retail_price", "user_rating", "depth", "row", "col",
    ]);

    const wines: any[] = [];
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (values.length === 0) continue;

      const wine: any = {};
      for (let j = 0; j < headers.length && j < values.length; j++) {
        const field = fieldMap[headers[j]];
        if (!field) continue;
        let val: any = values[j].trim();
        if (!val) continue;

        if (numericFields.has(field)) {
          const num = parseFloat(val);
          if (!isNaN(num)) val = num;
          else continue;
        }

        wine[field] = val;
      }

      // Validate wine type
      if (wine.type) {
        const validTypes = Object.keys(WINE_TYPE_LABELS);
        const lt = wine.type.toLowerCase();
        if (validTypes.includes(lt)) {
          wine.type = lt;
        } else {
          wine.type = "red";
        }
      }

      if (wine.name) {
        wines.push(wine);
      }
    }

    return wines;
  }

  // Quote-aware: a comma or newline inside a quoted field (as produced by
  // escapeCSV for multi-line Notes/Description) does not end the field/row.
  private _parseCSVRows(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;

    const endField = () => {
      row.push(field);
      field = "";
    };
    const endRow = () => {
      endField();
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    };

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        endField();
      } else if (ch === "\r") {
        // skip, \n (or end of text) closes the row
      } else if (ch === "\n") {
        endRow();
      } else {
        field += ch;
      }
    }
    if (field !== "" || row.length > 0) endRow();

    return rows;
  }

  // ── Restore JSON ──────────────────────────────────────────────

  private _triggerRestore() {
    const input = this.shadowRoot?.querySelector("#inv-json-input") as HTMLInputElement;
    if (input) {
      input.value = "";
      input.click();
    }
  }

  private async _handleRestoreFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data.wines || !Array.isArray(data.wines)) {
        this._statusMsg = this._t("ui.inventory.invalidBackupWines");
        return;
      }
      if (!data.cabinets || !Array.isArray(data.cabinets)) {
        this._statusMsg = this._t("ui.inventory.invalidBackupCabinets");
        return;
      }

      this._restoreData = data;
      this._confirmRestore = true;
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.invalidJsonFile", { error: this._logStatus("invalid restore JSON", err) });
    }
  }

  private async _executeRestore() {
    if (!this._restoreData) return;

    this._confirmRestore = false;
    this._restoring = true;
    this._statusMsg = "";

    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/restore_backup",
        backup: this._restoreData,
      });

      if (result.error) {
        this._statusMsg = this._t("ui.inventory.restoreFailed", { error: result.error });
      } else {
        this._statusMsg = this._t("ui.inventory.restoredCount", { wines: result.wines, cabinets: result.cabinets, buyList: result.buy_list });
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.restoreFailed", { error: this._logStatus("local restore failed", err) });
    }

    this._restoring = false;
    this._restoreData = null;
  }

  // ── Cloud Sync (Google Drive / file system) ──────────────────

  private async _serverBackupSave() {
    this._serverBackingUp = true;
    this._serverBackupLabel = this._t("ui.inventory.savingEllipsis");
    this._statusMsg = "";
    try {
      const result = await this.hass.callWS({ type: "wine_cellar/server_backup_save" });
      if (result && result.error) {
        this._statusMsg = this._t("ui.inventory.serverBackupFailed", { error: result.error });
        this._serverBackupLabel = "";
      } else {
        this._statusMsg = this._t("ui.inventory.savedToServer", { wines: result?.wines ?? "?", cabinets: result?.cabinets ?? "?" });
        this._serverBackupLabel = this._t("ui.inventory.savedCheckmark");
        setTimeout(() => { this._serverBackupLabel = ""; }, 4000);
      }
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.serverBackupFailed", { error: this._logStatus("server backup save failed", err) });
      this._serverBackupLabel = "";
    }
    this._serverBackingUp = false;
  }

  private async _serverBackupShowRestore() {
    this._showServerRestore = true;
    this._statusMsg = "";
    try {
      const result = await this.hass.callWS({ type: "wine_cellar/server_backup_list" });
      this._serverBackups = result?.backups || [];
      if (typeof result?.keep === "number") this._backupKeep = result.keep;
      if (Array.isArray(result?.keep_choices)) this._backupKeepChoices = result.keep_choices;
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.listBackupsFailed", { error: this._logStatus("server backup list failed", err) });
      this._serverBackups = [];
    }
  }

  private _formatBytes(bytes: number): string {
    if (!bytes) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private async _setBackupKeep(keep: number) {
    this._backupKeep = keep;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { server_backup_keep: keep },
      });
      this._statusMsg =
        keep === 0
          ? this._t("ui.inventory.keepEveryBackup")
          : this._t("ui.inventory.keepNBackups", { n: keep });
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.retentionSaveFailed", { error: this._logStatus("backup retention save failed", err) });
    }
  }

  private async _serverBackupDelete(filename: string) {
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/server_backup_delete",
        filename,
      });
      if (result?.error) {
        this._statusMsg = this._t("ui.inventory.deleteFailed", { error: result.error });
        return;
      }
      this._serverBackups = this._serverBackups.filter((b: any) => b.filename !== filename);
      this._statusMsg = this._t("ui.inventory.deletedFile", { filename });
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.deleteFailed", { error: this._logStatus("server backup delete failed", err) });
    }
  }

  private async _loadStorageInfo() {
    try {
      this._storageInfo = await this.hass.callWS({ type: "wine_cellar/get_storage_info" });
    } catch {
      this._storageInfo = null;
    }
  }

  private async _serverBackupRestore(filename: string) {
    this._showServerRestore = false;
    this._serverRestoring = true;
    this._statusMsg = "";
    try {
      const result = await this.hass.callWS({ type: "wine_cellar/server_backup_restore", filename });
      if (result.error) {
        this._statusMsg = this._t("ui.inventory.restoreFailed", { error: result.error });
      } else {
        this._statusMsg = this._t("ui.inventory.restoredFromServer", { wines: result.wines, cabinets: result.cabinets, filename });
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err: any) {
      this._statusMsg = this._t("ui.inventory.restoreFailed", { error: this._logStatus("server backup restore failed", err) });
    }
    this._serverRestoring = false;
  }

  // ── Helpers ───────────────────────────────────────────────────

  private _downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private _showWineDetail(wine: Wine) {
    this._detailWine = wine;
    this._showDetail = true;
  }

  // Parses a number input back to `null` when emptied, so clearing a bound
  // actually removes the filter instead of turning it into 0.
  private _numberOrNull(e: Event): number | null {
    const raw = (e.target as HTMLInputElement).value.trim();
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private _renderFilterPanel(missingPairings: number) {
    const foodOptions = this._foodOptions();
    const countryOptions = this._countryOptions();
    const grapeOptions = this._grapeOptions();

    return html`
      <div class="inv-filter-panel">
        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.readyToDrink")}</span>
          <select
            @change=${(e: Event) => {
              this._dispositionFilter = (e.target as HTMLSelectElement).value;
              this._savePrefs();
            }}
          >
            <option value="all" ?selected=${this._dispositionFilter === "all"}>${this._t("ui.common.any")}</option>
            <option value="D" ?selected=${this._dispositionFilter === "D"}>${this._t("ui.inventory.filterDrinkNow")}</option>
            <option value="H" ?selected=${this._dispositionFilter === "H"}>${this._t("ui.inventory.filterHold")}</option>
            <option value="P" ?selected=${this._dispositionFilter === "P"}>${this._t("ui.inventory.filterPastPeak")}</option>
            <option value="none" ?selected=${this._dispositionFilter === "none"}>
              ${this._t("ui.inventory.filterNotAnalyzed")}
            </option>
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.pairsWith")}</span>
          <select
            @change=${(e: Event) => {
              this._foodFilter = (e.target as HTMLSelectElement).value;
              this._savePrefs();
            }}
          >
            <option value="all" ?selected=${this._foodFilter === "all"}>${this._t("ui.inventory.anyFood")}</option>
            ${foodOptions.map(
              (f) => html`<option value=${f} ?selected=${this._foodFilter === f}>${this._foodLabel(f)}</option>`
            )}
          </select>
          ${missingPairings
            ? html`<small class="inv-filter-hint"
                >${missingPairings > 1 ? this._t("ui.inventory.missingPairingsHintMany", { n: missingPairings }) : this._t("ui.inventory.missingPairingsHintOne", { n: missingPairings })}</small
              >`
            : nothing}
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.country")}</span>
          <select
            @change=${(e: Event) => {
              this._countryFilter = (e.target as HTMLSelectElement).value;
              this._savePrefs();
            }}
          >
            <option value="all" ?selected=${this._countryFilter === "all"}>${this._t("ui.common.any")}</option>
            ${countryOptions.map(
              (c) => html`<option value=${c} ?selected=${this._countryFilter === c}>${c}</option>`
            )}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.grape")}</span>
          <select
            @change=${(e: Event) => {
              this._grapeFilter = (e.target as HTMLSelectElement).value;
              this._savePrefs();
            }}
          >
            <option value="all" ?selected=${this._grapeFilter === "all"}>${this._t("ui.common.any")}</option>
            ${grapeOptions.map(
              (g) => html`<option value=${g} ?selected=${this._grapeFilter === g}>${g}</option>`
            )}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.cabinet")}</span>
          <select
            @change=${(e: Event) => {
              this._cabinetFilter = (e.target as HTMLSelectElement).value;
              this._savePrefs();
            }}
          >
            <option value="all" ?selected=${this._cabinetFilter === "all"}>${this._t("ui.common.any")}</option>
            ${this.cabinets.map(
              (c) =>
                html`<option value=${c.id} ?selected=${this._cabinetFilter === c.id}>
                  ${c.name}
                </option>`
            )}
            <option value="unassigned" ?selected=${this._cabinetFilter === "unassigned"}>
              ${this._t("wineLocation.unassigned")}
            </option>
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.minRating")}</span>
          <select
            @change=${(e: Event) => {
              this._minRating = Number((e.target as HTMLSelectElement).value);
              this._savePrefs();
            }}
          >
            ${[0, 3, 3.5, 4, 4.5].map(
              (r) =>
                html`<option value=${r} ?selected=${this._minRating === r}>
                  ${r === 0 ? this._t("ui.common.any") : `★ ${r}+`}
                </option>`
            )}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.maxPrice")}</span>
          <input
            type="number"
            min="0"
            placeholder="${this._t("ui.common.any")}"
            .value=${this._maxPrice === null ? "" : String(this._maxPrice)}
            @change=${(e: Event) => {
              this._maxPrice = this._numberOrNull(e);
              this._savePrefs();
            }}
          />
          <small class="inv-filter-hint">${this._t("ui.inventory.pricedOnly")}</small>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.vintage")}</span>
          <div class="inv-filter-range">
            <input
              type="number"
              placeholder="${this._t("ui.inventory.fromPlaceholder")}"
              .value=${this._vintageMin === null ? "" : String(this._vintageMin)}
              @change=${(e: Event) => {
                this._vintageMin = this._numberOrNull(e);
                this._savePrefs();
              }}
            />
            <input
              type="number"
              placeholder="${this._t("ui.inventory.toPlaceholder")}"
              .value=${this._vintageMax === null ? "" : String(this._vintageMax)}
              @change=${(e: Event) => {
                this._vintageMax = this._numberOrNull(e);
                this._savePrefs();
              }}
            />
          </div>
        </label>
      </div>
    `;
  }

  private _renderWineItem(wine: Wine) {
    const typeColor = WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
    const location = getWineLocation(wine, this.cabinets, this.hass?.language).text;
    // Sorting by drink-by is useless if the value stays invisible.
    const drinkBy = drinkByYear(wine);
    const displayPrice = wine.retail_price || wine.price;
    // A retail_price keeps the currency it was actually captured in — show
    // that instead of the globally selected one, or a stale price ends up
    // mislabeled as if it were in the new currency.
    const displayCurrency = wine.retail_price ? (wine.retail_price_currency || this.currency) : this.currency;

    return html`
      <div class="inv-item" @click=${() => this._showWineDetail(wine)}>
        ${wine.image_url
          ? html`<img class="inv-thumb" src="${wine.image_url}" alt="" loading="lazy" />`
          : html`<div class="inv-dot" style="background: ${typeColor}"></div>`}
        <div class="inv-info">
          <div class="inv-name">${wine.name}</div>
          <div class="inv-meta">
            ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}${wine.rating
              ? ` · ★${wine.rating.toFixed(1)}`
              : ""}${wine.disposition
              ? html` ·
                  <span
                    style="color: ${wine.disposition === "D"
                      ? "#2e7d32"
                      : wine.disposition === "H"
                        ? "#1565c0"
                        : wine.disposition === "P"
                          ? "#c62828"
                          : "inherit"}"
                    >${wine.disposition === "D"
                      ? this._t("ui.disposition.drink")
                      : wine.disposition === "H"
                        ? this._t("ui.disposition.hold")
                        : wine.disposition === "P"
                          ? this._t("ui.disposition.pastPeak")
                          : ""}</span
                  >`
              : nothing}${drinkBy
              ? html` · <span class="inv-drink-by">${this._t("ui.inventory.byYear", { year: drinkBy })}</span>`
              : nothing}
          </div>
        </div>
        <div class="inv-right">
          ${displayPrice ? html`<div class="inv-price">${displayCurrency} ${displayPrice.toFixed(0)}</div>` : nothing}
          <div class="inv-location">${location}</div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.open) return nothing;

    const filteredWines = this._getFilteredAndSortedWines();
    const activeFilters = this._activeFilterCount();
    const narrowed = activeFilters > 0 || !!this._searchQuery;
    // With a filter on, cellar-wide totals are the wrong answer: the point of
    // narrowing is to know what the *selection* holds and what it is worth.
    const allStats = this._computeStats(narrowed ? filteredWines : this.wines);
    const missingPairings = this._winesWithoutPairings();

    const sortOptions: { value: SortField; label: string }[] = [
      { value: "name", label: this._t("ui.inventory.sort.name") },
      { value: "winery", label: this._t("ui.inventory.sort.winery") },
      { value: "vintage", label: this._t("ui.inventory.sort.vintage") },
      { value: "type", label: this._t("ui.inventory.sort.type") },
      { value: "rating", label: this._t("ui.inventory.sort.rating") },
      { value: "user_rating", label: this._t("ui.inventory.sort.myRating") },
      { value: "price", label: this._t("ui.inventory.sort.price") },
      { value: "drink_by", label: this._t("ui.inventory.sort.drinkBy") },
      { value: "urgency", label: this._t("ui.inventory.sort.urgency") },
      { value: "purchase_date", label: this._t("ui.inventory.sort.purchaseDate") },
      { value: "added_at", label: this._t("ui.inventory.sort.dateAdded") },
      { value: "cabinet", label: this._t("ui.inventory.sort.cabinet") },
    ];

    const presets: { id: Preset; label: string; hint: string }[] = [
      { id: "all", label: this._t("ui.inventory.preset.allLabel"), hint: this._t("ui.inventory.preset.allHint") },
      {
        id: "drink_this_year",
        label: this._t("ui.inventory.preset.drinkThisYearLabel"),
        hint: this._t("ui.inventory.preset.drinkThisYearHint", { year: new Date().getFullYear() }),
      },
      { id: "past_peak", label: this._t("ui.inventory.preset.pastPeakLabel"), hint: this._t("ui.inventory.preset.pastPeakHint") },
      { id: "unrated", label: this._t("ui.inventory.preset.unratedLabel"), hint: this._t("ui.inventory.preset.unratedHint") },
      {
        id: "incomplete",
        label: this._t("ui.inventory.preset.incompleteLabel"),
        hint: this._t("ui.inventory.preset.incompleteHint"),
      },
      { id: "recent", label: this._t("ui.inventory.preset.recentLabel"), hint: this._t("ui.inventory.preset.recentHint") },
    ];

    const filters: { id: string; label: string }[] = [
      { id: "all", label: this._t("ui.inventory.preset.allLabel") },
      { id: "red", label: this._t("wineType.red") },
      { id: "white", label: this._t("wineType.white") },
      { id: "rosé", label: this._t("wineType.rosé") },
      { id: "sparkling", label: this._t("wineType.sparkling") },
      { id: "dessert", label: this._t("wineType.dessert") },
      ...(this.enableWhisky ? [{ id: "whisky", label: this._t("wineType.whisky") }] : []),
    ];

    const busy = this._importing || this._restoring || this._backingUp || this._serverBackingUp || this._serverRestoring;

    return html`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="max-width:800px;position:relative" @click=${(e: Event) => e.stopPropagation()}>
          <!-- Header -->
          <div class="inv-header">
            <span class="inv-header-title">${this._t("ui.inventory.title")}</span>
            <div class="inv-header-actions">
              <button
                class="inv-review-btn"
                @click=${() => (this._showReview = true)}
                ?disabled=${this.analyzing || this.batchVivino}
              >
                ${this.analyzing
                  ? this._t("ui.card.aiScanning")
                  : this.batchVivino
                    ? this._t("ui.card.vivinoScanning")
                    : this._t("ui.inventory.reviewBtn")}
              </button>
              <button class="inv-close" @click=${this._close}>✕</button>
            </div>
          </div>

          <!-- Inventory / History Toggle -->
          <div class="inv-toggle">
            <button
              class="${this._viewMode === "inventory" ? "active" : ""}"
              @click=${() => { this._viewMode = "inventory"; }}
            >${this._t("ui.inventory.tabInventory")}</button>
            <button
              class="${this._viewMode === "history" ? "active" : ""}"
              @click=${() => this._switchToHistory()}
            >${this._t("ui.inventory.tabHistory")}</button>
          </div>

          ${this._viewMode === "history" ? this._renderHistory() : html`
          <!-- Summary Stats -->
          <div class="inv-stats">
            <div class="stat">
              <span class="stat-value">${allStats.count}</span>
              ${narrowed ? this._t("ui.inventory.ofNBottles", { n: this.wines.length }) : this._t("ui.card.statBottles")}
            </div>
            ${allStats.totalValue
              ? html`
                  <div class="stat">
                    <span class="stat-value"
                      >${this.currency} ${allStats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span
                    >
                    ${this._t("ui.inventory.estValue")}
                  </div>
                `
              : nothing}
            ${Object.entries(allStats.byType).map(
              ([type, count]) => html`
                <div class="stat">
                  <span
                    class="inv-type-dot-sm"
                    style="background:${WINE_TYPE_COLORS[type as WineType] || "#999"}"
                  ></span>
                  <span class="stat-value">${count}</span>
                  ${getWineTypeLabels(this.hass?.language)[type as WineType] || type}
                </div>
              `
            )}
          </div>

          <!-- Search + Sort -->
          <div class="inv-controls">
            <div class="inv-search-wrapper">
              <span class="inv-search-icon">🔍</span>
              <input
                type="text"
                placeholder="${this._t('ui.inventory.searchPlaceholder')}"
                .value=${this._searchQuery}
                @input=${(e: InputEvent) => {
                  this._searchQuery = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div class="inv-sort">
              <select
                @change=${(e: Event) => {
                  this._sortField = (e.target as HTMLSelectElement).value as SortField;
                  this._savePrefs();
                }}
              >
                ${sortOptions.map(
                  (o) =>
                    html`<option value=${o.value} ?selected=${this._sortField === o.value}>
                      ${o.label}
                    </option>`
                )}
              </select>
              <button
                class="inv-sort-dir"
                @click=${() => {
                  this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
                  this._savePrefs();
                }}
                title="${this._sortDir === "asc" ? this._t('ui.inventory.ascending') : this._t('ui.inventory.descending')}"
              >
                ${this._sortDir === "asc" ? "↑" : "↓"}
              </button>
              <button
                class="inv-filter-toggle ${activeFilters ? "active" : ""}"
                @click=${() => {
                  this._showFilters = !this._showFilters;
                }}
                title="${this._t('ui.inventory.moreFiltersTitle')}"
              >
                ${this._t('ui.inventory.filtersBtn')}${activeFilters
                  ? html`<span class="inv-filter-badge">${activeFilters}</span>`
                  : nothing}
              </button>
            </div>
          </div>

          <!-- Quick views -->
          <div class="inv-chips">
            ${presets.map(
              (p) => html`
                <button
                  class="inv-chip preset ${this._preset === p.id ? "active" : ""}"
                  title=${p.hint}
                  @click=${() => {
                    this._preset = p.id;
                    this._savePrefs();
                  }}
                >
                  ${p.label}
                </button>
              `
            )}
          </div>

          <!-- Type Filter Chips -->
          <div class="inv-chips">
            ${filters.map(
              (f) => html`
                <button
                  class="inv-chip ${this._typeFilter === f.id ? "active" : ""}"
                  @click=${() => {
                    this._typeFilter = f.id;
                    this._savePrefs();
                  }}
                >
                  ${f.label}
                </button>
              `
            )}
          </div>

          ${this._showFilters ? this._renderFilterPanel(missingPairings) : nothing}

          ${this.pairingMode && this._foodFilter !== "all"
            ? html`
                <div class="inv-pairing-banner">
                  <span>${FOOD_ICONS[this._foodFilter] ?? "🍽️"} ${this._t("ui.inventory.pairingBanner", { food: this._foodLabel(this._foodFilter) })}</span>
                  <button class="inv-clear-filters" @click=${() => (this._showPairingPicker = true)}>
                    ${this._t("ui.inventory.pairingChange")}
                  </button>
                </div>
              `
            : nothing}

          ${narrowed
            ? html`
                <div class="inv-active-filters">
                  <span
                    >${this._t("ui.inventory.winesShown", { shown: filteredWines.length, total: this.wines.length })}${activeFilters
                      ? this._t("ui.inventory.filtersActive", { n: activeFilters, plural: activeFilters > 1 ? "s" : "" })
                      : ""}</span
                  >
                  <button class="inv-clear-filters" @click=${this._clearFilters}>
                    ${this._t("ui.inventory.clearAll")}
                  </button>
                </div>
              `
            : nothing}

          ${this._renderEnrichBar()}

          <!-- Wine List -->
          <div class="inv-list">
            ${filteredWines.length === 0
              ? html`<div class="inv-empty">${this._t("ui.card.noSearchResults")}</div>`
              : filteredWines.map((w) => this._renderWineItem(w))}
          </div>

          <!-- Footer -->
          <div class="inv-footer">
            <span class="inv-count">
              ${filteredWines.length === this.wines.length
                ? this._t("ui.inventory.footerCountAll", { n: filteredWines.length })
                : this._t("ui.inventory.footerCountFiltered", { shown: filteredWines.length, total: this.wines.length })}
            </span>
            ${this._statusMsg
              ? html`<div class="inv-status">${this._statusMsg}</div>`
              : nothing}
            <div class="inv-footer-btns">
              <button
                class="inv-btn"
                @click=${this._serverBackupSave}
                ?disabled=${busy}
                title="${this._t('ui.inventory.saveServerBackupTitle')}"
              >
                ${this._serverBackupLabel || this._t("ui.inventory.serverBackupBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._serverBackupShowRestore}
                ?disabled=${busy}
                title="${this._t('ui.inventory.restoreServerBackupTitle')}"
              >
                ${this._serverRestoring ? this._t("ui.inventory.restoringEllipsis") : this._t("ui.inventory.serverRestoreBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._backupJSON}
                ?disabled=${busy}
                title="${this._t('ui.inventory.downloadBackupTitle')}"
              >
                ${this._backingUp ? this._t("ui.inventory.savingEllipsis") : this._t("ui.inventory.downloadBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._triggerRestore}
                ?disabled=${busy}
                title="${this._t('ui.inventory.restoreFromFileTitle')}"
              >
                ${this._restoring ? this._t("ui.inventory.restoringEllipsis") : this._t("ui.inventory.uploadBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._triggerImportCSV}
                ?disabled=${busy}
                title="${this._t('ui.inventory.importCsvTitle')}"
              >
                ${this._importing ? this._t("ui.inventory.importingEllipsis") : this._t("ui.inventory.importCsvBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._exportCSV}
                ?disabled=${busy}
                title="${this._t('ui.inventory.exportCsvTitle')}"
              >
                ${this._t("ui.inventory.exportCsvBtn")}
              </button>
            </div>
          </div>

          `}

          <!-- Hidden file inputs -->
          <input
            type="file"
            id="inv-csv-input"
            accept=".csv"
            style="display:none"
            @change=${this._handleImportCSV}
          />
          <input
            type="file"
            id="inv-json-input"
            accept=".json"
            style="display:none"
            @change=${this._handleRestoreFile}
          />

          <!-- Server Restore Picker Overlay -->
          ${this._showServerRestore
            ? html`
                <div class="inv-confirm-overlay" @click=${() => (this._showServerRestore = false)}>
                  <div class="inv-confirm-box" style="max-width:420px" @click=${(e: Event) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.serverBackupsTitle")}</h3>
                    <label class="inv-keep-row">
                      <span>${this._t("ui.inventory.keepTheLast")}</span>
                      <select
                        @change=${(e: Event) =>
                          this._setBackupKeep(Number((e.target as HTMLSelectElement).value))}
                      >
                        ${this._backupKeepChoices.map(
                          (n) => html`<option value=${n} ?selected=${this._backupKeep === n}>
                            ${n === 0 ? this._t("ui.inventory.allNeverDelete") : this._t("ui.inventory.nBackups", { n })}
                          </option>`
                        )}
                      </select>
                    </label>
                    ${this._serverBackups.length === 0
                      ? html`<p>${this._t("ui.inventory.noServerBackups")}</p>`
                      : html`
                        <p>
                          ${this._t("ui.inventory.selectBackupToRestore1")} <strong>${this._t("ui.common.replace")}</strong>
                          ${this._t("ui.inventory.selectBackupToRestore2", { n: this._serverBackups.length, size: this._formatBytes(
                            this._serverBackups.reduce((t: number, b: any) => t + (b.size || 0), 0)
                          ) })}
                        </p>
                        <div class="inv-backup-list">
                          ${this._serverBackups.map(
                            (b: any) => html`
                              <div class="inv-backup-row">
                                <button
                                  class="inv-btn inv-backup-pick"
                                  @click=${() => this._serverBackupRestore(b.filename)}
                                >
                                  <div>${b.timestamp ? new Date(b.timestamp).toLocaleString() : b.filename}</div>
                                  <div class="inv-backup-meta">
                                    ${b.error
                                      ? this._t("ui.inventory.unreadableFile")
                                      : this._t("ui.inventory.backupMeta", { wines: b.wines, cabinets: b.cabinets, size: this._formatBytes(b.size || 0) })}
                                  </div>
                                </button>
                                <button
                                  class="inv-backup-del"
                                  title="${this._t('ui.inventory.deleteThisBackup')}"
                                  @click=${() => this._serverBackupDelete(b.filename)}
                                >
                                  🗑
                                </button>
                              </div>
                            `
                          )}
                        </div>
                      `}
                    <div class="inv-confirm-btns">
                      <button class="inv-confirm-cancel" @click=${() => (this._showServerRestore = false)}>
                        ${this._t("ui.common.close")}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : nothing}

          ${this._renderEnrichConfirm()}
          ${this._renderReviewChooser()}
          ${this._renderPairingPicker()}

          <!-- CSV Import Mode Overlay -->
          ${this._confirmImport && this._pendingImport
            ? html`
                <div class="inv-confirm-overlay" @click=${() => (this._confirmImport = false)}>
                  <div class="inv-confirm-box" @click=${(e: Event) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.updateExistingQ")}</h3>
                    <p>
                      ${this._t("ui.inventory.csvEditedExportNote")}
                    </p>
                    <div class="inv-confirm-stats">
                      <strong>${this._importMatches}</strong> ${this._t("ui.inventory.rowsMatchExisting", { plural: this._importMatches > 1 ? "s" : "" })} ·
                      <strong>${this._pendingImport.length - this._importMatches}</strong> ${this._t("ui.common.new", { plural: this._pendingImport.length - this._importMatches > 1 ? "x" : "" })}
                      <br />
                      <small>
                        ${this._t("ui.inventory.updateOnlyTouchesNote")}
                      </small>
                    </div>
                    <div class="inv-confirm-btns">
                      <button
                        class="inv-confirm-cancel"
                        @click=${() => this._runImport(this._pendingImport!, "add")}
                      >
                        ${this._t("ui.inventory.addAllAsNew")}
                      </button>
                      <button
                        class="inv-confirm-go"
                        @click=${() => this._runImport(this._pendingImport!, "update")}
                      >
                        ${this._t("ui.inventory.updateNWines", { n: this._importMatches, plural: this._importMatches > 1 ? "s" : "" })}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : nothing}

          <!-- Restore Confirmation Overlay -->
          ${this._confirmRestore && this._restoreData
            ? html`
                <div class="inv-confirm-overlay" @click=${() => (this._confirmRestore = false)}>
                  <div class="inv-confirm-box" @click=${(e: Event) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.restoreBackupQ")}</h3>
                    <p>
                      ${this._t("ui.inventory.restoreWillReplaceNote")}
                    </p>
                    <div class="inv-confirm-stats">
                      ${this._t("ui.inventory.backupContains")}<br />
                      <strong>${this._restoreData.wines?.length || 0}</strong> ${this._t("ui.inventory.winesWord")} ·
                      <strong>${this._restoreData.cabinets?.length || 0}</strong> ${this._t("ui.inventory.racksWord")} ·
                      <strong>${this._restoreData.buy_list?.length || 0}</strong> ${this._t("ui.inventory.buyListItemsWord")}
                      ${this._restoreData.timestamp
                        ? html`<br /><small>${this._t("ui.inventory.createdLabel", { date: new Date(this._restoreData.timestamp).toLocaleString() })}</small>`
                        : nothing}
                    </div>
                    <div class="inv-confirm-btns">
                      <button class="inv-confirm-cancel" @click=${() => (this._confirmRestore = false)}>
                        ${this._t("ui.common.cancel")}
                      </button>
                      <button class="inv-confirm-go" @click=${this._executeRestore}>
                        ${this._t("ui.inventory.restoreNowBtn")}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : nothing}
        </div>
      </div>

      <!-- Sub-dialog: Wine Detail -->
      <wine-detail-dialog
        .wine=${this._detailWine}
        .hass=${this.hass}
        .cabinets=${this.cabinets}
        .open=${this._showDetail}
        .hasGemini=${this.hasGemini}
        .mode=${"cellar"}
        @close=${() => (this._showDetail = false)}
        @wine-updated=${() => {
          this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }}
        @locate-wine=${(e: CustomEvent) => {
          this._showDetail = false;
          this.dispatchEvent(new CustomEvent("locate-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @copy-wine=${(e: CustomEvent) => {
          this._showDetail = false;
          this.dispatchEvent(new CustomEvent("copy-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @move-wine=${(e: CustomEvent) => {
          this._showDetail = false;
          this.dispatchEvent(new CustomEvent("move-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @remove-wine=${(e: CustomEvent) => {
          this._showDetail = false;
          this.dispatchEvent(new CustomEvent("remove-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
      ></wine-detail-dialog>
    `;
  }
}
