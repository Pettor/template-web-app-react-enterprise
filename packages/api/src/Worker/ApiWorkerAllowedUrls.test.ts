import { describe, expect, it } from "vitest";
import { ALLOWED_URLS } from "./ApiWorkerAllowedUrls";

describe("ALLOWED_URLS", () => {
  it("is an array", () => {
    expect(Array.isArray(ALLOWED_URLS)).toBe(true);
  });

  it("contains the application info endpoint", () => {
    expect(ALLOWED_URLS).toContain("/api/application/info");
  });

  it("contains the personal profile endpoint", () => {
    expect(ALLOWED_URLS).toContain("/api/personal/profile");
  });

  it("contains the forgot password endpoint", () => {
    expect(ALLOWED_URLS).toContain("/api/users/forgot-password");
  });

  it("contains the self-register endpoint", () => {
    expect(ALLOWED_URLS).toContain("/api/users/self-register");
  });

  it("does not contain token endpoints (those bypass the allow-list)", () => {
    expect(ALLOWED_URLS).not.toContain("/api/tokens");
    expect(ALLOWED_URLS).not.toContain("/api/tokens/refresh");
  });

  it("contains exactly 5 entries", () => {
    expect(ALLOWED_URLS).toHaveLength(5);
  });
});
