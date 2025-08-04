"use client"

import { useRef, useMemo } from "react";
import Fuse, { FuseResult, IFuseOptions } from "fuse.js";

/**
 * A memoized, performant Fuse.js search hook with result limiting.
 */
export function useCachedFuseSearch<T>(
  items: T[],
  query: string,
  options: IFuseOptions<T>,
  limit = 20
): FuseResult<T>[] {
  const fuseRef = useRef<Fuse<T>>(null);
  fuseRef.current = useMemo(() => new Fuse(items, options), [items, options]);

  return useMemo(() => {
    if (!query.trim()) return [];
    return fuseRef.current?.search(query).slice(0, limit) ?? [];
  }, [query, limit]);
}
