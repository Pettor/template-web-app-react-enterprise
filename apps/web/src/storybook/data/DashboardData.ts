import type {
  DashboardActivity,
  DashboardChannel,
  DashboardChartPoint,
  DashboardCohort,
  DashboardKpi,
  DashboardStats,
  DashboardTransaction,
} from "@package/api";

export const DashboardStatsData: DashboardStats = {
  totalRevenue: 45231.89,
  totalUsers: 2350,
  activeUsers: 1280,
  conversionRate: 12.5,
};

export const DashboardChartData: DashboardChartPoint[] = [
  { label: "Jan", revenue: 28400, expenses: 18200 },
  { label: "Feb", revenue: 21900, expenses: 16400 },
  { label: "Mar", revenue: 34800, expenses: 20100 },
  { label: "Apr", revenue: 31200, expenses: 19800 },
  { label: "May", revenue: 42100, expenses: 23400 },
  { label: "Jun", revenue: 45231, expenses: 24100 },
  { label: "Jul", revenue: 38900, expenses: 22500 },
  { label: "Aug", revenue: 47800, expenses: 25200 },
  { label: "Sep", revenue: 52100, expenses: 26800 },
  { label: "Oct", revenue: 49300, expenses: 26100 },
  { label: "Nov", revenue: 54800, expenses: 27900 },
  { label: "Dec", revenue: 61200, expenses: 29400 },
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
  {
    id: "tx-006",
    customer: "Ethan Walker",
    email: "ethan.walker@email.com",
    amount: 129.0,
    status: "refunded",
    date: "2026-04-05",
  },
  {
    id: "tx-007",
    customer: "Maya Patel",
    email: "maya.patel@email.com",
    amount: 880.0,
    status: "completed",
    date: "2026-04-06",
  },
];

export const DashboardKpisData: DashboardKpi[] = [
  { id: "revenue", deltaPct: 20.1, deltaAbs: 7582, spark: [22, 24, 23, 28, 26, 31, 30, 34, 33, 38, 36, 45] },
  { id: "users", deltaPct: 18.0, deltaAbs: 180, spark: [12, 15, 14, 17, 16, 19, 18, 20, 22, 24, 23, 24] },
  { id: "active", deltaPct: 19.0, deltaAbs: 201, spark: [8, 9, 9, 11, 12, 11, 13, 14, 14, 15, 14, 16] },
  {
    id: "conversion",
    deltaPct: -2.1,
    deltaAbs: -0.3,
    spark: [14, 13.5, 14.2, 13, 13.5, 12.8, 13.1, 12.9, 12.6, 13.0, 12.8, 12.5],
  },
];

export const DashboardCohortsData: DashboardCohort[] = [
  { key: "dau", value: 1280, total: 2350 },
  { key: "wau", value: 1842, total: 2350 },
  { key: "mau", value: 2180, total: 2350 },
];

export const DashboardChannelsData: DashboardChannel[] = [
  { key: "direct", pct: 38 },
  { key: "organic", pct: 26 },
  { key: "referral", pct: 18 },
  { key: "paid", pct: 12 },
  { key: "other", pct: 6 },
];

export const DashboardActivityData: DashboardActivity[] = [
  {
    key: "deploy",
    title: "Deployment succeeded",
    detail: "api-gateway · v4.12.3",
    relativeTime: "just now",
    color: "success",
  },
  {
    key: "signup",
    title: "New enterprise signup",
    detail: "Northwind Analytics · 340 seats",
    relativeTime: "2m",
    color: "accent",
  },
  {
    key: "errors",
    title: "Spike in 4xx errors",
    detail: "/v1/checkout · 3.2% error rate",
    relativeTime: "14m",
    color: "warning",
  },
  {
    key: "invoice",
    title: "Invoice paid",
    detail: "Acme Inc · $18,400",
    relativeTime: "1h",
    color: "success",
  },
  {
    key: "policy",
    title: "Password policy updated",
    detail: "admin@company.com",
    relativeTime: "3h",
    color: "default",
  },
];
