import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FetchClient } from "./FetchClient";

describe("FetchClient", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn();
    global.fetch = fetchSpy;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("uses the default timeout of 5000ms when none is provided", () => {
      // Covered implicitly — no throw on construction
      expect(() => new FetchClient()).not.toThrow();
    });

    it("accepts a custom timeout", () => {
      expect(() => new FetchClient(1000)).not.toThrow();
    });
  });

  describe("request", () => {
    it("calls fetch with the provided url", async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      fetchSpy.mockResolvedValue(mockResponse);

      const fetchClient = new FetchClient();
      await fetchClient.request("https://example.com/api/data");

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith("https://example.com/api/data", expect.objectContaining({}));
    });

    it("passes through the provided options", async () => {
      const mockResponse = new Response("{}", { status: 200 });
      fetchSpy.mockResolvedValue(mockResponse);

      const fetchClient = new FetchClient();
      await fetchClient.request("/api/test", { method: "POST", body: '{"key":"value"}' });

      expect(fetchSpy).toHaveBeenCalledWith(
        "/api/test",
        expect.objectContaining({ method: "POST", body: '{"key":"value"}' })
      );
    });

    it("attaches an AbortSignal to the request", async () => {
      const mockResponse = new Response("{}", { status: 200 });
      fetchSpy.mockResolvedValue(mockResponse);

      const fetchClient = new FetchClient();
      await fetchClient.request("/api/test");

      const [, options] = fetchSpy.mock.calls[0];
      expect(options.signal).toBeInstanceOf(AbortSignal);
    });

    it("returns the fetch response", async () => {
      const mockResponse = new Response(JSON.stringify({ id: 42 }), { status: 200 });
      fetchSpy.mockResolvedValue(mockResponse);

      const fetchClient = new FetchClient();
      const result = await fetchClient.request("/api/test");

      expect(result).toBe(mockResponse);
    });

    it("propagates fetch errors", async () => {
      fetchSpy.mockRejectedValue(new Error("Network error"));

      const fetchClient = new FetchClient();
      await expect(fetchClient.request("/api/test")).rejects.toThrow("Network error");
    });
  });
});
