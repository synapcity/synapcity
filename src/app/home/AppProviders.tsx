"use client"

import dynamic from "next/dynamic";

const AppSidebar = dynamic(() => import("./AppSidebar").then(mod => mod.default), { ssr: true })
const SidebarProvider = dynamic(() => import("@/components/atoms/ui/sidebar").then(mod => mod.SidebarProvider), { ssr: false })
const AppContent = dynamic(() => import("./AppContent").then(mod => mod.AppContent), { ssr: true })

export default function AppProviders({ children }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex flex-1 min-h-0">
        <AppSidebar />
        <AppContent>
          {children}
        </AppContent>
      </div>
    </SidebarProvider>
  )
}