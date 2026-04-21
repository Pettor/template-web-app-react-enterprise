import type { LoginData } from "../Api/Login/Types";
import { client } from "../Client/FetchClient";
import { clearToken, setToken } from "../Token/TokenStorage";
import { ALLOWED_URLS } from "./ApiWorkerAllowedUrls";
import { ApiWorkerClient, isFetchError } from "./ApiWorkerClient";
import type { ApiError, ApiResponseTypes } from "./ApiWorkerReponse";

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

function getDemoGetData(url: string): unknown {
  switch (url) {
    case "/api/personal/profile":
      return {
        id: "demo-user-id",
        userName: "demo@example.com",
        firstName: "Demo",
        lastName: "User",
        email: "demo@example.com",
        isActive: true,
        emailConfirmed: true,
        phoneNumber: null,
        imageUrl: null,
      };
    case "/api/dashboard":
      return {
        stats: { totalRevenue: 48295, totalUsers: 1284, activeUsers: 876, conversionRate: 3.8 },
        chartData: [
          { label: "Jan", revenue: 6800, expenses: 4200 },
          { label: "Feb", revenue: 7200, expenses: 4800 },
          { label: "Mar", revenue: 6100, expenses: 3900 },
          { label: "Apr", revenue: 8400, expenses: 5100 },
          { label: "May", revenue: 9200, expenses: 5800 },
          { label: "Jun", revenue: 10595, expenses: 6200 },
        ],
        recentTransactions: [
          {
            id: "txn-001",
            customer: "Alice Johnson",
            email: "alice@example.com",
            amount: 249.0,
            status: "completed",
            date: "2024-04-14",
          },
          {
            id: "txn-002",
            customer: "Bob Martinez",
            email: "bob@example.com",
            amount: 89.99,
            status: "pending",
            date: "2024-04-13",
          },
          {
            id: "txn-003",
            customer: "Carol Williams",
            email: "carol@example.com",
            amount: 399.0,
            status: "completed",
            date: "2024-04-12",
          },
          {
            id: "txn-004",
            customer: "David Lee",
            email: "david@example.com",
            amount: 149.5,
            status: "failed",
            date: "2024-04-11",
          },
          {
            id: "txn-005",
            customer: "Eva Chen",
            email: "eva@example.com",
            amount: 599.0,
            status: "completed",
            date: "2024-04-10",
          },
        ],
        kpis: [
          { id: "revenue", deltaPct: 20.1, deltaAbs: 7582, spark: [22, 24, 23, 28, 26, 31, 30, 34, 33, 38, 36, 45] },
          { id: "users", deltaPct: 18.0, deltaAbs: 180, spark: [12, 15, 14, 17, 16, 19, 18, 20, 22, 24, 23, 24] },
          { id: "active", deltaPct: 19.0, deltaAbs: 201, spark: [8, 9, 9, 11, 12, 11, 13, 14, 14, 15, 14, 16] },
          {
            id: "conversion",
            deltaPct: -2.1,
            deltaAbs: -0.3,
            spark: [14, 13.5, 14.2, 13, 13.5, 12.8, 13.1, 12.9, 12.6, 13.0, 12.8, 12.5],
          },
        ],
        cohorts: [
          { key: "dau", value: 876, total: 1284 },
          { key: "wau", value: 1050, total: 1284 },
          { key: "mau", value: 1220, total: 1284 },
        ],
        channels: [
          { key: "direct", pct: 38 },
          { key: "organic", pct: 26 },
          { key: "referral", pct: 18 },
          { key: "paid", pct: 12 },
          { key: "other", pct: 6 },
        ],
        activity: [
          {
            key: "act-1",
            title: "New user registered",
            detail: "alice@example.com",
            relativeTime: "2m ago",
            color: "success",
          },
          {
            key: "act-2",
            title: "Payment received",
            detail: "$249.00 from Alice Johnson",
            relativeTime: "5m ago",
            color: "accent",
          },
          {
            key: "act-3",
            title: "Subscription renewed",
            detail: "Bob Martinez — Pro plan",
            relativeTime: "12m ago",
            color: "success",
          },
          {
            key: "act-4",
            title: "Payment failed",
            detail: "$149.50 from David Lee",
            relativeTime: "1h ago",
            color: "warning",
          },
          {
            key: "act-5",
            title: "New user registered",
            detail: "carol@example.com",
            relativeTime: "2h ago",
            color: "success",
          },
        ],
      };
    case "/api/application/info":
      return { version: "demo" };
    default:
      return null;
  }
}

