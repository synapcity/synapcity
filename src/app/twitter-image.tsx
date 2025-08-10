import { defaultPrimary, defaultAccent } from "@/theme";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Synapcity";

export const runtime = "nodejs";

export default function Image({
  _params,
  searchParams,
}: {
  _params?: Record<string, string>;
  searchParams?: { title?: string; primary?: string; accent?: string };
}) {
  const primary = searchParams?.primary ?? defaultPrimary.base;
  const accent = searchParams?.accent ?? defaultAccent.base;
  return new ImageResponse(
    (
      <div
        style={
          {
            "--primary": primary,
            "--accent": accent,
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #111827 0%, var(--primary) 45%, var(--accent) 100%)",
            color: "white",
            fontSize: 64,
            fontWeight: 700,
          } as React.CSSProperties
        }
      >
        Synapcity — capture • think • ship
      </div>
    )
  );
}
