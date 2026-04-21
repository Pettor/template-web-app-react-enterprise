import { describe, expect, it } from "vitest";
import { dashboardConvertFromDto } from "./Convert";
import type { DashboardDataDto } from "./Types";

function baseDto(overrides: Partial<DashboardDataDto> = {}): DashboardDataDto {
  return {
    stats: { totalRevenue: 0, totalUsers: 0, activeUsers: 0, conversionRate: 0 },
    chartData: [],
    recentTransactions: [],
    kpis: [],
    cohorts: [],
    channels: [],
    activity: [],
    ...overrides,
  };
}

describe("dashboardConvertFromDto", () => {
  it("maps stats from the DTO", () => {
    const result = dashboardConvertFromDto(
      baseDto({ stats: { totalRevenue: 100, totalUsers: 50, activeUsers: 30, conversionRate: 5.5 } })
    );
    expect(result.stats.totalRevenue).toBe(100);
    expect(result.stats.conversionRate).toBe(5.5);
  });

  it("maps chart data from the DTO", () => {
    const result = dashboardConvertFromDto(baseDto({ chartData: [{ label: "Jan", revenue: 4000, expenses: 2400 }] }));
    expect(result.chartData).toHaveLength(1);
    expect(result.chartData[0]?.label).toBe("Jan");
  });

  it("maps transactions from the DTO", () => {
    const result = dashboardConvertFromDto(
      baseDto({
        recentTransactions: [
          {
            id: "tx-1",
            customer: "Jane",
            email: "jane@test.com",
            amount: 150,
            status: "completed",
            date: "2026-01-01",
          },
        ],
      })
    );
    expect(result.recentTransactions).toHaveLength(1);
    expect(result.recentTransactions[0]?.customer).toBe("Jane");
  });

  it("maps kpis from the DTO", () => {
    const result = dashboardConvertFromDto(
      baseDto({ kpis: [{ id: "revenue", deltaPct: 20.1, deltaAbs: 7582, spark: [1, 2, 3] }] })
    );
    expect(result.kpis).toHaveLength(1);
    expect(result.kpis[0]?.id).toBe("revenue");
    expect(result.kpis[0]?.spark).toEqual([1, 2, 3]);
  });

  it("maps cohorts, channels, and activity from the DTO", () => {
    const result = dashboardConvertFromDto(
      baseDto({
        cohorts: [{ key: "dau", value: 100, total: 200 }],
        channels: [{ key: "direct", pct: 50 }],
        activity: [{ key: "a", title: "t", detail: "d", relativeTime: "1m", color: "success" }],
      })
    );
    expect(result.cohorts[0]?.key).toBe("dau");
    expect(result.channels[0]?.pct).toBe(50);
    expect(result.activity[0]?.color).toBe("success");
  });
});
