import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SynapCity -- Your Second Brain",
    short_name: "SynapCity",
    description: "Capture, connect, and create with your digital thoughtspace.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon-64x64.png", sizes: "64x64", type: "image/png" },
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { src: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
