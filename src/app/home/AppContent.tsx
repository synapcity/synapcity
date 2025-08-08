import { SkeletonOrLoading } from "@/components";
import { SidebarInset } from "@/components/atoms/ui/sidebar";
import { Suspense } from "react";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
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