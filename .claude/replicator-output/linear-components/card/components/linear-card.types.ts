/**
 * TYPE DEFINITIONS: Linear Card Components
 * REPLICATED FROM: https://linear.app/features
 * CREATED: 2026-01-31
 */

import type { ReactNode } from "react";

/**
 * Base card props shared across all card variants
 */
export interface LinearCardProps {
  /** Optional className for style overrides */
  className?: string;
  /** Card content */
  children?: ReactNode;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** URL for link cards */
  href?: string;
  /** Optional aria-label for accessibility */
  "aria-label"?: string;
}

/**
 * Feature card props - the main card variant on Linear's /features page
 */
export interface LinearFeatureCardProps extends Omit<LinearCardProps, "children"> {
  /** Card title (displayed smaller, above description) */
  label: string;
  /** Card description (displayed larger, main text) */
  description: string;
  /** Optional icon component to display */
  icon?: ReactNode;
  /** Optional background image/illustration */
  backgroundImage?: ReactNode;
  /** Card size variant */
  variant?: "full" | "half";
  /** URL for the card link */
  href?: string;
}

/**
 * Card header props
 */
export interface LinearCardHeaderProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Card title props (the label/category text)
 */
export interface LinearCardLabelProps {
  className?: string;
  children?: ReactNode;
  /** Use as attribute for the element tag */
  as?: "h3" | "h4" | "span" | "p";
}

/**
 * Card description props (the main text)
 */
export interface LinearCardDescriptionProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Card content area props
 */
export interface LinearCardContentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Card footer props (contains text and arrow)
 */
export interface LinearCardFooterProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Arrow icon props
 */
export interface LinearCardArrowProps {
  className?: string;
}

/**
 * Feature card grid props
 */
export interface LinearFeatureGridProps {
  className?: string;
  children?: ReactNode;
  /** Maximum width of the grid container */
  maxWidth?: string;
}

/**
 * Mock data types for feature cards
 */
export interface FeatureCardData {
  id: string;
  label: string;
  description: string;
  href: string;
  variant: "full" | "half";
  backgroundImage?: string;
}

/**
 * Sample feature card data matching Linear's /features page
 */
export const sampleFeatureCards: FeatureCardData[] = [
  {
    id: "planning",
    label: "Planning",
    description: "Set the product direction with projects and initiatives",
    href: "/plan",
    variant: "full",
  },
  {
    id: "building",
    label: "Building",
    description: "Make progress with issue tracking and cycle planning",
    href: "/build",
    variant: "full",
  },
  {
    id: "ai",
    label: "Artificial intelligence",
    description: "Streamline product development with AI-powered workflows and agents",
    href: "/ai",
    variant: "half",
  },
  {
    id: "insights",
    label: "Insights",
    description: "Instant analytics for any stream of work",
    href: "/insights",
    variant: "half",
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Move product work forward from anywhere",
    href: "/mobile",
    variant: "half",
  },
  {
    id: "customer-requests",
    label: "Customer Requests",
    description: "Build what customers actually want",
    href: "/customer-requests",
    variant: "half",
  },
  {
    id: "asks",
    label: "Linear Asks",
    description: "Turn workplace requests into actionable issues",
    href: "/asks",
    variant: "half",
  },
  {
    id: "security",
    label: "Security",
    description: "Best-in-class security practices keep your work safe and secure",
    href: "/security",
    variant: "half",
  },
];
