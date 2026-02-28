/**
 * ===============================================================================
 * COMPONENT: LinearCard
 * REPLICATED FROM: https://linear.app/features
 * CREATED: 2026-01-31
 * MODE: Pixel-Perfect
 * ===============================================================================
 *
 * EXTRACTION SUMMARY
 * ------------------
 * Surface:
 *   Background: rgb(15, 16, 17) -> bg-[rgb(15,16,17)]
 *   Border-radius: 16px -> rounded-2xl
 *   Border: none
 *   Box-shadow: none (flat surface)
 *
 * Padding:
 *   Desktop (1440px): 32px 24px -> py-8 px-6
 *   Tablet (768px): 24px -> p-6
 *   Mobile (375px): 24px -> p-6
 *
 * Transitions:
 *   filter 0.2s ease-out, transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
 *
 * Typography:
 *   Label: 13px, weight 510, line-height 1.5, tracking -0.01em, rgb(138, 143, 152)
 *   Title: 15px, weight 510, line-height 1.6, tracking -0.011em, rgb(247, 248, 248)
 *
 * RESPONSIVE BEHAVIOR
 * -------------------
 * Desktop (1440px): py-8 px-6, cards in 2-column grid
 * Tablet (768px): p-6, single column
 * Mobile (375px): p-6, single column, full width
 * ===============================================================================
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type {
  LinearCardProps,
  LinearCardHeaderProps,
  LinearCardLabelProps,
  LinearCardDescriptionProps,
  LinearCardContentProps,
  LinearCardFooterProps,
  LinearCardArrowProps,
} from "./linear-card.types";

/**
 * Base Card Component
 *
 * A surface container with Linear's dark theme styling.
 * Can be used standalone or composed with sub-components.
 */
const LinearCard = React.forwardRef<HTMLDivElement, LinearCardProps>(
  ({ className, children, interactive = false, onClick, href, "aria-label": ariaLabel, ...props }, ref) => {
    const cardStyles = cn(
      // Base surface - EXTRACTED: rgb(15, 16, 17) background
      "bg-[rgb(15,16,17)]",
      // EXTRACTED: 16px border-radius
      "rounded-2xl",
      // EXTRACTED: padding 32px 24px on desktop, 24px on mobile
      "p-6 lg:py-8 lg:px-6",
      // Layout
      "relative flex flex-col overflow-hidden",
      // Interactive styles
      interactive && [
        "cursor-pointer",
        // EXTRACTED: transition filter 0.2s ease-out, transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        "transition-[filter,transform]",
        "duration-200",
        "ease-out",
        // Hover effects (inferred from transition properties)
        "hover:brightness-110",
        "hover:scale-[1.01]",
        "active:scale-[0.99]",
      ],
      className
    );

    // If href is provided, render as a Link
    if (href) {
      return (
        <Link href={href} className={cardStyles} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    }

    // If onClick is provided without href, render as interactive div
    if (onClick) {
      return (
        <div
          ref={ref}
          className={cardStyles}
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Non-interactive card
    return (
      <div ref={ref} className={cardStyles} {...props}>
        {children}
      </div>
    );
  }
);
LinearCard.displayName = "LinearCard";

/**
 * Card Header
 *
 * Container for the top section of the card (typically icon/image area).
 */
const LinearCardHeader = React.forwardRef<HTMLDivElement, LinearCardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Flex grow to take available space
        "flex-1",
        // Min height for image area
        "min-h-[180px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LinearCardHeader.displayName = "LinearCardHeader";

/**
 * Card Label
 *
 * The category/type label shown above the description.
 * EXTRACTED: 13px, weight 510, line-height 1.5, letter-spacing -0.01em
 */
const LinearCardLabel = React.forwardRef<HTMLHeadingElement, LinearCardLabelProps>(
  ({ className, children, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        // EXTRACTED: 13px font size
        "text-[13px]",
        // EXTRACTED: weight 510 (closest Tailwind: font-medium = 500)
        "font-medium",
        // EXTRACTED: line-height 19.5px / 13px = 1.5
        "leading-[1.5]",
        // EXTRACTED: letter-spacing -0.13px / 13px = -0.01em
        "tracking-[-0.01em]",
        // EXTRACTED: rgb(138, 143, 152)
        "text-[rgb(138,143,152)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
LinearCardLabel.displayName = "LinearCardLabel";

/**
 * Card Description
 *
 * The main text/title of the card.
 * EXTRACTED: 15px, weight 510, line-height 1.6, letter-spacing -0.011em
 */
const LinearCardDescription = React.forwardRef<HTMLParagraphElement, LinearCardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        // EXTRACTED: 15px font size
        "text-[15px]",
        // EXTRACTED: weight 510 (closest Tailwind: font-medium = 500)
        "font-medium",
        // EXTRACTED: line-height 24px / 15px = 1.6
        "leading-[1.6]",
        // EXTRACTED: letter-spacing -0.165px / 15px = -0.011em
        "tracking-[-0.011em]",
        // EXTRACTED: rgb(247, 248, 248)
        "text-[rgb(247,248,248)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);
LinearCardDescription.displayName = "LinearCardDescription";

/**
 * Card Content
 *
 * General content container for card body.
 */
const LinearCardContent = React.forwardRef<HTMLDivElement, LinearCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  )
);
LinearCardContent.displayName = "LinearCardContent";

/**
 * Card Footer
 *
 * Bottom section containing text and arrow indicator.
 * EXTRACTED: flex justify-between items-end
 */
const LinearCardFooter = React.forwardRef<HTMLDivElement, LinearCardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // EXTRACTED: flex with space-between and align items to end
        "flex items-end justify-between",
        // EXTRACTED: gap between text and arrow
        "gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LinearCardFooter.displayName = "LinearCardFooter";

/**
 * Card Arrow
 *
 * The chevron/arrow indicator on feature cards.
 * EXTRACTED: 18x18px, rgb(138, 143, 152)
 */
const LinearCardArrow = React.forwardRef<SVGSVGElement, LinearCardArrowProps>(
  ({ className, ...props }, ref) => (
    <ChevronRight
      ref={ref}
      className={cn(
        // EXTRACTED: 18px x 18px
        "h-[18px] w-[18px]",
        // EXTRACTED: rgb(138, 143, 152)
        "text-[rgb(138,143,152)]",
        // Flex shrink prevention
        "shrink-0",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
);
LinearCardArrow.displayName = "LinearCardArrow";

export {
  LinearCard,
  LinearCardHeader,
  LinearCardLabel,
  LinearCardDescription,
  LinearCardContent,
  LinearCardFooter,
  LinearCardArrow,
};
