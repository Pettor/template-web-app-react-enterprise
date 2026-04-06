import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FetchClient } from "../Client/FetchClient";
import { ApiWorkerClient, FetchError, isFetchError } from "./ApiWorkerClient";

// Mock TokenStorage so tests control what "current token" is
vi.mock("../Token/TokenStorage", () => ({
  getToken: vi.fn().mockReturnValue("stored-jwt-token"),
}));

function makeMockClient(responseOverride?: Partial<Response>): FetchClient {
  const mockRequest = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    statusText: "OK",
    json: vi.fn().mockResolvedValue({}),
    ...responseOverride,
  } as unknown as Response);

  return { request: mockRequest } as unknown as FetchClient;
}

const ALLOWED = [
  "/api/application/info",
  "/api/personal/profile",
  "/api/users/forgot-password",
  "/api/users/self-register",
];

describe("FetchError", () => {
  it("constructs with required fields", () => {
    const err = new FetchError("Not found", 404, "Not Found");
    expect(err.message).toBe("Not found");
    expect(err.status).toBe(404);
    expect(err.statusText).toBe("Not Found");
    expect(err.name).toBe("FetchError");
  });

  it("accepts optional response, code, and cause", () => {
    const cause = new Error("root");
    const err = new FetchError("Server error", 500, "Internal Server Error", undefined, "SERVER_ERR", cause);
    expect(err.code).toBe("SERVER_ERR");
    expect(err.cause).toBe(cause);
  });
});

describe("isFetchError", () => {
  it("returns true for FetchError instances", () => {
    expect(isFetchError(new FetchError("msg", 500, "err"))).toBe(true);
  });

  it("returns false for plain Error", () => {
    expect(isFetchError(new Error("oops"))).toBe(false);
  });

  it("returns false for null", () => {
    expect(isFetchError(null)).toBe(false);
  });
});

describe("ApiWorkerClient", () => {
  describe("tokenRequest", () => {
    it("POSTs to /api/tokens with credentials", async () => {
      const mockClient = makeMockClient({
        json: vi.fn().mockResolvedValue({ token: "new-jwt", refreshTokenExpiryTime: "2026-12-31" }),
      });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      const token = await workerClient.tokenRequest({ email: "user@test.com", password: "pass123" });

      expect(mockClient.request).toHaveBeenCalledWith(
        "/api/tokens",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "user@test.com", password: "pass123" }),
        })
      );
      expect(token).toBe("new-jwt");
    });

    it("throws a FetchError on non-ok response", async () => {
      const mockClient = makeMockClient({ ok: false, status: 401, statusText: "Unauthorized" });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await expect(workerClient.tokenRequest({ email: "bad@test.com", password: "wrong" })).rejects.toBeInstanceOf(
        FetchError
      );
    });
  });

  describe("removeToken", () => {
    it("sends a DELETE request to /api/tokens", async () => {
      const mockClient = makeMockClient();
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await workerClient.removeToken();

      expect(mockClient.request).toHaveBeenCalledWith("/api/tokens", expect.objectContaining({ method: "DELETE" }));
    });
  });

  describe("refreshToken", () => {
    it("GETs /api/tokens/refresh and returns the new token", async () => {
      const mockClient = makeMockClient({
        json: vi.fn().mockResolvedValue({ token: "refreshed-jwt", refreshTokenExpiryTime: "2027-01-01" }),
      });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      const token = await workerClient.refreshToken();

      expect(mockClient.request).toHaveBeenCalledWith(
        "/api/tokens/refresh",
        expect.objectContaining({ method: "GET" })
      );
      expect(token).toBe("refreshed-jwt");
    });

    it("throws a FetchError when refresh returns non-ok", async () => {
      const mockClient = makeMockClient({ ok: false, status: 401, statusText: "Unauthorized" });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await expect(workerClient.refreshToken()).rejects.toBeInstanceOf(FetchError);
    });

    it("deduplicates concurrent refresh calls — only one HTTP request is made", async () => {
      let resolveRefresh!: (value: Response) => void;
      const refreshPromise = new Promise<Response>((resolve) => {
        resolveRefresh = resolve;
      });

      const mockRequest = vi
        .fn()
        .mockReturnValueOnce(refreshPromise)
        .mockResolvedValue({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({ token: "tok", refreshTokenExpiryTime: "2027-01-01" }),
        } as unknown as Response);

      const mockClient = { request: mockRequest } as unknown as FetchClient;
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      // Kick off two concurrent refresh calls
      const first = workerClient.refreshToken();
      const second = workerClient.refreshToken();

      // Resolve the pending refresh
      resolveRefresh({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ token: "tok", refreshTokenExpiryTime: "2027-01-01" }),
      } as unknown as Response);

      const [t1, t2] = await Promise.all([first, second]);

      expect(t1).toBe("tok");
      expect(t2).toBe("tok");
      // Only one actual HTTP request should have been issued
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });
  });

  describe("URL allow-list enforcement", () => {
    it("throws when the URL is not in the allowed list", async () => {
      const mockClient = makeMockClient();
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await expect(workerClient.get("/api/admin/secret")).rejects.toThrow("URL /api/admin/secret is not allowed");
    });

    it("allows URLs that start with an allowed prefix", async () => {
      const mockClient = makeMockClient({
        json: vi.fn().mockResolvedValue({ version: "1.0" }),
      });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await expect(workerClient.get("/api/application/info")).resolves.toBeDefined();
    });
  });

  describe("get", () => {
    it("sends a GET request with Authorization header", async () => {
      const mockClient = makeMockClient({ json: vi.fn().mockResolvedValue({}) });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      await workerClient.get("/api/application/info");

      expect(mockClient.request).toHaveBeenCalledWith(
        "/api/application/info",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({ Authorization: "Bearer stored-jwt-token" }),
        })
      );
    });
  });

  describe("post", () => {
    it("sends a POST request with JSON body", async () => {
      const mockClient = makeMockClient({ json: vi.fn().mockResolvedValue({}) });
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);
      const payload = { email: "test@example.com" };

      await workerClient.post("/api/users/forgot-password", payload);

      expect(mockClient.request).toHaveBeenCalledWith(
        "/api/users/forgot-password",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(payload),
        })
      );
    });
  });

  describe("_requestWithRetry (401 handling)", () => {
    it("retries the request after a successful token refresh on 401", async () => {
      // First call: 401; refresh: returns new token; retry: 200
      const mockRequest = vi
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: "Unauthorized",
          json: vi.fn(),
        } as unknown as Response)
        .mockResolvedValueOnce({
          // refreshToken internals: GET /api/tokens/refresh
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({ token: "fresh-token", refreshTokenExpiryTime: "2027-01-01" }),
        } as unknown as Response)
        .mockResolvedValueOnce({
          // Retry of original request
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({ version: "2.0" }),
        } as unknown as Response);

      const mockClient = { request: mockRequest } as unknown as FetchClient;
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      const response = await workerClient.get("/api/application/info");

      expect(mockRequest).toHaveBeenCalledTimes(3);
      expect(response.status).toBe(200);
    });

    it("returns the original 401 response when refresh also fails", async () => {
      const unauthorizedResponse = {
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: vi.fn(),
      } as unknown as Response;

      const mockRequest = vi
        .fn()
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: "Unauthorized",
          json: vi.fn(),
        } as unknown as Response);

      const mockClient = { request: mockRequest } as unknown as FetchClient;
      const workerClient = new ApiWorkerClient(mockClient, ALLOWED);

      const result = await workerClient.get("/api/application/info");

      expect(result.status).toBe(401);
    });
  });
});
