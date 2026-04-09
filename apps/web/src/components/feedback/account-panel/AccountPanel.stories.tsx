import { CenterDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { AccountPanel as Component } from "./AccountPanel";
import type { AccountPanelProps as Props } from "./AccountPanel";
import { AppSessionData } from "~/storybook/data/AppSessionData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Account/Panel",
  decorators: [CenterDecorator],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  ...AppSessionData,
} satisfies Props;

export const WithData: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("account-panel__details")).toHaveTextContent("John Doe");
    await expect(canvas.getByTestId("account-panel__details")).toHaveTextContent("john.doe@gmail.com");

    userEvent.click(canvas.getByTestId("account-panel__logout-button"));
  },
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    name: "",
    email: "",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("account-panel__details")).not.toHaveTextContent(/./);
    await expect(canvas.getByTestId("account-panel__details")).not.toHaveTextContent(/./);
  },
};
