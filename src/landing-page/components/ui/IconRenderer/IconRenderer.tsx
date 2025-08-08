"use client";

import * as React from "react";
import Image from "next/image";
import { IconBaseProps } from "react-icons";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type IconRendererProps = {
  icon: React.ComponentType<IconBaseProps> | LucideIcon;
  name?: string;
  size?: number | IconSize;
  className?: string;
};

type IconSize = "xs" | "sm" | "md" | "lg" | "xl"

export const iconSizes: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 36
}
export function IconRenderer({ icon, name, size = "md", className }: IconRendererProps) {
  const iconSize = typeof (size) === "string" ? iconSizes[size] : size
  if (typeof icon !== "string") {
    const Icon = icon;
    return (
      <Icon
        className={clsx("transition-all duration-300 opacity-20 hover:opacity-90 scale-90 hover:scale-105", className)}
        title={name}
        size={iconSize}
      />
    );
  } else {
    return (
      <Image
        src={icon}
        alt={name ?? ""}
        width={iconSize}
        height={iconSize}
        className={clsx("transition-all duration-300 opacity-20 hover:opacity-90 scale-90 hover:scale-105", className)}
        title={name}
      />
    );
  }
}
