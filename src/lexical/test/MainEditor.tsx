"use client";

import React from "react";
import { useUnifiedEditor } from "./RichEditor";

export const MainEditor: React.FC<{ storageKey: string }> = ({ storageKey }) => {
  const { Editor } = useUnifiedEditor(storageKey, "rich");
  return <Editor />;
};
