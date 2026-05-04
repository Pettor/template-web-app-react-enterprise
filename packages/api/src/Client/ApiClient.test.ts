import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// vi.hoisted ensures mockSend is defined before vi.mock factory runs (vi.mock is hoisted)
const mockSend = vi.hoisted(() => vi.fn().mockResolvedValue({ data: null }));

vi.mock("../Worker/ApiWorkerCommunication", () => ({
  ApiWorkerCommunication: vi.fn(function () {
    return { send: mockSend };
  }),
}));

vi.mock("../Worker/ApiWorker?worker", () => ({ default: function FakeWorker() {} }));

import { ApiClient } from "./ApiClient";

describe("ApiClient", () => {
  let client: ApiClient;

  beforeEach(() => {
    mockSend.mockResolvedValue({ data: null });
    client = new ApiClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("constructs without errors", () => {
      expect(client).toBeInstanceOf(ApiClient);
    });
  });

  describe("login", () => {
    it("sends token/request with login data", async () => {
      const data = { email: "user@example.com", password: "secret", rememberMe: false };
      await client.login(data);
      expect(mockSend).toHaveBeenCalledWith({ type: "token/request", payload: data });
    });
  });

  describe("refresh", () => {
    it("sends token/refresh", async () => {
      await client.refresh();
      expect(mockSend).toHaveBeenCalledWith({ type: "token/refresh" });
    });
  });

  describe("logout", () => {
    it("sends user/logout", async () => {
      await client.logout();
      expect(mockSend).toHaveBeenCalledWith({ type: "user/logout" });
    });
  });

  describe("get", () => {
    it("sends request/get with url", async () => {
      await client.get("/api/resource");
      expect(mockSend).toHaveBeenCalledWith({ type: "request/get", url: "/api/resource" });
    });
  });

  describe("post", () => {
    it("sends request/post with url and data", async () => {
      const body = { key: "value" };
      await client.post("/api/resource", body);
      expect(mockSend).toHaveBeenCalledWith({ type: "request/post", payload: body, url: "/api/resource" });
    });
  });

  describe("delete", () => {
    it("sends request/delete with url", async () => {
      await client.delete("/api/resource");
      expect(mockSend).toHaveBeenCalledWith({ type: "request/delete", url: "/api/resource" });
    });
  });

  describe("patch", () => {
    it("sends request/patch with url", async () => {
      await client.patch("/api/resource");
      expect(mockSend).toHaveBeenCalledWith({ type: "request/patch", url: "/api/resource" });
    });
  });

  describe("put", () => {
    it("sends request/put with url", async () => {
      await client.put("/api/resource");
      expect(mockSend).toHaveBeenCalledWith({ type: "request/put", url: "/api/resource" });
    });
  });
});
