// import dynamic from "next/dynamic";
// import { FullPageLoading } from "@/components/loading/skeletons/FullPageLoading";

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
    <div>
      <h3>Dashboard ID: {dashboardId} </h3>
    </div>
  )
}
