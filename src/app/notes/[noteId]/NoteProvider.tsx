"use client";

import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { defaultNotePanels } from "@/lib/data/sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useTabsStore, useUIStore } from "@/stores";
import { useEffect } from "react";

export default function NoteProvider({ noteId, children }: { noteId: string; children: React.ReactNode; }) {
  const setSelected = useUIStore((s) => s.setSelected);
  const setPanels = useUIStore((s) => s.setPanels);
  const fetchTabsFor = useTabsStore((s) => s.getTabs);

  useEffect(() => {
    setSelected("note", noteId);
    setPanels("note", noteId, defaultNotePanels)
    fetchTabsFor("note", noteId)
  }, [fetchTabsFor, noteId, setPanels, setSelected]);

  return (
    <ThemeProvider scope="note" entityId={noteId}>
      <SidebarProvider id={noteId}>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  )
}