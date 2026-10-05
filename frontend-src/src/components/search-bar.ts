import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles, touchStyles } from "../styles";
import { t } from "../i18n";

@customElement("wine-search-bar")
export class WineSearchBar extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ type: String }) value = "";
  @property({ type: String }) filter = "all";
  @property({ type: Boolean }) enableWhisky = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      /* The chips and the field used to share one non-wrapping row. Six chips
         that refuse to break left the input 46px wide on a phone, of which two
         were usable for text. The field keeps a floor and the chips drop to
         their own line rather than crushing it. */
      .search-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 16px 8px;
        align-items: center;
      }

      .search-input-wrapper {
        flex: 1 1 220px;
        min-width: 0;
        position: relative;
      }

      .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--wc-text-secondary);
        font-size: 0.9em;
        pointer-events: none;
      }

      input {
        width: 100%;
        padding: 8px 38px 8px 32px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        font-size: 0.9em;
        background: var(--wc-bg);
        color: var(--wc-text);
        box-sizing: border-box;
        transition: border-color 0.2s;
      }

      input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      /* Safari zooms the whole page when a focused field computes under 16px,
         which is the other half of "the search box is unusable on my phone".
         Touch pointers only, so the desktop field keeps its size. */
      @media (pointer: coarse) {
        input {
          font-size: 16px;
        }
      }

      /* One clear button, ours: WebKit's own only appears on some platforms
         and would sit on top of this one where it does. */
      input::-webkit-search-cancel-button,
      input::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
      }

      /* 30px rather than the icon's visual size: this is a thumb target on the
         device where the field was unusable in the first place. */
      .search-clear {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 50%;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.8em;
        line-height: 1;
        cursor: pointer;
        padding: 0;
      }

      .search-clear:hover {
        background: rgba(114, 47, 55, 0.12);
        color: var(--wc-text);
      }

      .filter-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }

      .chip {
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

      .chip:hover {
        background: rgba(114, 47, 55, 0.08);
      }

      .chip.active {
        background: var(--wc-primary);
        color: #fff;
        border-color: var(--wc-primary);
      }

      /* Touch: room for the 44px clear button inside the field. */
      @media (pointer: coarse) {
        input {
          padding-right: 52px;
        }
        .search-clear {
          right: 0;
        }
      }
    `,
    touchStyles,
  ];

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  private _onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent("search-change", {
        detail: { query: value, filter: this.filter },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Emptying the field by hand is fiddly on a phone even once it is wide
  // enough to see. One tap, and the caret stays where the user can keep typing.
  private _clear() {
    this.dispatchEvent(
      new CustomEvent("search-change", {
        detail: { query: "", filter: this.filter },
        bubbles: true,
        composed: true,
      })
    );
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  private _onFilterChange(filter: string) {
    this.filter = filter;
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent("search-change", {
        detail: { query: input?.value || "", filter },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const filters = [
      { id: "all", label: this._t("ui.inventory.preset.allLabel") },
      { id: "red", label: this._t("wineType.red") },
      { id: "white", label: this._t("wineType.white") },
      { id: "rosé", label: this._t("wineType.rosé") },
      { id: "sparkling", label: this._t("wineType.sparkling") },
      { id: "dessert", label: this._t("wineType.dessert") },
      ...(this.enableWhisky ? [{ id: "whisky", label: this._t("wineType.whisky") }] : []),
    ];

    return html`
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="search"
            placeholder="${this._t('ui.inventory.searchPlaceholder')}"
            enterkeyhint="search"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.value}
            @input=${this._onInput}
          />
          ${this.value
            ? html`
                <button class="search-clear" title="${this._t('ui.common.clearSearch')}" aria-label="${this._t('ui.common.clearSearch')}" @click=${this._clear}>
                  ✕
                </button>
              `
            : nothing}
        </div>
        <div class="filter-chips">
          ${filters.map(
            (f) => html`
              <button
                class="chip ${this.filter === f.id ? "active" : ""}"
                @click=${() => this._onFilterChange(f.id)}
              >
                ${f.label}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}
