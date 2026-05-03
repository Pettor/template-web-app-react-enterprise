import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { BlueFadeBackground as Component } from "./BlueFadeBackground";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Layout/Background/Blue Fade",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("div")).toBeInTheDocument();
  },
};
