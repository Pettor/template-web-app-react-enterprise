import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkline as Component } from "./Sparkline";
import type { SparklineProps as ComponentProps } from "./Sparkline";

const meta: Meta<typeof Component> = {
  title: "Display/Sparkline",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const uptrend = [22, 24, 23, 28, 26, 31, 30, 34, 33, 38, 36, 45];
const downtrend = [45, 42, 38, 35, 33, 30, 28, 25, 22, 20, 18, 15];
const flat = [14, 13.5, 14.2, 13, 13.5, 12.8, 13.1, 12.9, 12.6, 13.0, 12.8, 12.5];

const defaultArgs = {
  data: uptrend,
  stroke: "var(--accent)",
  fill: "var(--accent)",
} satisfies ComponentProps;

export const Accent: Story = {
  args: defaultArgs,
};

export const Success: Story = {
  args: {
    ...defaultArgs,
    stroke: "var(--success)",
    fill: "var(--success)",
  },
};

export const Warning: Story = {
  args: {
    ...defaultArgs,
    data: flat,
    stroke: "var(--warning)",
    fill: "var(--warning)",
  },
};

export const Downtrend: Story = {
  args: {
    ...defaultArgs,
    data: downtrend,
    stroke: "var(--danger)",
    fill: "var(--danger)",
  },
};

export const Violet: Story = {
  args: {
    ...defaultArgs,
    stroke: "#9353d3",
    fill: "#9353d3",
  },
};

export const Wide: Story = {
  args: {
    ...defaultArgs,
    width: 160,
    height: 40,
  },
};
