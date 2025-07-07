"use client";

import { fontSizes } from "@/theme/constants";
import { Button } from "@/components/atoms";
import type { FontSizeToken } from "@/theme/types";
import { cn } from "@/utils";

interface FontSizeControlProps {
  value?: FontSizeToken;
  onChange: (value: FontSizeToken) => void;
}

export function FontSizeControls({ value = "md", onChange }: FontSizeControlProps) {
  const currentIndex = fontSizes.findIndex((k) => k === value);
  const lastIndex = fontSizes.length - 1

  const decrease = () => {
    const next = fontSizes[Math.max(0, currentIndex - 1)];
    if (next !== value) onChange(next);
  };

  const increase = () => {
    const next = fontSizes[Math.min(fontSizes.length - 1, currentIndex + 1)];
    if (next !== value) onChange(next);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={decrease}
        className={cn("px-2 py-1 text-sm")}
        aria-label="Decrease font size"
        disabled={currentIndex === 0}
      >
        A-
      </Button>
      <span className="text-sm font-medium uppercase">
        {value}
      </span>
      <Button
        variant="outline"
        onClick={increase}
        className={cn("px-2 py-1 text-sm")}
        aria-label="Increase font size"
        disabled={currentIndex === lastIndex}
      >
        A+
      </Button>
    </div>
  );
}
