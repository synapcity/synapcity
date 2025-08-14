"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import React from "react";
import { Button } from "@/components/atoms";

export async function demoLogout(redirect?: () => void) {
  try {
    await fetch("/api/auth/demo-logout", { method: "POST" });
  } catch (err) {
    console.error(`Error logging out: ${err}`);
  } finally {
    useUserStore.getState().logout();
    redirect?.();
  }
}

export function DemoLogout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onLogout = () => demoLogout(() => router.replace("/"));

  return (
    <Button onClick={onLogout} asChild>
      {children}
    </Button>
  );
}
