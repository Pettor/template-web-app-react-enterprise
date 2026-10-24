import { mocksClient } from "@package/mocks";
import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

// Where the notes example lives, and its document title.
const NOTES_PAGE = { url: "/#/notes", title: "Notes" };

test.beforeEach(async () => {
  await mocksClient.restoreRouteVariants();
});

async function openNotes(page: Page): Promise<void> {
  await page.goto(NOTES_PAGE.url);
  await expect(async () => {
    expect(await page.title()).toBe(NOTES_PAGE.title);
  }).toPass();
}

test.describe("data.notes", () => {
  test("adds, pins and archives notes, and keeps them after a reload", async ({ page }) => {
    await openNotes(page);
    await expect(page.getByTestId("notes-panel__empty")).toBeVisible();

    await page.getByTestId("notes-panel__title").fill("Plan the launch");
    await page.getByTestId("notes-panel__body").fill("Draft the announcement");
    await page.getByTestId("notes-panel__add").click();
    await page.getByTestId("notes-panel__title").fill("Book the venue");
    await page.getByTestId("notes-panel__add").click();

    const notes = page.getByTestId("notes-panel__note");
    await expect(notes).toHaveCount(2);
    await expect(notes.first()).toContainText("Book the venue");

    await page.getByRole("button", { name: "Pin Plan the launch" }).click();
    await expect(notes.first()).toContainText("Plan the launch");

    await page.reload();
    await expect(notes).toHaveCount(2);
    await expect(notes.first()).toContainText("Plan the launch");

    await page.getByRole("button", { name: "Archive Book the venue" }).click();
    await expect(notes).toHaveCount(1);
  });
});

test.describe("data.sync", () => {
  test("shows the sync status and opens the sync settings from it", async ({ page }) => {
    await openNotes(page);

    const status = page.getByTestId("sync-status").first();
    await expect(status).toHaveAttribute("data-state", "local");
    await expect(status).toHaveAccessibleName(/Only on this device/);
    await status.click();

    const dialog = page.getByRole("dialog", { name: "Settings" });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("tab", { name: "Sync" })).toHaveAttribute("aria-selected", "true");

    const panel = dialog.getByRole("tabpanel", { name: "Sync" });
    await expect(panel.getByRole("radio", { name: /This browser only/ })).toBeChecked();
    await panel.getByText("GitHub", { exact: true }).click();
    await expect(panel.getByTestId("settings__github-setup")).toBeVisible();
    await expect(panel.getByTestId("settings__github-connect")).toBeDisabled();
  });
});
