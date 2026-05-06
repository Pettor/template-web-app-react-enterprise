import { test } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const publicDir = path.resolve(fileURLToPath(import.meta.url), "../../../../apps/web/public");

// These dimensions must match the PWA manifest screenshot sizes in configs/vite/src/pwa.ts
test("desktop screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 690, height: 670 });
  await page.goto("/iframe.html?id=views-login--fullscreen&viewMode=story");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: path.join(publicDir, "screenshot-desktop.png") });
});

test("phone screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 435, height: 608 });
  await page.goto("/iframe.html?id=views-login--phone&viewMode=story");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: path.join(publicDir, "screenshot-phone.png") });
});
