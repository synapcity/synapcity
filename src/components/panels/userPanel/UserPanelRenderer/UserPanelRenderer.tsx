"use client"

import { USER_PANEL_MODULES } from "../../userPanelModules";
import { useUserPanelStore } from "@/stores/userPanelStore";

export function UserPanelRenderer() {
  const activeSection = useUserPanelStore((s) => s.activeSection);
  const active = USER_PANEL_MODULES.find((m) => m.id === activeSection?.id);

  if (!active) return (
    <div className="text-muted-foreground p-4 text-sm">
      No module selected.
    </div>
  );


  const Panel = active.component;

  return (
    <div className="h-full max-h-[calc(100%-3rem)] overflow-y-auto">
      <Panel />
    </div>
  );
}
