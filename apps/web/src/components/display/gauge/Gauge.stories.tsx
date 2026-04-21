import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gauge as Component } from "./Gauge";
import type { GaugeProps as ComponentProps } from "./Gauge";

const meta: Meta<typeof Component> = {
  title: "Display/Gauge",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  value: 1280,
  total: 2350,
  subLabel: "active rate",
} satisfies ComponentProps;

export const Default: Story = {
  args: defaultArgs,
};

export const High: Story = {
  args: {
    ...defaultArgs,
    value: 2100,
    total: 2350,
    subLabel: "completion",
  },
};

export const Low: Story = {
  args: {
    ...defaultArgs,
    value: 300,
    total: 2350,
    subLabel: "conversion",
  },
};

export const Empty: Story = {
  args: {
    ...defaultArgs,
    value: 0,
    subLabel: "no data",
  },
};

export const Small: Story = {
  args: {
    ...defaultArgs,
    size: 80,
    strokeWidth: 8,
  },
};
