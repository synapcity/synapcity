"use client";

import { ToolbarSkeleton } from "../ToolbarSkeleton/ToolbarSkeleton";
import { Skeleton } from "../Skeleton/Skeleton";

export function EditorSkeleton() {
  return (
    <div className="flex flex-col h-full w-full">
      <Skeleton className="h-12 w-full border-b bg-muted" />
      <ToolbarSkeleton />
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <Skeleton className="h-6 w-1/3 rounded-md" />
        <Skeleton className="h-[200px] rounded-md" />
        <Skeleton className="h-6 w-1/4 rounded-md" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
