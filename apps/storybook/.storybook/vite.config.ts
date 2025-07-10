import { createBaseConfig } from "@config/vite";
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";
import { defineConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return mergeConfig(createBaseConfig(), {
    base: "./",
    plugins: [tailwindcss() as PluginOption, tsconfigPaths() as PluginOption],
    // Add storybook-specific dependencies to pre-optimization
    optimizeDeps: {
      include: ["@storybook/addon-interactions"],
    },
  });
});
