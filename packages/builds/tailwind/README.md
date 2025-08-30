# `tailwind` setup

Use in an app's `tailwind.config.cjs`:

```js
const preset = require("@builds/tailwind/preset.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**Use in apps**:

```js
// apps/web/tailwind.config.cjs
const preset = require("@builds/tailwind/preset.cjs");
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};

// apps/blog/tailwind.config.cjs
const preset = require("@builds/tailwind/preset.cjs");
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx,mdx,md}"],
  theme: { extend: { typography: {} } },
  plugins: [require("@tailwindcss/typography")],
};
```

PostCSS for each app:

```mjs
// apps/web/postcss.config.cjs
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
```
