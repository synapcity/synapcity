export const siteBaseURL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://official-synapcity.vercel.app/";
export const siteName = "Synapcity";
export const defaultImage = "/src/app/opengraph-image.tsx";

export const runtime = "nodejs";

const appBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const defaultOG = {
  url: new URL(appBaseUrl),
  metadataBase: new URL(siteBaseURL),
  siteName,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icon-192x192.png" }],
    other: [
      {
        rel: "manifest",
        url: "/manifest.webmanifest",
      },
    ],
  },
  images: [
    {
      url: defaultImage,
      width: 1200,
      height: 630,
      alt: "Synapcity",
    },
  ],
  openGraph: {
    title: "SynapCity - Your Second Brain",
    description: "Capture, connect, and create with your digital thoughtspace.",
    type: "website",
  },
};

export const defaultTwitter = {
  card: "summary_large_image" as const,
  images: [defaultImage],
};
