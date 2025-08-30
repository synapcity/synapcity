import type { Metadata, Viewport } from "next";
import { defaultOG, defaultTwitter } from "@/lib/metadata";
import { Toaster } from "sonner";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading/Loading/Loading";
import "../styles/globals.css";
import { fontVars } from "@/lib/theme/fonts";
import { Analytics } from "@vercel/analytics/next";

const appBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
  title: {
    default: "Synapcity - Your Second Brain",
    template: "%s | Synapcity",
  },
  description: "Capture, connect, and create with your digital thoughtspace.",
  keywords: ["notes", "second brain", "Zettelkasten", "productivity", "Synapcity"],
  openGraph: {
    ...defaultOG,
    type: "website",
    title: "Synapcity — Your Second Brain",
    siteName: "Synapcity",
    description: "Capture, connect, and create with your digital thoughtspace.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Synapcity",
      },
    ],
  },
  twitter: {
    ...defaultTwitter,
    title: "Synapcity — Your Second Brain",
    description: "Capture, connect, and create with your digital thoughtspace.",
    // images: ["./twitter-image.tsx"],
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const GlobalProvider = dynamic(() => import("./GlobalProvider").then((mod) => mod.default), {
  ssr: true,
});
const GlobalLayout = dynamic(() => import("./GlobalLayout").then((mod) => mod.default), {
  ssr: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={fontVars}>
        <GlobalProvider>
          <GlobalLayout>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster position="top-left" />
          </GlobalLayout>
        </GlobalProvider>
        <Analytics />
      </body>
    </html>
  );
}
