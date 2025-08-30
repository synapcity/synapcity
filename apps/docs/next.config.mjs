import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/src/pages/posts/*",
  mdxOptions: {
    format: "mdx",
  },
});

export default withNextra({
  output: "standalone",
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
  },
});
