const nodeMap = {
  HeadingNode: () => import("@lexical/rich-text").then((mod) => mod.HeadingNode),
  AutoLinkNode: () => import("@lexical/link").then((mod) => mod.AutoLinkNode),
  CodeNode: () => import("@lexical/code").then((mod) => mod.CodeNode),
  HashtagNode: () => import("@lexical/hashtag").then((mod) => mod.HashtagNode),
  LinkNode: () => import("@lexical/link").then((mod) => mod.LinkNode),
  ListNode: () => import("@lexical/list").then((mod) => mod.ListNode),
  ListItemNode: () => import("@lexical/list").then((mod) => mod.ListItemNode),
  HorizontalRuleNode: () =>
    import("@lexical/react/LexicalHorizontalRuleNode").then((mod) => mod.HorizontalRuleNode),
  QuoteNode: () => import("@lexical/rich-text").then((mod) => mod.QuoteNode),
  TableNode: () => import("@lexical/table").then((mod) => mod.TableNode),
  TableRowNode: () => import("@lexical/table").then((mod) => mod.TableRowNode),
  TableCellNode: () => import("@lexical/table").then((mod) => mod.TableCellNode),
  DailyPlanNode: () => import("./DailyPlanNode").then((mod) => mod.PlanNode),
  // CodeBlockNode: () =>
  // 	import("@/components/organisms/forms/fields/CodeBlock/CodeBlockNode").then(
  // 		(mod) => mod.CodeBlockNode
  // 	),
};

export default nodeMap;
