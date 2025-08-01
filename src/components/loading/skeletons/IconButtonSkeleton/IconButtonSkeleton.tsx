"use client";

import { Skeleton } from "@/components/atoms/ui/skeleton";

export function IconButtonSkeleton({ size = "sm" }: { size?: "sm" | "md" }) {
  const dimensions = size === "md" ? "h-8 w-8" : "h-6 w-6";

  return <Skeleton className={`rounded-md ${dimensions}`} />;
}
