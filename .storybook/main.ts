import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  viteFinal: async (cfg) => {
    cfg.plugins = [tsconfigPaths({ loose: true }), ...(cfg.plugins ?? [])];
    cfg.resolve ??= {};
    const alias =
      typeof cfg.resolve.alias === "object" && !Array.isArray(cfg.resolve.alias)
        ? cfg.resolve.alias
        : {};
    cfg.resolve.alias = {
      ...alias,
      "@": path.resolve(process.cwd(), "src"),
      "@/lib/data/sidebar/defaultNotePanels": path.resolve(__dirname, "mocks/sidebarPanels.ts"),
      "@/lib/data/sidebar/defaultDashboardPanels": path.resolve(
        __dirname,
        "mocks/sidebarPanels.ts"
      ),
      "@/lib/data/sidebar": path.resolve(__dirname, "mocks/sidebarPanels.ts"),
    };
    return cfg;
  },
};

export default config;
