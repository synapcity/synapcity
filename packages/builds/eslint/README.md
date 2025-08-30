# `eslint` config

Use in apps/packages:

```mjs
// apps/web/eslint.config.mjs (flat config) — or .eslintrc.cjs
import next from "@builds/eslint/next.cjs";
export default next;
```

Classic:

```cjs
// apps/blog/.eslintrc.cjs
module.exports = { extends: ["@builds/eslint/next.cjs"] };

// packages/ui/.eslintrc.cjs
module.exports = { extends: ["@builds/eslint/index.cjs"] };
```

Dev deps to add at `package/root`:

```bash
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-config-prettier eslint-plugin-import \
  eslint-plugin-testing-library eslint-plugin-jest-dom
```
