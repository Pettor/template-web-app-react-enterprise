import { createRequire } from "node:module";
import path from "node:path";
import { createBaseConfig } from "@config/vite";
import { defineConfig, mergeConfig } from "vite";

const require = createRequire(import.meta.url);
const webAppSrc = path.resolve(path.dirname(require.resolve("@app/web/package.json")), "src");

// https://vitejs.dev/config/
export default defineConfig(() => {
  return mergeConfig(createBaseConfig(), {
    base: "./",
    resolve: {
      alias: {
        "~": webAppSrc,
      },
    },
  });
});
