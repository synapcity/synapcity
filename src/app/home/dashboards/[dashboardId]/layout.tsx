import dynamic from "next/dynamic";
import { DashboardShowProviders } from "./DashboardShowProviders";
import { SkeletonOrLoading } from "@/components";

const DashboardLayout = dynamic(() => import("./DashboardLayout"), { ssr: true, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })
export default async function DashboardShowLayout({ children, params }: { children: React.ReactNode; params: Promise<{ dashboardId: string }>; }) {
  const dashboardParams = await params;
  const { dashboardId } = dashboardParams
  return (
    <DashboardShowProviders dashboardId={dashboardId}>
      <DashboardLayout
        dashboardId={dashboardId}
      >
        {children}
      </DashboardLayout>
    </DashboardShowProviders>
  );
}
