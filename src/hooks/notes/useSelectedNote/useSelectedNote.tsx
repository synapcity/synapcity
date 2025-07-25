"use client"

import { useUIStore } from "@/stores/uiStore";
import { useNoteStore } from "@/stores/resources";
import { useMemo } from "react";

export function useSelectedNote(namespace = "", scope = "note") {
  const selectedId = useUIStore((s) => s.selected[`${namespace}:${scope}`]) ?? "";
  const note = useNoteStore((s) => s.items)[selectedId];

  return useMemo(() => note ?? null, [note]);
}
