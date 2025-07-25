// "use client";

// import { RefObject, useEffect, useMemo, useRef, useState } from "react";
// import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import dynamic from "next/dynamic";
// import { useNoteById } from "@/hooks";
// import { useNoteViewStore } from "@/stores";
// import { useActiveNoteView } from "@/hooks/notes/useActiveNoteView/useActiveNoteView";

// const SetEditorStatePlugin = dynamic(
//   () => import("@/lexical/plugins/SetStatePlugin").then((mod) => mod.SetEditorStatePlugin),
//   { ssr: false }
// );

// const fallbackEditorState = JSON.stringify({
//   root: { children: [], direction: "ltr", format: "", indent: 0, type: "root", version: 1 },
//   type: "editor",
//   version: 1,
// });

// export function TabbedEditor({ id, viewId, content }: { id: string; viewId: string; content?: string }) {
//   const [config, setConfig] = useState<InitialConfigType | null>(null);
//   const note = useNoteById(id)
//   const getViewsFor = useNoteViewStore(s => s.getViewFor)
//   const views = getViewsFor(id)
//   const { activeView } = useActiveNoteView()

//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!id || !viewId || !note || !activeView) return;
//     (async () => {
//       const nodes = await loadAllNodes();
//       setConfig({
//         namespace: `${note?.id}:${activeView?.id}`,
//         theme,
//         onError: (err) => console.error("Lexical error", err),
//         nodes,
//         editorState: null,
//       });
//     })();
//   }, [activeView, id, note, viewId]);

//   const resolvedContent = content || activeView?.content || fallbackEditorState;

//   try {
//     const parsed = JSON.parse(resolvedContent);
//     if (!parsed?.root || parsed.root.type !== "root") {
//       throw new Error("Invalid editor state");
//     }
//   } catch (e) {
//     console.error("Editor state parse error:", resolvedContent, e);
//     return <div className="p-4 text-red-600">Invalid editor state. Please reload the page.</div>;
//   }

//   if (!config) return null;

//   return (
//     <LexicalComposer key={viewId ?? id} initialConfig={config}>
//       <div className="flex flex-col size-full relativ flex-1e">
//         <div className="absolute top-4 right-4 px-6 pt-2 flex items-center gap-2 z-20">
//         </div>
//         <div
//           ref={scrollContainerRef}
//           className="flex-1 overflow-y-auto px-6 py-6 relative flex flex-col"
//         >
//           <RichTextPlugin
//             contentEditable={
//               <ContentEditable className="prose dark:prose-invert w-full max-w-5xl flex-1 outline-none mx-auto pb-96 leading-relaxed hover:cursor-text" />
//             }
//             ErrorBoundary={LexicalErrorBoundary}
//           />
//         </div>

//         <SetEditorStatePlugin content={resolvedContent} />
//         <TabAutosavePlugin
//           onSave={(editorJSON) => {
//             if (viewId) updateView(viewId, { content: JSON.stringify(editorJSON) });
//           }}
//         />
//       </div>
//     </LexicalComposer>
//   );
// }
