import { mocksClient } from "@package/mocks";
import { expect, test } from "../fixtures";

test.describe("general.settings", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("opens settings modal, checks all sections and switches themes", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();

    // Open quick menu via avatar button, then open settings
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__settings-button").click();

    // Settings dialog should be visible
    const dialog = page.getByRole("dialog", { name: "Settings" });
    await expect(dialog).toBeVisible();

    // All three section tabs should be present
    await expect(page.getByRole("tab", { name: "Account" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Appearance" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "About" })).toBeVisible();

    // Navigate to Appearance tab and cycle through themes
    await page.getByRole("tab", { name: "Appearance" }).click();

    await page.getByRole("radio", { name: "Light" }).click({ force: true });
    await expect(page.locator("html")).toHaveClass("light");

    await page.getByRole("radio", { name: "Dark" }).click({ force: true });
    await expect(page.locator("html")).toHaveClass("dark");

    // Auto resolves based on system preference — verify the radio is selected
    await page.getByRole("radio", { name: "Auto" }).click({ force: true });
    await expect(page.getByRole("radio", { name: "Auto" })).toBeChecked();

    // Navigate to Account tab and verify it becomes active
    await page.getByRole("tab", { name: "Account" }).click();
    await expect(page.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");

    // Navigate to About tab and verify it becomes active
    await page.getByRole("tab", { name: "About" }).click();
    await expect(page.getByRole("tab", { name: "About" })).toHaveAttribute("aria-selected", "true");

    // Close the modal
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("general.commandpalette", () => {
  test.beforeEach(async () => {
    await mocksClient.restoreRouteVariants();
  });

  test("navigates to dashboard using command palette", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Search for the dashboard command and execute it
    await search.fill("dashboard");
    const dashboardItem = page.getByTestId("command-palette__item-goto-dashboard");
    await expect(dashboardItem).toBeVisible();
    await dashboardItem.click();

    await expect(async () => {
      expect(await page.title()).toBe("Dashboard");
    }).toPass();
  });

  test("switches to dark theme via command palette", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Search for dark theme command and apply it
    await search.fill("dark");
    const darkItem = page.getByTestId("command-palette__item-theme-dark");
    await expect(darkItem).toBeVisible();
    await darkItem.click();

    await expect(page.locator("html")).toHaveClass("dark");
  });

  test("shows no results for unmatched search query", async ({ page }) => {
    await page.goto("/");

    await expect(async () => {
      expect(await page.title()).toBe("Home");
    }).toPass();

    // Open command palette via quick menu
    await page.getByTestId("home-page__menu-button").click();
    await page.getByTestId("quick-menu__search-button").click();

    const search = page.getByTestId("command-palette__search");
    await expect(search).toBeVisible();

    // Type a query that matches no commands
    await search.fill("zzznomatch");
    await expect(page.getByText("No commands found")).toBeVisible();
  });
});
