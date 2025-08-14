"use client";

import { useUIStore, useUserStore } from "@/stores";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const ResizablePanelGroup = dynamic(
  () => import("@/components/atoms/ui/resizable").then((mod) => mod.ResizablePanelGroup),
  { ssr: false }
);
const ResizablePanel = dynamic(
  () => import("@/components/atoms/ui/resizable").then((mod) => mod.ResizablePanel),
  { ssr: false }
);
const ResizableHandle = dynamic(
  () => import("@/components/atoms/ui/resizable").then((mod) => mod.ResizableHandle),
  { ssr: false }
);
const UserPanel = dynamic(
  () =>
    import("@/components/panels/UserPanel/UserPanelShell/UserPanelShell").then(
      (mod) => mod.UserPanelShell
    ),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export const ResizableContent = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useUIStore(useShallow((s) => s.components?.userPanel?.isVisible ?? false));
  const isLoggedIn = useUserStore(useShallow((s) => s.isLoggedIn));
  const isLocked = useUIStore((s) => s.components?.userPanel?.isLocked ?? false);
  const setCompState = useUIStore((s) => s.setCompState);

  useEffect(() => {
    if (!isLoggedIn) {
      setCompState("userPanel", "isVisible", false);
    }
  }, [isLoggedIn, setCompState]);

  return (
    <ResizablePanelGroup direction="vertical" className="flex-1">
      {isOpen && (
        <>
          <ResizablePanel
            id="inbox"
            defaultSize={30}
            collapsible
            collapsedSize={0}
            order={1}
            minSize={10}
            maxSize={90}
            onResize={() => {
              if (isLocked) return;
              setCompState("userPanel", "isLocked", true);
            }}
          >
            <UserPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
      )}
      <ResizablePanel id="main" order={2} className="relative">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
