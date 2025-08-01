"use client";

import * as React from "react";

export interface CardItemBase {
	id: string;
	title?: string;
	subtitle?: string;
	onClick?: () => void;
}

type VisibilityState = "visible" | "hidden";

export function useLazyMountWithExpiry(
	ref: React.RefObject<HTMLDivElement>,
	rootMargin: string,
	expiryMs: number
) {
	const [mounted, setMounted] = React.useState(false);
	const lastVisibleRef = React.useRef<number | null>(null);
	const visibilityRef = React.useRef<VisibilityState>("hidden");
	const expiryTimerRef = React.useRef<number | null>(null);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibilityRef.current = "visible";
						lastVisibleRef.current = performance.now();
						if (expiryTimerRef.current) {
							window.clearTimeout(expiryTimerRef.current);
							expiryTimerRef.current = null;
						}
						if (!mounted) setMounted(true);
					} else {
						visibilityRef.current = "hidden";
						if (lastVisibleRef.current !== null) {
							if (expiryTimerRef.current)
								window.clearTimeout(expiryTimerRef.current);
							expiryTimerRef.current = window.setTimeout(() => {
								if (visibilityRef.current === "hidden") {
									setMounted(false);
									lastVisibleRef.current = null;
									expiryTimerRef.current = null;
								}
							}, expiryMs);
						}
					}
				});
			},
			{
				root: null,
				rootMargin,
				threshold: 0.01,
			}
		);

		observer.observe(el);
		return () => {
			observer.disconnect();
			if (expiryTimerRef.current) window.clearTimeout(expiryTimerRef.current);
		};
	}, [ref, rootMargin, expiryMs, mounted]);

	return mounted;
}
