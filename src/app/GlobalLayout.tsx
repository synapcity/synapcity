"use client";

import { useUserStore } from "@/stores";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const Header = dynamic(
  () => import("@/components/organisms/Header/Header").then((mod) => mod.Header),
  { ssr: false }
);
const ResizableContent = dynamic(
  () =>
    import("@/components/organisms/ResizableContent/ResizableContent").then(
      (mod) => mod.ResizableContent
    ),
  { ssr: true }
);
export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useUserStore(useShallow((s) => !!s.user));
  const pathname = usePathname();

  useEffect(() => {
    const isRoot = pathname === "/";
    if (isLoggedIn && isRoot) {
      window.history.replaceState(null, "/", "/home");
    }
  }, [isLoggedIn, pathname]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <ResizableContent>{children}</ResizableContent>
    </div>
  );
}
