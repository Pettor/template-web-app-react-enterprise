import { defineConfig } from "@playwright/test";

/**
 * Playwright config for E2E coverage runs.
 *
 * Differences from the default playwright.config.ts:
 * - webServer starts the Istanbul-instrumented Vite app (test:e2e:env:coverage)
 * - globalTeardown collects the per-test .nyc_output/ files into a Cobertura XML
 */
export default defineConfig({
  globalSetup: "./global-setup.ts",
  globalTeardown: "./coverage-teardown.ts",
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", ignoreHTTPSErrors: true },
      testMatch: "**/*.spec.ts",
    },
  ],
  reporter: [["list"], ["json", { outputFile: "./test-results/test-results.json" }]],
  retries: 1,
  // The mock server is shared state — run tests serially to prevent
  // concurrent variant mutations causing flaky failures (same as playwright.config.ts).
  workers: 1,
  testDir: "src",
  use: {
    baseURL: "https://localhost:4173",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm -w run test:e2e:env:coverage",
    url: "https://localhost:4173",
    reuseExistingServer: true,
    ignoreHTTPSErrors: true,
    timeout: 30000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
