"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDragListeners } from "./hooks/useDragListeners";
import { useOnDrop } from "./hooks/useOnDrop";
import { DraggableElement } from "./components/DraggableElement/DraggableElement";
import { OnDragLine } from "./components/DraggableLine/DraggableLine";

const WRAPPER_ID = "lexical-draggable-wrapper-id";

const CustomDraggableBlockPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  useDragListeners();
  useOnDrop();

  useEffect(() => {
    setWrapper(document.getElementById(WRAPPER_ID));
  }, []);

  if (!editor.isEditable() || !wrapper) return null;

  return createPortal(
    <>
      <DraggableElement />
      <OnDragLine />
    </>,
    wrapper
  );
};

export default CustomDraggableBlockPlugin;
