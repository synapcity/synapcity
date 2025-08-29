"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useEditorKeys } from "./useEditorKeys";
import { useOnDragEnter } from "./useOnDragEnter";
import { COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND } from "lexical";
import { DRAGGABLE_KEY, isInstanceOfHTMLElement } from "@/lexical/constants";
import { draggableStore } from "../store/useDraggableStore";

const setDraggableElement = ({ target }: MouseEvent) => {
  if (!isInstanceOfHTMLElement(target)) return;
  const coordinates = target.getBoundingClientRect();
  const container = document.getElementById("lexical-draggable-wrapper-id");
  const containerCoords = container?.getBoundingClientRect();

  draggableStore.getState().setDraggable({
    htmlElement: target,
    data: {
      top: coordinates.top - (containerCoords?.top ?? 0),
      left: coordinates.left - (containerCoords?.left ?? 0),
      height: coordinates.height,
      width: coordinates.width,
      right: coordinates.right,
    },
  });
};

export const useDragListeners = () => {
  const [editor] = useLexicalComposerContext();
  const { keys } = useEditorKeys();
  const { handleOnDragEnter } = useOnDragEnter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      keys.forEach((key) => {
        const el = editor.getElementByKey(key);
        if (!el) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[useDragListeners] No HTML element for key: ${key}`);
          }
          return;
        }

        el.classList.add("draggable-block");
        el.setAttribute(DRAGGABLE_KEY, key);
        el.addEventListener("mouseenter", setDraggableElement);
        el.addEventListener("dragenter", handleOnDragEnter);
      });
    }, 25);

    return () => {
      clearTimeout(timeout);
      keys.forEach((key) => {
        const el = editor.getElementByKey(key);
        if (el) {
          el.removeEventListener("mouseenter", setDraggableElement);
          el.removeEventListener("dragenter", handleOnDragEnter);
        }
      });
    };
  }, [editor, keys, handleOnDragEnter]);

  useEffect(() => {
    return editor.registerCommand(
      DRAGOVER_COMMAND,
      (event) => handleOnDragEnter(event),
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleOnDragEnter]);
};
