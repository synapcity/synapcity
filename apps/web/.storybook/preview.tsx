/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.css";
if (typeof window !== "undefined") {
  (window as any).metas ??= [
    { id: "Search", title: "Search" },
    { id: "Tags", title: "Tags" },
  ];
  (window as any).metas ??= [{ id: "Overview", title: "Overview" }];
}

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: {
      //       // 'todo' - show a11y violations in the test UI only
      //       // 'error' - fail CI on a11y violations
      //       // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};
export default preview;
