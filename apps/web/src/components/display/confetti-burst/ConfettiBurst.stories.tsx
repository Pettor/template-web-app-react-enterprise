import { useState, type ReactElement } from "react";
import { Button } from "@heroui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ConfettiBurst as Component } from "./ConfettiBurst";
import type { ConfettiBurstProps as Props } from "./ConfettiBurst";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Confetti Burst",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-surface relative grid h-64 w-full place-items-center overflow-hidden rounded-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  active: true,
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll("span").length).toBe(36);
  },
};

export const Small: Story = {
  args: { ...defaultArgs, pieces: 12 },
};

function ReplayExample(): ReactElement {
  const [burst, setBurst] = useState(0);
  return (
    <>
      <Component key={burst} active={burst > 0} />
      <Button onPress={() => setBurst((count) => count + 1)}>Celebrate 🎉</Button>
    </>
  );
}

export const Replay: Story = {
  render: () => <ReplayExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /Celebrate/ })).toBeInTheDocument();
  },
};
