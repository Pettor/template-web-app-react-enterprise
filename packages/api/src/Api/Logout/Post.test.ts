import { useMutation } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { postLogout, usePostLogoutMutate } from "./Post";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    logout: vi.fn(),
  },
}));

describe("postLogout", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiClient.logout", async () => {
    vi.mocked(apiClient.logout).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await postLogout();

    expect(apiClient.logout).toHaveBeenCalledTimes(1);
  });

  it("resolves without a value on success", async () => {
    vi.mocked(apiClient.logout).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await expect(postLogout()).resolves.toBeUndefined();
  });

  it("throws a ServiceError when apiClient.logout rejects with an ApiError", async () => {
    const apiError = { message: "Unauthorized", name: "ApiError", status: 401 };
    vi.mocked(apiClient.logout).mockRejectedValue(apiError);

    await expect(postLogout()).rejects.toMatchObject({
      message: "Unauthorized",
      status: 401,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.logout).mockRejectedValue(new Error("Network error"));

    await expect(postLogout()).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("usePostLogoutMutate", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a mutation with the correct mutationFn", () => {
    usePostLogoutMutate();

    expect(useMutation).toHaveBeenCalledWith(expect.objectContaining({ mutationFn: expect.any(Function) }));
  });

  it("mutationFn calls postLogout", async () => {
    vi.mocked(apiClient.logout).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    usePostLogoutMutate();

    const { mutationFn } = vi.mocked(useMutation).mock.calls[0]![0]!;
    await (mutationFn as () => Promise<void>)();

    expect(apiClient.logout).toHaveBeenCalledTimes(1);
  });
});
