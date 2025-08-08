import DashboardPage from "@/components/pages/DashboardPage";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css";

type Params = Promise<{ dashboardId: string }>;

export default async function DashboardShowPage({ params }: { params: Params }) {
  const dashboardParams = await params;
  const { dashboardId } = dashboardParams;

  return (
    <div className="flex flex-col flex-1">
      <DashboardPage dashboardId={dashboardId} />
    </div>
  )
}
