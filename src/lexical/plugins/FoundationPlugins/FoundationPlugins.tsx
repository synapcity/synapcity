"use client";

import dynamic from "next/dynamic";

const MultipleEditorStorePlugin = dynamic(() => import("@/lexical/plugins/FoundationPlugins/MultipleEditorStore/MultipleEditorStorePlugin").then(mod => ({ default: mod.default })))
const AutoFocusPlugin = dynamic(() => import("@lexical/react/LexicalAutoFocusPlugin").then(mod => ({ default: mod.AutoFocusPlugin })))
const HistoryPlugin = dynamic(() => import("@lexical/react/LexicalHistoryPlugin").then(mod => ({ default: mod.HistoryPlugin })))
export default function FoundationPlugins({
  editorId,
}: {
  editorId: string;
}) {
  return (
    <>
      <MultipleEditorStorePlugin id={editorId} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </>
  );
}