import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { z } from "zod";
import { createServiceError } from "./CreateServiceError";

describe("createServiceError", () => {
  describe("when given an ApiError (has message + status)", () => {
    it("returns a copy of the ApiError", () => {
      const apiError = { message: "Not found", name: "NotFoundError", status: 404, code: "NOT_FOUND" };
      const result = createServiceError(apiError);

      expect(result.message).toBe("Not found");
      expect(result.status).toBe(404);
      expect(result.code).toBe("NOT_FOUND");
      expect(result.name).toBe("NotFoundError");
    });

    it("returns a shallow copy, not the same reference", () => {
      const apiError = { message: "Unauthorized", name: "Error", status: 401 };
      const result = createServiceError(apiError);
      expect(result).not.toBe(apiError);
    });

    it("preserves the cause field if present", () => {
      const cause = new Error("root cause");
      const apiError = { message: "Server error", name: "Error", status: 500, cause };
      const result = createServiceError(apiError);
      expect(result.cause).toBe(cause);
    });
  });

  describe("when given a ZodError", () => {
    function makeZodError(): ZodError {
      try {
        z.object({ name: z.string() }).parse({ name: 42 });
      } catch (e) {
        if (e instanceof ZodError) return e;
      }
      throw new Error("Expected ZodError");
    }

    it("returns a ValidationError with status 400", () => {
      const zodError = makeZodError();
      const result = createServiceError(zodError);

      expect(result.status).toBe(400);
      expect(result.name).toBe("ValidationError");
      expect(result.code).toBe("VALIDATION_ERROR");
    });

    it("includes the ZodError message", () => {
      const zodError = makeZodError();
      const result = createServiceError(zodError);
      expect(result.message).toBe(zodError.message);
    });

    it("stores the original ZodError as cause", () => {
      const zodError = makeZodError();
      const result = createServiceError(zodError);
      expect(result.cause).toBe(zodError);
    });
  });

  describe("when given an unknown error", () => {
    it("returns a generic error with status 500", () => {
      const result = createServiceError(new Error("unexpected"));

      expect(result.status).toBe(500);
      expect(result.name).toBe("Unknown error");
      expect(result.message).toBe("Unknown error");
    });

    it("handles a plain string", () => {
      const result = createServiceError("some string error");

      expect(result.status).toBe(500);
      expect(result.name).toBe("Unknown error");
    });

    it("throws when given undefined (isApiError does not guard against nullish values)", () => {
      expect(() => createServiceError(undefined)).toThrow();
    });

    it("throws when given null (isApiError does not guard against nullish values)", () => {
      expect(() => createServiceError(null)).toThrow();
    });
  });
});
