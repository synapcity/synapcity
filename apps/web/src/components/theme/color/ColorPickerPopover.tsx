"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover";
import clsx from "clsx";

export const ColorPickerPopover = ({
  trigger,
  children,
  size = "default",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "default";
}) => {
  const sizeClasses = {
    default: "w-96",
    xs: "w-32",
    sm: "w-48",
    md: "w-64",
    lg: "w-96",
    xl: "w-96",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="inline-flex justify-center items-center w-full">{trigger}</span>
      </PopoverTrigger>
      <PopoverContent className={clsx("inline-flex justify-center", sizeClasses[size])}>
        {children}
      </PopoverContent>
    </Popover>
  );
};
