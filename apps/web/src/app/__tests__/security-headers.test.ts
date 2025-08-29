import nextConfig from "../../../next.config";

describe("security headers", () => {
  test("are defined in Next.js config", async () => {
    const headersConfig = await nextConfig.headers?.();
    const allHeaders = headersConfig?.flatMap((h) => h.headers) ?? [];
    const headerMap = new Map(allHeaders.map(({ key, value }) => [key, value]));
    const expectedCSP =
      "default-src 'self';script-src 'self' 'unsafe-eval' 'unsafe-inline';style-src 'self' 'unsafe-inline';img-src * blob: data:;media-src 'none';connect-src 'self';font-src 'self';";
    expect(headerMap.get("Content-Security-Policy")).toBe(expectedCSP);
    expect(headerMap.get("Referrer-Policy")).toBe("no-referrer");
    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("X-DNS-Prefetch-Control")).toBe("on");
    expect(headerMap.get("Strict-Transport-Security")).toBe(
      "max-age=63072000; includeSubDomains; preload"
    );
    expect(headerMap.get("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=()");
  });
});
