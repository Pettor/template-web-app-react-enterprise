import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardView as Component } from "./DashboardView";
import type { DashboardViewProps as Props } from "./DashboardView";
import { DashboardChartData, DashboardStatsData, DashboardTransactionsData } from "~/storybook/data/DashboardData";
import { NavbarContentCommonData } from "~/storybook/data/NavbarContentData";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Dashboard",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  navbarContentProps: { ...NavbarContentCommonData, activeTab: "dashboard" },
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
