"use client"

import { useUIStore } from "@/stores";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/shallow";
// import { useKeyboardShortcut } from "@/hooks";

const AppSidebar = dynamic(() => import("./AppSidebar").then(mod => mod.default), { ssr: true })
const SidebarProvider = dynamic(() => import("@/components/atoms/ui/sidebar").then(mod => mod.SidebarProvider), { ssr: false })
const AppContent = dynamic(() => import("./AppContent").then(mod => mod.AppContent), { ssr: true })

export default function AppProviders({ children }: { children: React.ReactNode; }) {
  const isOpen = useUIStore(useShallow(s => s.components.mainSidebar.isVisible))
  return (
    <SidebarProvider defaultOpen sidebarId="global-sidebar" collapsible="offcanvas" open={isOpen}>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {isOpen && <AppSidebar />}
        <AppContent>
          {children}
        </AppContent>
      </div>
    </SidebarProvider>
  )
}