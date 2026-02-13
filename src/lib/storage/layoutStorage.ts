import type { Layouts } from "react-grid-layout";
import type { DashboardScope } from "@/types/dashboard.types";
import type { WidgetId } from "@/types/widget.types";

const LAYOUT_STORAGE_PREFIX = "saas-dashboard-layout";
const WIDGET_STORAGE_PREFIX = "saas-dashboard-widgets";

export const buildScopeKey = (scope: DashboardScope): string =>
  `${scope.tenantId}:${scope.userId}:${scope.role}:${scope.profileId}`;

const buildLayoutStorageKey = (scope: DashboardScope): string => `${LAYOUT_STORAGE_PREFIX}:${buildScopeKey(scope)}`;
const buildWidgetStorageKey = (scope: DashboardScope): string => `${WIDGET_STORAGE_PREFIX}:${buildScopeKey(scope)}`;

export const loadLayoutsFromStorage = (scope: DashboardScope): Layouts | null => {
  const rawValue = window.localStorage.getItem(buildLayoutStorageKey(scope));
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as Layouts;
  } catch {
    return null;
  }
};

export const saveLayoutsToStorage = (scope: DashboardScope, layouts: Layouts): void => {
  window.localStorage.setItem(buildLayoutStorageKey(scope), JSON.stringify(layouts));
};

export const clearLayoutsFromStorage = (scope: DashboardScope): void => {
  window.localStorage.removeItem(buildLayoutStorageKey(scope));
};

export const loadEnabledWidgetsFromStorage = (scope: DashboardScope): WidgetId[] | null => {
  const rawValue = window.localStorage.getItem(buildWidgetStorageKey(scope));
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as WidgetId[];
  } catch {
    return null;
  }
};

export const saveEnabledWidgetsToStorage = (scope: DashboardScope, widgetIds: WidgetId[]): void => {
  window.localStorage.setItem(buildWidgetStorageKey(scope), JSON.stringify(widgetIds));
};
