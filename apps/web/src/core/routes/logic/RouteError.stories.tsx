import { RouterDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RouteError } from "./RouteError";

const meta: Meta<typeof RouteError> = {
  component: RouteError,
  title: "Route/Error",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [RouterDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrorMessage: Story = {
  args: {
    error: new Error("Failed to fetch data from /api/users"),
  },
};
