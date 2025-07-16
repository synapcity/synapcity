"use client"

import { useEffect, useState } from "react";

export function useLoadingDelay(delayMs: number = 250): boolean {
  const [visible, setVisible] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs === 0) return;

    const timeout = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  return visible;
}
