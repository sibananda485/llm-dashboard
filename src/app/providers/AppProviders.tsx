import type { ReactNode } from "react";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { DashboardThemeProvider } from "@/features/preferences/ThemeProvider";
import { PermissionProvider } from "@/features/tenant/PermissionProvider";
import { TenantProvider } from "@/features/tenant/TenantProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <DashboardThemeProvider>
    <QueryProvider>
      <TenantProvider>
        <PermissionProvider>{children}</PermissionProvider>
      </TenantProvider>
    </QueryProvider>
  </DashboardThemeProvider>
);

