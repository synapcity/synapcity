"use client";

import { Suspense } from "react";
import type { SidebarScope } from "@/types/sidebar";
import { Skeleton } from "@/components/atoms/ui/skeleton";
import { useUIStore } from "@/stores/uiStore";
import { usePanels } from "@/hooks/sidebar/usePanels";

interface SidebarRendererProps {
  scope: SidebarScope;
  id: string;
}

export function SidebarRenderer({ scope, id }: SidebarRendererProps) {
  // wait for the whole UI store to rehydrate
  const isHydrated = useUIStore((s) => s.hasHydrated);
  const { activePanel } = usePanels(scope, id);

  if (!isHydrated) {
    return <Skeleton className="w-full h-full" />;
  }

  if (!activePanel) {
    console.warn(`No active panel for ${scope}:${id}`);
    return null;
  }

  const PanelComponent = activePanel.component;
  const panelProps = activePanel.props ?? {};

  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <PanelComponent {...panelProps} />
    </Suspense>
  );
}
