"use client";

import React from "react";
// import { useUIStore } from "@/stores/uiStore";
import { useMetadata } from "@/providers/MetadataProvider";
import { useNodeStore } from "@/lexical/stores/nodeStore";
// import { SidebarScope } from "@/stores/sidebarStore";

export function SidebarTrigger({ persistentKey }: {
  persistentKey?: string;
}) {
  const { id, scope } = useMetadata();
  const setActiveNode = useNodeStore((s) => s.setNodeKeyForPersistentKey);
  // const setActivePanel = useUIStore((s) => s.setCompState)("noteSidebar", "isVisible)", false);

  const onClick = () => {
    if (persistentKey) {
      setActiveNode(persistentKey);
      // setActivePanel(scope as SidebarScope, id, "notes");
    }
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
