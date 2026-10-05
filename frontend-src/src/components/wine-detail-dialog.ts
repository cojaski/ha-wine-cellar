import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Wine, Cabinet, TastingNotes, getWineTypeLabels, getSelectableWineTypes, WINE_TYPE_COLORS, WineType, getRemovalReasons, getWineLocation, producerLabel, varietyLabel } from "../models";
import { sharedStyles, touchStyles } from "../styles";
import { resizeImageForStorage } from "../utils/image";
import { t } from "../i18n";
import { getChamberingAdvice, formatDuration, formatServingTemp, usesFahrenheit } from "../utils/chambering";
import "./star-rating";
import "./label-camera";

export type WineDetailMode = "cellar" | "buylist" | "winelist";

@customElement("wine-detail-dialog")
export class WineDetailDialog extends LitElement {
  @property({ attribute: false }) wine: Wine | null = null;
  // Full cellar wine list, used only to find other bottles of this same
  // wine (same name+winery+vintage) so the "propagate this note?" prompt
  // in _saveFields can tell the user how many bottles would be affected.
  @property({ attribute: false }) wines: Wine[] = [];
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) cabinets: Cabinet[] = [];
  @property({ type: Boolean }) open = false;
  @property({ type: String }) mode: WineDetailMode = "cellar";

  @state() private _editing = false;
  @state() private _editingFields = false;
  @state() private _editData: Record<string, any> = {};
  // Start year of the drink window, edited separately from drink_by (the
  // end year) and recombined into the stored drink_window "YYYY-YYYY"
  // string on every change — see _updateDrinkWindowPart.
  @state() private _editDrinkFrom = "";
  @state() private _userRating: number = 0;
  @state() private _tastingNotes: TastingNotes = { aroma: "", taste: "", finish: "", overall: "" };
  @state() private _saving = false;
  @state() private _refreshing = false;
  @state() private _analyzing = false;
  @state() private _showLookupChooser = false;
  @state() private _resettingAiContent = false;
  @state() private _scanningLabel = false;
  @state() private _showLabelCamera = false;
  @state() private _showRemoveConfirm = false;
  @state() private _showDrinkDialog = false;
  @state() private _drinkRating = 0;
  @state() private _drinkNotes = "";
  @state() private _drinkBuyAgain = false;
  @state() private _pendingVivinoImage: string | null = null;
  @state() private _showPhotoCamera = false;
  @state() private _photoBusy = false;
  @state() private _photoSide: "front" | "back" = "front";
  private _photoSwipeStartX: number | null = null;
  @state() private _aiFallbackReason: "no_match" | "no_price" | null = null;
  @property({ type: Boolean }) hasGemini = false;
  @property({ type: Boolean }) aiFallbackAlways = false;
  @property({ type: Boolean }) enableWhisky = false;
  @property({ type: String }) currency = "USD";
  @property({ type: String }) chamberingRoomSensor = "";
  @property({ type: Number }) chamberingTimeConstantMinutes = 75;
  @property({ type: Number }) chamberingEquilibrationHours = 24;

  static styles = [
    sharedStyles,
    css`
      .dialog-top-bar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        padding: 8px 12px 0;
      }

      .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.1em;
        padding: 6px 8px;
        border-radius: 6px;
        color: var(--wc-text-secondary);
        transition: background 0.2s;
        line-height: 1;
      }

      .icon-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .icon-btn.close-btn {
        font-size: 1.3em;
        font-weight: 600;
      }

      .wine-header {
        display: flex;
        gap: 16px;
        padding: 4px 20px 20px;
      }

      .wine-image {
        width: 135px;
        height: 195px;
        border-radius: 8px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .wine-image-wrap {
        position: relative;
        flex-shrink: 0;
        touch-action: pan-y;
      }

      .photo-dots {
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
      }

      .photo-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(0, 0, 0, 0.25);
        cursor: pointer;
      }

      .photo-dot.active {
        background: #fff;
      }

      .photo-side-badge {
        position: absolute;
        bottom: 6px;
        left: 6px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 0.6em;
        padding: 2px 6px;
        border-radius: 10px;
        pointer-events: none;
      }

      .photo-actions {
        position: absolute;
        bottom: 6px;
        right: 6px;
        display: flex;
        gap: 6px;
      }

      .photo-action-btn {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
        transition: background 0.15s, transform 0.15s;
      }

      .photo-action-btn:hover {
        background: #fff;
        transform: scale(1.06);
      }

      .photo-action-btn:disabled {
        opacity: 0.5;
        cursor: default;
        transform: none;
      }

      .wine-image-placeholder {
        width: 135px;
        height: 195px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        flex-shrink: 0;
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .wine-image-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }

      .wine-location {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 90px;
        font-size: 0.68em;
        line-height: 1.3;
        text-align: center;
        color: var(--wc-text-secondary, #888);
        cursor: pointer;
      }

      .wine-location:hover {
        color: var(--wc-primary-text);
        text-decoration: underline;
      }

      .wine-title {
        flex: 1;
        min-width: 0;
      }

      .wine-name {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 4px;
      }

      .wine-winery {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .wine-type-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.75em;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .wine-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        font-size: 0.9em;
      }

      .rating-star {
        color: #f5a623;
      }

      .drink-by-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        font-size: 0.9em;
        font-weight: 500;
      }

      .drink-by-banner.drink {
        background: rgba(46, 125, 50, 0.12);
        color: #2e7d32;
      }

      .drink-by-banner.drink.peak {
        background: rgba(27, 94, 32, 0.2);
        color: #1b5e20;
        font-weight: 600;
      }

      .drink-by-banner.hold {
        background: rgba(21, 101, 192, 0.12);
        color: #1565c0;
      }

      .drink-by-banner.past {
        background: rgba(198, 40, 40, 0.12);
        color: #c62828;
      }

      .drink-by-banner.chambering-ready {
        background: rgba(46, 125, 50, 0.12);
        color: #2e7d32;
      }

      .drink-by-banner.chambering-warm_up {
        background: rgba(230, 81, 0, 0.12);
        color: #e65100;
      }

      .drink-by-banner.chambering-chill {
        background: rgba(2, 119, 189, 0.12);
        color: #0277bd;
      }

      .wine-description {
        padding: 0 20px 12px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
        font-style: italic;
      }

      .info-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 20px 12px;
      }

      .info-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.75em;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid var(--wc-border);
        color: var(--wc-text-secondary);
      }

      .info-chip-icon {
        font-size: 1.1em;
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 0 20px 16px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
      }

      .detail-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .detail-value {
        font-size: 0.95em;
        color: var(--wc-text);
        font-weight: 500;
      }

      .wine-notes {
        padding: 0 20px 16px;
      }

      .wine-notes-text {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        font-style: italic;
        background: rgba(128, 128, 128, 0.08);
        padding: 10px;
        border-radius: 8px;
      }

      /* Rating & Tasting Notes section */
      .section {
        padding: 0 20px 16px;
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .section-title {
        font-size: 0.85em;
        font-weight: 600;
        color: var(--wc-text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .edit-toggle {
        background: none;
        border: none;
        color: var(--wc-primary-text);
        cursor: pointer;
        font-size: 0.85em;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      }

      .edit-toggle:hover {
        background: rgba(109, 76, 65, 0.1);
      }

      .rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .rating-label {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        min-width: 70px;
      }

      .no-rating {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }

      .tasting-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .tasting-field {
        display: flex;
        flex-direction: column;
      }

      .tasting-field.full-width {
        grid-column: 1 / -1;
      }

      .tasting-field label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .tasting-field textarea {
        font-family: inherit;
        font-size: 0.85em;
        padding: 8px;
        border: 1px solid var(--wc-border, #e0e0e0);
        border-radius: 8px;
        resize: vertical;
        min-height: 50px;
        background: var(--wc-bg);
        color: var(--wc-text);
      }

      .tasting-field textarea:focus {
        outline: none;
        border-color: var(--wc-primary-text);
      }

      .tasting-value {
        font-size: 0.85em;
        color: var(--wc-text);
        background: rgba(128, 128, 128, 0.08);
        padding: 8px;
        border-radius: 8px;
        min-height: 20px;
      }

      .ai-ratings {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 20px 12px;
      }

      .ai-rating-chip {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.75em;
        background: rgba(245, 166, 35, 0.12);
        border: 1px solid rgba(245, 166, 35, 0.3);
        color: #f5a623;
        font-weight: 600;
      }

      .ai-rating-chip .source {
        font-weight: 400;
        opacity: 0.8;
      }

      .drink-window {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        padding: 0 20px 8px;
      }

      .divider {
        height: 1px;
        background: var(--wc-border, #e0e0e0);
        margin: 0 20px 16px;
      }

      .actions {
        display: flex;
        gap: 6px;
        padding: 0 16px 16px;
        border-bottom: 1px solid var(--wc-border);
        justify-content: center;
        flex-wrap: wrap;
      }

      .actions .btn {
        font-size: 0.8em;
        padding: 6px 10px;
        white-space: nowrap;
      }

      /* Bottle actions: two cards — look-up (Vivino/AI, label photo) and
         manage (copy/move/unassign/remove) — then a big Drink button on its
         own below them, so the everyday action isn't lost among the rest. */
      .actions.grouped {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }

      .action-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .action-card {
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        padding: 8px;
        border: 1px solid var(--wc-border);
        border-radius: 12px;
        background: var(--wc-hover);
      }

      .actions .btn.drink-btn {
        font-size: 1.05em;
        font-weight: 600;
        padding: 12px 16px;
        border-radius: 12px;
      }

      .lookup-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .lookup-option {
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

      .lookup-option small {
        font-size: 0.8em;
        font-weight: 400;
        opacity: 0.85;
      }

      .lookup-option:disabled {
        opacity: 0.6;
        cursor: default;
      }

      /* Edit form styles */
      .edit-form {
        padding: 0 20px 16px;
      }

      .edit-form .form-group {
        margin-bottom: 12px;
      }

      .edit-form .form-group label {
        display: block;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .edit-form .form-group input,
      .edit-form .form-group select,
      .edit-form .form-group textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        font-size: 0.9em;
        background: var(--wc-bg);
        color: var(--wc-text);
        box-sizing: border-box;
        font-family: inherit;
      }

      .edit-form .form-group textarea {
        min-height: 60px;
        resize: vertical;
      }

      .edit-form .form-group input:focus,
      .edit-form .form-group select:focus,
      .edit-form .form-group textarea:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .edit-form .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .edit-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        padding: 12px 20px 20px;
        border-top: 1px solid var(--wc-border);
      }

      @media (max-width: 599px) {
        .tasting-grid {
          grid-template-columns: 1fr;
        }
        .tasting-field.full-width {
          grid-column: 1;
        }
        .edit-form .form-row {
          grid-template-columns: 1fr;
        }
      }

      /* Touch: the photo dots stay small visually but get a finger-sized
         invisible hit area; the location link gets a full-height row. */
      @media (pointer: coarse) {
        .photo-dots {
          gap: 16px;
        }
        .photo-dot {
          position: relative;
          width: 10px;
          height: 10px;
        }
        .photo-dot::after {
          content: "";
          position: absolute;
          inset: -14px;
        }
        .wine-location {
          min-height: 44px;
        }
      }
    `,
    touchStyles,
  ];

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("wine") && this.wine) {
      this._userRating = this.wine.user_rating ?? 0;
      this._tastingNotes = this.wine.tasting_notes
        ? { ...this.wine.tasting_notes }
        : { aroma: "", taste: "", finish: "", overall: "" };
      this._editing = false;
      this._editingFields = false;
      this._photoSide = "front";
    }
  }

  private _close() {
    this.open = false;
    this._editing = false;
    this._editingFields = false;
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _startEditingFields() {
    if (!this.wine) return;
    this._editData = {
      name: this.wine.name || "",
      winery: this.wine.winery || "",
      vintage: this.wine.vintage,
      type: this.wine.type || "red",
      region: this.wine.region || "",
      country: this.wine.country || "",
      grape_variety: this.wine.grape_variety || "",
      price: this.wine.price,
      retail_price: this.wine.retail_price,
      purchase_date: this.wine.purchase_date || "",
      drink_by: this.wine.drink_by || "",
      drink_window: this.wine.drink_window || "",
      peak_window: this.wine.peak_window || "",
      notes: this.wine.notes || "",
      alcohol: this.wine.alcohol || "",
      // Edited in the unit Home Assistant uses (°F in a US home); see
      // _saveFields for how an untouched value keeps its stored text.
      serving_temp: formatServingTemp(this.wine.serving_temp, this.hass),
    };
    const windowStart = (this.wine.drink_window || "").match(/\b(?:19|20)\d{2}\b/);
    this._editDrinkFrom = windowStart ? windowStart[0] : "";
    this._editingFields = true;
  }

  private _cancelEditingFields() {
    this._editingFields = false;
    this._editData = {};
    this._editDrinkFrom = "";
  }

  private _updateEditField(field: string, value: any) {
    this._editData = { ...this._editData, [field]: value };
  }

  // drink_by is the end year; _editDrinkFrom (a separate, non-persisted
  // field) is the start year. Both recombine into the stored drink_window
  // "YYYY-YYYY" string on every change, so it never drifts out of sync
  // with whichever end the user just edited.
  private _updateDrinkWindowPart(part: "from" | "by", value: string) {
    if (part === "from") this._editDrinkFrom = value;
    const from = (part === "from" ? value : this._editDrinkFrom).trim();
    const by = (part === "by" ? value : (this._editData.drink_by || "")).trim();
    this._editData = {
      ...this._editData,
      ...(part === "by" ? { drink_by: value } : {}),
      drink_window: from && by ? `${from}-${by}` : (from || by || ""),
    };
  }

  // Applying a result to whatever is on screen now is only correct if it is
  // still the same bottle. A Vivino refresh takes a second or two — long
  // enough to close the dialog and open another wine — and the old result
  // would then overwrite the new bottle wholesale, id included, silently
  // showing the previous wine under the new one's name.
  private _applyIfStillShowing(wineId: string, patch: Record<string, any>): boolean {
    if (!this.wine || this.wine.id !== wineId) return false;
    this.wine = { ...this.wine, ...patch };
    return true;
  }

  private async _saveFields() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._saving = true;
    try {
      const updates: Record<string, any> = { ...this._editData };
      // Convert empty strings to null for numeric fields
      if (updates.vintage === "" || updates.vintage === null) updates.vintage = null;
      else updates.vintage = parseInt(updates.vintage) || null;
      if (updates.price === "" || updates.price === null) updates.price = null;
      else updates.price = parseFloat(updates.price) || null;
      if (updates.retail_price === "" || updates.retail_price === null) updates.retail_price = null;
      else updates.retail_price = parseFloat(updates.retail_price) || null;
      // The field showed the stored °C value converted for display; if it
      // wasn't touched, keep the stored text rather than rewriting it.
      if (updates.serving_temp === formatServingTemp(this.wine.serving_temp, this.hass)) {
        updates.serving_temp = this.wine.serving_temp || "";
      }

      if (this.mode === "buylist") {
        await this.hass.callWS({
          type: "wine_cellar/update_buy_list_item",
          item_id: this.wine.id,
          updates,
        });
        if (!this._applyIfStillShowing(wineId, updates)) return;
        this._editingFields = false;
        this._editData = {};
        this.dispatchEvent(new CustomEvent("buy-list-updated", { bubbles: true, composed: true }));
      } else {
        // "notes" is personal and per-bottle by default (unlike everything
        // else here, which the backend already copies to every other
        // bottle of this same wine automatically) — ask before spreading
        // it, since a note like "opened for the anniversary" usually
        // shouldn't land on the other 5 bottles.
        let propagateNotes = false;
        if ("notes" in updates && updates.notes !== (this.wine.notes || "")) {
          const duplicates = this.wines.filter(
            (w) =>
              w.id !== this.wine!.id &&
              w.name === this.wine!.name &&
              w.winery === this.wine!.winery &&
              w.vintage === this.wine!.vintage
          );
          if (duplicates.length > 0) {
            propagateNotes = window.confirm(
              this._t("ui.wineDetail.applyNoteConfirm", { count: duplicates.length, plural: duplicates.length > 1 ? "s" : "", name: this.wine.name })
            );
          }
        }
        const result = await this.hass.callWS({
          type: "wine_cellar/update_wine",
          wine_id: this.wine.id,
          updates,
          propagate_notes: propagateNotes,
        });
        // Use the server's own wine back, not the raw edits: some fields
        // (like `disposition`, recomputed server-side when drink_by/
        // drink_window changes) aren't in `updates` at all, so patching
        // with `updates` alone would leave the badge showing the stale
        // value until the next full reload.
        if (!this._applyIfStillShowing(wineId, result?.wine || updates)) return;
        this._editingFields = false;
        this._editData = {};
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err) {
      console.error("Failed to save wine fields", err);
    }
    this._saving = false;
  }

  private _onRemove() {
    if (!this.wine) return;
    if (this.mode === "buylist") {
      this.dispatchEvent(
        new CustomEvent("remove-buy-list-item", {
          detail: { item_id: this.wine.id },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    } else {
      // Show reason prompt for cellar wines
      this._showRemoveConfirm = true;
    }
  }

  private _onDrink() {
    if (!this.wine) return;
    this._drinkRating = this.wine.user_rating ?? 0;
    this._drinkNotes = "";
    this._drinkBuyAgain = false;
    this._showDrinkDialog = true;
  }

  private _confirmDrink() {
    if (!this.wine) return;
    this.dispatchEvent(
      new CustomEvent("remove-wine", {
        detail: {
          wine_id: this.wine.id,
          reason: "drank",
          name: this.wine.name,
          personal_rating: this._drinkRating || null,
          drink_notes: this._drinkNotes.trim(),
          buy_again: this._drinkBuyAgain,
        },
        bubbles: true,
        composed: true,
      })
    );
    this._showDrinkDialog = false;
    this._close();
  }

  private _confirmRemove(reason: string) {
    if (!this.wine) return;
    this.dispatchEvent(
      new CustomEvent("remove-wine", {
        detail: { wine_id: this.wine.id, reason },
        bubbles: true,
        composed: true,
      })
    );
    this._showRemoveConfirm = false;
    this._close();
  }

  private _onLocate() {
    if (this.wine) {
      this.dispatchEvent(
        new CustomEvent("locate-wine", {
          detail: { wine: this.wine },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    }
  }

  private _onMove() {
    if (this.wine) {
      this.dispatchEvent(
        new CustomEvent("move-wine", {
          detail: { wine: this.wine },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    }
  }

  private _onCopy() {
    if (this.wine) {
      this.dispatchEvent(
        new CustomEvent("copy-wine", {
          detail: { wine: this.wine },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    }
  }

  // Send a placed bottle straight back to Unassigned, without going through
  // the "tap a cell to move" flow — for when you just want it out of its
  // slot (e.g. it's actually elsewhere, or you're about to remove the
  // cabinet it's in) rather than relocating it somewhere specific.
  private async _moveToUnassigned() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    try {
      await this.hass.callWS({
        type: "wine_cellar/move_wine",
        wine_id: this.wine.id,
        cabinet_id: "",
      });
      const updates = { cabinet_id: "", row: null, col: null, zone: "", depth: 0 };
      if (!this._applyIfStillShowing(wineId, updates)) return;
      this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      this._close();
    } catch (err) {
      console.error("Failed to move wine to Unassigned", err);
    }
  }

  private _isInPeakWindow(wine: Wine): boolean {
    if (!wine.peak_window) return false;
    const currentYear = new Date().getFullYear();
    const years = wine.peak_window.split("-").map(y => parseInt(y, 10));
    if (years.length === 1) return currentYear === years[0];
    if (years.length === 2) return currentYear >= years[0] && currentYear <= years[1];
    return false;
  }

  private _isInOrAfterPeakWindow(wine: Wine): boolean {
    if (!wine.peak_window || !wine.drink_window) return false;
    const currentYear = new Date().getFullYear();
    const peakYears = wine.peak_window.split("-").map(y => parseInt(y, 10));
    const drinkYears = wine.drink_window.split("-").map(y => parseInt(y, 10));
    const peakStart = peakYears[0];
    const drinkEnd = drinkYears.length === 2 ? drinkYears[1] : drinkYears[0];
    return currentYear >= peakStart && currentYear <= drinkEnd;
  }

  private _renderChamberingBanner(wine: Wine) {
    const cabinet = this.cabinets.find((c) => c.id === wine.cabinet_id);
    const advice = getChamberingAdvice(
      wine,
      cabinet,
      this.hass,
      this.chamberingRoomSensor,
      this.chamberingTimeConstantMinutes,
      this.chamberingEquilibrationHours
    );
    if (!advice) return nothing;
    return html`
      <div class="drink-by-banner chambering-${advice.status}">
        ${advice.status === "ready"
          ? this._t("ui.wineDetail.chamberingReady")
          : advice.status === "chill"
            ? this._t("ui.wineDetail.chamberingChill")
            : this._t("ui.wineDetail.chamberingWarmUp", {
                duration: formatDuration(advice.minutes || 0),
              })}
      </div>
    `;
  }

  private _onRatingChange(e: CustomEvent) {
    this._userRating = e.detail.value;
  }

  private _onTastingChange(field: keyof TastingNotes, e: Event) {
    const value = (e.target as HTMLTextAreaElement).value;
    this._tastingNotes = { ...this._tastingNotes, [field]: value };
  }

  private async _saveRating() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._saving = true;
    try {
      const updates: Record<string, any> = {
        user_rating: this._userRating || null,
        tasting_notes: this._hasTastingNotes() ? this._tastingNotes : null,
      };
      if (this.mode === "buylist") {
        await this.hass.callWS({
          type: "wine_cellar/update_buy_list_item",
          item_id: this.wine.id,
          updates,
        });
      } else {
        await this.hass.callWS({
          type: "wine_cellar/update_wine",
          wine_id: this.wine.id,
          updates,
        });
      }
      if (!this._applyIfStillShowing(wineId, updates)) return;
      this._editing = false;
      this.dispatchEvent(new CustomEvent(this.mode === "buylist" ? "buy-list-updated" : "wine-updated", { bubbles: true, composed: true }));
    } catch (err) {
      console.error("Failed to save rating/notes", err);
    }
    this._saving = false;
  }

  private async _refreshFromVivino() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._refreshing = true;
    try {
      const resp = await this.hass.callWS({
        type: "wine_cellar/refresh_wine",
        wine_id: this.wine.id,
      });
      if (resp.no_vivino_match) {
        this._refreshing = false;
        if (!resp.ai_available) {
          alert(resp.error);
          return;
        }
        if (this.aiFallbackAlways) {
          await this._analyzeWithAI();
        } else {
          this._aiFallbackReason = "no_match";
        }
        return;
      }
      if (resp.error) {
        alert(resp.error);
      } else if (resp.wine) {
        if (!this._applyIfStillShowing(wineId, resp.wine)) return;
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        if (resp.vivino_image_url) {
          this._pendingVivinoImage = resp.vivino_image_url;
        }
        if (resp.price_needs_ai) {
          this._aiFallbackReason = "no_price";
        }
      }
    } catch (err) {
      console.error("Vivino refresh failed", err);
    }
    this._refreshing = false;
  }

  // One "Vivino / AI" button: without an AI provider there's nothing to
  // choose, so it goes straight to Vivino; otherwise it opens the same
  // source chooser as the inventory review.
  private _onLookup() {
    if (!this.hasGemini) {
      this._refreshFromVivino();
      return;
    }
    this._showLookupChooser = true;
  }

  private _pickLookup(kind: "vivino" | "ai" | "reset") {
    this._showLookupChooser = false;
    if (kind === "vivino") this._refreshFromVivino();
    else if (kind === "ai") this._analyzeWithAI();
    else this._resetAiContent();
  }

  private async _confirmAiFallback(remember: boolean) {
    this._aiFallbackReason = null;
    if (remember) {
      this.dispatchEvent(new CustomEvent("set-ai-fallback-always", {
        detail: { value: true },
        bubbles: true,
        composed: true,
      }));
    }
    await this._analyzeWithAI();
  }

  private _dismissAiFallback() {
    this._aiFallbackReason = null;
  }

  private async _updatePhoto(image_url: string, field: "image_url" | "back_image_url" = "image_url") {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._photoBusy = true;
    try {
      const updates = { [field]: image_url };
      if (this.mode === "buylist") {
        await this.hass.callWS({ type: "wine_cellar/update_buy_list_item", item_id: this.wine.id, updates });
      } else {
        await this.hass.callWS({ type: "wine_cellar/update_wine", wine_id: this.wine.id, updates });
      }
      if (!this._applyIfStillShowing(wineId, { [field]: image_url })) return;
      this.dispatchEvent(new CustomEvent(this.mode === "buylist" ? "buy-list-updated" : "wine-updated", { bubbles: true, composed: true }));
    } catch (err) {
      console.error("Failed to update photo", err);
    }
    this._photoBusy = false;
  }

  private _onImageSwipeStart(e: PointerEvent) {
    this._photoSwipeStartX = e.clientX;
  }

  private _onImageSwipeEnd(e: PointerEvent) {
    if (this._photoSwipeStartX === null) return;
    const dx = e.clientX - this._photoSwipeStartX;
    this._photoSwipeStartX = null;
    const THRESHOLD = 30;
    if (dx <= -THRESHOLD) {
      this._photoSide = "back";
    } else if (dx >= THRESHOLD) {
      this._photoSide = "front";
    }
  }

  private _applyVivinoPhoto() {
    if (!this._pendingVivinoImage) return;
    const image_url = this._pendingVivinoImage;
    this._pendingVivinoImage = null;
    this._updatePhoto(image_url);
  }

  private _dismissVivinoPhoto() {
    this._pendingVivinoImage = null;
  }

  private _onDeletePhoto() {
    const field = this._photoSide === "back" ? "back_image_url" : "image_url";
    if (!this.wine?.[field]) return;
    if (!window.confirm(this._photoSide === "back" ? this._t("ui.wineDetail.deleteBackPhotoConfirm") : this._t("ui.wineDetail.deletePhotoConfirm"))) return;
    this._updatePhoto("", field);
  }

  private async _onPhotoReplaced(e: CustomEvent) {
    this._showPhotoCamera = false;
    const thumbUrl = await resizeImageForStorage(e.detail.image);
    if (thumbUrl) {
      this._updatePhoto(thumbUrl, this._photoSide === "back" ? "back_image_url" : "image_url");
    }
  }

  private async _analyzeWithAI() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._analyzing = true;
    try {
      const resp = await this.hass.callWS({
        type: "wine_cellar/analyze_single_wine",
        wine_id: this.wine.id,
      });
      if (resp.error) {
        alert(resp.error);
      } else if (resp.wine) {
        if (!this._applyIfStillShowing(wineId, resp.wine)) return;
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err) {
      console.error("AI analysis failed", err);
    }
    this._analyzing = false;
  }

  // Clears description/food_pairings (and their language tags) so the next
  // Vivino/AI lookup regenerates them from scratch, instead of them being
  // kept forever because the field isn't "empty". An escape hatch for text
  // stuck in the wrong language despite the automatic staleness checks.
  private async _resetAiContent() {
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    if (!window.confirm(this._t("ui.wineDetail.resetAiContentConfirm"))) return;
    this._resettingAiContent = true;
    try {
      const resp = await this.hass.callWS({
        type: "wine_cellar/reset_ai_content",
        wine_id: this.wine.id,
      });
      if (resp.error) {
        alert(resp.error);
      } else if (resp.wine) {
        if (!this._applyIfStillShowing(wineId, resp.wine)) return;
        this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
      }
    } catch (err) {
      console.error("Reset AI content failed", err);
    }
    this._resettingAiContent = false;
  }

  // Re-scan the label with a fresh photo: like _onPhotoReplaced but also
  // extracts name/winery/vintage/etc via Gemini, same as the add-wine flow's
  // label scan (jamespreid, imported for the detail dialog).
  private async _onLabelPhotoScanned(e: CustomEvent) {
    this._showLabelCamera = false;
    const wineId = this.wine?.id ?? "";
    if (!this.wine || !this.hass) return;
    this._scanningLabel = true;
    try {
      const raw = e.detail.image;
      const result = await this.hass.callWS({
        type: "wine_cellar/recognize_label",
        image: raw,
      });
      if (result.error) {
        alert(result.error);
        return;
      }
      const r = result.result;
      if (!r) {
        alert(this._t("ui.wineDetail.couldNotIdentifyLabel"));
        return;
      }
      const thumbUrl = await resizeImageForStorage(raw);
      const updates: Record<string, any> = {};
      if (thumbUrl) updates.image_url = thumbUrl;
      if (r.name) updates.name = r.name;
      if (r.winery) updates.winery = r.winery;
      if (r.vintage) updates.vintage = r.vintage;
      if (r.type) updates.type = r.type;
      if (r.region) updates.region = r.region;
      if (r.country) updates.country = r.country;
      if (r.grape_variety) updates.grape_variety = r.grape_variety;
      if (r.description) updates.description = r.description;
      if (r.estimated_price) updates.retail_price = r.estimated_price;
      await this.hass.callWS({
        type: "wine_cellar/update_wine",
        wine_id: this.wine.id,
        updates,
      });
      if (!this._applyIfStillShowing(wineId, updates)) return;
      this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
    } catch (err) {
      console.error("Label scan failed", err);
      alert(this._t("ui.wineDetail.labelScanFailed"));
    }
    this._scanningLabel = false;
  }

  private _splitPairings(text: string): string[] {
    const result: string[] = [];
    let depth = 0;
    let current = "";
    for (const ch of text) {
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      if (ch === "," && depth === 0) {
        if (current.trim()) result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) result.push(current.trim());
    return result;
  }

  // Purchase date is stored as a plain "YYYY-MM-DD" string (from a native
  // date input); displayed in the viewer's own locale order instead of
  // always showing the raw ISO order. The literal "T00:00:00" makes the
  // Date parse as local midnight rather than UTC midnight, so a negative
  // UTC-offset timezone doesn't roll it back a day.
  private _formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00`);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(this.hass?.language, { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  private _hasTastingNotes(): boolean {
    const n = this._tastingNotes;
    return !!(n.aroma || n.taste || n.finish || n.overall);
  }

  // A check later than the last update means that attempt found nothing —
  // worth showing, so a fruitless retry stays visibly different from never
  // having tried at all.
  private _renderSourceDates(updatedAt: string | null, checkedAt: string | null) {
    if (!updatedAt) {
      return html`${this._t("ui.wineDetail.nothingFoundChecked", { date: this._formatUpdatedAt(checkedAt) })}`;
    }
    if (checkedAt && checkedAt > updatedAt) {
      return html`${this._t("ui.wineDetail.recheckedNothingNew", {
        date1: this._formatUpdatedAt(updatedAt),
        date2: this._formatUpdatedAt(checkedAt),
      })}`;
    }
    return html`${this._formatUpdatedAt(updatedAt)}`;
  }

  private _formatUpdatedAt(iso: string | null): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  private _renderEditForm() {
    const d = this._editData;
    return html`
      <div class="edit-form">
        <div class="form-group">
          <label>${this._t("ui.wineDetail.wineNameLabel")}</label>
          <input type="text" .value=${d.name}
            @input=${(e: Event) => this._updateEditField("name", (e.target as HTMLInputElement).value)} />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${producerLabel(d.type, this.hass?.language)}</label>
            <input type="text" .value=${d.winery}
              @input=${(e: Event) => this._updateEditField("winery", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.vintageLabel")}</label>
            <input type="number" .value=${d.vintage?.toString() || ""}
              @input=${(e: Event) => this._updateEditField("vintage", (e.target as HTMLInputElement).value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.typeLabel")}</label>
            <select .value=${d.type}
              @change=${(e: Event) => this._updateEditField("type", (e.target as HTMLSelectElement).value)}>
              ${getSelectableWineTypes(this.enableWhisky || d.type === "whisky", this.hass?.language).map(
                ([value, label]) => html`<option value=${value} ?selected=${d.type === value}>${label}</option>`
              )}
            </select>
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.purchasePriceLabel")}</label>
            <input type="number" step="0.01" .value=${d.price?.toString() || ""}
              @input=${(e: Event) => this._updateEditField("price", (e.target as HTMLInputElement).value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.currentValueLabel")}</label>
            <input type="number" step="0.01" .value=${d.retail_price?.toString() || ""}
              @input=${(e: Event) => this._updateEditField("retail_price", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.regionLabel")}</label>
            <input type="text" .value=${d.region}
              @input=${(e: Event) => this._updateEditField("region", (e.target as HTMLInputElement).value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.countryLabel")}</label>
            <input type="text" .value=${d.country}
              @input=${(e: Event) => this._updateEditField("country", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${varietyLabel(d.type, false, this.hass?.language)}</label>
            <input type="text" .value=${d.grape_variety}
              @input=${(e: Event) => this._updateEditField("grape_variety", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.alcoholLabel")}</label>
            <input type="text" .value=${d.alcohol} placeholder="${this._t('ui.wineDetail.alcoholPlaceholder')}"
              @input=${(e: Event) => this._updateEditField("alcohol", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.servingTempLabel")}</label>
            <input type="text" .value=${d.serving_temp} placeholder="${this._t(usesFahrenheit(this.hass) ? 'ui.wineDetail.servingTempPlaceholderF' : 'ui.wineDetail.servingTempPlaceholder')}"
              @input=${(e: Event) => this._updateEditField("serving_temp", (e.target as HTMLInputElement).value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.purchaseDateLabel")}</label>
            <input type="date" .value=${d.purchase_date}
              @input=${(e: Event) => this._updateEditField("purchase_date", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.drinkFromLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.drinkFromPlaceholder')}" .value=${this._editDrinkFrom}
              @input=${(e: Event) => this._updateDrinkWindowPart("from", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.drinkByLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.drinkByPlaceholder')}" .value=${d.drink_by}
              @input=${(e: Event) => this._updateDrinkWindowPart("by", (e.target as HTMLInputElement).value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.peakWindowLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.peakWindowPlaceholder')}" .value=${d.peak_window || ""}
              @input=${(e: Event) => this._updateEditField("peak_window", (e.target as HTMLInputElement).value)} />
          </div>
        </div>

        <div class="form-group">
          <label>${this._t("ui.wineDetail.notesLabel")}</label>
          <textarea .value=${d.notes}
            @input=${(e: Event) => this._updateEditField("notes", (e.target as HTMLTextAreaElement).value)}></textarea>
        </div>
      </div>

      <div class="edit-actions">
        <button class="btn btn-outline" @click=${this._cancelEditingFields}>${this._t("ui.common.cancel")}</button>
        <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._saveFields}>
          ${this._saving ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
        </button>
      </div>
    `;
  }

  render() {
    if (!this.open || !this.wine) return nothing;

    const wine = this.wine;
    const typeColor = WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
    const typeLabel = getWineTypeLabels(this.hass?.language)[wine.type as WineType] || wine.type;
    const showingBack = this._photoSide === "back";
    const currentImageUrl = showingBack ? wine.back_image_url : wine.image_url;

    return html`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="position:relative" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-top-bar">
            ${this.mode !== "winelist"
              ? html`<button class="icon-btn" title="${this._t('ui.common.edit')}" @click=${this._startEditingFields}>✏️</button>`
              : nothing}
            <button class="icon-btn close-btn" title="${this._t('ui.common.close')}" @click=${this._close}>✕</button>
          </div>
          <div class="wine-header">
            <div class="wine-image-col">
              <div
                class="wine-image-wrap"
                @pointerdown=${this._onImageSwipeStart}
                @pointerup=${this._onImageSwipeEnd}
              >
                ${currentImageUrl
                  ? html`<img class="wine-image" src="${currentImageUrl}" alt="${wine.name}${showingBack ? this._t('ui.wineDetail.backLabelSuffix') : ""}" />`
                  : html`
                      <div class="wine-image-placeholder" style="background: ${typeColor}">
                        🍷
                      </div>
                    `}
                ${showingBack ? html`<div class="photo-side-badge">${this._t('ui.wineDetail.backLabelBadge')}</div>` : nothing}
                <div class="photo-dots">
                  <span
                    class="photo-dot ${this._photoSide === "front" ? "active" : ""}"
                    title="${this._t('ui.wineDetail.frontLabelTitle')}"
                    @click=${() => (this._photoSide = "front")}
                  ></span>
                  <span
                    class="photo-dot ${showingBack ? "active" : ""}"
                    title="${this._t('ui.wineDetail.backLabelBadge')}"
                    @click=${() => (this._photoSide = "back")}
                  ></span>
                </div>
                ${this.mode !== "winelist"
                  ? html`
                      <div class="photo-actions">
                        <button
                          class="photo-action-btn"
                          title="${showingBack ? this._t('ui.wineDetail.replaceBackPhotoTitle') : this._t('ui.wineDetail.replacePhotoTitle')}"
                          ?disabled=${this._photoBusy}
                          @click=${() => (this._showPhotoCamera = true)}
                        >📷</button>
                        ${currentImageUrl
                          ? html`<button
                              class="photo-action-btn"
                              title="${showingBack ? this._t('ui.wineDetail.deleteBackPhotoTitle') : this._t('ui.wineDetail.deletePhotoTitle')}"
                              ?disabled=${this._photoBusy}
                              @click=${this._onDeletePhoto}
                            >🗑️</button>`
                          : nothing}
                      </div>
                    `
                  : nothing}
              </div>
              ${this.mode === "cellar"
                ? html`
                    <div class="wine-location" title="${this._t('ui.wineDetail.tapToLocate')}" @click=${this._onLocate}>
                      📍 ${getWineLocation(wine, this.cabinets, this.hass?.language).text}
                    </div>
                  `
                : nothing}
            </div>
            <div class="wine-title">
              <div class="wine-name">${wine.name}</div>
              <div class="wine-winery">${wine.winery}</div>
              <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
                <span class="wine-type-badge" style="background: ${typeColor}">
                  ${typeLabel}
                </span>
                ${wine.disposition
                  ? html`<span class="wine-type-badge" style="background: ${
                      wine.disposition === "D" ? "#2e7d32" :
                      wine.disposition === "H" ? "#1565c0" :
                      wine.disposition === "P" ? "#c62828" : "#666"
                    }">${
                      wine.disposition === "D" ? this._t("ui.disposition.drinkNow") :
                      wine.disposition === "H" ? this._t("ui.disposition.hold") :
                      wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : wine.disposition
                    }</span>`
                  : nothing}
              </div>
              ${wine.rating
                ? html`
                    <div class="wine-rating">
                      <span class="rating-star">★</span>
                      ${wine.rating.toFixed(1)}
                      <span style="font-size:0.8em;color:var(--wc-text-secondary)">
                        Vivino${wine.ratings_count ? this._t('ui.wineDetail.ratingsCountSuffix', { count: wine.ratings_count.toLocaleString() }) : ""}
                      </span>
                    </div>
                  `
                : nothing}
              ${this.mode !== "winelist"
                ? html`
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;font-size:0.9em">
                      <span style="font-size:0.8em;color:var(--wc-text-secondary)">${this._t('ui.wineDetail.myRating')}</span>
                      <star-rating
                        .value=${this._userRating}
                        .readonly=${!this._editing}
                        .size=${20}
                        @rating-change=${this._onRatingChange}
                      ></star-rating>
                      ${!this._editing && this._userRating === 0
                        ? html`<span class="no-rating" style="font-size:0.8em">${this._t('ui.common.notRated')}</span>`
                        : nothing}
                      <button class="edit-toggle" style="font-size:0.75em;padding:2px 6px" @click=${() => (this._editing = !this._editing)}>
                        ${this._editing ? this._t('ui.common.cancel') : this._t('ui.common.edit')}
                      </button>
                    </div>
                  `
                : nothing}
            </div>
          </div>

          ${!this._editingFields && (this.mode === "cellar" || this.mode === "buylist")
            ? html`
                <div class="actions grouped">
                  <div class="action-cards">
                    <div class="action-card">
                      <button class="btn btn-primary" style="background:#8e24aa"
                        ?disabled=${this._refreshing || this._analyzing} @click=${this._onLookup}
                        title="${this._t('ui.wineDetail.lookupTitle')}">
                        ${this._refreshing || this._analyzing ? "..." : `🔎 ${this._t("ui.wineDetail.lookupBtn")}`}
                      </button>
                      ${this.hasGemini
                        ? html`<button class="btn btn-primary" style="background:#2e7d32"
                            ?disabled=${this._scanningLabel} @click=${() => (this._showLabelCamera = true)}
                            title="${this._t('ui.wineDetail.scanLabelTitle')}">
                            ${this._scanningLabel ? "..." : `📷 ${this._t("ui.wineDetail.scanLabelBtn")}`}
                          </button>`
                        : nothing}
                    </div>
                    <div class="action-card">
                      ${this.mode === "cellar"
                        ? html`
                            <button class="btn btn-primary" style="background:#546e7a" @click=${this._onCopy}>📋 ${this._t("ui.wineDetail.copyBtn")}</button>
                            <button class="btn btn-primary" style="background:#6d4c41" @click=${this._onMove}>↔ ${this._t("ui.wineDetail.moveBtn")}</button>
                            ${wine.cabinet_id
                              ? html`<button class="btn btn-primary" style="background:#ef6c00" @click=${this._moveToUnassigned}>📦 ${this._t("ui.wineDetail.unassignBtn")}</button>`
                              : nothing}
                          `
                        : nothing}
                      <button class="btn btn-primary" style="background:#c62828"
                        @click=${this._onRemove}>✕ ${this._t("ui.wineDetail.removeBtn")}</button>
                    </div>
                  </div>
                  ${this.mode === "cellar"
                    ? html`<button class="btn btn-primary drink-btn" style="background:#722F37"
                        @click=${this._onDrink}>🍷 ${this._t("ui.wineDetail.drinkBtn")}</button>`
                    : nothing}
                </div>
                ${wine.vivino_checked_at || wine.ai_checked_at || wine.vivino_updated_at || wine.ai_updated_at
                  ? html`
                      <div style="text-align:center;font-size:0.68em;color:var(--wc-text-secondary);margin-top:-6px;padding-bottom:10px">
                        ${wine.vivino_checked_at || wine.vivino_updated_at
                          ? html`${wine.vivino_id
                              ? html`<a
                                  href="https://www.vivino.com/w/${wine.vivino_id}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style="color:inherit;text-decoration:underline"
                                  @click=${(e: Event) => e.stopPropagation()}
                                >Vivino</a>`
                              : html`Vivino`}${this._t("ui.common.colonSep")}${this._renderSourceDates(
                                wine.vivino_updated_at,
                                wine.vivino_checked_at
                              )}`
                          : nothing}
                        ${(wine.vivino_checked_at || wine.vivino_updated_at) &&
                        (wine.ai_checked_at || wine.ai_updated_at)
                          ? " · "
                          : nothing}
                        ${wine.ai_checked_at || wine.ai_updated_at
                          ? html`${this._t("ui.wineDetail.aiLabel")}${this._t("ui.common.colonSep")}${this._renderSourceDates(wine.ai_updated_at, wine.ai_checked_at)}`
                          : nothing}
                      </div>
                    `
                  : nothing}
              `
            : nothing}

          ${this._editingFields
            ? this._renderEditForm()
            : html`
                <!-- Drink by banner for disposition wines -->
                ${wine.disposition
                  ? html`
                      <div class="drink-by-banner ${wine.disposition === 'D' ? 'drink' : wine.disposition === 'H' ? 'hold' : wine.disposition === 'P' ? 'past' : ''} ${wine.disposition === 'D' && this._isInOrAfterPeakWindow(wine) ? 'peak' : ''}">
                        ${wine.disposition === "D"
                          ? (wine.drink_window
                              ? (wine.peak_window ? this._t("ui.wineDetail.drinkNowWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.drinkNowWithWindow", { window: wine.drink_window }))
                              : this._t("ui.wineDetail.drinkNowPlain"))
                          : wine.disposition === "H"
                            ? (wine.drink_window
                                ? (wine.peak_window ? this._t("ui.wineDetail.holdWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.holdWithWindow", { window: wine.drink_window }))
                                : wine.drink_by ? this._t("ui.wineDetail.holdUntil", { date: wine.drink_by }) : this._t("ui.wineDetail.holdPlain"))
                            : (wine.drink_window
                                ? (wine.peak_window ? this._t("ui.wineDetail.pastPeakWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.pastPeakWithWindow", { window: wine.drink_window }))
                                : this._t("ui.wineDetail.pastPeakPlain"))}
                      </div>
                    `
                  : nothing}

                ${this._renderChamberingBanner(wine)}

                <!-- Description -->
                ${wine.description
                  ? html`<div class="wine-description">${wine.description}</div>`
                  : nothing}

                <!-- Info chips (grape, food, alcohol, serving temp, etc.) -->
                ${wine.food_pairings || wine.alcohol || wine.serving_temp || wine.grape_variety
                  ? html`
                      <div class="info-chips">
                        ${wine.grape_variety
                          ? html`<span class="info-chip"><span class="info-chip-icon">🍇</span> ${wine.grape_variety}</span>`
                          : nothing}
                        ${wine.alcohol
                          ? html`<span class="info-chip"><span class="info-chip-icon">%</span> ${wine.alcohol}</span>`
                          : nothing}
                        ${wine.serving_temp
                          ? html`<span class="info-chip"><span class="info-chip-icon">🌡️</span> ${formatServingTemp(wine.serving_temp, this.hass)}</span>`
                          : nothing}
                        ${wine.food_pairings
                          ? this._splitPairings(wine.food_pairings).map(
                              (food: string) => html`<span class="info-chip">${food}</span>`
                            )
                          : nothing}
                      </div>
                    `
                  : nothing}

                <!-- AI Ratings -->
                ${wine.ai_ratings && Object.keys(wine.ai_ratings).length > 0
                  ? html`
                      <div class="ai-ratings">
                        ${wine.ai_ratings.rating_ws ? html`<span class="ai-rating-chip">${wine.ai_ratings.rating_ws} <span class="source">WS</span></span>` : nothing}
                        ${wine.ai_ratings.rating_rp ? html`<span class="ai-rating-chip">${wine.ai_ratings.rating_rp} <span class="source">RP</span></span>` : nothing}
                        ${wine.ai_ratings.rating_jd ? html`<span class="ai-rating-chip">${wine.ai_ratings.rating_jd} <span class="source">JD</span></span>` : nothing}
                        ${wine.ai_ratings.rating_ag ? html`<span class="ai-rating-chip">${wine.ai_ratings.rating_ag} <span class="source">AG</span></span>` : nothing}
                      </div>
                    `
                  : nothing}

                <!-- Drink window (shown when no disposition banner) -->
                ${!(wine.disposition) && wine.drink_window
                  ? html`<div class="drink-window">${this._t("ui.wineDetail.drinkWindowPrefix", { window: wine.drink_window })}</div>`
                  : nothing}

                <div class="details-grid">
                  ${wine.vintage
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.vintageLabel")}</span><span class="detail-value">${wine.vintage}</span></div>`
                    : nothing}
                  ${wine.region
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.regionLabel")}</span><span class="detail-value">${wine.region}</span></div>`
                    : nothing}
                  ${wine.country
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.countryLabel")}</span><span class="detail-value">${wine.country}</span></div>`
                    : nothing}
                  ${wine.price
                    ? html`<div class="detail-item"><span class="detail-label">${this.mode === "winelist" ? this._t("ui.wineDetail.priceLabel") : this._t("ui.wineDetail.purchasePriceLabel")}</span><span class="detail-value">${this.currency} ${wine.price.toFixed(2)}</span></div>`
                    : nothing}
                  ${wine.retail_price
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.currentValueLabel")}</span><span class="detail-value">${wine.retail_price_currency || this.currency} ${wine.retail_price.toFixed(2)}</span></div>`
                    : nothing}
                  ${wine.purchase_date && this.mode === "cellar"
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.purchasedLabel")}</span><span class="detail-value">${this._formatDate(wine.purchase_date)}</span></div>`
                    : nothing}
                  ${wine.drink_by && !wine.disposition
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.drinkByLabel")}</span><span class="detail-value">${wine.drink_by}</span></div>`
                    : nothing}
                  ${wine.barcode && this.mode === "cellar"
                    ? html`<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.barcodeLabel")}</span><span class="detail-value">${wine.barcode}</span></div>`
                    : nothing}
                </div>

                ${wine.notes
                  ? html`
                      <div class="wine-notes">
                        <div class="detail-label" style="margin-bottom: 4px">${this._t("ui.wineDetail.notesLabel")}</div>
                        <div class="wine-notes-text">${wine.notes}</div>
                      </div>
                    `
                  : nothing}

                ${this.mode !== "winelist" ? html`
                <div class="divider"></div>

                <!-- Tasting Notes section -->
                <div class="section">
                  <div class="section-header">
                    <span class="section-title">${this._t("ui.wineDetail.tastingNotesTitle")}</span>
                  </div>
                  ${this._editing
                    ? html`
                        <div class="tasting-grid">
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.aromaLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.aroma}
                              placeholder="${this._t('ui.wineDetail.aromaPlaceholder')}"
                              @input=${(e: Event) => this._onTastingChange("aroma", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.tasteLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.taste}
                              placeholder="${this._t('ui.wineDetail.tastePlaceholder')}"
                              @input=${(e: Event) => this._onTastingChange("taste", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.finishLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.finish}
                              placeholder="${this._t('ui.wineDetail.finishPlaceholder')}"
                              @input=${(e: Event) => this._onTastingChange("finish", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.overallLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.overall}
                              placeholder="${this._t('ui.wineDetail.overallPlaceholder')}"
                              @input=${(e: Event) => this._onTastingChange("overall", e)}
                            ></textarea>
                          </div>
                        </div>
                        <div style="margin-top: 12px; text-align: right">
                          <button
                            class="btn btn-primary"
                            ?disabled=${this._saving}
                            @click=${this._saveRating}
                          >
                            ${this._saving ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
                          </button>
                        </div>
                      `
                    : this._hasTastingNotes()
                      ? html`
                          <div class="tasting-grid">
                            ${this._tastingNotes.aroma
                              ? html`<div class="tasting-field"><label>${this._t("ui.wineDetail.aromaLabel")}</label><div class="tasting-value">${this._tastingNotes.aroma}</div></div>`
                              : nothing}
                            ${this._tastingNotes.taste
                              ? html`<div class="tasting-field"><label>${this._t("ui.wineDetail.tasteLabel")}</label><div class="tasting-value">${this._tastingNotes.taste}</div></div>`
                              : nothing}
                            ${this._tastingNotes.finish
                              ? html`<div class="tasting-field"><label>${this._t("ui.wineDetail.finishLabel")}</label><div class="tasting-value">${this._tastingNotes.finish}</div></div>`
                              : nothing}
                            ${this._tastingNotes.overall
                              ? html`<div class="tasting-field full-width"><label>${this._t("ui.wineDetail.overallLabel")}</label><div class="tasting-value">${this._tastingNotes.overall}</div></div>`
                              : nothing}
                          </div>
                        `
                      : html`<div class="no-rating">${this._t("ui.wineDetail.noTastingNotes")}</div>`
                  }
                </div>
                ` : nothing}

              `}
          ${this._showRemoveConfirm ? html`
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.removeWineTitle")}</h3>
                <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.removeWineQuestion")}</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
                  ${getRemovalReasons(this.hass?.language).map(r => html`
                    <button
                      style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em;transition:all 0.15s"
                      @click=${() => this._confirmRemove(r.id)}
                    >${r.label}</button>
                  `)}
                </div>
                <button
                  style="margin-top:12px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showRemoveConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          ` : nothing}
          ${this._showDrinkDialog ? html`
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:340px;width:90%;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.drinkTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.drinkIntro")}</p>
                <div style="margin-bottom:10px">
                  <star-rating
                    .value=${this._drinkRating}
                    @rating-change=${(e: CustomEvent) => (this._drinkRating = e.detail.value)}
                  ></star-rating>
                </div>
                <textarea
                  rows="3"
                  style="width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--wc-border);background:var(--wc-surface, transparent);color:var(--wc-text);font:inherit;font-size:0.85em;resize:vertical"
                  placeholder="${this._t("ui.wineDetail.drinkNotesPlaceholder")}"
                  .value=${this._drinkNotes}
                  @input=${(e: Event) => (this._drinkNotes = (e.target as HTMLTextAreaElement).value)}
                ></textarea>
                <label style="display:flex;align-items:center;gap:8px;margin:10px 0 16px;font-size:0.9em;color:var(--wc-text);cursor:pointer;text-align:left">
                  <input type="checkbox" .checked=${this._drinkBuyAgain}
                    @change=${(e: Event) => (this._drinkBuyAgain = (e.target as HTMLInputElement).checked)} />
                  <span>🛒 ${this._t("ui.wineDetail.buyAgainLabel")}
                    <small style="display:block;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.buyAgainHint")}</small></span>
                </label>
                <div style="display:flex;gap:8px;justify-content:center">
                  <button class="btn btn-primary" style="background:#722F37" @click=${this._confirmDrink}>🍷 ${this._t("ui.wineDetail.drinkConfirmBtn")}</button>
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${() => (this._showDrinkDialog = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
          ${this._pendingVivinoImage ? html`
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.vivinoPhotoAvailableTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.vivinoPhotoAvailableBody")}</p>
                <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
                  <div style="text-align:center">
                    <img src="${wine.image_url}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2)" />
                    <div style="font-size:0.7em;color:var(--wc-text-secondary);margin-top:4px">${this._t("ui.wineDetail.currentPhotoLabel")}</div>
                  </div>
                  <div style="text-align:center">
                    <img src="${this._pendingVivinoImage}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2)" />
                    <div style="font-size:0.7em;color:var(--wc-text-secondary);margin-top:4px">Vivino</div>
                  </div>
                </div>
                <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
                  <button
                    style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                    @click=${this._dismissVivinoPhoto}
                  >${this._t("ui.wineDetail.keepMyPhotoBtn")}</button>
                  <button class="btn btn-primary" style="background:#8e24aa" @click=${this._applyVivinoPhoto}>${this._t("ui.wineDetail.useVivinoPhotoBtn")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
          ${this._showPhotoCamera ? html`
            <div
              style="position:absolute;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px;padding:16px"
              @click=${() => (this._showPhotoCamera = false)}
            >
              <div style="width:100%" @click=${(e: Event) => e.stopPropagation()}>
                <label-camera .hass=${this.hass} .active=${this._showPhotoCamera} @photo-captured=${this._onPhotoReplaced}></label-camera>
                <div style="text-align:center;margin-top:12px">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.85em"
                    @click=${() => (this._showPhotoCamera = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
          ${this._showLabelCamera ? html`
            <div
              style="position:absolute;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px;padding:16px"
              @click=${() => (this._showLabelCamera = false)}
            >
              <div style="width:100%" @click=${(e: Event) => e.stopPropagation()}>
                <label-camera .hass=${this.hass} .active=${this._showLabelCamera} @photo-captured=${this._onLabelPhotoScanned}></label-camera>
                <div style="text-align:center;margin-top:12px">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.85em"
                    @click=${() => (this._showLabelCamera = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
          ${this._showLookupChooser ? html`
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px"
              @click=${() => (this._showLookupChooser = false)}>
              <div style="background:var(--wc-bg);border-radius:12px;padding:20px;max-width:320px;width:90%" @click=${(e: Event) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.lookupChooserTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.lookupChooserIntro")}</p>
                <div class="lookup-options">
                  <button class="lookup-option" style="background:#8e24aa" @click=${() => this._pickLookup("vivino")}>
                    <span>🍇 Vivino</span>
                    <small>${this._t("ui.wineDetail.lookupVivinoDesc")}</small>
                  </button>
                  <button class="lookup-option" style="background:#1565c0" @click=${() => this._pickLookup("ai")}>
                    <span>🤖 ${this._t("ui.wineDetail.aiScanBtn")}</span>
                    <small>${this._t("ui.wineDetail.lookupAiDesc")}</small>
                  </button>
                  <button class="lookup-option" style="background:#78909c"
                    ?disabled=${this._resettingAiContent} @click=${() => this._pickLookup("reset")}>
                    <span>♻️ ${this._t("ui.wineDetail.resetAiContentBtn")}</span>
                    <small>${this._t("ui.wineDetail.resetAiContentTitle")}</small>
                  </button>
                </div>
                <div style="text-align:center">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${() => (this._showLookupChooser = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
          ${this._aiFallbackReason ? html`
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e: Event) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._aiFallbackReason === "no_match" ? this._t("ui.wineDetail.noVivinoMatchTitle") : this._t("ui.wineDetail.noPriceFoundTitle")}</h3>
                <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">${this._aiFallbackReason === "no_match"
                  ? this._t("ui.wineDetail.vivinoNoMatchBody")
                  : this._t("ui.wineDetail.vivinoNoPriceBody")}</p>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <button class="btn btn-primary" style="background:#1565c0" @click=${() => this._confirmAiFallback(false)}>${this._t("ui.wineDetail.useAiOnceBtn")}</button>
                  <button
                    style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                    @click=${() => this._confirmAiFallback(true)}
                  >${this._t("ui.wineDetail.alwaysUseAiBtn")}</button>
                  <button
                    style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${this._dismissAiFallback}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}
