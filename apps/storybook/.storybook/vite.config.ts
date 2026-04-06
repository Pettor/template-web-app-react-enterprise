import { createBaseConfig } from "@config/vite";
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";
import { defineConfig, mergeConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return mergeConfig(createBaseConfig(), {
    base: "./",
    plugins: [tailwindcss() as PluginOption],
    resolve: {
      tsconfigPaths: true,
    },
  });
});
