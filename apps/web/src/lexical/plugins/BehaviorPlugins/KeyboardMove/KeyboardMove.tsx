"use client";

import React, { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  $isRangeSelection,
  createCommand,
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  KEY_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
} from "lexical";

const PICKUP_CMD = createCommand<void>();
const MOVE_UP_CMD = createCommand<void>();
const MOVE_DOWN_CMD = createCommand<void>();

export const KeyboardMovePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const pickedKeyRef = useRef<string | null>(null);

  const moveNode = React.useCallback(
    (key: string, direction: "up" | "down") => {
      editor.update(() => {
        const root = $getRoot();
        const nodes = root.getChildren();
        const idx = nodes.findIndex((n) => n.getKey() === key);
        if (idx < 0) return;

        const node = nodes[idx];
        const target = nodes[direction === "up" ? idx - 1 : idx + 1];
        if (!target) return;

        node.remove();
        if (direction === "up") {
          target.insertBefore(node);
        } else {
          target.insertAfter(node);
        }
        pickedKeyRef.current = node.getKey();
      });
    },
    [editor]
  );

  useEffect(() => {
    const highlightDom = (key: string | null) => {
      document
        .querySelectorAll(".lexical-block-keyboard-selected")
        .forEach((el) => el.classList.remove("lexical-block-keyboard-selected"));

      if (key) {
        const el = document.querySelector(`[data-lexical-key="${key}"]`);
        if (el) el.classList.add("lexical-block-keyboard-selected");
      }
    };

    const unregisterPickup = editor.registerCommand(
      PICKUP_CMD,
      () => {
        editor.getEditorState().read(() => {
          const sel = $getSelection();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let anchorNode: any = null;
          if ($isRangeSelection(sel)) {
            anchorNode = sel.anchor.getNode();
            while (anchorNode?.getParent() !== $getRoot()) {
              anchorNode = anchorNode?.getParent();
            }
          }
          const key = anchorNode?.getKey() ?? null;
          pickedKeyRef.current = pickedKeyRef.current === key ? null : key;
          highlightDom(pickedKeyRef.current);
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    const unregisterMoveUp = editor.registerCommand(
      MOVE_UP_CMD,
      () => {
        if (pickedKeyRef.current) {
          moveNode(pickedKeyRef.current, "up");
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );

    const unregisterMoveDown = editor.registerCommand(
      MOVE_DOWN_CMD,
      () => {
        if (pickedKeyRef.current) {
          moveNode(pickedKeyRef.current, "down");
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );

    const unregisterKeyDown = editor.registerCommand(
      KEY_DOWN_COMMAND,
      (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "/") {
          editor.dispatchCommand(PICKUP_CMD, undefined);
          e.preventDefault();
          return true;
        }
        if (e.key === "Escape" && pickedKeyRef.current) {
          pickedKeyRef.current = null;
          highlightDom(null);
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );

    const unregisterArrowUp = editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      () => {
        editor.dispatchCommand(MOVE_UP_CMD, undefined);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    const unregisterArrowDown = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      () => {
        editor.dispatchCommand(MOVE_DOWN_CMD, undefined);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterPickup();
      unregisterMoveUp();
      unregisterMoveDown();
      unregisterKeyDown();
      unregisterArrowUp();
      unregisterArrowDown();
    };
  }, [editor, moveNode]);

  return null;
};
export default KeyboardMovePlugin;
