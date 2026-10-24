import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { WhatsNewDialog as Component } from "./WhatsNewDialog";
import type { WhatsNewDialogProps as Props, WhatsNewRelease } from "./WhatsNewDialog";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Whats New Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const latest: WhatsNewRelease = {
  version: "0.8.0",
  tagline: "Everything at your fingertips",
  highlights: [
    {
      emoji: "⚡",
      title: "Ctrl+K superpowers",
      description: "Press ⌘K or Ctrl+K anywhere to jump between pages, flip the theme or log out.",
    },
    {
      emoji: "📊",
      title: "A dashboard that dazzles",
      description: "KPIs, revenue charts, gauges and recent transactions, all on one shiny page.",
    },
    {
      emoji: "🌗",
      title: "Light, dark or follow your system",
      description: "Pick the mood that suits you. We'll remember it for next time.",
    },
  ],
  fixes: [
    {
      emoji: "📱",
      title: "Comfier on phones",
      description: "The menu slides in as a drawer and settings scroll as one list on small screens.",
    },
  ],
};

const previous: WhatsNewRelease = {
  version: "0.7.0",
  tagline: "Settings, sorted",
  highlights: [
    {
      emoji: "⚙️",
      title: "Settings, all in one place",
      description: "Your account, the look of the app and version details now live together in one tidy window.",
    },
  ],
  fixes: [],
};

const defaultArgs = {
  isOpen: true,
  appName: "Web App",
  releases: [latest],
  onClose: fn(),
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
  play: async ({ args }) => {
    const body = within(document.body);
    await expect(await body.findByText("What's new in Web App")).toBeInTheDocument();
    await expect(body.getByText("Everything at your fingertips")).toBeInTheDocument();
    await expect(body.getByText("Version 0.8.0")).toBeInTheDocument();
    await expect(body.getByText("Ctrl+K superpowers")).toBeInTheDocument();
    await expect(body.getByText(/Bugs squashed/)).toBeInTheDocument();
    await expect(body.queryByText(/releases to catch up on/)).toBeNull();

    body.getByRole("button", { name: /Let's go/ }).click();
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const SeveralVersions: Story = {
  args: { ...defaultArgs, releases: [latest, previous] },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText("Version 0.8.0")).toBeInTheDocument();
    await expect(body.getByText("Version 0.7.0")).toBeInTheDocument();
    await expect(body.getByText("Settings, sorted")).toBeInTheDocument();
    await expect(body.getByText(/2 releases to catch up on/)).toBeInTheDocument();
  },
};

export const HighlightsOnly: Story = {
  args: { ...defaultArgs, releases: [previous] },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText("Settings, all in one place")).toBeInTheDocument();
    await expect(body.queryByText(/Bugs squashed/)).toBeNull();
  },
};

export const Phone: Story = {
  args: { ...defaultArgs, releases: [latest, previous] },
  globals: { viewport: { value: "iphonex" } },
};
