/** How long to wait for a newer service worker to take over before reloading anyway. */
const ACTIVATION_TIMEOUT_MS = 10_000;

function waitForActivation(worker: ServiceWorker): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, ACTIVATION_TIMEOUT_MS);
    function check(): void {
      if (worker.state === "activated" || worker.state === "redundant") {
        window.clearTimeout(timer);
        worker.removeEventListener("statechange", check);
        resolve();
      }
    }
    worker.addEventListener("statechange", check);
    check();
  });
}

/**
 * Loads the newest version: asks the service worker to fetch it, waits for it
 * to take over (it activates by itself, see `registerType: "autoUpdate"`), then reloads.
 */
export async function updateApp(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker?.getRegistration();
    if (registration) {
      await registration.update();
      const worker = registration.installing ?? registration.waiting;
      if (worker) {
        await waitForActivation(worker);
      }
    }
  } catch {
    // Offline or no service worker: a reload still picks up whatever the server has.
  }
  window.location.reload();
}
