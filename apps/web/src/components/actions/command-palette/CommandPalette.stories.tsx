import type { ReactElement } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ComputerDesktopIcon,
  HomeIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
} from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Command } from "./Command";
import { CommandPalette as Component } from "./CommandPalette";
import type { CommandPaletteProps as Props } from "./CommandPalette";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Command Palette",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function iconEl(node: ReactElement): ReactElement {
  return node;
}

const commands: Command[] = [
  {
    id: "goto-home",
    label: "Go to Home",
    description: "Navigate to the home view",
    group: "Navigation",
    keywords: ["start", "index"],
    icon: iconEl(<HomeIcon className="h-4 w-4" />),
    perform: () => console.log("goto home"),
  },
  {
    id: "goto-dashboard",
    label: "Go to Dashboard",
    description: "Open the dashboard view",
    group: "Navigation",
    icon: iconEl(<Squares2X2Icon className="h-4 w-4" />),
    perform: () => console.log("goto dashboard"),
  },
  {
    id: "theme-auto",
    label: "Theme: System",
    group: "Appearance",
    keywords: ["auto", "system"],
    icon: iconEl(<ComputerDesktopIcon className="h-4 w-4" />),
    perform: () => console.log("theme auto"),
  },
  {
    id: "theme-light",
    label: "Theme: Light",
    group: "Appearance",
    icon: iconEl(<SunIcon className="h-4 w-4" />),
    perform: () => console.log("theme light"),
  },
  {
    id: "theme-dark",
    label: "Theme: Dark",
    group: "Appearance",
    icon: iconEl(<MoonIcon className="h-4 w-4" />),
    perform: () => console.log("theme dark"),
  },
  {
    id: "logout",
    label: "Log out",
    description: "End the current session",
    group: "Account",
    icon: iconEl(<ArrowLeftStartOnRectangleIcon className="h-4 w-4" />),
    perform: () => console.log("logout"),
  },
];

const defaultArgs: Props = {
  isOpen: true,
  commands,
  onClose: () => console.log("onClose"),
};

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: {
    ...defaultArgs,
    commands: [],
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
