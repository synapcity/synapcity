"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";
import {
  baseButtonStyles,
  iconSizeClasses,
  sizeClasses,
  variantClasses,
  type ButtonSize,
  type ButtonVariant,
} from "../variants";
import { Tooltip, Icon, type IconSize, Spinner, UIButton, UIButtonProps } from "@/components/atoms";

export interface ButtonProps extends Omit<UIButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isIconOnly?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  tooltip?: string | React.ReactNode;
  icon?: string;
  avatarUrl?: string;
  label?: string;
  iconSize?: number | string;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isIconOnly = false,
      isLoading = false,
      fullWidth = false,
      iconSize = 16,
      children,
      tooltip,
      tooltipPosition,
      icon,
      label,
      ...props
    },
    ref
  ) => {
    const sizeClass = cn(
      !isIconOnly && sizeClasses[size],
      isIconOnly && iconSizeClasses[size],
      isIconOnly && "px-0 w-auto aspect-square"
    );

    const content = (
      <>
        {isLoading && <Spinner size={Number(iconSize)} withMargin={!isIconOnly} />}
        {!isLoading && icon && <Icon name={icon} size={iconSize as IconSize} />}
        {!isIconOnly && (children ?? label)}
      </>
    );

    const button = (
      <UIButton
        ref={ref}
        type={props.type || "button"}
        data-state={isLoading ? "loading" : undefined}
        disabled={variant === "disabled" || isLoading || props.disabled}
        className={cn(
          baseButtonStyles,
          variantClasses[variant],
          sizeClass,
          fullWidth && "w-full",
          className
        )}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </UIButton>
    );

    return tooltip ? (
      <Tooltip asChild content={tooltip} trigger={button} side={tooltipPosition} />
    ) : (
      button
    );
  }
);

Button.displayName = "Button";
