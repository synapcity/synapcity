"use client"

import { LandingPage } from "@/landing-page/components"
import { useUserStore } from "@/stores"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useShallow } from "zustand/shallow"

export default function GlobalPage() {
  const router = useRouter()
  const isLoggedIn = useUserStore(useShallow(state => state.isLoggedIn))

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home/dashboards')
    }
  }, [isLoggedIn, router])

  return (
    <div className="flex flex-col items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20">
      <LandingPage />
    </div>
  )
}