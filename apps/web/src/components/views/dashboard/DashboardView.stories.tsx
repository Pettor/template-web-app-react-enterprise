import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardView as Component } from "./DashboardView";
import type { DashboardViewProps as Props } from "./DashboardView";
import { DashboardChartData, DashboardStatsData, DashboardTransactionsData } from "~/storybook/data/DashboardData";
import { NavbarLayoutDecorator } from "~/storybook/decorators/NavbarLayoutDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Dashboard",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [NavbarLayoutDecorator()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  stats: DashboardStatsData,
  chartData: DashboardChartData,
  recentTransactions: DashboardTransactionsData,
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
