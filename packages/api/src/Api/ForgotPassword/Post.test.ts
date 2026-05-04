import { useMutation } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { postForgotPassword, usePostForgotPasswordMutate } from "./Post";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe("postForgotPassword", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiClient.post with the correct URL and payload", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await postForgotPassword("user@example.com");

    expect(apiClient.post).toHaveBeenCalledWith("/api/users/forgot-password", { email: "user@example.com" });
  });

  it("resolves without a value on success", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await expect(postForgotPassword("user@example.com")).resolves.toBeUndefined();
  });

  it("throws a ServiceError when apiClient.post rejects with an ApiError", async () => {
    const apiError = { message: "Not Found", name: "ApiError", status: 404 };
    vi.mocked(apiClient.post).mockRejectedValue(apiError);

    await expect(postForgotPassword("user@example.com")).rejects.toMatchObject({
      message: "Not Found",
      status: 404,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error("Network failure"));

    await expect(postForgotPassword("user@example.com")).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("usePostForgotPasswordMutate", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a mutation with the correct mutationFn", () => {
    usePostForgotPasswordMutate();

    expect(useMutation).toHaveBeenCalledWith(expect.objectContaining({ mutationFn: expect.any(Function) }));
  });

  it("mutationFn calls postForgotPassword with the provided email", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    usePostForgotPasswordMutate();

    const { mutationFn } = vi.mocked(useMutation).mock.calls[0]![0]!;
    await (mutationFn as (email: string) => Promise<void>)("test@example.com");

    expect(apiClient.post).toHaveBeenCalledWith("/api/users/forgot-password", { email: "test@example.com" });
  });
});
