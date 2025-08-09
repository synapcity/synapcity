"use client";

import dynamic from "next/dynamic";

const DashboardIndex = dynamic(
  () => import("@/components/dashboards/card-layouts/DashboardIndex").then((mod) => mod.default),
  { ssr: false },
);

export default function DashboardIndexPage() {
  return <DashboardIndex />
}
