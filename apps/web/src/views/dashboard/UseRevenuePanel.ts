import { useMemo, useState } from "react";
import type { DashboardChartPoint } from "@package/api";
import { RANGE_TABS, sliceByRange } from "~/views/dashboard/DashboardUtils";
import type { RangeValue } from "~/views/dashboard/DashboardUtils";

export type { RangeValue };
export { RANGE_TABS };

export interface RevenueTotals {
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

export interface RevenuePanelState {
  range: RangeValue;
  setRange: (r: RangeValue) => void;
  slice: DashboardChartPoint[];
  totals: RevenueTotals;
}

export function UseRevenuePanel(chartData: DashboardChartPoint[]): RevenuePanelState {
  const [range, setRange] = useState<RangeValue>("6m");
  const slice = useMemo(() => sliceByRange(chartData, range), [chartData, range]);
  const totals = useMemo<RevenueTotals>(() => {
    const revenue = slice.reduce((s, d) => s + d.revenue, 0);
    const expenses = slice.reduce((s, d) => s + d.expenses, 0);
    const profit = revenue - expenses;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    return { revenue, expenses, profit, margin };
  }, [slice]);

  return { range, setRange, slice, totals };
}
