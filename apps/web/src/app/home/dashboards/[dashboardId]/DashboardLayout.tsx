"use client";

import { SkeletonOrLoading } from "@/components";
import { useMetadataStore } from "@/stores";
import dynamic from "next/dynamic";

const ResizableSidebarWrapper = dynamic(
  () =>
    import("@/components/menus/sidebar/NotesSidebar/ResizableSidebarWrapper/ResizableWrapper").then(
      (mod) => mod.ResizableSidebarWrapper
    ),
  { ssr: false }
);
const DashboardsSidebar = dynamic(
  () =>
    import("@/components/menus/sidebar/DashboardSidebar/DashboardsSidebar").then(
      (mod) => mod.DashboardsSidebar
    ),
  { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> }
);
export default function DashboardLayout({
  dashboardId,
  children,
}: {
  dashboardId: string;
  children: React.ReactNode;
}) {
  const hasHydrated = useMetadataStore((s) => s.hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  return (
    <ResizableSidebarWrapper
      id={dashboardId}
      scope="dashboard"
      sidebar={<DashboardsSidebar id={dashboardId} />}
    >
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </ResizableSidebarWrapper>
  );
}
