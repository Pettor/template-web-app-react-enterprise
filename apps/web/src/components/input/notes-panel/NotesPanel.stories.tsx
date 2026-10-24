import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { NotesPanel as Component } from "./NotesPanel";
import type { NotesPanelProps as Props } from "./NotesPanel";
import { createNote, updateNote } from "~/core/data/AppData";

const pinned = updateNote(
  { notes: { N1: createNote({ title: "Plan the launch" }, new Date("2026-10-20T08:00:00Z"), "N1") } },
  "N1",
  { pinned: true },
  new Date("2026-10-21T08:00:00Z")
).notes.N1!;

const notes = [
  pinned,
  createNote(
    { title: "Book the venue", body: "Ask for the big room.\nCheck parking." },
    new Date("2026-10-21T09:00:00Z"),
    "N2"
  ),
];

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Notes Panel",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  notes,
  onAdd: fn(),
  onTogglePinned: fn(),
  onArchive: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: { ...defaultArgs, notes: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("notes-panel__empty")).toBeVisible();
  },
};

export const AddsANote: Story = {
  args: { ...defaultArgs, notes: [] },
  play: async ({ args, canvas, userEvent }) => {
    const add = canvas.getByTestId("notes-panel__add");
    await expect(add).toBeDisabled();

    await userEvent.type(canvas.getByTestId("notes-panel__title"), "Call the printer");
    await userEvent.type(canvas.getByTestId("notes-panel__body"), "Before Friday");
    await userEvent.click(add);

    await expect(args.onAdd).toHaveBeenCalledWith({ title: "Call the printer", body: "Before Friday" });
    await expect(canvas.getByTestId("notes-panel__title")).toHaveValue("");
  },
};

export const PinsAndArchives: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Unpin Plan the launch" }));
    await expect(args.onTogglePinned).toHaveBeenCalledWith("N1");

    await userEvent.click(canvas.getByRole("button", { name: "Archive Book the venue" }));
    await expect(args.onArchive).toHaveBeenCalledWith("N2");
  },
};
