import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfigFn} */
export default defineConfig(() => {
  return {
    base: "./",
    plugins: [tailwindcss(), tsconfigPaths()],
    // Add storybook-specific dependencies to pre-optimization
    optimizeDeps: {
      include: ["@storybook/addon-a11y"],
    },
  };
});
