"use client";

import { useEffect, useState } from "react";

type UseElementSizeOptions = {
  cssVarPrefix?: string;
  onSizeChange?: (size: { width: number; height: number }) => void;
  observe?: boolean;
};

export function useElementSize<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  options: UseElementSizeOptions = {}
) {
  const { cssVarPrefix, onSizeChange, observe = true } = options;

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!observe || !ref.current) return;

    const node = ref.current;

    const update = (entry: ResizeObserverEntry) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });

      if (cssVarPrefix) {
        document.documentElement.style.setProperty(`${cssVarPrefix}-width`, `${width}px`);
        document.documentElement.style.setProperty(`${cssVarPrefix}-height`, `${height}px`);
      }

      if (onSizeChange) {
        onSizeChange({ width, height });
      }
    };

    const observer = new ResizeObserver(([entry]) => update(entry));
    observer.observe(node);

    update({ contentRect: node.getBoundingClientRect() } as ResizeObserverEntry);

    return () => observer.disconnect();
  }, [ref, cssVarPrefix, onSizeChange, observe]);

  return size;
}
