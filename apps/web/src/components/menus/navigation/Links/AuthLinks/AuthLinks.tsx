"use client";

import { CommandMenu } from "@/components/molecules/CommandMenu/CommandMenu";
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown";
import { NavLinkGroup } from "../NavLinkGroup";
import { useUserStore } from "@/stores/userStore";
import { Spinner } from "@/components/atoms";
import { useShallow } from "zustand/shallow";
import { avatarMenu } from "@/lib";
import { useAuthRedirect } from "@/hooks";

export function AuthLinks() {
  const { isLoggedIn, hasHydrated } = useUserStore(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
      hasHydrated: state.hasHydrated,
    }))
  );
  const user = useUserStore(useShallow((state) => state.user));
  const loading = useUserStore((state) => state.loading);
  useAuthRedirect();

  if (!hasHydrated) {
    return null;
  }
  if (!isLoggedIn) {
    return (
      <NavLinkGroup
        direction="horizontal"
        items={[
          {
            id: "login",
            label: "Login",
            href: "/home",
            variant: {
              active: "default",
              inactive: "ghost",
            },
          },
          {
            id: "signup",
            label: "Sign Up",
            href: "/signup",
            variant: {
              active: "default",
              inactive: "outline",
            },
          },
        ]}
      />
    );
  }

  if (loading) {
    return <Spinner className="animate-spin" />;
  }

  return (
    <div className="flex items-center gap-2">
      <CommandMenu groups={[]} />
      <AvatarDropdown
        avatarUrl={user?.avatar ?? ""}
        username={user?.username ?? ""}
        fallbackIcon="User"
        items={avatarMenu}
      />
    </div>
  );
}
