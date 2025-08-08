// import dynamic from "next/dynamic";
// import { FullPageLoading } from "@/components/loading/skeletons/FullPageLoading";

import DashboardPage from "@/components/pages/DashboardPage";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css";
// const Dashboard = dynamic(() => import("@/components/dashboard/Dashboard/Dashboard").then(mod => mod.Dashboard), {
//   ssr: true,
//   loading: () => <FullPageLoading message="Loading dashboard..." />,
// });

type Params = Promise<{ dashboardId: string }>;

export default async function DashboardShowPage({ params }: { params: Params }) {
  const dashboardParams = await params;
  const { dashboardId } = dashboardParams;

  return (
    // <Dashboard id={dashboardId} />
    <div className="flex flex-col flex-1">
      <h3>Dashboard ID: {dashboardId} </h3>
      <DashboardPage />
    </div>
  )
}
