# `tsconfig` build setup

```json
// apps/web/tsconfig.json
{ "extends": "@builds/tsconfig/next", "compilerOptions": { "baseUrl": ".", "paths": { "@/_": ["src/_"] } }, "include": ["next-env.d.ts", "src", "next.config.*"] }

// apps/blog/tsconfig.json
{ "extends": "@builds/tsconfig/next", "compilerOptions": { "baseUrl": ".", "paths": { "@/_": ["src/_"] } }, "include": ["next-env.d.ts", "src", "contentlayer.config.*"] }

// packages/ui/tsconfig.json
{ "extends": "@builds/tsconfig/lib", "compilerOptions": { "baseUrl": ".", "paths": { "@synapcity/theme": ["../theme/src"] } }, "include": ["src"] }
```
