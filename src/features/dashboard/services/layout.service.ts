import type { Layouts } from "react-grid-layout";
import { apiClient } from "@/lib/api/client";
import type { DashboardScope } from "@/types/dashboard.types";

export interface LayoutService {
  persistLayoutToApi: (scope: DashboardScope, layouts: Layouts) => Promise<void>;
}

class DashboardLayoutService implements LayoutService {
  public async persistLayoutToApi(scope: DashboardScope, layouts: Layouts): Promise<void> {
    await apiClient.saveDashboardLayout({
      scope,
      layouts,
    });
  }
}

export const layoutService: LayoutService = new DashboardLayoutService();
