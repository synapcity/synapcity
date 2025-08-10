import styles from "./EditorTheme.module.css";

export const theme = {
  paragraph: "text-base",
  heading: {
    h1: "text-3xl font-bold mb-4",
    h2: "text-2xl font-semibold mb-3",
    h3: "text-xl font-medium mb-2",
  },
  list: {
    ul: styles.ul,
    listitem: styles.listItem,
    nested: {
      listitem: styles.nestedListItem,
    },
    ulDepth: [styles.ul1, styles.ul2, styles.ul3, styles.ul4, styles.ul5],
    olDepth: [styles.ol1, styles.ol2, styles.ol3, styles.ol4, styles.ol5],
  },
  link: "text-blue-500 underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    code: "font-mono px-1 rounded",
  },
  code: "bg-gray-100 p-2 rounded",
  quote: "border-l-4 border-gray-300 pl-4 italic",
  highlight: "bg-yellow-200 dark:bg-yellow-600/40 rounded px-1",
};
