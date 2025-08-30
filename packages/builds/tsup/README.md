# `@builds/tsup`

Usage in a library:

```ts
// tsup.config.ts
import { createTsupConfig } from "@build-setup/tsup";
export default createTsupConfig();
```

**Using it in a package**:

```ts
// packages/ui/tsup.config.ts
import { createTsupConfig } from "@build-setup/tsup";
export default createTsupConfig({
  // Example overrides:
  // entry: ["src/index.ts", "src/button.tsx"],
  // minify: true,
});
```

## Examples

```ts
// packages/ui/tsup.config.ts
import { createTsupConfig } from "@build-setup/tsup";

export default createTsupConfig({
  // UI is React/JSX; keep JSX for consumers or switch to "transform" if you prefer compiled JSX.
  jsx: "preserve",
  // If you export multiple entry points, list them here:
  // entry: ["src/index.ts", "src/button.tsx", "src/card.tsx"],
});
```

```ts
// packages/theme/tsup.config.ts
import { createTsupConfig } from "@build-setup/tsup";

export default createTsupConfig({
  // Pure TS helpers/tokens; tree-shaking friendly
  splitting: false,
  // If you ship CSS alongside TS, add it to entry (tsup will copy via loader if needed)
  // entry: ["src/index.ts", "src/styles.css"],
});
```

## Installation (root)

```bash
pnpm add -D tsup typescript
```

## Scripts

```json
{
  "scripts": {
    "build:libs": "pnpm -r --filter './packages/**' run build",
    "test": "pnpm -r --filter '{apps/**,packages/**}' exec jest --passWithNoTests",
    "typecheck": "pnpm -r exec tsc -p tsconfig.json --noEmit"
  }
}
```

### Examples (scripts)

Add to every library's package manager:

```json
{
  "scripts": {
    "build": "tsup",
    "clean": "rimraf dist",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

#### Resources

- [Logrocket](https://blog.logrocket.com/tsup/)
