export const siteBaseURL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://official-synapcity.vercel.app/";
export const siteName = "Synapcity";
export const defaultImage = `${siteBaseURL}/og-image.png`;

export const runtime = "nodejs"

export const defaultOG = {
	url: siteBaseURL,
  metadataBase: siteBaseURL,
	siteName,
	 icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/manifest.webmanifest",
      },
    ],
  },
	images: [
		{
			url: defaultImage,
			width: 1200,
			height: 630,
			alt: "Synapcity",
		},
	],
	type: "website",
};

export const defaultTwitter = {
	card: "summary_large_image" as const,
	images: [defaultImage],
};
