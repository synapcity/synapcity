export const colord = (color: string) => ({
	mix: () => ({ toHex: () => "#ffffff" }),
	tints: (count: number) => Array(count).fill({ toHex: () => color }),
	shades: (count: number) => Array(count).fill({ toHex: () => color }),
	isValid: () => true,
});
