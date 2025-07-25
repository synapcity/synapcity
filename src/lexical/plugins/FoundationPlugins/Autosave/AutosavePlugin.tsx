"use client"

import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type AutosavePluginProps = {
  onSave: (content: string) => void;
};

export function AutosavePlugin({ onSave }: AutosavePluginProps) {
  const [editor] = useLexicalComposerContext();
  const isBlurredRef = useRef(false);

  const saveContent = useCallback(() => {
    const editorState = editor.getEditorState();
    const content = JSON.stringify(editorState.toJSON());
    onSave(content);
  }, [editor, onSave]);

  const debouncedSave = useRef(debounce(saveContent, 1250)).current;

  useEffect(() => {
    return editor.registerUpdateListener(({ }) => {
      if (!isBlurredRef.current) {
        debouncedSave();
      }
    });
  }, [editor, debouncedSave]);

  useEffect(() => {
    const handleBlur = () => {
      isBlurredRef.current = true;
      debouncedSave.cancel();
      saveContent();
    };

    const handleFocus = () => {
      isBlurredRef.current = false;
    };

    const root = editor.getRootElement();
    root?.addEventListener("blur", handleBlur);
    root?.addEventListener("focus", handleFocus);

    return () => {
      root?.removeEventListener("blur", handleBlur);
      root?.removeEventListener("focus", handleFocus);
    };
  }, [editor, debouncedSave, saveContent]);

  return null;
}
