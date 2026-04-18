import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { createServiceError } from "../../Service/CreateServiceError";
import type { ApiError } from "../../Worker/ApiWorkerReponse";
import type { SelfRegisterData } from "./Types";

export async function Post(data: SelfRegisterData): Promise<void> {
  try {
    await apiClient.post("/api/users/self-register", data);
  } catch (e: unknown) {
    throw createServiceError(e);
  }
}

export function usePostSelfRegister(): UseMutationResult<void, ApiError, SelfRegisterData> {
  return useMutation<void, ApiError, SelfRegisterData>({
    mutationFn: async (data: SelfRegisterData) => {
      return await Post(data);
    },
  });
}
