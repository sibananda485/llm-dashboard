import type { Layout, Layouts } from "react-grid-layout";
import type { UserRole } from "@/types/auth.types";

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs";
export type LayoutProfileId = string;

export interface DashboardIdentity {
  tenantId: string;
  userId: string;
  role: UserRole;
}

export interface DashboardScope extends DashboardIdentity {
  profileId: LayoutProfileId;
}

export interface WidgetLayoutConfig {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export type WidgetLayouts = Record<Breakpoint, Layout[]>;

export interface LayoutProfile {
  id: LayoutProfileId;
  name: string;
  isDefault: boolean;
}

export interface DashboardServerLayoutPayload {
  scope: DashboardScope;
  layouts: Layouts;
}

