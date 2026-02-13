import { lazy } from "react";
import { salesWidgetMeta } from "@/features/widgets/sales/sales.meta";
import type { WidgetDefinition, WidgetId, WidgetMetadata } from "@/types/widget.types";

const widgetMetadataRegistry: Record<WidgetId, WidgetMetadata> = {
  sales: salesWidgetMeta,
};

const widgetRegistry: Record<WidgetId, WidgetDefinition> = {
  sales: {
    metadata: widgetMetadataRegistry.sales,
    component: lazy(async () => {
      const module = await import("@/features/widgets/sales/SalesWidget");
      return { default: module.SalesWidget };
    }),
  },
};

export const getWidgetRegistry = (): Record<WidgetId, WidgetDefinition> => widgetRegistry;

export const listWidgetMetadata = (): WidgetMetadata[] => Object.values(widgetMetadataRegistry);

