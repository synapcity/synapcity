"use client"

import { useState, useEffect } from "react";
import { useNoteTabs } from "../useNoteViews";
import { useNoteStore } from "@/stores/resources";
import type { StatusKeys, UILocalStatus } from "@/types/ui";
import type { ViewResource } from "@/stores";

/**
 * Tracks the note's local status flags and maps to the active and default views.
 *
 * Returns:
 * - `activeStatus`: which status key is currently true (or null)
 * - `activeView`: the current ViewResource (from useNoteTabs)
 * - `defaultView`: the default or first ViewResource
 */
export function useNoteStatus(
  noteId: string
): {
  activeStatus: StatusKeys | null;
  activeView?: ViewResource;
  defaultView?: ViewResource;
} {
  // get views and active from consolidated hook
  const { views, activeTab: activeView } = useNoteTabs(noteId);
  const defaultView = views.find((v: ViewResource) => v.isDefault) ?? views[0];

  // local state for status key and full status object
  const [activeStatus, setActiveStatus] = useState<StatusKeys | null>(null);
  const [status, setStatus] = useState<UILocalStatus | undefined>(() =>
    useNoteStore.getState().status?.[noteId]
  );

  // subscribe to store.statusByType.note[noteId]
  useEffect(() => {
    const unsub = useNoteStore.subscribe(state => (
      state.status?.[noteId],
      (newStatus: UILocalStatus) => setStatus(newStatus)
    ));
    setStatus(useNoteStore.getState().status?.[noteId]);
    return unsub;
  }, [noteId]);

  // derive which status key is active
  useEffect(() => {
    if (!status) {
      setActiveStatus(null);
      return;
    }
    for (const key of Object.keys(status) as StatusKeys[]) {
      if (status[key]) {
        setActiveStatus(key);
        return;
      }
    }
    setActiveStatus(null);
  }, [status]);

  return { activeStatus, activeView, defaultView };
}