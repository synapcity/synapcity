import { FuseResultMatch } from "fuse.js";
import React from "react";

/**
 * Highlights all matched substrings in a text using <mark>.
 */
export function highlightMatches(text: string = "", matches?: FuseResultMatch[]) {
  if (!matches || matches.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    (match.indices as [number, number][]).forEach(([start, end]: [number, number]) => {
      if (start > lastIndex) parts.push(text.slice(lastIndex, start));
      parts.push(
        <mark key={start} className="bg-primary-300 text-primary-900 rounded px-0.5">
          {text.slice(start, end + 1)}
        </mark>
      );
      lastIndex = end + 1;
    });
  });

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
