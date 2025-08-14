"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import React from "react";
import { Button } from "@/components/atoms";

export function DemoLogout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const logout = useUserStore((s) => s.logout);

  const onLogout = async () => {
    try {
      await fetch("/api/auth/demo-logout", { method: "POST" });
    } catch (err) {
      console.error(`Error logging out: ${err}`);
    } finally {
      logout();
      router.replace("/");
    }
  };

  return (
    <Button onClick={onLogout} asChild>
      {children}
    </Button>
  );
}
