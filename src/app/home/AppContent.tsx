"use client"

import { SkeletonOrLoading } from "@/components";
import { SidebarInset, useSidebar } from "@/components/atoms/ui/sidebar";
import { useKeyboardShortcut } from "@/hooks";
import { useUIStore } from "@/stores";
import { Suspense } from "react";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
  const { toggleSidebar } = useSidebar()
  const toggleComp = useUIStore(s => s.toggleCompState)
  useKeyboardShortcut({
    key: "m",
    metaKey: true,
    onKeyPressed: () => {
      toggleComp("mainSidebar", "isVisible")
      toggleSidebar()
    }
  })

  return (
    <SidebarInset>
      <main className="flex-1 flex flex-col min-h-0">
        <Suspense fallback={<SkeletonOrLoading />}>
          {children}
        </Suspense>
      </main>
    </SidebarInset>
  );
}