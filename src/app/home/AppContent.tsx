"use client"

import { SkeletonOrLoading } from "@/components";
import { CommandShortcut } from "@/components/atoms/ui/command";
import { Separator } from "@/components/atoms/ui/separator";
import { SidebarInset, useSidebar } from "@/components/atoms/ui/sidebar";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { useBreadcrumbs } from "@/hooks";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname();
  const segments = pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);

  const items = useBreadcrumbs(segments);

  return (
    <SidebarInset>
      <div className="flex flex-col flex-1 min-h-0">
        <header className="pl-2 pt-4 pb-2 border-b flex items-center min-h-[40px]">
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-accent/60 transition-colors group focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          </button>
          <CommandShortcut side="top" content="Cmd+B" className="mr-2">⌘B</CommandShortcut>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs items={items} />
        </header>
        <main className="px-6 flex-1 flex flex-col min-h-0">
          <Suspense fallback={<SkeletonOrLoading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </SidebarInset>
  );
}