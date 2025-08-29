"use client";

import dynamic from "next/dynamic";

const NoteEditorPage = dynamic(() => import("@/components/pages/NoteEditor/NotePage"), {
  ssr: false,
});

export default function NotePage() {
  return <NoteEditorPage />;
}
