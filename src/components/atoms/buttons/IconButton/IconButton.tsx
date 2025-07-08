"use client";

import { IconSource, IconSize, Icon, Spinner } from "@/components/atoms";
import { Button, ButtonProps } from "../Button";
import { ButtonSize, ButtonVariant } from "../variants";

export interface IconButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  icon: string;
  iconSource?: IconSource
  size?: ButtonSize;
  iconSize?: IconSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const IconButton = ({
  icon,
  size = "md",
  iconSize = 16,
  iconSource = "lucide",
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <Button
      variant={variant}
      isLoading={isLoading}
      fullWidth={fullWidth}
      iconSize={iconSize}
      size={size}
      className={className}
      icon={icon}
      isIconOnly

      {...props}>
      {isLoading && <Spinner />}
      {!isLoading && <Icon name={icon} source={iconSource} size={iconSize} />}
      <span className="sr-only">{props["aria-label"] || props["aria-labelledby"] || "Button"}</span>
    </Button>);
};