import dynamic from "next/dynamic"

const NoteEditorPage = dynamic(() => import("@/components/pages/NoteEditor/NoteEditorLayout").then((mod) => mod.default), {
  ssr: true,
})

export default function NotePage() {
  return <NoteEditorPage />
}