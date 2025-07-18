"use client";

import { SidebarProvider } from "@/components/atoms/ui/sidebar";
import { defaultNotePanels } from "@/lib/data/sidebar";
import { EditorProvider, MetadataProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useUIStore } from "@/stores";
import { useNodeStore } from "@/stores/nodeStore";
import { useEffect } from "react";

export default function NoteProvider({ noteId, children }: { noteId: string; children: React.ReactNode; }) {
  const setSelected = useUIStore((s) => s.setSelected);
  const setPanels = useUIStore((s) => s.setPanels);
  const clearActiveNode = useNodeStore((s) => s.clearActiveNode);

  function onClosePanel() {
    clearActiveNode();
  }

  useEffect(() => {
    setSelected?.("note", noteId);
    setPanels?.("note", noteId, defaultNotePanels)
  }, [noteId, setPanels, setSelected]);

  return (
    <MetadataProvider scope="note" entityId={noteId}>
      <ThemeProvider scope="note" entityId={noteId}>
        <EditorProvider>
          <SidebarProvider id={noteId} onOpenChange={(open: boolean) => !open && onClosePanel()}>
            {children}
          </SidebarProvider>
        </EditorProvider>
      </ThemeProvider>
    </MetadataProvider>
  )
}