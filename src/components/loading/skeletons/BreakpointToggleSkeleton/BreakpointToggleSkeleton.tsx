export function BreakpointToggleSkeleton() {
  return (
    <div className="flex gap-2 items-center animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-6 w-6 rounded bg-muted" />
      ))}
    </div>
  );
}
