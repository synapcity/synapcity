import { SkeletonOrLoading } from "@/components";
import { SidebarInset } from "@/components/atoms/ui/sidebar";
import { BreadcrumbHeader } from "@/components/molecules/Breadcrumbs";
import { Suspense } from "react";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
  return (
    <SidebarInset>
      <div className="flex flex-col flex-1 min-h-0">
        <BreadcrumbHeader />
        <main className="flex-1 flex flex-col min-h-0">
          <Suspense fallback={<SkeletonOrLoading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </SidebarInset>
  );
}