import { css, html } from "lit";

/* The one close button every pop-up uses: a circled ✕ pinned to the
   top-right corner of the sheet. It sits in a zero-height sticky bar as the
   dialog's first child, so it takes no room in the layout, stays put while
   the dialog scrolls, and lands in exactly the same spot in every dialog.
   Headers leave room for it with padding-right (see .dialog-header). */
export const closeIcon = html`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
</svg>`;

export function dialogClose(onClose: (e: Event) => void, label: string) {
  return html`
    <div class="dialog-close-bar">
      <button class="dialog-close" title=${label} aria-label=${label} @click=${onClose}>
        ${closeIcon}
      </button>
    </div>
  `;
}

export const sharedStyles = css`
  :host {
    --wc-primary: #722f37;
    --wc-primary-light: #9a4a54;
    --wc-primary-text: #c48b91;
    /* Pop-ups, side panels and fields used to paint --ha-card-background,
       which a frosted/"liquid glass" theme makes nearly transparent — the
       card behind it is blurred by the theme, a pop-up floating over the
       whole page is not, so its text sat on whatever was underneath.
       They now use our own glass surface: translucent enough to look like
       glass, opaque enough to read on any wallpaper, and blurred by us.
       The --wc-glass-* values are set once on the card host (light or dark,
       from the theme's text colour) and inherited by every dialog, so they
       must not be declared here, where each component would reset them. */
    --wc-bg: var(--wc-glass-surface, rgba(250, 248, 247, 0.84));
    --wc-surface: var(--wc-glass-surface, rgba(250, 248, 247, 0.84));
    --wc-field-bg: var(--wc-glass-field, rgba(255, 255, 255, 0.6));
    --wc-text: var(--primary-text-color, #212121);
    --wc-text-secondary: var(--secondary-text-color, #727272);
    --wc-border: var(--wc-glass-line, rgba(0, 0, 0, 0.1));
    --wc-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
    --wc-hover: rgba(128, 128, 128, 0.14);
    --wc-blur: blur(28px) saturate(170%);
    --wc-edge: var(--wc-glass-edge, rgba(255, 255, 255, 0.7));
    --wc-sheen: var(--wc-glass-sheen, inset 0 1px 0 rgba(255, 255, 255, 0.75));
    --wc-primary-grad: linear-gradient(160deg, #9a4450 0%, #722f37 55%, #5a222a 100%);
    font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 0;
    font-size: 1.2em;
    font-weight: 500;
    color: var(--wc-text);
  }

  .card-content {
    padding: 16px;
  }

  .stats-bar {
    display: flex;
    gap: 16px;
    padding: 8px 16px;
    font-size: 0.85em;
    color: var(--wc-text-secondary);
  }

  .stats-bar .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .stats-bar .stat-value {
    font-weight: 600;
    color: var(--wc-text);
  }

  .tab-bar {
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    overflow-x: auto;
    border-bottom: 1px solid var(--wc-border);
  }

  .tab {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid var(--wc-border);
    background: var(--wc-field-bg);
    box-shadow: var(--wc-sheen);
    color: var(--wc-text-secondary);
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.85em;
    font-weight: 500;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
  }

  .tab:hover {
    background: var(--wc-hover);
    color: var(--wc-text);
  }

  .tab:active {
    transform: scale(0.97);
  }

  .tab.active {
    background: var(--wc-primary-grad);
    color: #fff;
    border-color: transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 10px rgba(114, 47, 55, 0.35);
  }

  /* Manage Racks and Settings look like the other tabs; they're only
     pushed to the right end of the bar. Settings sits right after Manage
     Racks with the bar's normal gap — no margin-left: auto of its own, or
     it would claim the remaining space and drift away from it. */
  .manage-racks-btn {
    margin-left: auto;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s, filter 0.2s;
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.55;
    cursor: default;
  }

  /* No longer "background: var(--wc-primary)": many buttons override just
     their colour inline (style="background:#e65100"), and that still wins
     over the gradient, as it did over the flat fill. */
  .btn-primary {
    background: var(--wc-primary-grad);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px rgba(114, 47, 55, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .btn-outline {
    background: var(--wc-field-bg);
    color: var(--wc-text);
    border: 1px solid var(--wc-border);
    box-shadow: var(--wc-sheen);
  }

  .btn-outline:hover:not(:disabled) {
    background: var(--wc-hover);
  }

  .btn-icon {
    background: transparent;
    border: none;
    color: var(--wc-text-secondary);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-icon:hover {
    background: var(--wc-hover);
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 6, 8, 0.38);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }

  .dialog {
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    border: 1px solid var(--wc-edge);
    border-radius: 22px;
    box-shadow: var(--wc-sheen), 0 24px 60px rgba(0, 0, 0, 0.3);
    color: var(--wc-text);
    max-width: 500px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
    /* user-select is inherited, so it crosses the Shadow DOM boundary from
       whatever wraps this card (e.g. Home Assistant's dashboard drag-reorder
       chrome) — re-declare it explicitly so dialog text stays selectable
       regardless of what the host page sets. */
    user-select: text;
    -webkit-user-select: text;
    -webkit-touch-callout: default;
  }

  .dialog-close-bar {
    position: sticky;
    top: 0;
    height: 0;
    /* Under the in-dialog confirm overlays (z-index 10), which have their
       own Cancel, so the ✕ can't close the whole dialog out from under one. */
    z-index: 5;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
  }

  .dialog-close,
  .depth-panel-close {
    pointer-events: auto;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--wc-border);
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    box-shadow: var(--wc-sheen), 0 2px 10px rgba(0, 0, 0, 0.18);
    color: var(--wc-text);
    cursor: pointer;
    line-height: 1;
    transition: background 0.2s, transform 0.15s;
  }

  .dialog-close {
    margin: 12px 12px 0 0;
  }

  .dialog-close:hover,
  .depth-panel-close:hover {
    background: var(--wc-hover);
  }

  .dialog-close:active,
  .depth-panel-close:active {
    transform: scale(0.92);
  }

  .dialog-header {
    padding: 20px 64px 12px 20px;
    font-size: 1.2em;
    font-weight: 500;
    border-bottom: 1px solid var(--wc-border);
  }

  .dialog-body {
    padding: 16px 20px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    font-size: 0.85em;
    font-weight: 500;
    color: var(--wc-text-secondary);
    margin-bottom: 4px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--wc-border);
    border-radius: 10px;
    font-size: 0.95em;
    background: var(--wc-field-bg);
    color: var(--wc-text);
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--wc-primary-text);
    box-shadow: 0 0 0 3px rgba(154, 74, 84, 0.2);
  }

  /* A <select>'s open list is drawn by the OS from this element's own
     background; a translucent one gives white-on-white options in some
     browsers, so the options get a solid colour of their own. */
  option {
    background: var(--wc-glass-solid, #fff);
    color: var(--wc-text);
  }

  .form-group textarea {
    min-height: 60px;
    resize: vertical;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Phone: full-screen dialogs, compact forms */
  @media (max-width: 599px) {
    /* The sheet stops below the iPhone's Dynamic Island / notch / status
       bar: Home Assistant draws edge to edge (viewport-fit=cover), so a
       sheet allowed the full 100vh slid under it. The overlay keeps that
       strip clear and the sheet fills at most what's left. */
    .dialog {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      border-radius: 20px 20px 0 0;
      border-bottom: none;
      /* One wide child (a long unbroken name, a row of chips) must not make
         the whole sheet scroll sideways; and scrolling the sheet to its end
         must not carry on into the dashboard behind it. */
      overflow-x: hidden;
      overscroll-behavior: contain;
      overflow-wrap: anywhere;
      margin-top: auto;
    }
    .dialog-overlay {
      align-items: flex-end;
      box-sizing: border-box;
      padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
    }
    .dialog-header {
      padding: 16px 64px 10px 16px;
      font-size: 1.1em;
    }
    .dialog-body {
      padding: 12px 16px;
    }
    .dialog-footer {
      padding: 10px 16px 16px;
    }
    .form-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .tab-bar {
      padding: 6px 12px;
      gap: 3px;
    }
    .tab {
      padding: 5px 12px;
      font-size: 0.8em;
    }
    .depth-panel {
      width: 100% !important;
      border-radius: 0 !important;
      /* Full-screen here, so it too must clear the Dynamic Island. */
      padding-top: env(safe-area-inset-top, 0px);
    }
  }

  /* --- Depth Side Panel --- */
  .depth-panel-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 6, 8, 0.3);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    z-index: 99;
    animation: fadeIn 0.2s ease;
  }

  /* While dragging a wine out of the panel, let the backdrop pass drag/drop
     events through to the racks behind it instead of swallowing them. */
  .depth-panel-backdrop.drag-through {
    pointer-events: none;
  }

  .depth-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    border-left: 1px solid var(--wc-edge);
    color: var(--wc-text);
    z-index: 100;
    box-shadow: -8px 0 40px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .depth-panel.open {
    transform: translateX(0);
  }

  .depth-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 13px top/right puts the ✕ exactly where the dialogs' one sits. */
    padding: 13px 13px 13px 16px;
    border-bottom: 1px solid var(--wc-border, #e0e0e0);
    flex-shrink: 0;
    /* Pinned, like the dialogs' ✕, so the panel's close never scrolls away. */
    position: sticky;
    top: 0;
    z-index: 4;
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
  }

  .depth-panel-title {
    font-weight: 600;
    font-size: 1em;
    color: var(--wc-text, #333);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .depth-panel-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .depth-panel-sort {
    background: none;
    border: 1px solid var(--wc-border, #ddd);
    border-radius: 12px;
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 0.72em;
    padding: 4px 9px;
    white-space: nowrap;
  }

  .depth-panel-sort:hover:not(:disabled) {
    border-color: var(--wc-primary, #722f37);
    color: var(--wc-primary, #722f37);
  }

  .depth-panel-sort:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .depth-panel-confirm {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0 12px 8px;
    padding: 10px 12px;
    border: 1px solid #c98a00;
    border-radius: 8px;
    background: rgba(201, 138, 0, 0.08);
    font-size: 0.76em;
    color: var(--wc-text-secondary, #888);
    line-height: 1.4;
  }

  .depth-panel-confirm strong {
    color: var(--wc-text, #333);
  }

  .depth-panel-confirm-btns {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 2px;
  }

  .depth-panel-confirm-btns button {
    background: none;
    border: 1px solid var(--wc-border, #ddd);
    border-radius: 8px;
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 1em;
    padding: 5px 12px;
  }

  .depth-panel-confirm-btns button.primary {
    background: var(--wc-primary, #722f37);
    border-color: var(--wc-primary, #722f37);
    color: #fff;
    font-weight: 600;
  }

  .depth-panel-rack {
    font-size: 0.78em;
    font-weight: 500;
    color: var(--wc-text-secondary, #888);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .depth-panel-subtitle {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--wc-text-secondary, #888);
  }

  .depth-panel-slots {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .depth-slot {
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;
  }

  .depth-slot:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .depth-slot.drag-over {
    box-shadow: 0 0 0 2px rgba(66, 165, 245, 0.8);
    background: rgba(66, 165, 245, 0.15);
  }

  .depth-slot.highlight {
    box-shadow: 0 0 0 2px rgba(196, 139, 145, 0.9);
    animation: highlightPulse 1.2s ease-in-out 3;
  }

  @keyframes highlightPulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(196, 139, 145, 0.9); }
    50% { box-shadow: 0 0 0 5px rgba(196, 139, 145, 0.4); }
  }

  .depth-slot-delete {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    line-height: 1;
    color: var(--wc-text-secondary, #888);
    background: rgba(0, 0, 0, 0.06);
    z-index: 3;
  }

  .depth-slot-delete:hover {
    background: #c62828;
    color: #fff;
  }

  .depth-panel-add-box {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .depth-panel-add-box select {
    flex: 1;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--wc-border, #ddd);
    background: var(--wc-field-bg);
    color: var(--wc-text, #333);
    font-size: 0.85em;
  }

  .depth-panel-add-box .depth-panel-grow {
    flex-shrink: 0;
    padding: 8px 14px;
    margin-top: 0;
  }

  .depth-slot-label {
    font-size: 0.7em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--wc-text-secondary, #888);
    padding: 0 4px 4px;
  }

  .depth-slot-wine {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: var(--wc-field-bg);
    border: 1px solid var(--wc-border);
    border-radius: 10px;
  }

  .depth-slot-avatar {
    position: relative;
    flex-shrink: 0;
  }

  .depth-slot-thumb {
    width: 32px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .depth-slot-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .depth-slot-disposition {
    position: absolute;
    bottom: -3px;
    right: -4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: 1.5px solid var(--wc-bg, #fff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    line-height: 1;
  }

  .depth-slot-disposition.drink {
    background: #2e7d32;
  }

  .depth-slot-disposition.hold {
    background: #1565c0;
  }

  .depth-slot-disposition.past {
    background: #c62828;
  }

  /* Dot style: same badge, no letter — see cabinet-grid.ts's .dot-style for
     the rack-drawing equivalent. Past Peak uses red to align with all other
     decline indicators throughout the interface. */
  .depth-slot-disposition.dot-style.past {
    background: #c62828;
  }

  .depth-slot-info {
    flex: 1;
    min-width: 0;
  }

  .depth-slot-name {
    font-weight: 600;
    font-size: 0.88em;
    color: var(--wc-text, #333);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .depth-slot-meta {
    font-size: 0.78em;
    color: var(--wc-text-secondary, #888);
    margin-top: 2px;
  }

  .depth-slot-empty {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 12px;
    border: 2px dashed var(--wc-border, #ddd);
    border-radius: 10px;
    color: var(--wc-text-secondary, #aaa);
    font-size: 0.85em;
  }

  .depth-slot.empty:hover .depth-slot-empty {
    border-color: var(--wc-primary-text);
    color: var(--wc-primary-text);
  }

  .depth-slot-plus {
    font-size: 1.3em;
    font-weight: 300;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--wc-hover);
  }

  .depth-slot.empty:hover .depth-slot-plus {
    background: rgba(196, 139, 145, 0.2);
  }

  .depth-panel-grow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    margin-top: 4px;
    border-radius: 10px;
    border: 1px dashed var(--wc-border, #ddd);
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 0.85em;
    font-weight: 600;
    transition: background 0.15s, color 0.15s;
  }

  .depth-panel-grow:hover {
    border-color: var(--wc-primary-text);
    color: var(--wc-primary-text);
  }
`;

