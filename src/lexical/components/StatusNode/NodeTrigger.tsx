"use client"

// import { useSidebarStore } from "@/stores/sidebarStore";
import { useNodeRelationsStore } from "./nodeRelationsStore";

export function NodeTrigger({ nodeId }: { nodeId: string }) {
  // const openPanel = useSidebarStore((s) => s.getPanels);
  const { connections, annotations, resources } = useNodeRelationsStore.getState()
  console.log("nodeId", nodeId)
  // Only render when there’s something to manage
  if (
    Object.values(connections).length === 0 &&
    Object.values(annotations).length === 0 &&
    Object.values(resources).length === 0
  ) {
    return null;
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // openPanel(nodeId, /* module: "connections" | "annotations" | "resources" */);
      }}
      title="Manage…"
      className="opacity-50 hover:opacity-100 transition"
    >
      ⋮
    </button>
  );
}
