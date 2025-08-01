"use client";

import { Dashboard } from "@/schemas";
import { useDebouncedQuery, useFuzzyFilter } from "@/hooks/controls/search";

export function useDashboardSearch(
	dashboards: Dashboard[],
	{ debounceMs = 180 } = {}
) {
	const { rawQuery, query, setRawQuery, clear, isSearching } =
		useDebouncedQuery({ debounceMs, initial: "" });
	const results = useFuzzyFilter(dashboards, query);
	return {
		rawQuery,
		query,
		setRawQuery,
		clear,
		isSearching,
		results,
	};
}
