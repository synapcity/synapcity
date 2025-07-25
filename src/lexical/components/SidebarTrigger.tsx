"use client";

import React from "react";
import { useUIStore } from "@/stores/uiStore";
import { useMetadata } from "@/providers/MetadataProvider";
// import { useNodeStore } from "@/stores/nodeStore";
import { SidebarScope } from "@/types/refactor/sidebar-old";

// { persistentKey }: { persistentKey: string }
export function SidebarTrigger() {
  const { entityId: id, scope } = useMetadata();
  // const setActiveNode = useNodeStore((s) => s.setActiveNode);
  const setActivePanel = useUIStore((s) => s.setActivePanel);

  const onClick = () => {
    // setActiveNode(persistentKey);
    setActivePanel(scope as SidebarScope, id, "notes");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Open notes"
      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs hover:bg-blue-600"
    >
      N
    </button>
  );
}
