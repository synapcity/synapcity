'use client';

import React, { JSX, Suspense } from 'react';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { usePanels } from '@/hooks/sidebar/usePanels';
import { SidebarScope } from '@/stores/ui/sidebarStore';
import { useSidebar } from '@/components/atoms/ui/sidebar';
import { useNoteStore } from '@/stores';

interface SidebarRendererProps {
  scope: SidebarScope;
  id: string;
}

export function SidebarRenderer({ scope, id }: SidebarRendererProps): JSX.Element | null {
  const { sidebarState } = useSidebar();

  const isExpanded = sidebarState === "expanded";
  const { activePanel } = usePanels(scope, id)

  const isHydrated = useNoteStore((s) => s.hasHydrated);

  if (!isHydrated) {
    return <Skeleton className="w-full h-full" />;
  }

  if (!activePanel || !isExpanded) {
    console.warn(`No active panel for ${scope}:${id}`);
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PanelComponent = activePanel.component as React.ComponentType<any>;
  const panelProps = activePanel.props ?? {};

  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <PanelComponent {...panelProps} />
    </Suspense>
  );
}
