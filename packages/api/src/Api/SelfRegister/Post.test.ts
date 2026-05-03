import { useMutation } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { Post, usePostSelfRegister } from "./Post";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockReturnValue({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

const validData = {
  email: "newuser@example.com",
  userName: "newuser",
  password: "P@ssword1",
  confirmPassword: "P@ssword1",
};

describe("Post (SelfRegister)", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiClient.post with the correct URL and registration data", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await Post(validData);

    expect(apiClient.post).toHaveBeenCalledWith("/api/users/self-register", validData);
  });

  it("resolves without a value on successful registration", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });

    await expect(Post(validData)).resolves.toBeUndefined();
  });

  it("includes optional fields when provided", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    const dataWithOptionals = { ...validData, firstName: "Alice", lastName: "Smith", phoneNumber: "+1-555-0100" };

    await Post(dataWithOptionals);

    expect(apiClient.post).toHaveBeenCalledWith(
      "/api/users/self-register",
      expect.objectContaining({ firstName: "Alice", lastName: "Smith" })
    );
  });

  it("throws a ServiceError when apiClient.post rejects with an ApiError", async () => {
    const apiError = { message: "Conflict", name: "ApiError", status: 409 };
    vi.mocked(apiClient.post).mockRejectedValue(apiError);

    await expect(Post(validData)).rejects.toMatchObject({
      message: "Conflict",
      status: 409,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error("Network failure"));

    await expect(Post(validData)).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("usePostSelfRegister", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a mutation with the correct mutationFn", () => {
    usePostSelfRegister();

    expect(useMutation).toHaveBeenCalledWith(expect.objectContaining({ mutationFn: expect.any(Function) }));
  });

  it("mutationFn calls Post with the registration data", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: undefined, status: 200, statusText: "OK" });
    usePostSelfRegister();

    const { mutationFn } = vi.mocked(useMutation).mock.calls[0]![0]!;
    await (mutationFn as (data: typeof validData) => Promise<void>)(validData);

    expect(apiClient.post).toHaveBeenCalledWith("/api/users/self-register", validData);
  });
});
