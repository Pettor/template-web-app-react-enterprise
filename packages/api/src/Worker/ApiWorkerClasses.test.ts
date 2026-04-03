import { describe, expect, it } from "vitest";
import { tokenSchema } from "./ApiWorkerClasses";

describe("tokenSchema", () => {
  it("parses valid token data", () => {
    const data = { token: "eyJhbGciOiJIUzI1NiJ9", refreshTokenExpiryTime: "2026-12-31T23:59:59Z" };
    const result = tokenSchema.parse(data);
    expect(result.token).toBe("eyJhbGciOiJIUzI1NiJ9");
    expect(result.refreshTokenExpiryTime).toBe("2026-12-31T23:59:59Z");
  });

  it("rejects data missing the token field", () => {
    expect(() => tokenSchema.parse({ refreshTokenExpiryTime: "2026-01-01" })).toThrow();
  });

  it("rejects data missing the refreshTokenExpiryTime field", () => {
    expect(() => tokenSchema.parse({ token: "abc" })).toThrow();
  });

  it("rejects a non-string token", () => {
    expect(() => tokenSchema.parse({ token: 12345, refreshTokenExpiryTime: "2026-01-01" })).toThrow();
  });

  it("rejects a non-string refreshTokenExpiryTime", () => {
    expect(() => tokenSchema.parse({ token: "abc", refreshTokenExpiryTime: 999 })).toThrow();
  });

  it("rejects an empty object", () => {
    expect(() => tokenSchema.parse({})).toThrow();
  });

  it("ignores extra fields (strips them)", () => {
    const data = { token: "tok", refreshTokenExpiryTime: "2026-01-01", extraField: "ignored" };
    const result = tokenSchema.parse(data);
    expect(result).not.toHaveProperty("extraField");
  });
});
