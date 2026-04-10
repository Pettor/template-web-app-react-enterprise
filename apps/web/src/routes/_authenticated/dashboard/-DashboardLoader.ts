import type { DashboardData } from "@package/api";
import { fetchDashboardQuery, QUERY_KEY_DASHBOARD } from "@package/api";
import type { QueryClient } from "@tanstack/react-query";

export type DashboardLoaderData = DashboardData;

export async function dashboardLoader(queryClient: QueryClient): Promise<DashboardLoaderData> {
  const query = fetchDashboardQuery();

  return queryClient.getQueryData<DashboardData>(QUERY_KEY_DASHBOARD) ?? (await queryClient.fetchQuery(query));
}
