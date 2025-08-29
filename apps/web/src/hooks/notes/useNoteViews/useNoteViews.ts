"use client";

import { ViewResource } from "@/stores";
import { useNoteViewStore, useNoteStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";

export function useNoteTabs(noteId: string) {
  const params = useSearchParams();
  const tabParam = params.get("tab");

  // Zustand selectors
  const views = useNoteViewStore(useShallow((s) => s.getViewsFor(noteId) ?? []));
  const hasHydrated = useNoteViewStore((s) => s.hasHydrated);
  const addView = useNoteViewStore((s) => s.addView);
  const setActiveStore = useNoteViewStore((s) => s.setActive);
  const activeByScope = useNoteViewStore(useShallow((s) => s.activeByScope));
  const note = useNoteStore(useShallow((s) => s.items[noteId]));

  // Auto-add an "editor" view if none exist
  useEffect(() => {
    if (!hasHydrated) return;
    if (views.length === 0 && noteId) {
      const newView = addView(noteId, "editor");
      setActiveStore(noteId, newView.id);
    }
  }, [hasHydrated, views.length, addView, noteId, setActiveStore]);

  // Determine active ID: store > URL > first view
  const firstViewId = views[0]?.id;
  const activeId = activeByScope[noteId] ?? tabParam ?? firstViewId;

  // Sync store when activeId changes
  useEffect(() => {
    if (!activeId) return;
    if (activeByScope[noteId] !== activeId) {
      setActiveStore(noteId, activeId);
    }
  }, [activeId, noteId, setActiveStore, activeByScope]);

  // Sync URL 'tab' param
  useEffect(() => {
    if (!activeId) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("tab") !== activeId) {
      url.searchParams.set("tab", activeId);
      window.history.replaceState(null, "", url);
    }
  }, [activeId]);

  // Find the active view object
  const activeTab = useMemo(() => {
    return views.find((v: ViewResource) => v.id === activeId) ?? views[0];
  }, [views, activeId]);

  const setActiveTab = (id: string) => {
    setActiveStore(noteId, id);
  };

  return {
    note,
    views,
    activeTab,
    activeTabId: activeId,
    setActiveTab,
  };
}
