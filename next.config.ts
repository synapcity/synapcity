import createAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
	reactStrictMode: true,
});

export default nextConfig;
