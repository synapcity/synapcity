"use client"

import { useDashboardStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { EditableText } from "../molecules/EditableText";
import { formatDate } from "@/utils/date-utils";
import { cn } from "@/utils";
import { Icon } from "../atoms";

export const DashboardHeader = ({ dashboardId }: { dashboardId: string; }) => {
  const updateName = useDashboardStore(useShallow(s => s.updateName))

  const { name, status, createdAt, updatedAt } = useDashboardStore(
    useShallow((s) => ({
      name: s.items[dashboardId]?.name,
      status: s.status[dashboardId],
      createdAt: s.items[dashboardId]?.createdAt,
      updatedAt: s.items[dashboardId]?.updatedAt
    }))
  );
  const created = formatDate(createdAt, { style: "full" })
  const updated = formatDate(updatedAt, { style: "relative" })
  const startStatus = useDashboardStore(s => s.startStatus)
  const clearStatus = useDashboardStore(s => s.resetStatus)



  const getStatus = () => {
    if (!status) {
      return (
        <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="check" className={cn("w-4 h-4", "text-green-500")} />
          <span>Synced</span>
        </div>
      );
    }

    const isUpdating = Boolean(status.isEditing || status.isSaving);
    let text = "Saved";
    if (isUpdating) {
      if (status.isEditing) text = "Editing...";
      else if (status.isSaving) text = "Saving...";
      else text = "Loading...";
    }

    const iconName = !isUpdating ? "check" : status.isEditing ? "penLine" : "loading";
    const spin = isUpdating && !status.isEditing;

    return (
      <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon
          name={iconName}
          className={cn("w-4 h-4", {
            "text-green-500": !isUpdating,
            "text-gray-500": isUpdating,
            "animate-spin": spin,
          })}
        />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <EditableText
        as="h4"
        value={name ?? ""}
        onSave={(value: string) => updateName(dashboardId, value)}
      />
      {getStatus()}
    </div>
  )
}