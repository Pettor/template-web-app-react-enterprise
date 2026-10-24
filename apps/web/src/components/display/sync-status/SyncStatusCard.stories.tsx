import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { SyncStatusCard as Component } from "./SyncStatusCard";
import type { SyncStatusCardProps as Props } from "./SyncStatusCard";

const NOW = Date.parse("2026-10-21T10:00:00Z");

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Sync Status Card",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-64 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  now: NOW,
  status: { state: "synced", method: "folder", folderName: "app-data", lastSyncedAt: "2026-10-21T09:55:00Z" },
  onPress: fn(),
} satisfies Props;

export const Synced: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Synced 5 minutes ago")).toBeVisible();
  },
};

export const SyncedJustNow: Story = {
  args: {
    ...defaultArgs,
    status: { state: "synced", method: "github", folderName: "you/app-data", lastSyncedAt: "2026-10-21T09:59:50Z" },
  },
};

export const LocalOnly: Story = {
  args: { ...defaultArgs, status: { state: "local", method: "local" } },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Only on this device")).toBeVisible();
  },
};

export const Syncing: Story = {
  args: { ...defaultArgs, status: { state: "syncing", method: "github", folderName: "you/app-data" } },
};

export const PendingChanges: Story = {
  args: {
    ...defaultArgs,
    status: {
      state: "synced",
      method: "github",
      folderName: "you/app-data",
      lastSyncedAt: "2026-10-21T09:58:00Z",
      hasPendingChanges: true,
    },
  },
};

export const NeedsPermission: Story = {
  args: { ...defaultArgs, status: { state: "needs-permission", method: "folder", folderName: "app-data" } },
};

export const SyncError: Story = {
  args: {
    ...defaultArgs,
    status: { state: "error", method: "github", folderName: "you/app-data", error: "Bad credentials" },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Sync problem")).toBeVisible();
    await expect(canvas.getByText("Bad credentials")).toBeVisible();
  },
};

export const Icon: Story = {
  args: { ...defaultArgs, variant: "icon" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Synced 5 minutes ago. app-data" })).toBeVisible();
  },
};

export const OpensSettings: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("sync-status"));
    await expect(args.onPress).toHaveBeenCalled();
  },
};
