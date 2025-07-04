import { FullSizeDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AboutView as Component } from "./AboutView";
import type { AboutViewProps as Props } from "./AboutView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/About",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appName: "My App",
  appVersion: "1.0.0",
  serverVersion: "1.0.0",
  onBack: () => console.log("onBack"),
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
