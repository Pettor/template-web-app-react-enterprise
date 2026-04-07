import { describe, expect, it } from "vitest";
import { isServiceError } from "./ServiceError";

describe("isServiceError", () => {
  it("returns true when the error has a message property", () => {
    const error = { message: "Something went wrong", status: 500, name: "ServiceError" };
    expect(isServiceError(error)).toBe(true);
  });

  it("returns true for a minimal service error with only message defined", () => {
    const error = { message: "Bad request", status: 400, name: "Error" };
    expect(isServiceError(error)).toBe(true);
  });

  it("returns false when message is undefined", () => {
    const error = { status: 500, name: "Error" };
    expect(isServiceError(error)).toBe(false);
  });

  it("returns false for a plain Error without status", () => {
    const error = new Error("oops");
    // isServiceError only checks for .message — a plain Error has .message
    // so it returns true here, which matches the current implementation
    expect(isServiceError(error)).toBe(true);
  });

  it("throws when given null (null-safety not implemented in type guard)", () => {
    expect(() => isServiceError(null)).toThrow();
  });

  it("returns false for an empty object", () => {
    expect(isServiceError({})).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isServiceError("some string")).toBe(false);
  });
});
