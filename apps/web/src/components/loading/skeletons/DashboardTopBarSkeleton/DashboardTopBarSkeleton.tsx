export function DashboardTopBarSkeleton() {
  return (
    <header className="sticky top-0 z-10 flex items-center px-4 h-16 border-b bg-background animate-pulse">
      <div className="flex items-center gap-4 w-full">
        <div className="h-6 w-6 bg-muted rounded-sm" />
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-6 bg-muted rounded hidden md:block" />
        <div className="flex-1 mx-4 h-4 bg-muted rounded" />
        <div className="h-6 w-6 bg-muted rounded-sm" />
      </div>
    </header>
  );
}
