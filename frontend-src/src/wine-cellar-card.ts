import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles, touchStyles } from "./styles";
import { Wine, Cabinet, CellarStats, WINE_TYPE_COLORS, WineType, StorageRow, StorageRowType, BOX_SIZES, getRackSlots, getWineLocation, getShelfSlotGroups, ShelfSlotGroup, getSteppedSlotGroups, SteppedSlotGroup } from "./models";
import { t } from "./i18n";
import { matchesQuery } from "./utils/search";
import { Finding, analyzeArrangement } from "./utils/arrange";

import "./components/arrangement-dialog";
import "./components/cabinet-grid";
import "./components/wine-detail-dialog";
import "./components/add-wine-dialog";
import "./components/search-bar";
import "./components/rack-settings-dialog";
import "./components/wine-list-dialog";
import "./components/inventory-dialog";
import "./components/vivino-ai-settings-dialog";

// How long an incoming change waits before the card re-fetches, and the floor
// on how often it may do so at all.
const REFRESH_DEBOUNCE_MS = 400;
const REFRESH_MIN_INTERVAL_MS = 3000;

interface WineCellarCardConfig {
  type: string;
  title?: string;
}

@customElement("wine-cellar-card")
export class WineCellarCard extends LitElement {
  @property({ attribute: false }) hass: any;

