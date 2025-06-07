import type { Meta, StoryObj } from "@storybook/react";
import { Appbar as Component } from "./Appbar";
import type { AppbarProps as Props } from "./Appbar";
import { AppbarCommonData } from "~/storybook/data/AppbarData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/Appbar",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  ...AppbarCommonData,
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
  parameters: {
    viewport: {
      defaultViewport: "iphonex",
    },
  },
};
