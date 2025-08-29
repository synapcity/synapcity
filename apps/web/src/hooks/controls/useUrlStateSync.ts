"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

type Params = Record<string, string | undefined>;

/**
 * Syncs provided params into the URL querystring using replace (avoids history noise).
 */
export function useUrlStateSync(params: Params) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const serialized = useMemo(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let changed = false;
    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== "") {
        if (current.get(k) !== v) {
          current.set(k, v);
          changed = true;
        }
      } else if (current.has(k)) {
        current.delete(k);
        changed = true;
      }
    });
    return { changed, qs: current.toString() };
  }, [params, searchParams]);

  useEffect(() => {
    if (serialized.changed) {
      router.replace(`${pathname}?${serialized.qs}`, { scroll: false });
    }
  }, [serialized, pathname, router]);
}
