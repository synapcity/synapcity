import dynamic from "next/dynamic"

const NotesPage = dynamic(() => import("@/components/pages/notes/cards/NotesMasonryGrid").then((mod) => mod.NotesMasonryGrid), {
  ssr: true,
})

export default function NotesGridPage() {
  return <NotesPage />
}
