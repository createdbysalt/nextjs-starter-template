/**
 * TYPE DEFINITIONS: LinearButton
 * REPLICATED FROM: https://linear.app/homepage
 */

import type { VariantProps } from "class-variance-authority";
import type { linearButtonVariants } from "./linear-button";

/**
 * LinearButton variant types
 */
export type LinearButtonVariant = NonNullable<
  VariantProps<typeof linearButtonVariants>["variant"]
>;

export type LinearButtonSize = NonNullable<
  VariantProps<typeof linearButtonVariants>["size"]
>;

/**
 * Extracted style tokens from Linear buttons
 * These can be used for custom implementations or reference
 */
export const LINEAR_BUTTON_TOKENS = {
  /** Linear's transition easing curve */
  easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",

  /** Transition durations */
  durations: {
    default: "160ms",
    ghost: "100ms",
  },

  /** Color palette - EXTRACTED */
  colors: {
    invert: {
      background: "rgb(230, 230, 230)",
      backgroundHex: "#E6E6E6",
      foreground: "rgb(8, 9, 10)",
      foregroundHex: "#08090A",
      border: "rgb(230, 230, 230)",
    },
    secondary: {
      background: "rgb(40, 40, 44)",
      backgroundHex: "#28282C",
      foreground: "rgb(247, 248, 248)",
      foregroundHex: "#F7F8F8",
      border: "rgb(62, 62, 68)",
      borderHex: "#3E3E44",
    },
    ghost: {
      background: "transparent",
      foreground: "rgb(138, 143, 152)",
      foregroundHex: "#8A8F98",
    },
  },

  /** Size specifications - EXTRACTED */
  sizes: {
    small: {
      height: "32px",
      fontSize: "13px",
      lineHeight: "32px",
      paddingX: "12px",
      borderRadius: "8px",
      gap: "8px",
    },
    default: {
      height: "40px",
      fontSize: "15px",
      lineHeight: "40px",
      paddingX: "16px",
      borderRadius: "10px",
      gap: "6px",
    },
  },

  /** Box shadow for invert variant - EXTRACTED */
  shadow: {
    invert: [
      "rgba(0, 0, 0, 0) 0px 8px 2px 0px",
      "rgba(0, 0, 0, 0.01) 0px 5px 2px 0px",
      "rgba(0, 0, 0, 0.04) 0px 3px 2px 0px",
      "rgba(0, 0, 0, 0.07) 0px 1px 1px 0px",
      "rgba(0, 0, 0, 0.08) 0px 0px 1px 0px",
    ].join(", "),
    secondary: "none",
  },

  /** Font specifications - EXTRACTED */
  typography: {
    fontFamily: [
      '"Inter Variable"',
      '"SF Pro Display"',
      "-apple-system",
      '"system-ui"',
      '"Segoe UI"',
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      '"Open Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(", "),
    fontWeight: 510, // Linear uses 510 (between medium 500 and semibold 600)
    letterSpacing: "normal",
  },

  /** Active state - EXTRACTED */
  active: {
    scale: 0.98,
  },
} as const;

/**
 * Props for LinearButton component
 */
export interface LinearButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof linearButtonVariants> {
  /** Render as child component (for links) */
  asChild?: boolean;
  /** Show loading spinner */
  loading?: boolean;
}
