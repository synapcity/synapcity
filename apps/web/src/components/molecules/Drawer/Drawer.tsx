"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/atoms/ui/sheet";
import { cn } from "@/utils";

type DrawerProps = {
  trigger?: React.ReactNode;
  triggerLabel?: string;
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
};

export function Drawer({
  trigger,
  triggerLabel = "Open",
  title = "My Drawer",
  children,
  open,
  onOpenChange,
  side = "right",
  className,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger ?? (
          <button type="button" aria-label={triggerLabel} data-testid="drawer-trigger">
            {triggerLabel}
          </button>
        )}
      </SheetTrigger>

      <SheetContent side={side} className={cn("bg-(--background) text-(--foreground)", className)}>
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
