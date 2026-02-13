import { createContext, useContext, type ReactNode } from "react";
import type { AuthContextValue } from "@/types/auth.types";

const tenantContext = createContext<AuthContextValue | null>(null);

const MOCK_AUTH_CONTEXT: AuthContextValue = {
  tenantId: "tenant-acme",
  userId: "user-ana-001",
  role: "admin",
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider = ({ children }: TenantProviderProps) => (
  <tenantContext.Provider value={MOCK_AUTH_CONTEXT}>{children}</tenantContext.Provider>
);

export const useTenantContext = (): AuthContextValue => {
  const value = useContext(tenantContext);
  if (!value) {
    throw new Error("useTenantContext must be used inside TenantProvider");
  }
  return value;
};

