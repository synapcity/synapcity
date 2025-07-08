export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant =
	| "primary"
	| "outline"
	| "link"
	| "ghost"
	| "destructive"
	| "disabled"
	| "loading";

export const baseButtonStyles =
	"inline-flex items-center justify-center rounded font-medium transition-all duration-200 ease-linear outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:cursor-pointer shadow-sm hover:shadow-md hover:scale-105 [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 text-xs font-mono tracking-wide disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none data-[state=loading]:cursor-wait data-[state=loading]:opacity-50 data-[state=loading]:pointer-events-none hover:cursor-pointer data-[state=loading]:hover:cursor-wait";

export const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-[var(--primary-foreground)] text-[var(--primary-background)] hover:text-[var(--primary-foreground)] hover:bg-[var(--primary-background)] border border-[var(--primary)] data-[state=active]:bg-[var(--accent)] hover:border-[var(--primary-700)] active:bg-[var(--primary-200)] focus-visible:ring-[var(--primary-200)]",
	outline:
		"bg-[var(--background)] text-[var(--foreground)] border border-[var(--accent)] hover:bg-[var(--accent)] data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--primary-100)] hover:text-[var(--primary-100)]",
	link: "text-[var(--primary-foreground)] hover:text-[var(--accent-500)] underline-offset-4 hover:underline shadow-none hover:shadow-none data-[state=active]:text-[var(--accent-900)] data-[state=active]:bg-[var(--accent-50)]",
	ghost:
		"text-[var(--accent-foreground)] hover:bg-[var(--accent-foreground)] hover:text-[var(--accent-background)] hover:border active:bg-[var(--primary-200)] shadow-none hover:shadow-sm active:shadow-none data-[state=active]:bg-[var(--primary-300)] data-[state=active]:text-[var(--primary-foreground)] disabled:hover:shadow-none disabled:hover:bg-transparent disabled:pointer-events-none disabled:hover:scale-none",
	destructive:
		"text-red-600 hover:text-white hover:bg-red-500 active:bg-red-600 focus-visible:ring-red-200",
	disabled:
		"bg-gray-300 text-gray-500 hover:cursor-not-allowed opacity-50 disabled:opacity-50 pointer-events-none",
	loading:
		"opacity-50 text-[var(--foreground)]/50 hover:cursor-wait data-[state=loading]:opacity-50 hover:cursor-wait",
};

export const sizeClasses: Record<ButtonSize, string> = {
	xs: "py-1 px-2 text-xs",
	sm: "py-1.25 px-2.5 text-sm",
	md: "py-1.25 px-3.5 text-sm",
	lg: "py-1.5 px-4 text-base",
	xl: "py-2 px-4 text-base",
};

export const iconSizeClasses: Record<ButtonSize, string> = {
	xs: "h-6 px-2",
	sm: "h-7 px-3",
	md: "h-8 px-4",
	lg: "h-9 px-5",
	xl: "h-10 px-6",
};
