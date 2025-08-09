"use client";

import React, {
  Component,
  type ReactNode,
} from "react";
import { Card } from "@/components/atoms/ui/card";
import { AlertCircle } from "lucide-react";

export class WidgetErrorBoundary extends Component<
  { children: ReactNode; widgetId: string },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode; widgetId: string }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`Widget "${this.props.widgetId}" crashed:`, error);
    }
  }
  render() {
    if (this.state.error) {
      return (
        <Card className="h-full w-full p-4 flex items-center justify-center gap-3 bg-destructive/5 border-destructive">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <div className="text-sm">
            <div className="font-medium text-destructive">Widget crashed</div>
            <div className="text-muted-foreground text-xs break-all">
              {this.state.error.message}
            </div>
          </div>
        </Card>
      );
    }
    return this.props.children;
  }
}
