"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const DashboardPage = dynamic(
  () => import("@/components/pages/DashboardPage").then((mod) => mod.default),
  { ssr: false }
);

export default function DashboardShowPage() {
  const params = useParams();
  const dashboardId = params.dashboardId as string;

  return (
    <div className="flex flex-col flex-1">
      <DashboardPage dashboardId={dashboardId} />
    </div>
  )
}