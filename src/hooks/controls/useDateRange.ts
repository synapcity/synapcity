"use client";

import { useState, useCallback } from "react";

export interface DateRange {
	from?: string; // ISO date string yyyy-MM-dd
	to?: string;
}

/**
 * Holds a date range and exposes setter/reset.
 */
export function useDateRange(initial: DateRange = {}) {
	const [dateRange, setDateRange] = useState<DateRange>(initial);
	const reset = useCallback(() => setDateRange({}), []);
	return { dateRange, setDateRange, reset };
}
