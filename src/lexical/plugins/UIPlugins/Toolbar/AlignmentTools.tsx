"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
} from "lexical";
import { IconButton } from "@/components/atoms";
import { useEffect, useState } from "react";

export default function AlignmentTools() {
  const [editor] = useLexicalComposerContext();
  const [activeAlignment, setActiveAlignment] = useState<ElementFormatType | null>("left");

  useEffect(() => {
    const updateActiveAlignment = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          if ($isRootNode(anchorNode)) return;

          const topNode = anchorNode.getTopLevelElementOrThrow();
          if (!topNode || $isRootNode(topNode)) return;

          const format = topNode.getFormat() as unknown as ElementFormatType;
          setActiveAlignment(format || "left");
        }
      });
    };

    return editor.registerUpdateListener(() => {
      updateActiveAlignment();
    });
  }, [editor]);

  const alignText = (alignment: ElementFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const topNode = anchorNode.getTopLevelElementOrThrow?.();
        if (!topNode || $isRootNode(topNode)) return;
        topNode.select();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
      }
    });
    setActiveAlignment(alignment);
  };

  return (
    <div className="flex space-x-2">
      {["left", "center", "right", "justify"].map((alignment) => (
        <IconButton
          key={alignment}
          icon={`align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`}
          onClick={() => alignText(alignment as ElementFormatType)}
          size="sm"
          tooltip={`Align ${alignment}`}
          variant={activeAlignment === alignment ? "primary" : "ghost"}
          aria-pressed={activeAlignment === alignment}
        />
      ))}
    </div>
  );
}
