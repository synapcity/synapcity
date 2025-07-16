"use client"

import { useFormContext } from "react-hook-form";

export function DynamicErrorDisplay() {
  const {
    formState: { errors },
  } = useFormContext();

  const messages: string[] = Object.values(errors)
    .map((e) => {
      if (typeof e === "object" && e !== null && "message" in e && typeof e.message === "string") {
        return e.message;
      }
      return null;
    })
    .filter((msg): msg is string => Boolean(msg));

  if (messages.length === 0) return null;

  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
      {messages.map((msg, i) => (
        <p key={i} className="text-sm">{msg}</p>
      ))}
    </div>
  );
}
