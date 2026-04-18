import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, type FetchQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { createServiceError } from "../../Service/CreateServiceError";
import { QUERY_KEY_PROFILE_INFO, type ProfileInfo } from "./Classes";
import { personalProfileConvertFromDto } from "./Convert";
import type { ProfileInfoDto } from "./Schema";
import { profileInfoSchema } from "./Schema";

export async function fetchPersonalProfile(): Promise<ProfileInfo> {
  try {
    const { data } = await apiClient.get<ProfileInfoDto>("/api/personal/profile");
    const userSchema = await profileInfoSchema.parseAsync(data);
    return personalProfileConvertFromDto(userSchema);
  } catch (e: unknown) {
    throw createServiceError(e);
  }
}

export function fetchPersonalProfileQuery(): FetchQueryOptions<ProfileInfo> {
  return {
    queryKey: QUERY_KEY_PROFILE_INFO,
    queryFn: fetchPersonalProfile,
  };
}

export function useFetchPersonalProfileQuery(): UseQueryResult<ProfileInfo> {
  return useQuery<ProfileInfo>(fetchPersonalProfileQuery());
}
