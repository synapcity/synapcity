import dynamic from "next/dynamic";

const ThemeSheet = dynamic(() => import("@/components/molecules/theme/ThemeSheet/ThemeSheet").then((mod) => mod.ThemeSheet), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

const TestWidget = dynamic(() => import("@/components/molecules/theme/TestWidget").then((mod) => mod.TestWidget), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

export default function GlobalPage() {
  return (
    <div className="flex flex-col items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20">
      <TestWidget />
      <ThemeSheet scope="global" />
    </div>
  )
}