"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore, userJane } from "@/stores/userStore";
import { Button, ButtonProps } from "@/components/atoms";
import React from "react";

export function DemoLogin({
  children,
  asChild = true,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & ButtonProps) {
  const router = useRouter();
  const from = useSearchParams().get("from") ?? "/dashboard";
  const login = useUserStore((s) => s.login);
  const setHydrated = useUserStore((s) => s.setHasHydrated);

  const onLogin = async () => {
    // 1) server cookie (visible to middleware/SSR)
    await fetch("/api/auth/demo-login", { method: "POST" });
    // 2) client state for UX
    login(userJane);
    setHydrated(true);
    router.replace(from);
  };

  return (
    <Button onClick={onLogin} asChild={asChild} {...props}>
      {children}
    </Button>
  );
}
