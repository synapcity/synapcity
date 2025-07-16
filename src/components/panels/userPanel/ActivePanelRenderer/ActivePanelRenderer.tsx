"use client"

import { useUserPanel } from "@/hooks/features/useUserPanel/useUserPanel";

export function ActivePanelRenderer() {
  const { activeModule } = useUserPanel()
  if (!activeModule)
    return (
      <div className="text-muted-foreground p-4 text-sm">
        No module selected.
      </div>
    );

  const Panel = activeModule.component;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 h-full">
      <Panel />
    </div>
  );
}