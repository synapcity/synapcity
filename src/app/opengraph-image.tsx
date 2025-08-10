import { defaultAccent, defaultPrimary } from "@/theme";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Synapcity";

export const runtime = "edge";

export default function Image({
  _params,
  searchParams,
}: {
  _params?: Record<string, string>;
  searchParams?: { title?: string; primary?: string; accent?: string };
}) {
  const title = (searchParams?.title ?? "Synapcity").slice(0, 120);

  const primary = searchParams?.primary ?? defaultPrimary.base;
  const accent = searchParams?.accent ?? defaultAccent.base;

  return new ImageResponse(
    (
      <div
        style={{
          "--primary": primary,
          "--accent": accent,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--accent) 60%, #111827 100%)",
          color: "white",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1,
          padding: 64,
        } as React.CSSProperties}
      >
        {title}
      </div>
    ),
    size
  );
}
