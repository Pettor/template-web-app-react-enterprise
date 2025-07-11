import type { FetchQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { ServiceErrorFactory } from "../../Service/ServiceErrorFactory";
import type { ApplicationInfo } from "./Classes";
import { QUERY_KEY_APPLICATION_INFO } from "./Classes";
import { applicationInfoConvertFromDto } from "./Convert";
import { applicationInfoSchema, type ApplicationInfoDto } from "./Schema";

export async function fetchApplicationInfo(): Promise<ApplicationInfo> {
  try {
    const { data } = await apiClient.get<ApplicationInfoDto>("/api/application/info");
    const userSchema = await applicationInfoSchema.parseAsync(data);
    return applicationInfoConvertFromDto(userSchema);
  } catch (e: unknown) {
    throw ServiceErrorFactory.create(e);
  }
}

export function fetchApplicationInfoQuery(): FetchQueryOptions<ApplicationInfo> {
  return {
    queryKey: QUERY_KEY_APPLICATION_INFO,
    queryFn: fetchApplicationInfo,
  };
}
