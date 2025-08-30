# `prettier` setup

Add to every package's `package.json`:

```json
{
  "prettier": "@builds/prettier",
  "prettierIgnorePath": "packages/builds/prettier/ignore"
}
```

If the relative path is awkward inside an app, you can also copy the ignore file next to the app and set `"prettierIgnorePath": "./.prettierignore"` (rename it to `.prettierignore`).

## Root

### Scripts

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Add deps:

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

From root, run:

```bash
pnpm format:check
pnpm format
```
