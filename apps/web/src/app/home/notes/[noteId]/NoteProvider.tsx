"use client";

import { SidebarProvider } from "@/components/atoms/ui/sidebar";
// import { IconSidebar } from "@/components/menus/sidebar";
import { EditorProvider, MetadataProvider } from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useNoteStore } from "@/stores";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function NoteProvider({
  noteId,
  children,
}: {
  noteId: string;
  children: React.ReactNode;
}) {
  const selectNote = useNoteStore((s) => s.setSelected);
  const selected = useNoteStore(useShallow((s) => s.selected["note"]));

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
            {/* <div className="fixed bottom-0 left-0 right-0 bg-(--sidebar) h-16 min-w-0 overflow-x-auto md:hidden transition-all duration-200 ease-linear">
              <div className="flex flex-nowrap gap-2 h-full">
                <IconSidebar side="bottom" scope="note" id={noteId} />
              </div>
            </div> */}
          </SidebarProvider>
        </EditorProvider>
      </ThemeProvider>
    </MetadataProvider>
  );
}
