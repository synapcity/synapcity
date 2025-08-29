"use client";

import { useUISidebar, LockTrigger, IconButton } from "@/components/atoms";
import { Separator } from "@/components/atoms/ui/separator";
import { useComponentUIState, useUIStore, useUserStore } from "@/stores";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown/AvatarDropdown";
import { UserWeather } from "../UserWeather/UserWeather";
import { avatarNavItems } from "@/lib";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const UserPanelHeader = () => {
  const [time, setTime] = useState(new Date());
  const user = useUserStore((state) => state.user);
  const state = useComponentUIState("userPanel");
  const isVisible = state.isVisible ?? true;
  // const isModalVisible = useUIStore(state => state.components)["scheduleModal"]?.["isVisible"] ?? false
  const toggleModal = useUIStore((state) => state.toggleCompState);

  const { open } = useUISidebar();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    isVisible && (
      <header
        className={cn(
          "min-h-[3.5rem] md:min-h-[4rem] px-4 py-2 flex items-center justify-around bg-(--background) text-(--foreground) backdrop-blur border-b sticky top-0 transition-shadow shadow-sm z-[100] @container",
          open ? "shadow-md" : "shadow-none"
        )}
      >
        <div className="w-full flex justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-2"
          >
            <div className="flex gap-2 items-center justify-between">
              <h1 className="@sm:text-lg @md:text-xl @lg:text-2xl font-semibold">
                {getGreeting()}, {user?.name}
              </h1>
              <UserWeather />
            </div>
            <div className="text-sm text-[var(--background)] flex gap-4">
              {format(time, "EEEE, MMMM do yyyy • HH:mm zzz")}
            </div>
          </motion.div>
          <IconButton icon="schedule" onClick={() => toggleModal("scheduleModal", "isVisible")} />
          <div className="flex items-center gap-2">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <LockTrigger size="sm" />
            <AvatarDropdown
              avatarUrl={user?.avatar ?? ""}
              username={user?.username ?? ""}
              fallbackIcon="User"
              items={avatarNavItems}
            />
          </div>
        </div>
      </header>
    )
  );
};
