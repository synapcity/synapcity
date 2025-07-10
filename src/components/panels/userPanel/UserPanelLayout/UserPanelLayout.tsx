"use client"

import { SidebarInset } from "@/components/atoms/ui/sidebar"
import React from "react"
import { UserPanel } from "../UserPanel/UserPanel"

export function UserPanelLayout() {
  return (
    <SidebarInset>
      <main className="max-w-7xl min-h-full w-full mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <UserPanel />
      </main>
    </SidebarInset>
  )
}