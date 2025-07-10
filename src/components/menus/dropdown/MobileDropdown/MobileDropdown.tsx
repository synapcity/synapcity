"use client";

import { Icon } from "@/components/atoms";
import { Label } from "@/components/atoms/Label/Label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/ui/accordion";
import { cn } from "@/utils";
import clsx from "clsx";
import { ReactNode } from "react";

interface MobileDropdownProps {
  trigger?: {
    icon: string;
    label: string;
  }
  children: ReactNode;
  className?: string;
  value: string;
  isIconOnly?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export function MobileDropdown({
  trigger = {
    icon: "MenuIcon",
    label: "Menu"
  },
  children,
  className,
  value,
  isIconOnly = false,
  maxWidth = "md",
}: MobileDropdownProps) {
  const maxWidthMap = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-full",
  }

  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      <AccordionItem value={value} className="relative">
        <AccordionTrigger className="text-base font-medium px-4 py-3 rounded-md hover:bg-muted">
          {isIconOnly ? (<Icon name={trigger?.icon} />) : (
            <Label icon={trigger?.icon}>
              {trigger?.label}
            </Label>
          )}
        </AccordionTrigger>
        <AccordionContent
          className={clsx("absolute left-0 top-full z-50 bg-background shadow-md px-4 pb-3 pt-1 space-y-1 w-full", maxWidthMap[maxWidth])}
        >
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  );
}

