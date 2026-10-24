import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { NotesView as Component } from "./NotesView";
import type { NotesViewProps as Props } from "./NotesView";
import { createNote } from "~/core/data/AppData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const NOW = Date.parse("2026-10-21T10:00:00Z");

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Notes",
  tags: ["autodocs"],
  decorators: [NavbarLayoutDecorator()],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  notes: {
    notes: [
      createNote({ title: "Plan the launch", body: "Draft the announcement." }, new Date(NOW), "N1"),
      createNote({ title: "Book the venue" }, new Date(NOW - 3_600_000), "N2"),
    ],
    onAdd: fn(),
    onTogglePinned: fn(),
    onArchive: fn(),
  },
  syncStatus: {
    now: NOW,
    status: { state: "synced", method: "github", folderName: "you/app-data", lastSyncedAt: "2026-10-21T09:58:00Z" },
    onPress: fn(),
  },
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("sync-status"));
    await expect(args.syncStatus.onPress).toHaveBeenCalled();
  },
};

export const LocalOnly: Story = {
  args: {
    ...defaultArgs,
    notes: { ...defaultArgs.notes, notes: [] },
    syncStatus: { ...defaultArgs.syncStatus, status: { state: "local", method: "local" } },
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
