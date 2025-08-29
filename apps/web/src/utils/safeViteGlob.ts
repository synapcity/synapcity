export type GlobMap<T = unknown> = Record<string, () => Promise<T>>;

// Keep options minimal—add fields you use (e.g., eager: true)
type GlobOpts = { eager?: boolean; as?: string };

export function safeViteGlob<T = unknown>(pattern: string, opts?: GlobOpts): GlobMap<T> {
  try {
    const fn = new Function(
      "pattern",
      "opts",
      `
        try {
          return (typeof import.meta !== "undefined" &&
                  import.meta &&
                  import.meta.glob)
            ? import.meta.glob(pattern, opts)
            : {};
        } catch { return {}; }
      `
    );
    return fn(pattern, opts) as GlobMap<T>;
  } catch {
    return {};
  }
}
