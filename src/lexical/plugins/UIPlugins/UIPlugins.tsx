"use client";

import dynamic from "next/dynamic";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { loadPluginByName } from "../pluginLoader";
import { useEffect, useRef, useState } from "react";

const ToolbarPlugin = loadPluginByName("Toolbar", false);
const HorizontalRule = loadPluginByName("HorizontalRule");
const TabIndentation = loadPluginByName("TabIndentation");
const ListPlugin = loadPluginByName("List", true);

const RichTextPlugin = dynamic(
  () => import("@lexical/react/LexicalRichTextPlugin").then((mod) => mod.RichTextPlugin),
  { ssr: false }
);

const LexicalErrorBoundary = dynamic(
  () => import("@lexical/react/LexicalErrorBoundary").then((mod) => mod.LexicalErrorBoundary),
  { ssr: false }
);

const DraggableWrapper = dynamic(
  () =>
    import("../BehaviorPlugins/Draggable/components/DraggableWrapper").then(
      (mod) => mod.DraggableWrapper
    ),
  { ssr: false }
);

const EditorPlaceholder = dynamic(() => import("./UIPlaceholder"), { ssr: false });

const Editable = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <DraggableWrapper>
      <div
        id="lexical-scroll-container"
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto min-h-0 flex flex-col"
      >
        <div className="relative flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="p-4 flex-1">
            <ContentEditable
              aria-placeholder="Loading Content..."
              placeholder={() => null}
              className="min-h-[150px] p-4 overflow-y-auto rounded-md outline-none flex-1"
              style={{ height: "900px", background: "rgba(0,0,0,0.03)" }}
            />
          </div>
        </div>
      </div>
    </DraggableWrapper>
  );
};

export default function CoreUIPlugins() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<Editable />}
        placeholder={<EditorPlaceholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HorizontalRule />
      <TabIndentation />
      <ListPlugin />
    </>
  );
}
