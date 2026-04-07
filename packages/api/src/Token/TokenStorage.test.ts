import { afterEach, describe, expect, it } from "vitest";
import { clearToken, getToken, setToken } from "./TokenStorage";

describe("TokenStorage", () => {
  afterEach(() => {
    clearToken();
  });

  describe("getToken", () => {
    it("returns null initially", () => {
      expect(getToken()).toBeNull();
    });

    it("returns the token after setToken", () => {
      setToken("my-jwt-token");
      expect(getToken()).toBe("my-jwt-token");
    });
  });

  describe("setToken", () => {
    it("stores the provided token", () => {
      setToken("token-abc");
      expect(getToken()).toBe("token-abc");
    });

    it("overwrites a previously stored token", () => {
      setToken("first-token");
      setToken("second-token");
      expect(getToken()).toBe("second-token");
    });

    it("can store null to clear the token", () => {
      setToken("some-token");
      setToken(null);
      expect(getToken()).toBeNull();
    });
  });

  describe("clearToken", () => {
    it("sets the token back to null", () => {
      setToken("some-token");
      clearToken();
      expect(getToken()).toBeNull();
    });

    it("is safe to call when token is already null", () => {
      expect(() => clearToken()).not.toThrow();
      expect(getToken()).toBeNull();
    });
  });
});
