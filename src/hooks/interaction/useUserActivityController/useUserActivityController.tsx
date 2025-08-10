"use client";

import { useEffect, useRef, useCallback } from "react";

type UseUserActivityControllerOptions = {
  delay?: number;
  globalEvents?: (keyof WindowEventMap)[];
  elementEvents?: (keyof HTMLElementEventMap)[];
  onIdle?: () => void;
  onActive?: () => void;
  shouldIdle?: () => boolean;
  shouldActivate?: () => boolean;
};

export function useUserActivityController(
  ref: React.RefObject<HTMLElement> | null,
  {
    delay = 10000,
    globalEvents = ["keydown", "mousemove", "click"],
    elementEvents = [],
    onIdle,
    onActive,
    shouldIdle = () => true,
    shouldActivate = () => true,
  }: UseUserActivityControllerOptions
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isIdle = useRef(false);

  const triggerIdle = useCallback(() => {
    if (!isIdle.current && shouldIdle()) {
      isIdle.current = true;
      onIdle?.();
    }
  }, [onIdle, shouldIdle]);

  const triggerActive = useCallback(() => {
    if (isIdle.current && shouldActivate()) {
      isIdle.current = false;
      onActive?.();
    }
  }, [onActive, shouldActivate]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    triggerActive();
    timeoutRef.current = setTimeout(triggerIdle, delay);
  }, [delay, triggerIdle, triggerActive]);

  useEffect(() => {
    const node = ref?.current;

    for (const event of globalEvents) {
      window.addEventListener(event, reset);
    }
    for (const event of elementEvents) {
      node?.addEventListener(event, reset);
    }

    reset();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      for (const event of globalEvents) {
        window.removeEventListener(event, reset);
      }
      for (const event of elementEvents) {
        node?.removeEventListener(event, reset);
      }
    };
  }, [globalEvents, elementEvents, reset, ref]);

  return {
    isIdle: isIdle.current,
    reset,
  };
}
