"use client";

import { usePathname } from "next/navigation";

export function useNavLinkActive(href: string) {
  const pathname = usePathname();
  if (!href) return false;

  if (href === "/home") {
    return pathname === "/home";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
