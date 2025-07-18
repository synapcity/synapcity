"use client"

import { SkeletonOrLoading } from "@/components"
import { MainEditorLayout } from "@/components/pages/MainEditorLayout"
import { useMetadataStore, useNotesStore } from "@/stores"
import dynamic from "next/dynamic"

const ResizableSidebarWrapper = dynamic(() => import("@/components/menus/sidebar/NotesSidebar/ResizableSidebarWrapper/ResizableSidebarWrapper").then((mod) => mod.ResizableSidebarWrapper), { ssr: false })
const NotesSidebar = dynamic(() => import("@/components/menus/sidebar/NotesSidebar/NotesSidebar").then((mod) => mod.NotesSidebar), { ssr: false, loading: () => <SkeletonOrLoading isLoading={true} /> })

export default function NoteEditorLayout({ noteId, children }: { noteId: string; children: React.ReactNode }) {
  const noteById = useNotesStore(s => s.getItemById)(noteId)
  const hasHydrated = useMetadataStore(s => s.hasHydrated)

  if (!hasHydrated) {
    return null
  }
  return (
    <ResizableSidebarWrapper
      id={noteId}
      scope="note"
      sidebar={<NotesSidebar id={noteId} />}
    >
      <MainEditorLayout title={noteById?.title ?? "Untitled"} noteId={noteById?.id ?? crypto.randomUUID()} createdAt={noteById?.createdAt}>
        {children}
      </MainEditorLayout>
    </ResizableSidebarWrapper>
  )
}