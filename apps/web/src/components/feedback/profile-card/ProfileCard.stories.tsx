import { CenterDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ProfileCard as Component } from "./ProfileCard";
import type { ProfileCardProps as Props } from "./ProfileCard";
import { AppSessionData } from "~/storybook/data/AppSessionData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Profile/Card",
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
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__details")).toHaveTextContent("John Doe");
    await expect(canvas.getByTestId("profile-card__details")).toHaveTextContent("john.doe@gmail.com");

    userEvent.click(canvas.getByTestId("profile-card__logout-button"));
  },
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    name: "",
    email: "",
  },
  play: async ({ canvas }) => {
    // No text should be visible during loading
    await expect(canvas.getByTestId("profile-card__details")).not.toHaveTextContent(/./);
    await expect(canvas.getByTestId("profile-card__details")).not.toHaveTextContent(/./);
  },
};
