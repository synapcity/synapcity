"use client"

import dynamic from "next/dynamic"

const NotesIndex = dynamic(
  () => import("./NotesIndexPage").then((mod) => mod.default),
  { ssr: false },
)
export default function NotesIndexPage() {
  return <NotesIndex />
}
