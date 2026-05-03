import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../Client/ApiClient";
import { fetchApplicationInfo, fetchApplicationInfoQuery } from "./Fetch";

vi.mock("../../Client/ApiClient", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("fetchApplicationInfo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns the parsed application info", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: { version: "2.1.0" }, status: 200, statusText: "OK" });

    const result = await fetchApplicationInfo();

    expect(result.version).toBe("2.1.0");
    expect(apiClient.get).toHaveBeenCalledWith("/api/application/info");
  });

  it("throws a ServiceError when the API response fails schema validation", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: { version: 42 }, status: 200, statusText: "OK" });

    await expect(fetchApplicationInfo()).rejects.toMatchObject({
      status: 400,
    });
  });

  it("throws a ServiceError when apiClient.get rejects with an ApiError", async () => {
    const apiError = { message: "Server Error", name: "ApiError", status: 503 };
    vi.mocked(apiClient.get).mockRejectedValue(apiError);

    await expect(fetchApplicationInfo()).rejects.toMatchObject({
      message: "Server Error",
      status: 503,
    });
  });

  it("throws a ServiceError with status 500 for unknown errors", async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error("Network error"));

    await expect(fetchApplicationInfo()).rejects.toMatchObject({
      status: 500,
    });
  });
});

describe("fetchApplicationInfoQuery", () => {
  it("returns a query options object with the correct queryKey", () => {
    const query = fetchApplicationInfoQuery();

    expect(query.queryKey).toEqual(["application-info"]);
  });

  it("returns a query options object with a queryFn", () => {
    const query = fetchApplicationInfoQuery();

    expect(typeof query.queryFn).toBe("function");
  });
});
