"use client";

import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { EditorProvider, MetadataProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useNoteStore } from "@/stores";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function NoteProvider({ noteId, children }: { noteId: string; children: React.ReactNode; }) {
  const selectNote = useNoteStore((s) => s.setSelected);
  const selected = useNoteStore(useShallow((s) => s.selected['note']))

  useEffect(() => {
    if (!noteId) return;
    if (selected !== noteId) {
      selectNote?.("note", noteId);
    }
  }, [noteId, selected, selectNote]);

  return (
    <MetadataProvider scope="note" entityId={noteId}>
      <ThemeProvider scope="note" entityId={noteId}>
        <EditorProvider>
          <SidebarProvider
            id={noteId}
            sidebarId={`note:${noteId}`}
            onOpenChange={(open: boolean) => !open && true}
            data-id={`note-${noteId}`}
            collapsible="icon"
          >
            {children}
          </SidebarProvider>
        </EditorProvider>
      </ThemeProvider>
    </MetadataProvider>
  )
}