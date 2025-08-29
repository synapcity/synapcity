function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Optional: handle Vercel preview separately
  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`; // auto-provided preview domain
  }

  // Default: production URL
  return process.env.NEXT_PUBLIC_SITE_URL;
}

export const siteBaseURL = getBaseUrl();
