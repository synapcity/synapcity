export const pluginMap = {
  Markdown: () =>
    import("./BehaviorPlugins/Markdown").then((mod) => ({
      default: mod.MarkdownPlugin,
    })),
  Toolbar: () =>
    import("./UIPlugins/Toolbar/ToolbarPlugin").then((mod) => ({
      default: mod.default,
    })),
  KeyboardMove: () =>
    import("@/lexical/plugins/BehaviorPlugins/KeyboardMove/KeyboardMove").then((mod) => ({
      default: mod.KeyboardMovePlugin,
    })),
  Hashtag: () =>
    import("@lexical/react/LexicalHashtagPlugin").then((mod) => ({
      default: mod.HashtagPlugin,
    })),
  HorizontalRule: () =>
    import("@lexical/react/LexicalHorizontalRulePlugin").then((mod) => ({
      default: mod.HorizontalRulePlugin,
    })),
  TabIndentation: () =>
    import("@lexical/react/LexicalTabIndentationPlugin").then((mod) => ({
      default: mod.TabIndentationPlugin,
    })),
  List: () =>
    import("@/lexical/plugins/UIPlugins/ListPlugin/ListPlugin").then((mod) => ({
      default: mod.default,
    })),
} as const;

export type PluginMap = typeof pluginMap;
