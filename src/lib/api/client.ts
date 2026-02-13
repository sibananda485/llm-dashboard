import type { DashboardServerLayoutPayload } from "@/types/dashboard.types";

const NETWORK_LATENCY_MS = 250;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export interface ApiClient {
  saveDashboardLayout: (payload: DashboardServerLayoutPayload) => Promise<void>;
}

class MockApiClient implements ApiClient {
  public async saveDashboardLayout(payload: DashboardServerLayoutPayload): Promise<void> {
    await delay(NETWORK_LATENCY_MS);
    console.info("[api] dashboard layout persisted", payload.scope);
  }
}

export const apiClient: ApiClient = new MockApiClient();
