"use client"

import React, { useState, useEffect } from "react";
import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useMetadata } from "@/providers";
import { LanguagePlugin, MultipleEditorStorePlugin, LanguageDetectionPlugin, DubeolsikComposerPlugin } from "../../plugins";

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
    <div className="flex-1 size-full">
      {/* <LanguageSwitcher /> */}
      <LexicalComposer initialConfig={config}>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MultipleEditorStorePlugin id={id} />
        <LanguageDetectionPlugin />
        {language === "ko" && <DubeolsikComposerPlugin />}
        <LanguagePlugin language={language} />
        <RichTextPlugin
          contentEditable={
            <div className="block size-full">
              <ContentEditable className="editor size-full" lang={language} spellCheck />
            </div>

          }
          placeholder={<div className="opacity-50">Enter text…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </div>
  );
};
