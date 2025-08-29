"use client";

import dynamic from "next/dynamic";
import { SkeletonOrLoading } from "@/components/loading";

const GlobalPage = dynamic(
  () => import("@/components/pages/GlobalPage/GlobalPage").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <SkeletonOrLoading fullScreen />,
  }
);

export default function Global() {
  return <GlobalPage />;
}
