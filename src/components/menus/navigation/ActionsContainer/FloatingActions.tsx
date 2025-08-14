"use client";

import { createPortal } from "react-dom";
import { AvatarDropdown } from "../../dropdown";
import { mobileAvatarMenu } from "@/lib";
import { useUserStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export function FloatingActions() {
  const user = useUserStore(useShallow((s) => s.user));
  if (typeof window === "undefined") return null;
  return createPortal(
    <div className="fixed bottom-4 right-4 z-[100] md:hidden">
      <AvatarDropdown
        avatarUrl={user?.avatar ?? ""}
        username={user?.username ?? ""}
        fallbackIcon="user"
        items={mobileAvatarMenu}
      />
    </div>,
    document.body
  );
}
