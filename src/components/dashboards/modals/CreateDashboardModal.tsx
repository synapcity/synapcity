"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton, Input } from "@/components";
import { useDashboardStore } from "@/stores/dashboardStore/useDashboardStore";
import { CreateModalShell } from "@/components/molecules/CreateModal";
import { Dashboard } from "@/schemas";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialData?: { id?: string; name?: string; description?: string } | null;
}

export function CreateDashboardModal({ open, setOpen, initialData }: Props) {
  const router = useRouter();
  const addDashboard = useDashboardStore((state) => state.addResource);
  const updateResource = useDashboardStore((s) => s.updateResource);
  const getItem = useDashboardStore((s) => s.getResourceById);

  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(initialData?.name ?? "");
    setDescription(initialData?.description ?? "");
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const trimmedDescription = description.trim();

    setIsSubmitting(true);
    try {
      let dashboard: Dashboard | null = null;

      if (initialData?.id) {
        const existing = getItem(initialData.id);
        if (existing) {
          await updateResource(initialData.id, {
            name: trimmedName,
            description: trimmedDescription,
          });
          dashboard = getItem(initialData.id) ?? null;
        } else {
          dashboard = await addDashboard({
            name: trimmedName,
            description: trimmedDescription,
          });
        }
      } else {
        dashboard = await addDashboard({
          name: trimmedName,
          description: trimmedDescription,
        });
      }

      if (dashboard?.id) {
        router.push(`/home/dashboards/${dashboard.id}`);
      }
    } catch (err) {
      console.error("Failed to create/edit dashboard:", err);
    } finally {
      setIsSubmitting(false);
      setName("");
      setDescription("");
      setOpen(false);
    }
  }

  return (
    <CreateModalShell
      open={open}
      setOpen={setOpen}
      trigger={
        <IconButton
          variant="ghost"
          label="Add Dashboard"
          tooltip="Add Dashboard"
          icon="plus"
        />
      }
      title={
        initialData
          ? initialData.id
            ? "Edit Dashboard"
            : "Create New Dashboard"
          : "Create New Dashboard"
      }
      description="Enter a name for your dashboard."
      onSubmit={handleSubmit}
      canSubmit={!!name.trim() && !isSubmitting}
      submitLabel="Save"
      cancelLabel="Cancel"
    >
      <Input
        autoFocus
        placeholder="Dashboard name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <Input
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
      />
    </CreateModalShell>
  );
}
