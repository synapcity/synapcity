"use client";

import * as React from "react";
import {
  UIPopover,
  UIPopoverTrigger,
  UIPopoverContent,
  UIPopoverAnchor,
} from "@/components/atoms";

import { cn } from "@/utils";

interface PopoverWrapperProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  trigger: React.ReactNode;
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  withAnchor?: boolean;
  anchorEl?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';
}

export function PopoverWrapper({
  open,
  onOpenChange,
  defaultOpen,
  trigger,
  content,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  className,
  withAnchor = false,
  anchorEl,
  size = "default"
}: PopoverWrapperProps) {
  const sizeClasses = {
    default: 'w-96',
    xs: 'w-32',
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96',
  };

  return (
    <UIPopover open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {withAnchor && anchorEl && <UIPopoverAnchor>{anchorEl}</UIPopoverAnchor>}

      <UIPopoverTrigger asChild>{trigger}</UIPopoverTrigger>

      <UIPopoverContent
        data-testid="popover-content"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(className, sizeClasses[size])}
      >
        {content}
      </UIPopoverContent>

      {children}
    </UIPopover>
  );
}
