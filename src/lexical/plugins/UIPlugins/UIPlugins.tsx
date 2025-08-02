"use client";

import dynamic from "next/dynamic";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { loadPluginByName } from "../pluginLoader";
import { useEffect, useState } from "react";

const Toolbar = loadPluginByName("Toolbar", false);
const HorizontalRule = loadPluginByName("HorizontalRule");
const TabIndentation = loadPluginByName("TabIndentation");
const ListPlugin = loadPluginByName("List", true);

const RichTextPlugin = dynamic(
  () => import("@lexical/react/LexicalRichTextPlugin").then(mod => mod.RichTextPlugin),
  { ssr: false }
);

const LexicalErrorBoundary = dynamic(
  () => import("@lexical/react/LexicalErrorBoundary").then(mod => mod.LexicalErrorBoundary),
  { ssr: false }
);

const DraggableWrapper = dynamic(
  () => import("../BehaviorPlugins/Draggable/components/DraggableWrapper").then(mod => mod.DraggableWrapper),
  { ssr: false }
);

const EditorPlaceholder = dynamic(
  () => import("./UIPlaceholder"),
  { ssr: false }
);

// Directly render ContentEditable without conditionals
const Editable = () => (
  <DraggableWrapper>
    <div className="relative size-full">
      <ContentEditable
        aria-placeholder="Loading Content..."
        placeholder={<EditorPlaceholder />}
        className="min-h-[150px] h-[85vh] w-full p-4 overflow-y-auto border border-gray-300 rounded-md outline-none"
      />
    </div>
  </DraggableWrapper>
);

export default function CoreUIPlugins() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Toolbar />
      <RichTextPlugin
        contentEditable={<Editable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HorizontalRule />
      <TabIndentation />
      <ListPlugin />
    </>
  );
}
