import { FullSizeDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ForgotPasswordView as Component } from "./ForgotPasswordView";
import type { ForgotPasswordViewProps as Props } from "./ForgotPasswordView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Forgot Password",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    resetForm: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  appName: "My App",
  resetForm: {
    loading: false,
    onSubmit: () => console.log("onSubmit"),
  },
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
