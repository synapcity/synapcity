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
  const isHydrated = useUIStore((s) => s.hasHydrated);
  const { activePanel } = usePanels(scope, id);

  if (!isHydrated) {
    return <Skeleton className="w-full h-full" />;
  }

  if (!activePanel) {
    console.warn(`No active panel for ${scope}:${id}`);
  }

  const PanelComponent = activePanel?.component;
  const panelProps = activePanel?.props ?? {};

  if (!PanelComponent) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <PanelComponent {...panelProps} />
    </Suspense>
  );
}