// Request and Response types
type ApiMessages =
  | { type: "token/request"; payload: LoginData }
  | { type: "token/refresh" }
  | { type: "user/logout" }
  | { type: "request/patch"; url: string; payload?: unknown }
  | { type: "request/post"; url: string; payload?: unknown }
  | { type: "request/put"; url: string; payload?: unknown }
  | { type: "request/get"; url: string }
  | { type: "request/delete"; url: string };

const apiWorkerClient = new ApiWorkerClient(client, ALLOWED_URLS);

async function messageHandler({ data: sentData, ports: [port] }: MessageEvent<ApiMessages>): Promise<void> {
  let apiResponse: ApiResponseTypes;

  if (!port) {
    console.error("No port provided");
    return;
  }

  try {
    switch (sentData.type) {
      // Login
      case "token/request":
        {
          const { payload } = sentData;
          const token = await apiWorkerClient.tokenRequest(payload);

          setToken(token);
          apiResponse = { data: null, status: 200, statusText: "OK" };
        }
        break;

      // Refresh Token
      case "token/refresh":
        {
          const token = await apiWorkerClient.refreshToken();

          setToken(token);
          apiResponse = { data: null, status: 200, statusText: "OK" };
        }
        break;

      // Logout
      case "user/logout":
        {
          await apiWorkerClient.removeToken();
          clearToken();

          apiResponse = {
            data: null,
            statusText: "OK",
            status: 200,
          };
        }

        break;

      // Patch request
      case "request/patch":
        {
          const { payload, url } = sentData;
          const response = await apiWorkerClient.patch(url, payload);
          const data = response.status === 204 ? null : await response.json();
          apiResponse = { data, status: response.status, statusText: response.statusText };
        }
        break;

      // Post request
      case "request/post":
        {
          const { payload, url } = sentData;
          const response = await apiWorkerClient.post(url, payload);
          const data = response.status === 204 ? null : await response.json();
          apiResponse = { data, status: response.status, statusText: response.statusText };
        }
        break;

      // Put request
      case "request/put":
        {
          const { url, payload } = sentData;
          const response = await apiWorkerClient.put(url, payload);
          const data = response.status === 204 ? null : await response.json();
          apiResponse = { data, status: response.status, statusText: response.statusText };
        }
        break;

      // Get request
      case "request/get":
        {
          if (IS_DEMO_MODE) {
            apiResponse = { data: getDemoGetData(sentData.url), status: 200, statusText: "OK" };
            break;
          }
          const { url } = sentData;
          const response = await apiWorkerClient.get(url);
          const data = response.status === 204 ? null : await response.json();
          apiResponse = { data, status: response.status, statusText: response.statusText };
        }
        break;

      // Delete request
      case "request/delete":
        {
          const { url } = sentData;
          const response = await apiWorkerClient.delete(url);
          const data = response.status === 204 ? null : await response.json();
          apiResponse = { data, status: response.status, statusText: response.statusText };
        }
        break;

      default: {
        apiResponse = {
          code: "UNKNOWN_REQUEST",
          status: 400,
          cause: new Error("Unknown request"),
          message: "Unknown request",
        } as ApiError;
      }
    }
  } catch (error) {
    if (isFetchError(error)) {
      const { message, code, name, cause, status } = error;
      apiResponse = {
        message,
        code,
        name,
        cause,
        status,
      } as ApiError;
    } else {
      apiResponse = {
        name: "Unknown error",
        message: (error as Error).message ?? "Unknown error",
        status: 500,
      } satisfies ApiError;
    }
  }

  // Send response back from Worker
  port.postMessage(apiResponse);
}

addEventListener("message", messageHandler);

export type { ApiMessages };
