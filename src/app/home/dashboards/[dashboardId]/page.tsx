import dynamic from "next/dynamic";

type Params = Promise<{ dashboardId: string }>;

const DashboardPage = dynamic(() => import("@/components/pages/DashboardPage").then(mod => mod.default))

export default async function DashboardShowPage({ params }: { params: Params }) {
  const dashboardParams = await params;
  const { dashboardId } = dashboardParams;

  return (
    <div className="flex flex-col flex-1">
      <DashboardPage dashboardId={dashboardId} />
    </div>
  )
}
