"use client";

import { useState, useCallback } from "react";

export function useDashboardModal() {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<{
    id?: string;
    name?: string;
    description?: string;
  } | null>(null);

  const openForNew = useCallback(() => {
    setInitialData(null);
    setOpen(true);
  }, []);

  const openForEdit = useCallback((data: { id: string; name?: string; description?: string }) => {
    setInitialData(data);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return {
    open,
    initialData,
    setOpen,
    openForNew,
    openForEdit,
    close,
  };
}
