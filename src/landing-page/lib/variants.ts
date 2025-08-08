import { Variants } from "framer-motion";

export const containerVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

export const scrollVariants = {
	hidden: { opacity: 0, x: 0 },
	visible: {
		opacity: 1,
		x: ["0%", "-100%"],
		transition: {
			repeat: Infinity,
			repeatType: "loop",
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
};

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export const fadeOut: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export const scrollFadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
};

export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const slideInLeft: Variants = {
	hidden: { opacity: 0, x: -100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const slideInBottom: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};
