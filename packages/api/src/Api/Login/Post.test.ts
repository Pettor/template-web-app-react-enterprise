import { useMutation } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { postLogin, usePostLoginMutate } from "./Post";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    login: vi.fn(),
  },
}));

describe("postLogin", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiClient.login with the provided credentials", async () => {
    vi.mocked(apiClient.login).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await postLogin({ email: "admin@example.com", password: "secret" });

    expect(apiClient.login).toHaveBeenCalledWith({ email: "admin@example.com", password: "secret" });
  });

  it("resolves without a value on successful login", async () => {
    vi.mocked(apiClient.login).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await expect(postLogin({ email: "admin@example.com", password: "secret" })).resolves.toBeUndefined();
  });

  it("includes rememberMe when provided", async () => {
    vi.mocked(apiClient.login).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await postLogin({ email: "admin@example.com", password: "secret", rememberMe: true });

    expect(apiClient.login).toHaveBeenCalledWith(expect.objectContaining({ rememberMe: true }));
  });

  it("throws a ServiceError when apiClient.login rejects with an ApiError", async () => {
    const apiError = { message: "Unauthorized", name: "ApiError", status: 401 };
    vi.mocked(apiClient.login).mockRejectedValue(apiError);

    await expect(postLogin({ email: "wrong@example.com", password: "bad" })).rejects.toMatchObject({
      message: "Unauthorized",
      status: 401,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.login).mockRejectedValue(new Error("Network error"));

    await expect(postLogin({ email: "admin@example.com", password: "secret" })).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("usePostLoginMutate", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a mutation with the correct mutationFn", () => {
    usePostLoginMutate();

    expect(useMutation).toHaveBeenCalledWith(expect.objectContaining({ mutationFn: expect.any(Function) }));
  });

  it("mutationFn calls postLogin with the provided credentials", async () => {
    vi.mocked(apiClient.login).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    usePostLoginMutate();

    const { mutationFn } = vi.mocked(useMutation).mock.calls[0]![0]!;
    await (mutationFn as (data: { email: string; password: string }) => Promise<void>)({
      email: "test@example.com",
      password: "pass123",
    });

    expect(apiClient.login).toHaveBeenCalledWith({ email: "test@example.com", password: "pass123" });
  });
});
