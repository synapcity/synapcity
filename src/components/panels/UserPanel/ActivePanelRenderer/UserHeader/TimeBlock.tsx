"use client";

import { format } from "date-fns";

export const TimeBlock = ({ time }: { time: Date }) => {
  return (
    <div className="text-sm text-muted-foreground">
      {format(time, "EEEE, MMMM do yyyy • HH:mm zzz")}
    </div>
  );
};
