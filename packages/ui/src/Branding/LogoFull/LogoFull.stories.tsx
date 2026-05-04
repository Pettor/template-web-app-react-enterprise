import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LogoFull as Component } from "./LogoFull";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Branding/Logo/Full",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullSmall: Story = {
  args: {
    appName: "My App",
    size: "small",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  },
};

export const FullMedium: Story = {
  args: {
    appName: "My App",
    size: "medium",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  },
};

export const FullLarge: Story = {
  args: {
    appName: "My App",
    size: "large",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  },
};
