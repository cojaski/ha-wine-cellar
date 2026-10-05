import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../styles";
import { cameraBlockedReason, describeCameraError } from "../utils/camera";
import { t } from "../i18n";
import {
  BarcodeDetector as ZXingBarcodeDetector,
  prepareZXingModule,
} from "barcode-detector/ponyfill";

declare global {
  interface Window {
    BarcodeDetector: any;
  }
}

const BARCODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"] as const;

// Served by the integration next to the card bundle (see __init__.py). Not the
// library's default jsDelivr URL, so scanning works without internet access.
const ZXING_WASM_URL = "/wine_cellar/zxing_reader.wasm";

// WebKit has no BarcodeDetector at all — every iOS browser, the HA Companion
// app included, https or not — so fall back to a zxing WASM decoder there.
async function createBarcodeDetector(): Promise<any> {
  if ("BarcodeDetector" in window) {
    return new window.BarcodeDetector({ formats: BARCODE_FORMATS });
  }
  // Awaited so a failed WASM download surfaces here, not as every frame's
  // detect() rejecting silently.
  await prepareZXingModule({
    overrides: {
      locateFile: (path: string, prefix: string) =>
        path.endsWith(".wasm") ? ZXING_WASM_URL : prefix + path,
    },
    fireImmediately: true,
  });
  return new ZXingBarcodeDetector({ formats: [...BARCODE_FORMATS] });
}

@customElement("barcode-scanner")
export class BarcodeScanner extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ type: Boolean }) active = false;

  @state() private _error = "";
  @state() private _scanning = false;

  private _stream: MediaStream | null = null;
  private _detector: any = null;
  private _rafId = 0;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .scanner-container {
        position: relative;
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        background: #000;
        max-height: 300px;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        max-height: 300px;
      }

      .scan-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
      }

      .scan-line {
        position: absolute;
        left: 10%;
        right: 10%;
        height: 2px;
        background: rgba(255, 50, 50, 0.8);
        box-shadow: 0 0 8px rgba(255, 50, 50, 0.5);
        animation: scanMove 2s ease-in-out infinite;
      }

      @keyframes scanMove {
        0%, 100% { top: 20%; }
        50% { top: 80%; }
      }

      .scan-corners {
        position: absolute;
        top: 15%;
        left: 15%;
        right: 15%;
        bottom: 15%;
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 8px;
      }

      .error-message {
        padding: 16px;
        text-align: center;
        color: #ef5350;
        font-size: 0.9em;
      }

      .hint {
        text-align: center;
        padding: 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .fallback-note {
        text-align: center;
        padding: 12px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }
    `,
  ];

  // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
  private _t(key: string, params?: Record<string, string | number>): string {
    return t(key, this.hass?.language, params);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("active")) {
      if (this.active) {
        this._startScanning();
      } else {
        this._stopScanning();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopScanning();
  }

  private async _startScanning() {
    if (this._scanning) return;
    this._error = "";

    const blocked = cameraBlockedReason(this.hass?.language);
    if (blocked) {
      this._error = `${blocked} ${this._t("ui.barcode.enterManually")}`;
      this.dispatchEvent(
        new CustomEvent("scanner-error", {
          detail: { error: this._error },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    try {
      this._detector = await createBarcodeDetector();
    } catch (err) {
      console.error("Barcode decoder failed to load", err);
      this._error = this._t("ui.barcode.notSupported");
      this.dispatchEvent(
        new CustomEvent("scanner-error", {
          detail: { error: this._error },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }
    // The first WASM load can take a moment; don't open the camera if the
    // scanner was closed meanwhile.
    if (!this.active) {
      this._detector = null;
      return;
    }

    try {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      await this.updateComplete;
      const video = this.renderRoot.querySelector("video") as HTMLVideoElement;
      if (video && this._stream) {
        video.srcObject = this._stream;
        await video.play();
      }

      this._scanning = true;
      this._scanFrame();
    } catch (err: any) {
      this._error = `${describeCameraError(err, this.hass?.language)} ${this._t("ui.barcode.enterManually")}`;
      this.dispatchEvent(
        new CustomEvent("scanner-error", {
          detail: { error: this._error },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async _scanFrame() {
    if (!this._scanning || !this._detector) return;

    const video = this.renderRoot.querySelector("video") as HTMLVideoElement;
    if (!video || video.readyState < 2) {
      this._rafId = requestAnimationFrame(() => this._scanFrame());
      return;
    }

    try {
      const barcodes = await this._detector.detect(video);
      if (barcodes.length > 0) {
        this._onDetected(barcodes[0].rawValue);
        return;
      }
    } catch {
      // Detection error on this frame, continue
    }

    this._rafId = requestAnimationFrame(() => this._scanFrame());
  }

  private _stopScanning() {
    this._scanning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = 0;
    }
    if (this._stream) {
      this._stream.getTracks().forEach((t) => t.stop());
      this._stream = null;
    }
    this._detector = null;
  }

  private _onDetected(barcode: string) {
    this._stopScanning();
    this.dispatchEvent(
      new CustomEvent("barcode-detected", {
        detail: { barcode },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.active) return nothing;

    return html`
      ${this._error
        ? html`<div class="error-message">${this._error}</div>`
        : html`
            <div class="scanner-container">
              <video autoplay playsinline muted></video>
              <div class="scan-overlay">
                <div class="scan-corners"></div>
                <div class="scan-line"></div>
              </div>
            </div>
            <div class="hint">${this._t("ui.barcode.pointAtBarcode")}</div>
          `}
    `;
  }
}
