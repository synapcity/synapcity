export interface DateRange {
	from?: string;
	to?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyDateRangeFilter<T extends Record<string, any>>(
	items: T[] = [],
	range?: DateRange,
	referenceKey: "updatedAt" | "createdAt" = "updatedAt"
): T[] {
	if (!Array.isArray(items) || items.length === 0) return [];
	if (!range || (!range.from && !range.to)) return items;
	const fromTime = range.from ? new Date(range.from).getTime() : null;
	const toTime = range.to ? new Date(range.to).getTime() : null;

	return items.filter((d) => {
		const raw =
			referenceKey === "createdAt"
				? d.createdAt || d.updatedAt || ""
				: d.updatedAt || d.createdAt || "";
		if (!raw) return false;
		const t = new Date(raw).getTime();
		if (fromTime !== null && t < fromTime) return false;
		if (toTime !== null && t > toTime + 24 * 60 * 60 * 1000 - 1) return false;
		return true;
	});
}
