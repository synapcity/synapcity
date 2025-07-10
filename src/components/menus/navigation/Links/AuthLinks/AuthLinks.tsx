"use client";

// import { InboxTrigger } from "@/components/atoms/triggers";
import { CommandMenu } from "@/components/molecules/CommandMenu/CommandMenu";
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown";
import { NavLinkGroup } from "../NavLinkGroup";
import { userJane, useUserStore } from "@/stores/userStore";
import { Spinner } from "@/components/atoms";

export function AuthLinks() {
  const isLoggedIn = useUserStore(state => state.isLoggedIn)
  const login = useUserStore(state => state.login)
  const logout = useUserStore(state => state.logout)
  const loading = useUserStore(state => state.loading)
  const user = useUserStore(state => state.user)

  if (!isLoggedIn) {
    return (
      <NavLinkGroup
        direction="horizontal"
        items={[
          {
            id: "login",
            label: "Login",
            href: "#",
            onClick: () => login(userJane),
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
      {/* <InboxTrigger /> */}
      <AvatarDropdown
        avatarUrl={user?.avatar ?? ""}
        username={user?.username ?? ""}
        fallbackIcon="User"
        onEdit={() => console.log("Edit profile")}
        onLogout={logout}
      />
    </div>
  );
}
