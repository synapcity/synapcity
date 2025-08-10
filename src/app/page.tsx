import dynamic from "next/dynamic"

const GlobalPage = dynamic(
  () => import("./ClientGlobalPage").then((mod) => mod.default), { ssr: true }
)

export default function Global() {
  return <GlobalPage />;
}