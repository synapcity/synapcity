import { WidgetSkeleton } from "../WidgetSkeleton";

export function WidgetGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-4">
      {[...Array(count)].map((_, i) => (
        <WidgetSkeleton key={i} />
      ))}
    </div>
  );
}
