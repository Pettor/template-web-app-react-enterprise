import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { fetchDashboard, fetchDashboardQuery } from "./Fetch";

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const validDashboardData = {
  stats: { totalRevenue: 10000, totalUsers: 500, activeUsers: 200, conversionRate: 5 },
  chartData: [{ label: "Jan", revenue: 5000, expenses: 3000 }],
  recentTransactions: [
    { id: "tx-1", customer: "Alice", email: "alice@test.com", amount: 150, status: "completed", date: "2026-01-01" },
  ],
  kpis: [{ id: "revenue", deltaPct: 10, deltaAbs: 1000, spark: [1, 2, 3] }],
  cohorts: [{ key: "dau", value: 200, total: 500 }],
  channels: [{ key: "direct", pct: 50 }],
  activity: [{ key: "a", title: "t", detail: "d", relativeTime: "1m", color: "success" }],
};

describe("fetchDashboard", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns the parsed dashboard data", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: validDashboardData, status: 200, statusText: "OK" });

    const result = await fetchDashboard();

    expect(result.stats.totalRevenue).toBe(10000);
    expect(result.chartData).toHaveLength(1);
    expect(result.recentTransactions).toHaveLength(1);
    expect(apiClient.get).toHaveBeenCalledWith("/api/dashboard");
  });

  it("throws a ServiceError when the response fails schema validation", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { stats: { totalRevenue: "not-a-number" } },
      status: 200,
      statusText: "OK",
    });

    await expect(fetchDashboard()).rejects.toMatchObject({ status: 400 });
  });

  it("throws a ServiceError when apiClient.get rejects with an ApiError", async () => {
    const apiError = { message: "Forbidden", name: "ApiError", status: 403 };
    vi.mocked(apiClient.get).mockRejectedValue(apiError);

    await expect(fetchDashboard()).rejects.toMatchObject({ message: "Forbidden", status: 403 });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error("Timeout"));

    await expect(fetchDashboard()).rejects.toMatchObject({ status: 500 });
  });
});

describe("fetchDashboardQuery", () => {
  it("returns a query options object with the correct queryKey", () => {
    const query = fetchDashboardQuery();

    expect(query.queryKey).toEqual(["dashboard"]);
  });

  it("returns a query options object with a queryFn", () => {
    const query = fetchDashboardQuery();

    expect(typeof query.queryFn).toBe("function");
  });
});
