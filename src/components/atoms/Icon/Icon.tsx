/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ComponentType, HTMLAttributes } from "react";
import { Icon as IconifyIcon } from "@iconify/react";
import * as LucideIcons from "lucide-react";
import { UITooltip, UITooltipContent, UITooltipProvider, UITooltipTrigger } from "@/components/atoms";
import { AlertCircle } from "lucide-react";
import { testId } from "@/utils/testId/testId";

export type IconSource = "lucide" | "iconify" | "undefined";
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface IconProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  icon?: ComponentType<any>;
  source?: IconSource;
  size?: IconSize;
  className?: string;
  label?: string;
  tooltip?: string;
  fallbackIcon?: React.ReactNode;
}

const iconSizeMap: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export const Icon = ({
  name,
  icon: IconComponent,
  source = "lucide",
  size = "sm",
  className = "",
  label,
  tooltip,
  fallbackIcon,
  ...props
}: IconProps) => {
  const resolvedSize = typeof size === "number" ? size : iconSizeMap[size];
  const ariaLabel = label ?? tooltip;
  const ariaHidden = !ariaLabel;

  const renderFallback = () => (
    fallbackIcon ?? (
      <AlertCircle
        size={resolvedSize}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel ?? "Unknown icon"}
        style={{ width: resolvedSize, height: resolvedSize }}
        className={`shrink-0 text-red-500 ${className}`}
      />
    )
  );


  const renderIcon = () => {
    if (IconComponent) {
      return (
        <IconComponent
          size={resolvedSize}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          className={`shrink-0 ${className}`}
          {...testId("custom-icon")}
          {...(props as any)}
        />
      );
    }

    if (!name) {
      return renderFallback();
    }

    if (source === "iconify" || name.includes(":")) {
      return (
        <IconifyIcon
          icon={name}
          width={resolvedSize}
          height={resolvedSize}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          className={`shrink-0 ${className}`}

          {...(props as any)}
        />
      );
    }

    const LucideIcon = ((LucideIcons as unknown) as Record<string, ComponentType<any>>)[name];

    if (LucideIcon) {
      return (
        <LucideIcon
          size={resolvedSize}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          className={`shrink-0 ${className}`}
          {...testId("custom-icon")}
          {...(props as any)}
        />
      );
    }

    console.warn(`Icon "${name}" not found in lucide-react icons.`);
    return renderFallback();
  };

  const iconElement = renderIcon();

  if (tooltip) {
    return (
      <UITooltipProvider>
        <UITooltip>
          <UITooltipTrigger asChild data-testid="UItooltip-trigger">{iconElement}</UITooltipTrigger>
          <UITooltipContent>{tooltip}</UITooltipContent>
        </UITooltip>
      </UITooltipProvider>
    );
  }

  return iconElement;
};
