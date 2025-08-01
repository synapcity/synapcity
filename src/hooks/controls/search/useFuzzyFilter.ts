/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Fuse, { IFuseOptions } from "fuse.js";
import { useMemo } from "react";

export interface UseFuzzyFilterOptions<T extends Record<string, any>>
	extends IFuseOptions<T> {
	minQueryLength?: number;
}

/**
 * Fuzzy filters a list of items using Fuse.js.
 */
export function useFuzzyFilter<T extends Record<string, any>>(
	items: T[],
	query: string,
	options: UseFuzzyFilterOptions<T> = {}
): T[] {
	const { minQueryLength = 1, ...fuseOpts } = options;

	const fuse = useMemo(
		() =>
			new Fuse(items, {
				keys: ["name", "description"],
				threshold: 0.35,
				ignoreLocation: true,
				...fuseOpts,
			}),
		[items, fuseOpts]
	);

	return useMemo(() => {
		const trimmed = query.trim();
		if (!trimmed) return items;
		if (trimmed.length < Math.max(1, minQueryLength)) return items;
		return fuse.search(trimmed).map((r) => r.item);
	}, [query, fuse, items, minQueryLength]);
}
