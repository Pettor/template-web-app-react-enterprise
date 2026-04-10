import type { FetchQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { ServiceErrorFactory } from "../../Service/ServiceErrorFactory";
import type { DashboardData } from "./Classes";
import { QUERY_KEY_DASHBOARD } from "./Classes";
import { dashboardConvertFromDto } from "./Convert";
import { dashboardDataSchema, type DashboardDataDto } from "./Schema";

export async function fetchDashboard(): Promise<DashboardData> {
  try {
    const { data } = await apiClient.get<DashboardDataDto>("/api/dashboard");
    const parsed = await dashboardDataSchema.parseAsync(data);
    return dashboardConvertFromDto(parsed);
  } catch (e: unknown) {
    throw ServiceErrorFactory.create(e);
  }
}

export function fetchDashboardQuery(): FetchQueryOptions<DashboardData> {
  return {
    queryKey: QUERY_KEY_DASHBOARD,
    queryFn: fetchDashboard,
  };
}
