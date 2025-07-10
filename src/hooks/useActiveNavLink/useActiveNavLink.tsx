"use client"

import { usePathname } from "next/navigation"

export function useNavLinkActive(href: string) {
  const pathname = usePathname()
  return pathname === href || (pathname.startsWith(href) && href !== "/")
}
