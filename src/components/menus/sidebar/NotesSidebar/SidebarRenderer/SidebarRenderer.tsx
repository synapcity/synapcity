'use client';

import React, { JSX, Suspense } from 'react';
import { Skeleton } from '@/components/atoms/ui/skeleton';
import { useUIStore } from '@/stores/uiStore';
import { usePanels } from '@/hooks/sidebar/usePanels';
import { SidebarScope } from '@/stores/sidebarStore';

interface SidebarRendererProps {
  scope: SidebarScope;
  id: string;
}

export function SidebarRenderer({ scope, id }: SidebarRendererProps): JSX.Element | null {
  const getCompState = useUIStore(s => s.getCompState)
  const isVisible = getCompState ? getCompState("sidebar", "isVisible") : false
  const isHydrated = useUIStore((s) => s.hasHydrated);
  const { activePanel } = usePanels(scope, id);

  if (!isHydrated) {
    return <Skeleton className="w-full h-full" />;
  }

  if (!activePanel || !isVisible) {
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
