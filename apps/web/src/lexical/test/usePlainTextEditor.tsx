"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createTextNode, EditorState } from "lexical";
import { debounce } from "./debounce";
import { useEditorStore } from "./useEditorStore";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

const defaultConfig = {
  namespace: "PlainTextEditor",
  onError: (error: Error) => {
    console.error("Lexical error:", error);
  },
  theme: {},
};

type HookReturn = {
  Editor: React.FC;
};

const PlainTextHydrationPlugin: React.FC<{ storageKey: string }> = ({ storageKey }) => {
  const [editor] = useLexicalComposerContext();
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const saved = localStorage.getItem(storageKey);
    if (!saved) return;

    editor.update(() => {
      const root = $getRoot();
      const current = root.getTextContent();
      if (current.trim() === "") {
        root.clear();
        root.append($createTextNode(saved));
      }
    });
  }, [editor, storageKey]);

  return null;
};

export function usePlainTextEditor(storageKey: string): HookReturn {
  const { setDirty, setLastSaved, setSaving } = useEditorStore();

  const autosave = useCallback(
    async (editorState: EditorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent();
        try {
          setSaving(true);
          localStorage.setItem(storageKey, text);
          setLastSaved(new Date().toISOString());
          setDirty(false);
        } finally {
          setSaving(false);
        }
      });
    },
    [setDirty, setLastSaved, setSaving, storageKey]
  );

  const debouncedAutosave = useRef(debounce(autosave, 1000)).current;

  const onEditorChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        setDirty(true);
      });
      debouncedAutosave(editorState);
    },
    [setDirty, debouncedAutosave]
  );

  const Editor: React.FC = useMemo(() => {
    const Component: React.FC = () => (
      <LexicalComposer initialConfig={defaultConfig}>
        <div className="relative">
          <div className="border rounded p-2 min-h-[200px]">
            <PlainTextPlugin
              contentEditable={<ContentEditable className="min-h-[150px] w-full outline-none" />}
              placeholder={<div className="text-gray-400">Start typing...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onEditorChange} />
            <PlainTextHydrationPlugin storageKey={storageKey} />
          </div>
        </div>
      </LexicalComposer>
    );
    return Component;
  }, [onEditorChange, storageKey]);

  return { Editor };
}
