import { defineConfig, Options } from "tsup";
import fs from "node:fs";
import path from "node:path";

/**
 * Shared tsup preset for libraries. Picks entry from src/index.ts by default,
 * marks deps/peerDeps external, outputs ESM+CJS+d.ts with sourcemaps.
 */
export function createTsupConfig(override: Partial<Options> = {}) {
  const pkgJsonPath = path.join(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));

  const externals = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ];

  return defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false, // safer default for lib packages
    target: "es2022",
    external: externals,
    // Preserve JSX for libraries that let consumers handle transpilation if desired.
    // Set to "transform" if you want compiled JSX in output.
    jsxFactory: "preserve",
    ...override,
  });
}
