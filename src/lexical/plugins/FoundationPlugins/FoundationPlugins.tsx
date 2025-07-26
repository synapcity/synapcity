"use client";

import { CombinedEditor } from "@/schemas";
import { useNoteViewStore } from "@/stores/resources";
import { useNoteActiveView } from "@/stores/resources/selectors";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const MultipleEditorStorePlugin = dynamic(() => import("@/lexical/plugins/FoundationPlugins/MultipleEditorStore/MultipleEditorStorePlugin").then(mod => ({ default: mod.default })))
const AutoFocusPlugin = dynamic(() => import("@lexical/react/LexicalAutoFocusPlugin").then(mod => ({ default: mod.AutoFocusPlugin })))
const HistoryPlugin = dynamic(() => import("@lexical/react/LexicalHistoryPlugin").then(mod => ({ default: mod.HistoryPlugin })))

export default function FoundationPlugins({
  noteId,
  viewId
}: {
  noteId: string;
  viewId: string;
}) {
  const [editor] = useLexicalComposerContext()
  const hasHydrated = useNoteViewStore(s => s.hasHydrated)

  // 1) Pass *both* noteId + viewId:
  const activeView = useNoteActiveView(noteId, viewId) as CombinedEditor;

  // 2) Only grab the content string (guarded by optional chaining):
  const content = activeView?.content;

  useEffect(() => {
    // never run until we have everything
    if (!hasHydrated || !noteId || !viewId || !content) {
      return;
    }

    // parse & set editor state
    const parsed = JSON.parse(content);
    if (parsed) {
      const editorState = editor.parseEditorState(parsed);
      queueMicrotask(() => editor.setEditorState(editorState));
    }
  }, [content, editor, hasHydrated, noteId, viewId]);

  const editorId = `${noteId}:${viewId}`
  return (
    <>
      <MultipleEditorStorePlugin id={editorId} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </>
  );
}