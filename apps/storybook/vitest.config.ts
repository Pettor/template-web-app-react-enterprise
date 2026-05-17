import { createRequire } from "node:module";
import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const require = createRequire(import.meta.url);
const webAppSrc = path.resolve(path.dirname(require.resolve("@app/web/package.json")), "src");

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
        "**/apps/web/src/views/**",
        "**/apps/web/src/routes/**",
        "**/core/social-links/AppSocialLinks.ts",
      ],
      reporter: ["cobertura", "json"],
    },
    projects: [
      {
        extends: true,
        resolve: {
          alias: {
            "~": webAppSrc,
          },
          dedupe: ["react", "react-dom", "storybook"],
          tsconfigPaths: true,
        },
        optimizeDeps: {
          include: [
            "react/jsx-dev-runtime",
            "@storybook/addon-themes",
            "react-intl",
            "@heroicons/react/24/outline",
            "@heroicons/react/20/solid",
            "@heroui/react",
            "@tanstack/react-form",
            "@tanstack/react-router",
            "@faker-js/faker",
            "clsx",
            "zod",
          ],
          // storybook/test is a virtual module provided by storybookTest() plugin at runtime;
          // excluding it prevents esbuild from failing the dependency scan before the plugin loads.
          exclude: ["storybook/test"],
        },
        plugins: [react(), tailwindcss(), storybookTest({ configDir: path.join(__dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        extends: true,
        resolve: {
          alias: {
            "~": webAppSrc,
          },
          tsconfigPaths: true,
        },
        test: {
          name: "unit",
          environment: "node",
          include: [`${webAppSrc}/**/*.test.{ts,tsx}`],
          // Force exit after unit tests — prevents hanging async ops in Node env
          exit: true,
        },
      },
    ],
  },
});
