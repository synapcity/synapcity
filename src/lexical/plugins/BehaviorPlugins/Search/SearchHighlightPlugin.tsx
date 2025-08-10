/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   LexicalNode,
//   TextNode,
//   $getRoot,
//   $isTextNode,
//   $isElementNode,
//   $createTextNode,
// } from "lexical";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { useEffect, useState, useCallback } from "react";
// import { createPortal } from "react-dom";
// import { useSearchMatchStore } from "./searchMatchStore";

// function HighlightMatch({
//   rect,
//   isActive,
//   scrollContainerRef,
// }: {
//   rect: DOMRect;
//   isActive: boolean;
//   scrollContainerRef: React.RefObject<HTMLDivElement>;
// }) {
//   const container = scrollContainerRef.current;
//   const containerRect = container?.getBoundingClientRect();

//   const top = container ? rect.top - containerRect.top : rect.top;
//   const left = container ? rect.left - containerRect.left : rect.left;

//   return container
//     ? createPortal(
//       <div
//         className={`absolute pointer-events-none rounded-sm border border-yellow-500 bg-yellow-300/40 ${isActive ? "ring-2 ring-yellow-600" : ""}`}
//         style={{
//           top,
//           left,
//           width: rect.width,
//           height: rect.height,
//         }}
//       />,
//       container
//     )
//     : null;
// }

