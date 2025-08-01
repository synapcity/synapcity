"use client";

import { useStatus } from "../useStatus";

export function useIsLoading(type?: string, id?: string) {
	return useStatus(type, id).isLoading;
}
