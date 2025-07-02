import { FullSizeDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeView as Component } from "./HomeView";
import type { HomeViewProps as Props } from "./HomeView";
import { AppbarCommonData } from "~/storybook/data/AppbarData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appNavbarProps: AppbarCommonData,
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  decorators: [FullSizeDecorator],
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
