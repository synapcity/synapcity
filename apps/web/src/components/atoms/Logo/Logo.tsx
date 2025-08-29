"use client";

import * as React from "react";

type Variant = "mark" | "monogram" | "mono";
type Palette = "auto" | "primary" | "accent" | "foreground" | "custom";

export interface SynapcityLogoProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Visual variant:
   * - "mark": rounded tile + synapse motif (gradient)
   * - "monogram": rounded tile + bold “S”
   * - "mono": simple single-color mark using currentColor (great for headers)
   */
  variant?: Variant;
  /**
   * Color palette:
   * - "auto": gradient uses var(--primary)/var(--accent); text uses var(--foreground)
   * - "primary" | "accent" | "foreground": sets currentColor accordingly
   * - "custom": use `customColor` for currentColor (mono variant only)
   */
  palette?: Palette;
  customColor?: string;
  size?: number;
  /** Title for a11y; if omitted, `aria-hidden` is set. */
  title?: string;
}

/** Small util: converts numeric size to width/height props */
function sizeProps(size?: number) {
  return size ? { width: size, height: size } : {};
}

/**
 * SynapcityLogo
 * Inline SVG that respects CSS variables when rendered in the DOM.
 * Use as a React component for theme-aware colors.
 */
export function Logo({
  variant = "mark",
  palette = "auto",
  customColor,
  size,
  title,
  className,
  ...props
}: SynapcityLogoProps) {
  const color =
    palette === "primary"
      ? "var(--primary)"
      : palette === "accent"
        ? "var(--accent)"
        : palette === "foreground"
          ? "var(--foreground)"
          : palette === "custom"
            ? (customColor ?? "currentColor")
            : "currentColor";

  if (variant === "mono") {
    // Single-color glyph that follows `currentColor`.
    return (
      <svg
        viewBox="0 0 512 512"
        role={title ? "img" : "presentation"}
        aria-hidden={title ? undefined : true}
        className={className}
        {...sizeProps(size)}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        <g fill="none" stroke={color} strokeLinecap="round">
          {/* rounded tile outline */}
          <rect x="36" y="36" width="440" height="440" rx="92" strokeWidth="28" />
          {/* synapse curves */}
          <path d="M148 332 C 210 256, 302 256, 364 180" strokeWidth="28" opacity="0.95" />
          <path d="M148 180 C 210 256, 302 256, 364 332" strokeWidth="20" opacity="0.45" />
        </g>
        {/* nodes */}
        <circle cx="148" cy="332" r="20" fill={color} />
        <circle cx="364" cy="180" r="20" fill={color} />
        <circle cx="364" cy="332" r="14" fill={color} opacity="0.65" />
      </svg>
    );
  }

  if (variant === "monogram") {
    // Rounded tile + bold 'S' monogram, gradient background like the mark.
    return (
      <svg
        viewBox="0 0 512 512"
        role={title ? "img" : "presentation"}
        aria-hidden={title ? undefined : true}
        className={className}
        {...sizeProps(size)}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        <defs>
          <linearGradient
            id="synapcity-g"
            x1="96"
            y1="96"
            x2="416"
            y2="416"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" className="syn-primary-stop" />
            <stop offset="1" className="syn-accent-stop" />
          </linearGradient>
        </defs>
        <style>
          {`
          .syn-primary-stop { stop-color: var(--primary, oklch(65% 0.12 210)); }
          .syn-accent-stop  { stop-color: var(--accent,  oklch(72% 0.14 215)); }
          .syn-fg { fill: var(--foreground, #0b1220); }
        `}
        </style>
        <rect x="32" y="32" width="448" height="448" rx="96" fill="url(#synapcity-g)" />
        {/* Bold S */}
        <path
          className="syn-fg"
          d="
            M 360 180
            C 360 150, 328 136, 300 136
            L 212 136
            C 184 136, 152 156, 152 188
            C 152 212, 168 232, 196 240
            L 276 264
            C 304 272, 320 292, 320 316
            C 320 344, 296 364, 268 364
            L 204 364
            C 180 364, 164 376, 152 392
            L 152 392
            C 168 408, 192 416, 212 416
            L 300 416
            C 344 416, 376 380, 376 336
            C 376 300, 352 272, 316 260
            L 236 236
            C 220 232, 204 220, 204 200
            C 204 188, 216 180, 228 180
            L 300 180
            C 320 180, 344 168, 360 152
            Z"
          fillRule="evenodd"
          fill="var(--foreground, #0b1220)"
          opacity="0.92"
        />
      </svg>
    );
  }

  // Default: "mark" — rounded tile + synapse motif with gradient, inline + theme-aware
  return (
    <svg
      viewBox="0 0 512 512"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={className}
      {...sizeProps(size)}
      {...props}
      // If palette != auto, push a currentColor that children can use (e.g., strokes)
      style={palette === "auto" ? undefined : { color, ...(props.style || {}) }}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient
          id="synapcity-g"
          x1="96"
          y1="96"
          x2="416"
          y2="416"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" className="syn-primary-stop" />
          <stop offset="1" className="syn-accent-stop" />
        </linearGradient>
        <filter
          id="syn-soft"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.18" />
        </filter>
      </defs>
      <style>
        {`
        .syn-primary-stop { stop-color: var(--primary, oklch(65% 0.12 210)); }
        .syn-accent-stop  { stop-color: var(--accent,  oklch(72% 0.14 215)); }
      `}
      </style>

      {/* Tile */}
      <rect x="32" y="32" width="448" height="448" rx="96" fill="url(#synapcity-g)" />

      {/* Connections */}
      <g filter="url(#syn-soft)">
        <path
          d="M148 332 C 210 256, 302 256, 364 180"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 180 C 210 256, 302 256, 364 332"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Nodes */}
      <circle cx="148" cy="332" r="24" fill="white" fillOpacity="0.95" />
      <circle cx="364" cy="180" r="24" fill="white" fillOpacity="0.95" />
      <circle cx="364" cy="332" r="18" fill="white" fillOpacity="0.65" />
    </svg>
  );
}

export default Logo;
