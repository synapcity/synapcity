"use client"

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export function useDebouncedSearch<T>(
  query: string,
  searchFn: (query: string) => Promise<T[]>,
  delay = 250
) {
  const [results, setResults] = useState<T[]>([]);

  const debounced = useMemo(
    () =>
      debounce(async (q: string) => {
        const res = await searchFn(q);
        setResults(res);
      }, delay),
    [searchFn, delay]
  );

  useEffect(() => {
    if (query.trim()) debounced(query);
    return () => debounced.cancel();
  }, [query, debounced]);

  return results;
}
