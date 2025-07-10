import type { Metadata } from "next";
import { Inter, Space_Mono, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import GlobalProvider from "./GlobalProvider";
import GlobalLayout from "./GlobalLayout";
import { defaultOG, defaultTwitter } from "@/lib/metadata";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Spinner } from "@/components";

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
  },
};
export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}
      >
        <GlobalProvider>
          <GlobalLayout>
            <Suspense fallback={<div className="size-full flex items-center justify-center"><Spinner size={48} /></div>}>
              {children}
            </Suspense>
            {modal}
            <Toaster position="top-left" />
          </GlobalLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
