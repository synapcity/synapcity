"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, hasHydrated } = useUserStore(
    useShallow(({ isLoggedIn, hasHydrated }) => ({ isLoggedIn, hasHydrated }))
  );

  useEffect(() => {
    if (!hasHydrated) return;

    if (isLoggedIn && pathname === "/") {
      router.replace("/home");
    } else if (!isLoggedIn && pathname.startsWith("/home")) {
      router.replace("/");
    }
  }, [hasHydrated, isLoggedIn, pathname, router]);
}