/* Finger-sized controls on touch screens. Each component appends this LAST
   in its static styles so it outranks the component's own compact sizing
   (equal-specificity rules resolve by order). Gated on pointer: coarse rather
   than width: a tablet in landscape is as wide as a laptop but still has no
   mouse, while a narrow desktop window still has one. 44px is Apple's minimum
   tap target, and min-height wins over any fixed height a component sets. */
export const touchStyles = css`
  @media (pointer: coarse) {
    button,
    select,
    .tab,
    .btn,
    .file-input-label {
      min-height: 44px;
    }

    /* Icon-only buttons by name, not every button: an explicit min-width on a
       flex item replaces its default min-width: auto, letting labelled
       buttons (the tabs) shrink below their text and overlap. */
    .btn-icon,
    .icon-btn,
    .dialog-close,
    .inv-sort-dir,
    .small-btn,
    .photo-action-btn,
    .bl-remove-btn,
    .depth-panel-close,
    .search-clear,
    .edit-toggle {
      min-width: 44px;
    }

    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]),
    select,
    textarea {
      min-height: 44px;
      /* Under 16px, Safari zooms the whole page when the field takes focus,
         and doesn't zoom back out — the "page I have to pinch out of".
         !important because a bare "select"/"textarea" here lost to every
         component rule like ".edit-form .form-group select" and to inline
         font-size styles, leaving eight fields at 11–15px. */
      font-size: 16px !important;
    }

    input[type="checkbox"],
    input[type="radio"] {
      width: 22px;
      height: 22px;
    }

    /* Leave room between neighbours so a fat finger doesn't hit two. */
    .tab-bar,
    .dialog-footer {
      gap: 8px;
    }

    .depth-panel-slots {
      gap: 12px;
    }

    .depth-slot-delete {
      width: 32px;
      height: 32px;
      top: 4px;
      right: 4px;
      font-size: 1em;
    }

    .depth-slot-wine,
    .depth-slot-empty,
    .depth-panel-grow {
      min-height: 52px;
      box-sizing: border-box;
    }

    .depth-panel {
      width: 360px;
    }
  }
`;

