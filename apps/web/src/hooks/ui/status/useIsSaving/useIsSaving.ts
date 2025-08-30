"use client";

import { useStatus } from "../useStatus";

export function useIsSaving(_type?: string, id?: string) {
  return useStatus(id).isSaving;
}
