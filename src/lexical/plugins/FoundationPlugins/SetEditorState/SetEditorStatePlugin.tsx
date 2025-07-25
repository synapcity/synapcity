// // "use client";

// // import { useEffect, useRef } from "react";
// // import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// // import { $getRoot, $createParagraphNode } from "lexical";

// // export function SetEditorStatePlugin({ content }: { content: string }) {
// //   const [editor] = useLexicalComposerContext();
// //   const didInit = useRef(false);

// //   useEffect(() => {
// //     if (!editor || didInit.current) return;
// //     didInit.current = true;

// //     try {
// //       if (!content || content.trim().length === 0) throw new Error("Empty content");

// //       const parsed = JSON.parse(content);
// //       const parsedState = editor.parseEditorState(parsed);
// //       queueMicrotask(() => {
// //         editor.setEditorState(parsedState);
// //       });
// //     } catch (err) {
// //       if (process.env.NODE_ENV === "development") {
// //         console.warn("[SetEditorStatePlugin] Fallback due to error:", err);
// //       }

// //       editor.update(() => {
// //         const root = $getRoot();
// //         if (root.getChildrenSize() === 0) {
// //           root.append($createParagraphNode());
// //         }
// //       });
// //       console.log("[SetEditorStatePlugin] Error parsing content:", err);
// //     }
// //   }, [editor, content]);

// //   return null;
// // }


// "use client";

// import { useEffect, useRef } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { $getRoot, $createParagraphNode } from "lexical";

// export function SetEditorStatePlugin({ content }: { content: string }) {
//   const [editor] = useLexicalComposerContext();
//   const didInit = useRef(false);

//   // useEffect(() => {
//   //   if (!editor || didInit.current) return;

//   //   didInit.current = true;

//   //   try {
//   //     const parsed = JSON.parse(content);
//   //     const parsedState = editor.parseEditorState(parsed);
//   //     editor.setEditorState(parsedState);
//   //   } catch (err) {
//   //     console.error("[SetEditorStatePlugin] Error parsing content:", err);

//   //     editor.update(() => {
//   //       const root = $getRoot();
//   //       root.clear();
//   //       root.append($createParagraphNode());
//   //     });
//   //   }
//   // }, [editor, content]); // intentionally removed content from dependency to avoid resets

//   return null;
// }



"use client";

import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";

export function SetEditorStatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current || !editor) return;

    didInit.current = true;

    editor.update(() => {
      try {
        const parsed = JSON.parse(content);
        const parsedState = editor.parseEditorState(parsed);
        editor.setEditorState(parsedState);
      } catch (err) {
        console.error("[SetEditorStatePlugin] Error parsing content:", err);
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode());
      }
    });
  }, [editor, content]); // 🚩 DO NOT ADD CONTENT HERE OR IT WILL RESET CONSTANTLY

  return null;
}
