import createAnalyzer from "@next/bundle-analyzer";

const isDev = process.env.NODE_ENV !== "production";

const withBundleAnalyzer = createAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  compiler: { removeConsole: isDev },
});

export default nextConfig;
