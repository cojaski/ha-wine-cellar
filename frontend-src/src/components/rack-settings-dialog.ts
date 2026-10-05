import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Cabinet, Wine, StorageRow, getStorageRowTypeLabels, BOX_SIZES, getSteppedLevels } from "../models";
import { sharedStyles, touchStyles } from "../styles";
import { t } from "../i18n";

type Mode = "list" | "add" | "edit" | "delete-confirm";
type RackStyle = "grid" | "shelf" | "bulk" | "box" | "stepped";
type SecondarySlot = "primary" | "secondary";
type SecondaryPosition = "above" | "below";

@customElement("rack-settings-dialog")
export class RackSettingsDialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) cabinets: Cabinet[] = [];
  @property({ attribute: false }) wines: Wine[] = [];

  @state() private _mode: Mode = "list";
  @state() private _editCabinet: Partial<Cabinet> = {};
  // Primary and secondary each keep their own working list of storage rows
  // — so e.g. two bulk bins, one above and one below, can be configured
  // independently without one overwriting the other. A style's rows persist
  // here even while a different style is active for that slot, purely so
  // flipping back and forth while exploring doesn't lose work; only the
  // active style's rows for each slot are ever rendered or saved (see
  // _finalStorageRows).
  @state() private _primaryStorageRows: StorageRow[] = [];
  @state() private _secondaryStorageRows: StorageRow[] = [];
  // The rack's main style, chosen right under the name. Inferred from the
  // data when editing (see _startEdit); an explicit choice when adding.
  @state() private _primaryStyle: RackStyle = "grid";
  // An optional second zone stacked above or below the primary one —
  // "none" means no secondary zone is attached.
  @state() private _secondaryStyle: RackStyle | "none" = "none";
  @state() private _secondaryPosition: SecondaryPosition = "below";
  // Row count for a "grid" secondary specifically — a secondary grid block
  // has no StorageRow entry of its own (plain grid rows are never stored),
  // so unlike the other styles its row count needs its own field. It shares
  // the cabinet's own cols/depth (see _finalCols/_finalDepth) since a rack
  // never has more than one grid-shaped section.
  @state() private _secondaryGridRows = 1;
  @state() private _deleteCabinet: Cabinet | null = null;
  @state() private _loading = false;
  @state() private _error = "";

  static styles = [
    sharedStyles,
    css`
      .rack-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .rack-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        transition: background 0.2s;
      }

      .rack-item:hover {
        background: var(--wc-hover);
      }

      .rack-info {
        flex: 1;
        min-width: 0;
      }

      .rack-name {
        font-weight: 600;
        font-size: 0.95em;
      }

      .rack-meta {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .rack-actions {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-shrink: 0;
      }

      .small-btn {
        background: transparent;
        border: 1px solid var(--wc-border);
        border-radius: 6px;
        cursor: pointer;
        padding: 4px 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        transition: all 0.2s;
      }

      .small-btn:hover {
        background: var(--wc-hover);
      }

      .small-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .small-btn.danger {
        color: #c62828;
        border-color: rgba(198, 40, 40, 0.3);
      }

      .small-btn.danger:hover {
        background: rgba(198, 40, 40, 0.08);
      }

      .warning-msg {
        background: rgba(255, 152, 0, 0.1);
        border: 1px solid rgba(255, 152, 0, 0.3);
        border-radius: 8px;
        padding: 10px;
        font-size: 0.85em;
        color: #e65100;
        margin-top: 12px;
      }

      .warning-list {
        margin-top: 6px;
        padding-left: 10px;
        font-size: 0.95em;
        opacity: 0.85;
      }

      .delete-info {
        font-size: 0.95em;
        margin: 12px 0;
        line-height: 1.5;
      }

      .delete-count {
        color: #c62828;
        font-weight: 600;
      }

      .style-toggle {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .style-toggle-btn {
        flex: 1 1 45%;
        padding: 8px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.85em;
        transition: all 0.15s;
      }

      .style-toggle-btn.active {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.08);
        font-weight: 600;
      }

      .add-rack-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px;
        border: 2px dashed var(--wc-border);
        border-radius: 10px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.2s;
        width: 100%;
      }

      .add-rack-btn:hover {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      /* Grid editor */
      .grid-editor {
        margin-top: 12px;
      }

      .grid-editor-title {
        font-size: 0.85em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 12px;
      }

      /* Stepper controls for cols/depth */
      .stepper-row {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
      }

      .stepper {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        overflow: hidden;
      }

      .stepper-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .stepper-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .stepper-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.1em;
        font-weight: 600;
        color: var(--wc-text-secondary);
        transition: all 0.15s;
        flex-shrink: 0;
      }

      .stepper-btn:hover:not(:disabled) {
        background: rgba(114, 47, 55, 0.1);
        color: var(--wc-primary);
      }

      .stepper-btn:disabled {
        opacity: 0.25;
        cursor: default;
      }

      .stepper-value {
        flex: 1;
        text-align: center;
        font-size: 0.9em;
        font-weight: 600;
        color: var(--wc-text);
        padding: 6px 0;
        min-width: 40px;
      }

      /* Visual grid preview */
      .grid-preview {
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 8px;
        overflow-x: auto;
      }

      .grid-preview-row {
        display: flex;
        gap: 3px;
        margin-bottom: 3px;
        align-items: center;
      }

      .grid-preview-row:last-child {
        margin-bottom: 0;
      }

      .grid-preview-label {
        width: 28px;
        font-size: 0.65em;
        font-weight: 600;
        color: var(--wc-text-secondary);
        text-align: center;
        flex-shrink: 0;
      }

      .grid-preview-cell {
        width: 20px;
        height: 16px;
        border-radius: 3px;
        background: rgba(114, 47, 55, 0.15);
        border: 1px solid rgba(114, 47, 55, 0.25);
        flex-shrink: 0;
      }

      .grid-preview-row.storage .grid-preview-cell {
        background: rgba(139, 105, 20, 0.15);
        border-color: rgba(139, 105, 20, 0.3);
      }

      .grid-preview-storage-label {
        font-size: 0.6em;
        color: #8b6914;
        font-weight: 600;
        white-space: nowrap;
        padding-left: 4px;
      }

      .grid-preview-row.storage .grid-preview-cell {
        width: unset;
        flex: 1;
        max-width: none;
      }

      /* Row list */
      .row-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        padding: 6px;
      }

      .row-entry {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 6px;
        border-radius: 6px;
        font-size: 0.8em;
        transition: background 0.15s;
      }

      .row-entry:hover {
        background: var(--wc-hover);
      }

      .row-entry.storage {
        background: rgba(139, 105, 20, 0.1);
        border: 1px solid rgba(139, 105, 20, 0.3);
      }

      .row-entry .row-num {
        width: 28px;
        font-weight: 600;
        color: var(--wc-text-secondary);
        font-size: 0.85em;
      }

      .row-type-select {
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .row-name-input {
        width: 80px;
        padding: 2px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-bg);
        color: var(--wc-text);
        flex-shrink: 1;
        min-width: 60px;
      }

      .row-cap-select {
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .sensor-picker-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin: 4px 0 8px;
      }

      .sensor-picker-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .sensor-select {
        max-width: 220px;
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.85em;
        background: var(--wc-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .row-shelf-input {
        width: 32px;
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-bg);
        color: var(--wc-text);
        text-align: center;
      }

      .row-cap-stepper {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .stepper-btn-sm {
        width: 20px;
        height: 20px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        background: var(--wc-bg);
        color: var(--wc-text);
        cursor: pointer;
        font-size: 0.8em;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .stepper-btn-sm:hover {
        background: var(--wc-hover);
      }

      .stepper-val-sm {
        font-size: 0.8em;
        font-weight: 600;
        min-width: 22px;
        text-align: center;
      }

      .row-type-info {
        flex: 1;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .row-entry input[type="text"] {
        width: 100px;
        padding: 2px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.85em;
        background: var(--wc-bg);
        color: var(--wc-text);
      }

      .row-controls {
        display: flex;
        gap: 6px;
        margin-top: 6px;
      }

      .row-ctrl-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 0;
        border: 1px dashed var(--wc-border);
        border-radius: 6px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.8em;
        transition: all 0.15s;
      }

      .row-ctrl-btn:hover:not(:disabled) {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      .row-ctrl-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .row-ctrl-btn.danger:hover:not(:disabled) {
        border-color: #c62828;
        color: #c62828;
        background: rgba(198, 40, 40, 0.05);
      }
    `,
    touchStyles,
  ];

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("open") && this.open) {
      this._mode = "list";
      this._error = "";
    }
  }

  private _close() {
    this._mode = "list";
    this._error = "";
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _notifyUpdate() {
    this.dispatchEvent(
      new CustomEvent("racks-updated", { bubbles: true, composed: true })
    );
  }

  private _winesInCabinet(cabinetId: string): number {
    return this.wines.filter((w) => w.cabinet_id === cabinetId).length;
  }

  // --- Per-slot row access ---
  // Each slot (primary/secondary) keeps its own list of rows; a style only
  // ever has rows of its own type in a slot's list (see the setters below),
  // so filtering by type is enough to find "the" row for styles that use
  // just one (bulk/box/stepped) or several (shelf).
  private _rowsFor(slot: SecondarySlot): StorageRow[] {
    return slot === "primary" ? this._primaryStorageRows : this._secondaryStorageRows;
  }

  private _setRowsFor(slot: SecondarySlot, rows: StorageRow[]) {
    if (slot === "primary") this._primaryStorageRows = rows;
    else this._secondaryStorageRows = rows;
  }

  // --- Sensor pickers (temp/humidity) ---
  // Plain <select> rather than HA's own <ha-entity-picker>: that element's
  // API has shifted across HA versions, and it doesn't exist at all in this
  // project's standalone Lovelace-less preview page — a native <select>
  // works identically everywhere and needs nothing beyond hass.states.
  private _sensorEntityIds(deviceClass: "temperature" | "humidity"): string[] {
    const states = this.hass?.states || {};
    return Object.keys(states)
      .filter(
        (id) => id.startsWith("sensor.") && states[id]?.attributes?.device_class === deviceClass
      )
      .sort((a, b) =>
        (states[a].attributes.friendly_name || a).localeCompare(
          states[b].attributes.friendly_name || b
        )
      );
  }

  private _renderSensorPickers(
    tempValue: string,
    humidityValue: string,
    onTemp: (value: string) => void,
    onHumidity: (value: string) => void
  ) {
    const states = this.hass?.states || {};
    const friendlyName = (id: string) => states[id]?.attributes?.friendly_name || id;
    const tempIds = this._sensorEntityIds("temperature");
    const humidityIds = this._sensorEntityIds("humidity");
    return html`
      <div class="sensor-picker-row">
        <div class="sensor-picker-wrap">
          <span>🌡️</span>
          <select
            class="sensor-select"
            @change=${(e: Event) => onTemp((e.target as HTMLSelectElement).value)}
          >
            <option value="" ?selected=${!tempValue}>${this._t("ui.rack.sensorNone")}</option>
            ${tempIds.map(
              (id) => html`<option value=${id} ?selected=${tempValue === id}>${friendlyName(id)}</option>`
            )}
          </select>
        </div>
        <div class="sensor-picker-wrap">
          <span>💧</span>
          <select
            class="sensor-select"
            @change=${(e: Event) => onHumidity((e.target as HTMLSelectElement).value)}
          >
            <option value="" ?selected=${!humidityValue}>${this._t("ui.rack.sensorNone")}</option>
            ${humidityIds.map(
              (id) => html`<option value=${id} ?selected=${humidityValue === id}>${friendlyName(id)}</option>`
            )}
          </select>
        </div>
      </div>
    `;
  }

  private _styleFor(slot: SecondarySlot): RackStyle | "none" {
    return slot === "primary" ? this._primaryStyle : this._secondaryStyle;
  }

  private _shelfRows(slot: SecondarySlot): StorageRow[] {
    return this._rowsFor(slot).filter((sr) => sr.type === "shelf");
  }

  private _bulkRow(slot: SecondarySlot): StorageRow | undefined {
    return this._rowsFor(slot).find((sr) => sr.type === "bulk");
  }

  private _boxRow(slot: SecondarySlot): StorageRow | undefined {
    return this._rowsFor(slot).find((sr) => sr.type === "box");
  }

  private _steppedRows(slot: SecondarySlot): StorageRow[] {
    return this._rowsFor(slot).filter((sr) => sr.type === "stepped");
  }

  // How many rows a slot's active style actually uses.
  private _slotRowCount(slot: SecondarySlot): number {
    const style = this._styleFor(slot);
    if (style === "none") return 0;
    if (style === "grid") return slot === "primary" ? (this._editCabinet.rows || 1) : this._secondaryGridRows;
    if (style === "shelf") return Math.max(1, this._shelfRows(slot).length);
    if (style === "stepped") return Math.max(1, this._steppedRows(slot).length);
    return 1; // bulk, box
  }

  // A slot's own rows, renumbered to a contiguous range starting at
  // `offset` — the physical row a bottle sits behind never survives a rack
  // being reshaped anyway (see _displacedWines), so the exact index only
  // needs to be internally consistent at save time.
  private _slotFinalRows(slot: SecondarySlot, offset: number): StorageRow[] {
    const style = this._styleFor(slot);
    if (style === "none" || style === "grid") return [];
    if (style === "shelf") {
      return this._shelfRows(slot).map((sr, i) => ({ ...sr, row: offset + i }));
    }
    if (style === "stepped") {
      return this._steppedRows(slot).map((sr, i) => ({ ...sr, row: offset + i }));
    }
    const row = style === "bulk" ? this._bulkRow(slot) : this._boxRow(slot);
    return row ? [{ ...row, row: offset }] : [];
  }

  // What actually gets saved, freshly computed from the active styles —
  // never a stale mix of whatever _primaryStorageRows/_secondaryStorageRows
  // happen to be holding from earlier style exploration. The secondary
  // zone, when present, sits either before the primary's own rows (row 0
  // upward, "above") or after them ("below") — see _secondaryPosition.
  private _finalStorageRows(): StorageRow[] {
    const hasSecondary = this._secondaryStyle !== "none";
    if (hasSecondary && this._secondaryPosition === "above") {
      const secondaryRows = this._slotFinalRows("secondary", 0);
      const primaryRows = this._slotFinalRows("primary", this._slotRowCount("secondary"));
      return [...secondaryRows, ...primaryRows];
    }
    const primaryRows = this._slotFinalRows("primary", 0);
    const secondaryRows = hasSecondary ? this._slotFinalRows("secondary", this._slotRowCount("primary")) : [];
    return [...primaryRows, ...secondaryRows];
  }

  private _finalRows(): number {
    return this._slotRowCount("primary") + this._slotRowCount("secondary");
  }

  private _finalCols(): number {
    return this._primaryStyle === "grid" || this._secondaryStyle === "grid" ? this._editCabinet.cols || 8 : 1;
  }

  private _finalDepth(): number {
    return this._primaryStyle === "grid" || this._secondaryStyle === "grid" ? (this._editCabinet as any).depth || 1 : 1;
  }

  private static _capacityOf(sr: StorageRow): number {
    if (sr.type === "box") return (sr.boxes || []).reduce((sum, b) => sum + b, 0);
    if (sr.type === "shelf") {
      return (sr.shelf_levels || []).reduce((sum, lvl) => sum + lvl.front + lvl.back, 0);
    }
    if (sr.type === "stepped") {
      return (sr.stepped_levels || []).reduce((sum, n) => sum + n, 0);
    }
    return sr.capacity || 0;
  }

  // Every bottle the pending edit would leave without a slot that exists.
  //
  // The warning and the save both read this, so what the user is promised
  // and what actually happens cannot drift apart. It used to consider only
  // rows and columns, which meant three ways of losing a bottle's position
  // went unwarned and unhandled: making a rack shallower, shrinking a bin
  // past its contents, and deleting a bin outright. None of them ever
  // deleted a bottle — they left it pointing at a slot the rack no longer
  // had, counted in the total and drawn nowhere.
  private _displacedWines(): Wine[] {
    const cabinetId = this._editCabinet.id;
    if (!cabinetId) return [];
    const newRows = this._finalRows();
    const newCols = this._finalCols();
    const newDepth = this._finalDepth();
    const rows = this._finalStorageRows();

    return this.wines.filter((w) => {
      if (w.cabinet_id !== cabinetId) return false;
      if (w.zone) {
        const sr = rows.find((s) => `storage-${s.row}` === w.zone);
        if (!sr) return true;
        return (w.depth || 0) >= RackSettingsDialog._capacityOf(sr);
      }
      if (w.row == null || w.col == null) return false;
      if (w.row >= newRows || w.col >= newCols) return true;
      if ((w.depth || 0) >= newDepth) return true;
      return rows.some((sr) => sr.row === w.row);
    });
  }

  private _startAdd() {
    this._mode = "add";
    this._error = "";
    this._editCabinet = {
      name: "",
      rows: 1,
      cols: 8,
      depth: 1,
      has_bottom_zone: false,
      bottom_zone_name: "",
    };
    this._primaryStorageRows = [];
    this._secondaryStorageRows = [];
    this._primaryStyle = "grid";
    this._secondaryStyle = "none";
    this._secondaryPosition = "below";
    this._secondaryGridRows = 1;
  }

  // Re-derives (primary style, secondary style + position) from a saved
  // cabinet's row layout. Plain grid rows have no storage_rows entry of
  // their own, so they show up here as a gap between (or around) the typed
  // rows; grouping the whole row range into contiguous same-type runs
  // (treating each gap as its own "grid" run) recovers at most two runs for
  // anything this dialog itself could have saved. Older cabinets that
  // predate the secondary-zone feature are always a single run and fall
  // straight into the "no secondary" branch below, same as before.
  private _startEdit(cabinet: Cabinet) {
    this._mode = "edit";
    this._error = "";
    this._editCabinet = { ...cabinet };

    const totalRows = cabinet.rows || 0;
    const storageRows = (cabinet.storage_rows || [])
      .map((sr) => {
        if (sr.type === "box" && !sr.boxes) return { ...sr, boxes: [sr.capacity || 12] };
        if (sr.type === "shelf" && !sr.shelf_levels) return { ...sr, shelf_levels: [{ front: sr.capacity || 4, back: 0 }] };
        if (sr.type === "stepped" && !sr.stepped_levels) return { ...sr, stepped_levels: getSteppedLevels(sr.capacity || 5, 3) };
        return { ...sr };
      })
      .sort((a, b) => a.row - b.row);
    const byRow = new Map(storageRows.map((sr) => [sr.row, sr]));

    interface Cluster { style: RackStyle; rows: StorageRow[]; start: number; size: number }
    const clusters: Cluster[] = [];
    let cursor = 0;
    while (cursor < totalRows) {
      const start = cursor;
      const sr = byRow.get(cursor);
      if (!sr) {
        while (cursor < totalRows && !byRow.has(cursor)) cursor++;
        clusters.push({ style: "grid", rows: [], start, size: cursor - start });
      } else {
        const type = sr.type as RackStyle;
        const rows: StorageRow[] = [];
        while (cursor < totalRows && byRow.get(cursor)?.type === type) {
          rows.push(byRow.get(cursor)!);
          cursor++;
        }
        clusters.push({ style: type, rows, start, size: cursor - start });
      }
    }

    const applySlot = (slot: SecondarySlot, cluster: Cluster | undefined) => {
      if (!cluster) {
        if (slot === "primary") { this._primaryStyle = "grid"; this._primaryStorageRows = []; }
        else { this._secondaryStyle = "none"; this._secondaryStorageRows = []; }
        return;
      }
      const rows = cluster.rows.map((sr, i) => ({ ...sr, row: i }));
      if (slot === "primary") {
        this._primaryStyle = cluster.style;
        this._primaryStorageRows = rows;
      } else {
        this._secondaryStyle = cluster.style;
        this._secondaryStorageRows = rows;
        this._secondaryGridRows = cluster.style === "grid" ? Math.max(1, cluster.size) : 1;
      }
    };

    if (clusters.length <= 1) {
      applySlot("primary", clusters[0]);
      applySlot("secondary", undefined);
      this._secondaryPosition = "below";
    } else if (clusters.length === 2) {
      // Clusters are built by scanning rows from 0 upward, so `first` is
      // always the physically higher one. The bigger cluster (by row count)
      // reads as "primary"; on a tie, the one on top does — purely a
      // labeling choice for this dialog, since the rack itself renders and
      // behaves identically either way.
      const [first, second] = clusters;
      const primaryIsFirst = first.size >= second.size;
      applySlot("primary", primaryIsFirst ? first : second);
      applySlot("secondary", primaryIsFirst ? second : first);
      this._secondaryPosition = primaryIsFirst ? "below" : "above";
    } else {
      // 3+ runs: an arrangement this dialog can't represent as primary plus
      // one secondary (e.g. an older, more intricate mixed rack). Fall back
      // to showing it as a classic grid rather than guessing; nothing is
      // deleted — its storage rows are only dropped if the user actually
      // saves from this fallback.
      this._primaryStyle = "grid";
      this._primaryStorageRows = [];
      this._secondaryStyle = "none";
      this._secondaryStorageRows = [];
      this._secondaryPosition = "below";
    }
  }

  private static _buildAlternatingLevels(
    front: number, back: number, count: number
  ): { front: number; back: number }[] {
    const f = Math.max(0, front);
    const b = Math.max(0, back);
    return Array.from({ length: Math.max(1, count) }, (_, i) =>
      i % 2 === 0 ? { front: f, back: b } : { front: b, back: f }
    );
  }

  // Front/back are shared by every shelf within one slot; how many rows
  // each shelf has is that shelf's own choice (a fridge shelf can be one
  // board or two stacked ones) — read the shared pair from the first
  // shelf, since _applySharedFrontBack keeps it in lockstep across all of
  // them.
  private _sharedShelfFrontBack(slot: SecondarySlot): { front: number; back: number } {
    const lvl0 = this._shelfRows(slot)[0]?.shelf_levels?.[0];
    return { front: lvl0?.front ?? 4, back: lvl0?.back ?? 0 };
  }

  // Re-derives every shelf's levels in this slot from a new shared
  // front/back, keeping each shelf's own level count exactly as it was.
  private _applySharedFrontBack(slot: SecondarySlot, front: number, back: number) {
    const f = Math.max(0, front);
    const b = Math.max(0, back);
    this._setRowsFor(slot, this._rowsFor(slot).map((sr) => {
      if (sr.type !== "shelf") return sr;
      const levels = RackSettingsDialog._buildAlternatingLevels(f, b, sr.shelf_levels?.length || 1);
      const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
      return { ...sr, shelf_levels: levels, capacity };
    }));
  }

  private _setSharedFront(slot: SecondarySlot, value: number) {
    this._applySharedFrontBack(slot, value, this._sharedShelfFrontBack(slot).back);
  }

  private _setSharedBack(slot: SecondarySlot, value: number) {
    this._applySharedFrontBack(slot, this._sharedShelfFrontBack(slot).front, value);
  }

  // Changes just this one shelf's row count, using the shared front/back.
  private _setShelfLevelCountAt(slot: SecondarySlot, index: number, count: number) {
    count = Math.max(1, Math.min(6, count));
    const { front, back } = this._sharedShelfFrontBack(slot);
    const rows = this._shelfRows(slot);
    if (!rows[index]) return;
    const levels = RackSettingsDialog._buildAlternatingLevels(front, back, count);
    const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
    rows[index] = { ...rows[index], shelf_levels: levels, capacity };
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
  }

  // Rebuilds the shelf list to the requested count, applying the shared
  // front/back to any new ones (starting at 1 row each — a second row is
  // an explicit per-shelf choice, not assumed) and keeping existing
  // shelves' own name and row count (by position) rather than resetting
  // them.
  private _setShelfCount(slot: SecondarySlot, count: number) {
    count = Math.max(1, Math.min(20, count));
    const { front, back } = this._sharedShelfFrontBack(slot);
    const existing = this._shelfRows(slot);
    const rows: StorageRow[] = Array.from({ length: count }, (_, i) => {
      const prior = existing[i];
      const levels = RackSettingsDialog._buildAlternatingLevels(front, back, prior?.shelf_levels?.length || 1);
      const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
      return { row: i, name: prior?.name || "", type: "shelf", capacity, shelf_levels: levels };
    });
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
  }

  private _updateShelfName(slot: SecondarySlot, index: number, name: string) {
    const rows = this._shelfRows(slot).map((sr, i) => (i === index ? { ...sr, name } : sr));
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
  }

  private _setBulkCapacity(slot: SecondarySlot, capacity: number) {
    capacity = Math.max(1, Math.min(500, capacity));
    const row: StorageRow = { row: 0, name: this._bulkRow(slot)?.name || "", type: "bulk", capacity };
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "bulk"), row]);
  }

  private _updateBoxCount(slot: SecondarySlot, count: number) {
    const existing = this._boxRow(slot);
    const boxes = [...(existing?.boxes || [12])];
    while (boxes.length < count) boxes.push(12);
    while (boxes.length > count) boxes.pop();
    const capacity = boxes.reduce((sum, s) => sum + s, 0);
    const row: StorageRow = { row: 0, name: existing?.name || "", type: "box", capacity, boxes };
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "box"), row]);
  }

  private _updateBoxSize(slot: SecondarySlot, boxIndex: number, size: number) {
    const existing = this._boxRow(slot);
    const boxes = [...(existing?.boxes || [12])];
    boxes[boxIndex] = size;
    const capacity = boxes.reduce((sum, s) => sum + s, 0);
    const row: StorageRow = { row: 0, name: existing?.name || "", type: "box", capacity, boxes };
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "box"), row]);
  }

  // Quinconce, like a shelf, can be several independent units stacked in
  // one rack — each its own physical zone with its own row count, but all
  // sharing one bottom-row bottle count (a property of the rack's fixed
  // width, not of any one unit). The per-level breakdown is always derived
  // via getSteppedLevels rather than edited directly.
  private _sharedSteppedFirstRow(slot: SecondarySlot): number {
    return this._steppedRows(slot)[0]?.stepped_levels?.[0] ?? 5;
  }

  // Re-derives every quinconce unit's levels in this slot from a new shared
  // first-row count, keeping each unit's own row count exactly as it was.
  private _applySharedSteppedFirstRow(slot: SecondarySlot, firstRow: number) {
    const first = Math.max(1, Math.min(30, firstRow));
    this._setRowsFor(slot, this._rowsFor(slot).map((sr) => {
      if (sr.type !== "stepped") return sr;
      const levels = getSteppedLevels(first, sr.stepped_levels?.length || 1);
      const capacity = levels.reduce((sum, n) => sum + n, 0);
      return { ...sr, stepped_levels: levels, capacity };
    }));
  }

  // Changes just this one quinconce unit's row count, using the shared
  // first-row count.
  private _setSteppedRowCountAt(slot: SecondarySlot, index: number, rowCount: number) {
    rowCount = Math.max(1, Math.min(10, rowCount));
    const firstRow = this._sharedSteppedFirstRow(slot);
    const rows = this._steppedRows(slot);
    if (!rows[index]) return;
    const levels = getSteppedLevels(firstRow, rowCount);
    const capacity = levels.reduce((sum, n) => sum + n, 0);
    rows[index] = { ...rows[index], stepped_levels: levels, capacity };
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
  }

  // Rebuilds the quinconce list to the requested count, applying the shared
  // first-row count to any new ones (starting at 3 rows each) and keeping
  // existing units' own name and row count (by position) rather than
  // resetting them.
  private _setSteppedCount(slot: SecondarySlot, count: number) {
    count = Math.max(1, Math.min(20, count));
    const firstRow = this._sharedSteppedFirstRow(slot);
    const existing = this._steppedRows(slot);
    const rows: StorageRow[] = Array.from({ length: count }, (_, i) => {
      const prior = existing[i];
      const levels = getSteppedLevels(firstRow, prior?.stepped_levels?.length || 3);
      const capacity = levels.reduce((sum, n) => sum + n, 0);
      return { row: i, name: prior?.name || "", type: "stepped", capacity, stepped_levels: levels };
    });
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
  }

  private _updateSteppedName(slot: SecondarySlot, index: number, name: string) {
    const rows = this._steppedRows(slot).map((sr, i) => (i === index ? { ...sr, name } : sr));
    this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
  }

  // Switching a slot's style lazily creates that style's default config the
  // first time it's chosen; any other style's config already built this
  // session for that slot is left alone (see _rowsFor) so flipping back
  // doesn't lose it.
  private _lazyInitSlot(slot: SecondarySlot, style: RackStyle) {
    if (style === "shelf" && this._shelfRows(slot).length === 0) {
      this._setShelfCount(slot, 1);
    } else if (style === "bulk" && !this._bulkRow(slot)) {
      this._setBulkCapacity(slot, 20);
    } else if (style === "box" && !this._boxRow(slot)) {
      this._updateBoxCount(slot, 1);
    } else if (style === "stepped" && this._steppedRows(slot).length === 0) {
      this._setSteppedCount(slot, 1);
    }
  }

  private _setPrimaryStyle(style: RackStyle) {
    this._primaryStyle = style;
    this._lazyInitSlot("primary", style);
  }

  private _setSecondaryStyle(style: RackStyle | "none") {
    this._secondaryStyle = style;
    if (style !== "none") this._lazyInitSlot("secondary", style);
  }

  private _setSecondaryPosition(position: SecondaryPosition) {
    this._secondaryPosition = position;
  }

  private _setSecondaryGridRows(value: number) {
    this._secondaryGridRows = Math.max(1, Math.min(10, value));
  }

  private _startDelete(cabinet: Cabinet) {
    this._mode = "delete-confirm";
    this._error = "";
    this._deleteCabinet = cabinet;
  }

  // The primary grid's own row count — a secondary zone (grid or otherwise)
  // has its own row count tracked separately (see _secondaryGridRows /
  // _slotRowCount) and is never affected by these.
  private _addRow() {
    const current = this._editCabinet.rows || 1;
    if (current >= 20) return;
    this._editCabinet = { ...this._editCabinet, rows: current + 1 };
  }

  private _removeRow() {
    const current = this._editCabinet.rows || 1;
    if (current <= 1) return;
    this._editCabinet = { ...this._editCabinet, rows: current - 1 };
  }

  private _addCol() {
    const current = this._editCabinet.cols || 1;
    if (current >= 20) return;
    this._editCabinet = { ...this._editCabinet, cols: current + 1 };
  }

  private _removeCol() {
    const current = this._editCabinet.cols || 1;
    if (current <= 1) return;
    this._editCabinet = { ...this._editCabinet, cols: current - 1 };
  }

  private _addDepth() {
    const current = (this._editCabinet as any).depth || 1;
    if (current >= 6) return;
    this._editCabinet = { ...this._editCabinet, depth: current + 1 };
  }

  private _removeDepth() {
    const current = (this._editCabinet as any).depth || 1;
    if (current <= 1) return;
    this._editCabinet = { ...this._editCabinet, depth: current - 1 };
  }

  private async _saveAdd() {
    this._loading = true;
    this._error = "";
    try {
      await this.hass.callWS({
        type: "wine_cellar/add_cabinet",
        cabinet: {
          name: this._editCabinet.name || "New Rack",
          rows: this._finalRows(),
          cols: this._finalCols(),
          depth: this._finalDepth(),
          has_bottom_zone: false,
          bottom_zone_name: "",
          storage_rows: this._finalStorageRows(),
          order: this.cabinets.length,
          orientation: "vertical",
          temp_sensor_entity_id: this._editCabinet.temp_sensor_entity_id || "",
          humidity_sensor_entity_id: this._editCabinet.humidity_sensor_entity_id || "",
        },
      });
      this._notifyUpdate();
      this._mode = "list";
    } catch {
      this._error = this._t("ui.rack.failedToAddRack");
    }
    this._loading = false;
  }

  private async _saveEdit() {
    this._loading = true;
    this._error = "";
    try {
      const cabinetId = this._editCabinet.id!;

      // Worked out before the rack changes shape: afterwards the old slot
      // is unrecoverable, and this is the same list the warning showed.
      const displaced = this._displacedWines();

      await this.hass.callWS({
        type: "wine_cellar/update_cabinet",
        cabinet_id: cabinetId,
        updates: {
          name: this._editCabinet.name,
          rows: this._finalRows(),
          cols: this._finalCols(),
          depth: this._finalDepth(),
          has_bottom_zone: false,
          bottom_zone_name: "",
          storage_rows: this._finalStorageRows(),
          orientation: "vertical",
          temp_sensor_entity_id: this._editCabinet.temp_sensor_entity_id || "",
          humidity_sensor_entity_id: this._editCabinet.humidity_sensor_entity_id || "",
        },
      });

      for (const wine of displaced) {
        await this.hass.callWS({
          type: "wine_cellar/update_wine",
          wine_id: wine.id,
          updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
        });
      }

      this._notifyUpdate();
      this._mode = "list";
    } catch {
      this._error = this._t("ui.rack.failedToUpdateRack");
    }
    this._loading = false;
  }

  private async _confirmDelete() {
    if (!this._deleteCabinet) return;
    this._loading = true;
    this._error = "";
    try {
      await this.hass.callWS({
        type: "wine_cellar/remove_cabinet",
        cabinet_id: this._deleteCabinet.id,
      });
      this._notifyUpdate();
      this._mode = "list";
      this._deleteCabinet = null;
    } catch {
      this._error = this._t("ui.rack.failedToDeleteRack");
    }
    this._loading = false;
  }

  private async _moveUp(cabinet: Cabinet) {
    const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((c) => c.id === cabinet.id);
    if (idx <= 0) return;
    const prev = sorted[idx - 1];
    try {
      await Promise.all([
        this.hass.callWS({
          type: "wine_cellar/update_cabinet",
          cabinet_id: cabinet.id,
          updates: { order: prev.order },
        }),
        this.hass.callWS({
          type: "wine_cellar/update_cabinet",
          cabinet_id: prev.id,
          updates: { order: cabinet.order },
        }),
      ]);
      this._notifyUpdate();
    } catch {
      this._error = this._t("ui.rack.failedToReorderRacks");
    }
  }

  private async _moveDown(cabinet: Cabinet) {
    const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((c) => c.id === cabinet.id);
    if (idx < 0 || idx >= sorted.length - 1) return;
    const next = sorted[idx + 1];
    try {
      await Promise.all([
        this.hass.callWS({
          type: "wine_cellar/update_cabinet",
          cabinet_id: cabinet.id,
          updates: { order: next.order },
        }),
        this.hass.callWS({
          type: "wine_cellar/update_cabinet",
          cabinet_id: next.id,
          updates: { order: cabinet.order },
        }),
      ]);
      this._notifyUpdate();
    } catch {
      this._error = this._t("ui.rack.failedToReorderRacks");
    }
  }

  private _renderList() {
    const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
    return html`
      <div class="dialog-body">
        <div class="rack-list">
          ${sorted.map(
            (cab, idx) => {
              const storageRows = cab.storage_rows || [];
              const hasGridRows = (cab.rows || 0) > storageRows.length;
              const typeCounts = new Map<string, number>();
              for (const sr of storageRows) typeCounts.set(sr.type, (typeCounts.get(sr.type) || 0) + 1);
              return html`
                <div class="rack-item">
                  <div class="rack-info">
                    <div class="rack-name">${cab.name}</div>
                    <div class="rack-meta">
                      ${hasGridRows ? html`${this._t("ui.rack.gridDimensions", { rows: cab.rows, cols: cab.cols })}${(cab.depth || 1) > 1 ? this._t("ui.rack.gridDeepSuffix", { depth: cab.depth }) : ""}` : nothing}
                      ${this._t("ui.rack.bottlesCountSuffix", { n: this._winesInCabinet(cab.id), plural: this._winesInCabinet(cab.id) === 1 ? "" : "s" })}
                      ${[...typeCounts.entries()].map(([type, count]) =>
                        type === "shelf"
                          ? this._t(count === 1 ? "ui.rack.shelfCountSuffixOne" : "ui.rack.shelfCountSuffixMany", { n: count })
                          : type === "box"
                          ? this._t(count === 1 ? "ui.rack.boxCountSuffixOne" : "ui.rack.boxCountSuffixMany", { n: count })
                          : ""
                      )}
                    </div>
                  </div>
                  <div class="rack-actions">
                    <button
                      class="small-btn"
                      @click=${() => this._moveUp(cab)}
                      ?disabled=${idx === 0}
                      title="${this._t('ui.rack.moveUpTitle')}"
                    >↑</button>
                    <button
                      class="small-btn"
                      @click=${() => this._moveDown(cab)}
                      ?disabled=${idx === sorted.length - 1}
                      title="${this._t('ui.rack.moveDownTitle')}"
                    >↓</button>
                    <button
                      class="small-btn"
                      @click=${() => this._startEdit(cab)}
                    >${this._t("ui.common.edit")}</button>
                    <button
                      class="small-btn danger"
                      @click=${() => this._startDelete(cab)}
                    >${this._t("ui.rack.delBtn")}</button>
                  </div>
                </div>
              `;
            }
          )}

          <button class="add-rack-btn" @click=${this._startAdd}>
            ${this._t("ui.rack.addRackBtn")}
          </button>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${this._close}>${this._t("ui.common.close")}</button>
      </div>
    `;
  }

  private _renderSlotForm(slot: SecondarySlot) {
    const style = this._styleFor(slot);
    const numCols = this._editCabinet.cols || 8;
    const numDepth = (this._editCabinet as any).depth || 1;

    if (style === "grid") {
      if (slot === "secondary") {
        // A secondary grid block has no row count of its own control on the
        // cabinet — cols/depth are shared with the cabinet's one grid
        // section (see _finalCols/_finalDepth), so just its row count.
        return html`
          <div class="stepper-row">
            <div class="stepper-wrap">
              <div class="stepper-label">${this._t("ui.rack.rowsLabel")}</div>
              <div class="stepper">
                <button class="stepper-btn" @click=${() => this._setSecondaryGridRows(this._secondaryGridRows - 1)} ?disabled=${this._secondaryGridRows <= 1}>−</button>
                <span class="stepper-value">${this._secondaryGridRows}</span>
                <button class="stepper-btn" @click=${() => this._setSecondaryGridRows(this._secondaryGridRows + 1)} ?disabled=${this._secondaryGridRows >= 10}>+</button>
              </div>
            </div>
          </div>
          <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:0">${this._t("ui.rack.secondaryGridHint")}</p>
        `;
      }
      const numRows = this._editCabinet.rows || 1;
      return html`
        <div class="grid-editor-title">${this._t("ui.rack.gridLayoutTitle")}</div>
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.rowsLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeRow} ?disabled=${numRows <= 1}>−</button>
              <span class="stepper-value">${numRows}</span>
              <button class="stepper-btn" @click=${this._addRow} ?disabled=${numRows >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.columnsLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeCol} ?disabled=${numCols <= 1}>−</button>
              <span class="stepper-value">${numCols}</span>
              <button class="stepper-btn" @click=${this._addCol} ?disabled=${numCols >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.depthLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeDepth} ?disabled=${numDepth <= 1}>−</button>
              <span class="stepper-value">${numDepth}</span>
              <button class="stepper-btn" @click=${this._addDepth} ?disabled=${numDepth >= 6}>+</button>
            </div>
          </div>
        </div>

        <!-- Visual grid preview -->
        <div class="grid-preview">
          ${Array.from({ length: numRows }, (_, row) => html`
            <div class="grid-preview-row">
              <span class="grid-preview-label">R${row + 1}</span>
              ${Array.from({ length: Math.min(numCols, 15) }, () => html`<div class="grid-preview-cell"></div>`)}
              ${numCols > 15
                ? html`<span style="font-size:0.65em;color:var(--wc-text-secondary)">+${numCols - 15}</span>`
                : nothing}
            </div>
          `)}
        </div>
      `;
    }

    if (style === "shelf") {
      const shared = this._sharedShelfFrontBack(slot);
      const shelves = this._shelfRows(slot);
      return html`
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfCountLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setShelfCount(slot, shelves.length - 1)} ?disabled=${shelves.length <= 1}>−</button>
              <span class="stepper-value">${shelves.length}</span>
              <button class="stepper-btn" @click=${() => this._setShelfCount(slot, shelves.length + 1)} ?disabled=${shelves.length >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfFrontLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSharedFront(slot, shared.front - 1)} ?disabled=${shared.front <= 0}>−</button>
              <span class="stepper-value">${shared.front}</span>
              <button class="stepper-btn" @click=${() => this._setSharedFront(slot, shared.front + 1)} ?disabled=${shared.front >= 30}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfBackLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSharedBack(slot, shared.back - 1)} ?disabled=${shared.back <= 0}>−</button>
              <span class="stepper-value">${shared.back}</span>
              <button class="stepper-btn" @click=${() => this._setSharedBack(slot, shared.back + 1)} ?disabled=${shared.back >= 30}>+</button>
            </div>
          </div>
        </div>
        <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:0 0 8px">${this._t("ui.rack.shelfAlternateHint")}</p>

        <!-- Name + row count per shelf — front/back are shared above,
             but how many boards each shelf has is its own choice. -->
        <div class="row-list">
          ${shelves.map((sr, i) => {
            const levelCount = sr.shelf_levels?.length || 1;
            return html`
              <div class="row-entry storage">
                <span class="row-num">${i + 1}</span>
                <input
                  type="text"
                  class="row-name-input"
                  style="flex:1"
                  .value=${sr.name || ""}
                  @input=${(e: InputEvent) => this._updateShelfName(slot, i, (e.target as HTMLInputElement).value)}
                  placeholder="${this._t('ui.rack.shelfNamePlaceholder', { n: i + 1 })}"
                />
                <span class="row-type-info" style="flex:0;font-size:0.7em">${this._t('ui.rack.shelfLevelsLabel')}</span>
                <div class="row-cap-stepper">
                  <button class="stepper-btn-sm" @click=${() => this._setShelfLevelCountAt(slot, i, levelCount - 1)} ?disabled=${levelCount <= 1}>−</button>
                  <span class="stepper-val-sm">${levelCount}</span>
                  <button class="stepper-btn-sm" @click=${() => this._setShelfLevelCountAt(slot, i, levelCount + 1)} ?disabled=${levelCount >= 6}>+</button>
                </div>
                <span class="row-type-info" style="flex:0">= ${sr.capacity}</span>
              </div>
            `;
          })}
        </div>
      `;
    }

    if (style === "bulk") {
      const capacity = this._bulkRow(slot)?.capacity || 20;
      return html`
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.bulkCapacityLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setBulkCapacity(slot, capacity - 1)} ?disabled=${capacity <= 1}>−</button>
              <span class="stepper-value">${capacity}</span>
              <button class="stepper-btn" @click=${() => this._setBulkCapacity(slot, capacity + 1)} ?disabled=${capacity >= 500}>+</button>
            </div>
          </div>
        </div>
      `;
    }

    if (style === "stepped") {
      const shared = this._sharedSteppedFirstRow(slot);
      const steppedUnits = this._steppedRows(slot);
      return html`
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.steppedCountLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSteppedCount(slot, steppedUnits.length - 1)} ?disabled=${steppedUnits.length <= 1}>−</button>
              <span class="stepper-value">${steppedUnits.length}</span>
              <button class="stepper-btn" @click=${() => this._setSteppedCount(slot, steppedUnits.length + 1)} ?disabled=${steppedUnits.length >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.steppedFirstRowLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._applySharedSteppedFirstRow(slot, shared - 1)} ?disabled=${shared <= 1}>−</button>
              <span class="stepper-value">${shared}</span>
              <button class="stepper-btn" @click=${() => this._applySharedSteppedFirstRow(slot, shared + 1)} ?disabled=${shared >= 30}>+</button>
            </div>
          </div>
        </div>

        <!-- Name + row count per quinconce unit — the bottom-row count is
             shared above, but how many rows each one stacks is its own
             choice. -->
        <div class="row-list">
          ${steppedUnits.map((sr, i) => {
            const rowCount = sr.stepped_levels?.length || 1;
            return html`
              <div class="row-entry storage">
                <span class="row-num">${i + 1}</span>
                <input
                  type="text"
                  class="row-name-input"
                  style="flex:1"
                  .value=${sr.name || ""}
                  @input=${(e: InputEvent) => this._updateSteppedName(slot, i, (e.target as HTMLInputElement).value)}
                  placeholder="${this._t('ui.rack.steppedNamePlaceholder', { n: i + 1 })}"
                />
                <span class="row-type-info" style="flex:0;font-size:0.7em">${this._t('ui.rack.steppedRowCountLabel')}</span>
                <div class="row-cap-stepper">
                  <button class="stepper-btn-sm" @click=${() => this._setSteppedRowCountAt(slot, i, rowCount - 1)} ?disabled=${rowCount <= 1}>−</button>
                  <span class="stepper-val-sm">${rowCount}</span>
                  <button class="stepper-btn-sm" @click=${() => this._setSteppedRowCountAt(slot, i, rowCount + 1)} ?disabled=${rowCount >= 10}>+</button>
                </div>
                <span class="row-type-info" style="flex:0">= ${sr.capacity}</span>
              </div>
            `;
          })}
        </div>
      `;
    }

    // "box"
    const boxRow = this._boxRow(slot);
    const boxes = boxRow?.boxes || [12];
    return html`
      <div class="stepper-row">
        <div class="stepper-wrap">
          <div class="stepper-label">${this._t("ui.rack.boxCountLabel")}</div>
          <div class="stepper">
            <button class="stepper-btn" @click=${() => this._updateBoxCount(slot, boxes.length - 1)} ?disabled=${boxes.length <= 1}>−</button>
            <span class="stepper-value">${boxes.length}</span>
            <button class="stepper-btn" @click=${() => this._updateBoxCount(slot, boxes.length + 1)} ?disabled=${boxes.length >= 10}>+</button>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px">
        ${boxes.map((boxSize: number, bi: number) => html`
          <select
            class="row-cap-select"
            @change=${(e: Event) => this._updateBoxSize(slot, bi, parseInt((e.target as HTMLSelectElement).value, 10))}
          >
            ${BOX_SIZES.map((s) => html`<option value=${s} ?selected=${boxSize === s}>${this._t('ui.rack.boxSizeOption', { s })}</option>`)}
          </select>
        `)}
        <span style="font-size:0.7em;color:var(--wc-text-secondary);">= ${boxRow?.capacity || 12}</span>
      </div>
    `;
  }

  private _renderForm() {
    const isEdit = this._mode === "edit";

    // Which bottles this edit would displace, whichever way it shrinks.
    const displaced = isEdit ? this._displacedWines() : [];
    const typeLabels = getStorageRowTypeLabels(this.hass?.language);
    const styles: RackStyle[] = ["grid", "stepped", "shelf", "bulk", "box"];
    const styleLabel = (s: RackStyle) => (s === "grid" ? this._t("ui.rack.styleGrid") : typeLabels[s]);

    return html`
      <div class="dialog-body">
        <div class="form-group">
          <label>${this._t("ui.rack.rackNameLabel")}</label>
          <input
            type="text"
            .value=${this._editCabinet.name || ""}
            @input=${(e: InputEvent) =>
              (this._editCabinet = {
                ...this._editCabinet,
                name: (e.target as HTMLInputElement).value,
              })}
          />
        </div>

        <!-- Whole-cabinet sensors: used as-is by a plain grid rack, and as
             the fallback for any zone below that doesn't set its own. -->
        <div class="form-group">
          <label>${this._t("ui.rack.cabinetSensorsLabel")}</label>
          ${this._renderSensorPickers(
            this._editCabinet.temp_sensor_entity_id || "",
            this._editCabinet.humidity_sensor_entity_id || "",
            (value) => (this._editCabinet = { ...this._editCabinet, temp_sensor_entity_id: value }),
            (value) => (this._editCabinet = { ...this._editCabinet, humidity_sensor_entity_id: value })
          )}
        </div>

        <!-- Primary style: exactly one of these five, chosen once -->
        <div class="form-group">
          <label>${this._t("ui.rack.styleLabel")}</label>
          <div class="style-toggle">
            ${styles.map((s) => html`
              <button
                class="style-toggle-btn ${this._primaryStyle === s ? "active" : ""}"
                @click=${() => this._setPrimaryStyle(s)}
              >${styleLabel(s)}</button>
            `)}
          </div>
        </div>

        <div class="grid-editor">${this._renderSlotForm("primary")}</div>

        <!-- Secondary zone: optional, stacked above or below the primary
             style chosen above. -->
        <div class="form-group">
          <label>${this._t("ui.rack.secondaryStyleLabel")}</label>
          <div class="style-toggle">
            <button
              class="style-toggle-btn ${this._secondaryStyle === "none" ? "active" : ""}"
              @click=${() => this._setSecondaryStyle("none")}
            >${this._t("ui.rack.secondaryNone")}</button>
            ${styles.map((s) => html`
              <button
                class="style-toggle-btn ${this._secondaryStyle === s ? "active" : ""}"
                @click=${() => this._setSecondaryStyle(s)}
              >${styleLabel(s)}</button>
            `)}
          </div>
          <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:4px 0 0">${this._t("ui.rack.secondaryHint")}</p>
        </div>

        ${this._secondaryStyle !== "none"
          ? html`
              <div class="form-group">
                <label>${this._t("ui.rack.secondaryPositionLabel")}</label>
                <div class="style-toggle">
                  <button
                    class="style-toggle-btn ${this._secondaryPosition === "above" ? "active" : ""}"
                    @click=${() => this._setSecondaryPosition("above")}
                  >${this._t("ui.rack.secondaryAbove")}</button>
                  <button
                    class="style-toggle-btn ${this._secondaryPosition === "below" ? "active" : ""}"
                    @click=${() => this._setSecondaryPosition("below")}
                  >${this._t("ui.rack.secondaryBelow")}</button>
                </div>
              </div>
              <div class="grid-editor">${this._renderSlotForm("secondary")}</div>
            `
          : nothing}

        ${displaced.length > 0
          ? html`
              <div class="warning-msg">
                ${displaced.length > 1
                  ? this._t("ui.rack.warningBeforeMany", { n: displaced.length })
                  : this._t("ui.rack.warningBeforeOne")}
                <strong>${this._t("wineLocation.unassigned")}</strong>
                ${displaced.length > 1
                  ? this._t("ui.rack.warningAfterMany")
                  : this._t("ui.rack.warningAfterOne")}
                <div class="warning-list">
                  ${displaced.slice(0, 6).map(
                    (w) => html`<div>${w.name || this._t("ui.rack.unnamedWine")}</div>`
                  )}
                  ${displaced.length > 6
                    ? html`<div>${this._t("ui.rack.andNMore", { n: displaced.length - 6 })}</div>`
                    : nothing}
                </div>
              </div>
            `
          : nothing}

        ${this._error
          ? html`<div class="error-msg" style="color:#ef5350;margin-top:8px">${this._error}</div>`
          : nothing}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => (this._mode = "list")}>
          ${this._t("ui.common.cancel")}
        </button>
        <button
          class="btn btn-primary"
          @click=${isEdit ? this._saveEdit : this._saveAdd}
          ?disabled=${this._loading}
        >
          ${this._loading ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
        </button>
      </div>
    `;
  }

  private _renderDeleteConfirm() {
    if (!this._deleteCabinet) return nothing;
    const count = this._winesInCabinet(this._deleteCabinet.id);

    return html`
      <div class="dialog-body">
        <div class="delete-info">
          ${this._t("ui.rack.deleteConfirmQuestion", { name: this._deleteCabinet.name })}
          ${count > 0
            ? html`<br /><span class="delete-count"
                >${count > 1 ? this._t("ui.rack.deleteWinesUnassignedMany", { count }) : this._t("ui.rack.deleteWinesUnassignedOne")}</span
              >`
            : nothing}
        </div>
        ${this._error
          ? html`<div style="color:#ef5350;font-size:0.85em">${this._error}</div>`
          : nothing}
      </div>
      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => (this._mode = "list")}>
          ${this._t("ui.common.cancel")}
        </button>
        <button
          class="btn btn-primary"
          style="background:#c62828"
          @click=${this._confirmDelete}
          ?disabled=${this._loading}
        >
          ${this._loading ? this._t("ui.rack.deletingBtn") : this._t("ui.rack.deleteBtn")}
        </button>
      </div>
    `;
  }

  render() {
    if (!this.open) return nothing;

    const titles: Record<Mode, string> = {
      list: this._t("ui.rack.dialogTitleManage"),
      add: this._t("ui.rack.dialogTitleAdd"),
      edit: this._t("ui.rack.dialogTitleEdit"),
      "delete-confirm": this._t("ui.rack.dialogTitleDeleteConfirm"),
    };

    return html`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-header">${titles[this._mode]}</div>
          ${this._mode === "list" ? this._renderList() : nothing}
          ${this._mode === "add" || this._mode === "edit"
            ? this._renderForm()
            : nothing}
          ${this._mode === "delete-confirm"
            ? this._renderDeleteConfirm()
            : nothing}
        </div>
      </div>
    `;
  }
}
