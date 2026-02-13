export const USER_ROLES = ["owner", "admin", "manager", "analyst", "viewer"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface AuthContextValue {
  tenantId: string;
  userId: string;
  role: UserRole;
}
