import { describe, expect, it } from "vitest";
import { dashboardDataSchema } from "./Types";

const validData = {
  stats: {
    totalRevenue: 45231.89,
    totalUsers: 2350,
    activeUsers: 1280,
    conversionRate: 12.5,
  },
  chartData: [
    { label: "Jan", revenue: 4000, expenses: 2400 },
    { label: "Feb", revenue: 3000, expenses: 1398 },
  ],
  recentTransactions: [
    {
      id: "tx-1",
      customer: "John Doe",
      email: "john@test.com",
      amount: 250.0,
      status: "completed",
      date: "2026-04-01",
    },
  ],
};

describe("dashboardDataSchema", () => {
  it("parses valid dashboard data", () => {
    const result = dashboardDataSchema.parse(validData);
    expect(result.stats.totalRevenue).toBe(45231.89);
    expect(result.chartData).toHaveLength(2);
    expect(result.recentTransactions).toHaveLength(1);
  });

  it("rejects data with missing stats", () => {
    expect(() => dashboardDataSchema.parse({ chartData: [], recentTransactions: [] })).toThrow();
  });

  it("rejects null", () => {
    expect(() => dashboardDataSchema.parse(null)).toThrow();
  });

  it("rejects invalid chart point", () => {
    const invalid = { ...validData, chartData: [{ label: 123 }] };
    expect(() => dashboardDataSchema.parse(invalid)).toThrow();
  });
});
