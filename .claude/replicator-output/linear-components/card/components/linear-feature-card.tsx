/**
 * ===============================================================================
 * COMPONENT: LinearFeatureCard
 * REPLICATED FROM: https://linear.app/features
 * CREATED: 2026-01-31
 * MODE: Pixel-Perfect
 * ===============================================================================
 *
 * EXTRACTION SUMMARY
 * ------------------
 * This is the complete feature card as seen on Linear's /features page.
 * It composes the base LinearCard with header, content, and footer.
 *
 * Layout Variants:
 *   Full width: 976px x 336px on desktop (1440px viewport)
 *   Half width: 476px x 400px on desktop (1440px viewport)
 *
 * Structure:
 *   - Background image/illustration area (flex-1)
 *   - Footer with label, description, and arrow
 *
 * RESPONSIVE BEHAVIOR
 * -------------------
 * Desktop (1440px):
 *   - Full cards: span full width
 *   - Half cards: 2 per row with 24px gap
 *
 * Tablet (768px):
 *   - All cards: single column, full width
 *
 * Mobile (375px):
 *   - All cards: single column, 327px width (full - 48px container padding)
 * ===============================================================================
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { LinearFeatureCardProps } from "./linear-card.types";

/**
 * LinearFeatureCard
 *
 * A complete feature card matching Linear's /features page design.
 * Includes background image area, label, description, and arrow indicator.
 */
export function LinearFeatureCard({
  label,
  description,
  icon,
  backgroundImage,
  variant = "half",
  href,
  className,
  "aria-label": ariaLabel,
}: LinearFeatureCardProps) {
  const cardContent = (
    <>
      {/* Background/Image Area */}
      <div
        className={cn(
          // Takes remaining space
          "flex-1",
          // Minimum height for visual area
          "min-h-[180px] lg:min-h-[200px]",
          // Relative for absolute positioned children
          "relative",
        )}
      >
        {backgroundImage}
      </div>

      {/* Footer with text and arrow */}
      <div
        className={cn(
          // EXTRACTED: flex justify-between items-end
          "flex items-end justify-between",
          // EXTRACTED: gap between text and arrow
          "gap-2",
        )}
      >
        {/* Text container */}
        <div className="flex flex-col">
          {/* Label */}
          <h3
            className={cn(
              // EXTRACTED: 13px font size
              "text-[13px]",
              // EXTRACTED: weight 510 (closest: font-medium)
              "font-medium",
              // EXTRACTED: line-height 1.5
              "leading-[1.5]",
              // EXTRACTED: letter-spacing -0.01em
              "tracking-[-0.01em]",
              // EXTRACTED: rgb(138, 143, 152)
              "text-[rgb(138,143,152)]",
            )}
          >
            {label}
          </h3>

          {/* Description */}
          <p
            className={cn(
              // EXTRACTED: 15px font size
              "text-[15px]",
              // EXTRACTED: weight 510
              "font-medium",
              // EXTRACTED: line-height 1.6
              "leading-[1.6]",
              // EXTRACTED: letter-spacing -0.011em
              "tracking-[-0.011em]",
              // EXTRACTED: rgb(247, 248, 248)
              "text-[rgb(247,248,248)]",
            )}
          >
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <ChevronRight
          className={cn(
            // EXTRACTED: 18px x 18px
            "h-[18px] w-[18px]",
            // EXTRACTED: rgb(138, 143, 152)
            "text-[rgb(138,143,152)]",
            // Prevent shrinking
            "shrink-0",
            // Self align to bottom
            "self-end",
          )}
          aria-hidden="true"
        />
      </div>
    </>
  );

  const cardStyles = cn(
    // Base surface - EXTRACTED: rgb(15, 16, 17)
    "bg-[rgb(15,16,17)]",
    // EXTRACTED: 16px border-radius
    "rounded-2xl",
    // EXTRACTED: padding 32px 24px on desktop, 24px on mobile/tablet
    "p-6 lg:py-8 lg:px-6",
    // Layout
    "relative flex flex-col overflow-hidden",
    // Cursor
    "cursor-pointer",
    // EXTRACTED: transitions
    "transition-[filter,transform]",
    "duration-200",
    "ease-out",
    // Hover effects
    "hover:brightness-110",
    "hover:scale-[1.01]",
    "active:scale-[0.99]",
    // Variant-specific sizing
    variant === "full" && [
      // Full width on all screens
      "w-full",
      // Height varies by viewport
      "h-[386px] lg:h-[336px]",
    ],
    variant === "half" && [
      // Full width on mobile/tablet, half on desktop
      "w-full",
      // Fixed height
      "h-[360px] lg:h-[400px]",
    ],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cardStyles} aria-label={ariaLabel || `${label}: ${description}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={cardStyles} role="article" aria-label={ariaLabel || `${label}: ${description}`}>
      {cardContent}
    </div>
  );
}

/**
 * LinearFeatureGrid
 *
 * Grid container for feature cards matching Linear's layout.
 * EXTRACTED: max-width 1024px, padding 0 24px, gap 24px horizontal, 32px vertical
 */
export function LinearFeatureGrid({
  children,
  className,
  maxWidth = "1024px",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={cn(
        // EXTRACTED: max-width 1024px
        "mx-auto w-full",
        // EXTRACTED: padding 0 24px
        "px-6",
        className,
      )}
      style={{ maxWidth }}
    >
      <div
        className={cn(
          // Grid layout
          "grid",
          // Single column on mobile/tablet
          "grid-cols-1",
          // 2 columns on large screens for half cards
          "lg:grid-cols-2",
          // EXTRACTED: gap 24px horizontal, 32px vertical
          "gap-6 lg:gap-x-6 lg:gap-y-8",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * LinearFullWidthCard wrapper
 *
 * Forces a card to span full width in the grid.
 */
export function LinearFullWidthCardWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("lg:col-span-2", className)}>
      {children}
    </div>
  );
}
