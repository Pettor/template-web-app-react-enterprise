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
  play: async ({ canvas, userEvent }) => {
    const searchButton = canvas.getByTestId("quick-menu__search-button");
    const settingsButton = canvas.getByTestId("quick-menu__settings-button");
    const logoutButton = canvas.getByTestId("quick-menu__logout-button");

    await expect(searchButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();

    await userEvent.click(searchButton);
    await userEvent.click(settingsButton);
    await userEvent.click(logoutButton);
  },
} satisfies Story;
