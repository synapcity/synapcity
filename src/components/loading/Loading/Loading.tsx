"use client";

import { Spinner } from "@/components/atoms/Spinner/Spinner";
import { useLoadingDelay } from "@/hooks";
import { cn } from "@/utils";

interface LoadingProps {
  className?: string;
  spinnerClassName?: string;
  label?: string;
  size?: number;
  center?: boolean;
  fullScreen?: boolean;
  withMargin?: boolean;
  delayMs?: number;
  skeletonFallback?: React.ReactNode;
  variant?: "default" | "overlay" | "muted";

}

export const Loading = ({
  className,
  spinnerClassName,
  label = "Loading",
  size = 4,
  center = true,
  fullScreen = false,
  withMargin = false,
  delayMs = 0,
  skeletonFallback,
  variant = "default"
}: LoadingProps) => {
  const visible = useLoadingDelay(delayMs);

  if (!visible) return skeletonFallback ?? null;

  const variantClass = {
    default: "",
    overlay: "bg-background/60 backdrop-blur-sm",
    muted: "opacity-50",
  }[variant ?? "default"];


  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-in-out",
        fullScreen && "absolute inset-0 z-50",
        center && "flex items-center justify-center",
        variantClass,
        className
      )}
    >
      <Spinner
        size={size}
        label={label}
        className={spinnerClassName}
        withMargin={withMargin}
      />
    </div>
  );
};
