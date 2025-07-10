import { Spinner } from "@/components/atoms/Spinner/Spinner"
import dynamic from "next/dynamic"

const DashboardPage = dynamic(() => import("@/components/pages/DashboardPage").then((mod) => mod.default), {
  ssr: true,
  loading: () => <div className="absolute inset-0 flex items-center justify-center size-full"><Spinner size={48} /></div>
})

export default function Dashboard() {
  return <DashboardPage />
}
