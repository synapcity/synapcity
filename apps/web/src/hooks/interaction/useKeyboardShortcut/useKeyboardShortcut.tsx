"use client";

import { useEffect, useMemo } from "react";

type KeyCombo = {
  /** Character key like 'n' or named key like 'Enter' (matches event.key, case-insensitive for letters) */
  key?: string;
  /** Hardware code like 'KeyN', 'Enter' (matches event.code, exact) */
  code?: string;

  // Modifiers — leave undefined to ignore, set true to require, false to require NOT pressed
  meta?: boolean; // ⌘ on macOS, Windows key on Windows
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;

  /** Cross-platform convenience: ⌘ on macOS, Ctrl elsewhere */
  mod?: boolean;
};

interface UseKeyboardShortcutOptions {
  combos: KeyCombo[]; // one or more combos that trigger the action
  onKeyPressed: (e: KeyboardEvent) => void;
  enabled?: boolean;
  /** If true (default), block default browser actions (e.g., Cmd+N) when matched */
  preventDefault?: boolean;
  /** If true (default), stop propagation when matched */
  stopPropagation?: boolean;
  /** If true (default), require that ONLY the specified modifiers are pressed (no extras) */
  exact?: boolean;
  /** If false (default), ignore shortcuts while typing in inputs/textareas/contenteditable */
  allowInInputs?: boolean;
  /** If true, ignore auto-repeat when key is held down (default: true) */
  ignoreRepeat?: boolean;
}

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

function matchesCombo(e: KeyboardEvent, combo: KeyCombo, exact: boolean) {
  // Resolve 'mod' into concrete meta/ctrl expectations if provided
  const wantsMeta = combo.meta ?? (combo.mod ? isMac() : undefined);
  const wantsCtrl = combo.ctrl ?? (combo.mod ? !isMac() : undefined);

  // Helper to check a single modifier with optional requirement
  const req = (want: boolean | undefined, actual: boolean) =>
    want === undefined ? true : actual === want;

  // Key / code match
  const keyOk = combo.key ? (e.key || "").toLowerCase() === combo.key.toLowerCase() : true;
  const codeOk = combo.code ? e.code === combo.code : true;
  if (!keyOk || !codeOk) return false;

  // Modifier match
  const metaOk = req(wantsMeta, e.metaKey);
  const ctrlOk = req(wantsCtrl, e.ctrlKey);
  const altOk = req(combo.alt, e.altKey);
  const shiftOk = req(combo.shift, e.shiftKey);
  if (!metaOk || !ctrlOk || !altOk || !shiftOk) return false;

  if (!exact) return true;

  // With exact=true, disallow any extra modifiers that weren't explicitly required true
  const required = {
    meta: wantsMeta === true,
    ctrl: wantsCtrl === true,
    alt: combo.alt === true,
    shift: combo.shift === true,
  };
  const noExtras =
    (required.meta || !e.metaKey) &&
    (required.ctrl || !e.ctrlKey) &&
    (required.alt || !e.altKey) &&
    (required.shift || !e.shiftKey);

  return noExtras;
}

export function useKeyboardShortcut({
  combos,
  onKeyPressed,
  enabled = true,
  preventDefault = true,
  stopPropagation = true,
  exact = true,
  allowInInputs = false,
  ignoreRepeat = true,
}: UseKeyboardShortcutOptions) {
  // Memoize a lightweight, serializable signature so deps are stable
  const signature = useMemo(() => JSON.stringify({ combos, exact }), [combos, exact]);

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      // Ignore repeats if requested
      if (ignoreRepeat && e.repeat) return;

      // Ignore when typing in inputs unless allowed
      if (!allowInInputs) {
        const target = e.target as HTMLElement | null;
        const tag = (target?.tagName || "").toLowerCase();
        const isEditable =
          target?.isContentEditable || tag === "input" || tag === "textarea" || tag === "select";
        if (isEditable) return;
      }

      // Match any provided combo
      for (const combo of combos) {
        if (matchesCombo(e, combo, exact)) {
          if (preventDefault) e.preventDefault();
          if (stopPropagation) e.stopPropagation();
          onKeyPressed(e);
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    onKeyPressed,
    preventDefault,
    stopPropagation,
    allowInInputs,
    ignoreRepeat,
    signature,
  ]);
}
