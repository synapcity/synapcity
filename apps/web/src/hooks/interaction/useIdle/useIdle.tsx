// hooks/useIdle.tsx
"use client";
import { useState, useEffect, useRef, RefObject, useCallback } from "react";

export interface UseIdleOptions {
  /** Milliseconds of inactivity before `isIdle === true` */
  delay?: number;
  /** Disable idle logic entirely (always `isIdle === false`) */
  disabled?: boolean;
  /** DOM events on the target node that count as “activity” */
  elementEvents?: (keyof HTMLElementEventMap)[];
  /** Window-level events that count as “activity” */
  globalEvents?: (keyof WindowEventMap)[];
  /** If set, only start tracking once this flag flips to true */
  enabled?: boolean;
}

/**
 * Tracks activity on the given `ref` (or on window if no ref provided).
 * Returns `{ ref, isIdle }`.
 */
export function useIdle(options: UseIdleOptions = {}): {
  ref: RefObject<HTMLDivElement | null>;
  isIdle: boolean;
} {
  const {
    delay = 10_000,
    disabled = false,
    elementEvents = ["mousemove", "mousedown", "keydown", "touchstart"],
    globalEvents = [],
    enabled = true,
  } = options;

  const [isIdle, setIsIdle] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const resetTimer = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    if (!disabled && enabled) {
      timeout.current = setTimeout(() => setIsIdle(true), delay);
    }
  }, [delay, disabled, enabled]);

  // activity handler
  const handleActivity = useCallback(() => {
    if (disabled || !enabled) return;
    if (isIdle) setIsIdle(false);
    resetTimer();
  }, [disabled, enabled, isIdle, resetTimer]);

  useEffect(() => {
    if (disabled || !enabled) return;

    const el = nodeRef.current;
    const targets = el ? [el] : [];
    // attach element events
    targets.forEach((t) => elementEvents.forEach((ev) => t.addEventListener(ev, handleActivity)));
    // attach global events
    globalEvents.forEach((ev) => window.addEventListener(ev, handleActivity));

    // kick off
    resetTimer();

    return () => {
      // cleanup listeners & timer
      targets.forEach((t) =>
        elementEvents.forEach((ev) => t.removeEventListener(ev, handleActivity))
      );
      globalEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [delay, disabled, elementEvents, enabled, globalEvents, handleActivity, resetTimer]);

  return { ref: nodeRef, isIdle };
}
