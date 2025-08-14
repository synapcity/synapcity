"use client";

import { Icon } from "@/components/atoms";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Dropdown, DropdownGroup } from "../Dropdown";

export const AvatarDropdown: React.FC<{
  avatarUrl: string;
  username: string;
  fallbackIcon: string;
  items: DropdownGroup[];
}> = ({ avatarUrl, username, fallbackIcon, items }) => {
  return (
    <Dropdown items={items} align="end">
      <button
        type="button"
        aria-label="Account menu"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      >
        {avatarUrl ? (
          <Avatar
            src={avatarUrl}
            alt={username}
            className="rounded-full shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md"
          />
        ) : (
          <Icon
            name={fallbackIcon}
            size={24}
            className="border rounded-full p-0.5 shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md"
          />
        )}
      </button>
    </Dropdown>
  );
};
