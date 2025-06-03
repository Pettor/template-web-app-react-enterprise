import type { Meta, StoryObj } from "@storybook/react";
import { FullSizeDecorator } from "storybook-package";
import { HomeView as Component } from "./HomeView";
import type { HomeViewProps as Props } from "./HomeView";
import { AppSocialLinksData } from "~/storybook/data/AppSocialLinksData";

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
  appNavbarProps: {
    ...AppSocialLinksData,
  },
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  decorators: [FullSizeDecorator],
  parameters: { viewport: { defaultViewport: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  parameters: { viewport: { defaultViewport: "iphonex" } },
};
