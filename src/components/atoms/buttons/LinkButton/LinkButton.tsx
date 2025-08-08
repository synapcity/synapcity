"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import { cn } from "@/utils";
import {
  baseButtonStyles,
  sizeClasses,
  variantClasses,
  type ButtonSize,
  type ButtonVariant,
} from "../variants";
import { Spinner, Icon, Tooltip } from "@/components";
import { IconButtonProps } from "../IconButton/IconButton";

export interface LinkButtonProps
  extends Omit<LinkProps, "onClick" | "onMouseEnter" | "onTouchStart">,
  Omit<IconButtonProps, "onClick" | "onMouseEnter" | "onTouchStart" | "icon"> {
  href: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isIconOnly?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: "right" | "top" | "bottom" | "left";
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLAnchorElement>) => void;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      className,
      variant = "primary",
      size = "md",
      icon,
      isIconOnly = false,
      isLoading = false,
      isActive = false,
      fullWidth = false,
      children,
      tooltip,
      tooltipPosition,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {isLoading && <Spinner size={4} withMargin={!isIconOnly} />}
        {icon && <Icon name={icon} className={cn(!isIconOnly && "mr-2")} />}
        {!isIconOnly && <span>{children}</span>}
      </>
    );

    const link = (
      <Link
        ref={ref}
        href={href}
        aria-disabled={variant === "disabled" || isLoading}
        className={cn(
          baseButtonStyles,
          variantClasses[variant],
          sizeClasses[size],
          isIconOnly && "px-0 w-auto aspect-square",
          fullWidth && "w-full",
          (variant === "disabled" || isLoading) && "pointer-events-none opacity-50",
          className
        )}
        data-state={isActive ? "active" : isLoading ? "loading" : undefined}
        {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>)}
      >
        {content}
      </Link>
    );

    return tooltip ? (
      <Tooltip asChild content={tooltip} trigger={link} side={tooltipPosition} />
    ) : (
      link
    );
  }
);

LinkButton.displayName = "LinkButton";
