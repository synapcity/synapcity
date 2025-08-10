"use client"

import { useUserStore } from "@/stores";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/shallow";

const Header = dynamic(() => import("@/components/organisms/Header/Header").then(mod => mod.Header), { ssr: false });
const ResizableContent = dynamic(() => import("@/components/organisms/ResizableContent/ResizableContent").then(mod => mod.ResizableContent), { ssr: true })
const InitialHeader = dynamic(() => import("@/landing-page/components/Header/Header").then(mod => mod.Header), { ssr: true })
export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const isLogged = useUserStore(useShallow(s => s.isLoggedIn))
  return (
    <div className="flex flex-col min-h-screen relative">
      {isLogged ? <Header /> : <InitialHeader visible={!isLogged} />}
      <ResizableContent>
        {children}
      </ResizableContent>
    </div>

  );
}
