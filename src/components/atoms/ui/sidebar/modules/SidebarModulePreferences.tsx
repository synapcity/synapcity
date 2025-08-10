"use client";

import { useShallow } from "zustand/shallow";
import { useSidebarModuleStore } from "../useSidebarModuleStore";
import { Checkbox } from "@/components/atoms/ui/checkbox";

export function SidebarModulePreferences({ id }: { id: string }) {
  const sidebarModule = useSidebarModuleStore(useShallow((s) => s.sidebarModulesById[id]));
  const setModulePrefs = useSidebarModuleStore((s) => s.updateModule);

  return (
    <div className="space-y-2">
      <Checkbox
        checked={sidebarModule.pinned}
        onCheckedChange={(val) => setModulePrefs(id, { pinned: !!val })}
        content="Pin"
      />
      <Checkbox
        checked={sidebarModule.hidden}
        onCheckedChange={(val) => setModulePrefs(id, { hidden: !!val })}
        content="Hide"
      />
    </div>
  );
}
