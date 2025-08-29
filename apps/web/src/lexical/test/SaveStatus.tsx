"use client";

import React from "react";
import { useEditorStore } from "./useEditorStore";
import { formatDistanceToNow, parseISO } from "date-fns";

export const SaveStatus: React.FC = () => {
  const { isDirty, lastSavedAt, isSaving } = useEditorStore();

  if (isSaving) return <div className="text-sm">Saving…</div>;
  if (isDirty) return <div className="text-sm text-yellow-600">Unsaved changes</div>;
  if (lastSavedAt)
    return (
      <div className="text-sm text-gray-500">
        Saved {formatDistanceToNow(parseISO(lastSavedAt), { addSuffix: true })}
      </div>
    );
  return <div className="text-sm text-gray-500">No changes yet</div>;
};
