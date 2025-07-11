import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo as Component } from "./Logo";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Branding/Logo",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
