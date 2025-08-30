# Tips

Add to workspace root's `package.json`:

```json
{
  "scripts": {
    "lint": "pnpm -r exec eslint .",
    "typecheck": "pnpm -r exec tsc -v >/dev/null && pnpm -r exec tsc -p tsconfig.json --noEmit",
    "build": "pnpm -r --filter './packages/**' run build"
  }
}
```

## Installation

Install at root:

```bash
pnpm add -D tailwindcss autoprefixer postcss
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-config-prettier eslint-plugin-import eslint-plugin-testing-library eslint-plugin-jest-dom
```

### Results

- One-line extends for TS across apps/packages.
- Preset Tailwind so all apps share tokens + radius + dark mode variables.
- Unified ESLint (base + Next flavor + test flavor) that won’t drift.
- One shared Prettier config (with Tailwind class sorting).
- One ignore list for the whole monorepo.

## `tsup` configs (packages)

```ts
// packages/ui/tsup.config.ts
import { createTsupConfig } from "@build-setup/tsup";

export default createTsupConfig({
  // UI is React/JSX; keep JSX for consumers or switch to "transform" if you prefer compiled JSX.
  jsx: "preserve",
  // If you export multiple entry points, list them here:
  // entry: ["src/index.ts", "src/button.tsx", "src/card.tsx"],
});

// packages/theme/tsup.config.ts
import { createTsupConfig } from "@builds/tsup";

export default createTsupConfig({
  // Pure TS helpers/tokens; tree-shaking friendly
  splitting: false,
  // If CSS shipped alongside TS, add to entry (tsup will copy via loader if needed)
  // entry: ["src/index.ts", "src/styles.css"],
});
```

Suggested package.json scripts (each library)

```json
{
  "scripts": {
    "build": "tsup",
    "clean": "rimraf dist",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

Quick install reminder (root)

```bash
pnpm add -D jest ts-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy
pnpm add -D tsup typescript
```
