"use client"

import dynamic from "next/dynamic";
import { useUIStore } from "@/stores";

const ResizablePanelGroup = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizablePanelGroup), { ssr: false });
const ResizablePanel = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizablePanel), { ssr: false });
const ResizableHandle = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizableHandle), { ssr: false });
const Header = dynamic(() => import("@/components/organisms/Header/Header").then(mod => mod.Header), { ssr: false });
const UserPanel = dynamic(() => import("@/components/panels/UserPanel/UserPanelShell/UserPanelShell").then((mod) => mod.UserPanelShell), { ssr: false, loading: () => <div>Loading...</div> })

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useUIStore((s) =>
    s.components?.userPanel?.isVisible ?? false
  );


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ResizablePanelGroup direction="vertical" className="flex-1">
        {isOpen && (
          <>
            <ResizablePanel
              defaultSize={30}
              collapsible
              collapsedSize={0}
              order={1}
              minSize={10}
              maxSize={90}
            >
              <UserPanel />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}
        <ResizablePanel
          order={2}
          className="relative"
        >
          <main>{children}</main>
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>

  );
}
