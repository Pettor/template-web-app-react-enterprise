import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavbarContent as Component } from "./NavbarContent";
import type { NavbarContentProps as Props } from "./NavbarContent";
import { NavbarContentCommonData } from "~/storybook/data/NavbarContentData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/NavbarContent",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  ...NavbarContentCommonData,
} satisfies Props;

export const Responsive: Story = {
  args: defaultArgs,
};

export const Desktop: Story = {
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: "full",
    },
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
