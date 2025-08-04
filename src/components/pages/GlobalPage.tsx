"use client"

// import { NoteGlobalSearch } from "@/search/notes/NoteGlobalSearch"
import { NotesSearchWithTabs } from "@/search/notes/NotesSearchWithTabs"

export default function GlobalPage() {
  return (
    <div className="flex flex-col items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20">
      Global Page
      {/* <NoteGlobalSearch /> */}
      <NotesSearchWithTabs />
    </div>
  )
}