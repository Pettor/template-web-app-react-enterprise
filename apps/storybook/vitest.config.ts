import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      allowExternal: true,
      include: ["**/apps/**/src/**/*.{ts,tsx}", "**/packages/ui/**/src/**/*.{ts,tsx}"],
      exclude: [
        "**/src/**/*.stories.{ts,tsx}",
        "**/src/**/*.test.{ts,tsx}",
        "**/src/**/*.spec.{ts,tsx}",
        "**/src/**/*.d.ts",
        "**/src/**/index.ts",
        "**/{storybook,Storybook}/**/*.{ts,tsx}",
      ],
      reporter: ["cobertura"]
    },
    projects: [
      {
        extends: true,
        optimizeDeps: {
          include: ["react/jsx-dev-runtime"],
        },
        plugins: [
          react(),
          tailwindcss(),
          tsconfigPaths(),
          storybookTest({ configDir: path.join(__dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [path.join(".storybook", "vitest.setup.ts")],
        },
      },
    ],
  },
});
