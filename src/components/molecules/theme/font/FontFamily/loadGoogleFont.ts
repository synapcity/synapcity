export const GOOGLE_FONTS = [
	"Inter",
	"Space Grotesk",
	"Space Mono",
	"Roboto",
	"Fira Code",
	"Lora",
	"Playfair Display",
	"IBM Plex Sans",
	"JetBrains Mono",
	"Open Sans",
	"Merriweather",
	"Rubik",
	"DM Sans",
	"Comic Neue",
	"Noto Serif",
	"Raleway",
	"Source Code Pro",
];
export function loadGoogleFont(fontName: string) {
	const formatted = fontName.replace(/ /g, "+");
	const href = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;
	if (document.querySelector(`link[href="${href}"]`)) return;
	if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
		const preconnect = document.createElement("link");
		preconnect.rel = "preconnect";
		preconnect.href = "https://fonts.googleapis.com";
		document.head.appendChild(preconnect);
	}
	if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
		const preconnect = document.createElement("link");
		preconnect.rel = "preconnect";
		preconnect.href = "https://fonts.gstatic.com";
		preconnect.crossOrigin = "";
		document.head.appendChild(preconnect);
	}
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = href;
	document.head.appendChild(link);
}