// // 🔁 Simple debounce helper
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function debounce<T extends (...args: any[]) => void>(fn: T, delay = 150): T {
//   let timer: ReturnType<typeof setTimeout>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return function (...args: any[]) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   } as T;
// }

// export function SearchHighlightPlugin({
//   query,
//   scrollContainerRef,
// }: {
//   query: string;
//   scrollContainerRef: React.RefObject<HTMLDivElement>;
// }) {
//   const [editor] = useLexicalComposerContext();
//   const [matchRects, setMatchRects] = useState<DOMRect[]>([]);
//   const { setMatches, matches, activeIndex, nextMatch, prevMatch } = useSearchMatchStore();

//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       const rootEl = editor.getRootElement();
//       const isEditorFocused = document.activeElement === rootEl;

//       if (!isEditorFocused) return;

//       if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         nextMatch();
//       } else if (e.key === "Enter" && e.shiftKey) {
//         e.preventDefault();
//         prevMatch();
//       } else if (e.key === "Tab") {
//         e.preventDefault();
//         if (e.shiftKey) {
//           prevMatch()
//         } else {
//           nextMatch()
//         }
//       }
//     };

//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [editor, nextMatch, prevMatch]);

//   // 🔹 Scroll to the active match
//   useEffect(() => {
//     if (!matches.length || activeIndex < 0 || activeIndex >= matches.length) return;

//     const match = matches[activeIndex];
//     requestAnimationFrame(() => {
//       const dom = editor.getElementByKey(match.nodeKey);
//       const textNode = dom?.firstChild;

//       if (textNode && textNode.nodeType === Node.TEXT_NODE && scrollContainerRef.current) {
//         try {
//           const range = document.createRange();
//           range.setStart(textNode, match.start);
//           range.setEnd(textNode, match.end);
//           const rect = range.getBoundingClientRect();

//           const container = scrollContainerRef.current;
//           const containerRect = container.getBoundingClientRect();
//           const scrollTop = container.scrollTop;
//           const offsetTop = rect.top - containerRect.top + scrollTop;

//           container.scrollTo({
//             top: offsetTop - container.clientHeight / 2,
//             behavior: "smooth",
//           });
//         } catch (err) {
//           console.warn("Scroll to match failed:", err);
//         }
//       }
//     });
//   }, [editor, matches, activeIndex, scrollContainerRef]);

//   const refreshRects = useCallback(() => {
//     const newRects: DOMRect[] = [];

//     for (const match of matches) {
//       const dom = editor.getElementByKey(match.nodeKey);
//       const textNode = dom?.firstChild;
//       if (textNode && textNode.nodeType === Node.TEXT_NODE) {
//         try {
//           const range = document.createRange();
//           range.setStart(textNode, match.start);
//           range.setEnd(textNode, match.end);
//           const rect = range.getBoundingClientRect();
//           if (rect.width && rect.height) newRects.push(rect);
//         } catch (e) {
//           console.warn("Refresh range error:", e);
//         }
//       }
//     }

//     setMatchRects(newRects);
//   }, [matches, editor]);

//   useEffect(() => {
//     if (!matches.length) return;

//     window.addEventListener("scroll", refreshRects, true);
//     window.addEventListener("resize", refreshRects);
//     return () => {
//       window.removeEventListener("scroll", refreshRects, true);
//       window.removeEventListener("resize", refreshRects);
//     };
//   }, [matches, refreshRects]);

//   const processQuery = useCallback(
//     debounce((query: string) => {
//       editor.update(() => {
//         const root = $getRoot();
//         const textNodes: TextNode[] = [];

//         const collectTextNodes = (node: LexicalNode) => {
//           if ($isTextNode(node)) {
//             textNodes.push(node);
//           } else if ($isElementNode(node)) {
//             node.getChildren().forEach(collectTextNodes);
//           }
//         };

//         collectTextNodes(root);
//         textNodes.forEach((node) => node.setStyle(""));

//         const matchData: { nodeKey: string; start: number; end: number }[] = [];
//         const overlayRects: DOMRect[] = [];

//         for (const node of textNodes) {
//           const content = node.getTextContent();
//           const lowerContent = content.toLowerCase();
//           let index = lowerContent.indexOf(query.toLowerCase());

//           while (index !== -1) {
//             const start = index;
//             const end = start + query.length;
//             const nodeKey = node.getKey();
//             matchData.push({ nodeKey, start, end });

//             const dom = editor.getElementByKey(nodeKey);
//             const textNode = dom?.firstChild;
//             if (textNode && textNode.nodeType === Node.TEXT_NODE) {
//               try {
//                 const range = document.createRange();
//                 range.setStart(textNode, start);
//                 range.setEnd(textNode, end);
//                 const rect = range.getBoundingClientRect();
//                 if (rect.width && rect.height) overlayRects.push(rect);
//               } catch (e) {
//                 console.warn("Range error:", e);
//               }
//             }

//             const before = $createTextNode(content.slice(0, start));
//             const highlight = $createTextNode(content.slice(start, end));
//             const after = $createTextNode(content.slice(end));
//             highlight.setStyle("background-color: yellow; border-radius: 2px");

//             const parent = node.getParent();
//             if (!parent) break;

//             node.replace(before);
//             before.insertAfter(highlight);
//             highlight.insertAfter(after);

//             index = lowerContent.indexOf(query.toLowerCase(), index + 1);
//           }
//         }

//         setMatches(matchData);
//         setMatchRects(overlayRects);
//       });
//     }, 150),
//     [editor]
//   );

//   useEffect(() => {
//     if (!query || query.trim() === "") {
//       setMatchRects([]);
//       setMatches([]);
//       return;
//     }
//     processQuery(query);
//   }, [query, processQuery, setMatches]);

//   // 🔄 Recalculate matchRects AFTER DOM settles
//   useEffect(() => {
//     if (!matches.length) return;

//     const timeout = setTimeout(() => {
//       refreshRects();
//     }, 50); // give time for DOM to fully render highlights

//     return () => clearTimeout(timeout);
//   }, [matches, activeIndex, refreshRects]);

//   return (
//     <>
//       {matchRects.map((rect, i) => (
//         <HighlightMatch
//           key={i}
//           rect={rect}
//           isActive={i === activeIndex}
//           scrollContainerRef={scrollContainerRef}
//         />
//       ))}

//       <div className="fixed bottom-4 right-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded text-sm shadow z-50">
//         {matches.length > 0 ? `${activeIndex + 1} of ${matches.length}` : "No matches"}
//       </div>
//     </>
//   );
// }
"use client";

import {
  LexicalNode,
  TextNode,
  $getRoot,
  $isTextNode,
  $isElementNode,
  $createTextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSearchMatchStore } from "./searchMatchStore";
import { cn } from "@/utils";

function HighlightMatch({
  rect,
  isActive,
  scrollContainerRef,
}: {
  rect: DOMRect;
  isActive: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const container = scrollContainerRef.current;
  const containerRect = container?.getBoundingClientRect();

  const top = container ? rect.top - containerRect.top : rect.top;
  const left = container ? rect.left - containerRect.left : rect.left;

  return container
    ? createPortal(
        <div
          className={cn(
            `absolute pointer-events-none rounded-sm border border-yellow-500 bg-yellow-300/40 ${
              isActive ? "ring-2 ring-yellow-600" : ""
            }`,
            {
              "bg-accent-300 text-accent-900 border-accent-600": isActive,
            }
          )}
          style={{
            top,
            left,
            width: rect.width,
            height: rect.height,
          }}
        />,
        container
      )
    : null;
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 150): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

export function SearchHighlightPlugin({
  query,
  scrollContainerRef,
}: {
  query: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [editor] = useLexicalComposerContext();
  const [matchRects, setMatchRects] = useState<DOMRect[]>([]);
  const { setMatches, matches, activeIndex, nextMatch, prevMatch } = useSearchMatchStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const rootEl = editor.getRootElement();
      const isEditorFocused = document.activeElement === rootEl;

      if (!isEditorFocused) return;

      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        nextMatch();
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        prevMatch();
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          prevMatch();
        } else {
          nextMatch();
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [editor, nextMatch, prevMatch]);

  useEffect(() => {
    if (!matches.length || activeIndex < 0 || activeIndex >= matches.length) return;

    const match = matches[activeIndex];
    requestAnimationFrame(() => {
      const dom = editor.getElementByKey(match.nodeKey);
      const textNode = dom?.firstChild;

      if (textNode && textNode.nodeType === Node.TEXT_NODE && scrollContainerRef.current) {
        try {
          const range = document.createRange();
          range.setStart(textNode, match.start);
          range.setEnd(textNode, match.end);
          const rect = range.getBoundingClientRect();

          const container = scrollContainerRef.current;
          const containerRect = container.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          const offsetTop = rect.top - containerRect.top + scrollTop;

          container.scrollTo({
            top: offsetTop - container.clientHeight / 2,
            behavior: "smooth",
          });
        } catch (err) {
          console.warn("Scroll to match failed:", err);
        }
      }
    });
  }, [editor, matches, activeIndex, scrollContainerRef]);

  // 🔄 Refresh rects when matches change or content updates
  const refreshRects = useCallback(() => {
    const newRects: DOMRect[] = [];

    for (const match of matches) {
      const dom = editor.getElementByKey(match.nodeKey);
      const textNode = dom?.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        try {
          const range = document.createRange();
          range.setStart(textNode, match.start);
          range.setEnd(textNode, match.end);
          const rect = range.getBoundingClientRect();
          if (rect.width && rect.height) newRects.push(rect);
        } catch (e) {
          console.warn("Refresh range error:", e);
        }
      }
    }

    setMatchRects(newRects);
  }, [matches, editor]);

  useEffect(() => {
    if (!matches.length) return;
    const timeout = setTimeout(() => {
      refreshRects();
    }, 50);
    return () => clearTimeout(timeout);
  }, [matches, activeIndex, refreshRects]);

  useEffect(() => {
    window.addEventListener("scroll", refreshRects, true);
    window.addEventListener("resize", refreshRects);
    return () => {
      window.removeEventListener("scroll", refreshRects, true);
      window.removeEventListener("resize", refreshRects);
    };
  }, [refreshRects]);

  // // 🔍 Search + highlight logic
  // const processQuery = useCallback(
  //   debounce((query: string) => {
  //     editor.update(() => {
  //       const root = $getRoot();
  //       const textNodes: TextNode[] = [];

  //       const collectTextNodes = (node: LexicalNode) => {
  //         if ($isTextNode(node)) {
  //           textNodes.push(node);
  //         } else if ($isElementNode(node)) {
  //           node.getChildren().forEach(collectTextNodes);
  //         }
  //       };

  //       collectTextNodes(root);
  //       textNodes.forEach((node) => node.setStyle(""));

  //       const matchData: { nodeKey: string; start: number; end: number }[] = [];

  //       for (const node of textNodes) {
  //         const content = node.getTextContent();
  //         const lowerContent = content.toLowerCase();
  //         let index = lowerContent.indexOf(query.toLowerCase());

  //         while (index !== -1) {
  //           const start = index;
  //           const end = start + query.length;
  //           const nodeKey = node.getKey();
  //           matchData.push({ nodeKey, start, end });

  //           // Highlight
  //           const before = $createTextNode(content.slice(0, start));
  //           const highlight = $createTextNode(content.slice(start, end));
  //           const after = $createTextNode(content.slice(end));
  //           highlight.setStyle("background-color: yellow; border-radius: 2px");

  //           const parent = node.getParent();
  //           if (!parent) break;

  //           node.replace(before);
  //           before.insertAfter(highlight);
  //           highlight.insertAfter(after);

  //           index = lowerContent.indexOf(query.toLowerCase(), index + 1);
  //         }
  //       }

  //       setMatches(matchData);
  //     });
  //   }, 150),
  //   [editor]
  // );

  // const processQuery = useCallback(
  //   debounce((query: string) => {
  //     if (!query) {
  //       editor.update(() => {
  //         const root = $getRoot();
  //         const cleanHighlights = (node: LexicalNode) => {
  //           if ($isTextNode(node)) {
  //             node.setStyle("");
  //           } else if ($isElementNode(node)) {
  //             node.getChildren().forEach(cleanHighlights);
  //           }
  //         };
  //         cleanHighlights(root);
  //         setMatches([]);
  //       });
  //       return;
  //     }

  //     editor.update(() => {
  //       const root = $getRoot();
  //       const textNodes: TextNode[] = [];

  //       const collectTextNodes = (node: LexicalNode) => {
  //         if ($isTextNode(node)) {
  //           textNodes.push(node);
  //         } else if ($isElementNode(node)) {
  //           node.getChildren().forEach(collectTextNodes);
  //         }
  //       };

  //       collectTextNodes(root);

  //       // Clean all previous highlights
  //       for (const node of textNodes) {
  //         node.setStyle("");
  //       }

  //       const matchData: { nodeKey: string; start: number; end: number }[] = [];

  //       for (const node of [...textNodes]) {
  //         const text = node.getTextContent();
  //         const lowerText = text.toLowerCase();
  //         const queryLower = query.toLowerCase();

  //         let currentIndex = 0;
  //         let matchIndex: number;

  //         while ((matchIndex = lowerText.indexOf(queryLower, currentIndex)) !== -1) {
  //           const start = matchIndex;
  //           const end = start + query.length;

  //           const beforeText = text.slice(0, start);
  //           const matchText = text.slice(start, end);
  //           const afterText = text.slice(end);

  //           const beforeNode = $createTextNode(beforeText);
  //           const matchNode = $createTextNode(matchText);
  //           const afterNode = $createTextNode(afterText);

  //           matchNode.setStyle("background-color: yellow; border-radius: 2px");

  //           const parent = node.getParent();
  //           if (!parent) break;

  //           node.replace(beforeNode);
  //           beforeNode.insertAfter(matchNode);
  //           matchNode.insertAfter(afterNode);

  //           matchData.push({
  //             nodeKey: matchNode.getKey(),
  //             start: 0,
  //             end: matchText.length,
  //           });

  //           break; // Only process first match per original node to avoid reprocessing split nodes
  //         }
  //       }

  //       setMatches(matchData);
  //     });
  //   }, 150),
  //   [editor]
  // );

  // useEffect(() => {
  //   if (!query || query.trim() === "") {
  //     setMatchRects([]);
  //     setMatches([]);
  //     return;
  //   }
  //   processQuery(query);
  // }, [query, processQuery, setMatches]);
  useEffect(() => {
    if (!query || query.trim() === "") {
      setMatchRects([]);
      setMatches([]);
      return;
    }

    const handler = debounce(() => {
      editor.update(() => {
        const root = $getRoot();
        const textNodes: TextNode[] = [];

        const collectTextNodes = (node: LexicalNode) => {
          if ($isTextNode(node)) {
            textNodes.push(node);
          } else if ($isElementNode(node)) {
            node.getChildren().forEach(collectTextNodes);
          }
        };

        collectTextNodes(root);
        textNodes.forEach((node) => node.setStyle(""));

        const matchData: { nodeKey: string; start: number; end: number }[] = [];

        for (const node of textNodes) {
          const content = node.getTextContent();
          const lowerContent = content.toLowerCase();
          let index = lowerContent.indexOf(query.toLowerCase());

          while (index !== -1) {
            const start = index;
            const end = start + query.length;
            const nodeKey = node.getKey();
            matchData.push({ nodeKey, start, end });

            const before = $createTextNode(content.slice(0, start));
            const highlight = $createTextNode(content.slice(start, end));
            const after = $createTextNode(content.slice(end));
            highlight.setStyle("background-color: yellow; border-radius: 2px");

            const parent = node.getParent();
            if (!parent) break;

            node.replace(before);
            before.insertAfter(highlight);
            highlight.insertAfter(after);

            index = lowerContent.indexOf(query.toLowerCase(), index + 1);
          }
        }

        setMatches(matchData);
      });
    }, 150);

    handler();

    return () => clearTimeout((handler as any).timer); // cleanup if needed
  }, [query, editor, setMatches]);

  return (
    <>
      {matchRects.map((rect, i) => (
        <HighlightMatch
          key={i}
          rect={rect}
          isActive={i === activeIndex}
          scrollContainerRef={scrollContainerRef}
        />
      ))}

      <div className="fixed bottom-4 right-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded text-sm shadow z-50">
        {matches.length > 0 ? `${activeIndex + 1} of ${matches.length}` : "No matches"}
      </div>
    </>
  );
}
