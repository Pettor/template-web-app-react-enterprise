import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: "./global-setup.ts",
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", ignoreHTTPSErrors: true },
      testMatch: "**/*.spec.ts",
    },
  ],
  reporter: [["list"], ["json", { outputFile: "./test-results/test-results.json" }]],
  retries: 1,
  testDir: "src",
  use: {
    baseURL: "https://localhost:4173",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm -w run test:e2e:env",
    url: "https://localhost:4173",
    reuseExistingServer: true,
    ignoreHTTPSErrors: true,
    timeout: 30000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
