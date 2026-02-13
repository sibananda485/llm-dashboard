import { Component, type ErrorInfo, type ReactNode } from "react";

interface WidgetErrorBoundaryProps {
  children: ReactNode;
  widgetTitle: string;
}

interface WidgetErrorBoundaryState {
  hasError: boolean;
}

export class WidgetErrorBoundary extends Component<WidgetErrorBoundaryProps, WidgetErrorBoundaryState> {
  public state: WidgetErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): WidgetErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`[widget:${this.props.widgetTitle}] render error`, error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Widget failed to render.
        </div>
      );
    }

    return this.props.children;
  }
}

