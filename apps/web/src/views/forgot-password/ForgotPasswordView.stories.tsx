import type { Meta, StoryObj } from "@storybook/react-vite";
import { ForgotPasswordView as Component } from "./ForgotPasswordView";
import type { ForgotPasswordViewProps as Props } from "./ForgotPasswordView";
import { BasicLayoutDecorator } from "~/storybook/decorators/BasicLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Forgot Password",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [BasicLayoutDecorator()],
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
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