  // HA's frontend can reject an in-flight unsubscribe with this specific
  // error when the websocket connection already dropped underneath it
  // (page navigation, HA restart, tab backgrounded) — harmless, the
  // subscription is gone either way, but left unhandled it surfaces as a
  // console error on every reload. Scoped to this one error shape so any
  // other unhandled rejection still surfaces normally.
  private _onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    if (reason?.code === "not_found" && reason?.message === "Subscription not found.") {
      event.preventDefault();
      console.debug("Cork Dork: suppressed stale websocket subscription cleanup error");
    }
  };

  @state() private _config?: WineCellarCardConfig;
  @state() private _wines: Wine[] = [];
  @state() private _cabinets: Cabinet[] = [];
  @state() private _stats: CellarStats | null = null;
  @state() private _activeTab = "all";
  @state() private _searchQuery = "";
  @state() private _searchFilter = "all";
  @state() private _selectedWine: Wine | null = null;
  @state() private _showDetail = false;
  @state() private _detailMode: "cellar" | "buylist" | "winelist" = "cellar";
  @state() private _showAddDialog = false;
  @state() private _addPreselect = { cabinet: "", row: null as number | null, col: null as number | null, zone: "", depth: 0 };
  @state() private _loading = true;
  @state() private _showRackSettings = false;
  @state() private _copiedWine: Wine | null = null;
  @state() private _movingWine: Wine | null = null;
  @state() private _analyzing = false;
  @state() private _batchVivino = false;
  @state() private _showBatchVivinoConfirm = false;
  @state() private _showBatchAiConfirm = false;
  @state() private _batchAiFallback = false;
  @state() private _vivinoSyncing = false;
  @state() private _toast = "";
  @state() private _hasGemini = false;
  @state() private _hasVivinoAccount = false;
  @state() private _vivinoMode = "import";
  // Vivino-side removals awaiting the user's bottle choice (vivino_id -> entry)
  @state() private _pendingRemovals: Record<string, any> = {};
  @state() private _removalFocusVid: string | null = null;
  @state() private _removalConfirmWine: Wine | null = null;
  // Sync conflicts (both sides changed a wine differently) awaiting manual
  // resolution: the user reviews Cork Dork's bottles and declares them truth.
  @state() private _vivinoConflicts: any[] = [];
  @state() private _conflictFocusVid: string | null = null;
  @state() private _conflictConfirmVid: string | null = null;
  // vivino_id currently being pushed to Vivino (the write plus its
  // verification can take several seconds)
  @state() private _conflictResolving: string | null = null;
  @state() private _metadataLanguage = "en";
  @state() private _supportedLanguages: string[] = ["en", "fr", "de"];
  @state() private _metadataCurrency = "USD";
  @state() private _supportedCurrencies: string[] = ["USD", "EUR", "GBP", "CHF"];
  @state() private _aiFallbackAlways = false;
  @state() private _enableWhisky = false;
  @state() private _defaultWineType: WineType = "red";
  @state() private _dispositionDisplay: "letter" | "dot" = "letter";
  @state() private _chamberingRoomSensor = "";
  @state() private _chamberingTimeConstantMinutes = 75;
  @state() private _chamberingEquilibrationHours = 24;
  @state() private _showVivinoAiSettings = false;
  @state() private _showWineList = false;
  @state() private _showInventory = false;
  @state() private _inventoryPairing = false;
  private _findingsCache: {
    wines: Wine[];
    cabinets: Cabinet[];
    dismissed: string[];
    findings: Finding[];
  } | null = null;
  private _unsubscribe: (() => void) | null = null;
  private _subscribing = false;
  private _connectionGeneration = 0;
  private _refreshTimer = 0;
  private _lastRefresh = 0;
  private _toastTimer = 0;

  @state() private _showArrangement = false;
  @state() private _dismissedArrangements: string[] = [];
  @state() private _buyList: Wine[] = [];
  @state() private _addToBuyListMode = false;
  @state() private _movingBuyListItem: Wine | null = null;

  // Depth side panel
  @state() private _depthPanelOpen = false;
  @state() private _depthPanelCabinet: Cabinet | null = null;
  @state() private _depthPanelRow: number | null = null;
  @state() private _depthPanelCol: number | null = null;
  @state() private _depthPanelWines: Wine[] = [];
  @state() private _depthPanelMaxDepth = 1;

  // Zone side panel (boxes, bulk bins)
  @state() private _zonePanelOpen = false;
  @state() private _zonePanelCabinet: Cabinet | null = null;
  @state() private _zonePanelZone = "";
  @state() private _zonePanelType: StorageRowType = "bulk";
  @state() private _zonePanelCapacity = 20;
  @state() private _zonePanelName = "";
  @state() private _zonePanelWines: Wine[] = [];
  @state() private _zonePanelStorageRow: StorageRow | null = null;
  @state() private _zonePanelDragWineId: string | null = null;
  @state() private _zonePanelDragOverKey: string | null = null;
  @state() private _zonePanelNewBoxSize = 6;

  // Rack panel (grid-slot cabinets: list + reorder)
  @state() private _rackPanelOpen = false;
  @state() private _rackPanelCabinet: Cabinet | null = null;
  @state() private _rackPanelWines: Wine[] = [];
  @state() private _rackPanelDragWineId: string | null = null;
  @state() private _rackPanelDragOverKey: string | null = null;

  // Shelf panel (shelf-style cabinets: every board/lane across every shelf
  // in the rack, list + reorder — the shelf equivalent of the rack panel
  // above, since a shelf cabinet has no row/col slots of its own).
  @state() private _shelfPanelOpen = false;
  @state() private _shelfPanelCabinet: Cabinet | null = null;
  @state() private _shelfPanelWines: Wine[] = [];
  @state() private _shelfPanelDragWineId: string | null = null;
  @state() private _shelfPanelDragOverKey: string | null = null;

  // Briefly highlights a wine's slot after "locate" is used from the detail dialog.
  @state() private _highlightWineId: string | null = null;
  @state() private _confirmZoneSort = false;
  @state() private _zoneSorting = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
      }

      /* Pending Vivino removals: pick-a-bottle panel */
      .removal-panel {
        border: 1px solid #ff6d00;
        background: rgba(255, 109, 0, 0.08);
        border-radius: 8px;
        padding: 10px 12px;
        margin: 8px 16px;
      }

      .removal-panel-title {
        font-weight: 600;
        font-size: 0.85em;
        margin-bottom: 6px;
        color: var(--wc-text);
      }

      .removal-entry {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85em;
        color: var(--wc-text);
      }

      .removal-entry:hover {
        background: rgba(255, 109, 0, 0.15);
      }

      .removal-entry.active {
        background: rgba(255, 109, 0, 0.25);
        box-shadow: inset 0 0 0 1px #ff6d00;
      }

      .removal-count {
        color: #ff6d00;
        font-weight: 600;
        white-space: nowrap;
      }

      .removal-hint {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        margin-top: 6px;
      }

      .conflict-title {
        margin-top: 8px;
        color: #d32f2f;
      }

      .removal-entry.conflict.active {
        background: rgba(211, 47, 47, 0.15);
        box-shadow: inset 0 0 0 1px #d32f2f;
      }

      .conflict-confirm {
        background: #e65100;
        font-size: 0.8em;
        padding: 6px 12px;
        margin: 4px 0 6px;
      }

      .conflict-confirm:disabled {
        opacity: 0.6;
        cursor: wait;
      }

      .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 8px;
      }

      .title {
        font-size: 1.3em;
        font-weight: 600;
        color: var(--wc-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title-icon {
        font-size: 1.2em;
      }

      .title-text {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .header-actions {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .cabinets-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        padding: 12px 16px 16px;
      }

      .wine-list {
        padding: 0 16px 16px;
      }

      .wine-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .wine-list-item:hover {
        background: var(--wc-hover);
      }

      .wine-list-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .wine-list-thumb {
        width: 36px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .wine-list-info {
        flex: 1;
        min-width: 0;
      }

      .wine-list-name {
        font-weight: 500;
        font-size: 0.95em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wine-list-meta {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .wine-list-location {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-align: right;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
      }

      .empty-state-icon {
        font-size: 3em;
        margin-bottom: 8px;
      }

      .loading {
        text-align: center;
        padding: 40px;
        color: var(--wc-text-secondary);
      }

      .copy-banner {
        background: rgba(46, 125, 50, 0.1);
        border: 1px solid rgba(46, 125, 50, 0.3);
        color: #2e7d32;
        font-size: 0.85em;
        padding: 6px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .copy-banner button {
        background: transparent;
        border: 1px solid rgba(46, 125, 50, 0.4);
        color: #2e7d32;
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;
        font-size: 0.9em;
      }

      .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 0.9em;
        z-index: 1000;
        animation: fadeIn 0.2s;
        pointer-events: none;
      }

      .buy-list-view {
        padding: 0 16px 16px;
      }

      .buy-list-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        margin-bottom: 8px;
        transition: background 0.2s;
      }

      .buy-list-card:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .bl-info {
        flex: 1;
        min-width: 0;
      }

      .bl-name {
        font-weight: 600;
        font-size: 0.9em;
        color: var(--wc-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .bl-meta {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .bl-actions {
        display: flex;
        gap: 6px;
        flex-shrink: 0;
      }

      .bl-cellar-btn {
        background: #2e7d32;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 0.75em;
        padding: 4px 8px;
        cursor: pointer;
        white-space: nowrap;
      }

      .bl-cellar-btn:hover { background: #1b5e20; }

      .bl-remove-btn {
        background: #c62828;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 0.75em;
        padding: 4px 8px;
        cursor: pointer;
        white-space: nowrap;
      }

      .bl-remove-btn:hover { background: #b71c1c; }

      .buy-list-banner {
        background: rgba(230, 81, 0, 0.1);
        border: 1px solid rgba(230, 81, 0, 0.3);
        color: #e65100;
        font-size: 0.85em;
        padding: 6px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .buy-list-banner button {
        background: transparent;
        border: 1px solid rgba(230, 81, 0, 0.4);
        color: #e65100;
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;
        font-size: 0.9em;
      }

      /* The arrangement count is the only stat you can act on, and it is only
         there at all when the cellar has something to say. */
      .stat-action {
        cursor: pointer;
        border-radius: 6px;
        padding: 2px 8px;
        margin: -2px 0;
        border: 1px solid var(--wc-border);
        transition: all 0.15s;
      }

      .stat-action:hover {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.08);
      }

      /* Phone: stack cabinets vertically */
      @media (max-width: 599px) {
        .header-row {
          padding: 12px 12px 6px;
        }
        .title {
          font-size: 1.1em;
        }
        .stats-bar {
          flex-wrap: wrap;
          gap: 8px;
          padding: 6px 12px;
          font-size: 0.8em;
        }
        .cabinets-row {
          grid-template-columns: 1fr;
          gap: 10px;
          padding: 8px 12px 12px;
        }
        .wine-list-item {
          padding: 8px;
          gap: 8px;
        }
        .btn-primary {
          padding: 6px 12px;
          font-size: 0.85em;
        }
      }

      /* Tablet: 2 cabinets side by side */
      @media (min-width: 600px) and (max-width: 1023px) {
        .cabinets-row {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
      }

      /* Desktop: all cabinets side by side */
      @media (min-width: 1024px) {
        .cabinets-row {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
      }

      /* Touch: finger-sized header and list controls. Rack sizing is left
         to the width queries above — forcing wider cabinets here made every
         bottle far too large on a tablet. */
      @media (pointer: coarse) {
        .stat-action {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 12px;
          margin: 0;
        }
        .stats-bar {
          align-items: center;
        }
        .header-actions {
          gap: 8px;
        }
        .wine-list-item,
        .removal-entry {
          min-height: 52px;
        }
      }
    `,
    touchStyles,
  ];

  setConfig(config: WineCellarCardConfig) {
    this._config = config;
  }

  static getConfigElement() {
    return document.createElement("wine-cellar-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:wine-cellar-card" };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("unhandledrejection", this._onUnhandledRejection);
    this._loadData();
    this._subscribeToUpdates();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("unhandledrejection", this._onUnhandledRejection);
    // Invalidates any subscription still being set up.
    this._connectionGeneration++;
    this._unsubscribe?.();
    this._unsubscribe = null;
    if (this._refreshTimer) {
      clearTimeout(this._refreshTimer);
      this._refreshTimer = 0;
    }
    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
      this._toastTimer = 0;
    }
  }

  // The backend announces every change it makes on the event bus, and nobody
  // was listening. Work it does on its own — the Vivino lookup fired after a
  // wine is added, most visibly — landed in storage and stayed invisible
  // until the user happened to do something that reloaded the card. That is
  // why an added bottle could look like Vivino had never been consulted.
  private async _subscribeToUpdates() {
    if (!this.hass?.connection || this._unsubscribe || this._subscribing) {
      if (!this.hass) setTimeout(() => this._subscribeToUpdates(), 500);
      return;
    }
    this._subscribing = true;
    const generation = this._connectionGeneration;
    try {
      const unsubscribe = await this.hass.connection.subscribeEvents(
        () => this._scheduleRefresh(),
        "wine_cellar_updated"
      );
      // Home Assistant detaches and reattaches a dashboard view when the user
      // switches tabs, which can happen while this is still in flight. Storing
      // the handle now would leave a subscription nothing can ever cancel,
      // reloading a card that is no longer on screen — once per tab switch.
      //
      // Keyed on a counter the detach bumps rather than on isConnected, so it
      // holds however the element was taken down.
      if (generation !== this._connectionGeneration) {
        unsubscribe();
        return;
      }
      this._unsubscribe = unsubscribe;
    } catch (err) {
      // Without this the card still works, it just will not notice background
      // work. Not worth an error the user has to dismiss.
      console.warn("Wine Cellar: could not subscribe to updates", err);
    } finally {
      this._subscribing = false;
    }
  }

  // Batch operations fire one event per bottle, and they pace themselves with
  // a sleep of half a second to a second between wines. A plain debounce is
  // the wrong shape for that: the gaps are longer than any sensible debounce,
  // so every event would still get its own full reload. What is needed is a
  // floor on how often the cellar is re-fetched.
  //
  // An already-pending refresh absorbs anything that arrives before it fires,
  // so a tight burst still costs one reload. An isolated change still shows up
  // within REFRESH_DEBOUNCE_MS.
  private _scheduleRefresh() {
    if (this._refreshTimer) return;
    const since = Date.now() - this._lastRefresh;
    const wait = Math.max(REFRESH_DEBOUNCE_MS, REFRESH_MIN_INTERVAL_MS - since);
    this._refreshTimer = window.setTimeout(() => {
      this._refreshTimer = 0;
      this._loadData();
    }, wait);
  }

  private async _loadData() {
    if (!this.hass) {
      // Retry after hass is set
      setTimeout(() => this._loadData(), 500);
      return;
    }
    // Counts against the refresh floor: the card's own actions already reload,
    // and the event they cause must not reload a second time straight after.
    this._lastRefresh = Date.now();

    const isInitialLoad = this._wines.length === 0 && this._cabinets.length === 0;
    if (isInitialLoad) this._loading = true;
    try {
      const [winesResult, cabinetsResult, statsResult, capResult, buyListResult, pendingRemovalsResult] = await Promise.all([
        this.hass.callWS({ type: "wine_cellar/get_wines" }),
        this.hass.callWS({ type: "wine_cellar/get_cabinets" }),
        this.hass.callWS({ type: "wine_cellar/get_stats" }),
        this.hass.callWS({ type: "wine_cellar/get_capabilities" }).catch(() => ({ has_gemini: false })),
        this.hass.callWS({ type: "wine_cellar/get_buy_list" }).catch(() => ({ buy_list: [] })),
        this.hass.callWS({ type: "wine_cellar/get_pending_removals" }).catch(() => ({ pending_removals: {} })),
      ]);

      this._wines = winesResult.wines || [];
      this._cabinets = (cabinetsResult.cabinets || []).sort(
        (a: Cabinet, b: Cabinet) => a.order - b.order
      );
      this._stats = statsResult;
      this._hasGemini = capResult?.has_gemini || false;
      this._hasVivinoAccount = capResult?.has_vivino_account || false;
      this._vivinoMode = capResult?.vivino_mode || "import";
      this._metadataLanguage = capResult?.metadata_language || "en";
      this._supportedLanguages = capResult?.supported_languages || ["en", "fr", "de"];
      this._metadataCurrency = capResult?.metadata_currency || "USD";
      this._supportedCurrencies = capResult?.supported_currencies || ["USD", "EUR", "GBP", "CHF"];
      this._aiFallbackAlways = capResult?.ai_fallback_always || false;
      this._enableWhisky = capResult?.enable_whisky || false;
      this._defaultWineType = capResult?.default_wine_type || "red";
      this._dispositionDisplay = capResult?.disposition_display || "letter";
      this._chamberingRoomSensor = capResult?.chambering_room_sensor || "";
      this._chamberingTimeConstantMinutes = capResult?.chambering_time_constant_minutes ?? 75;
      this._chamberingEquilibrationHours = capResult?.chambering_equilibration_hours ?? 24;
      this._dismissedArrangements = capResult?.dismissed_arrangements || [];
      this._buyList = buyListResult?.buy_list || [];
      this._pendingRemovals = pendingRemovalsResult?.pending_removals || {};
      if (this._removalFocusVid && !this._pendingRemovals[this._removalFocusVid]) {
        this._removalFocusVid = null;
      }
      this._vivinoConflicts = pendingRemovalsResult?.conflicts || [];
      if (
        this._conflictFocusVid &&
        !this._vivinoConflicts.some((c) => String(c.vintage_id) === this._conflictFocusVid)
      ) {
        this._conflictFocusVid = null;
      }

      // Refresh selected wine if detail dialog is open
      if (this._selectedWine) {
        const updated = this._wines.find((w: Wine) => w.id === this._selectedWine!.id);
        if (updated) this._selectedWine = updated;
      }

      // Refresh depth panel if open
      this._refreshDepthPanel();
      // Refresh zone panel if open
      this._refreshZonePanel();
      // Refresh rack panel if open
      this._refreshRackPanel();
      // Refresh shelf panel if open
      this._refreshShelfPanel();
    } catch (err) {
      console.error("Cork Dork: Failed to load data", err);
    }
    this._loading = false;
  }

  private _getFilteredWines(): Wine[] {
    let wines = [...this._wines];

    // Filter by active tab (cabinet)
    if (this._activeTab !== "all") {
      wines = wines.filter((w) => w.cabinet_id === this._activeTab);
    }

    // Filter by wine type
    if (this._searchFilter !== "all") {
      wines = wines.filter((w) => w.type === this._searchFilter);
    }

    // Filter by search query — same matcher as the inventory dialog, so a
    // query never gives different results depending on which screen it was
    // typed into.
    if (this._searchQuery) {
      wines = wines.filter((w) => matchesQuery(w, this._searchQuery, this._cabinets));
    }

    return wines;
  }

  // Shorthand for t(key, this.hass?.language, params) — every call site in
  // this file needs the current display language, so this saves repeating
  // `this.hass?.language` at every t() call.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  // The disposition badge for the card's own side panels (rack/shelf/zone
  // panels) — same letter-vs-dot choice as cabinet-grid.ts's own helper,
  // reading the same _dispositionDisplay state so both stay in sync.
  private _dispositionBadge(dispClass: string, disp: string) {
    if (!dispClass) return nothing;
    const isDot = this._dispositionDisplay === "dot";
    return html`<span class="depth-slot-disposition ${dispClass}${isDot ? " dot-style" : ""}">${isDot ? "" : disp}</span>`;
  }

  private _showToast(message: string) {
    this._toast = message;
    // Each toast gets its own full 2.5s: the previous timer would otherwise
    // still be running and cut the new message short.
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => {
      this._toastTimer = 0;
      this._toast = "";
    }, 2500);
  }

  // --- Copy/Paste wine ---
  private _onCellClick(e: CustomEvent) {
    const { wine, wines = [], cabinet, row, col, wineCount = 0, cabinetDepth = 1 } = e.detail;
    const hasRoom = wineCount < cabinetDepth;
    const nextDepth = wineCount;

    // Picking the bottle for a pending Vivino removal takes precedence
    if (this._removalFocusVid && wine && this._removalHighlightIds.includes(wine.id)) {
      this._removalConfirmWine = wine;
      return;
    }

    // If we have a copied wine and cell has room, paste it
    if (this._copiedWine && hasRoom) {
      this._pasteWine(cabinet.id, row, col, nextDepth);
      return;
    }

    // If we're moving a wine and cell has room, place it here
    if (this._movingWine && hasRoom) {
      this._executeMoveWine(cabinet.id, row, col, "", nextDepth);
      return;
    }

    // If we're placing a buy list item and cell has room, move it to cellar
    if (this._movingBuyListItem && hasRoom) {
      this._executeMoveTocellar(cabinet.id, row, col, "", nextDepth);
      return;
    }

    // For deep cabinets (depth >= 2), open side panel instead of detail
    if (cabinetDepth >= 2) {
      this._openDepthPanel(cabinet, row, col, wines, cabinetDepth);
      return;
    }

    // Long-pressed a bottle (picked up via _movingWine) and tapped a
    // different, occupied cell: swap instead of opening its detail.
    if (this._movingWine && wine && wine.id !== this._movingWine.id) {
      this._executeSwapWine({ cabinetId: cabinet.id, row, col, depth: 0 }, wine);
      return;
    }

    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
    } else {
      this._addPreselect = { cabinet: cabinet.id, row, col, zone: "", depth: 0 };
      this._showAddDialog = true;
    }
  }

  // --- Depth side panel ---
  private _openDepthPanel(cabinet: Cabinet, row: number, col: number, wines: Wine[], maxDepth: number) {
    this._depthPanelCabinet = cabinet;
    this._depthPanelRow = row;
    this._depthPanelCol = col;
    this._depthPanelWines = [...wines].sort((a, b) => (a.depth || 0) - (b.depth || 0));
    this._depthPanelMaxDepth = maxDepth;
    this._depthPanelOpen = true;
  }

  private _closeDepthPanel() {
    this._depthPanelOpen = false;
  }

  private _refreshDepthPanel() {
    if (!this._depthPanelOpen || !this._depthPanelCabinet || this._depthPanelRow === null || this._depthPanelCol === null) return;
    const wines = this._wines.filter(
      (w) => w.cabinet_id === this._depthPanelCabinet!.id && w.row === this._depthPanelRow && w.col === this._depthPanelCol
    );
    this._depthPanelWines = [...wines].sort((a, b) => (a.depth || 0) - (b.depth || 0));
  }

  private _onDepthSlotClick(depthIndex: number, wine?: Wine) {
    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
    } else {
      this._addPreselect = {
        cabinet: this._depthPanelCabinet!.id,
        row: this._depthPanelRow,
        col: this._depthPanelCol,
        zone: "",
        depth: depthIndex,
      };
      this._showAddDialog = true;
    }
  }

  private _getDepthLabel(index: number): string {
    const labels = ["Front", "2nd", "3rd", "4th", "5th", "6th"];
    return labels[index] || `${index + 1}th`;
  }

  private _onZoneClick(e: CustomEvent) {
    const { wine, cabinet, zone, depth } = e.detail;
    // Slot zones (shelf) send the exact depth clicked — that slot is
    // authoritative, so skip the "first free"/on-top-of-pile placement
    // used for bulk/box and land exactly there instead.
    const hasExactDepth = depth !== undefined;

    // Picking the bottle for a pending Vivino removal takes precedence
    if (this._removalFocusVid && wine && this._removalHighlightIds.includes(wine.id)) {
      this._removalConfirmWine = wine;
      return;
    }

    // If we have a copied wine and clicked empty zone space, paste it here
    if (this._copiedWine && !wine) {
      const nextDepth = hasExactDepth
        ? depth
        : this._wines.filter((w) => w.cabinet_id === cabinet.id && w.zone === (zone || "bottom")).length;
      this._pasteWine(cabinet.id, null, null, nextDepth, zone || "bottom", hasExactDepth);
      return;
    }

    // If we're moving a wine, place it in this zone
    if (this._movingWine && !wine) {
      this._executeMoveWine(cabinet.id, null, null, zone || "bottom", hasExactDepth ? depth : 0, hasExactDepth);
      return;
    }

    // If we're placing a buy list item, move it to cellar
    if (this._movingBuyListItem && !wine) {
      this._executeMoveTocellar(cabinet.id, null, null, zone || "bottom", hasExactDepth ? depth : 0, hasExactDepth);
      return;
    }

    // Long-pressed a bottle and tapped a different, occupied slot in a
    // slot-addressable zone (shelf/quinconce — hasExactDepth): swap instead
    // of opening its detail. Bulk/box zone chips carry no depth, so this
    // never fires for those — "occupied" there doesn't mean a fixed slot.
    if (this._movingWine && wine && hasExactDepth && wine.id !== this._movingWine.id) {
      this._executeSwapWine({ cabinetId: cabinet.id, zone: zone || "bottom", depth }, wine);
      return;
    }

    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
    } else {
      this._addPreselect = { cabinet: cabinet.id, row: null, col: null, zone: zone || "bottom", depth: hasExactDepth ? depth : 0 };
      this._showAddDialog = true;
    }
  }

  // The slot a new bottle takes in a bin: the first free one, so a gap left
  // by a removed bottle is reused rather than skipped. Every path into a bin
  // — add dialog, click-to-place, drag-and-drop — must agree, or two bottles
  // end up sharing a depth and the order becomes undefined.
  private _firstFreeDepth(cabinetId: string, zone: string, excludeWineId?: string): number {
    const occupied = new Set(
      this._wines
        .filter(
          (w) => w.cabinet_id === cabinetId && w.zone === zone && w.id !== excludeWineId
        )
        .map((w) => w.depth || 0)
    );
    let depth = 0;
    while (occupied.has(depth)) depth++;
    return depth;
  }

  // Renumber a bin's slots in a single backend call. Looping a move per
  // bottle rewrote the whole store each time, which made shifting a full bin
  // far too slow to do on every add.
  private async _reorderZone(cabinetId: string, zone: string, wineIds: string[]) {
    await this.hass.callWS({
      type: "wine_cellar/reorder_zone",
      cabinet_id: cabinetId,
      zone,
      wine_ids: wineIds,
    });
  }

  // A bottle put into a bin lands on top of the pile, so slot 1 holds the one
  // added last — slot 1 being the most accessible position, the same
  // convention as depth 0 on a grid cell. Only the new bottles are listed:
  // the backend appends every other bottle in the bin in its current order,
  // which keeps this correct even when the card's copy of the cellar is a
  // moment out of date.
  private async _placeOnTopOfBin(cabinetId: string, zone: string, newWineIds: string[]) {
    if (!zone || !newWineIds.length) return;
    await this._reorderZone(cabinetId, zone, newWineIds);
  }

  // --- Zone side panel (boxes, bulk bins) ---
  private _onZoneContainerClick(e: CustomEvent) {
    const { cabinet, zone, storageRow } = e.detail;
    const occupantCount = this._wines.filter(
      (w) => w.cabinet_id === cabinet.id && w.zone === zone
    ).length;
    const nextDepth = this._firstFreeDepth(cabinet.id, zone);
    const capacity = storageRow.capacity || 20;
    const hasRoom = occupantCount < capacity && nextDepth < capacity;

    // If we have a copied wine, paste it in this zone instead of opening panel
    if (this._copiedWine) {
      if (!hasRoom) {
        this._showToast(this._t("toast.zoneFull", { zone: storageRow.name || "Zone" }));
        return;
      }
      this._pasteWine(cabinet.id, null, null, nextDepth, zone);
      return;
    }

    // If moving wine, drop it in this zone instead of opening panel
    if (this._movingWine) {
      if (!hasRoom) {
        this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
        return;
      }
      this._executeMoveWine(cabinet.id, null, null, zone);
      return;
    }
    if (this._movingBuyListItem) {
      if (!hasRoom) {
        this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
        return;
      }
      this._executeMoveTocellar(cabinet.id, null, null, zone);
      return;
    }

    this._openZonePanel(cabinet, zone, storageRow);
  }

  private _openZonePanel(cabinet: Cabinet, zone: string, storageRow: StorageRow) {
    this._zonePanelCabinet = cabinet;
    this._zonePanelZone = zone;
    this._zonePanelType = storageRow.type || "bulk";
    this._zonePanelCapacity = storageRow.capacity || 20;
    this._zonePanelName = storageRow.name || "Storage";
    this._zonePanelStorageRow = storageRow;
    this._zonePanelWines = this._wines
      .filter((w) => w.cabinet_id === cabinet.id && w.zone === zone)
      .sort((a, b) => (a.depth || 0) - (b.depth || 0));
    this._zonePanelOpen = true;
  }

  private _closeZonePanel() {
    this._zonePanelOpen = false;
  }

  private _refreshZonePanel() {
    if (!this._zonePanelOpen || !this._zonePanelCabinet) return;
    // Re-derive from the freshly loaded cabinet so capacity/box changes show up.
    const freshCabinet = this._cabinets.find((c) => c.id === this._zonePanelCabinet!.id);
    if (freshCabinet) {
      this._zonePanelCabinet = freshCabinet;
      const rowIdx = parseInt(this._zonePanelZone.replace("storage-", ""), 10);
      const sr = (freshCabinet.storage_rows || []).find((s) => s.row === rowIdx);
      if (sr) {
        this._zonePanelType = sr.type || "bulk";
        this._zonePanelCapacity = sr.capacity || 20;
        this._zonePanelName = sr.name || "Storage";
        this._zonePanelStorageRow = sr;
      }
    }
    this._zonePanelWines = this._wines
      .filter((w) => w.cabinet_id === this._zonePanelCabinet!.id && w.zone === this._zonePanelZone)
      .sort((a, b) => (a.depth || 0) - (b.depth || 0));
  }

  // Grow a bulk/box zone's capacity by editing its StorageRow entry.
  private async _updateStorageRow(updates: Partial<StorageRow>) {
    if (!this._zonePanelCabinet || !this._zonePanelStorageRow) return;
    const newStorageRows = (this._zonePanelCabinet.storage_rows || []).map((sr) =>
      sr.row === this._zonePanelStorageRow!.row ? { ...sr, ...updates } : sr
    );
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_cabinet",
        cabinet_id: this._zonePanelCabinet.id,
        updates: { storage_rows: newStorageRows },
      });
      await this._loadData();
    } catch (err) {
      console.error("Failed to resize zone:", err);
      this._showToast(this._t("toast.zoneResizeFailed"));
    }
  }

  private _addBulkSlot() {
    if (!this._zonePanelStorageRow) return;
    this._updateStorageRow({ capacity: (this._zonePanelStorageRow.capacity || 0) + 1 });
  }

  private _addBoxSlot() {
    if (!this._zonePanelStorageRow) return;
    // Append a whole new box of the chosen preset size, so box sizes always
    // stay one of BOX_SIZES (1/3/6/12/24) — the Manage Racks dialog's size
    // dropdown can only display values from that list.
    const boxes = [...(this._zonePanelStorageRow.boxes || [this._zonePanelStorageRow.capacity || 0]), this._zonePanelNewBoxSize];
    this._updateStorageRow({ boxes, capacity: boxes.reduce((sum, b) => sum + b, 0) });
  }

  // Delete a single bulk/box slot: unassign its wine (if any) rather than
  // deleting it, shift every later slot down to close the gap, and shrink
  // the zone's capacity (or the specific box, for box mode) by one.
  private async _deleteZoneSlot(slotIndex: number) {
    if (!this._zonePanelCabinet || !this._zonePanelStorageRow) return;
    const wineAtSlot = this._zonePanelWines[slotIndex];
    const warning = wineAtSlot
      ? this._t("toast.deleteSlotConfirmNamed", { n: slotIndex + 1, name: wineAtSlot.name })
      : this._t("toast.deleteSlotConfirm", { n: slotIndex + 1 });
    if (!window.confirm(warning)) return;

    try {
      if (wineAtSlot) {
        await this.hass.callWS({
          type: "wine_cellar/update_wine",
          wine_id: wineAtSlot.id,
          updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
        });
      }
      // Closing the gap is one renumbering of the zone, not one round trip per
      // bottle behind the deleted slot — emptying slot 1 of a full 20-bottle
      // bin used to mean nineteen calls, each with its own disk write.
      const remaining = this._zonePanelWines
        .filter((_, i) => i !== slotIndex)
        .map((w) => w.id);
      if (remaining.length) {
        await this.hass.callWS({
          type: "wine_cellar/reorder_zone",
          cabinet_id: this._zonePanelCabinet.id,
          zone: this._zonePanelZone,
          wine_ids: remaining,
        });
      }

      if (this._zonePanelType === "box") {
        const boxes = [...(this._zonePanelStorageRow.boxes || [this._zonePanelStorageRow.capacity || 0])];
        let offset = 0;
        for (let i = 0; i < boxes.length; i++) {
          if (slotIndex < offset + boxes[i]) {
            boxes[i] -= 1;
            if (boxes[i] <= 0) boxes.splice(i, 1);
            break;
          }
          offset += boxes[i];
        }
        await this._updateStorageRow({ boxes, capacity: boxes.reduce((sum, b) => sum + b, 0) });
      } else if (this._zonePanelType === "shelf") {
        const group = getShelfSlotGroups(this._zonePanelStorageRow.shelf_levels)
          .find((g) => slotIndex >= g.start && slotIndex < g.start + g.size);
        if (group) {
          const levels = (this._zonePanelStorageRow.shelf_levels || []).map((lvl, i) =>
            i === group.level ? { ...lvl, [group.lane]: Math.max(0, lvl[group.lane] - 1) } : lvl
          );
          const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
          await this._updateStorageRow({ shelf_levels: levels, capacity });
        }
      } else {
        await this._updateStorageRow({ capacity: Math.max(0, (this._zonePanelStorageRow.capacity || 1) - 1) });
      }
      this._showToast(wineAtSlot ? this._t("toast.slotDeletedUnassigned") : this._t("toast.slotDeleted"));
    } catch (err) {
      console.error("Failed to delete slot:", err);
      this._showToast(this._t("toast.deleteSlotFailed"));
    }
  }

  private _onZonePanelSlotClick(slotIndex: number, wine?: Wine) {
    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
      return;
    }

    if (this._copiedWine) {
      this._pasteWine(this._zonePanelCabinet!.id, null, null, slotIndex, this._zonePanelZone);
      return;
    }
    if (this._movingWine) {
      this._executeMoveWine(this._zonePanelCabinet!.id, null, null, this._zonePanelZone, slotIndex);
      return;
    }

    this._addPreselect = {
      cabinet: this._zonePanelCabinet!.id,
      row: null,
      col: null,
      zone: this._zonePanelZone,
      depth: slotIndex,
    };
    this._showAddDialog = true;
  }

  // --- Zone side panel: drag-to-reorder ---
  private _onZonePanelDragStart(e: DragEvent, wine: Wine) {
    this._zonePanelDragWineId = wine.id;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      // Same payload shape cabinet-grid's _onDrop expects, so dragging out
      // of the panel onto any rack/zone in the main grid works too.
      e.dataTransfer.setData("text/plain", JSON.stringify({
        wineId: wine.id,
        cabinetId: wine.cabinet_id,
        row: wine.row ?? null,
        col: wine.col ?? null,
        zone: wine.zone || "",
      }));
    }
  }

  private _onZonePanelDragEnd() {
    this._zonePanelDragWineId = null;
    this._zonePanelDragOverKey = null;
  }

  private _onZonePanelDragOver(e: DragEvent, key: string) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    this._zonePanelDragOverKey = key;
  }

  // Bulk mode: reflow to sequential depths matching the new visual order.
  private async _onZonePanelBulkReorder(e: DragEvent, targetIndex: number) {
    e.preventDefault();
    this._zonePanelDragOverKey = null;
    const draggedId = this._zonePanelDragWineId;
    this._zonePanelDragWineId = null;
    if (!draggedId || !this._zonePanelCabinet) return;

    const wines = [...this._zonePanelWines];
    const fromIndex = wines.findIndex((w) => w.id === draggedId);
    if (fromIndex === -1 || fromIndex === targetIndex) return;
    const [moved] = wines.splice(fromIndex, 1);
    wines.splice(targetIndex, 0, moved);

    try {
      await this._reorderZone(
        this._zonePanelCabinet.id,
        this._zonePanelZone,
        wines.map((w) => w.id)
      );
      this._showToast(this._t("toast.wineReordered"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to reorder wine:", err);
      this._showToast(this._t("toast.reorderFailed"));
    }
  }

  // Box mode: move/swap into a specific slot depth.
  private async _onZonePanelBoxReorder(e: DragEvent, targetDepth: number, targetWine?: Wine) {
    e.preventDefault();
    this._zonePanelDragOverKey = null;
    const draggedId = this._zonePanelDragWineId;
    this._zonePanelDragWineId = null;
    if (!draggedId || !this._zonePanelCabinet || draggedId === targetWine?.id) return;
    const draggedWine = this._zonePanelWines.find((w) => w.id === draggedId);
    if (!draggedWine) return;

    try {
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: draggedWine.id,
        cabinet_id: this._zonePanelCabinet.id,
        zone: this._zonePanelZone,
        depth: targetDepth,
      });
      if (targetWine) {
        await this.hass.callWS({
          type: "wine_cellar/move_wine",
          wine_id: targetWine.id,
          cabinet_id: this._zonePanelCabinet.id,
          zone: this._zonePanelZone,
          depth: draggedWine.depth || 0,
        });
      }
      this._showToast(this._t("toast.wineReordered"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to reorder wine:", err);
      this._showToast(this._t("toast.reorderFailed"));
    }
  }

  // Renumber the bin's slots to match when bottles were added.
  //
  // Direction matters physically. Slot 1 is the most accessible position —
  // the same convention as depth 0 being the front bottle of a grid cell —
  // so "newest first" matches dropping each new bottle on top of the pile,
  // and "oldest first" matches lining bottles up in a row from one end.
  // Only the user knows which of the two their bin really is.
  //
  // `added_at` is the only entry timestamp stored; bottles without one keep
  // their relative position at the end in *both* directions rather than
  // sorting to the front, which is what an empty string would otherwise do.
  private async _sortZoneByDateAdded(direction: "newest" | "oldest") {
    this._confirmZoneSort = false;
    if (!this._zonePanelCabinet) return;

    const ordered = [...this._zonePanelWines].sort((a, b) => {
      const aDate = a.added_at || "";
      const bDate = b.added_at || "";
      if (!aDate && !bDate) return (a.depth || 0) - (b.depth || 0);
      if (!aDate) return 1;
      if (!bDate) return -1;
      return direction === "newest" ? bDate.localeCompare(aDate) : aDate.localeCompare(bDate);
    });

    this._zoneSorting = true;
    try {
      await this._reorderZone(
        this._zonePanelCabinet.id,
        this._zonePanelZone,
        ordered.map((w) => w.id)
      );
      this._showToast(direction === "newest" ? this._t("toast.newestFirstToast") : this._t("toast.oldestFirstToast"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to sort zone:", err);
      this._showToast(this._t("toast.sortFailed"));
    }
    this._zoneSorting = false;
  }

  private _getZoneSlotLabel(_type: StorageRowType, index: number): string {
    return this._t("ui.card.slot", { n: index + 1 });
  }

  // Opens the right side panel for a wine's location and highlights its slot,
  // both in the panel and on the rack drawing.
  private _locateWine(wine: Wine) {
    const loc = getWineLocation(wine, this._cabinets, this.hass?.language);
    if (!loc.cabinet) {
      this._showToast(this._t("toast.wineUnassigned"));
      return;
    }

    // An active search replaces the rack drawing with a flat result list, so
    // locating while searching would point at a rack that isn't on screen.
    // Locating means "show me where it is" — clear the search and open the
    // bottle's own rack.
    this._searchQuery = "";
    this._searchFilter = "all";
    this._activeTab = loc.cabinet.id;

    // Mark the bottle on the rack drawing regardless of whether a side panel
    // opens — for a plain bottom-zone bottle the drawing is the only place it
    // can be pointed at.
    this._highlightWineId = wine.id;

    if (wine.row !== null && wine.col !== null) {
      this._openRackPanel(loc.cabinet);
    } else if (loc.storageRow?.type === "shelf") {
      this._openShelfPanel(loc.cabinet);
    } else if (loc.zone && loc.zone !== "bottom" && loc.storageRow) {
      this._openZonePanel(loc.cabinet, loc.zone, loc.storageRow);
    } else {
      this._showToast(this._t("toast.inLocation", { location: loc.text }));
    }

    this.updateComplete.then(async () => {
      // The panel slot and the rack cell live in different scroll containers,
      // so both can be brought into view without fighting each other.
      this.shadowRoot?.getElementById("highlight-slot")?.scrollIntoView({ behavior: "smooth", block: "center" });

      // Each cabinet-grid runs its own update cycle, so the marked cell does
      // not exist yet when this element's update resolves — wait for the
      // children before looking for it.
      const grids = [...(this.shadowRoot?.querySelectorAll("cabinet-grid") || [])];
      await Promise.all(grids.map((g) => (g as any).updateComplete));
      for (const grid of grids) {
        const marked = grid.shadowRoot?.querySelector(".locate-highlight");
        if (marked) {
          // Instant, not smooth: a smooth scroll is silently dropped in some
          // environments (reduced-motion, embedded webviews), and landing on
          // the bottle matters more than the animation.
          marked.scrollIntoView({ block: "center" });
          break;
        }
      }
    });
    setTimeout(() => {
      if (this._highlightWineId === wine.id) this._highlightWineId = null;
    }, 4000);
  }

  // --- Rack panel (grid-slot cabinets: list + reorder) ---
  private _onRackClick(e: CustomEvent) {
    const cabinet: Cabinet = e.detail.cabinet;
    // A "shelf" style cabinet is entirely shelves, no grid rows — so this
    // alone decides which panel applies. (A grid cabinet may still have a
    // non-shelf storage row of its own, e.g. an appended compressor-bump
    // zone — its bottles aren't in either panel, but are always reachable
    // directly on the rack drawing itself.)
    const hasShelfRows = (cabinet.storage_rows || []).some((sr) => sr.type === "shelf");
    if (hasShelfRows) {
      this._openShelfPanel(cabinet);
    } else {
      this._openRackPanel(cabinet);
    }
  }

  private _openRackPanel(cabinet: Cabinet) {
    this._rackPanelCabinet = cabinet;
    this._rackPanelWines = this._wines.filter((w) => w.cabinet_id === cabinet.id && w.row !== null && w.col !== null);
    this._rackPanelOpen = true;
  }

  private _closeRackPanel() {
    this._rackPanelOpen = false;
  }

  private _refreshRackPanel() {
    if (!this._rackPanelOpen || !this._rackPanelCabinet) return;
    const fresh = this._cabinets.find((c) => c.id === this._rackPanelCabinet!.id);
    if (fresh) this._rackPanelCabinet = fresh;
    this._rackPanelWines = this._wines.filter((w) => w.cabinet_id === this._rackPanelCabinet!.id && w.row !== null && w.col !== null);
  }

  // --- Shelf panel (shelf-style cabinets: every board/lane, list + reorder) ---
  // The shelf equivalent of the rack panel above: a shelf cabinet can have
  // several named shelves (each its own storage_rows entry with its own
  // zone id), so this aggregates all of them into one browsable list
  // instead of the grid's single row/col addressing.
  private _openShelfPanel(cabinet: Cabinet) {
    this._shelfPanelCabinet = cabinet;
    this._shelfPanelWines = this._wines.filter((w) => w.cabinet_id === cabinet.id && (w.zone || "").startsWith("storage-"));
    this._shelfPanelOpen = true;
  }

  private _closeShelfPanel() {
    this._shelfPanelOpen = false;
  }

  private _refreshShelfPanel() {
    if (!this._shelfPanelOpen || !this._shelfPanelCabinet) return;
    const fresh = this._cabinets.find((c) => c.id === this._shelfPanelCabinet!.id);
    if (fresh) this._shelfPanelCabinet = fresh;
    this._shelfPanelWines = this._wines.filter((w) => w.cabinet_id === this._shelfPanelCabinet!.id && (w.zone || "").startsWith("storage-"));
  }

  private _getShelfPanelRows(): StorageRow[] {
    return (this._shelfPanelCabinet?.storage_rows || []).filter((sr) => sr.type === "shelf");
  }

  private _onShelfPanelSlotClick(zone: string, depth: number, wine?: Wine) {
    if (!this._shelfPanelCabinet) return;
    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
      return;
    }
    if (this._copiedWine) {
      this._pasteWine(this._shelfPanelCabinet.id, null, null, depth, zone, true);
      return;
    }
    if (this._movingWine) {
      this._executeMoveWine(this._shelfPanelCabinet.id, null, null, zone, depth, true);
      return;
    }
    this._addPreselect = { cabinet: this._shelfPanelCabinet.id, row: null, col: null, zone, depth };
    this._showAddDialog = true;
  }

  private _onShelfPanelDragStart(e: DragEvent, wine: Wine) {
    this._shelfPanelDragWineId = wine.id;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", JSON.stringify({
        wineId: wine.id,
        cabinetId: wine.cabinet_id,
        row: wine.row ?? null,
        col: wine.col ?? null,
        zone: wine.zone || "",
        depth: wine.depth ?? null,
      }));
    }
  }

  private _onShelfPanelDragEnd() {
    this._shelfPanelDragWineId = null;
    this._shelfPanelDragOverKey = null;
  }

  private _onShelfPanelDragOver(e: DragEvent, key: string) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    this._shelfPanelDragOverKey = key;
  }

  // Exact-slot swap/place — every shelf slot has a fixed physical position,
  // so (unlike bulk) this never falls back to "first free"/on-top-of-pile.
  private async _onShelfPanelDrop(e: DragEvent, targetZone: string, targetDepth: number, targetWine?: Wine) {
    e.preventDefault();
    this._shelfPanelDragOverKey = null;
    const draggedId = this._shelfPanelDragWineId;
    this._shelfPanelDragWineId = null;
    if (!draggedId || !this._shelfPanelCabinet || draggedId === targetWine?.id) return;
    const draggedWine = this._wines.find((w) => w.id === draggedId);
    if (!draggedWine) return;
    if (draggedWine.zone === targetZone && (draggedWine.depth ?? null) === targetDepth) return;

    try {
      if (targetWine) {
        await this.hass.callWS({
          type: "wine_cellar/move_wine",
          wine_id: targetWine.id,
          cabinet_id: this._shelfPanelCabinet.id,
          zone: draggedWine.zone || "",
          depth: draggedWine.depth || 0,
        });
      }
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: draggedWine.id,
        cabinet_id: this._shelfPanelCabinet.id,
        zone: targetZone,
        depth: targetDepth,
      });
      this._showToast(this._t("toast.wineReordered"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to reorder wine:", err);
      this._showToast(this._t("toast.reorderFailed"));
    }
  }

  // Every physical (row, col) slot in the rack, skipping bulk/box storage rows.
  private _getRackSlots(): { row: number; col: number }[] {
    return this._rackPanelCabinet ? getRackSlots(this._rackPanelCabinet) : [];
  }

  // Adds exactly one new slot. A rack is a strict rows×cols rectangle, so
  // growing either axis by 1 adds that many slots (all of the other axis).
  // Grow whichever axis is smaller to add as few slots as possible — for the
  // common single-row rack (rows=1) this always adds exactly 1 slot.
  private _addRackSlot() {
    if (!this._rackPanelCabinet) return;
    const { rows, cols } = this._rackPanelCabinet;
    if (rows <= cols) {
      this._resizeRack({ cols: cols + 1 });
    } else {
      this._resizeRack({ rows: rows + 1 });
    }
  }

  private async _resizeRack(updates: { rows?: number; cols?: number }) {
    if (!this._rackPanelCabinet) return;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_cabinet",
        cabinet_id: this._rackPanelCabinet.id,
        updates,
      });
      await this._loadData();
    } catch (err) {
      console.error("Failed to resize rack:", err);
      this._showToast(this._t("toast.rackResizeFailed"));
    }
  }

  // A rack is a strict rows×cols rectangle, so only the trailing slot can be
  // removed without leaving a hole the grid can't represent.
  private _isLastRackSlot(row: number, col: number): boolean {
    const slots = this._getRackSlots();
    if (slots.length === 0) return false;
    const last = slots[slots.length - 1];
    return last.row === row && last.col === col;
  }

  private async _deleteRackSlot(row: number, col: number) {
    if (!this._rackPanelCabinet) return;
    const { rows, cols } = this._rackPanelCabinet;
    if (rows <= 1 && cols <= 1) {
      this._showToast(this._t("toast.rackTooSmall"));
      return;
    }
    const wine = this._rackPanelWines.find((w) => w.row === row && w.col === col);
    const warning = wine
      ? this._t("toast.deleteThisSlotConfirmNamed", { name: wine.name })
      : this._t("toast.deleteThisSlotConfirm");
    if (!window.confirm(warning)) return;

    try {
      if (wine) {
        await this.hass.callWS({
          type: "wine_cellar/update_wine",
          wine_id: wine.id,
          updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
        });
      }
      if (cols >= rows && cols > 1) {
        await this._resizeRack({ cols: cols - 1 });
      } else {
        await this._resizeRack({ rows: rows - 1 });
      }
      this._showToast(wine ? this._t("toast.slotDeletedUnassigned") : this._t("toast.slotDeleted"));
    } catch (err) {
      console.error("Failed to delete slot:", err);
      this._showToast(this._t("toast.deleteSlotFailed"));
    }
  }

  private _onRackPanelSlotClick(row: number, col: number, wine?: Wine) {
    const cabinet = this._rackPanelCabinet;
    if (!cabinet) return;
    const cabinetDepth = cabinet.depth || 1;

    if (cabinetDepth >= 2) {
      // Multi-depth cells are handled by the existing depth panel.
      const wines = this._rackPanelWines.filter((w) => w.row === row && w.col === col);
      this._closeRackPanel();
      this._openDepthPanel(cabinet, row, col, wines, cabinetDepth);
      return;
    }

    if (wine) {
      this._selectedWine = wine;
      this._detailMode = "cellar";
      this._showDetail = true;
      return;
    }

    if (this._copiedWine) {
      this._pasteWine(cabinet.id, row, col, 0);
      return;
    }
    if (this._movingWine) {
      this._executeMoveWine(cabinet.id, row, col, "", 0);
      return;
    }
    if (this._movingBuyListItem) {
      this._executeMoveTocellar(cabinet.id, row, col, "", 0);
      return;
    }

    this._addPreselect = { cabinet: cabinet.id, row, col, zone: "", depth: 0 };
    this._showAddDialog = true;
  }

  private _onRackPanelDragStart(e: DragEvent, wine: Wine) {
    this._rackPanelDragWineId = wine.id;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", JSON.stringify({
        wineId: wine.id,
        cabinetId: wine.cabinet_id,
        row: wine.row ?? null,
        col: wine.col ?? null,
        zone: wine.zone || "",
      }));
    }
  }

  private _onRackPanelDragEnd() {
    this._rackPanelDragWineId = null;
    this._rackPanelDragOverKey = null;
  }

  private _onRackPanelDragOver(e: DragEvent, key: string) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    this._rackPanelDragOverKey = key;
  }

  // Swap/move the dragged wine into the target (row, col) slot.
  private async _onRackPanelReorder(e: DragEvent, targetRow: number, targetCol: number, targetWine?: Wine) {
    e.preventDefault();
    this._rackPanelDragOverKey = null;
    const draggedId = this._rackPanelDragWineId;
    this._rackPanelDragWineId = null;
    if (!draggedId || !this._rackPanelCabinet || draggedId === targetWine?.id) return;
    const draggedWine = this._rackPanelWines.find((w) => w.id === draggedId);
    if (!draggedWine || (draggedWine.row === targetRow && draggedWine.col === targetCol)) return;

    try {
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: draggedWine.id,
        cabinet_id: this._rackPanelCabinet.id,
        row: targetRow,
        col: targetCol,
        zone: "",
      });
      if (targetWine) {
        await this.hass.callWS({
          type: "wine_cellar/move_wine",
          wine_id: targetWine.id,
          cabinet_id: this._rackPanelCabinet.id,
          row: draggedWine.row,
          col: draggedWine.col,
          zone: "",
        });
      }
      this._showToast(this._t("toast.wineReordered"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to reorder wine:", err);
      this._showToast(this._t("toast.reorderFailed"));
    }
  }

  private async _executeMoveWine(cabinetId: string, row: number | null, col: number | null, zone: string, depth = 0, exactPosition = false) {
    if (!this._movingWine) return;
    try {
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: this._movingWine.id,
        cabinet_id: cabinetId,
        zone,
        depth,
        // Bulk/zone moves have no X/Y; the backend schema rejects row/col
        // sent as null, so only include them when they're actually set.
        ...(row !== null ? { row } : {}),
        ...(col !== null ? { col } : {}),
      });
      // A slot zone (shelf) was given its exact depth above — reordering
      // to the top of the pile would scramble every other bottle's fixed
      // position there, so only bulk/box zones get that treatment.
      if (zone && !exactPosition) await this._placeOnTopOfBin(cabinetId, zone, [this._movingWine.id]);
      this._showToast(this._t("toast.wineMoved", { name: this._movingWine.name }));
      this._movingWine = null;
      await this._loadData();
    } catch (err) {
      console.error("Failed to move wine:", err);
      this._showToast(this._t("toast.moveFailed"));
    }
  }

  private async _onWineDrop(e: CustomEvent) {
    const d = e.detail;

    // Slot zone (shelf): the target IS the exact slot the drop landed on,
    // not a "reorder near this bottle" or "first free depth" placement —
    // swap if occupied, place directly if empty. Handled separately so it
    // never falls into the bulk-zone reorder heuristic below (which would
    // otherwise trigger for any same-zone shelf-to-shelf drag).
    if (d.explicitDepth) {
      await this._onExactSlotDrop(d);
      return;
    }

    // Reordering within the same bulk zone: dropped on/near another bottle
    // there, so insert before/after it (whichever side the drop landed on)
    // and reflow the whole zone to sequential depths — a straight two-item
    // depth swap couldn't move a bottle to the front/back of a longer bin.
    if (
      d.targetWineId &&
      d.targetWineId !== d.wineId &&
      d.sourceCabinetId === d.targetCabinetId &&
      d.sourceZone &&
      d.sourceZone === d.targetZone
    ) {
      try {
        const zoneWines = this._wines
          .filter((w) => w.cabinet_id === d.targetCabinetId && w.zone === d.targetZone)
          .sort((a, b) => (a.depth || 0) - (b.depth || 0));
        const fromIdx = zoneWines.findIndex((w) => w.id === d.wineId);
        if (fromIdx === -1) return;
        const [moved] = zoneWines.splice(fromIdx, 1);
        const toIdx = zoneWines.findIndex((w) => w.id === d.targetWineId);
        if (toIdx === -1) return;
        zoneWines.splice(d.insertBefore ? toIdx : toIdx + 1, 0, moved);

        // One renumbering rather than a move per bottle: dragging within a
        // full twenty-bottle bin used to fire up to twenty calls, each with
        // its own disk write on the other side.
        await this.hass.callWS({
          type: "wine_cellar/reorder_zone",
          cabinet_id: d.targetCabinetId,
          zone: d.targetZone,
          wine_ids: zoneWines.map((w) => w.id),
        });
        this._showToast(this._t("toast.wineReordered"));
        await this._loadData();
      } catch (err) {
        console.error("Failed to reorder wine:", err);
        this._showToast(this._t("toast.reorderFailed"));
      }
      return;
    }

    // Don't drop on same position. Only meaningful for grid slots — bulk/box
    // zones have no row/col (always null), so this would always match and
    // silently block reordering within the same zone.
    if (!d.targetZone && d.sourceCabinetId === d.targetCabinetId && d.sourceRow === d.targetRow && d.sourceCol === d.targetCol && d.sourceZone === d.targetZone) return;

    // Set once the first half of a swap has happened, so a failure in the
    // second half can be undone.
    let swappedBack: (() => Promise<any>) | null = null;
    try {
      // Check if target cell has a wine (swap)
      let targetWine: Wine | undefined;
      if (d.targetRow !== null && d.targetCol !== null && !d.targetZone) {
        targetWine = this._wines.find(
          (w) => w.cabinet_id === d.targetCabinetId && w.row === d.targetRow && w.col === d.targetCol
        );
      }

      if (targetWine) {
        // Swap: move target wine to source position first
        await this.hass.callWS({
          type: "wine_cellar/move_wine",
          wine_id: targetWine.id,
          cabinet_id: d.sourceCabinetId,
          zone: d.sourceZone || "",
          // Slot targets carry real X/Y coordinates; Bulk/zone targets have
          // none, and the backend schema rejects row/col sent as null, so
          // only include them when they're actually set.
          ...(d.sourceRow !== null && d.sourceRow !== undefined ? { row: d.sourceRow } : {}),
          ...(d.sourceCol !== null && d.sourceCol !== undefined ? { col: d.sourceCol } : {}),
        });
        // Half of a swap is not a state the rack can be in: the target bottle
        // is now sitting where the dragged one still is. If the second half
        // fails, put it back before reporting the failure.
        swappedBack = () =>
          this.hass.callWS({
            type: "wine_cellar/move_wine",
            wine_id: targetWine!.id,
            cabinet_id: d.targetCabinetId,
            zone: d.targetZone || "",
            ...(d.targetRow !== null && d.targetRow !== undefined ? { row: d.targetRow } : {}),
            ...(d.targetCol !== null && d.targetCol !== undefined ? { col: d.targetCol } : {}),
          });
      }

      // Dropped into a bulk/box zone's general area (not swapped onto a
      // specific bottle above): land past the last occupied depth instead
      // of defaulting to 0, which would collide with whatever wine is
      // already at depth 0 and — since depth-sorting is stable — look like
      // the drop silently did nothing.
      let targetDepth: number | undefined;
      if (d.targetZone) {
        const occupants = this._wines.filter(
          (w) => w.cabinet_id === d.targetCabinetId && w.zone === d.targetZone && w.id !== d.wineId
        );
        const targetCabinet = this._cabinets.find((c) => c.id === d.targetCabinetId);
        const rowIdx = parseInt(d.targetZone.replace("storage-", ""), 10);
        const storageRow = targetCabinet?.storage_rows?.find((s) => s.row === rowIdx);
        const capacity = storageRow?.capacity || 20;
        targetDepth = this._firstFreeDepth(d.targetCabinetId, d.targetZone, d.wineId);
        if (storageRow && (occupants.length >= capacity || targetDepth >= capacity)) {
          this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
          return;
        }
      }

      // Move dragged wine to target
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: d.wineId,
        cabinet_id: d.targetCabinetId,
        zone: d.targetZone || "",
        ...(d.targetRow !== null && d.targetRow !== undefined ? { row: d.targetRow } : {}),
        ...(d.targetCol !== null && d.targetCol !== undefined ? { col: d.targetCol } : {}),
        ...(targetDepth !== undefined ? { depth: targetDepth } : {}),
      });

      // Dropped into a bin's open area rather than onto a specific bottle:
      // that is putting it on the pile, so it lands on top. A drop *onto* a
      // bottle is a deliberate position and is left exactly where it fell.
      if (d.targetZone && !targetWine) {
        await this._placeOnTopOfBin(d.targetCabinetId, d.targetZone, [d.wineId]);
      }

      // Same container (rack/bin/box) = reordering; a different one = an
      // actual move between containers.
      const sameContainer = d.sourceCabinetId === d.targetCabinetId;
      this._showToast(sameContainer ? this._t("toast.wineReordered") : targetWine ? this._t("toast.wineSwapped") : this._t("toast.wineMovedShort"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to move wine:", err);
      if (swappedBack) {
        try {
          await swappedBack();
        } catch (undoErr) {
          console.error("Failed to undo half-completed swap:", undoErr);
          this._showToast(this._t("toast.moveUndoFailed"));
          await this._loadData();
          return;
        }
      }
      this._showToast(this._t("toast.moveFailed"));
      await this._loadData();
    }
  }

  // Drop onto an exact slot (currently only shelf zones): swap with
  // whatever's already there, or place directly if the slot is empty.
  // No "first free depth"/on-top-of-pile logic — the dropped-on slot is
  // exactly where the bottle goes.
  private async _onExactSlotDrop(d: any) {
    if (
      d.sourceCabinetId === d.targetCabinetId &&
      d.sourceZone === d.targetZone &&
      d.sourceRow === d.targetRow &&
      d.sourceCol === d.targetCol &&
      (d.sourceDepth ?? null) === d.targetDepth
    ) {
      return;
    }

    let swappedBack: (() => Promise<any>) | null = null;
    try {
      const targetWine = d.targetWineId ? this._wines.find((w) => w.id === d.targetWineId) : undefined;

      if (targetWine) {
        // Swap: move the occupant to the dragged bottle's old slot first.
        await this.hass.callWS({
          type: "wine_cellar/move_wine",
          wine_id: targetWine.id,
          cabinet_id: d.sourceCabinetId,
          zone: d.sourceZone || "",
          ...(d.sourceRow !== null && d.sourceRow !== undefined ? { row: d.sourceRow } : {}),
          ...(d.sourceCol !== null && d.sourceCol !== undefined ? { col: d.sourceCol } : {}),
          ...(d.sourceDepth !== null && d.sourceDepth !== undefined ? { depth: d.sourceDepth } : {}),
        });
        // Half of a swap is not a state the rack can be in: the target bottle
        // is now sitting where the dragged one still is. If the second half
        // fails, put it back before reporting the failure.
        swappedBack = () =>
          this.hass.callWS({
            type: "wine_cellar/move_wine",
            wine_id: targetWine.id,
            cabinet_id: d.targetCabinetId,
            zone: d.targetZone || "",
            depth: d.targetDepth,
          });
      }

      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: d.wineId,
        cabinet_id: d.targetCabinetId,
        zone: d.targetZone || "",
        depth: d.targetDepth,
      });

      const sameContainer = d.sourceCabinetId === d.targetCabinetId;
      this._showToast(sameContainer ? this._t("toast.wineReordered") : targetWine ? this._t("toast.wineSwapped") : this._t("toast.wineMovedShort"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to move wine:", err);
      if (swappedBack) {
        try {
          await swappedBack();
        } catch (undoErr) {
          console.error("Failed to undo half-completed swap:", undoErr);
          this._showToast(this._t("toast.moveUndoFailed"));
          await this._loadData();
          return;
        }
      }
      this._showToast(this._t("toast.moveFailed"));
      await this._loadData();
    }
  }

  // Tap-to-move equivalent of dragging onto an occupied slot (see
  // _onExactSlotDrop for the drag-and-drop version) — Android has no real
  // drag-and-drop, so long-press-then-tap is its stand-in, and tapping an
  // occupied target should swap just as dropping onto one does instead of
  // falling through to "open its detail". Used by both the classic grid
  // (row/col) and slot-addressable zones (shelf/quinconce, zone+depth);
  // bulk/box zones have no fixed per-slot occupancy for this to mean the
  // same thing, so callers only reach here when there's an actual slot.
  private async _executeSwapWine(
    target: { cabinetId: string; row?: number | null; col?: number | null; zone?: string; depth?: number },
    targetWine: Wine
  ) {
    const movingWine = this._movingWine;
    if (!movingWine || movingWine.id === targetWine.id) return;

    const targetPayload: Record<string, unknown> = { cabinet_id: target.cabinetId, zone: target.zone || "" };
    if (target.row != null) targetPayload.row = target.row;
    if (target.col != null) targetPayload.col = target.col;
    if (target.depth != null) targetPayload.depth = target.depth;

    const originPayload: Record<string, unknown> = { cabinet_id: movingWine.cabinet_id, zone: movingWine.zone || "" };
    if (movingWine.row !== null) originPayload.row = movingWine.row;
    if (movingWine.col !== null) originPayload.col = movingWine.col;
    if (movingWine.zone || movingWine.row !== null) originPayload.depth = movingWine.depth ?? 0;

    let swappedBack: (() => Promise<any>) | null = null;
    try {
      await this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: targetWine.id, ...originPayload });
      // Half of a swap is not a state the rack can be in: the target bottle
      // is now sitting where the moving one still is. If the second half
      // fails, put it back before reporting the failure.
      swappedBack = () => this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: targetWine.id, ...targetPayload });

      await this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: movingWine.id, ...targetPayload });

      this._showToast(this._t("toast.wineSwapped"));
      this._movingWine = null;
      await this._loadData();
    } catch (err) {
      console.error("Failed to swap wine:", err);
      if (swappedBack) {
        try {
          await swappedBack();
        } catch (undoErr) {
          console.error("Failed to undo half-completed swap:", undoErr);
          this._showToast(this._t("toast.moveUndoFailed"));
          await this._loadData();
          return;
        }
      }
      this._showToast(this._t("toast.moveFailed"));
      await this._loadData();
    }
  }

  private _copyWine(wine: Wine) {
    this._copiedWine = wine;
    this._showToast(this._t("toast.wineCopied", { name: wine.name }));
    this._showDetail = false;
    // Close any open side panel and show every rack, so the whole cellar is reachable to paste into.
    this._zonePanelOpen = false;
    this._rackPanelOpen = false;
    this._shelfPanelOpen = false;
    this._depthPanelOpen = false;
    this._activeTab = "all";
  }

  private async _pasteWine(cabinetId: string, row: number | null, col: number | null, depth = 0, zone = "", exactPosition = false) {
    if (!this._copiedWine) return;
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/add_wine",
        wine: {
          barcode: this._copiedWine.barcode,
          name: this._copiedWine.name,
          winery: this._copiedWine.winery,
          region: this._copiedWine.region,
          country: this._copiedWine.country,
          vintage: this._copiedWine.vintage,
          type: this._copiedWine.type,
          grape_variety: this._copiedWine.grape_variety,
          rating: this._copiedWine.rating,
          image_url: this._copiedWine.image_url,
          back_image_url: this._copiedWine.back_image_url,
          price: this._copiedWine.price,
          retail_price: this._copiedWine.retail_price,
          retail_price_currency: this._copiedWine.retail_price_currency,
          purchase_date: this._copiedWine.purchase_date,
          drink_by: this._copiedWine.drink_by,
          notes: this._copiedWine.notes,
          description: this._copiedWine.description,
          food_pairings: this._copiedWine.food_pairings,
          alcohol: this._copiedWine.alcohol,
          ratings_count: this._copiedWine.ratings_count,
          cabinet_id: cabinetId,
          row,
          col,
          depth,
          zone,
          user_rating: this._copiedWine.user_rating,
          tasting_notes: this._copiedWine.tasting_notes,
          disposition: this._copiedWine.disposition,
          drink_window: this._copiedWine.drink_window,
          ai_ratings: this._copiedWine.ai_ratings,
          vivino_updated_at: this._copiedWine.vivino_updated_at,
          vivino_checked_at: this._copiedWine.vivino_checked_at,
          ai_updated_at: this._copiedWine.ai_updated_at,
          ai_checked_at: this._copiedWine.ai_checked_at,
          vivino_id: this._copiedWine.vivino_id,
          // Keep the source: a copy of a Vivino-synced bottle must stay part
          // of the reconciliation (count pushes, removal candidates), or it
          // becomes an invisible manual bottle with a vivino_id.
          source: this._copiedWine.source,
        },
      });
      const pasted = result?.wine?.id;
      // A slot zone (shelf) was given its exact depth above — reordering
      // to the top of the pile would scramble every other bottle's fixed
      // position there, so only bulk/box zones get that treatment.
      if (zone && pasted && !exactPosition) await this._placeOnTopOfBin(cabinetId, zone, [pasted]);
      this._showToast(this._t("toast.winePasted"));
      await this._loadData();
    } catch {
      this._showToast(this._t("toast.pasteFailed"));
    }
  }

  // --- Batch AI Analysis ---
  private _batchAnalyzeWines() {
    if (this._wines.length > 5) {
      this._showBatchAiConfirm = true;
      return;
    }
    this._runBatchAnalyzeWines();
  }

  private async _runBatchAnalyzeWines() {
    this._showBatchAiConfirm = false;
    this._analyzing = true;
    this._showToast(this._t("toast.aiBatchRunning"));
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/batch_analyze_wines",
      });
      if (result.error) {
        this._showToast(this._t("toast.aiBatchFailedError", { error: result.error }));
      } else {
        const parts = [this._t("toast.aiBatchComplete", { updated: result.updated, total: result.total })];
        if (result.errors > 0) parts.push(this._t("toast.errorsCount", { n: result.errors }));
        this._showToast(parts.join(" "));
        await this._loadData();
      }
    } catch (err: any) {
      this._showToast(this._t("toast.aiBatchFailed"));
    }
    this._analyzing = false;
  }

  // --- Arrangement ---
  // Recomputed on render rather than cached: it reads the same wines and
  // cabinets the card already holds, and a stale count would point at moves
  // that have since been made.
  private get _arrangementFindings(): Finding[] {
    // Read from render(), so it ran on every keystroke in the search box even
    // though typing cannot change how the cellar is arranged. Cached against
    // the three things it actually depends on — all replaced wholesale rather
    // than mutated, so identity is a sound key.
    if (
      this._findingsCache &&
      this._findingsCache.wines === this._wines &&
      this._findingsCache.cabinets === this._cabinets &&
      this._findingsCache.dismissed === this._dismissedArrangements
    ) {
      return this._findingsCache.findings;
    }
    const findings = analyzeArrangement(
      this._wines,
      this._cabinets,
      this._dismissedArrangements,
      this.hass?.language
    );
    this._findingsCache = {
      wines: this._wines,
      cabinets: this._cabinets,
      dismissed: this._dismissedArrangements,
      findings,
    };
    return findings;
  }

  // "Leave it as it is" has to stick, or the count becomes a badge people
  // learn to ignore. Applied locally first so the finding disappears at once.
  private async _dismissArrangement(id: string) {
    if (this._dismissedArrangements.includes(id)) return;
    const previous = this._dismissedArrangements;
    const next = [...previous, id];
    this._dismissedArrangements = next;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { dismissed_arrangements: next },
      });
    } catch (err) {
      this._dismissedArrangements = previous;
      this._showToast(this._t("toast.dismissSuggestionFailed"));
    }
  }

  // --- Metadata language (Vivino/AI) ---
  private async _setMetadataLanguage(lang: string) {
    if (lang === this._metadataLanguage) return;
    const previous = this._metadataLanguage;
    this._metadataLanguage = lang;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { metadata_language: lang },
      });
    } catch (err) {
      this._metadataLanguage = previous;
      this._showToast(this._t("toast.changeLanguageFailed"));
    }
  }

  private async _setMetadataCurrency(currency: string) {
    if (currency === this._metadataCurrency) return;
    const previous = this._metadataCurrency;
    this._metadataCurrency = currency;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { metadata_currency: currency },
      });
    } catch (err) {
      this._metadataCurrency = previous;
      this._showToast(this._t("toast.changeCurrencyFailed"));
    }
  }

  private async _setAiFallbackAlways(value: boolean) {
    if (value === this._aiFallbackAlways) return;
    const previous = this._aiFallbackAlways;
    this._aiFallbackAlways = value;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { ai_fallback_always: value },
      });
    } catch (err) {
      this._aiFallbackAlways = previous;
      this._showToast(this._t("toast.changeAiFallbackFailed"));
    }
  }

  private async _setEnableWhisky(value: boolean) {
    if (value === this._enableWhisky) return;
    const previous = this._enableWhisky;
    this._enableWhisky = value;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { enable_whisky: value },
      });
    } catch (err) {
      this._enableWhisky = previous;
      this._showToast(this._t("toast.changeEnableWhiskyFailed"));
    }
  }

  private async _setDefaultWineType(value: WineType) {
    if (value === this._defaultWineType) return;
    const previous = this._defaultWineType;
    this._defaultWineType = value;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { default_wine_type: value },
      });
    } catch (err) {
      this._defaultWineType = previous;
      this._showToast(this._t("toast.changeDefaultWineTypeFailed"));
    }
  }

  private async _setDispositionDisplay(value: "letter" | "dot") {
    if (value === this._dispositionDisplay) return;
    const previous = this._dispositionDisplay;
    this._dispositionDisplay = value;
    try {
      await this.hass.callWS({
        type: "wine_cellar/update_settings",
        updates: { disposition_display: value },
      });
    } catch (err) {
      this._dispositionDisplay = previous;
      this._showToast(this._t("toast.changeDispositionDisplayFailed"));
    }
  }

  // --- Batch Vivino Refresh ---
  private _batchRefreshVivino() {
    this._batchAiFallback = this._aiFallbackAlways;
    this._showBatchVivinoConfirm = true;
  }

  private async _runBatchVivino(photoMode: "keep" | "replace") {
    this._showBatchVivinoConfirm = false;
    this._batchVivino = true;
    this._showToast(this._t("toast.vivinoRefreshing"));
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/batch_refresh_vivino",
        photo_mode: photoMode,
        ai_fallback: this._batchAiFallback ? "use" : "skip",
      });
      if (result.error) {
        this._showToast(this._t("toast.vivinoBatchFailedError", { error: result.error }));
      } else {
        const parts = [this._t("toast.vivinoBatchComplete", { updated: result.updated, total: result.total })];
        if (result.photos_updated) parts.push(this._t("toast.vivinoPhotosUpdated", { n: result.photos_updated }));
        if (result.photos_kept) parts.push(this._t("toast.vivinoPhotosKept", { n: result.photos_kept }));
        if (result.ai_fallback_used) parts.push(this._t("toast.vivinoAiFallbackUsed", { n: result.ai_fallback_used }));
        const unresolvedMismatch = (result.mismatched || 0) - (result.ai_fallback_used || 0);
        if (unresolvedMismatch > 0) parts.push(this._t("toast.vivinoNoMatch", { n: unresolvedMismatch }));
        if (result.errors > 0) parts.push(this._t("toast.errorsCount", { n: result.errors }));
        this._showToast(parts.join(", "));
        await this._loadData();
      }
    } catch (err: any) {
      this._showToast(this._t("toast.vivinoBatchRefreshFailed"));
    }
    this._batchVivino = false;
  }

  // --- Vivino Account Sync ---
  private get _vivinoSyncMode(): boolean {
    return this._vivinoMode === "sync";
  }

  // --- Pending Vivino removals: the user picks the actual bottle ---
  private _removalCandidates(vid: string): Wine[] {
    return this._wines.filter(
      (w) =>
        String(w.vivino_id || "") === vid &&
        String(w.source || "").startsWith("vivino")
    );
  }

  private get _removalHighlightIds(): string[] {
    const vid = this._removalFocusVid || this._conflictFocusVid;
    return vid ? this._removalCandidates(vid).map((w) => w.id) : [];
  }

  private _conflictLabel(vid: string): string {
    const w = this._removalCandidates(vid)[0];
    if (!w) return this._t("ui.card.vivinoWineFallback", { vid });
    return `${w.winery ? `${w.winery} — ` : ""}${w.name}${w.vintage ? ` (${w.vintage})` : ""}`;
  }

  private async _confirmConflictResolution() {
    const vid = this._conflictConfirmVid;
    if (!vid || this._conflictResolving) return;
    this._conflictConfirmVid = null;
    this._conflictResolving = vid;
    const target = this._removalCandidates(vid).length;
    try {
      const res = await this.hass.callWS({
        type: "wine_cellar/resolve_vivino_conflict",
        vivino_id: vid,
      });
      if (res.error) {
        this._showToast(res.error);
        return;
      }
      this._vivinoConflicts = res.conflicts || [];
      this._conflictFocusVid = null;
      this._showToast(
        target === 1
          ? this._t("toast.vivinoConflictUpdatedOne", { n: target })
          : this._t("toast.vivinoConflictUpdatedMany", { n: target })
      );
      await this._loadData();
    } catch {
      this._showToast(this._t("toast.vivinoConflictUpdateFailed"));
    } finally {
      this._conflictResolving = null;
    }
  }

  private _bottlePosition(wine: Wine): string {
    if (!wine.cabinet_id) return this._t("wineLocation.unassigned");
    const cab = this._cabinets.find((c) => c.id === wine.cabinet_id);
    const parts = [cab?.name || this._t("ui.inventory.cabinet")];
    if (wine.zone) parts.push(this._t("ui.card.bottlePositionZone", { zone: wine.zone }));
    else if (wine.row != null && wine.col != null) {
      parts.push(this._t("ui.card.bottlePositionRowSlot", { row: Number(wine.row) + 1, col: Number(wine.col) + 1 }));
    }
    return parts.join(", ");
  }

  private async _confirmRemovalChoice() {
    const wine = this._removalConfirmWine;
    if (!wine) return;
    this._removalConfirmWine = null;
    try {
      const res = await this.hass.callWS({
        type: "wine_cellar/resolve_vivino_removal",
        wine_id: wine.id,
      });
      if (res.error) {
        this._showToast(res.error);
        return;
      }
      this._pendingRemovals = res.pending_removals || {};
      if (this._removalFocusVid && !this._pendingRemovals[this._removalFocusVid]) {
        this._removalFocusVid = null;
      }
      const left = Object.values(this._pendingRemovals).reduce(
        (a: number, e: any) => a + (e.count || 0), 0
      );
      this._showToast(
        left > 0
          ? this._t("toast.bottleRemovedMoreToChoose", { n: left })
          : this._t("toast.bottleRemovedAllResolved")
      );
      await this._loadData();
    } catch {
      this._showToast(this._t("toast.removeBottleFailed"));
    }
  }

  private async _syncVivino() {
    this._vivinoSyncing = true;
    this._showToast(
      this._vivinoSyncMode ? this._t("toast.vivinoSyncing") : this._t("toast.vivinoImporting")
    );
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/sync_vivino",
      });
      if (result.error) {
        this._showToast(
          this._vivinoSyncMode
            ? this._t("toast.vivinoSyncFailedError", { error: result.error })
            : this._t("toast.vivinoImportFailedError", { error: result.error })
        );
      } else {
        const bottles = (result.cellar_imported || 0) + (result.my_wines_imported || 0);
        const parts = [
          this._vivinoSyncMode
            ? (bottles === 1
                ? this._t("toast.vivinoSyncCompleteOne", { n: bottles })
                : this._t("toast.vivinoSyncCompleteMany", { n: bottles }))
            : (bottles === 1
                ? this._t("toast.vivinoImportCompleteOne", { n: bottles })
                : this._t("toast.vivinoImportCompleteMany", { n: bottles })),
        ];
        if (result.cellar_removed > 0) {
          parts.push(
            result.cellar_removed === 1
              ? this._t("toast.vivinoRemovedCountOne", { n: result.cellar_removed })
              : this._t("toast.vivinoRemovedCountMany", { n: result.cellar_removed })
          );
        }
        if (result.wishlist_imported > 0) parts.push(this._t("toast.vivinoWishlistAdded", { n: result.wishlist_imported }));
        if (result.cellar_pushed > 0) parts.push(this._t("toast.vivinoPushedCount", { n: result.cellar_pushed }));
        if (result.cellar_removal_choices > 0) {
          parts.push(
            result.cellar_removal_choices === 1
              ? this._t("toast.vivinoRemovalChoicesOne", { n: result.cellar_removal_choices })
              : this._t("toast.vivinoRemovalChoicesMany", { n: result.cellar_removal_choices })
          );
        }
        if (result.cellar_conflicts > 0) {
          parts.push(
            result.cellar_conflicts === 1
              ? this._t("toast.vivinoConflictsOne", { n: result.cellar_conflicts })
              : this._t("toast.vivinoConflictsMany", { n: result.cellar_conflicts })
          );
        }
        if (result.errors?.length) parts.push(this._t("toast.errorsCount", { n: result.errors.length }));
        this._showToast(parts.join(" "));
        await this._loadData();
      }
    } catch (err: any) {
      this._showToast(
        this._vivinoSyncMode ? this._t("toast.vivinoSyncFailed") : this._t("toast.vivinoImportFailed")
      );
    }
    this._vivinoSyncing = false;
  }

  // --- Buy List ---
  private _showBuyListDetail(item: Wine) {
    this._selectedWine = item;
    this._detailMode = "buylist";
    this._showDetail = true;
  }

  private async _removeBuyListItem(itemId: string) {
    try {
      await this.hass.callWS({
        type: "wine_cellar/remove_from_buy_list",
        item_id: itemId,
      });
      this._showToast(this._t("toast.removedFromBuyList"));
      await this._loadData();
    } catch (err) {
      console.error("Failed to remove from buy list", err);
      this._showToast(this._t("toast.removeFromBuyListFailed"));
    }
  }

  private _startMoveBuyListItem(item: Wine) {
    this._movingBuyListItem = item;
    this._activeTab = "all";
    this._showToast(this._t("toast.tapToPlace", { name: item.name }));
  }

  private async _executeMoveTocellar(cabinetId: string, row: number | null, col: number | null, zone: string, depth = 0, exactPosition = false) {
    if (!this._movingBuyListItem) return;
    try {
      const result = await this.hass.callWS({
        type: "wine_cellar/move_to_cellar",
        item_id: this._movingBuyListItem.id,
        cabinet_id: cabinetId,
        row,
        col,
        zone,
        depth,
      });
      const moved = result?.wine?.id;
      // A slot zone (shelf) was given its exact depth above — reordering
      // to the top of the pile would scramble every other bottle's fixed
      // position there, so only bulk/box zones get that treatment.
      if (zone && moved && !exactPosition) await this._placeOnTopOfBin(cabinetId, zone, [moved]);
      this._showToast(this._t("toast.movedToCellar", { name: this._movingBuyListItem.name }));
      this._movingBuyListItem = null;
      await this._loadData();
    } catch (err) {
      console.error("Failed to move to cellar:", err);
      this._showToast(this._t("toast.moveToCellarFailed"));
    }
  }

  private async _onRemoveWine(e: CustomEvent) {
    try {
      const { wine_id, reason, name, personal_rating, drink_notes, buy_again } = e.detail;
      const msg: Record<string, unknown> = { type: "wine_cellar/remove_wine", wine_id, reason: reason || "other" };
      // Only the Drink button sends a tasting log.
      if (buy_again !== undefined) Object.assign(msg, { personal_rating, drink_notes, buy_again });
      await this.hass.callWS(msg);
      await this._loadData();
      if (reason === "drank" && name) this._showToast(this._t("toast.wineDrunk", { name }));
    } catch (err) {
      console.error("Failed to remove wine", err);
      this._showToast(this._t("toast.removeWineFailed"));
    }
  }

  private async _onWineAdded() {
    await this._loadData();
  }

  private _onSearch(e: CustomEvent) {
    this._searchQuery = e.detail.query;
    this._searchFilter = e.detail.filter;
  }

  private _getCabinetWines(cabinetId: string): Wine[] {
    return this._wines.filter((w) => w.cabinet_id === cabinetId);
  }

  private _getUnassignedWines(): Wine[] {
    const cabinetIds = new Set(this._cabinets.map((c) => c.id));
    return this._wines.filter((w) => !w.cabinet_id || !cabinetIds.has(w.cabinet_id));
  }

  render() {
    if (this._loading) {
      return html`
        <ha-card>
          <div class="loading">${this._t("ui.card.loading")}</div>
        </ha-card>
      `;
    }

    const title = this._config?.title || "Cork Dork";
    const filteredWines = this._getFilteredWines();
    const isSearching = !!(this._searchQuery || this._searchFilter !== "all");
    const unassignedWines = this._getUnassignedWines();
    const showGrid = !isSearching && this._activeTab !== "buy-list" && this._activeTab !== "unassigned" && (this._activeTab === "all" || this._cabinets.some((c) => c.id === this._activeTab));
    const showBuyList = this._activeTab === "buy-list" && !isSearching;
    const showUnassigned = this._activeTab === "unassigned" && !isSearching;

    return html`
      <ha-card>
        <div class="header-row">
          <div class="title">
            <span class="title-icon">🍷</span>
            <div class="title-text">
              <div>${title}</div>
            </div>
          </div>
          <div class="header-actions">
            ${this._hasVivinoAccount ? html`
              <button
                class="btn btn-primary"
                style="font-size: 0.8em; padding: 5px 10px; background: #b71c1c;"
                @click=${this._syncVivino}
                title="${this._vivinoSyncMode ? this._t("ui.card.syncVivinoTitle") : this._t("ui.card.importVivinoTitle")}"
                ?disabled=${this._vivinoSyncing || this._batchVivino || this._analyzing}
              >
                ${this._vivinoSyncing
                  ? (this._vivinoSyncMode ? this._t("ui.card.vivinoSyncing") : this._t("ui.card.vivinoImporting"))
                  : (this._vivinoSyncMode ? this._t("ui.card.vivinoSyncBtn") : this._t("ui.card.vivinoImportBtn"))}
              </button>
            ` : nothing}
            <button
              class="btn btn-primary"
              style="font-size: 0.8em; padding: 5px 10px; background: #37474f;"
              @click=${() => {
                this._inventoryPairing = false;
                this._showInventory = true;
              }}
              title="${this._t("ui.card.inventoryTitle")}"
            >
              ${this._t("ui.card.inventoryBtn")}
            </button>
            <button
              class="btn btn-primary"
              style="font-size: 0.8em; padding: 5px 10px; background: #5d4037;"
              @click=${() => {
                this._inventoryPairing = true;
                this._showInventory = true;
              }}
              title="${this._t("ui.card.pairingsTitle")}"
            >
              ${this._t("ui.card.pairingsBtn")}
            </button>
            <button
              class="btn btn-primary"
              @click=${() => {
                this._addPreselect = { cabinet: "", row: null, col: null, zone: "", depth: 0 };
                this._showAddDialog = true;
              }}
            >
              ${this._t("ui.card.addWineBtn")}
            </button>
          </div>
        </div>

        <!-- Copy mode banner -->
        ${this._copiedWine
          ? html`
              <div class="copy-banner">
                <span>📋 ${this._t("ui.card.copyBannerText", { name: this._copiedWine.name })}</span>
                <button @click=${() => (this._copiedWine = null)}>✕ ${this._t("ui.card.doneBtn")}</button>
              </div>
            `
          : nothing}

        <!-- Move mode banner -->
        ${this._movingWine
          ? html`
              <div class="copy-banner">
                <span>📦 ${this._t("ui.card.moveBannerText", { name: this._movingWine.name })}</span>
                <button @click=${() => (this._movingWine = null)}>✕ ${this._t("ui.common.cancel")}</button>
              </div>
            `
          : nothing}

        <!-- Buy list move mode banner -->
        ${this._movingBuyListItem
          ? html`
              <div class="buy-list-banner">
                <span>🛒 ${this._t("ui.card.buyListMoveBannerText", { name: this._movingBuyListItem.name })}</span>
                <button @click=${() => (this._movingBuyListItem = null)}>✕ ${this._t("ui.common.cancel")}</button>
              </div>
            `
          : nothing}

        <!-- Stats bar -->
        ${this._stats
          ? html`
              <div class="stats-bar">
                <div class="stat">
                  <span class="stat-value">${this._stats.total_bottles}</span>
                  ${this._t("ui.card.statBottles")}
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.total_capacity}</span>
                  ${this._t("ui.card.statCapacity")}
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.available_slots}</span>
                  ${this._t("ui.card.statAvailable")}
                </div>
                ${this._stats.unplaced_bottles > 0
                  ? html`
                      <div class="stat" title="${this._t("ui.card.unplacedTitle")}">
                        <span class="stat-value" style="color:#e65100">${this._stats.unplaced_bottles}</span>
                        ${this._t("ui.card.statUnplaced")}
                      </div>
                    `
                  : nothing}
                ${this._arrangementFindings.length
                  ? html`
                      <div
                        class="stat stat-action"
                        title="${this._t("ui.card.suggestionsTitle")}"
                        @click=${() => (this._showArrangement = true)}
                      >
                        <span class="stat-value">🧹 ${this._arrangementFindings.length}</span>
                        ${this._arrangementFindings.length === 1 ? this._t("ui.card.tidyUp") : this._t("ui.card.tidyUps")}
                      </div>
                    `
                  : nothing}
                ${this._stats.total_value
                  ? html`
                      <div class="stat">
                        <span class="stat-value">${this._metadataCurrency} ${this._stats.total_value.toLocaleString()}</span>
                        ${this._t("ui.card.statValue")}
                        ${this._stats.total_cost
                          ? html`<span style="font-size:0.75em;color:${this._stats.total_value - this._stats.total_cost >= 0 ? '#2e7d32' : '#c62828'}">${this._stats.total_value - this._stats.total_cost >= 0 ? '+' : ''}${this._metadataCurrency} ${(this._stats.total_value - this._stats.total_cost).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>`
                          : nothing}
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}

        <!-- Tab bar -->
        <div class="tab-bar">
          <button
            class="tab ${this._activeTab === "all" ? "active" : ""}"
            @click=${() => (this._activeTab = "all")}
          >
            ${this._t("ui.card.allSections")}
          </button>
          ${this._cabinets.map(
            (cab) => html`
              <button
                class="tab ${this._activeTab === cab.id ? "active" : ""}"
                @click=${() => (this._activeTab = cab.id)}
              >
                ${cab.name}
                (${this._getCabinetWines(cab.id).length})
              </button>
            `
          )}
          ${unassignedWines.length > 0
            ? html`
                <button
                  class="tab ${this._activeTab === "unassigned" ? "active" : ""}"
                  @click=${() => (this._activeTab = "unassigned")}
                  style="${this._activeTab !== "unassigned" ? "border-color: #e65100; color: #e65100;" : ""}"
                >
                  ${this._t("ui.card.unassignedTab", { n: unassignedWines.length })}
                </button>
              `
            : nothing}
          <button
            class="tab ${this._activeTab === "buy-list" ? "active" : ""}"
            @click=${() => (this._activeTab = "buy-list")}
            style="${this._activeTab === "buy-list" ? "border-color: #e65100; color: #e65100;" : ""}"
          >
            ${this._t("ui.card.buyListTab", { n: this._buyList.length })}
          </button>
          <button
            class="tab manage-racks-btn"
            @click=${() => (this._showRackSettings = true)}
          >
            ${this._t("ui.card.manageRacks")}
          </button>
          <button
            class="tab settings-tab-btn"
            @click=${() => (this._showVivinoAiSettings = true)}
          >
            ${this._t("ui.card.vivinoAiSettings")}
          </button>
        </div>

        <!-- Search bar -->
        <wine-search-bar
          .hass=${this.hass}
          .value=${this._searchQuery}
          .filter=${this._searchFilter}
          .enableWhisky=${this._enableWhisky}
          @search-change=${this._onSearch}
        ></wine-search-bar>

        <!-- Cabinet grids -->
        ${Object.keys(this._pendingRemovals).length > 0 || this._vivinoConflicts.length > 0 ? html`
          <div class="removal-panel">
            ${Object.keys(this._pendingRemovals).length > 0 ? html`
              <div class="removal-panel-title">${this._t("ui.card.removalPanelTitle")}</div>
              ${Object.entries(this._pendingRemovals).map(([vid, entry]: [string, any]) => html`
                <div
                  class="removal-entry ${this._removalFocusVid === vid ? "active" : ""}"
                  @click=${() => {
                    this._removalFocusVid = this._removalFocusVid === vid ? null : vid;
                    if (this._removalFocusVid) this._conflictFocusVid = null;
                  }}
                >
                  <span>${entry.winery ? `${entry.winery} — ` : ""}${entry.name || this._t("ui.card.unknownWine")}${entry.vintage ? ` (${entry.vintage})` : ""}</span>
                  <span class="removal-count">${this._t("ui.card.removalChooseCount", { n: entry.count })}</span>
                </div>
              `)}
              ${this._removalFocusVid ? html`
                <div class="removal-hint">${this._t("ui.card.removalHint")}</div>
              ` : nothing}
            ` : nothing}
            ${this._vivinoConflicts.length > 0 ? html`
              <div class="removal-panel-title conflict-title">${this._t("ui.card.conflictPanelTitle")}</div>
              ${this._vivinoConflicts.map((c: any) => {
                const vid = String(c.vintage_id);
                const cdNow = this._removalCandidates(vid).length;
                const active = this._conflictFocusVid === vid;
                return html`
                  <div
                    class="removal-entry conflict ${active ? "active" : ""}"
                    @click=${() => {
                      this._conflictFocusVid = active ? null : vid;
                      if (this._conflictFocusVid) this._removalFocusVid = null;
                    }}
                  >
                    <span>${this._conflictLabel(vid)}</span>
                    <span class="removal-count">${this._t("ui.card.conflictCounts", { vivino: c.vivino, here: cdNow })}</span>
                  </div>
                  ${active ? html`
                    <div class="removal-hint">${this._t("ui.card.conflictHint")}</div>
                    <button
                      class="btn btn-primary conflict-confirm"
                      ?disabled=${this._conflictResolving !== null}
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._conflictConfirmVid = vid;
                      }}
                    >${this._conflictResolving === vid
                      ? this._t("ui.card.conflictSyncing")
                      : this._t("ui.card.conflictConfirmBtn", { n: cdNow })}</button>
                  ` : nothing}
                `;
              })}
            ` : nothing}
          </div>
        ` : nothing}
        ${showGrid
          ? html`
              <div class="cabinets-row">
                ${this._activeTab === "all"
                  ? this._cabinets.map(
                      (cab) => html`
                        <cabinet-grid
                          .hass=${this.hass}
                          .cabinet=${cab}
                          .wines=${this._getCabinetWines(cab.id)}
                          .highlightWineId=${this._highlightWineId}
                          .removalHighlightIds=${this._removalHighlightIds}
                          .movingWineId=${this._movingWine?.id || null}
                          .dispositionDisplay=${this._dispositionDisplay}
                          @cell-click=${this._onCellClick}
                          @zone-click=${this._onZoneClick}
                          @zone-container-click=${this._onZoneContainerClick}
                          @rack-click=${this._onRackClick}
                          @wine-drop=${this._onWineDrop}
                          @wine-longpress=${(e: CustomEvent) => {
                            this._movingWine = e.detail.wine;
                            this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
                          }}
                        ></cabinet-grid>
                      `
                    )
                  : this._cabinets
                      .filter((c) => c.id === this._activeTab)
                      .map(
                        (cab) => html`
                          <cabinet-grid
                            single
                            .hass=${this.hass}
                            .cabinet=${cab}
                            .wines=${this._getCabinetWines(cab.id)}
                            .highlightWineId=${this._highlightWineId}
                            .removalHighlightIds=${this._removalHighlightIds}
                            .movingWineId=${this._movingWine?.id || null}
                            .dispositionDisplay=${this._dispositionDisplay}
                            @cell-click=${this._onCellClick}
                            @zone-click=${this._onZoneClick}
                            @zone-container-click=${this._onZoneContainerClick}
                            @rack-click=${this._onRackClick}
                            @wine-drop=${this._onWineDrop}
                            @wine-longpress=${(e: CustomEvent) => {
                              this._activeTab = "all";
                              this._movingWine = e.detail.wine;
                              this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
                            }}
                          ></cabinet-grid>
                        `
                      )}
              </div>
              ${this._activeTab === "all" && unassignedWines.length > 0
                ? html`
                    <div style="padding: 8px 16px 2px">
                      <div style="font-size: 0.9em; font-weight: 600; color: var(--wc-text-secondary); margin-bottom: 4px">
                        ${this._t("ui.card.unassignedSectionHeader", { n: unassignedWines.length })}
                      </div>
                    </div>
                    <div class="wine-list" style="border-top: 1px solid var(--wc-border)">
                      ${unassignedWines.map((wine) => {
                          const typeColor = WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
                          return html`
                            <div
                              class="wine-list-item"
                              @click=${() => {
                                this._selectedWine = wine;
                                this._detailMode = "cellar";
                                this._showDetail = true;
                              }}
                            >
                              ${wine.image_url
                                ? html`<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                                : html`<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                              <div class="wine-list-info">
                                <div class="wine-list-name">${wine.name}</div>
                                <div class="wine-list-meta">
                                  ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                                  ${wine.rating ? ` · ★${wine.rating}` : ""}
                                </div>
                              </div>
                              <div class="wine-list-location" style="color:#e65100">${this._t("wineLocation.unassigned")}</div>
                            </div>
                          `;
                        })}
                    </div>
                  `
                : nothing}
            `
          : nothing}

        <!-- Buy List view -->
        ${showBuyList
          ? html`
              <div class="buy-list-view">
                ${this._buyList.length === 0
                  ? html`
                      <div class="empty-state">
                        <div class="empty-state-icon">🛒</div>
                        <div style="font-weight: 500; margin-bottom: 4px">
                          ${this._t("ui.card.buyListEmpty")}
                        </div>
                        <div style="font-size: 0.9em">
                          ${this._t("ui.card.buyListEmptyHint")}
                        </div>
                      </div>
                    `
                  : this._buyList.map((item) => {
                      const typeColor = WINE_TYPE_COLORS[item.type as WineType] || WINE_TYPE_COLORS.red;
                      return html`
                        <div class="buy-list-card" @click=${() => this._showBuyListDetail(item)} style="cursor:pointer">
                          ${item.image_url
                            ? html`<img class="wine-list-thumb" src="${item.image_url}" alt="" />`
                            : html`<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                          <div class="bl-info">
                            <div class="bl-name">${item.name}</div>
                            <div class="bl-meta">
                              ${item.winery}${item.vintage ? ` · ${item.vintage}` : ""}
                              ${item.rating ? ` · ★${item.rating.toFixed(1)}` : ""}
                              ${item.retail_price ? ` · ${this._metadataCurrency} ${item.retail_price}` : ""}
                            </div>
                          </div>
                          <div class="bl-actions">
                            <button
                              class="bl-cellar-btn"
                              @click=${(e: Event) => { e.stopPropagation(); this._startMoveBuyListItem(item); }}
                              title="${this._t("ui.card.moveToCellar")}"
                            >
                              ${this._t("ui.card.addToCellarBtn")}
                            </button>
                            <button
                              class="bl-remove-btn"
                              @click=${(e: Event) => { e.stopPropagation(); this._removeBuyListItem(item.id); }}
                              title="${this._t("ui.card.removeFromBuyList")}"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      `;
                    })}
              </div>
            `
          : nothing}

        <!-- Unassigned wines view -->
        ${showUnassigned
          ? html`
              <div class="wine-list">
                <div style="padding: 12px 16px 4px; font-size: 0.85em; color: var(--wc-text-secondary)">
                  ${this._t("ui.card.unassignedHint")}
                </div>
                ${unassignedWines.map((wine) => {
                    const typeColor = WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
                    return html`
                      <div
                        class="wine-list-item"
                        @click=${() => {
                          if (this._movingBuyListItem) return;
                          this._selectedWine = wine;
                          this._detailMode = "cellar";
                          this._showDetail = true;
                        }}
                      >
                        ${wine.image_url
                          ? html`<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                          : html`<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                        <div class="wine-list-info">
                          <div class="wine-list-name">${wine.name}</div>
                          <div class="wine-list-meta">
                            ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                            ${wine.rating ? ` · ★${wine.rating}` : ""}
                            ${wine.disposition
                              ? html` · <span style="color: ${
                                  wine.disposition === "D" ? "#2e7d32" :
                                  wine.disposition === "H" ? "#1565c0" :
                                  wine.disposition === "P" ? "#c62828" : "inherit"
                                }">${
                                  wine.disposition === "D" ? this._t("ui.disposition.drink") :
                                  wine.disposition === "H" ? this._t("ui.disposition.hold") :
                                  wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : ""
                                }</span>`
                              : nothing}
                          </div>
                        </div>
                        <div class="wine-list-location">${this._t("wineLocation.unassigned")}</div>
                      </div>
                    `;
                  })}
              </div>
            `
          : nothing}

        <!-- Filtered wine list (shown when searching or filtering) -->
        ${isSearching
          ? html`
              <div class="wine-list">
                ${filteredWines.length === 0
                  ? html`
                      <div class="empty-state">
                        <div>${this._t("ui.card.noSearchResults")}</div>
                      </div>
                    `
                  : filteredWines.map((wine) => {
                      const cabinetName =
                        this._cabinets.find((c) => c.id === wine.cabinet_id)
                          ?.name || "Unassigned";
                      return html`
                        <div
                          class="wine-list-item"
                          @click=${() => {
                            this._selectedWine = wine;
                            this._detailMode = "cellar";
                            this._showDetail = true;
                          }}
                        >
                          ${wine.image_url
                            ? html`<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                            : html`<div
                                class="wine-list-dot"
                                style="background: ${WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red}"
                              ></div>`}
                          <div class="wine-list-info">
                            <div class="wine-list-name">${wine.name}</div>
                            <div class="wine-list-meta">
                              ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                              ${wine.rating ? ` · ★${wine.rating}` : ""}
                              ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                              ${wine.disposition
                                ? html` · <span style="color: ${
                                    wine.disposition === "D" ? "#2e7d32" :
                                    wine.disposition === "H" ? "#1565c0" :
                                    wine.disposition === "P" ? "#c62828" : "inherit"
                                  }">${
                                    wine.disposition === "D" ? this._t("ui.disposition.drink") :
                                    wine.disposition === "H" ? this._t("ui.disposition.hold") :
                                    wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : ""
                                  }</span>`
                                : nothing}
                            </div>
                          </div>
                          <div class="wine-list-location">${cabinetName}</div>
                        </div>
                      `;
                    })}
              </div>
            `
          : nothing}

        <!-- Empty state -->
        ${this._wines.length === 0
          ? html`
              <div class="empty-state">
                <div class="empty-state-icon">🍾</div>
                <div style="font-weight: 500; margin-bottom: 4px">
                  ${this._t("ui.card.cellarEmpty")}
                </div>
                <div style="font-size: 0.9em">
                  ${this._t("ui.card.cellarEmptyHint")}
                </div>
              </div>
            `
          : nothing}

        <!-- Batch Vivino Photo Mode Confirm -->
        ${this._removalConfirmWine ? html`
          <div class="dialog-overlay" @click=${() => (this._removalConfirmWine = null)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.removeThisBottleTitle")}</h3>
              <p style="margin:0 0 4px;font-size:0.9em;color:var(--wc-text)">
                ${this._removalConfirmWine.winery ? `${this._removalConfirmWine.winery} — ` : ""}${this._removalConfirmWine.name}${this._removalConfirmWine.vintage ? ` (${this._removalConfirmWine.vintage})` : ""}
              </p>
              <p style="margin:0 0 16px;font-size:0.8em;color:var(--wc-text-secondary)">
                ${this._bottlePosition(this._removalConfirmWine)} · ${this._t("ui.card.removeThisBottleHint")}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#e65100" @click=${this._confirmRemovalChoice}>
                  ${this._t("ui.card.removeThisBottleBtn")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => (this._removalConfirmWine = null)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : nothing}
        ${this._conflictConfirmVid ? html`
          <div class="dialog-overlay" @click=${() => (this._conflictConfirmVid = null)}>
            <div class="dialog" style="max-width:360px;padding:24px;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.syncCountConfirmTitle")}</h3>
              <p style="margin:0 0 4px;font-size:0.9em;color:var(--wc-text)">
                ${this._conflictLabel(this._conflictConfirmVid)}
              </p>
              <p style="margin:0 0 16px;font-size:0.8em;color:var(--wc-text-secondary)">
                ${this._removalCandidates(this._conflictConfirmVid).length === 1
                  ? this._t("ui.card.syncCountConfirmBodyOne", { n: this._removalCandidates(this._conflictConfirmVid).length })
                  : this._t("ui.card.syncCountConfirmBodyMany", { n: this._removalCandidates(this._conflictConfirmVid).length })}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#e65100" @click=${this._confirmConflictResolution}>
                  ${this._t("ui.card.syncCountConfirmBtn")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => (this._conflictConfirmVid = null)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : nothing}

        <!-- Wine Detail Dialog -->
        <wine-detail-dialog
          .wine=${this._selectedWine}
          .wines=${this._wines}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .open=${this._showDetail}
          .hasGemini=${this._hasGemini}
          .aiFallbackAlways=${this._aiFallbackAlways}
          .enableWhisky=${this._enableWhisky}
          .currency=${this._metadataCurrency}
          .mode=${this._detailMode}
          .chamberingRoomSensor=${this._chamberingRoomSensor}
          .chamberingTimeConstantMinutes=${this._chamberingTimeConstantMinutes}
          .chamberingEquilibrationHours=${this._chamberingEquilibrationHours}
          @close=${() => (this._showDetail = false)}
          @remove-wine=${this._onRemoveWine}
          @remove-buy-list-item=${(e: CustomEvent) => {
            this._removeBuyListItem(e.detail.item_id);
          }}
          @wine-updated=${() => this._loadData()}
          @buy-list-updated=${() => this._loadData()}
          @copy-wine=${(e: CustomEvent) => this._copyWine(e.detail.wine)}
          @locate-wine=${(e: CustomEvent) => this._locateWine(e.detail.wine)}
          @set-ai-fallback-always=${(e: CustomEvent) => this._setAiFallbackAlways(e.detail.value)}
          @move-wine=${(e: CustomEvent) => {
            this._showDetail = false;
            // Close any open side panel and show every rack, so any rack/zone in the cellar is reachable as a target.
            this._zonePanelOpen = false;
            this._rackPanelOpen = false;
            this._shelfPanelOpen = false;
            this._depthPanelOpen = false;
            this._activeTab = "all";
            this._movingWine = e.detail.wine;
            this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
          }}
        ></wine-detail-dialog>

        <!-- Add Wine Dialog -->
        <add-wine-dialog
          .open=${this._showAddDialog}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .wines=${this._wines}
          .preselectedCabinet=${this._addPreselect.cabinet}
          .preselectedRow=${this._addPreselect.row}
          .preselectedCol=${this._addPreselect.col}
          .preselectedZone=${this._addPreselect.zone}
          .preselectedDepth=${this._addPreselect.depth || 0}
          .buyListMode=${this._addToBuyListMode}
          .enableWhisky=${this._enableWhisky}
          .defaultWineType=${this._defaultWineType}
          @close=${() => { this._showAddDialog = false; this._addToBuyListMode = false; }}
          @scan-list=${() => (this._showWineList = true)}
          @wine-added=${this._onWineAdded}
          @buy-list-updated=${() => this._loadData()}
        ></add-wine-dialog>

        <!-- Wine List Scanner Dialog -->
        <wine-list-dialog
          .open=${this._showWineList}
          .hass=${this.hass}
          .hasGemini=${this._hasGemini}
          .cellarWines=${this._wines}
          @close=${() => (this._showWineList = false)}
          @wine-added=${this._onWineAdded}
          @buy-list-updated=${() => this._loadData()}
        ></wine-list-dialog>

        <!-- Arrangement report -->
        <arrangement-dialog
          .open=${this._showArrangement}
          .hass=${this.hass}
          .wines=${this._wines}
          .cabinets=${this._cabinets}
          .dismissed=${this._dismissedArrangements}
          @close=${() => (this._showArrangement = false)}
          @moves-applied=${() => this._loadData()}
          @dismiss-finding=${(e: CustomEvent) => this._dismissArrangement(e.detail.id)}
        ></arrangement-dialog>

        <!-- Inventory Dialog -->
        <inventory-dialog
          .open=${this._showInventory}
          .hass=${this.hass}
          .wines=${this._wines}
          .cabinets=${this._cabinets}
          .hasGemini=${this._hasGemini}
          .enableWhisky=${this._enableWhisky}
          .currency=${this._metadataCurrency}
          .analyzing=${this._analyzing}
          .batchVivino=${this._batchVivino}
          .pairingMode=${this._inventoryPairing}
          @close=${() => (this._showInventory = false)}
          @wine-updated=${() => this._loadData()}
          @locate-wine=${(e: CustomEvent) => {
            this._showInventory = false;
            this._locateWine(e.detail.wine);
          }}
          @copy-wine=${(e: CustomEvent) => {
            this._showInventory = false;
            this._copyWine(e.detail.wine);
          }}
          @move-wine=${(e: CustomEvent) => {
            this._showInventory = false;
            this._zonePanelOpen = false;
            this._rackPanelOpen = false;
            this._shelfPanelOpen = false;
            this._depthPanelOpen = false;
            this._activeTab = "all";
            this._movingWine = e.detail.wine;
            this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
          }}
          @remove-wine=${this._onRemoveWine}
          @batch-ai-scan=${this._batchAnalyzeWines}
          @batch-vivino-scan=${this._batchRefreshVivino}
        ></inventory-dialog>

        <!-- Batch scan confirms: after the inventory dialog, which launches them, so they stack above it -->
        ${this._showBatchVivinoConfirm ? html`
          <div class="dialog-overlay" @click=${() => (this._showBatchVivinoConfirm = false)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.vivinoBatchScanTitle")}</h3>
              <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">
                ${this._t("ui.card.somePhotosQuestion")}
              </p>
              ${this._hasGemini ? html`
                <label style="display:flex;align-items:center;gap:6px;justify-content:center;font-size:0.8em;color:var(--wc-text-secondary);margin-bottom:16px;cursor:pointer">
                  <input
                    type="checkbox"
                    .checked=${this._batchAiFallback}
                    @change=${(e: Event) => (this._batchAiFallback = (e.target as HTMLInputElement).checked)}
                  />
                  ${this._t("ui.card.tryAiNoMatch")}
                </label>
              ` : nothing}
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#8e24aa" @click=${() => this._runBatchVivino("keep")}>
                  ${this._t("ui.card.keepExistingPhotos")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => this._runBatchVivino("replace")}
                >${this._t("ui.card.replaceWithVivinoPhotos")}</button>
                <button
                  style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showBatchVivinoConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : nothing}

        <!-- Batch AI Analysis Confirm -->
        ${this._showBatchAiConfirm ? html`
          <div class="dialog-overlay" @click=${() => (this._showBatchAiConfirm = false)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.runAiBatchTitle")}</h3>
              <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">
                ${this._t("ui.card.runAiBatchBody", { n: this._wines.length })}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#1565c0" @click=${this._runBatchAnalyzeWines}>
                  ${this._t("ui.card.runOnNWines", { n: this._wines.length })}
                </button>
                <button
                  style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showBatchAiConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : nothing}

        <!-- Rack Settings Dialog -->
        <rack-settings-dialog
          .open=${this._showRackSettings}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .wines=${this._wines}
          @close=${() => (this._showRackSettings = false)}
          @racks-updated=${() => this._loadData()}
        ></rack-settings-dialog>

        <vivino-ai-settings-dialog
          .open=${this._showVivinoAiSettings}
          .hass=${this.hass}
          .aiFallbackAlways=${this._aiFallbackAlways}
          .enableWhisky=${this._enableWhisky}
          .defaultWineType=${this._defaultWineType}
          .dispositionDisplay=${this._dispositionDisplay}
          .metadataLanguage=${this._metadataLanguage}
          .supportedLanguages=${this._supportedLanguages}
          .metadataCurrency=${this._metadataCurrency}
          .supportedCurrencies=${this._supportedCurrencies}
          @close=${() => (this._showVivinoAiSettings = false)}
          @set-ai-fallback-always=${(e: CustomEvent) => this._setAiFallbackAlways(e.detail.value)}
          @set-enable-whisky=${(e: CustomEvent) => this._setEnableWhisky(e.detail.value)}
          @set-default-wine-type=${(e: CustomEvent) => this._setDefaultWineType(e.detail.value)}
          @set-disposition-display=${(e: CustomEvent) => this._setDispositionDisplay(e.detail.value)}
          @set-metadata-language=${(e: CustomEvent) => this._setMetadataLanguage(e.detail.value)}
          @set-metadata-currency=${(e: CustomEvent) => this._setMetadataCurrency(e.detail.value)}
        ></vivino-ai-settings-dialog>

        <!-- Depth Side Panel -->
        ${this._depthPanelOpen
          ? html`
              <div class="depth-panel-backdrop" @click=${this._closeDepthPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._t("ui.card.depthPanelRowCol", { row: (this._depthPanelRow ?? 0) + 1, col: (this._depthPanelCol ?? 0) + 1 })}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.depthPanelDeepCount", { n: this._depthPanelWines.length, max: this._depthPanelMaxDepth })}
                    </span>
                  </span>
                  <button class="depth-panel-close" @click=${this._closeDepthPanel}>✕</button>
                </div>
                <div class="depth-panel-slots">
                  ${Array.from({ length: this._depthPanelMaxDepth }, (_, i) => {
                    const wine = this._depthPanelWines.find((w) => (w.depth || 0) === i);
                    const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                    const disp = wine?.disposition || "";
                    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                    return html`
                      <div
                        class="depth-slot ${wine ? "filled" : "empty"}"
                        @click=${() => this._onDepthSlotClick(i, wine)}
                      >
                        <div class="depth-slot-label">${this._getDepthLabel(i)}</div>
                        ${wine
                          ? html`
                              <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                <div class="depth-slot-avatar">
                                  ${wine.image_url
                                    ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                    : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                  ${this._dispositionBadge(dispClass, disp)}
                                </div>
                                <div class="depth-slot-info">
                                  <div class="depth-slot-name">${wine.name}</div>
                                  <div class="depth-slot-meta">
                                    ${wine.vintage || "NV"}
                                    ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                    ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                  </div>
                                </div>
                              </div>
                            `
                          : html`
                              <div class="depth-slot-empty">
                                <span class="depth-slot-plus">+</span>
                                <span>${this._t("ui.common.empty")}</span>
                              </div>
                            `}
                      </div>
                    `;
                  })}
                </div>
              </div>
            `
          : nothing}

        <!-- Zone Side Panel (Boxes, Bulk Bins) -->
        ${this._zonePanelOpen
          ? html`
              <div class="depth-panel-backdrop ${this._zonePanelDragWineId ? "drag-through" : ""}" @click=${this._closeZonePanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._zonePanelCabinet
                      ? html`<span class="depth-panel-rack">${this._zonePanelCabinet.name}</span>`
                      : nothing}
                    ${this._zonePanelName}
                    <span class="depth-panel-subtitle">
                      ${this._zonePanelWines.length}/${this._zonePanelCapacity}
                      ${this._zonePanelType === "box" || this._zonePanelType === "shelf" ? this._t("ui.card.statBottles") : this._t("ui.card.panelStored")}
                    </span>
                  </span>
                  <span class="depth-panel-actions">
                    ${this._zonePanelWines.length > 1
                      ? html`<button
                          class="depth-panel-sort"
                          ?disabled=${this._zoneSorting}
                          title="${this._t("ui.card.renumberTitle")}"
                          @click=${() => (this._confirmZoneSort = true)}
                        >
                          ${this._zoneSorting ? "Sorting…" : "↕ Sort by date"}
                        </button>`
                      : nothing}
                    <button class="depth-panel-close" @click=${this._closeZonePanel}>✕</button>
                  </span>
                </div>
                ${this._confirmZoneSort
                  ? html`
                      <div class="depth-panel-confirm">
                        <strong>${this._t("ui.card.reorderByDateTitle")}</strong>
                        <span>
                          ${this._t("ui.card.reorderByDateBody", { zone: this._zonePanelName })}
                        </span>
                        <span class="depth-panel-confirm-btns">
                          <button @click=${() => (this._confirmZoneSort = false)}>${this._t("ui.common.cancel")}</button>
                          <button
                            title="${this._t("ui.card.oldestFirstTitle")}"
                            @click=${() => this._sortZoneByDateAdded("oldest")}
                          >
                            ${this._t("ui.card.oldestFirst")}
                          </button>
                          <button
                            class="primary"
                            title="${this._t("ui.card.newestFirstTitle")}"
                            @click=${() => this._sortZoneByDateAdded("newest")}
                          >
                            ${this._t("ui.card.newestFirst")}
                          </button>
                        </span>
                      </div>
                    `
                  : nothing}
                <div class="depth-panel-slots">
                  ${this._zonePanelType === "bulk"
                    ? html`
                        <!-- Bulk mode: numbered slots, harmonized with Box mode -->
                        ${Array.from({ length: this._zonePanelCapacity }, (_, slotIdx) => {
                          const wine = this._zonePanelWines[slotIdx];
                          const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                          const disp = wine?.disposition || "";
                          const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                          const dragKey = `bulk-${slotIdx}`;
                          const highlighted = wine?.id === this._highlightWineId;
                          return html`
                            <div
                              id=${highlighted ? "highlight-slot" : nothing}
                              class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                              draggable=${wine ? "true" : "false"}
                              @click=${() => this._onZonePanelSlotClick(slotIdx, wine)}
                              @dragstart=${wine ? (e: DragEvent) => this._onZonePanelDragStart(e, wine) : nothing}
                              @dragend=${wine ? () => this._onZonePanelDragEnd() : nothing}
                              @dragover=${(e: DragEvent) => this._onZonePanelDragOver(e, dragKey)}
                              @dragleave=${() => (this._zonePanelDragOverKey = null)}
                              @drop=${(e: DragEvent) => this._onZonePanelBulkReorder(e, slotIdx)}
                            >
                              <span
                                class="depth-slot-delete"
                                title="${this._t("ui.card.deleteThisSlot")}"
                                @click=${(e: Event) => { e.stopPropagation(); this._deleteZoneSlot(slotIdx); }}
                              >✕</span>
                              <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotIdx + 1 })}</div>
                              ${wine
                                ? html`
                                    <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                      <div class="depth-slot-avatar">
                                        ${wine.image_url
                                          ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                          : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                        ${this._dispositionBadge(dispClass, disp)}
                                      </div>
                                      <div class="depth-slot-info">
                                        <div class="depth-slot-name">${wine.name}</div>
                                        <div class="depth-slot-meta">
                                          ${wine.vintage || "NV"}
                                          ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                          ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                        </div>
                                      </div>
                                    </div>
                                  `
                                : html`
                                    <div class="depth-slot-empty">
                                      <span class="depth-slot-plus">+</span>
                                      <span>${this._t("ui.common.empty")}</span>
                                    </div>
                                  `}
                            </div>
                          `;
                        })}
                        <div class="depth-panel-grow" @click=${this._addBulkSlot}>
                          <span class="depth-slot-plus">+</span> ${this._t("ui.card.addSlot")}
                        </div>
                      `
                    : this._zonePanelType === "shelf"
                    ? html`
                        <!-- Shelf mode: slots grouped by (level, lane) — front/back per board -->
                        ${getShelfSlotGroups(this._zonePanelStorageRow?.shelf_levels).map((group: ShelfSlotGroup) => html`
                          <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${(group.level > 0 || group.lane === "back") ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                            ${this._t("ui.card.shelfGroupHeader", {
                              n: group.level + 1,
                              lane: group.lane === "front" ? this._t("ui.card.shelfFront") : this._t("ui.card.shelfBack"),
                            })}
                          </div>
                          ${Array.from({ length: group.size }, (_, slotInGroup) => {
                            const depthIdx = group.start + slotInGroup;
                            const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                            const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                            const disp = wine?.disposition || "";
                            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                            const dragKey = `shelf-${depthIdx}`;
                            const highlighted = wine?.id === this._highlightWineId;
                            return html`
                              <div
                                id=${highlighted ? "highlight-slot" : nothing}
                                class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                draggable=${wine ? "true" : "false"}
                                @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                @dragstart=${wine ? (e: DragEvent) => this._onZonePanelDragStart(e, wine) : nothing}
                                @dragend=${wine ? () => this._onZonePanelDragEnd() : nothing}
                                @dragover=${(e: DragEvent) => this._onZonePanelDragOver(e, dragKey)}
                                @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                @drop=${(e: DragEvent) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                              >
                                <span
                                  class="depth-slot-delete"
                                  title="${this._t("ui.card.deleteThisSlot")}"
                                  @click=${(e: Event) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                >✕</span>
                                <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                                ${wine
                                  ? html`
                                      <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                        <div class="depth-slot-avatar">
                                          ${wine.image_url
                                            ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                            : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                          ${this._dispositionBadge(dispClass, disp)}
                                        </div>
                                        <div class="depth-slot-info">
                                          <div class="depth-slot-name">${wine.name}</div>
                                          <div class="depth-slot-meta">
                                            ${wine.vintage || "NV"}
                                            ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                            ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                          </div>
                                        </div>
                                      </div>
                                    `
                                  : html`
                                      <div class="depth-slot-empty">
                                        <span class="depth-slot-plus">+</span>
                                        <span>${this._t("ui.common.empty")}</span>
                                      </div>
                                    `}
                              </div>
                            `;
                          })}
                        `)}
                      `
                    : this._zonePanelType === "stepped"
                    ? html`
                        <!-- Compressor-shelf mode: slots grouped by row, bottom to top -->
                        ${getSteppedSlotGroups(this._zonePanelStorageRow?.stepped_levels).map((group: SteppedSlotGroup) => html`
                          <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${group.level > 0 ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                            ${this._t("ui.card.steppedGroupHeader", { n: group.level + 1 })}
                          </div>
                          ${Array.from({ length: group.size }, (_, slotInGroup) => {
                            const depthIdx = group.start + slotInGroup;
                            const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                            const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                            const disp = wine?.disposition || "";
                            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                            const dragKey = `stepped-${depthIdx}`;
                            const highlighted = wine?.id === this._highlightWineId;
                            return html`
                              <div
                                id=${highlighted ? "highlight-slot" : nothing}
                                class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                draggable=${wine ? "true" : "false"}
                                @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                @dragstart=${wine ? (e: DragEvent) => this._onZonePanelDragStart(e, wine) : nothing}
                                @dragend=${wine ? () => this._onZonePanelDragEnd() : nothing}
                                @dragover=${(e: DragEvent) => this._onZonePanelDragOver(e, dragKey)}
                                @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                @drop=${(e: DragEvent) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                              >
                                <span
                                  class="depth-slot-delete"
                                  title="${this._t("ui.card.deleteThisSlot")}"
                                  @click=${(e: Event) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                >✕</span>
                                <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                                ${wine
                                  ? html`
                                      <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                        <div class="depth-slot-avatar">
                                          ${wine.image_url
                                            ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                            : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                          ${this._dispositionBadge(dispClass, disp)}
                                        </div>
                                        <div class="depth-slot-info">
                                          <div class="depth-slot-name">${wine.name}</div>
                                          <div class="depth-slot-meta">
                                            ${wine.vintage || "NV"}
                                            ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                            ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                          </div>
                                        </div>
                                      </div>
                                    `
                                  : html`
                                      <div class="depth-slot-empty">
                                        <span class="depth-slot-plus">+</span>
                                        <span>${this._t("ui.common.empty")}</span>
                                      </div>
                                    `}
                              </div>
                            `;
                          })}
                        `)}
                      `
                    : html`
                        <!-- Box mode: slots grouped by box -->
                        ${(() => {
                          const boxes = this._zonePanelStorageRow?.boxes || [this._zonePanelCapacity];
                          let offset = 0;
                          return boxes.map((boxSize: number, bi: number) => {
                            const start = offset;
                            offset += boxSize;
                            return html`
                              ${boxes.length > 1
                                ? html`<div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${bi > 0 ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                                    ${this._t("ui.card.boxHeader", { n: bi + 1, size: boxSize })}
                                  </div>`
                                : nothing}
                              ${Array.from({ length: boxSize }, (_, slotInBox) => {
                                const depthIdx = start + slotInBox;
                                const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                                const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                                const disp = wine?.disposition || "";
                                const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                                const dragKey = `box-${depthIdx}`;
                                const highlighted = wine?.id === this._highlightWineId;
                                return html`
                                  <div
                                    id=${highlighted ? "highlight-slot" : nothing}
                                    class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                    draggable=${wine ? "true" : "false"}
                                    @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                    @dragstart=${wine ? (e: DragEvent) => this._onZonePanelDragStart(e, wine) : nothing}
                                    @dragend=${wine ? () => this._onZonePanelDragEnd() : nothing}
                                    @dragover=${(e: DragEvent) => this._onZonePanelDragOver(e, dragKey)}
                                    @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                    @drop=${(e: DragEvent) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                                  >
                                    <span
                                      class="depth-slot-delete"
                                      title="${this._t("ui.card.deleteThisSlot")}"
                                      @click=${(e: Event) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                    >✕</span>
                                    <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInBox + 1 })}</div>
                                    ${wine
                                      ? html`
                                          <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                            <div class="depth-slot-avatar">
                                              ${wine.image_url
                                                ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                                : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                              ${this._dispositionBadge(dispClass, disp)}
                                            </div>
                                            <div class="depth-slot-info">
                                              <div class="depth-slot-name">${wine.name}</div>
                                              <div class="depth-slot-meta">
                                                ${wine.vintage || "NV"}
                                                ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                                ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                              </div>
                                            </div>
                                          </div>
                                        `
                                      : html`
                                          <div class="depth-slot-empty">
                                            <span class="depth-slot-plus">+</span>
                                            <span>${this._t("ui.common.empty")}</span>
                                          </div>
                                        `}
                                  </div>
                                `;
                              })}
                            `;
                          });
                        })()}
                        <div class="depth-panel-add-box">
                          <select
                            .value=${String(this._zonePanelNewBoxSize)}
                            @change=${(e: Event) => (this._zonePanelNewBoxSize = parseInt((e.target as HTMLSelectElement).value, 10))}
                          >
                            ${BOX_SIZES.map((s) => html`<option value=${s} ?selected=${s === this._zonePanelNewBoxSize}>${s}-pk</option>`)}
                          </select>
                          <div class="depth-panel-grow" @click=${this._addBoxSlot}>
                            <span class="depth-slot-plus">+</span> ${this._t("ui.card.addBox")}
                          </div>
                        </div>
                      `}
                </div>
              </div>
            `
          : nothing}

        <!-- Rack Panel (grid-slot cabinets: list + reorder), harmonized with Bulk/Box -->
        ${this._rackPanelOpen
          ? html`
              <div class="depth-panel-backdrop ${this._rackPanelDragWineId ? "drag-through" : ""}" @click=${this._closeRackPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._rackPanelCabinet?.name}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.rackPanelBottlesCount", { n: this._rackPanelWines.length, max: this._getRackSlots().length })}
                    </span>
                  </span>
                  <button class="depth-panel-close" @click=${this._closeRackPanel}>✕</button>
                </div>
                <div class="depth-panel-slots">
                  ${this._getRackSlots().map(({ row, col }, slotIdx) => {
                    const wines = this._rackPanelWines.filter((w) => w.row === row && w.col === col);
                    const wine = wines.length > 0 ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0] : undefined;
                    const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                    const disp = wine?.disposition || "";
                    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                    const dragKey = `rack-${row}-${col}`;
                    const highlighted = wines.some((w) => w.id === this._highlightWineId);
                    return html`
                      <div
                        id=${highlighted ? "highlight-slot" : nothing}
                        class="depth-slot ${wine ? "filled" : "empty"} ${this._rackPanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                        draggable=${wine ? "true" : "false"}
                        @click=${() => this._onRackPanelSlotClick(row, col, wine)}
                        @dragstart=${wine ? (e: DragEvent) => this._onRackPanelDragStart(e, wine) : nothing}
                        @dragend=${wine ? () => this._onRackPanelDragEnd() : nothing}
                        @dragover=${(e: DragEvent) => this._onRackPanelDragOver(e, dragKey)}
                        @dragleave=${() => (this._rackPanelDragOverKey = null)}
                        @drop=${(e: DragEvent) => this._onRackPanelReorder(e, row, col, wine)}
                      >
                        ${this._isLastRackSlot(row, col)
                          ? html`
                              <span
                                class="depth-slot-delete"
                                title="${this._t("ui.card.deleteThisSlot")}"
                                @click=${(e: Event) => { e.stopPropagation(); this._deleteRackSlot(row, col); }}
                              >✕</span>
                            `
                          : nothing}
                        <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotIdx + 1 })}</div>
                        ${wine
                          ? html`
                              <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                <div class="depth-slot-avatar">
                                  ${wine.image_url
                                    ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                    : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                  ${this._dispositionBadge(dispClass, disp)}
                                </div>
                                <div class="depth-slot-info">
                                  <div class="depth-slot-name">${wine.name}</div>
                                  <div class="depth-slot-meta">
                                    ${wine.vintage || "NV"}
                                    ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                    ${wines.length > 1 ? html` · ${this._t("ui.card.deepSuffix", { n: wines.length })}` : nothing}
                                  </div>
                                </div>
                              </div>
                            `
                          : html`
                              <div class="depth-slot-empty">
                                <span class="depth-slot-plus">+</span>
                                <span>${this._t("ui.common.empty")}</span>
                              </div>
                            `}
                      </div>
                    `;
                  })}
                  <div class="depth-panel-grow" @click=${this._addRackSlot}>
                    <span class="depth-slot-plus">+</span> ${this._t("ui.card.addSlot")}
                  </div>
                </div>
              </div>
            `
          : nothing}

        <!-- Shelf Panel (shelf-style cabinets: every board/lane, list + reorder) -->
        ${this._shelfPanelOpen
          ? html`
              <div class="depth-panel-backdrop ${this._shelfPanelDragWineId ? "drag-through" : ""}" @click=${this._closeShelfPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._shelfPanelCabinet?.name}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.rackPanelBottlesCount", {
                        n: this._shelfPanelWines.length,
                        max: this._getShelfPanelRows().reduce((sum, sr) => sum + (sr.capacity || 0), 0),
                      })}
                    </span>
                  </span>
                  <button class="depth-panel-close" @click=${this._closeShelfPanel}>✕</button>
                </div>
                <div class="depth-panel-slots">
                  ${this._getShelfPanelRows().map((sr) => {
                    const zone = `storage-${sr.row}`;
                    const groups = getShelfSlotGroups(sr.shelf_levels);
                    return html`
                      ${this._getShelfPanelRows().length > 1
                        ? html`<div style="font-size:0.8em;font-weight:700;color:var(--wc-text-secondary);padding:8px 0 2px;">
                            ${sr.name || this._t("wineLocation.storage")}
                          </div>`
                        : nothing}
                      ${groups.map((group: ShelfSlotGroup) => html`
                        <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${(group.level > 0 || group.lane === "back") ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                          ${this._t("ui.card.shelfGroupHeader", {
                            n: group.level + 1,
                            lane: group.lane === "front" ? this._t("ui.card.shelfFront") : this._t("ui.card.shelfBack"),
                          })}
                        </div>
                        ${Array.from({ length: group.size }, (_, slotInGroup) => {
                          const depthIdx = group.start + slotInGroup;
                          const wine = this._shelfPanelWines.find((w) => w.zone === zone && (w.depth || 0) === depthIdx);
                          const typeColor = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
                          const disp = wine?.disposition || "";
                          const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                          const dragKey = `${zone}-${depthIdx}`;
                          const highlighted = wine?.id === this._highlightWineId;
                          return html`
                            <div
                              id=${highlighted ? "highlight-slot" : nothing}
                              class="depth-slot ${wine ? "filled" : "empty"} ${this._shelfPanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                              draggable=${wine ? "true" : "false"}
                              @click=${() => this._onShelfPanelSlotClick(zone, depthIdx, wine)}
                              @dragstart=${wine ? (e: DragEvent) => this._onShelfPanelDragStart(e, wine) : nothing}
                              @dragend=${wine ? () => this._onShelfPanelDragEnd() : nothing}
                              @dragover=${(e: DragEvent) => this._onShelfPanelDragOver(e, dragKey)}
                              @dragleave=${() => (this._shelfPanelDragOverKey = null)}
                              @drop=${(e: DragEvent) => this._onShelfPanelDrop(e, zone, depthIdx, wine)}
                            >
                              <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                              ${wine
                                ? html`
                                    <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                      <div class="depth-slot-avatar">
                                        ${wine.image_url
                                          ? html`<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                          : html`<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                        ${this._dispositionBadge(dispClass, disp)}
                                      </div>
                                      <div class="depth-slot-info">
                                        <div class="depth-slot-name">${wine.name}</div>
                                        <div class="depth-slot-meta">
                                          ${wine.vintage || "NV"}
                                          ${wine.rating ? html` · ★${wine.rating}` : nothing}
                                          ${wine.price ? html` · ${this._metadataCurrency} ${wine.price}` : nothing}
                                        </div>
                                      </div>
                                    </div>
                                  `
                                : html`
                                    <div class="depth-slot-empty">
                                      <span class="depth-slot-plus">+</span>
                                      <span>${this._t("ui.common.empty")}</span>
                                    </div>
                                  `}
                            </div>
                          `;
                        })}
                      `)}
                    `;
                  })}
                </div>
              </div>
            `
          : nothing}

        <!-- Toast -->
        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>
    `;
  }

  getCardSize() {
    return 6;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "wine-cellar-card",
  name: "Cork Dork",
  description: "Track your wine collection with visual cabinet layout",
  preview: true,
});
