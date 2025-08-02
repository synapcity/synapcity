"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseDebouncedQueryOptions {
	debounceMs?: number;
	initial?: string;
}

export interface UseDebouncedQueryResult {
	rawQuery: string;
	query: string;
	setRawQuery: (value: string) => void;
	clear: () => void;
	isSearching: boolean;
}

/**
 * Manages a debounced query string with clear/reset and searching indicator.
 */
export function useDebouncedQuery({
	debounceMs = 200,
	initial = "",
}: UseDebouncedQueryOptions = {}): UseDebouncedQueryResult {
	const [raw, setRaw] = useState<string>(initial);
	const [query, setQuery] = useState<string>(initial);
	const isDebounced = debounceMs > 0;
	const isSearching = isDebounced && raw !== query;

	useEffect(() => {
		if (!isDebounced) {
			setQuery(raw.toLowerCase().trim());
			return;
		}
		const timer = window.setTimeout(() => {
			setQuery(raw.toLowerCase().trim());
		}, debounceMs);
		return () => window.clearTimeout(timer);
	}, [raw, debounceMs, isDebounced]);

	// Clamps input to string
	const setRawQuery = useCallback((value: string) => {
		setRaw(typeof value === "string" ? value : "");
	}, []);

	const clear = useCallback(() => {
		setRaw("");
		setQuery("");
	}, []);

	return {
		rawQuery: raw ?? "",
		query: query ?? "",
		setRawQuery,
		clear,
		isSearching,
	};
}
