"use client";

import { useEffect, useState } from "react";
import { useNoteStore, useNoteViewStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useNoteTabs } from "../useNoteViews";
import { ViewResource } from "@/stores";

/**
 * Safely subscribes to the active note, its views, and the active view.
 */
export function useActiveNoteView() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note")?.trim();

  const { note: activeNote, views, activeTab: activeView } = useNoteTabs(noteId ?? "");

  // 2. Subscribe to all notes
  const [notes, setNotes] = useState(() => useNoteStore.getState().getAllResources?.() ?? []);
  useEffect(() => {
    const unsub = useNoteStore.subscribe(
      (state) => (
        state.items as unknown as ViewResource[],
        () => setNotes(useNoteStore.getState().getAllResources?.() ?? [])
      )
    );
    setNotes(useNoteStore.getState().getAllResources?.() ?? []);
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = useNoteViewStore.subscribe((state) => [state.items, state.activeByScope]);
    return unsub;
  }, [activeNote]);

  return {
    activeView,
    activeNote,
    notes,
    views,
  };
}
