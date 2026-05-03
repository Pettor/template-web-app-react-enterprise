import { describe, expect, it, vi } from "vitest";
import { ApiWorkerCommunication } from "./ApiWorkerCommunication";
import type { ApiError, ApiResponse } from "./ApiWorkerReponse";

function makeFakeWorker(responseFactory: () => ApiResponse | ApiError): { postMessage: ReturnType<typeof vi.fn> } {
  return {
    postMessage: vi.fn().mockImplementation((_message: unknown, transferables: MessagePort[]) => {
      const port = transferables[0]!;
      // Deliver the response after the promise is already set up
      setImmediate(() => {
        port.postMessage(responseFactory());
      });
    }),
  };
}

describe("ApiWorkerCommunication", () => {
  describe("send", () => {
    it("resolves with the response data when the worker replies with a success ApiResponse", async () => {
      const successResponse: ApiResponse<{ version: string }> = {
        data: { version: "1.0.0" },
        status: 200,
        statusText: "OK",
      };
      const fakeWorker = makeFakeWorker(() => successResponse);
      const comm = new ApiWorkerCommunication(fakeWorker as unknown as Worker);

      const result = await comm.send<{ version: string }>({ type: "request/get", url: "/api/test" });

      expect(result.data).toEqual({ version: "1.0.0" });
      expect(result.status).toBe(200);
    });

    it("rejects with an ApiError when the worker replies with an error response", async () => {
      const errorResponse: ApiError = {
        message: "Unauthorized",
        name: "ApiError",
        status: 401,
      };
      const fakeWorker = makeFakeWorker(() => errorResponse);
      const comm = new ApiWorkerCommunication(fakeWorker as unknown as Worker);

      await expect(comm.send({ type: "request/get", url: "/api/test" })).rejects.toMatchObject({
        message: "Unauthorized",
        status: 401,
      });
    });

    it("forwards the correct message type to the worker", async () => {
      const successResponse: ApiResponse<void> = { data: undefined, status: 200, statusText: "OK" };
      const fakeWorker = makeFakeWorker(() => successResponse as unknown as ApiResponse);
      const comm = new ApiWorkerCommunication(fakeWorker as unknown as Worker);

      await comm.send({ type: "user/logout" });

      expect(fakeWorker.postMessage).toHaveBeenCalledWith({ type: "user/logout" }, expect.any(Array));
    });

    it("transfers a MessagePort to the worker when sending", async () => {
      const successResponse: ApiResponse<void> = { data: undefined, status: 200, statusText: "OK" };
      const fakeWorker = makeFakeWorker(() => successResponse as unknown as ApiResponse);
      const comm = new ApiWorkerCommunication(fakeWorker as unknown as Worker);

      await comm.send({ type: "token/refresh" });

      const [, ports] = fakeWorker.postMessage.mock.calls[0]!;
      expect(Array.isArray(ports)).toBe(true);
      expect(ports).toHaveLength(1);
    });

    it("wraps a thrown Error as an ApiError with status 500", async () => {
      const throwingWorker = {
        postMessage: vi.fn().mockImplementation(() => {
          throw new Error("worker crashed");
        }),
      };
      const comm = new ApiWorkerCommunication(throwingWorker as unknown as Worker);

      await expect(comm.send({ type: "request/get", url: "/api/test" })).rejects.toMatchObject({
        message: "worker crashed",
        name: "Error",
        status: 500,
      });
    });

    it("resolves multiple sequential sends independently", async () => {
      let callCount = 0;
      const fakeWorker = {
        postMessage: vi.fn().mockImplementation((_message: unknown, transferables: MessagePort[]) => {
          const port = transferables[0]!;
          const responseValue = ++callCount;
          setImmediate(() => {
            port.postMessage({ data: { n: responseValue }, status: 200, statusText: "OK" });
          });
        }),
      };

      const comm = new ApiWorkerCommunication(fakeWorker as unknown as Worker);

      const [r1, r2] = await Promise.all([
        comm.send<{ n: number }>({ type: "request/get", url: "/api/a" }),
        comm.send<{ n: number }>({ type: "request/get", url: "/api/b" }),
      ]);

      expect(r1.data.n).toBeDefined();
      expect(r2.data.n).toBeDefined();
      expect(fakeWorker.postMessage).toHaveBeenCalledTimes(2);
    });
  });
});
