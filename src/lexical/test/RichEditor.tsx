"use client";

import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot, EditorState } from "lexical";
import { debounce } from "./debounce";
import { useEditorStore } from "./useEditorStore";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

const plainConfig = {
  namespace: "PlainEditor",
  onError: (e: Error) => console.error(e),
  theme: {},
};
const richConfig = {
  namespace: "RichEditor",
  onError: (e: Error) => console.error(e),
  theme: {},
};

type EditorType = "plain" | "rich";

const RichTextHydrationPlugin: React.FC<{ storageKey: string }> = ({ storageKey }) => {
  const [editor] = useLexicalComposerContext();
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const editorState = editor.parseEditorState(parsed);
      editor.setEditorState(editorState);
    } catch (e) {
      console.warn("Failed to hydrate rich editor state", e);
    }
  }, [editor, storageKey]);
  return null;
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

export function useUnifiedEditor(
  storageKey: string,
  type: EditorType = "plain"
): { Editor: React.FC } {
  const { setDirty, setLastSaved, setSaving } = useEditorStore();
  const firstLoadRef = useRef(true);
  const autosave = useCallback(
    async (editorState: EditorState) => {
      editorState.read(() => {
        try {
          setSaving(true);
          if (type === "plain") {
            const root = $getRoot();
            const text = root.getTextContent();
            localStorage.setItem(storageKey, text);
          } else {
            const serialized = editorState.toJSON();
            localStorage.setItem(storageKey, JSON.stringify(serialized));
          }
          setLastSaved(new Date().toISOString());
          setDirty(false);
        } finally {
          setSaving(false);
        }
      });
    },
    [setDirty, setLastSaved, setSaving, storageKey, type]
  );

  const debouncedAutosave = useRef(debounce(autosave, 1000)).current;

  const onChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        setDirty(true);
      });
      debouncedAutosave(editorState);
    },
    [setDirty, debouncedAutosave]
  );

  useEffect(() => {
    if (!firstLoadRef.current) return;
    firstLoadRef.current = false;
  }, []);

  const Editor: React.FC = useMemo(() => {
    const Component: React.FC = () => (
      <LexicalComposer initialConfig={type === "plain" ? plainConfig : richConfig}>
        <div className="relative">
          <div className="border rounded p-2 min-h-[200px]">
            {type === "plain" ? (
              <PlainTextPlugin
                contentEditable={<ContentEditable className="min-h-[150px] w-full outline-none" />}
                placeholder={<div className="text-gray-400">Start typing...</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
            ) : (
              <RichTextPlugin
                contentEditable={<ContentEditable className="min-h-[150px] w-full outline-none" />}
                placeholder={<div className="text-gray-400">Start typing with formatting...</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
            )}
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            {type === "plain" ? (
              <PlainTextHydrationPlugin storageKey={storageKey} />
            ) : (
              <RichTextHydrationPlugin storageKey={storageKey} />
            )}
          </div>
        </div>
      </LexicalComposer>
    );
    return Component;
  }, [type, onChange, storageKey]);

  return { Editor };
}
