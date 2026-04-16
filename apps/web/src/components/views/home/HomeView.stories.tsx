import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavbarLayoutDecorator } from "@package/storybook";
import { StorybookNavbarContentComponent } from "~/storybook/components/StorybookNavbarContentComponent";
import { HomeView as Component } from "./HomeView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator(<StorybookNavbarContentComponent />)],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Fullscreen: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};
