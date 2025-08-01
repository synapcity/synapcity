"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEditor } from "@/providers/EditorProvider";

export default function MultipleEditorStorePlugin({ id }: { id: string; }) {
  const [editor] = useLexicalComposerContext();
  const { registerEditor, unregisterEditor } = useEditor();
  useEffect(() => {
    registerEditor(id, editor);
    return () => unregisterEditor(id);
  }, [id, editor, registerEditor, unregisterEditor]);
  return null;
};