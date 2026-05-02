import type { Meta, StoryObj } from "@storybook/react-vite";
import { SignUpView as Component } from "./SignUpView";
import type { SignUpViewProps as Props } from "./SignUpView";
import { BasicLayoutDecorator } from "~/storybook/decorators/BasicLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Sign Up",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [BasicLayoutDecorator()],
  argTypes: {
    signUpForm: {
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
  signUpForm: {
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
