"use client";

import { useStatus } from "../useStatus";

export function useIsSaving(type?: string, id?: string) {
	return useStatus(id).isSaving;
}
