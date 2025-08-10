/* eslint-disable @typescript-eslint/no-explicit-any */
export const commonNodes: Array<() => Promise<any>> = [
  () => import("@lexical/code").then((m) => m.CodeNode),
  () => import("@lexical/link").then((m) => m.AutoLinkNode),
  () => import("@lexical/list").then((m) => m.ListNode),
  () => import("@lexical/list").then((m) => m.ListItemNode),
  () => import("@lexical/hashtag").then((m) => m.HashtagNode),
  () => import("@lexical/mark").then((m) => m.MarkNode),
];

// export const persistentNodes: Array<() => Promise<any>> = [
// 	() =>
// 		import("../nodes/persistent-toolkit/MetadataNode").then(
// 			(m) => m.MetadataNode
// 		),
// 	() =>
// 		import("../nodes/persistent-toolkit/PersistentDecoratorNode").then(
// 			(m) => m.PersistentDecoratorNode
// 		),
// 	() =>
// 		import("../nodes/persistent-toolkit/PersistentHeadingNode").then(
// 			(m) => m.PersistentHeadingNode
// 		),
// 	() =>
// 		import("../nodes/persistent-toolkit/PersistentParagraphNode").then(
// 			(m) => m.PersistentParagraphNode
// 		),
// 	() =>
// 		import("../nodes/persistent-toolkit/SidebarTriggerNode").then(
// 			(m) => m.SidebarTriggerNode
// 		),
// ];

export const readonlyNodes: Array<() => Promise<any>> = [
  () => import("lexical/nodes/LexicalElementNode").then((m) => m.ElementNode),
  () => import("lexical/nodes/LexicalDecoratorNode").then((m) => m.DecoratorNode),
  () => import("lexical/nodes/LexicalParagraphNode").then((m) => m.ParagraphNode),
  () => import("lexical/nodes/LexicalTextNode").then((m) => m.TextNode),
  () => import("@lexical/rich-text").then((m) => m.HeadingNode),
];
