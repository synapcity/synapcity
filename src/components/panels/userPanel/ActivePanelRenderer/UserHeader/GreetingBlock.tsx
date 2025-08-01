"use client"

import { useUserStore } from "@/stores";
import { UserWeather } from "../../UserWeather/UserWeather";
import { useGreeting } from "./useGreeting";

export const GreetingBlock = () => {
  const user = useUserStore((s) => s.user);
  const greeting = useGreeting();

  return (
    <div className="flex items-center gap-2 justify-between">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
        {greeting}, {user?.name}
      </h1>
      <UserWeather />
    </div>
  );
};
