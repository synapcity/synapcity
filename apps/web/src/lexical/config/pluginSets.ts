/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lexical/pluginSets.ts
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// optionally import heavy bits dynamically later

/** Plugins every editor gets */
export const basePlugins: Array<() => Promise<{ default: any }>> = [
  // note, these could also be dynamic() imports if you want SSR control
  () => Promise.resolve({ default: HistoryPlugin }),
  () => Promise.resolve({ default: AutoFocusPlugin }),
];

/** Full rich‑text editing (lists, links, markdown, toolbar, etc.) */
export const richPlugins: Array<() => Promise<{ default: any }>> = [
  () =>
    import("@lexical/react/LexicalRichTextPlugin").then((m) => ({
      default: m.RichTextPlugin,
    })),
  () =>
    import("@lexical/react/LexicalLinkPlugin").then((m) => ({
      default: m.LinkPlugin,
    })),
  () =>
    import("@lexical/react/LexicalListPlugin").then((m) => ({
      default: m.ListPlugin,
    })),
  () =>
    import("../plugins/UIPlugins/Toolbar/ToolbarPlugin").then((m) => ({
      default: m.default,
    })),
  () =>
    import("../plugins/UIPlugins/SlashCommandMenu/SlashCommandMenuPlugin").then((m) => ({
      default: m.SlashCommandMenuPlugin,
    })),
];

/** Plain‑text mode: only minimal plugins */
export const plainPlugins: Array<() => Promise<{ default: any }>> = [];

/** Extra behaviors for widget‑embedded editors */
export const widgetPlugins: Array<() => Promise<{ default: any }>> = [
  () =>
    import("../plugins/BehaviorPlugins/Search/SearchHighlightPlugin").then((m) => ({
      default: m.SearchHighlightPlugin,
    })),
  () =>
    import("../plugins/BehaviorPlugins/Draggable/CustomDraggableBlockPlugin").then((m) => ({
      default: m.default,
    })),
  () =>
    import("../plugins/BehaviorPlugins/Markdown/MarkdownPlugin").then((m) => ({
      default: m.default,
    })),
  () =>
    import("../plugins/BehaviorPlugins/KeyboardMove/KeyboardMove").then((m) => ({
      default: m.KeyboardMovePlugin,
    })),
  () =>
    import("../plugins/UIPlugins/ListPlugin/ListPlugin").then((m) => ({
      default: m.default,
    })),
  () =>
    import("../plugins/UIPlugins/FloatingToolbar/FloatingToolbarPlugin").then((m) => ({
      default: m.FloatingToolbarPlugin,
    })),
];
