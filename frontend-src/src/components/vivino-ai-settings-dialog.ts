import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { WineType, getSelectableWineTypes } from "../models";
import { sharedStyles, touchStyles } from "../styles";
import { t } from "../i18n";

@customElement("vivino-ai-settings-dialog")
export class VivinoAiSettingsDialog extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) aiFallbackAlways = false;
  @property({ type: Boolean }) enableWhisky = false;
  @property({ type: String }) defaultWineType: WineType = "red";
  @property({ type: String }) dispositionDisplay: "letter" | "dot" = "letter";
  @property({ type: String }) metadataLanguage = "en";
  @property({ attribute: false }) supportedLanguages: string[] = ["en", "fr", "de"];
  @property({ type: String }) metadataCurrency = "USD";
  @property({ attribute: false }) supportedCurrencies: string[] = ["USD", "EUR", "GBP", "CHF"];

  static styles = [
    sharedStyles,
    css`
      .settings-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--wc-border);
        font-size: 0.85em;
      }

      .settings-row:last-of-type {
        border-bottom: none;
      }

      .settings-label {
        color: var(--wc-text);
      }

      .pill-group {
        display: flex;
        gap: 4px;
      }

      .pill {
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid var(--wc-border);
        cursor: pointer;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.9em;
      }

      .pill.active {
        background: var(--wc-primary-text);
        color: #fff;
        border-color: var(--wc-primary-text);
      }

      .settings-select {
        padding: 3px 8px;
        border-radius: 8px;
        border: 1px solid var(--wc-border);
        background: var(--wc-bg);
        color: var(--wc-text);
        font-size: 0.9em;
      }

      .fallback-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: var(--wc-text);
      }

      .info-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--wc-border);
      }

      .info-title {
        margin: 0 0 12px;
        font-size: 0.95em;
        color: var(--wc-text);
      }

      .info-block {
        margin-bottom: 16px;
      }

      .info-block-title {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--wc-text);
        margin-bottom: 6px;
      }

      .info-block ul {
        margin: 0;
        padding-left: 20px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1.7;
      }

      .info-note {
        margin: 0;
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }

      @media (pointer: coarse) {
        .fallback-label {
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

  private _close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _setFallback(value: boolean) {
    this.dispatchEvent(new CustomEvent("set-ai-fallback-always", { detail: { value } }));
  }

  private _setEnableWhisky(value: boolean) {
    this.dispatchEvent(new CustomEvent("set-enable-whisky", { detail: { value } }));
  }

  private _setDefaultWineType(value: WineType) {
    this.dispatchEvent(new CustomEvent("set-default-wine-type", { detail: { value } }));
  }

  private _setDispositionDisplay(value: "letter" | "dot") {
    this.dispatchEvent(new CustomEvent("set-disposition-display", { detail: { value } }));
  }

  private _setLanguage(lang: string) {
    this.dispatchEvent(new CustomEvent("set-metadata-language", { detail: { value: lang } }));
  }

  private _setCurrency(currency: string) {
    this.dispatchEvent(new CustomEvent("set-metadata-currency", { detail: { value: currency } }));
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="max-width:420px;padding:20px 24px" @click=${(e: Event) => e.stopPropagation()}>
          <div class="dialog-top-bar" style="justify-content:space-between;padding:0 0 8px">
            <span style="font-weight:600;color:var(--wc-text)">${this._t("ui.vivinoAiSettings.title")}</span>
            <button class="icon-btn close-btn" title="${this._t('ui.common.close')}" @click=${this._close}>✕</button>
          </div>

          <div class="settings-row">
            <label class="fallback-label">
              <input
                type="checkbox"
                .checked=${this.enableWhisky}
                @change=${(e: Event) => this._setEnableWhisky((e.target as HTMLInputElement).checked)}
              />
              ${this._t("ui.vivinoAiSettings.enableWhisky")}
            </label>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.defaultWineTypeLabel")}</span>
            <select
              class="settings-select"
              .value=${this.defaultWineType}
              @change=${(e: Event) => this._setDefaultWineType((e.target as HTMLSelectElement).value as WineType)}
            >
              ${getSelectableWineTypes(this.enableWhisky, this.hass?.language).map(([value, label]) => html`
                <option value=${value} ?selected=${value === this.defaultWineType}>${label}</option>
              `)}
            </select>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.dispositionDisplayLabel")}</span>
            <div class="pill-group">
              <button
                class="pill ${this.dispositionDisplay === "letter" ? "active" : ""}"
                @click=${() => this._setDispositionDisplay("letter")}
              >${this._t("ui.vivinoAiSettings.dispositionDisplayLetter")}</button>
              <button
                class="pill ${this.dispositionDisplay === "dot" ? "active" : ""}"
                @click=${() => this._setDispositionDisplay("dot")}
              >${this._t("ui.vivinoAiSettings.dispositionDisplayDot")}</button>
            </div>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.currencyLabel")}</span>
            <div class="pill-group">
              ${this.supportedCurrencies.map((cur) => html`
                <button
                  class="pill ${this.metadataCurrency === cur ? "active" : ""}"
                  @click=${() => this._setCurrency(cur)}
                >${cur}</button>
              `)}
            </div>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.languageLabel")}</span>
            <div class="pill-group">
              ${this.supportedLanguages.map((lang) => html`
                <button
                  class="pill ${this.metadataLanguage === lang ? "active" : ""}"
                  @click=${() => this._setLanguage(lang)}
                >${lang.toUpperCase()}</button>
              `)}
            </div>
          </div>

          <div class="settings-row">
            <label class="fallback-label">
              <input
                type="checkbox"
                .checked=${this.aiFallbackAlways}
                @change=${(e: Event) => this._setFallback((e.target as HTMLInputElement).checked)}
              />
              ${this._t("ui.vivinoAiSettings.alwaysTryAi")}
            </label>
          </div>

          <div class="info-section">
            <h3 class="info-title">🍇🤖 ${this._t("ui.vivinoAiSettings.infoTitle")}</h3>

            <div class="info-block">
              <div class="info-block-title">🍇 ${this._t("ui.vivinoAiSettings.vivinoProvidesTitle")}</div>
              <ul>
                <li>${this._t("ui.vivinoAiSettings.vivinoBottlePhoto")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoCommunityRating")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoMarketPrice")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoFoodPairings")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoAlcohol")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoGrapeInfo")}</li>
              </ul>
            </div>

            <div class="info-block">
              <div class="info-block-title">🤖 ${this._t("ui.vivinoAiSettings.aiProvidesTitle")}</div>
              <ul>
                <li>${this._t("ui.vivinoAiSettings.aiEstimatedPrice")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiTastingDescription")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiCriticScores")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiDispositionInfo", {
                  drinkNow: this._t("ui.disposition.drinkNow"),
                  hold: this._t("ui.disposition.hold"),
                  pastPeak: this._t("ui.disposition.pastPeak"),
                  window: this._t("ui.vivinoAiSettings.drinkingWindow"),
                })}</li>
                <li>${this._t("ui.vivinoAiSettings.aiGrapeInfo")}</li>
              </ul>
            </div>

            <p class="info-note">
              ${this._t("ui.vivinoAiSettings.infoNote")}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
