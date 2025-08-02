"use client";

import Fuse, { IFuseOptions } from "fuse.js";
import { useMemo } from "react";

export interface UseFuzzyFilterOptions<T> extends IFuseOptions<T> {
	minQueryLength?: number;
	keys: string[];
}

/**
 * Fuzzy filters a list of items using Fuse.js with substring fallback.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFuzzyFilter<T extends Record<string, any>>(
	items: T[] = [],
	query: string,
	options: UseFuzzyFilterOptions<T>
): T[] {
	const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
	const { minQueryLength = 1, ...fuseOpts } = options || {
		keys: [],
		threshold: 0.5,
	};

	const fuseOptsString = useMemo(() => JSON.stringify(fuseOpts), [fuseOpts]);

	const fuse = useMemo(
		() =>
			new Fuse(safeItems, {
				threshold: 0.5,
				ignoreLocation: true,
				findAllMatches: true,
				...fuseOpts,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[safeItems, fuseOptsString, fuseOpts]
	);

	return useMemo(() => {
		const trimmed = (query || "").trim().toLowerCase();

		if (!trimmed || trimmed.length < minQueryLength) {
			return safeItems;
		}

		let results: T[] = [];
		try {
			results = fuse.search(trimmed).map((r) => r.item);
		} catch {
			results = [];
		}

		// If Fuse returns nothing, fallback to substring match
		if (results.length === 0 && options?.keys) {
			results = safeItems.filter((item) =>
				options.keys.some((key) =>
					(item[key] || "").toString().toLowerCase().includes(trimmed)
				)
			);
		}

		// Always return array
		return Array.isArray(results) ? results : [];
	}, [query, fuse, safeItems, minQueryLength, options]);
}
