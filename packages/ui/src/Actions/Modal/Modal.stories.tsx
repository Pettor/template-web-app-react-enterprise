import type { Meta, StoryObj } from "@storybook/react";
import type { ModalProps as Props } from "./Modal";
import { Modal as Component } from "./Modal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Actions/Modal",
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: "Modal Title",
  children: <div>This is content test</div>,
} satisfies Props;

export const Standard: Story = {
  args: defaultArgs,
};
