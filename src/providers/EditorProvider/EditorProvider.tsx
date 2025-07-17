"use client"

import { EditorStore, useEditorStore } from "@/stores";
import { PropsWithChildren, useMemo } from "react";
import { EditorContext } from "./editor-context";

// Pick the selectors/actions we want to expose
type EditorContextType = Pick<
  EditorStore,
  |
  "editors"
  | "activeEditorId"
  | "clipboard"
  | "registerEditor"
  | "unregisterEditor"
  | "setActiveEditorId"
  | "copyToClipboard"
  | "pasteFromClipboard"
>;

export const EditorProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const editors = useEditorStore((s) => s.editors);
  const activeEditorId = useEditorStore((s) => s.activeEditorId);
  const clipboard = useEditorStore((s) => s.clipboard);
  const registerEditor = useEditorStore((s) => s.registerEditor);
  const unregisterEditor = useEditorStore((s) => s.unregisterEditor);
  const setActiveEditorId = useEditorStore((s) => s.setActiveEditorId);
  const copyToClipboard = useEditorStore((s) => s.copyToClipboard);
  const pasteFromClipboard = useEditorStore((s) => s.pasteFromClipboard);

  const value = useMemo(
    () => ({
      editors,
      activeEditorId,
      clipboard,
      registerEditor,
      unregisterEditor,
      setActiveEditorId,
      copyToClipboard,
      pasteFromClipboard,
    }),
    [
      editors,
      activeEditorId,
      clipboard,
      registerEditor,
      unregisterEditor,
      setActiveEditorId,
      copyToClipboard,
      pasteFromClipboard,
    ]
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};