import type { Metadata } from "next";
import { Inter, Space_Mono, Space_Grotesk } from "next/font/google";
import { defaultOG, defaultTwitter } from "@/lib/metadata";
import { Toaster } from "sonner";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading/Loading/Loading";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Synapcity — Your Second Brain",
  description: "Capture, connect, and create with your digital thoughtspace.",
  keywords: ["notes", "second brain", "Zettelkasten", "productivity", "Synapcity"],
  openGraph: {
    ...defaultOG,
    title: "Synapcity — Your Second Brain",
    description: "Capture, connect, and create with your digital thoughtspace.",
  },
  twitter: {
    ...defaultTwitter,
    title: "Synapcity — Your Second Brain",
    description: "Capture, connect, and create with your digital thoughtspace.",
  }
};

const GlobalProvider = dynamic(() => import("./GlobalProvider").then((mod) => mod.default), { ssr: true })
const GlobalLayout = dynamic(() => import("./GlobalLayout").then((mod) => mod.default), { ssr: true })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}
      >
        <GlobalProvider>
          <GlobalLayout>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Toaster position="top-left" />
          </GlobalLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
