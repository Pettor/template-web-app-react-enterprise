export const QUERY_KEY_DASHBOARD = ["dashboard"] as const;

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
}

export interface DashboardChartPoint {
  label: string;
  revenue: number;
  expenses: number;
}

export interface DashboardTransaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: string;
  date: string;
}

export interface DashboardData {
  stats: DashboardStats;
  chartData: DashboardChartPoint[];
  recentTransactions: DashboardTransaction[];
}
