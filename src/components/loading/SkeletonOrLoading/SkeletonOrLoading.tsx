"use client";

import { Loading } from "../Loading/Loading";

interface Props {
  isLoading?: boolean;
  skeleton?: React.ReactNode;
  delayMs?: number;
  children?: React.ReactNode;
  fullScreen?: boolean;
  center?: boolean;
  size?: number;
  variant?: "default" | "overlay" | "muted";
}

export const SkeletonOrLoading = ({
  isLoading,
  skeleton,
  delayMs = 250,
  children,
  fullScreen = false,
  center = true,
  size = 4,
  variant = "default",
}: Props) => {
  if (isLoading) {
    if (skeleton) return <>{skeleton}</>;
    return (
      <Loading
        fullScreen={fullScreen}
        center={center}
        size={size}
        delayMs={delayMs}
        variant={variant}
      />
    );
  }

  return <>{children}</>;
};
