"use client"

import { useUserPanel } from "@/hooks/useUserPanel/useUserPanel";

export function ActivePanelRenderer() {
  const { activeModule } = useUserPanel()

  if (!activeModule) return (
    <div className="text-muted-foreground p-4 text-sm">
      No module selected.
    </div>
  );


  const Panel = activeModule.component;

  return (
    <div className="h-full max-h-[calc(100%-3rem)] overflow-y-auto">
      <Panel />
    </div>
  );
}
