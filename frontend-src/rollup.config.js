import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import { copyFileSync, mkdirSync } from "node:fs";

const frontendDir = "../custom_components/wine_cellar/frontend";
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.ROLLUP_WATCH;

export default {
  input: "src/wine-cellar-card.ts",
  output: {
    file: "../custom_components/wine_cellar/frontend/wine-cellar-card.js",
    format: "es",
    sourcemap: !isProd,
  },
  plugins: [
    resolve(),
    // Inlines src/i18n/*.json (imported directly by src/i18n/index.ts) into
    // the bundle as plain objects — needs to run before typescript() so the
    // .ts files' `import en from "./en.json"` resolves to real data rather
    // than being left for the TS compiler, which only type-checks it.
    json(),
    typescript(),
    // barcode-scanner.ts falls back to zxing's WASM decoder where the browser
    // has no BarcodeDetector (all of iOS); ship it beside the bundle so the
    // integration can serve it locally instead of fetching it from a CDN.
    {
      name: "copy-zxing-wasm",
      writeBundle() {
        mkdirSync(frontendDir, { recursive: true });
        copyFileSync(
          "node_modules/zxing-wasm/dist/reader/zxing_reader.wasm",
          `${frontendDir}/zxing_reader.wasm`
        );
      },
    },
    isProd && terser(),
    isDev &&
      serve({
        contentBase: "../custom_components/wine_cellar/frontend",
        port: 5050,
      }),
  ].filter(Boolean),
};
