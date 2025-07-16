/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useIdleVisibilityController } from "@/hooks/interaction/useIdleVisibilityController";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import {
  type PropsWithChildren,
  useMemo,
  isValidElement,
  cloneElement,
  ReactElement,
  HTMLAttributes,
  RefObject,
} from "react";

interface IdleControlledProps extends PropsWithChildren {
  id: string;
  stateKey?: string;
  delay?: number;
  enabled?: boolean;
  className?: string;
  animation?: {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
  };
  hoverOverlay?: boolean;
  shouldEnable?: () => boolean;
  elementEvents?: (keyof HTMLElementEventMap)[];
  globalEvents?: (keyof WindowEventMap)[];
}

export const IdleControlled = ({
  id,
  children,
  stateKey = "isCollapsed",
  delay = 10000,
  enabled = true,
  className,
  hoverOverlay = false,
  shouldEnable,
  animation,
  globalEvents,
  elementEvents,
}: IdleControlledProps) => {
  const isEnabled = useMemo(
    () => enabled && (shouldEnable ? shouldEnable() : true),
    [enabled, shouldEnable]
  );

  const {
    ref,
    isActive,
    onMouseEnter,
    onMouseLeave,
  } = useIdleVisibilityController(id, stateKey, {
    enabled: isEnabled,
    delay,
    globalEvents,
    elementEvents,
  });

  const anim = animation ?? {
    initial: { opacity: 1, height: "auto" },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 1, height: "auto" },
    transition: { duration: 0.3 },
  };

  return (
    <>
      {hoverOverlay && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 h-6 transition-opacity duration-200 z-[9999]",
            isActive ? "opacity-100 h-auto pointer-events-auto" : "opacity-0 h-8 pointer-events-auto"
          )}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}

      <motion.div
        ref={ref as RefObject<HTMLDivElement>}
        initial={anim.initial}
        animate={isActive ? anim.exit : anim.animate}
        transition={anim.transition}
        className={cn("overflow-hidden", className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isValidElement(children)
          ? cloneElement(children as ReactElement<HTMLAttributes<any>>, {
            className: cn((children as any).props?.className),
          })
          : children}
      </motion.div>
    </>
  );
};
