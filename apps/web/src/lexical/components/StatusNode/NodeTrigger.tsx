"use client";

import { useNodeRelationsStore } from "./nodeRelationsStore";
import { useMetadata } from "@/providers";
import { usePanels } from "@/hooks";

export function NodeTrigger({ nodeId }: { nodeId: string }) {
  const { scope, id } = useMetadata();
  const { setActive, activeId } = usePanels(scope, id);
  const { connections, annotations, resources } = useNodeRelationsStore.getState();
  // Only render when there’s something to manage
  if (
    Object.values(connections).length === 0 &&
    Object.values(annotations).length === 0 &&
    Object.values(resources).length === 0
  ) {
    return null;
  }

  const isActive = activeId === nodeId;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isActive) {
          setActive(null);
        }
        setActive(nodeId);
      }}
      title="Manage…"
      className="opacity-50 hover:opacity-100 transition"
    >
      ⋮
    </button>
  );
}
