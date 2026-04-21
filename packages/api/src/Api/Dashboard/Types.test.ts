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
  kpis: [
    { id: "revenue", deltaPct: 20.1, deltaAbs: 7582, spark: [22, 24, 23, 28, 26, 31, 30, 34, 33, 38, 36, 45] },
    { id: "users", deltaPct: 18.0, deltaAbs: 180, spark: [12, 15, 14, 17, 16, 19, 18, 20, 22, 24, 23, 24] },
    { id: "active", deltaPct: 19.0, deltaAbs: 201, spark: [8, 9, 9, 11, 12, 11, 13, 14, 14, 15, 14, 16] },
    { id: "conversion", deltaPct: -2.1, deltaAbs: -0.3, spark: [14, 13.5, 14.2, 13, 13.5, 12.8, 13.1, 12.9, 12.6] },
  ],
  cohorts: [
    { key: "dau", value: 1280, total: 2350 },
    { key: "wau", value: 1842, total: 2350 },
    { key: "mau", value: 2180, total: 2350 },
  ],
  channels: [
    { key: "direct", pct: 38 },
    { key: "organic", pct: 26 },
    { key: "referral", pct: 18 },
    { key: "paid", pct: 12 },
    { key: "other", pct: 6 },
  ],
  activity: [
    {
      key: "deploy",
      title: "Deployment succeeded",
      detail: "api-gateway · v4.12.3",
      relativeTime: "just now",
      color: "success",
    },
  ],
};

describe("dashboardDataSchema", () => {
  it("parses valid dashboard data", () => {
    const result = dashboardDataSchema.parse(validData);
    expect(result.stats.totalRevenue).toBe(45231.89);
    expect(result.chartData).toHaveLength(2);
    expect(result.recentTransactions).toHaveLength(1);
    expect(result.kpis).toHaveLength(4);
    expect(result.cohorts).toHaveLength(3);
    expect(result.channels).toHaveLength(5);
    expect(result.activity).toHaveLength(1);
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

  it("rejects unknown kpi id", () => {
    const invalid = { ...validData, kpis: [{ id: "unknown", deltaPct: 0, deltaAbs: 0, spark: [] }] };
    expect(() => dashboardDataSchema.parse(invalid)).toThrow();
  });

  it("rejects unknown activity color", () => {
    const invalid = {
      ...validData,
      activity: [{ key: "a", title: "t", detail: "d", relativeTime: "1m", color: "purple" }],
    };
    expect(() => dashboardDataSchema.parse(invalid)).toThrow();
  });
});
