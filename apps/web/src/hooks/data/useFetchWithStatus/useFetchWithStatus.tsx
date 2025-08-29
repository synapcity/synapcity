// "use client";

// import { useState, useEffect } from "react";
// import { withStatusAndToast } from "@/lib/toast";
// import type { StatusField, UIMessages } from "@/types/ui";

// export function useFetchWithStatus<T>(
//   statusField: StatusField,
//   fetcher: () => Promise<T>,
//   messages: UIMessages,
//   deps: unknown[] = [],
//   initialData?: T
// ) {
//   const [data, setData] = useState<T | undefined>(initialData);
//   const [loading, setLoading] = useState(initialData === undefined);

//   useEffect(() => {
//     setLoading(true);
//     withStatusAndToast<T>(
//       statusField,
//       fetcher,
//       messages
//     )
//       .then(res => { if (res !== undefined) setData(res); })
//       .finally(() => setLoading(false));
//   }, [fetcher, messages, statusField]);

//   return { data, loading };
// }

"use client";

import { useState, useEffect } from "react";
import { withStatusAndToast } from "@/lib/toast";
import type { StatusField, UIMessages } from "@/types/ui";

export function useFetchWithStatus<T>(
  statusField: StatusField,
  fetcher: () => Promise<T>,
  messages: UIMessages,
  deps: unknown[] = [],
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(initialData === undefined);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    withStatusAndToast<T>(statusField, fetcher, messages)
      .then((res) => {
        if (!cancelled && res !== undefined) {
          setData(res);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusField, fetcher, JSON.stringify(messages), ...deps]);

  return { data, loading };
}
