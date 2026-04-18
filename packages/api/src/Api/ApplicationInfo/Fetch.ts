import type { FetchQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { createServiceError } from "../../Service/CreateServiceError";
import { applicationInfoConvertFromDto } from "./Convert";
import {
  applicationInfoSchema,
  QUERY_KEY_APPLICATION_INFO,
  type ApplicationInfo,
  type ApplicationInfoDto,
} from "./Types";

export async function fetchApplicationInfo(): Promise<ApplicationInfo> {
  try {
    const { data } = await apiClient.get<ApplicationInfoDto>("/api/application/info");
    const userSchema = await applicationInfoSchema.parseAsync(data);
    return applicationInfoConvertFromDto(userSchema);
  } catch (e: unknown) {
    throw createServiceError(e);
  }
}

export function fetchApplicationInfoQuery(): FetchQueryOptions<ApplicationInfo> {
  return {
    queryKey: QUERY_KEY_APPLICATION_INFO,
    queryFn: fetchApplicationInfo,
  };
}
