import { Spinner } from "@/components/atoms/Spinner/Spinner"
import dynamic from "next/dynamic"

const GlobalPage = dynamic(() => import("@/components/pages/GlobalPage").then((mod) => mod.default), {
  ssr: true,
  loading: () => <div className="absolute inset-0 flex items-center justify-center"><Spinner size={16} /></div>
})

export default function Home() {
  return <GlobalPage />
}
