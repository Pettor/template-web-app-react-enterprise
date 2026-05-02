import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginView as Component } from "./LoginView";
import type { LoginViewProps as Props } from "./LoginView";
import { BasicLayoutDecorator } from "~/storybook/decorators/BasicLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Login",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [BasicLayoutDecorator()],
  argTypes: {
    loginForm: {
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
  loginForm: {
    loading: false,
    onForgotPassword: () => console.log("handleForgotPassword"),
    onSignUp: () => console.log("handleSignUp"),
    onSubmit: () => console.log("onSubmit"),
  },
  onSettings: () => console.log("onSettings"),
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