/* Wine-type filter chips (All / Red / White / Rosé / Sparkling / Dessert /
   Whisky), shared by the card's search bar and the Inventory dialog so both
   rows look the same. Each chip takes its colour from the inline custom
   properties typeChipStyle() (models.ts) sets: tinted at rest, filled with
   its own colour when selected. */
export const typeChipStyles = css`
  .type-chip {
    --chip-color: #722f37;
    --chip-tint: rgba(114, 47, 55, 0.12);
    --chip-glow: rgba(114, 47, 55, 0.35);
    --chip-ink: #fff;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid var(--wc-border);
    background: linear-gradient(var(--chip-tint), var(--chip-tint)), var(--wc-field-bg);
    box-shadow: var(--wc-sheen);
    color: var(--wc-text);
    cursor: pointer;
    font-size: 0.78em;
    font-weight: 500;
    white-space: nowrap;
    transition: background 0.2s, box-shadow 0.2s, color 0.2s, transform 0.15s;
  }

  .type-chip:hover {
    background: linear-gradient(var(--chip-tint), var(--chip-tint)),
      linear-gradient(var(--chip-tint), var(--chip-tint)), var(--wc-field-bg);
  }

  .type-chip:active {
    transform: scale(0.96);
  }

  .type-chip.active {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 65%), var(--chip-color);
    color: var(--chip-ink);
    border-color: transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 3px 12px var(--chip-glow);
  }

  .type-chip.all.active {
    background: var(--wc-primary-grad);
  }
`;
