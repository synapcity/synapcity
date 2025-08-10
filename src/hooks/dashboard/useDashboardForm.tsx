/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { Dashboard } from "@/stores";
import { useDashboardStore } from "@/stores/resources/dashboardStore/useDashboardStore";

export function useDashboardForm(initialData?: {
  id?: string;
  name?: string;
  description?: string;
}) {
  const router = useRouter();
  const addDashboard = useDashboardStore((s) => s.addResource);
  const updateResource = useDashboardStore((s) => s.updateResource);
  const getItem = useDashboardStore((s) => s.getResourceById);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  async function submit({ name, description }: { name: string; description: string }) {
    setError(null);
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name is required");
      return null;
    }

    setIsSubmitting(true);

    let optimisticId: string | undefined;
    if (!isEdit) {
      optimisticId = `temp-${nanoid()}`;
    }

    try {
      let dashboard: Dashboard | undefined = undefined;

      if (isEdit && initialData!.id) {
        const existing = getItem(initialData!.id);
        if (existing) {
          await updateResource(initialData!.id, { name: trimmedName, description });
          dashboard = getItem(initialData!.id);
        } else {
          dashboard = await addDashboard({ name: trimmedName, description });
        }
      } else {
        dashboard = await addDashboard({ name: trimmedName, description });
      }

      if (dashboard?.id) {
        router.push(`/home/dashboards/${dashboard.id}`);
        return dashboard;
      } else {
        throw new Error("No dashboard ID after creation");
      }
    } catch (e: any) {
      console.error("Dashboard form submit failed", e);
      setError(e?.message || "Failed to save dashboard");
      if (!isEdit && optimisticId) {
      }
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submit,
    isSubmitting,
    error,
    isEdit,
  };
}
