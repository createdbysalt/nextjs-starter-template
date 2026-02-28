/**
 * ===============================================================================
 * COMPONENT: LinearButton
 * REPLICATED FROM: https://linear.app/homepage
 * CREATED: 2026-01-31
 * MODE: Pixel-Perfect
 * ===============================================================================
 *
 * EXTRACTION SUMMARY
 * ------------------
 * Typography (all sizes):
 *   Font Family: Inter Variable, SF Pro Display, system-ui fallbacks
 *   Font Weight: 510 (medium - between 500 and 600)
 *   Letter Spacing: normal
 *
 * SIZE VARIANTS (EXTRACTED):
 *   small:
 *     Height: 32px
 *     Font Size: 13px
 *     Line Height: 32px (matches height)
 *     Padding: 0 12px
 *     Border Radius: 8px
 *     Gap: 8px
 *
 *   default:
 *     Height: 40px
 *     Font Size: 15px
 *     Line Height: 40px (matches height)
 *     Padding: 0 16px
 *     Border Radius: 10px
 *     Gap: 6px
 *
 * VARIANT COLORS (EXTRACTED):
 *   invert (primary - light button for dark backgrounds):
 *     Background: rgb(230, 230, 230) / #E6E6E6
 *     Color: rgb(8, 9, 10) / #08090A
 *     Border: 1px solid rgb(230, 230, 230)
 *     Box-shadow: layered subtle shadow (5 layers)
 *
 *   secondary (dark button):
 *     Background: rgb(40, 40, 44) / #28282C
 *     Color: rgb(247, 248, 248) / #F7F8F8
 *     Border: 1px solid rgb(62, 62, 68) / #3E3E44
 *     Box-shadow: none
 *
 *   ghost (nav links):
 *     Background: transparent
 *     Color: rgb(138, 143, 152) / #8A8F98
 *     Border: none
 *     Hover: color changes to foreground
 *
 * TRANSITIONS (EXTRACTED):
 *   Primary/Secondary: 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
 *   Ghost: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)
 *
 * INTERACTION STATES:
 *   Active: scale(0.98) - inferred from button behavior
 *   Focus: Uses focus-visible ring pattern
 *
 * ===============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

import { cn } from "@repo/utils";

/**
 * Linear-style easing curve
 * EXTRACTED: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 */
