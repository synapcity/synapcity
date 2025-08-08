"use client";

import {
	useAnimation,
	AnimationDefinition,
	useMotionValue,
} from "framer-motion";
import { useCallback, useEffect } from "react";
import {
	containerVariants,
	scrollVariants as scrollAnimation,
} from "@/landing-page/lib/variants";

export const useMotionManager = () => {
	const controls = useAnimation();
	const x = useMotionValue(0);

	const startScroll = useCallback(
		() => controls.start(scrollAnimation as AnimationDefinition),
		[controls]
	);

	const stopScroll = () => controls.stop();
	const resetPosition = () => controls.set({ x: 0 });

	useEffect(() => {
		startScroll();
	}, [startScroll]);

	return {
		controls,
		x,
		containerVariants,
		startScroll,
		stopScroll,
		resetPosition,
	};
};
