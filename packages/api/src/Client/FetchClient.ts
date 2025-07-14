export class FetchClient {
  private timeout: number;

  constructor(timeout: number = 5000) {
    this.timeout = timeout;
  }

  private createAbortController(): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.timeout);
    return controller;
  }

  async request(url: string, options?: RequestInit): Promise<Response> {
    const controller = this.createAbortController();

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  }
}

function createClient(): FetchClient {
  return new FetchClient(5000);
}

export const client = createClient();
