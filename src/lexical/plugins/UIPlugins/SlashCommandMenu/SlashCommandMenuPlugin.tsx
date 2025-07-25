"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getSelection, $isRangeSelection } from "lexical";

export function SlashCommandMenuPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const text = selection.getTextContent();
          if (text.endsWith("/")) {
            console.log("Open Slash Menu");
          }
        }
      });
    });
  }, [editor]);

  return null;
}
