"use client"

import { useRef, useCallback, useEffect, useState } from "react";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { useNoteStore, useNoteViewStore } from "@/stores";
import { createInitialConfig } from "@/lexical/createInitialConfig";
import { SetEditorStatePlugin } from "@/lexical/plugins/FoundationPlugins/SetEditorState/SetEditorStatePlugin";
import Plugins from "@/lexical/plugins/Plugins";

export const fallbackEditorState = JSON.stringify({
  root: {
    children: [{
      children: [
        {
          text: "Write something here...",
          type: "text",
          version: 1
        }],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "paragraph",
      version: 1,
      textFormat: 0,
      textStyle: ""
    }],
    type: "root",

    version: 1,
    format: "",
    indent: 0,
    direction: null
  },
  type: "editor",
  version: 1
});

export const loadContent = async () => {
  const value = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return value;
}

export default function NoteEditor({ noteId, viewId, content }: { noteId: string; viewId: string; content: string; }) {
  const [config, setConfig] = useState<InitialConfigType | null>(null)
  const updateView = useNoteViewStore(s => s.updateResource)
  const updateNote = useNoteStore(s => s.updateResource)
  const latestEditorState = useRef(content ?? fallbackEditorState);
  const hasHydrated = useNoteViewStore(s => s.hasHydrated)

  useEffect(() => {
    if (!hasHydrated || !noteId || !viewId) return;
    if (!latestEditorState.current) {
      latestEditorState.current = content ?? fallbackEditorState
    }
  }, [noteId, viewId, content, hasHydrated])

  useEffect(() => {
    const loadConfig = async () => {
      const initialConfig = await createInitialConfig(`${noteId}:${viewId}`)
      if (initialConfig) {
        setConfig(initialConfig)
      }
    }
    if (!config) {
      loadConfig()
    }
  }, [config, content, noteId, viewId])

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        const json = JSON.stringify(editor.getEditorState())
        latestEditorState.current = json;
        const plain = editor.getRootElement()?.textContent ?? "";
        updateNote(noteId, { summary: plain })
        return updateView(viewId, { editorState: json, content: plain })
      });
    },
    [noteId, updateNote, updateView, viewId]
  );

  const resolvedContent = content ?? fallbackEditorState;

  try {
    const parsed = JSON.parse(resolvedContent);
    if (!parsed?.root || parsed.root.type !== "root") {
      throw new Error("Invalid editor state");
    }
  } catch (e) {
    console.error("Editor state parse error:", resolvedContent, e);
    return <div className="p-4 text-red-600">Invalid editor state. Please reload the page.</div>;
  }

  return config && (
    <div className="flex flex-col flex-1 min-h-0 max-h-5/6">
      <LexicalComposer initialConfig={config}>
        <Plugins noteId={noteId} viewId={viewId} editorId={`${noteId}`} />
        <OnChangePlugin onChange={handleChange} />
        <SetEditorStatePlugin content={latestEditorState.current} />
      </LexicalComposer>
    </div>
  );
}
