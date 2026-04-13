import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeView as Component } from "./HomeView";
import type { HomeViewProps as Props } from "./HomeView";
import { NavbarContentCommonData } from "~/storybook/data/NavbarContentData";

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
  navbarContentProps: NavbarContentCommonData,
  onGithubClick: () => {},
  onLinkedInClick: () => {},
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
