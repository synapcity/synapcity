"use client";

import { IconButton } from "@/components/atoms";
import { useUIStore, useUserStore } from "@/stores";
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown/AvatarDropdown";
import { Separator } from "@/components/atoms/ui/separator";
import { LockToggle } from "@/components/atoms/toggles/LockToggle/LockToggle";

export const UserActions = () => {
  const logout = useUserStore((s) => s.logout);
  const user = useUserStore((s) => s.user);
  const toggleModal = useUIStore((s) => s.toggleCompState);

  return (
    <div className="flex items-center gap-3">
      <IconButton icon="schedule" onClick={() => toggleModal("scheduleModal", "isVisible")} />
      <Separator orientation="vertical" className="h-4" />
      {/* <LockTrigger size="sm" /> */}
      <LockToggle size="sm" />
      <AvatarDropdown
        avatarUrl={user?.avatar ?? ""}
        username={user?.username ?? ""}
        fallbackIcon="User"
        onEdit={() => console.log("Edit profile")}
        onLogout={logout}
      />
    </div>
  );
};
