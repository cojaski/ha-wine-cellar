import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Cabinet, Wine, StorageRow, WINE_TYPE_COLORS, WineType, getShelfSlotGroups, ShelfSlotGroup, getSteppedSlotGroups, SteppedSlotGroup } from "../models";
import { sharedStyles } from "../styles";
import { t } from "../i18n";
import { readSensorValue } from "../utils/chambering";

@customElement("cabinet-grid")
export class CabinetGrid extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) cabinet!: Cabinet;
  @property({ attribute: false }) wines: Wine[] = [];
  // Set briefly by "locate" so the bottle is marked on the rack drawing too,
  // not just in the side panel's slot list.
  @property({ attribute: false }) highlightWineId: string | null = null;
  // Candidates for a pending Vivino removal: every listed bottle gets an
  // orange ring so the user can see which ones may be the removed bottle.
  @property({ attribute: false }) removalHighlightIds: string[] = [];
  // Set for as long as a long-press move is pending (Android's stand-in
  // for drag-and-drop) — dims that one bottle so it's clear which one is
  // "picked up" and waiting for a target tap, until the move completes or
  // is cancelled. Deliberately its own reactive class, not the .drag-source
  // that _onDragStart/_onDragEnd toggle: that one only tracks a real HTML5
  // drag gesture, which touch-and-hold can trigger by accident without
  // ever firing a matching dragend (see _onTouchEnd's own cleanup) — tying
  // the "picked up" look to _movingWine's own lifecycle instead means it
  // can't desync from either end of that.
  @property({ attribute: false }) movingWineId: string | null = null;
  // "letter" (default): the classic D/H/P badge. "dot": a plain colored
  // circle with no letter (green/blue/purple) — a settings-level choice,
  // not per-bottle.
  @property({ type: String }) dispositionDisplay: "letter" | "dot" = "letter";

  @state() private _dragOverCell: string | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .cabinet {
        background: linear-gradient(135deg, #8b6914 0%, #c4973b 50%, #8b6914 100%);
        border-radius: 12px;
        padding: 8px;
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3),
          0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .cabinet-name {
        text-align: center;
        color: #f5e6ca;
        font-size: 0.8em;
        font-weight: 600;
        padding: 4px 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      .cabinet-name.clickable {
        cursor: pointer;
        border-radius: 6px;
      }

      .cabinet-name.clickable:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .grid-inner {
        background: linear-gradient(180deg, #1a1a3a 0%, #0d0d2b 100%);
        border-radius: 8px;
        padding: 6px;
        position: relative;
        overflow: hidden;
      }

      /* Blue LED glow effect */
      .grid-inner::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          ellipse at center,
          rgba(50, 100, 255, 0.15) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .row {
        display: flex;
        gap: 2px;
        margin-bottom: 2px;
        padding: 0 4px;
        box-sizing: border-box;
        position: relative;
      }

      /* Scalloped shelf appearance */
      .row::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6b5010 0%, #a07828 50%, #6b5010 100%);
        border-radius: 0 0 2px 2px;
      }

      .cell {
        flex: 1;
        aspect-ratio: 1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        min-width: 0;
        z-index: 1;
        container-type: inline-size;
        box-sizing: border-box;
      }

      .cell.empty {
        background: rgba(255, 255, 255, 0.05);
        /* Same 2px width as .filled below — see the longer note on
           .zone-shelf-dot's empty state for why this has to match. */
        border: 2px dashed rgba(255, 255, 255, 0.15);
      }

      .cell.empty:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .cell.filled {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 0 8px rgba(50, 100, 255, 0.15);
        border: 2px solid var(--bottle-type-color, rgba(255, 255, 255, 0.1));
        overflow: hidden;
      }

      .cell .wine-thumb,
      .zone-shelf-dot .wine-thumb {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .cell.filled:hover {
        transform: scale(1.15);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5),
          0 0 16px rgba(50, 100, 255, 0.3);
      }

      .cell .bottle-label {
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 6px;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40px;
        display: none;
        pointer-events: none;
      }

      .cell.filled:hover .bottle-label {
        display: block;
      }

      /* "Locate" marker: a pulsing ring drawn outside the element so it
         reads on a filled bottle, an empty slot and a box alike. */
      .locate-highlight {
        position: relative;
        z-index: 3;
        outline: 2px solid rgba(255, 193, 7, 0.9);
        outline-offset: 1px;
        animation: locatePulse 1.2s ease-in-out 3;
        border-radius: inherit;
      }

      @keyframes locatePulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          outline: 2px solid rgba(255, 193, 7, 0.9);
          outline-offset: 1px;
        }
        50% {
          box-shadow: 0 0 10px 4px rgba(255, 193, 7, 0.65);
          outline: 2px solid rgba(255, 193, 7, 1);
          outline-offset: 2px;
        }
      }

      /* Pending-Vivino-removal candidate: a steady orange ring that pulses
         for as long as the choice is active (unlike the 3-cycle locate). */
      .removal-highlight {
        position: relative;
        z-index: 3;
        outline: 2px solid rgba(255, 109, 0, 0.95);
        outline-offset: 1px;
        animation: removalPulse 1.2s ease-in-out infinite;
        border-radius: inherit;
      }

      @keyframes removalPulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(255, 109, 0, 0);
        }
        50% {
          box-shadow: 0 0 10px 4px rgba(255, 109, 0, 0.65);
        }
      }

      .cell .disposition,
      .zone-shelf-dot .disposition {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 65%;
        height: 65%;
        border-radius: 50%;
        font-size: clamp(7px, 30cqi, 14px);
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        border: 2px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      }

      .cell .disposition.drink,
      .zone-bottle .disposition.drink,
      .zone-shelf-dot .disposition.drink {
        background: #2e7d32;
      }

      .cell .disposition.drink.peak,
      .zone-bottle .disposition.drink.peak,
      .zone-shelf-dot .disposition.drink.peak {
        background: #1b5e20;
        font-weight: 600;
      }

      .cell .disposition.hold,
      .zone-bottle .disposition.hold,
      .zone-shelf-dot .disposition.hold {
        background: #1565c0;
      }

      .cell .disposition.past,
      .zone-bottle .disposition.past,
      .zone-shelf-dot .disposition.past {
        background: #c62828;
      }

      .cell .rating-badge {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 6px;
        font-weight: 700;
        color: #fff;
        background: rgba(0,0,0,0.6);
        border-radius: 4px;
        padding: 1px 3px;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        display: none;
      }

      .cell.filled:hover .rating-badge {
        display: block;
      }

      .cell .depth-badge {
        position: absolute;
        top: -2px;
        left: -2px;
        font-size: 7px;
        font-weight: 700;
        color: #fff;
        background: rgba(30, 136, 229, 0.85);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      }

      .depth-dots {
        position: absolute;
        /* Clear of the Drink/Hold/Past pill along the bottom edge. */
        bottom: 26%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 3px;
        z-index: 3;
        pointer-events: none;
      }

      .depth-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
      }

      .depth-dot.empty {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .bottom-zone {
        margin-top: 8px;
        background: linear-gradient(135deg, #6b5010 0%, #8b6914 100%);
        border-radius: 6px;
        padding: 8px;
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }

      .bottom-zone-label {
        font-size: 0.65em;
        color: rgba(255, 255, 255, 0.6);
        width: 100%;
        text-align: center;
      }

      .zone-sensor-badge {
        display: block;
        font-size: 0.75em;
        font-weight: 400;
        opacity: 0.85;
      }

      .zone-bottle {
        position: relative;
        width: 28px;
        height: 28px;
        /* Sizes its Drink/Hold/Past pill (cqi) like a rack cell's. */
        container-type: inline-size;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }

      .zone-bottle .disposition {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68%;
        height: 68%;
        border-radius: 50%;
        font-size: 9px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }

      /* A short text pill ("Drink"/"Hold"/"Past") along the bottom edge
         instead of a letter covering the middle of the label. Same colors
         as the badge; only the shape and position change. */
      .cell .disposition,
      .zone-bottle .disposition,
      .zone-shelf-dot .disposition {
        top: auto;
        bottom: 4%;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        height: auto;
        max-width: 92%;
        padding: 2px 6px;
        border-radius: 999px;
        border-width: 1px;
        font-size: clamp(7px, 16cqi, 11px);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .disposition .disp-letter {
        display: none;
      }

      /* Too small for a word: back to the round letter badge. */
      @container (max-width: 25px) {
        .disposition .disp-word {
          display: none;
        }
        .disposition .disp-letter {
          display: inline;
        }
        .cell .disposition,
        .zone-bottle .disposition,
        .zone-shelf-dot .disposition {
          bottom: auto;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 68%;
          height: 68%;
          max-width: none;
          padding: 0;
          border-radius: 50%;
          font-size: 9px;
          font-weight: 700;
        }
      }

      .zone-bottle:hover {
        transform: scale(1.1);
      }

      /* Fridge-style shelf: front/back lanes per board. Every dot in the
         shelf shares one size (set inline from the longest lane anywhere
         in it), so a shorter lane is centered with wider gaps instead of
         rendering smaller dots — deliberately not the receding-stagger
         look of a real photographed shelf. Background is dark like the
         classic grid's interior, with each board getting its own
         golden ledge (matching .row::after) instead of the whole zone
         being solid gold. */
      .zone-shelf {
        background: linear-gradient(180deg, #1a1a3a 0%, #0d0d2b 100%);
      }

      .zone-shelf-levels {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        padding: 2px 0;
      }

      .zone-shelf-level {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: relative;
        padding-bottom: 5px;
      }

      /* Board-to-board seam within the SAME étagère: thin, since it's just
         marking where one stacked board ends and the next begins. */
      .zone-shelf-level::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 1px;
        background: linear-gradient(90deg, #6b5010 0%, #a07828 50%, #6b5010 100%);
        opacity: 0.6;
      }

      /* The bottom-most board of the étagère: this ledge marks the end of
         the whole étagère (before the next one), so it stays full-width
         and full weight instead of the thin board-to-board seam above. */
      .zone-shelf-level.last::after {
        left: 0;
        right: 0;
        height: 3px;
        opacity: 1;
        border-radius: 0 0 2px 2px;
      }

      .zone-shelf-lane {
        display: flex;
        justify-content: center;
        /* Without this, flex's default align-items: stretch forces every
           dot in the row to the tallest one's height regardless of its own
           width — harmless when every dot in a lane is the same size, but
           the interleaved half-size back dots (see _renderShelfZone) got
           stretched into tall ovals instead of staying circular. */
        align-items: center;
        gap: 2px;
        width: 100%;
      }

      .zone-shelf-lane-label {
        font-size: 0.8em;
        font-weight: 600;
        line-height: 1.2;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      }

      /* Same empty/filled treatment as a classic grid cell — a faint,
         dashed outline when empty, a solid ring in the wine's colour
         when filled — rather than the paler, always-visible dot this
         used to be. Hover/drag-over states below deliberately mirror
         .cell's exactly, so a shelf dot enlarges on hover/drag-over the
         same way a grid cell does. */
      .zone-shelf-dot {
        position: relative;
        flex-shrink: 0;
        aspect-ratio: 1;
        min-width: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        /* Same border width as .filled below (2px) — only the dash pattern,
           color and opacity change between empty/filled. A thinner empty
           border would shrink the box itself under content-box sizing, and
           even with box-sizing: border-box (below) a visibly thinner ring
           still reads as a smaller circle next to a bold filled one. */
        border: 2px dashed rgba(255, 255, 255, 0.15);
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        container-type: inline-size;
        z-index: 1;
        transition: all 0.2s;
      }

      .zone-shelf-dot:not(.filled):hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .zone-shelf-dot.filled {
        border: 2px solid var(--bottle-type-color, rgba(255, 255, 255, 0.1));
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 0 8px rgba(50, 100, 255, 0.15);
      }

      .zone-shelf-dot.filled:hover {
        transform: scale(1.15);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5),
          0 0 16px rgba(50, 100, 255, 0.3);
      }

      .zone-shelf-dot[draggable="true"] {
        cursor: grab;
      }

      .zone-shelf-dot[draggable="true"]:active {
        cursor: grabbing;
      }

      .zone-shelf-dot.drag-source {
        opacity: 0.35;
        transform: scale(0.9);
      }

      .zone-shelf-dot.drag-over {
        box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.8);
        transform: scale(1.1);
        background: rgba(66, 165, 245, 0.15) !important;
        z-index: 10;
      }

      /* Drag and drop */
      .cell.drag-source {
        opacity: 0.35;
        transform: scale(0.9);
      }

      /* The one bottle picked up by a long-press, waiting for a target tap
         (see movingWineId) — deliberately lighter than .drag-source and no
         scale change, so it doesn't look like it's about to disappear: this
         state can sit there indefinitely until the user taps a target or
         cancels, unlike an actual drag in progress. */
      .cell.move-source,
      .zone-bottle.move-source,
      .zone-shelf-dot.move-source {
        opacity: 0.5;
      }

      .cell.drag-over {
        box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.8);
        transform: scale(1.1);
        background: rgba(66, 165, 245, 0.15) !important;
        z-index: 10;
      }

      .cell[draggable="true"] {
        cursor: grab;
      }

      .cell[draggable="true"]:active {
        cursor: grabbing;
      }

      .zone-bottle.drag-over {
        box-shadow: 0 0 0 2px rgba(66, 165, 245, 0.8);
        transform: scale(1.15);
      }

      .bottom-zone.drag-over {
        box-shadow: inset 0 0 0 2px rgba(66, 165, 245, 0.8);
        background: rgba(66, 165, 245, 0.1);
      }

      .zone-count {
        font-weight: 400;
        opacity: 0.7;
        margin-left: 4px;
      }

      .zone-fill-dots {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
      }

      .zone-fill-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
      }

      .zone-fill-dot.empty {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .zone-box-row {
        cursor: pointer;
        padding: 4px 8px;
        min-height: 0;
        flex-direction: column;
        align-items: center;
      }

      .zone-box-row:hover {
        background: linear-gradient(135deg, #7a5a12 0%, #9a7820 100%);
      }

      .zone-box-grid {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        justify-content: center;
        padding: 2px 0;
        width: 100%;
      }

      .zone-box-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }

      .zone-box-shape {
        width: 56px;
        height: 36px;
        position: relative;
      }

      .zone-box-shape .box-lid {
        position: absolute;
        top: 0;
        left: -2px;
        right: -2px;
        height: 28%;
        background: linear-gradient(180deg, #a08040 0%, #7a6020 100%);
        border-radius: 2px 2px 0 0;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-bottom: none;
      }

      .zone-box-shape .box-body {
        position: absolute;
        top: 28%;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, #8b6914 0%, #6b5010 100%);
        border-radius: 0 0 2px 2px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .zone-box-shape .box-count {
        font-size: 0.7em;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        line-height: 1;
      }

      .zone-box-item.has-wine .box-count {
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      /* Phone: tighter spacing, smaller elements */
      @media (max-width: 599px) {
        .cabinet {
          padding: 6px;
          border-radius: 10px;
        }
        .cabinet-name {
          font-size: 0.75em;
          padding: 3px 0;
        }
        .grid-inner {
          padding: 4px;
        }
        .row {
          gap: 1px;
          margin-bottom: 1px;
        }
        .row::after {
          height: 2px;
        }
        .cell .bottle-label {
          font-size: 5px;
          max-width: 30px;
        }
        .bottom-zone {
          margin-top: 6px;
          padding: 6px;
          gap: 4px;
          min-height: 32px;
        }
        .bottom-zone-label {
          font-size: 0.6em;
        }
        .zone-bottle {
          width: 22px;
          height: 22px;
          font-size: 7px;
        }
      }

      /* Tablet: moderate sizing */
      @media (min-width: 600px) and (max-width: 1023px) {
        .cabinet {
          padding: 6px;
        }
        .grid-inner {
          padding: 5px;
        }
        .row {
          gap: 2px;
          margin-bottom: 1px;
        }
      }

    `,
  ];

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  private _getWinesAt(row: number, col: number): Wine[] {
    return this.wines.filter(
      (w) =>
        w.cabinet_id === this.cabinet.id && w.row === row && w.col === col
    );
  }

  private _getStorageRowSet(): Set<number> {
    const rows = (this.cabinet as any).storage_rows as StorageRow[] | undefined;
    return new Set((rows || []).map((sr) => sr.row));
  }

  private _getStorageRowConfig(row: number): StorageRow | undefined {
    const rows = (this.cabinet as any).storage_rows as StorageRow[] | undefined;
    return (rows || []).find((s) => s.row === row);
  }

  private _getStorageRowName(row: number): string {
    return this._getStorageRowConfig(row)?.name || this._t("wineLocation.storage");
  }

  private _getBottomZoneWines(): Wine[] {
    return this.wines.filter(
      (w) => w.cabinet_id === this.cabinet.id && w.zone === "bottom"
    );
  }

  // The sensor's own unit (°F in a US home), not an assumed °C.
  private _tempUnit(): string {
    const id = this.cabinet.temp_sensor_entity_id || "";
    return this.hass?.states?.[id]?.attributes?.unit_of_measurement || "°C";
  }

  // Live temperature/humidity of the zone, shown in its title banner.
  private _renderSensorBadge() {
    const temp = readSensorValue(this.hass, this.cabinet.temp_sensor_entity_id || "");
    const humidity = readSensorValue(this.hass, this.cabinet.humidity_sensor_entity_id || "");
    if (temp === null && humidity === null) return nothing;
    return html`
      <span class="zone-sensor-badge">
        ${temp !== null ? html`🌡️ ${temp}${this._tempUnit()}` : nothing}${temp !== null && humidity !== null ? " · " : nothing}${humidity !== null ? html`💧 ${humidity}%` : nothing}
      </span>
    `;
  }

  private _getStorageRowWines(row: number): Wine[] {
    return this.wines
      .filter((w) => w.cabinet_id === this.cabinet.id && w.zone === `storage-${row}`)
      .sort((a, b) => (a.depth || 0) - (b.depth || 0));
  }

  private _onCellClick(row: number, col: number, wine?: Wine, wineCount = 0, cabinetDepth = 1, wines: Wine[] = []) {
    this.dispatchEvent(
      new CustomEvent("cell-click", {
        detail: {
          cabinet: this.cabinet,
          row,
          col,
          wine,
          wines,
          wineCount,
          cabinetDepth,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onZoneClick(wine?: Wine, zone = "bottom", depth?: number) {
    this.dispatchEvent(
      new CustomEvent("zone-click", {
        detail: {
          cabinet: this.cabinet,
          zone,
          wine,
          // Set only for zones with per-slot addressing (shelf): the exact
          // slot clicked, so the card places/pastes there instead of
          // picking a depth itself.
          depth,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onZoneContainerClick(zone: string, storageRow: StorageRow) {
    this.dispatchEvent(
      new CustomEvent("zone-container-click", {
        detail: {
          cabinet: this.cabinet,
          zone,
          storageRow,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _brightenColor(hex: string): string {
    // Make wine type colors brighter for the ring border
    const brightMap: Record<string, string> = {
      "#722F37": "#c44d58",  // red → brighter red
      "#F5E6CA": "#fff8e8",  // white → bright cream
      "#E8A0BF": "#f5c0d8",  // rosé → brighter pink
      "#D4E09B": "#e8f0b8",  // sparkling → brighter green
      "#DAA520": "#f0c040",  // dessert → brighter gold
      "#B5651D": "#d9843a",  // whisky → brighter amber
    };
    return brightMap[hex] || hex;
  }

  private _isInPeakWindow(wine: Wine | undefined): boolean {
    if (!wine?.peak_window) return false;
    const currentYear = new Date().getFullYear();
    const years = wine.peak_window.split("-").map(y => parseInt(y, 10));
    if (years.length === 1) return currentYear === years[0];
    if (years.length === 2) return currentYear >= years[0] && currentYear <= years[1];
    return false;
  }

  // Check if wine is in peak window OR after (plateau d'apogée) — keep dark green until decline phase
  private _isInOrAfterPeakWindow(wine: Wine | undefined): boolean {
    if (!wine?.peak_window || !wine?.drink_window) return false;
    const currentYear = new Date().getFullYear();
    const peakYears = wine.peak_window.split("-").map(y => parseInt(y, 10));
    const drinkYears = wine.drink_window.split("-").map(y => parseInt(y, 10));
    const peakStart = peakYears[0];
    const drinkEnd = drinkYears.length === 2 ? drinkYears[1] : drinkYears[0];
    return currentYear >= peakStart && currentYear <= drinkEnd;
  }

  // The "Drink"/"Hold"/"Past" pill — only in "letter" mode. In "dot" mode
  // there's no badge at all; _dispositionRingStyle below draws the status
  // as a thicker colored ring around the bottle instead, so the photo
  // stays uncovered.
  private _dispositionBadge(dispClass: string, disp: string, wine?: Wine, className = "disposition") {
    if (!dispClass || this.dispositionDisplay === "dot") return nothing;
    const peakClass = dispClass === "drink" && this._isInOrAfterPeakWindow(wine) ? "peak" : "";
    // Both are rendered; a container query picks the letter when the bottle
    // is too small for the word (a dense rack in the all-racks view).
    return html`<span class="${className} ${dispClass} ${peakClass}"><span class="disp-word">${this._t(`ui.disposition.${dispClass}`)}</span><span class="disp-letter">${disp}</span></span>`;
  }

  // "dot" mode's ring: a thicker border colored by disposition (green/blue/
  // purple) instead of the classic centered badge — the whole point is to
  // leave the bottle's own photo unobstructed. Every bottle in this mode
  // gets the same border thickness, whether or not it has a disposition
  // set, so bottle size doesn't jump around depending on which bottles
  // happen to have one; with no disposition, the ring just falls back to
  // the existing wine-type color instead of introducing a new color.
  // Returns "" in "letter" mode, leaving the class's own CSS untouched.
  private _dispositionRingStyle(dispClass: string, typeRingColor: string, wine?: Wine): string {
    if (this.dispositionDisplay !== "dot") return "";
    let color = "#4caf50"; // drink default
    if (dispClass === "drink") {
      color = this._isInOrAfterPeakWindow(wine) ? "#1b5e20" : "#4caf50";
    } else if (dispClass === "hold") {
      color = "#2196f3";
    } else if (dispClass === "past") {
      color = "#c62828";
    } else {
      color = typeRingColor;
    }
    return `border: 4px solid ${color};`;
  }

  // --- Long press (mobile move) ---

  private _longPressTimer: number | null = null;

  private _onTouchStart(wine: Wine) {
    this._longPressTimer = window.setTimeout(() => {
      this._longPressTimer = null;
      this.dispatchEvent(new CustomEvent("wine-longpress", {
        detail: { wine, cabinet: this.cabinet },
        bubbles: true,
        composed: true,
      }));
    }, 500);
  }

  // draggable="true" plus a touch-and-hold can make some Android browsers
  // start a real HTML5 drag on their own from this same touch sequence,
  // even though nothing here calls dragstart deliberately — _onDragStart
  // then adds .drag-source (dimmed + shrunk), but the matching dragend
  // that would remove it is unreliable on touch and often never fires,
  // leaving the bottle stuck looking "picked up" regardless of whether the
  // long-press move that followed was completed or cancelled. Touch ending
  // (released or cancelled by a scroll) is always a safe point to clear it
  // too, on this same element.
  private _onTouchEnd(e?: TouchEvent) {
    if (this._longPressTimer !== null) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
    }
    (e?.currentTarget as HTMLElement | null)?.classList.remove("drag-source");
  }

  private _onTouchMove(e?: TouchEvent) {
    if (this._longPressTimer !== null) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
    }
    (e?.currentTarget as HTMLElement | null)?.classList.remove("drag-source");
  }

  // --- Drag and drop ---

  private _onDragStart(e: DragEvent, wine: Wine, row?: number, col?: number, zone?: string) {
    if (!e.dataTransfer) return;
    e.dataTransfer.setData("text/plain", JSON.stringify({
      wineId: wine.id,
      cabinetId: this.cabinet.id,
      row: row ?? null,
      col: col ?? null,
      zone: zone || "",
      depth: wine.depth ?? null,
    }));
    e.dataTransfer.effectAllowed = "move";
    (e.currentTarget as HTMLElement).classList.add("drag-source");
  }

  private _onDragEnd(e: DragEvent) {
    (e.currentTarget as HTMLElement).classList.remove("drag-source");
    this._dragOverCell = null;
  }

  private _onDragOver(e: DragEvent, key: string) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    this._dragOverCell = key;
  }

  private _onDragLeave(_e: DragEvent) {
    this._dragOverCell = null;
  }

  private _onDrop(e: DragEvent, targetRow?: number, targetCol?: number, targetZone?: string, targetWine?: Wine, explicitDepth?: number) {
    e.preventDefault();
    this._dragOverCell = null;
    if (!e.dataTransfer) return;
    try {
      const source = JSON.parse(e.dataTransfer.getData("text/plain"));

      // Slot zones (shelf) pass their own exact depth — the drop target
      // IS the slot, so skip the "nearest chip" reorder heuristic used
      // for freeform bulk-zone drops and let the card swap/place exactly
      // there instead of picking a depth itself.
      if (explicitDepth !== undefined) {
        this.dispatchEvent(new CustomEvent("wine-drop", {
          detail: {
            wineId: source.wineId,
            sourceCabinetId: source.cabinetId,
            sourceRow: source.row,
            sourceCol: source.col,
            sourceZone: source.zone,
            sourceDepth: source.depth ?? null,
            targetCabinetId: this.cabinet.id,
            targetRow: null,
            targetCol: null,
            targetZone: targetZone || "",
            targetWineId: targetWine?.id ?? null,
            targetDepth: explicitDepth,
            explicitDepth: true,
          },
          bubbles: true,
          composed: true,
        }));
        return;
      }

      // Bulk-zone reordering: figure out which bottle the drop landed
      // nearest to (and which half of it), so dropping anywhere in the zone
      // reorders sensibly instead of only working when the cursor lands
      // exactly on a chip — small chips are hard to hit precisely.
      let effectiveTargetWine = targetWine;
      let insertBefore = true;
      if (effectiveTargetWine) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        insertBefore = e.clientX < rect.left + rect.width / 2;
      } else if (targetZone) {
        const container = e.currentTarget as HTMLElement;
        const chips = Array.from(container.querySelectorAll<HTMLElement>(".zone-bottle"));
        let nearest: HTMLElement | null = null;
        let nearestDist = Infinity;
        for (const chip of chips) {
          if (chip.dataset.wineId === source.wineId) continue;
          const rect = chip.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const dist = Math.abs(e.clientX - cx);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = chip;
          }
        }
        if (nearest) {
          const rect = nearest.getBoundingClientRect();
          insertBefore = e.clientX < rect.left + rect.width / 2;
          effectiveTargetWine = this.wines.find((w) => w.id === nearest!.dataset.wineId);
        }
      }

      this.dispatchEvent(new CustomEvent("wine-drop", {
        detail: {
          wineId: source.wineId,
          sourceCabinetId: source.cabinetId,
          sourceRow: source.row,
          sourceCol: source.col,
          sourceZone: source.zone,
          targetCabinetId: this.cabinet.id,
          targetRow: targetRow ?? null,
          targetCol: targetCol ?? null,
          targetZone: targetZone || "",
          // When dropping on/near another bottle within the same bulk
          // zone, carry its id + which side the drop landed on, so the
          // card can insert relative to it instead of treating it as a
          // same-zone no-op.
          targetWineId: effectiveTargetWine?.id ?? null,
          targetDepth: effectiveTargetWine ? (effectiveTargetWine.depth ?? 0) : null,
          insertBefore,
        },
        bubbles: true,
        composed: true,
      }));
    } catch { /* ignore bad data */ }
  }

  private _renderStorageZone(row: number) {
    const sr = this._getStorageRowConfig(row);
    // No generic "Storage" filler when unnamed — the icon and count already
    // say what this is; an unnamed zone just shows those two.
    const zoneName = sr?.name || "";
    const zoneType = sr?.type || "bulk";
    const capacity = sr?.capacity || 20;
    const zoneId = `storage-${row}`;
    const wines = this._getStorageRowWines(row);
    const zoneKey = `zone-${zoneId}`;
    const isDragOver = this._dragOverCell === zoneKey;

    if (zoneType === "box") {
      return this._renderBoxZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr!);
    }
    if (zoneType === "shelf") {
      return this._renderShelfZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr!);
    }
    if (zoneType === "stepped") {
      return this._renderSteppedZone(zoneId, zoneKey, zoneName, wines, sr!);
    }
    // Default: bulk
    return this._renderBulkZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr!);
  }

  private _renderBulkZone(zoneId: string, zoneKey: string, name: string, capacity: number, wines: Wine[], isDragOver: boolean, sr: StorageRow) {
    return html`
      <div class="bottom-zone ${isDragOver ? "drag-over" : ""}"
        @click=${() => sr ? this._onZoneContainerClick(zoneId, sr) : this._onZoneClick(undefined, zoneId)}
        @dragover=${(e: DragEvent) => this._onDragOver(e, zoneKey)}
        @dragleave=${(e: DragEvent) => this._onDragLeave(e)}
        @drop=${(e: DragEvent) => this._onDrop(e, undefined, undefined, zoneId)}>
        ${name ? html`<div class="bottom-zone-label">${name}</div>` : nothing}
        ${wines.map((wine) => {
          const disp = wine.disposition || "";
          const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
          const bottleKey = `${zoneKey}-${wine.id}`;
          const bgColor = WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
          return html`
            <div
              class="zone-bottle ${this._dragOverCell === bottleKey ? "drag-over" : ""} ${wine.id === this.highlightWineId ? "locate-highlight" : ""} ${this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine.id === this.movingWineId ? "move-source" : ""}"
              style="background: ${bgColor};${this._dispositionRingStyle(dispClass, this._brightenColor(bgColor), wine)}"
              data-wine-id="${wine.id}"
              draggable="true"
              @click=${(e: Event) => {
                e.stopPropagation();
                this._onZoneClick(wine, zoneId);
              }}
              @dragstart=${(e: DragEvent) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); }}
              @dragend=${(e: DragEvent) => this._onDragEnd(e)}
              @dragover=${(e: DragEvent) => { e.stopPropagation(); this._onDragOver(e, bottleKey); }}
              @dragleave=${(e: DragEvent) => { e.stopPropagation(); this._onDragLeave(e); }}
              @drop=${(e: DragEvent) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine); }}
              @touchstart=${(e: TouchEvent) => { e.stopPropagation(); this._onTouchStart(wine); }}
              @touchend=${(e: TouchEvent) => this._onTouchEnd(e)}
              @touchmove=${(e: TouchEvent) => this._onTouchMove(e)}
              title="${wine.name} (${wine.vintage || "NV"})"
            >
              ${(wine.vintage || "NV").toString().slice(-2)}
              ${this._dispositionBadge(dispClass, disp, wine)}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderBoxZone(zoneId: string, zoneKey: string, name: string, capacity: number, wines: Wine[], isDragOver: boolean, sr: StorageRow) {
    const boxes = sr.boxes || [capacity];
    let offset = 0;
    const boxSegments = boxes.map((boxSize) => {
      const start = offset;
      offset += boxSize;
      const boxWines = wines.filter((w) => {
        const d = w.depth || 0;
        return d >= start && d < start + boxSize;
      });
      return {
        size: boxSize,
        start,
        wineCount: boxWines.length,
        hasHighlight:
          !!this.highlightWineId && boxWines.some((w) => w.id === this.highlightWineId),
        hasRemoval:
          this.removalHighlightIds.length > 0 &&
          boxWines.some((w) => this.removalHighlightIds.includes(w.id)),
      };
    });

    return html`
      <div class="bottom-zone zone-box-row ${isDragOver ? "drag-over" : ""}"
        @click=${() => this._onZoneContainerClick(zoneId, sr)}
        @dragover=${(e: DragEvent) => this._onDragOver(e, zoneKey)}
        @dragleave=${(e: DragEvent) => this._onDragLeave(e)}
        @drop=${(e: DragEvent) => this._onDrop(e, undefined, undefined, zoneId)}>
        ${name ? html`<div class="bottom-zone-label">${name}</div>` : nothing}
        <div class="zone-box-grid">
          ${boxSegments.map((seg) => html`
            <div class="zone-box-item ${seg.wineCount > 0 ? "has-wine" : ""} ${seg.hasHighlight ? "locate-highlight" : ""} ${seg.hasRemoval ? "removal-highlight" : ""}">
              <div class="zone-box-shape">
                <div class="box-lid"></div>
                <div class="box-body"><span class="box-count">${seg.wineCount}/${seg.size}</span></div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // Fridge-style shelf: one or more physical boards stacked bottom-to-top,
  // each with its own front and back lane. Every slot has a fixed physical
  // position (unlike a bulk/box pile), so — like a classic grid cell —
  // each dot is its own click/drag/drop target: click an empty one to add
  // there, click an occupied one to open it, drop exactly on the dot you
  // choose. There is no zone side panel for shelves.
  private _renderShelfZone(zoneId: string, zoneKey: string, name: string, capacity: number, wines: Wine[], isDragOver: boolean, sr: StorageRow) {
    const levelsData = sr.shelf_levels || [];
    const groups = getShelfSlotGroups(levelsData);
    const byLevel = new Map<number, { front?: ShelfSlotGroup; back?: ShelfSlotGroup }>();
    for (const g of groups) {
      const entry = byLevel.get(g.level) || {};
      entry[g.lane] = g;
      byLevel.set(g.level, entry);
    }
    // Level 0 is the bottom board (see models.ts) — reverse for display,
    // since flex-direction: column lays out children top-to-bottom.
    const levels = Array.from(byLevel.entries()).sort((a, b) => b[0] - a[0]);

    // One dot size for the whole shelf, sized off whichever level packs the
    // most "weight" into its single interleaved row — front dots count as
    // 1, back dots (rendered at sqrt(0.5) width — half *area*, see
    // BACK_DOT_SCALE below) count as that same fraction, since that's how
    // much horizontal room each actually needs. Using the old two-separate-
    // rows maxCount here (just the bigger of front/back alone) badly
    // undersized this: a row now holds front+back dots combined, not
    // whichever lane was longer, so every dot rendered at roughly double
    // the width it does now, overflowing the frame by that same factor.
    let dominantWeight = 1;
    let dominantItems = 1;
    for (const l of levelsData) {
      const weight = l.front + l.back * Math.SQRT1_2;
      if (weight > dominantWeight) {
        dominantWeight = weight;
        dominantItems = l.front + l.back;
      }
    }
    // Subtracts that level's own gaps, plus a fixed 8px so the row's total
    // width comes out a little under 100% — centered by .zone-shelf-lane's
    // justify-content, that shortfall becomes a ~4px margin on each side
    // instead of the end dots sitting flush against the cabinet's frame.
    const dotBasis = `calc((100% - ${(dominantItems - 1) * 2 + 8}px) / ${dominantWeight})`;

    // EXPERIMENTAL — see conversation 2026-09-14, planned to be rolled back
    // if it doesn't work out. Interleaves the back lane's dots between the
    // front lane's, at half *surface area*, in one row instead of two
    // labeled ones — meant to roughly halve each board's height. Area
    // scales with the square of the linear dimension, so halving the area
    // means scaling width/height by sqrt(0.5), not by 0.5 itself (which
    // would halve the diameter and leave only a quarter of the area).
    // Nothing about shelf_levels/front/back/name config changes, only how
    // this one zone renders.
    const BACK_DOT_SCALE = Math.SQRT1_2;
    const renderDot = (group: ShelfSlotGroup, indexInGroup: number, scale: number) => {
      const depth = group.start + indexInGroup;
      const dotKey = `${zoneKey}-${depth}`;
      const wine = wines.find((w) => (w.depth || 0) === depth);
      const bg = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
      const ring = wine ? this._brightenColor(bg) : "";
      const disp = wine?.disposition || "";
      const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
      const basis = scale === 1 ? dotBasis : `calc(${dotBasis} * ${scale})`;
      return html`<span
        class="zone-shelf-dot ${wine ? "filled" : ""} ${this._dragOverCell === dotKey ? "drag-over" : ""} ${wine && wine.id === this.highlightWineId ? "locate-highlight" : ""} ${wine && this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine && wine.id === this.movingWineId ? "move-source" : ""}"
        style="flex-basis:${basis};max-width:${basis}${wine ? `;background:${bg};--bottle-type-color:${ring};${this._dispositionRingStyle(dispClass, ring, wine)}` : ""}"
        title="${wine ? `${wine.name} (${wine.vintage || "NV"})` : ""}"
        draggable=${wine ? "true" : "false"}
        @click=${(e: Event) => { e.stopPropagation(); this._onZoneClick(wine, zoneId, depth); }}
        @dragstart=${wine ? (e: DragEvent) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); } : nothing}
        @dragend=${(e: DragEvent) => this._onDragEnd(e)}
        @dragover=${(e: DragEvent) => { e.stopPropagation(); this._onDragOver(e, dotKey); }}
        @dragleave=${(e: DragEvent) => { e.stopPropagation(); this._onDragLeave(e); }}
        @drop=${(e: DragEvent) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine, depth); }}
        @touchstart=${wine ? (e: TouchEvent) => { e.stopPropagation(); this._onTouchStart(wine); } : nothing}
        @touchend=${(e: TouchEvent) => this._onTouchEnd(e)}
        @touchmove=${(e: TouchEvent) => this._onTouchMove(e)}
      >${wine?.image_url ? html`<img class="wine-thumb" src="${wine.image_url}" alt="" />` : nothing}${this._dispositionBadge(dispClass, disp, wine)}</span>`;
    };

    // Whichever lane is longer leads the sequence (its dot comes first at
    // each position), with the shorter one nested right after — any surplus
    // of the longer lane tacked on at the end. On a swapped level (back=4,
    // front=3), that means position 1 is a back dot, not front. Scale
    // always follows the lane itself (front=1, back=BACK_DOT_SCALE),
    // regardless of which one leads.
    const renderInterleavedLane = (front: ShelfSlotGroup | undefined, back: ShelfSlotGroup | undefined) => {
      const frontSize = front?.size || 0;
      const backSize = back?.size || 0;
      const frontLeads = frontSize >= backSize;
      const items: TemplateResult[] = [];
      for (let i = 0; i < Math.max(frontSize, backSize); i++) {
        if (frontLeads) {
          if (i < frontSize) items.push(renderDot(front!, i, 1));
          if (i < backSize) items.push(renderDot(back!, i, BACK_DOT_SCALE));
        } else {
          if (i < backSize) items.push(renderDot(back!, i, BACK_DOT_SCALE));
          if (i < frontSize) items.push(renderDot(front!, i, 1));
        }
      }
      return html`<div class="zone-shelf-lane">${items}</div>`;
    };

    return html`
      <div class="bottom-zone zone-shelf">
        ${name ? html`<div class="bottom-zone-label">${name}</div>` : nothing}
        <div class="zone-shelf-levels">
          ${levels.map(([, lanes], idx) => html`
            <div class="zone-shelf-level ${idx === levels.length - 1 ? "last" : ""}">
              ${renderInterleavedLane(lanes.front, lanes.back)}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // Compressor-bump zone: the shallow, single-depth area above a fridge's
  // compressor, where bottles lie one deep and each row above the bottom one
  // nests into the gaps of the row below (see getSteppedLevels in models.ts).
  // Reuses the shelf zone's dot styling — visually it's the same idea, one
  // lane per level instead of two — but each level here is its own
  // individually-addressable row, same as a shelf board, not a front/back
  // pair, so there's no lane split or label.
  private _renderSteppedZone(zoneId: string, zoneKey: string, name: string, wines: Wine[], sr: StorageRow) {
    const levelsData = sr.stepped_levels || [];
    const groups = getSteppedSlotGroups(levelsData);
    const maxCount = Math.max(1, ...levelsData);
    // See the same calc() in _renderShelfZone: accounts for the lane's own
    // gaps, plus a fixed margin so the end dots don't sit flush against the
    // cabinet's frame.
    const dotBasis = `calc((100% - ${(maxCount - 1) * 2 + 8}px) / ${maxCount})`;

    const renderDots = (group: SteppedSlotGroup) => html`
      <div class="zone-shelf-lane">
        ${Array.from({ length: group.size }, (_, i) => {
          const depth = group.start + i;
          const dotKey = `${zoneKey}-${depth}`;
          const wine = wines.find((w) => (w.depth || 0) === depth);
          const bg = wine ? WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red : "";
          const ring = wine ? this._brightenColor(bg) : "";
          const disp = wine?.disposition || "";
          const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
          return html`<span
            class="zone-shelf-dot ${wine ? "filled" : ""} ${this._dragOverCell === dotKey ? "drag-over" : ""} ${wine && wine.id === this.highlightWineId ? "locate-highlight" : ""} ${wine && this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine && wine.id === this.movingWineId ? "move-source" : ""}"
            style="flex-basis:${dotBasis};max-width:${dotBasis}${wine ? `;background:${bg};--bottle-type-color:${ring};${this._dispositionRingStyle(dispClass, ring, wine)}` : ""}"
            title="${wine ? `${wine.name} (${wine.vintage || "NV"})` : ""}"
            draggable=${wine ? "true" : "false"}
            @click=${(e: Event) => { e.stopPropagation(); this._onZoneClick(wine, zoneId, depth); }}
            @dragstart=${wine ? (e: DragEvent) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); } : nothing}
            @dragend=${(e: DragEvent) => this._onDragEnd(e)}
            @dragover=${(e: DragEvent) => { e.stopPropagation(); this._onDragOver(e, dotKey); }}
            @dragleave=${(e: DragEvent) => { e.stopPropagation(); this._onDragLeave(e); }}
            @drop=${(e: DragEvent) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine, depth); }}
            @touchstart=${wine ? (e: TouchEvent) => { e.stopPropagation(); this._onTouchStart(wine); } : nothing}
            @touchend=${(e: TouchEvent) => this._onTouchEnd(e)}
            @touchmove=${(e: TouchEvent) => this._onTouchMove(e)}
          >${wine?.image_url ? html`<img class="wine-thumb" src="${wine.image_url}" alt="" />` : nothing}${this._dispositionBadge(dispClass, disp, wine)}</span>`;
        })}
      </div>
    `;

    // Level 0 is the bottom row (see models.ts) — reverse for display, since
    // flex-direction: column lays out children top-to-bottom.
    const reversed = [...groups].sort((a, b) => b.level - a.level);

    return html`
      <div class="bottom-zone zone-shelf">
        ${name ? html`<div class="bottom-zone-label">${name}</div>` : nothing}
        <div class="zone-shelf-levels">
          ${reversed.map((group, idx) => html`
            <div class="zone-shelf-level ${idx === reversed.length - 1 ? "last" : ""}">
              ${renderDots(group)}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderGridRow(row: number, cols: number) {
    const cabinetDepth = (this.cabinet as any).depth || 1;
    return html`
      <div class="row">
        ${Array.from({ length: cols }, (_, col) => {
          const wines = this._getWinesAt(row, col);
          const wineCount = wines.length;
          const frontWine = wines.length > 0
            ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0]
            : undefined;
          const bgColor = frontWine
            ? WINE_TYPE_COLORS[frontWine.type as WineType] || WINE_TYPE_COLORS.red
            : "transparent";
          const disp = frontWine?.disposition || "";
          const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
          const ratingDisplay = frontWine?.rating ? frontWine.rating.toFixed(1) : "";
          const ringColor = frontWine ? this._brightenColor(bgColor) : "";
          const cellKey = `${row}-${col}`;
          const isDragOver = this._dragOverCell === cellKey;
          const isHighlighted =
            !!this.highlightWineId && wines.some((w) => w.id === this.highlightWineId);
          const isRemovalCandidate =
            this.removalHighlightIds.length > 0 &&
            wines.some((w) => this.removalHighlightIds.includes(w.id));
          const isMoving = !!this.movingWineId && wines.some((w) => w.id === this.movingWineId);
          return html`
            <div
              class="cell ${frontWine ? "filled" : "empty"} ${isDragOver ? "drag-over" : ""} ${isHighlighted ? "locate-highlight" : ""} ${isRemovalCandidate ? "removal-highlight" : ""} ${isMoving ? "move-source" : ""}"
              style=${frontWine ? `background: ${bgColor}; --bottle-type-color: ${ringColor};${this._dispositionRingStyle(dispClass, ringColor, frontWine)}` : ""}
              draggable=${frontWine ? "true" : "false"}
              @click=${() => this._onCellClick(row, col, frontWine, wineCount, cabinetDepth, wines)}
              @touchstart=${frontWine ? () => this._onTouchStart(frontWine) : nothing}
              @touchend=${frontWine ? (e: TouchEvent) => this._onTouchEnd(e) : nothing}
              @touchmove=${frontWine ? (e: TouchEvent) => this._onTouchMove(e) : nothing}
              @dragstart=${frontWine ? (e: DragEvent) => this._onDragStart(e, frontWine, row, col) : nothing}
              @dragend=${frontWine ? (e: DragEvent) => this._onDragEnd(e) : nothing}
              @dragover=${(e: DragEvent) => this._onDragOver(e, cellKey)}
              @dragleave=${(e: DragEvent) => this._onDragLeave(e)}
              @drop=${(e: DragEvent) => this._onDrop(e, row, col)}
              title=${frontWine
                ? `${frontWine.name} (${frontWine.vintage || "NV"})${frontWine.rating ? ` ★${frontWine.rating}` : ""}${wineCount > 1 ? ` [${wineCount}/${cabinetDepth} deep]` : ""}`
                : this._t("ui.card.emptyCellTitle", { row: row + 1, col: col + 1 })}
            >
              ${frontWine
                ? html`
                    ${frontWine.image_url ? html`<img class="wine-thumb" src="${frontWine.image_url}" alt="" />` : nothing}
                    <span class="bottle-label">${frontWine.vintage || "NV"}</span>
                    ${this._dispositionBadge(dispClass, disp, frontWine)}
                    ${ratingDisplay ? html`<span class="rating-badge">★${ratingDisplay}</span>` : nothing}
                    ${wineCount > 1 ? html`<span class="depth-badge">${wineCount}</span>` : nothing}
                    ${cabinetDepth >= 2
                      ? html`
                          <span class="depth-dots">
                            ${Array.from({ length: cabinetDepth }, (_, d) => {
                              const wineAtDepth = wines.find((w) => (w.depth || 0) === d);
                              const dotColor = wineAtDepth
                                ? WINE_TYPE_COLORS[wineAtDepth.type as WineType] || WINE_TYPE_COLORS.red
                                : "";
                              return html`<span
                                class="depth-dot ${wineAtDepth ? "" : "empty"}"
                                style=${wineAtDepth ? `background: ${dotColor}` : ""}
                              ></span>`;
                            })}
                          </span>
                        `
                      : nothing}
                  `
                : cabinetDepth >= 2 && wineCount === 0
                  ? html`
                      <span class="depth-dots">
                        ${Array.from({ length: cabinetDepth }, () =>
                          html`<span class="depth-dot empty"></span>`
                        )}
                      </span>
                    `
                  : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderCell(row: number, col: number) {
    const cabinetDepth = (this.cabinet as any).depth || 1;
    const wines = this._getWinesAt(row, col);
    const wineCount = wines.length;
    const frontWine = wines.length > 0
      ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0]
      : undefined;
    const bgColor = frontWine
      ? WINE_TYPE_COLORS[frontWine.type as WineType] || WINE_TYPE_COLORS.red
      : "transparent";
    const disp = frontWine?.disposition || "";
    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
    const ratingDisplay = frontWine?.rating ? frontWine.rating.toFixed(1) : "";
    const ringColor = frontWine ? this._brightenColor(bgColor) : "";
    const cellKey = `${row}-${col}`;
    const isDragOver = this._dragOverCell === cellKey;
    return html`
      <div
        class="cell ${frontWine ? "filled" : "empty"} ${isDragOver ? "drag-over" : ""}"
        style=${frontWine ? `background: ${bgColor}; --bottle-type-color: ${ringColor};${this._dispositionRingStyle(dispClass, ringColor, frontWine)}` : ""}
        draggable=${frontWine ? "true" : "false"}
        @click=${() => this._onCellClick(row, col, frontWine, wineCount, cabinetDepth, wines)}
        @touchstart=${frontWine ? () => this._onTouchStart(frontWine) : nothing}
        @touchend=${frontWine ? (e: TouchEvent) => this._onTouchEnd(e) : nothing}
        @touchmove=${frontWine ? (e: TouchEvent) => this._onTouchMove(e) : nothing}
        @dragstart=${frontWine ? (e: DragEvent) => this._onDragStart(e, frontWine, row, col) : nothing}
        @dragend=${frontWine ? (e: DragEvent) => this._onDragEnd(e) : nothing}
        @dragover=${(e: DragEvent) => this._onDragOver(e, cellKey)}
        @dragleave=${(e: DragEvent) => this._onDragLeave(e)}
        @drop=${(e: DragEvent) => this._onDrop(e, row, col)}
        title=${frontWine
          ? `${frontWine.name} (${frontWine.vintage || "NV"})${frontWine.rating ? ` ★${frontWine.rating}` : ""}${wineCount > 1 ? ` [${wineCount}/${cabinetDepth} deep]` : ""}`
          : this._t("ui.card.emptyCellTitle", { row: row + 1, col: col + 1 })}
      >
        ${frontWine
          ? html`
              ${frontWine.image_url ? html`<img class="wine-thumb" src="${frontWine.image_url}" alt="" />` : nothing}
              <span class="bottle-label">${frontWine.vintage || "NV"}</span>
              ${this._dispositionBadge(dispClass, disp, frontWine)}
              ${ratingDisplay ? html`<span class="rating-badge">★${ratingDisplay}</span>` : nothing}
              ${wineCount > 1 ? html`<span class="depth-badge">${wineCount}</span>` : nothing}
              ${cabinetDepth >= 2
                ? html`
                    <span class="depth-dots">
                      ${Array.from({ length: cabinetDepth }, (_, d) => {
                        const wineAtDepth = wines.find((w) => (w.depth || 0) === d);
                        const dotColor = wineAtDepth
                          ? WINE_TYPE_COLORS[wineAtDepth.type as WineType] || WINE_TYPE_COLORS.red
                          : "";
                        return html`<span
                          class="depth-dot ${wineAtDepth ? "" : "empty"}"
                          style=${wineAtDepth ? `background: ${dotColor}` : ""}
                        ></span>`;
                      })}
                    </span>
                  `
                : nothing}
            `
          : cabinetDepth >= 2 && wineCount === 0
            ? html`
                <span class="depth-dots">
                  ${Array.from({ length: cabinetDepth }, () =>
                    html`<span class="depth-dot empty"></span>`
                  )}
                </span>
              `
            : nothing}
      </div>
    `;
  }

  private _onRackClick() {
    this.dispatchEvent(
      new CustomEvent("rack-click", {
        detail: { cabinet: this.cabinet },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const { rows, cols } = this.cabinet;
    const storageRows = this._getStorageRowSet();
    const hasGridRows = Array.from({ length: rows }, (_, row) => row).some((row) => !storageRows.has(row));
    // Shelf racks have no row/col slots of their own, but the title should
    // still open the equivalent browsable panel (handled by the card,
    // which tells the two apart from the cabinet's own storage_rows).
    const hasShelfRows = (this.cabinet.storage_rows || []).some((sr) => sr.type === "shelf");
    const titleClickable = hasGridRows || hasShelfRows;

    return html`
      <div class="cabinet">
        <div
          class="cabinet-name ${titleClickable ? "clickable" : ""}"
          @click=${titleClickable ? () => this._onRackClick() : nothing}
          title=${titleClickable ? this._t("ui.card.reorderRackTitle") : ""}
        >${this.cabinet.name}${this._renderSensorBadge()}</div>
        <div class="grid-inner">
          ${Array.from({ length: rows }, (_, row) =>
              storageRows.has(row)
                ? this._renderStorageZone(row)
                : this._renderGridRow(row, cols)
            )
          }
        </div>
        ${this.cabinet.has_bottom_zone
          ? html`
              <div class="bottom-zone ${this._dragOverCell === "zone-bottom" ? "drag-over" : ""}"
                @click=${() => this._onZoneClick()}
                @dragover=${(e: DragEvent) => this._onDragOver(e, "zone-bottom")}
                @dragleave=${(e: DragEvent) => this._onDragLeave(e)}
                @drop=${(e: DragEvent) => this._onDrop(e, undefined, undefined, "bottom")}>
                <div class="bottom-zone-label">
                  ${this.cabinet.bottom_zone_name}
                </div>
                ${this._getBottomZoneWines().map(
                  (wine) => html`
                    <div
                      class="zone-bottle"
                      style="background: ${WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red}"
                      draggable="true"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._onZoneClick(wine);
                      }}
                      @dragstart=${(e: DragEvent) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, "bottom"); }}
                      @dragend=${(e: DragEvent) => this._onDragEnd(e)}
                      title="${wine.name}"
                    >
                      ${(wine.vintage || "NV").toString().slice(-2)}
                    </div>
                  `
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}
