import { CommonDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react";
import { AboutModal as Component } from "./AboutModal";
import type { AboutModalProps as Props } from "./AboutModal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/About",
  decorators: [CommonDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  modal: {
    isOpen: true,
  },
  aboutDetails: {
    appName: "My App",
    appVersion: "1.0.0",
    serverVersion: "1.0.0",
  },
} satisfies Props;

export const Modal: Story = {
  args: defaultArgs,
};
