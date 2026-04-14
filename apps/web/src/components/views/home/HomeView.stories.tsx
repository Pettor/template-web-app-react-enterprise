import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeView as Component } from "./HomeView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Fullscreen: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};
