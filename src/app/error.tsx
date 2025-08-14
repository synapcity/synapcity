"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
