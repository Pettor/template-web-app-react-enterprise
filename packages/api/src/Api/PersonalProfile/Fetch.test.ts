import { useQuery } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { fetchPersonalProfile, fetchPersonalProfileQuery, useFetchPersonalProfileQuery } from "./Fetch";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn().mockReturnValue({ data: undefined, isLoading: false }),
}));

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const validProfile = {
  id: "user-001",
  userName: "jdoe",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  isActive: true,
  emailConfirmed: true,
  phoneNumber: null,
  imageUrl: null,
};

describe("fetchPersonalProfile", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns the parsed profile", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: validProfile, status: 200, statusText: "OK" });

    const result = await fetchPersonalProfile();

    expect(result.id).toBe("user-001");
    expect(result.userName).toBe("jdoe");
    expect(result.email).toBe("jane@example.com");
    expect(apiClient.get).toHaveBeenCalledWith("/api/personal/profile");
  });

  it("converts null phoneNumber to undefined", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: validProfile, status: 200, statusText: "OK" });

    const result = await fetchPersonalProfile();

    expect(result.phoneNumber).toBeUndefined();
  });

  it("converts null imageUrl to undefined", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: validProfile, status: 200, statusText: "OK" });

    const result = await fetchPersonalProfile();

    expect(result.imageUrl).toBeUndefined();
  });

  it("returns optional fields when present", async () => {
    const profileWithOptionals = { ...validProfile, phoneNumber: "+1-555-9999", imageUrl: "https://cdn.test/a.png" };
    vi.mocked(apiClient.get).mockResolvedValue({ data: profileWithOptionals, status: 200, statusText: "OK" });

    const result = await fetchPersonalProfile();

    expect(result.phoneNumber).toBe("+1-555-9999");
    expect(result.imageUrl).toBe("https://cdn.test/a.png");
  });

  it("throws a ServiceError when the response fails schema validation", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: { id: 123, isActive: "yes" }, status: 200, statusText: "OK" });

    await expect(fetchPersonalProfile()).rejects.toMatchObject({ status: 400 });
  });

  it("throws a ServiceError when apiClient.get rejects with an ApiError", async () => {
    const apiError = { message: "Not Found", name: "ApiError", status: 404 };
    vi.mocked(apiClient.get).mockRejectedValue(apiError);

    await expect(fetchPersonalProfile()).rejects.toMatchObject({ message: "Not Found", status: 404 });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error("Network error"));

    await expect(fetchPersonalProfile()).rejects.toMatchObject({ status: 500 });
  });
});

describe("fetchPersonalProfileQuery", () => {
  it("returns a query options object with the correct queryKey", () => {
    const query = fetchPersonalProfileQuery();

    expect(query.queryKey).toEqual(["profile-info"]);
  });

  it("returns a query options object with a queryFn", () => {
    const query = fetchPersonalProfileQuery();

    expect(typeof query.queryFn).toBe("function");
  });
});

describe("useFetchPersonalProfileQuery", () => {
  it("calls useQuery with the profile query options", () => {
    useFetchPersonalProfileQuery();

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ queryKey: ["profile-info"] }));
  });
});
