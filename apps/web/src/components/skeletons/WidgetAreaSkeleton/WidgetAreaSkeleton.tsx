import { WidgetGridSkeleton } from "../WidgetGridSkeleton";

export function WidgetAreaSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center h-full w-full text-muted-foreground animate-pulse">
      <span className="absolute inset-0 z-0 opacity-60 text-center pt-12 pointer-events-none">
        Loading widgets...
      </span>
      <div className="flex flex-col items-center justify-center w-full h-full z-10">
        <WidgetGridSkeleton />
        {children}
      </div>
    </div>
  );
}
