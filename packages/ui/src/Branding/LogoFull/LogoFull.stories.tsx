import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoFull as Component } from "./LogoFull";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Branding/Logo/Full",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullMedium: Story = {
  args: {
    appName: "My App",
    size: "medium",
  },
};

export const FullLarge: Story = {
  args: {
    appName: "My App",
    size: "large",
  },
};
