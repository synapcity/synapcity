"use client";
import { useState, useEffect } from "react";
import { useNoteStore } from "@/stores/resources/noteStore/useNoteStore";
import { TemplateInsertMenu } from "./TemplateInsertMenu";
import { useShallow } from "zustand/shallow";

export function NoteEditorMini({ noteId }: { noteId: string }) {
  const note = useNoteStore(useShallow((s) => s.getResourceById(noteId)));
  const updateNote = useNoteStore((s) => s.updateResource);
  const [content, setContent] = useState(note?.summary ?? "");

  useEffect(() => {
    setContent(note?.summary ?? "");
  }, [note?.summary]);

  function handleInsertTemplate(tplContent: string) {
    setContent(tplContent);
    updateNote(noteId, { summary: tplContent });
  }

  // --- Export options ---
  function handleCopy() {
    navigator.clipboard.writeText(content);
  }
  function handleDownload() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note?.title || "note"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function handlePrint() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.writeln(`<pre>${content.replace(/</g, "&lt;")}</pre>`);
    win.document.close();
    win.print();
  }

  if (!note) return <div className="text-xs text-muted-foreground">Note not found.</div>;

  return (
    <div className="flex flex-col gap-2 h-full items-center">
      <TemplateInsertMenu onInsert={handleInsertTemplate} />
      <textarea
        className="w-full border rounded p-2 min-h-[80px] text-xs -(--background)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={() => updateNote(noteId, { summary: content })}
        placeholder="Jot notes here…"
      />
      <div className="flex gap-2 text-xs text-(--foreground)">
        <button onClick={handleCopy} className="underline">Copy</button>
        <button onClick={handleDownload} className="underline">Download</button>
        <button onClick={handlePrint} className="underline">Print</button>
        <span className="ml-auto">
          Saved {new Date(note.updatedAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
