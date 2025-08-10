import createAnalyzer from "@next/bundle-analyzer";

const ContentSecurityPolicy = `
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src * blob: data:;
media-src 'none';
connect-src 'self';
font-src 'self';
`;

// Security headers applied to every response. Each entry documents the
// threat it mitigates or the behavior it enforces to aid future maintainers.
const securityHeaders = [
  // Lock down allowed origins to mitigate XSS attacks.
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // Strip the Referrer header entirely to avoid leaking URLs.
  { key: "Referrer-Policy", value: "no-referrer" },
  // Disallow rendering in iframes to prevent clickjacking.
  { key: "X-Frame-Options", value: "DENY" },
  // Enforce declared MIME types and disable sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Enable proactive DNS resolution for linked domains.
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Force HTTPS for two years and allow browsers to preload the rule.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Explicitly opt out of camera, microphone, and geolocation APIs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const withBundleAnalyzer = createAnalyzer({
enabled: process.env.ANALYZE === "true",

});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Expose security headers for all routes.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
});

export default nextConfig;