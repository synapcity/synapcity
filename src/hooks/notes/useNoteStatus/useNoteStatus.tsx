"use client"

import { useEffect, useState } from "react";
import { useNoteStore, useNoteViewStore } from "@/stores";
import type { StatusKeys, UILocalStatus } from "@/types/ui";
import { useNoteViews } from "../useNoteViews";
import { ViewResource } from "@/schemas";

export function useNoteStatus(noteId: string): {
  activeStatus: StatusKeys;
  activeView?: ViewResource;
  defaultView?: ViewResource;
} {
  const views = useNoteViews(noteId)
  const getActive = useNoteViewStore(s => s.getActive)
  const activeId = getActive(noteId)
  const activeView = views.find((view) => view.id === activeId)

  const [status, setStatus] = useState<UILocalStatus | undefined>(
    () => useNoteStore.getState().localStatus.note[noteId]
  );

  useEffect(() => {
    const unsub = useNoteStore.subscribe(
      state => state.statusByType?.note?.[noteId],
    );
    // Set initial value on mount/update
    setStatus(useNoteStore.getState().statusByType?.note?.[noteId]);
    return unsub;
  }, [noteId]);


  return {
    activeStatus: Object.values(status as UILocalStatus).find(s => !!s),
    activeView,
    defaultView: views[0],

  }
}
