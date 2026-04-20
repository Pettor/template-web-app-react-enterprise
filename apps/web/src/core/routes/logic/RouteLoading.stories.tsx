import type { Meta, StoryObj } from "@storybook/react-vite";
import { RouteLoading as Component } from "./RouteLoading";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Core/Route Loading",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
