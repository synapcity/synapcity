"use client";

import { Skeleton } from "@/components/atoms/ui/skeleton";

function ToolbarSectionSkeleton({ width = 32 }: { width?: number }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <Skeleton className={`h-6 w-[${width}px] rounded-md`} />
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className="fixed left-0 bottom-0 md:relative w-full flex gap-4 p-1 bg-muted border-t md:border-t-0 md:border-r shadow-inner overflow-x-auto h-12">
      {[...Array(5)].map((_, i) => (
        <ToolbarSectionSkeleton key={i} width={48} />
      ))}
      <Skeleton className="h-8 w-20 rounded-md ml-auto" />
    </div>
  );
}
