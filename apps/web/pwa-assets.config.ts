import { defineConfig } from "@vite-pwa/assets-generator/config";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
// Resolve the package root of @package/ui (main entry is src/index.ts, one level up → package root)
const uiRoot = resolve(dirname(require.resolve("@package/ui")), "..");
const svgPath = resolve(uiRoot, "src/Branding/assets/template-512x512.svg");

export default defineConfig({
  preset: {
    transparent: {
      sizes: [192, 512],
      favicons: [
        [16, "favicon-16x16.png"],
        [32, "favicon-32x32.png"],
        [48, "favicon.ico"],
        [180, "apple-touch-icon.png"],
      ],
    },
    maskable: {
      sizes: [],
    },
    apple: {
      sizes: [],
    },
  },
  images: [svgPath],
});
