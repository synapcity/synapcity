import { Skeleton } from "@/components";
import { Card } from "@/landing-page/components";
import { cn } from "@/utils";

export function WidgetSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full w-full p-3 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="h-10 w-40" />
      </div>
      <Skeleton className="h-3 w-28" />
    </Card>
  );
}
