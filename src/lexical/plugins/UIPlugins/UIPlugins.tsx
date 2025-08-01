"use client";

import { useState, useEffect } from "react";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { loadPluginByName } from "../pluginLoader";
import dynamic from "next/dynamic";

const Toolbar = loadPluginByName("Toolbar", false);
const HorizontalRule = loadPluginByName("HorizontalRule");
const TabIndentation = loadPluginByName("TabIndentation");
const ListPlugin = loadPluginByName("List", true);

const RichTextPlugin = dynamic(
  () =>
    import("@lexical/react/LexicalRichTextPlugin").then((mod) => ({
      default: mod.RichTextPlugin,
    })),
  { ssr: false }
);

const LexicalErrorBoundary = dynamic(
  () =>
    import("@lexical/react/LexicalErrorBoundary").then((mod) => ({
      default: mod.LexicalErrorBoundary,
    })),
  { ssr: false }
);

const DraggableWrapper = dynamic(
  () =>
    import("../BehaviorPlugins/Draggable/components/DraggableWrapper").then(
      (mod) => ({
        default: mod.DraggableWrapper,
      })
    ),
  { ssr: false }
);

const EditorPlaceholder = dynamic(
  () =>
    import("./UIPlaceholder").then((mod) => ({
      default: mod.default,
    })),
  { ssr: false }
);

function Editable() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [mounted])

  return mounted && (
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
}

export default function CoreUIPlugins() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
