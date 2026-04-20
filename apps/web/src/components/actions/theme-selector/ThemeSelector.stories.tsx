import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSelector as Component } from "./ThemeSelector";
import type { ThemeSelectorProps as Props } from "./ThemeSelector";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Theme Selector",
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  mode: "auto",
  onSelect: (mode) => console.log("Selected:", mode),
} satisfies Props;

export const Auto: Story = {
  args: defaultArgs,
};

export const Light: Story = {
  args: { ...defaultArgs, mode: "light" },
};

export const Dark: Story = {
  args: { ...defaultArgs, mode: "dark" },
};
