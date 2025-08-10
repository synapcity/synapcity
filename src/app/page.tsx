import dynamic from "next/dynamic"

const GlobalPage = dynamic(
  () => import("@/components/pages/GlobalPage/GlobalPage").then((mod) => mod.default), { ssr: true }
)

export default function Global() {
  return <GlobalPage />
}
