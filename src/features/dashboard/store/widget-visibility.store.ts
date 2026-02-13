import { create } from "zustand";
import {
  loadEnabledWidgetsFromStorage,
  saveEnabledWidgetsToStorage,
} from "@/lib/storage/layoutStorage";
import type { DashboardScope } from "@/types/dashboard.types";
import type { WidgetId } from "@/types/widget.types";

const getScopeKey = (scope: DashboardScope): string =>
  `${scope.tenantId}:${scope.userId}:${scope.role}:${scope.profileId}`;

interface WidgetVisibilityState {
  visibleWidgetsByScope: Record<string, WidgetId[]>;
  hydrateVisibleWidgets: (scope: DashboardScope, fallbackWidgetIds: WidgetId[]) => void;
  getVisibleWidgets: (scopeKey: string) => WidgetId[] | null;
  setVisibleWidgets: (scope: DashboardScope, widgetIds: WidgetId[]) => void;
  toggleWidgetVisibility: (scope: DashboardScope, widgetId: WidgetId, fallbackWidgetIds: WidgetId[]) => void;
}

export const useWidgetVisibilityStore = create<WidgetVisibilityState>((set, get) => ({
  visibleWidgetsByScope: {},
  hydrateVisibleWidgets: (scope, fallbackWidgetIds) => {
    const scopeKey = getScopeKey(scope);
    const existing = get().visibleWidgetsByScope[scopeKey];
    if (existing) {
      return;
    }

    const storageValue = loadEnabledWidgetsFromStorage(scope);
    const nextWidgetIds = storageValue ?? fallbackWidgetIds;
    saveEnabledWidgetsToStorage(scope, nextWidgetIds);

    set((state) => ({
      visibleWidgetsByScope: {
        ...state.visibleWidgetsByScope,
        [scopeKey]: nextWidgetIds,
      },
    }));
  },
  getVisibleWidgets: (scopeKey) => get().visibleWidgetsByScope[scopeKey] ?? null,
  setVisibleWidgets: (scope, widgetIds) => {
    const scopeKey = getScopeKey(scope);
    saveEnabledWidgetsToStorage(scope, widgetIds);

    set((state) => ({
      visibleWidgetsByScope: {
        ...state.visibleWidgetsByScope,
        [scopeKey]: widgetIds,
      },
    }));
  },
  toggleWidgetVisibility: (scope, widgetId, fallbackWidgetIds) => {
    const scopeKey = getScopeKey(scope);
    const sourceWidgetIds = get().visibleWidgetsByScope[scopeKey] ?? fallbackWidgetIds;
    const nextWidgetIds = sourceWidgetIds.includes(widgetId)
      ? sourceWidgetIds.filter((id) => id !== widgetId)
      : [...sourceWidgetIds, widgetId];

    saveEnabledWidgetsToStorage(scope, nextWidgetIds);

    set((state) => ({
      visibleWidgetsByScope: {
        ...state.visibleWidgetsByScope,
        [scopeKey]: nextWidgetIds,
      },
    }));
  },
}));
