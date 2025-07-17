"use client"

import { SkeletonOrLoading } from "@/components"
import dynamic from "next/dynamic"

const ResizableSidebarWrapper = dynamic(() => import("@/components/menus/sidebar/NotesSidebar/ResizableSidebarWrapper/ResizableSidebarWrapper").then((mod) => mod.ResizableSidebarWrapper), { ssr: false })
const NotesSidebar = dynamic(() => import("@/components/menus/sidebar/NotesSidebar/NotesSidebar").then((mod) => mod.NotesSidebar), { ssr: false, loading: () => <SkeletonOrLoading isLoading={true} /> })

export default function NoteEditorLayout({ noteId, children }: { noteId: string; children: React.ReactNode }) {

  return (
    <ResizableSidebarWrapper
      id={noteId}
      scope="note"
      sidebar={<NotesSidebar id={noteId} />}
    >
      {children}
    </ResizableSidebarWrapper>
  )
}