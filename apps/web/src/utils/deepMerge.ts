/* eslint-disable @typescript-eslint/no-explicit-any */

export function deepMerge<T>(base: T, partial?: Partial<T>): T {
  if (!partial) return { ...base };
  const result: any = Array.isArray(base) ? [...(base as any)] : { ...base };
  for (const key in partial) {
    const v = (partial as any)[key];
    if (v !== undefined) {
      if (
        typeof v === "object" &&
        v !== null &&
        !Array.isArray(v) &&
        typeof (base as any)[key] === "object" &&
        (base as any)[key] !== null
      ) {
        result[key] = deepMerge((base as any)[key], v);
      } else {
        result[key] = v;
      }
    }
  }
  return result;
}
