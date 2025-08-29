"use client";

import { useNoteStore } from "@/stores/resources/noteStore";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

export function useSelectedNote() {
  const selected = useNoteStore(useShallow((s) => s.selected.note)) || "";
  const selectedNote = useNoteStore(useShallow((s) => s.items[selected]));

  return useMemo(() => selectedNote ?? null, [selectedNote]);
}
