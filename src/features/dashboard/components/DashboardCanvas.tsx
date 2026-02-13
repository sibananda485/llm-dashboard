import { memo, useEffect, useMemo } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { useDashboardLayoutPersistence } from "@/features/dashboard/hooks/useDashboardLayoutPersistence";
import { useDashboardScope } from "@/features/dashboard/hooks/useDashboardScope";
import { WidgetRenderer } from "@/features/dashboard/components/WidgetRenderer";
import { useWidgetVisibilityStore } from "@/features/dashboard/store/widget-visibility.store";
import { usePermissionContext } from "@/features/tenant/PermissionProvider";
import { getWidgetRegistry, listWidgetMetadata } from "@/features/widgets/registry/widgetRegistry";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const BREAKPOINTS = { lg: 1280, md: 1024, sm: 768, xs: 480, xxs: 0 };
const COLUMNS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const GRID_MARGIN: [number, number] = [12, 12];

const DashboardCanvasComponent = () => {
  const { hasRole } = usePermissionContext();
  const { scope, scopeKey } = useDashboardScope();

  const hydrateVisibleWidgets = useWidgetVisibilityStore((state) => state.hydrateVisibleWidgets);
  const visibleWidgetIds = useWidgetVisibilityStore((state) => state.getVisibleWidgets(scopeKey) ?? []);

  const allAllowedWidgets = useMemo(
    () => listWidgetMetadata().filter((widget) => hasRole(widget.allowedRoles)),
    [hasRole],
  );
  const allowedWidgetIds = useMemo(() => allAllowedWidgets.map((widget) => widget.id), [allAllowedWidgets]);

  useEffect(() => {
    hydrateVisibleWidgets(scope, allowedWidgetIds);
  }, [allowedWidgetIds, hydrateVisibleWidgets, scope]);

  const displayedWidgets = useMemo(
    () => allAllowedWidgets.filter((widget) => visibleWidgetIds.includes(widget.id)),
    [allAllowedWidgets, visibleWidgetIds],
  );
  const widgetRegistry = useMemo(() => getWidgetRegistry(), []);
  const { layouts, onLayoutsChange } = useDashboardLayoutPersistence(displayedWidgets);

  const renderedWidgets = useMemo(
    () =>
      displayedWidgets.map((widget) => (
        <div className="rounded-lg" key={widget.id}>
          <WidgetRenderer definition={widgetRegistry[widget.id]} />
        </div>
      )),
    [displayedWidgets, widgetRegistry],
  );

  return (
    <ResponsiveGridLayout
      breakpoints={BREAKPOINTS}
      className="layout"
      cols={COLUMNS}
      compactType="vertical"
      isDraggable
      isResizable
      layouts={layouts}
      margin={GRID_MARGIN}
      onLayoutChange={(_currentLayout, allLayouts) => onLayoutsChange(allLayouts as Layouts)}
      rowHeight={44}
      useCSSTransforms
    >
      {renderedWidgets}
    </ResponsiveGridLayout>
  );
};

export const DashboardCanvas = memo(DashboardCanvasComponent);
