import dynamic from "next/dynamic"

const DashboardIndex = dynamic(() => import("@/components/dashboards/card-layouts/DashboardIndex").then((mod) => mod.default))

export default function DashboardIndexPage() {
  return <DashboardIndex />
}
