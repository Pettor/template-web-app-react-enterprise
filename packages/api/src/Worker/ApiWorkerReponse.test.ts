import { describe, expect, it } from "vitest";
import { isApiError, type ApiError, type ApiResponse } from "./ApiWorkerReponse";

describe("isApiError", () => {
  it("returns true when both message and status are present", () => {
    const error: ApiError = { message: "Unauthorized", name: "Error", status: 401 };
    expect(isApiError(error)).toBe(true);
  });

  it("returns true for an error with optional code and cause", () => {
    const error: ApiError = {
      message: "Not found",
      name: "Error",
      status: 404,
      code: "NOT_FOUND",
      cause: new Error("root"),
    };
    expect(isApiError(error)).toBe(true);
  });

  it("returns false when status is missing", () => {
    const obj = { message: "Some error", name: "Error" };
    expect(isApiError(obj)).toBe(false);
  });

  it("returns false when message is missing", () => {
    const obj = { status: 500, name: "Error" };
    expect(isApiError(obj)).toBe(false);
  });

  it("returns false for a valid ApiResponse", () => {
    const response: ApiResponse = { data: { id: 1 }, status: 200, statusText: "OK" };
    expect(isApiError(response)).toBe(false);
  });

  it("throws when given null (null-safety not implemented in type guard)", () => {
    expect(() => isApiError(null)).toThrow();
  });

  it("returns false for an empty object", () => {
    expect(isApiError({})).toBe(false);
  });

  it("returns false for a plain string", () => {
    expect(isApiError("error string")).toBe(false);
  });
});
