"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import { useEffect, useState } from "react";
import { IconButton } from "@/components";
import { commonButtonToolbarProps } from "./UndoRedoTools";

const FORMATS: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "code",
];

export default function TextFormat() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<TextFormatType[]>([]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          setActiveFormats([]);
          return;
        }

        const newFormats = FORMATS.filter((format) =>
          selection.hasFormat(format)
        );

        setActiveFormats(newFormats);
      });
    });
  }, [editor]);

  const toggleFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex space-x-1">
      {FORMATS.map((format) => (
        <IconButton
          key={format}
          icon={format.slice(0, 1).toLowerCase() + format.slice(1)}
          {...commonButtonToolbarProps}
          variant={activeFormats.includes(format) ? "primary" : "ghost"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFormat(format);
          }}
          label={`Format text as ${format}`}
          tooltip={`Format text as ${format}`}
        >
          <span className="sr-only">
            {format.charAt(0).toUpperCase() + format.slice(1)}
          </span>
        </IconButton>
      ))}
    </div>
  );
}
