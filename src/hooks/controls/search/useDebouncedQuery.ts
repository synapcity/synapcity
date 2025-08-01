'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseDebouncedQueryOptions {
  debounceMs?: number;
  initial?: string;
}

/**
 * Manages a textual query string with optional debounce, clear, and "is searching" indicator.
 */
export function useDebouncedQuery({
  debounceMs = 200,
  initial = '',
}: UseDebouncedQueryOptions = {}) {
  const [raw, setRaw] = useState(initial);
  const [query, setQuery] = useState(initial);
  const isDebounced = debounceMs > 0;
  const isSearching = isDebounced && raw !== query;

  useEffect(() => {
    if (!isDebounced) {
      setQuery(raw);
      return;
    }
    const timer = window.setTimeout(() => {
      setQuery(raw);
    }, debounceMs);
    return () => {
      window.clearTimeout(timer);
    };
  }, [raw, debounceMs, isDebounced]);

  const clear = useCallback(() => {
    setRaw('');
    setQuery('');
  }, []);

  return {
    rawQuery: raw,
    query,
    setRawQuery: setRaw,
    clear,
    isSearching,
  };
}
