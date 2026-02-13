import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { UserRole } from "@/types/auth.types";
import { useTenantContext } from "@/features/tenant/TenantProvider";

interface PermissionContextValue {
  role: UserRole;
  hasRole: (allowedRoles: readonly UserRole[]) => boolean;
}

const permissionContext = createContext<PermissionContextValue | null>(null);

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider = ({ children }: PermissionProviderProps) => {
  const { role } = useTenantContext();

  const value = useMemo<PermissionContextValue>(
    () => ({
      role,
      hasRole: (allowedRoles) => allowedRoles.includes(role),
    }),
    [role],
  );

  return <permissionContext.Provider value={value}>{children}</permissionContext.Provider>;
};

export const usePermissionContext = (): PermissionContextValue => {
  const value = useContext(permissionContext);
  if (!value) {
    throw new Error("usePermissionContext must be used inside PermissionProvider");
  }
  return value;
};

