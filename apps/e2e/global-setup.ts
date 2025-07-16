import { chromium } from "@playwright/test";

async function globalSetup() {
  const browser = await chromium.launch({
    args: ["--ignore-certificate-errors"],
  });
  const page = await browser.newPage();

  // Wait for the server to respond
  await page.goto("https://localhost:5173", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await browser.close();
}

export default globalSetup;
