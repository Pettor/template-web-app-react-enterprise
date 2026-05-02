import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { NavbarContent as Component } from "./NavbarContent";
import type { NavbarContentProps as Props } from "./NavbarContent";
import { NavbarContentCommonData } from "~/storybook/data/NavbarContentData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Navigation/Navbar Content",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  ...NavbarContentCommonData,
} satisfies Props;

export const Responsive: Story = {
  args: defaultArgs,
};

export const Desktop: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};

export const Interaction: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const menuButton = canvas.getByTestId("home-page__menu-button");
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);
    const body = within(document.body);
    await expect(body.getByTestId("quick-menu__settings-button")).toBeInTheDocument();
    await userEvent.click(body.getByTestId("quick-menu__settings-button"));
  },
};
