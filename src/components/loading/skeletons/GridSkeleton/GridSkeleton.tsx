import { BreakpointToggleSkeleton } from "../BreakpointToggleSkeleton/BreakpointToggleSkeleton";
import { WidgetGridSkeleton } from "../WidgetGridSkeleton/WidgetGridSkeleton";

export function GridSkeleton() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-start pt-8 gap-6 animate-pulse">
      <BreakpointToggleSkeleton />
      <WidgetGridSkeleton />
    </div>
  );
}
