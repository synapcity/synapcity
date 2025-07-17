"use client"

import React, { useState, useEffect } from "react";
import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useMetadata } from "@/providers";
import { LanguagePlugin, MultipleEditorStorePlugin } from "../../plugins";

export const BasicEditor: React.FC<{ id: string }> = ({ id }) => {
  const [config, setConfig] = useState<InitialConfigType | null>(null);
  const { language } = useMetadata();

  useEffect(() => {
    setConfig({
      namespace: id,
      theme: {},
      onError: console.error,
    });
  }, [id]);

  if (!config) return <div>Loading editor…</div>;

  return (
    <LexicalComposer initialConfig={config}>
      <RichTextPlugin
        contentEditable={
          <div className="block size-full">
            <ContentEditable className="editor size-full" />
          </div>

        }
        placeholder={<div className="opacity-50">Enter text…</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MultipleEditorStorePlugin id={id} />
      <LanguagePlugin language={language} />
    </LexicalComposer>
  );
};
