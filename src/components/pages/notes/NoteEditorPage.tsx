"use client";

import { useMetadata } from "@/providers";
import dynamic from "next/dynamic"

const BasicEditor = dynamic(() => import("@/lexical/components/editors/BasicEditor").then(mod => mod.BasicEditor), { ssr: false })

export default function NoteEditorPage() {
  const { info: { scope, id } } = useMetadata()
  return (
    <div className="flex flex-col items-center justify-items-center size-full p-2">
      <BasicEditor id={`${scope}:${id}`} />
    </div>
  )
}