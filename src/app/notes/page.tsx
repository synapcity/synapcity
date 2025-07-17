import dynamic from "next/dynamic"

const NotesPage = dynamic(() => import("@/components/pages/notes/NotesGridPage").then((mod) => mod.default), {
  ssr: true,
})

export default function NotesGridPage() {
  return <NotesPage />
}
