"use client"

import { useUIStore } from "@/stores/uiStore";
import { useNotesStore } from "@/stores/notesStore";
import { useMemo } from "react";

export function useSelectedNote(namespace = "", scope = "note") {
  const selectedId = useUIStore((s) => s.selected[`${namespace}:${scope}`]);
  const note = useNotesStore((s) => s.notes[selectedId ?? ""]);

  return useMemo(() => note ?? null, [note]);
}
