import dynamic from "next/dynamic"

const DashboardPage = dynamic(() => import("@/components/pages/DashboardPage").then((mod) => mod.default), {
  ssr: true,
})

export default function Dashboard() {
  return <DashboardPage />
}
