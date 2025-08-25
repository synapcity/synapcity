// app/og/route.tsx  (or app/api/og/route.tsx)
import { ImageResponse } from "next/og";

export const runtime = "edge"; // fast & recommended
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const title = (searchParams.get("title") ?? "Synapcity").slice(0, 120);
  const tagline = (searchParams.get("tagline") ?? "Notes + Dashboards for Thinkers").slice(0, 160);

  const primary = searchParams.get("primary") ?? "#4F46E5";
  const accent = searchParams.get("accent") ?? "#06B6D4";
  const dark = searchParams.get("dark") ?? "#111827";

  const logoUrl = `${origin}/logo-og.png`; // put logo at /public/logo-og.png

  return new ImageResponse(
    (
      <div
        style={
          {
            "--primary": primary,
            "--accent": accent,
            "--dark": dark,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--accent) 55%, var(--dark) 100%)",
            color: "white",
            padding: 64,
            boxSizing: "border-box",
          } as React.CSSProperties
        }
      >
        {/* Left: logo */}
        <div
          style={{
            width: 280,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 48,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 32,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            <img
              src={logoUrl}
              width={180}
              height={180}
              alt="Synapcity logo"
              style={{ display: "block", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Right: title + tagline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -1.2,
              lineHeight: 1.02,
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              opacity: 0.95,
              lineHeight: 1.25,
              maxWidth: 800,
              textShadow: "0 1px 18px rgba(0,0,0,0.35)",
            }}
          >
            {tagline}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <div
              style={{
                fontSize: 24,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
              }}
            >
              Next.js • Zustand • Lexical
            </div>
            <div
              style={{
                fontSize: 24,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
              }}
            >
              Tailwind v4 (OKLCH)
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
