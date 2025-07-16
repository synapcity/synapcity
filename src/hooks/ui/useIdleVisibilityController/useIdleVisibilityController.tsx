"use client";

import { useUIStore } from "@/stores";
import { useRef, useCallback, useEffect } from "react";

type Options = {
  enabled?: boolean;
  delay?: number;
  elementEvents?: Array<keyof HTMLElementEventMap>;
  globalEvents?: Array<keyof WindowEventMap>;
};

export function useIdleVisibilityController(
  id: string,
  key: string = "isCollapsed",
  {
    enabled = true,
    delay = 10000,
    elementEvents = ["mousemove", "mouseenter", "click"],
    globalEvents = [],
  }: Options = {}
) {
  const setCompState = useUIStore((s) => s.setCompState);
  const isActive = useUIStore((s) => s.components[id]?.[key]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isHovering = useRef(false);

  const setState = useCallback(
    (val: boolean) => setCompState(id, key, val),
    [id, key, setCompState]
  )

  const resetTimer = useCallback(() => {
    if (!enabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!isHovering.current) {
        console.log("[Idle] Timer expired, collapsing");
        setState(true);
      }
    }, delay);
  }, [enabled, delay, setState]);

  const handleActivity = useCallback(() => {
    if (!enabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    resetTimer();

    if (isActive) {
      setState(false);
    }
  }, [enabled, isActive, resetTimer, setState]);


  const onMouseEnter = () => {
    isHovering.current = true;
    setState(false);
    resetTimer();
  };

  const onMouseLeave = () => {
    isHovering.current = false;
    resetTimer();
  };


  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    for (const event of elementEvents) {
      node.addEventListener(event, handleActivity);
    }

    for (const event of globalEvents) {
      window.addEventListener(event, handleActivity);
    }

    resetTimer();

    return () => {
      for (const event of elementEvents) {
        node.removeEventListener(event, handleActivity);
      }
      for (const event of globalEvents) {
        window.removeEventListener(event, handleActivity);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, elementEvents, globalEvents, handleActivity, resetTimer]);

  return {
    ref,
    isActive: isActive ?? false,
    onMouseEnter,
    onMouseLeave,
  };
}