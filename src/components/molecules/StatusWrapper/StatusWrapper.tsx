"use client";

import { useUpdateNote } from "@/hooks/notes/useUpdateNote";
import { Loader2, PenLine, RefreshCwIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";

export interface StatusWrapperProps {
  id: string;
  children: React.ReactNode;
}

export const StatusWrapper = ({ id, children }: StatusWrapperProps) => {
  const { status } = useUpdateNote(id);
  const activeStatus =
    Object.entries(status).find(([key, value]) => key.startsWith("is") && !!value)?.[0] ??
    (status.error ? "error" : null);

  const renderStatus = () => {
    switch (activeStatus) {
      case "isSaving":
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving...</span>
          </>
        );
      case "isEditing":
        return (
          <>
            <PenLine className="w-4 h-4" />
          </>
        );
      case "isLoading":
      case "isFetching":
        return (
          <>
            <RefreshCwIcon className="w-4 h-4 animate-spin" />
            <span>Syncing...</span>
          </>
        );
      case "error":
        return (
          <>
            <AlertCircleIcon className="w-4 h-4 text-red-500" />
            <span className="text-red-500">Error</span>
          </>
        );
      default:
        return (
          <>
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>Saved</span>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-8">
      {children}
      <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
        {renderStatus()}
      </div>
    </div>
  );
};
