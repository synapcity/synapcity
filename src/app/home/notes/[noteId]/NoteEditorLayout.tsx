"use client";

import { SkeletonOrLoading } from "@/components";
import { useMetadataStore, useNoteStore } from "@/stores";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const ResizableSidebarWrapper = dynamic(
  () =>
    import("@/components/menus/sidebar/NotesSidebar/ResizableSidebarWrapper/ResizableWrapper").then(
      (mod) => mod.ResizableSidebarWrapper
    ),
  { ssr: false }
);
const NotesSidebar = dynamic(
  () =>
    import("@/components/menus/sidebar/NotesSidebar/NotesSidebar").then((mod) => mod.NotesSidebar),
  { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> }
);

export default function NoteEditorLayout({
  noteId,
  children,
}: {
  noteId: string;
  children: React.ReactNode;
}) {
  const hasHydrated = useMetadataStore((s) => s.hasHydrated);
  const selectedNote = useNoteStore(useShallow((s) => s.selected["note"]));
  const setSelected = useNoteStore((s) => s.setSelected);

  useEffect(() => {
    if (!hasHydrated) return;
    if (selectedNote !== noteId) {
      setSelected("note", noteId);
    }
  }, [hasHydrated, noteId, selectedNote, setSelected]);

  return (
    <ResizableSidebarWrapper id={noteId} scope="note" sidebar={<NotesSidebar id={noteId} />}>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </ResizableSidebarWrapper>
  );
}
