import { ZodError } from "zod";
import { isApiError, type ApiError } from "../Worker/ApiWorkerReponse";
import type { ServiceError } from "./ServiceError";

export class ServiceErrorFactory {
  public static create(e: unknown): ApiError {
    if (isApiError(e)) {
      // Make sure errors are returned as ServiceError
      return {
        ...e,
      } as ServiceError;
    }

    if (e instanceof ZodError) {
      return {
        name: "ValidationError",
        message: e.message,
        status: 400,
        code: "VALIDATION_ERROR",
        cause: e,
      };
    }

    return {
      name: "Unknown error",
      message: "Unknown error",
      status: 500,
    };
  }
}
