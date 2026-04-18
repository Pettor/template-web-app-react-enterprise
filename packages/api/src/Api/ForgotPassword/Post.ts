import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../Client/ApiClient";
import { createServiceError } from "../../Service/CreateServiceError";
import type { ApiError } from "../../Worker/ApiWorkerReponse";

export async function postForgotPassword(email: string): Promise<void> {
  try {
    await apiClient.post("/api/users/forgot-password", { email });
  } catch (e: unknown) {
    throw createServiceError(e);
  }
}

export function usePostForgotPasswordMutate(): UseMutationResult<void, ApiError, string> {
  return useMutation<void, ApiError, string>({
    mutationFn: async (email: string) => {
      await postForgotPassword(email);
    },
  });
}
