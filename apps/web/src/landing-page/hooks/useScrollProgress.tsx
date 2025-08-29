"use client";

import { useCallback, useEffect } from "react";

export const useScrollProgress = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  direction: "horizontal" | "vertical",
  onReachEnd?: () => void,
  setScrollProgress?: (value: number) => void
) => {
  const handleScroll = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (!containerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } =
        containerRef.current;

      const progress =
        direction === "horizontal"
          ? (scrollLeft / (scrollWidth - clientWidth)) * 100
          : (scrollTop / (scrollHeight - clientHeight)) * 100;

      setScrollProgress?.(progress);

      if (progress > 99 && onReachEnd) {
        onReachEnd();
      }
    },
    [containerRef, direction, onReachEnd, setScrollProgress]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [containerRef, handleScroll]);
};
