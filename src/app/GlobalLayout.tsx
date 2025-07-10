"use client"

import dynamic from "next/dynamic";
import { cn } from "@/utils";

const ResizablePanelGroup = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizablePanelGroup), { ssr: false });
const ResizablePanel = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizablePanel), { ssr: false });
const ResizableHandle = dynamic(() => import("@/components/atoms/ui/resizable").then(mod => mod.ResizableHandle), { ssr: false });
const Header = dynamic(() => import("@/components/organisms/Header/Header").then(mod => mod.Header), { ssr: false });

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("min-h-full w-screen h-full flex flex-col")}>
      <ResizablePanelGroup direction="vertical" className="size-full">
        <ResizablePanel collapsible>
          <Header />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <main className="flex-1 flex flex-col size-full relative">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
