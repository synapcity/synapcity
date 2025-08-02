"use client"

import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  enabled?: boolean;
  onKeyPressed: () => void;
}

export function useKeyboardShortcut({
  key,
  metaKey = false,
  ctrlKey = false,
  shiftKey = false,
  altKey = false,
  enabled = true,
  onKeyPressed,
}: UseKeyboardShortcutOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.metaKey === metaKey &&
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey
      ) {
        event.preventDefault();
        onKeyPressed();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, metaKey, ctrlKey, shiftKey, altKey, enabled, onKeyPressed]);
}
