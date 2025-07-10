export const siteBaseURL = "https://synapcity.app";
export const siteName = "Synapcity";
export const defaultImage = `${siteBaseURL}/og-image.png`;

export const defaultOG = {
	url: siteBaseURL,
	siteName,
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
