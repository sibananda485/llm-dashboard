import { useMemo } from "react";
import { useDashboardLayoutStore } from "@/features/dashboard/store/layout.store";
import { useTenantContext } from "@/features/tenant/TenantProvider";
import { buildScopeKey } from "@/lib/storage/layoutStorage";
import type { DashboardScope } from "@/types/dashboard.types";

export const useDashboardScope = (): { scope: DashboardScope; scopeKey: string } => {
  const { tenantId, userId, role } = useTenantContext();
  const activeProfileId = useDashboardLayoutStore((state) => state.activeProfileId);

  const scope = useMemo<DashboardScope>(
    () => ({
      tenantId,
      userId,
      role,
      profileId: activeProfileId,
    }),
    [activeProfileId, role, tenantId, userId],
  );

  const scopeKey = useMemo(() => buildScopeKey(scope), [scope]);

  return { scope, scopeKey };
};

