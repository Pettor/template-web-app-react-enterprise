import { describe, expect, it } from "vitest";
import { applicationInfoSchema } from "./Types";

describe("applicationInfoSchema", () => {
  it("parses valid data with a string version", () => {
    const result = applicationInfoSchema.parse({ version: "1.2.3" });
    expect(result.version).toBe("1.2.3");
  });

  it("rejects data with a missing version field", () => {
    expect(() => applicationInfoSchema.parse({})).toThrow();
  });

  it("rejects data where version is not a string", () => {
    expect(() => applicationInfoSchema.parse({ version: 3 })).toThrow();
  });

  it("rejects null", () => {
    expect(() => applicationInfoSchema.parse(null)).toThrow();
  });

  it("strips extra fields", () => {
    const result = applicationInfoSchema.parse({ version: "2.0.0", extra: "ignored" });
    expect(result).not.toHaveProperty("extra");
  });
});
