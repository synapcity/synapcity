"use client";

import { useState } from "react";
import { withStatusAndToast } from "@/lib/toast";
import type { StatusField, UIMessages } from "@/types/ui";

export function useMutationWithStatus<Args, Result>(
  statusField: StatusField,
  mutator: (args: Args) => Promise<Result>,
  messages: UIMessages
) {
  const [loading, setLoading] = useState(false);

  async function mutate(args: Args): Promise<Result | undefined> {
    setLoading(true);
    try {
      const res = await withStatusAndToast<Result>(statusField, () => mutator(args), messages);
      return res;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, loading };
}
