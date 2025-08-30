"use client";

import { useStatus } from "../useStatus";

export function useIsLoading(_type?: string, id?: string) {
  return useStatus(id).isLoading;
}
