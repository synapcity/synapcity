import dynamic from "next/dynamic"

const NotesPage = dynamic(() => import("@/components/pages/notes/NotesMasonry").then((mod) => mod.NotesMasonry), {
  ssr: true,
})

export default function NotesGridPage() {
  return <NotesPage />
}
