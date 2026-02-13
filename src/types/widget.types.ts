import type { LazyExoticComponent, MemoExoticComponent, ComponentType } from "react";
import type { UserRole } from "@/types/auth.types";
import type { WidgetLayoutConfig } from "@/types/dashboard.types";

export const WIDGET_IDS = ["sales"] as const;
export type WidgetId = (typeof WIDGET_IDS)[number];

export interface WidgetMetadata {
  id: WidgetId;
  title: string;
  description: string;
  allowedRoles: readonly UserRole[];
  defaultLayout: WidgetLayoutConfig;
  category: "finance" | "operations" | "engagement";
}

export interface WidgetRuntimeProps {
  widgetId: WidgetId;
}

export interface WidgetDefinition {
  metadata: WidgetMetadata;
  component: LazyExoticComponent<MemoExoticComponent<ComponentType<WidgetRuntimeProps>>>;
}

