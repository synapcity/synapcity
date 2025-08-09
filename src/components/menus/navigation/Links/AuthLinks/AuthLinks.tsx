"use client";

import { CommandMenu } from "@/components/molecules/CommandMenu/CommandMenu";
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown";
import { NavLinkGroup } from "../NavLinkGroup";
import { userJane, useUserStore } from "@/stores/userStore";
import { Spinner } from "@/components/atoms";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

export function AuthLinks() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn, hasHydrated } = useUserStore(useShallow(state => ({
    isLoggedIn: state.isLoggedIn,
    hasHydrated: state.hasHydrated,
  })))
  const user = useUserStore(useShallow(state => state.user))
  const login = useUserStore(state => state.login)
  const logout = useUserStore(state => state.logout)
  const loading = useUserStore(state => state.loading)

  useEffect(() => {

    if (hasHydrated && isLoggedIn && pathname === "/") {
      router.push('/home')
    }
  }, [hasHydrated, isLoggedIn, pathname, router])

  if (!hasHydrated) {
    return null
  }
  if (!isLoggedIn) {
    return (
      <NavLinkGroup
        direction="horizontal"
        items={[
          {
            id: "login",
            label: "Login",
            href: "#",
            onClick: () => {
              login(userJane)
              router.push('/home')
            },
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
    return <Spinner className="animate-spin" />
  }

  return (
    <div className="flex items-center gap-2">
      <CommandMenu groups={[]} />
      <AvatarDropdown
        avatarUrl={user?.avatar ?? ""}
        username={user?.username ?? ""}
        fallbackIcon="User"
        onEdit={() => console.log("Edit profile")}
        onLogout={() => {
          logout()
          router.push('/')
        }}
      />
    </div>
  );
}
