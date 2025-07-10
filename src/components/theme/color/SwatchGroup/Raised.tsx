"use client";

import React from "react";
import clsx from "clsx";

interface RaisedProps {
  zDepth?: 0 | 1 | 2 | 3 | 4 | 5;
  radius?: "sm" | "md" | "lg" | "xl" | "full" | "none";
  background?: string;
  children: React.ReactNode;
  className?: string;
}

const depthShadowMap: Record<number, string> = {
  0: "shadow-none",
  1: "shadow-md",
  2: "shadow-lg",
  3: "shadow-xl",
  4: "shadow-2xl",
  5: "shadow-[0_40px_77px_rgba(0,0,0,0.22),_0_27px_24px_rgba(0,0,0,0.2)]",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const Raised: React.FC<RaisedProps> = ({
  zDepth = 1,
  radius = "md",
  background = "#ffffff",
  children,
  className,
}) => {
  return (
    <div className="relative inline-block">
      <div
        className={clsx(
          "absolute inset-0",
          depthShadowMap[zDepth],
          radiusMap[radius],
          className
        )}
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};
