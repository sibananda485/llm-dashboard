import { memo, Suspense } from "react";
import { WidgetErrorBoundary } from "@/components/common/WidgetErrorBoundary";
import type { WidgetDefinition } from "@/types/widget.types";

interface WidgetRendererProps {
  definition: WidgetDefinition;
}

const WidgetRendererComponent = ({ definition }: WidgetRendererProps) => {
  const WidgetComponent = definition.component;

  return (
    <WidgetErrorBoundary widgetTitle={definition.metadata.title}>
      <Suspense
        fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading widget...</div>}
      >
        <WidgetComponent widgetId={definition.metadata.id} />
      </Suspense>
    </WidgetErrorBoundary>
  );
};

export const WidgetRenderer = memo(WidgetRendererComponent);

