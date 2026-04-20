import { ContainerDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { QuickMenu as Component } from "./QuickMenu";
import type { QuickMenuProps as Props } from "./QuickMenu";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Quick Menu",
  tags: ["autodocs"],
  decorators: [ContainerDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Props = {
  onSettings: () => console.log("onSettings"),
  onLogout: () => console.log("onLogout"),
  onSearch: () => console.log("onSearch"),
};

export const Default: Story = {
  args: defaultArgs,
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("quick-menu__search-button")).toBeInTheDocument();
    await expect(canvas.getByTestId("quick-menu__settings-button")).toBeInTheDocument();
    await expect(canvas.getByTestId("quick-menu__logout-button")).toBeInTheDocument();
  },
} satisfies Story;
