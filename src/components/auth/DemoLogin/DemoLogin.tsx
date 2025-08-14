"use client";

import { useRouter } from "next/navigation";
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
      router.push("/home");
      setHydrated(true);
    }
  };

  return (
    <Button onClick={onLogin} asChild={asChild} {...props}>
      {children}
    </Button>
  );
}
