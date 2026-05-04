import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  // Servers are started by turbo (test:e2e:env) concurrently with this task.
  // globalSetup.ui.ts waits for both ports to be ready before tests run.
  globalSetup: "./global-setup.ui.ts",
  webServer: undefined,
});
