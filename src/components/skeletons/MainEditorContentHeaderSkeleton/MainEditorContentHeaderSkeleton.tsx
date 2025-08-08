"use client";

import { Skeleton } from "../Skeleton/Skeleton";
import { IconButtonSkeleton } from "../IconButtonSkeleton/IconButtonSkeleton";

export function MainEditorContentHeaderSkeleton() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-40 rounded-md" />
        <IconButtonSkeleton />
      </div>

      <div className="flex items-center space-x-2">
        <IconButtonSkeleton />
        <IconButtonSkeleton />
        <IconButtonSkeleton />
        <IconButtonSkeleton />
        <Skeleton className="h-8 w-6 rounded-md" />
      </div>
    </header>
  );
}