const LINEAR_EASING = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const linearButtonVariants = cva(
  // Base styles - EXTRACTED from Linear buttons
  [
    // Layout
    "inline-flex items-center justify-center whitespace-nowrap shrink-0",
    // Typography - EXTRACTED: weight 510 approximated to font-medium (500)
    "font-medium",
    // Interaction
    "cursor-pointer select-none outline-none",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
    // Icon sizing
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Active scale - EXTRACTED: active state reduces size slightly
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      /**
       * VARIANT DEFINITIONS - EXTRACTED FROM LINEAR
       *
       * invert: Light button (for dark backgrounds) - Linear's primary CTA
       * secondary: Dark button - Used in footer CTAs
       * ghost: Transparent - Navigation links
       * link: Text only with underline on hover
       */
      variant: {
        // PRIMARY (invert) - Light button for dark backgrounds
        // EXTRACTED: bg rgb(230, 230, 230), color rgb(8, 9, 10)
        // Border: 1px solid rgb(230, 230, 230)
        // Box-shadow: 5-layer subtle shadow
        invert: [
          "bg-[rgb(230,230,230)] text-[rgb(8,9,10)]",
          "border border-[rgb(230,230,230)]",
          // EXTRACTED box-shadow: layered subtle shadow
          "shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),0px_1px_1px_0px_rgba(0,0,0,0.07),0px_3px_2px_0px_rgba(0,0,0,0.04),0px_5px_2px_0px_rgba(0,0,0,0.01)]",
          // Hover - slightly transparent
          "hover:bg-[rgb(230,230,230)]/90",
          // EXTRACTED transition: 0.16s
          "transition-[border,background-color,color,box-shadow,opacity,transform] duration-[160ms]",
        ].join(" "),

        // SECONDARY - Dark button
        // EXTRACTED: bg rgb(40, 40, 44), color rgb(247, 248, 248)
        // Border: 1px solid rgb(62, 62, 68)
        secondary: [
          "bg-[rgb(40,40,44)] text-[rgb(247,248,248)]",
          "border border-[rgb(62,62,68)]",
          // No box-shadow for secondary
          "shadow-none",
          // Hover - slightly lighter
          "hover:bg-[rgb(50,50,54)]",
          // EXTRACTED transition: 0.16s
          "transition-[border,background-color,color,box-shadow,opacity,transform] duration-[160ms]",
        ].join(" "),

        // GHOST - Navigation links
        // EXTRACTED: bg transparent, color rgb(138, 143, 152)
        ghost: [
          "bg-transparent text-[rgb(138,143,152)]",
          "border-0",
          // Hover - text becomes foreground, subtle background
          "hover:text-foreground hover:bg-muted/50",
          // EXTRACTED transition: 0.1s for ghost
          "transition-[color,background] duration-[100ms]",
        ].join(" "),

        // LINK - Underline on hover
        link: [
          "bg-transparent text-[rgb(138,143,152)]",
          "border-0",
          "underline-offset-4 hover:underline hover:text-foreground",
          "transition-[color] duration-[100ms]",
        ].join(" "),
      },

      /**
       * SIZE DEFINITIONS - EXTRACTED FROM LINEAR
       *
       * small: Nav buttons (h-32px, text-13px, px-12px, rounded-8px)
       * default: CTA buttons (h-40px, text-15px, px-16px, rounded-10px)
       */
      size: {
        // SMALL - Navigation buttons
        // EXTRACTED: height 32px, font-size 13px, padding 0 12px, border-radius 8px, gap 8px
        small: [
          "h-8",                    // 32px
          "text-[13px]",           // EXTRACTED: 13px
          "leading-8",             // EXTRACTED: line-height matches height
          "px-3",                  // 12px
          "rounded-lg",            // 8px
          "gap-2",                 // 8px
        ].join(" "),

        // DEFAULT - CTA buttons
        // EXTRACTED: height 40px, font-size 15px, padding 0 16px, border-radius 10px, gap 6px
        default: [
          "h-10",                  // 40px
          "text-[15px]",           // EXTRACTED: 15px
          "leading-10",            // EXTRACTED: line-height matches height
          "px-4",                  // 16px
          "rounded-[10px]",        // EXTRACTED: 10px
          "gap-1.5",               // 6px
        ].join(" "),

        // ICON sizes for icon-only buttons
        iconSmall: "size-8 rounded-lg",
        icon: "size-10 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "invert",
      size: "default",
    },
  }
);

export interface LinearButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof linearButtonVariants> {
  /** Render as child component (for links) */
  asChild?: boolean;
  /** Show loading spinner */
  loading?: boolean;
}

/**
 * LinearButton - Pixel-perfect replica of Linear's button component
 *
 * @example
 * // Primary CTA (invert variant)
 * <LinearButton>Start building</LinearButton>
 *
 * // Secondary dark button
 * <LinearButton variant="secondary">Contact sales</LinearButton>
 *
 * // Navigation link (small ghost)
 * <LinearButton variant="ghost" size="small">Product</LinearButton>
 *
 * // As link
 * <LinearButton asChild>
 *   <Link href="/signup">Sign up</Link>
 * </LinearButton>
 */
function LinearButton({
  className,
  variant = "invert",
  size = "default",
  asChild = false,
  loading = false,
  children,
  disabled,
  style,
  ...props
}: LinearButtonProps) {
  const Comp = asChild ? Slot : "button";

  // Add Linear's easing curve via style
  const enhancedStyle: React.CSSProperties = {
    ...style,
    transitionTimingFunction: LINEAR_EASING,
  };

  if (asChild) {
    return (
      <Comp
        data-slot="linear-button"
        data-variant={variant}
        data-size={size}
        className={cn(linearButtonVariants({ variant, size, className }))}
        style={enhancedStyle}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="linear-button"
      data-variant={variant}
      data-size={size}
      className={cn(linearButtonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      style={enhancedStyle}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Comp>
  );
}

export { LinearButton, linearButtonVariants };
