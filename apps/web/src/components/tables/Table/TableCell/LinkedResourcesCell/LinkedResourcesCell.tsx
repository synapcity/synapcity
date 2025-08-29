"use client";
import { LinkedResource } from "@/types/table";
import { Link } from "lucide-react"; // or your icon set

export default function LinkedResourcesCell({ resources }: { resources: LinkedResource[] }) {
  if (!resources || resources.length === 0) return null;
  return (
    <div className="flex gap-2 flex-wrap">
      {resources.map((res) => (
        <a
          key={res.resourceId}
          href={`/${res.type}/${res.resourceId}`}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-xs"
        >
          <Link className="h-3 w-3" />
          {res.label}
        </a>
      ))}
    </div>
  );
}
