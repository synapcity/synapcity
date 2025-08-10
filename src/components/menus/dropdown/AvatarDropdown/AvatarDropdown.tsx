"use client";

import { Icon } from "@/components/atoms";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Dropdown } from "../Dropdown";
import { DropdownMenuTrigger } from "@/components/atoms/ui/dropdown-menu";

export const AvatarDropdown: React.FC<{
  avatarUrl: string;
  username: string;
  onEdit: () => void;
  onLogout: () => void;
  fallbackIcon: string;
}> = ({ avatarUrl, username, onEdit, onLogout, fallbackIcon }) => {
  return (
    <Dropdown
      items={[
        {
          label: "Profile",
          icon: "user",
          onSelect: onEdit,
        },
        "separator",
        {
          label: "Log Out",
          icon: "logOut",
          destructive: true,
          onSelect: onLogout,
        },
      ]}
    >
      <DropdownMenuTrigger>
        {avatarUrl ? (
          <Avatar
            src={avatarUrl}
            alt={username}
            className="rounded-full hover:cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:text-accent"
          />
        ) : (
          <Icon
            name={fallbackIcon}
            size={24}
            className="border rounded-full hover:cursor-pointer hover:border-accent shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105"
          />
        )}
      </DropdownMenuTrigger>
    </Dropdown>
  );
};
