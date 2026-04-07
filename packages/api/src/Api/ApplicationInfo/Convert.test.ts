import { describe, expect, it } from "vitest";
import { applicationInfoConvertFromDto } from "./Convert";

describe("applicationInfoConvertFromDto", () => {
  it("maps the version field from the DTO", () => {
    const dto = { version: "1.0.0" };
    const result = applicationInfoConvertFromDto(dto);
    expect(result.version).toBe("1.0.0");
  });

  it("returns a plain object with only the version field", () => {
    const dto = { version: "3.5.2" };
    const result = applicationInfoConvertFromDto(dto);
    expect(Object.keys(result)).toEqual(["version"]);
  });

  it("preserves version strings of any format", () => {
    const dto = { version: "2026.04.03-beta" };
    const result = applicationInfoConvertFromDto(dto);
    expect(result.version).toBe("2026.04.03-beta");
  });
});
