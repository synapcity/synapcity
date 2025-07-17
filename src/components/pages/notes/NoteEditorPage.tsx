"use client";

import { useMetadata } from "@/providers";
import dynamic from "next/dynamic"

const BasicEditor = dynamic(() => import("@/lexical/components/editors/BasicEditor").then(mod => mod.BasicEditor), { ssr: false })

export default function NoteEditorPage() {
  const { entityId } = useMetadata()
  return (
    <div className="flex flex-col items-center justify-items-center size-full p-8">
      <BasicEditor id={`note:${entityId}`} />
    </div>
  )
}