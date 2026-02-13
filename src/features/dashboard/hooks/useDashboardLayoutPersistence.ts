import { useCallback, useEffect, useMemo } from "react";
import type { Layouts } from "react-grid-layout";
import { layoutService } from "@/features/dashboard/services/layout.service";
import { useDashboardScope } from "@/features/dashboard/hooks/useDashboardScope";
import { useDashboardLayoutStore } from "@/features/dashboard/store/layout.store";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { loadLayoutsFromStorage } from "@/lib/storage/layoutStorage";
import type { WidgetMetadata } from "@/types/widget.types";

const createDefaultLayouts = (widgets: WidgetMetadata[]): Layouts => ({
  lg: widgets.map((widget) => ({ ...widget.defaultLayout })),
  md: widgets.map((widget) => ({ ...widget.defaultLayout, w: Math.min(widget.defaultLayout.w, 6) })),
  sm: widgets.map((widget) => ({ ...widget.defaultLayout, w: 4 })),
  xs: widgets.map((widget) => ({ ...widget.defaultLayout, w: 2 })),
  xxs: widgets.map((widget) => ({ ...widget.defaultLayout, w: 2 })),
});

export const useDashboardLayoutPersistence = (widgets: WidgetMetadata[]) => {
  const { scope, scopeKey } = useDashboardScope();
  const setLayoutsForScope = useDashboardLayoutStore((state) => state.setLayoutsForScope);
  const getLayoutsForScope = useDashboardLayoutStore((state) => state.getLayoutsForScope);

  const layouts = useMemo<Layouts>(() => {
    const fromStore = getLayoutsForScope(scopeKey);
    if (fromStore) {
      return fromStore;
    }

    const fromStorage = loadLayoutsFromStorage(scope);
    if (fromStorage) {
      return fromStorage;
    }

    return createDefaultLayouts(widgets);
  }, [getLayoutsForScope, scope, scopeKey, widgets]);

  useEffect(() => {
    setLayoutsForScope(scope, layouts);
  }, [layouts, scope, setLayoutsForScope]);

  const persistRemote = useDebouncedCallback((nextLayouts: Layouts) => {
    void layoutService.persistLayoutToApi(scope, nextLayouts);
  }, 900);

  const onLayoutsChange = useCallback(
    (nextLayouts: Layouts) => {
      setLayoutsForScope(scope, nextLayouts);
      persistRemote(nextLayouts);
    },
    [persistRemote, scope, setLayoutsForScope],
  );

  return { layouts, onLayoutsChange };
};

