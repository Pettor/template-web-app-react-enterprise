import path from "node:path";
import { createBaseConfig } from "@config/vite";
import { defineConfig, mergeConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return mergeConfig(createBaseConfig(), {
    base: "./",
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "../../web/src"),
      },
    },
  });
});
