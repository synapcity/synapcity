"use client";

import { CombinedEditor } from "@/stores";
import { useNoteViewStore, useNoteActiveView } from "@/stores/resources";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const MultipleEditorStorePlugin = dynamic(() =>
  import("@/lexical/plugins/FoundationPlugins/MultipleEditorStore/MultipleEditorStorePlugin").then(
    (mod) => ({ default: mod.default })
  )
);
const AutoFocusPlugin = dynamic(() =>
  import("@lexical/react/LexicalAutoFocusPlugin").then((mod) => ({ default: mod.AutoFocusPlugin }))
);
// const HistoryPlugin = dynamic(() => import("@lexical/react/LexicalHistoryPlugin").then(mod => ({ default: mod.HistoryPlugin })))

export default function FoundationPlugins({ noteId, viewId }: { noteId: string; viewId: string }) {
  const [editor] = useLexicalComposerContext();
  const hasHydrated = useNoteViewStore((s) => s.hasHydrated);

  const activeView = useNoteActiveView(noteId, viewId) as CombinedEditor;

  const content = activeView?.content;

  useEffect(() => {
    if (!hasHydrated || !noteId || !viewId || !content) {
      return;
    }
  }, [content, editor, hasHydrated, noteId, viewId]);

  const editorId = `${noteId}:${viewId}`;
  return (
    <>
      <MultipleEditorStorePlugin id={editorId} />
      <AutoFocusPlugin />
    </>
  );
}
