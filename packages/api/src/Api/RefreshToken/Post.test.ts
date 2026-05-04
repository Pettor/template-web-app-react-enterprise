import { useMutation } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { postRefreshToken, usePostRefreshTokenMutate } from "./Post";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    refresh: vi.fn(),
  },
}));

describe("postRefreshToken", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiClient.refresh", async () => {
    vi.mocked(apiClient.refresh).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await postRefreshToken();

    expect(apiClient.refresh).toHaveBeenCalledTimes(1);
  });

  it("resolves without a value on success", async () => {
    vi.mocked(apiClient.refresh).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await expect(postRefreshToken()).resolves.toBeUndefined();
  });

  it("throws a ServiceError when apiClient.refresh rejects with an ApiError", async () => {
    const apiError = { message: "Unauthorized", name: "ApiError", status: 401 };
    vi.mocked(apiClient.refresh).mockRejectedValue(apiError);

    await expect(postRefreshToken()).rejects.toMatchObject({
      message: "Unauthorized",
      status: 401,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.refresh).mockRejectedValue(new Error("Network error"));

    await expect(postRefreshToken()).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("usePostRefreshTokenMutate", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a mutation with the correct mutationFn", () => {
    usePostRefreshTokenMutate();

    expect(useMutation).toHaveBeenCalledWith(expect.objectContaining({ mutationFn: expect.any(Function) }));
  });

  it("mutationFn calls postRefreshToken", async () => {
    vi.mocked(apiClient.refresh).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    usePostRefreshTokenMutate();

    const { mutationFn } = vi.mocked(useMutation).mock.calls[0]![0]!;
    await (mutationFn as () => Promise<void>)();

    expect(apiClient.refresh).toHaveBeenCalledTimes(1);
  });
});
