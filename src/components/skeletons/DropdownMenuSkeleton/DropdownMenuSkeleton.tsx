"use client";

import { Skeleton } from "../Skeleton/Skeleton";
import { IconButtonSkeleton } from "../IconButtonSkeleton/IconButtonSkeleton";

export function DropdownMenuSkeleton() {
  return (
    <div className="relative inline-flex">
      <IconButtonSkeleton />
      <div className="absolute right-0 mt-2 w-36 bg-muted rounded-md shadow-lg border p-2 space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-full rounded-sm" />
        ))}
      </div>
    </div>
  );
}