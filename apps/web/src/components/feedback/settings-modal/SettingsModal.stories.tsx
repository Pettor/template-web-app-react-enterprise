import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { SettingsModal as Component } from "./SettingsModal";
import type { SettingsModalProps as Props } from "./SettingsModal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const accountArgs = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const aboutArgs = {
  appName: "My App",
  appVersion: "1.0.0",
  serverVersion: "2.0.0",
  onShowWhatsNew: () => console.log("onShowWhatsNew"),
};

const appearanceArgs = {
  themeSelector: {
    mode: "auto" as const,
    onSelect: (mode: string) => console.log("onSelect", mode),
  },
};

const syncArgs = {
  status: { state: "local", method: "local" },
  isFolderSupported: true,
  deviceName: "Mac",
  onConnectFolder: fn(async () => "cancelled" as const),
  onConnectGitHub: fn(async () => ({ result: "error" as const, errorKind: "unauthorized" as const, detail: "" })),
  onReconnect: fn(),
  onDisconnect: fn(),
  onSyncNow: fn(),
  onDeviceNameChange: fn(),
  now: Date.parse("2026-10-21T10:00:00Z"),
} satisfies Props["sync"];

const allSections = ["account", "appearance", "sync", "about"] as Props["sections"];

const defaultArgs = {
  isOpen: true,
  sections: allSections,
  onClose: () => console.log("onClose"),
  account: accountArgs,
  appearance: appearanceArgs,
  sync: syncArgs,
  aboutDetails: aboutArgs,
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Account: Story = {
  args: {
    ...defaultArgs,
    initialSection: "account",
  },
};

export const Appearance: Story = {
  args: {
    ...defaultArgs,
    initialSection: "appearance",
  },
};

export const Sync: Story = {
  args: {
    ...defaultArgs,
    initialSection: "sync",
  },
  play: async ({ args, userEvent }) => {
    const body = within(document.body);
    const panel = body.getAllByRole("tabpanel").find((element) => !element.hidden)!;
    const section = within(panel);

    await userEvent.click(section.getByText("GitHub"));
    await userEvent.type(section.getByTestId("settings__github-owner"), "you");
    await userEvent.type(section.getByTestId("settings__github-repository"), "app-data");
    await userEvent.type(section.getByTestId("settings__github-token"), "github_pat_wrong");
    await userEvent.click(section.getByTestId("settings__github-connect"));

    await expect(args.sync?.onConnectGitHub).toHaveBeenCalledWith({
      owner: "you",
      repository: "app-data",
      token: "github_pat_wrong",
    });
    await expect(await section.findByTestId("settings__github-connect-error")).toHaveTextContent(
      "GitHub didn't accept the token"
    );
  },
};

export const SyncWithGitHub: Story = {
  args: {
    ...defaultArgs,
    initialSection: "sync",
    sync: {
      ...syncArgs,
      status: {
        state: "synced",
        method: "github",
        folderName: "you/app-data",
        lastSyncedAt: "2026-10-21T09:58:00Z",
        git: { remoteUrl: "github.com/you/app-data", branch: "main", lastSyncedAt: "2026-10-21T09:58:00Z" },
      },
    },
  },
};

export const SyncWithLocalGitRepo: Story = {
  args: {
    ...defaultArgs,
    initialSection: "sync",
    sync: {
      ...syncArgs,
      status: {
        state: "synced",
        method: "folder",
        folderName: "app-data",
        lastSyncedAt: "2026-10-21T09:59:00Z",
        git: { isLocalClone: true, branch: "main", remoteUrl: "git@github.com:you/app-data.git" },
      },
    },
  },
};

export const About: Story = {
  args: {
    ...defaultArgs,
    initialSection: "about",
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
