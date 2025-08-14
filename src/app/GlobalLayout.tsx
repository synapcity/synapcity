"use client";

import dynamic from "next/dynamic";

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
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <ResizableContent>{children}</ResizableContent>
    </div>
  );
}
