"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useUserStore((s) => s.hasHydrated);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.replace("/");
    }
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated) return null;
  return <>{children}</>;
}
