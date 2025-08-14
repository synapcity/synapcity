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
  const from = useSearchParams().get("from") ?? "/home";
  const login = useUserStore((s) => s.login);
  const setHydrated = useUserStore((s) => s.setHasHydrated);

  const onLogin = async () => {
    try {
      // 1) server cookie (visible to middleware/SSR)
      await fetch("/api/auth/demo-login", { method: "POST" });
    } catch (err) {
      console.error(`Error logging in: ${err}`);
    } finally {
      login(userJane);
      setHydrated(true);
      router.replace(from);
    }
  };

  return (
    <Button onClick={onLogin} asChild={asChild} {...props}>
      {children}
    </Button>
  );
}
