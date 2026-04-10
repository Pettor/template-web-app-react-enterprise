import { describe, expect, it } from "vitest";
import { dashboardConvertFromDto } from "./Convert";

describe("dashboardConvertFromDto", () => {
  it("maps stats from the DTO", () => {
    const dto = {
      stats: { totalRevenue: 100, totalUsers: 50, activeUsers: 30, conversionRate: 5.5 },
      chartData: [],
      recentTransactions: [],
    };
    const result = dashboardConvertFromDto(dto);
    expect(result.stats.totalRevenue).toBe(100);
    expect(result.stats.conversionRate).toBe(5.5);
  });

  it("maps chart data from the DTO", () => {
    const dto = {
      stats: { totalRevenue: 0, totalUsers: 0, activeUsers: 0, conversionRate: 0 },
      chartData: [{ label: "Jan", revenue: 4000, expenses: 2400 }],
      recentTransactions: [],
    };
    const result = dashboardConvertFromDto(dto);
    expect(result.chartData).toHaveLength(1);
    expect(result.chartData[0].label).toBe("Jan");
  });

  it("maps transactions from the DTO", () => {
    const dto = {
      stats: { totalRevenue: 0, totalUsers: 0, activeUsers: 0, conversionRate: 0 },
      chartData: [],
      recentTransactions: [
        { id: "tx-1", customer: "Jane", email: "jane@test.com", amount: 150, status: "completed", date: "2026-01-01" },
      ],
    };
    const result = dashboardConvertFromDto(dto);
    expect(result.recentTransactions).toHaveLength(1);
    expect(result.recentTransactions[0].customer).toBe("Jane");
  });
});
