import { createConnection } from "net";

function waitForPort(port: number, host: string, timeout: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout;
    const attempt = () => {
      const socket = createConnection(port, host);
      socket.once("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() >= deadline) {
          reject(new Error(`${host}:${port} not ready within ${timeout}ms`));
        } else {
          setTimeout(attempt, 500);
        }
      });
    };
    attempt();
  });
}

async function globalSetup(): Promise<void> {
  const timeout = 60_000;
  await Promise.all([waitForPort(4173, "localhost", timeout), waitForPort(3110, "127.0.0.1", timeout)]);
}

export default globalSetup;
