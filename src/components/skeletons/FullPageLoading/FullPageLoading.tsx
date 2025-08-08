"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/utils";

export function FullPageLoading({
  message = "Loading...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center gap-2 text-muted-foreground",
        className
      )}
    >
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
