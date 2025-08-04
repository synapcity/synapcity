import dynamic from "next/dynamic"

const NotesIndex = dynamic(() => import("./NotesIndexPage").then((mod) => mod.default))

export default function NotesIndexPage() {
  return <NotesIndex />
}
