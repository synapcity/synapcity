export function WidgetSkeleton() {
  return (
    <div className="bg-muted/40 animate-pulse rounded-md p-4 min-h-[120px] shadow-sm">
      <div className="h-4 w-2/3 bg-muted rounded mb-2" />
      <div className="h-3 w-1/2 bg-muted rounded mb-1" />
      <div className="h-3 w-1/4 bg-muted rounded" />
    </div>
  );
}
