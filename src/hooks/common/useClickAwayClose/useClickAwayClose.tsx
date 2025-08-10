"use client";
import { RefObject } from "react";
import { useClickAway } from "react-use";

export function useClickAwayClose<T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void,
  enabled = true
) {
  useClickAway(ref, () => {
    if (enabled) onClose();
  });
}
