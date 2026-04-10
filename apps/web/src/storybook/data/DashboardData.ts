import type { DashboardChartPoint, DashboardStats, DashboardTransaction } from "@package/api";

export const DashboardStatsData: DashboardStats = {
  totalRevenue: 45231.89,
  totalUsers: 2350,
  activeUsers: 1280,
  conversionRate: 12.5,
};

export const DashboardChartData: DashboardChartPoint[] = [
  { label: "Jan", revenue: 4000, expenses: 2400 },
  { label: "Feb", revenue: 3000, expenses: 1398 },
  { label: "Mar", revenue: 5000, expenses: 3200 },
  { label: "Apr", revenue: 4500, expenses: 2800 },
  { label: "May", revenue: 6000, expenses: 3500 },
  { label: "Jun", revenue: 5500, expenses: 3100 },
];

export const DashboardTransactionsData: DashboardTransaction[] = [
  {
    id: "tx-001",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999.0,
    status: "completed",
    date: "2026-04-01",
  },
  {
    id: "tx-002",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39.0,
    status: "completed",
    date: "2026-04-02",
  },
  {
    id: "tx-003",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.0,
    status: "pending",
    date: "2026-04-03",
  },
  {
    id: "tx-004",
    customer: "William Kim",
    email: "will@email.com",
    amount: 99.0,
    status: "completed",
    date: "2026-04-04",
  },
  {
    id: "tx-005",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: 450.0,
    status: "pending",
    date: "2026-04-05",
  },
];
