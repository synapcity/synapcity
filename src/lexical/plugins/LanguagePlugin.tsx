"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function LanguagePlugin({ language }: { language: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const root = editor.getRootElement();
    if (root) {
      root.setAttribute("lang", language);
      root.setAttribute(
        "dir",
        ["ar", "he", "fa", "ur"].includes(language) ? "rtl" : "ltr"
      );
    }
  }, [language, editor]);
  return null;
}
