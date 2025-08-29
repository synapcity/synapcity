// apps/web/app/manifest.ts
import type { MetadataRoute } from "next";

const defaultManifest = {
  name: "SynapCity - Your Second Brain",
  short_name: "SynapCity",
  description: "Capture, connect, and create with your digital thoughtspace.",
  id: "/",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#000000",
  icons: [
    { src: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    { src: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    { src: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
    { src: "/icon-64x64.png", sizes: "64x64", type: "image/png" },
    { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
    { src: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
    { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
} satisfies MetadataRoute.Manifest;

export default function manifest(): MetadataRoute.Manifest {
  return defaultManifest;
}
