"use client";

import dynamic from "next/dynamic"

const GlobalPage = dynamic(
  () => import("@/components/pages/GlobalPage").then((mod) => mod.default),
  { ssr: false }
)

export default function Global() {
  return <GlobalPage />
}
