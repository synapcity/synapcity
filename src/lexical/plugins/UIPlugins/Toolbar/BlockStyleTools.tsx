"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from "@lexical/rich-text";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { Button } from "@/components/atoms";
import { useEffect, useState } from "react";

export default function BlockStyleTools() {
  const [editor] = useLexicalComposerContext();
  const [activeBlock, setActiveBlock] = useState<string>("paragraph");
  const [activeType, setActiveType] = useState<string | null>(null);

  useEffect(() => {
    const updateActiveBlock = () => {
      editor.getEditorState().read(() => {
        try {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const parent = anchorNode.getTopLevelElementOrThrow();

            if ($isHeadingNode(parent)) {
              setActiveBlock(parent.getTag());
            } else {
              setActiveBlock(parent.getType());
            }
          }
        } catch (err) {
          console.warn("BlockStyleTools: Failed to resolve top-level block", err);
        }
      });
    };

    const unregister = editor.registerUpdateListener(updateActiveBlock);
    return () => unregister();
  }, [editor]);

  const applyBlockStyle = (blockType: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      try {
        const anchorNode = selection.anchor.getNode();
        const parent = anchorNode.getTopLevelElementOrThrow();

        let newNode;
        switch (blockType) {
          case "paragraph":
            newNode = $createParagraphNode();
            break;
          case "h1":
          case "h2":
          case "h3":
            newNode = $createHeadingNode(blockType);
            break;
          case "blockquote":
            newNode = $createQuoteNode();
            break;
          default:
            console.warn(`Unsupported block type: ${blockType}`);
            return;
        }

        if (blockType !== activeType) {
          setActiveType(blockType);
        }

        newNode.append(...parent.getChildren());
        parent.replace(newNode);
      } catch (err) {
        console.warn("BlockStyleTools: Failed to apply block style", err);
      }
    });
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant={activeBlock === "paragraph" ? "primary" : "ghost"}
        aria-pressed={activeType === "paragraph"}
        onClick={() => applyBlockStyle("paragraph")}
      >
        Paragraph
      </Button>
      <Button
        variant={activeBlock === "h1" ? "primary" : "ghost"}
        aria-pressed={activeType === "h1"}
        onClick={() => applyBlockStyle("h1")}
      >
        H1
      </Button>
      <Button
        variant={activeBlock === "h2" ? "primary" : "ghost"}
        aria-pressed={activeType === "h2"}
        onClick={() => applyBlockStyle("h2")}
      >
        H2
      </Button>
      <Button
        variant={activeBlock === "blockquote" ? "primary" : "ghost"}
        aria-pressed={activeType === "blockquote"}
        onClick={() => applyBlockStyle("blockquote")}
      >
        Blockquote
      </Button>
    </div>
  );
}
