import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeView as Component } from "./HomeView";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Fullscreen: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};
