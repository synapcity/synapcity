import dynamic from "next/dynamic";

const Grid = dynamic(
  () => import("@/grid/Grid/Grid").then((mod) => mod.default),
  { ssr: false }
);
const DashboardHeader = dynamic(
  () =>
    import("@/components/dashboards/DashboardHeader").then(
      (mod) => mod.DashboardHeader
    ),
  { ssr: false }
);

export default function DashboardPage({ dashboardId }: { dashboardId: string; }) {
  return (
    <div className="flex flex-col items-center justify-items-center flex-1">
      <DashboardHeader dashboardId={dashboardId} />
      <Grid />
    </div>
  )
}
