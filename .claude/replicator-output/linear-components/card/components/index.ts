/**
 * Linear Card Components
 * REPLICATED FROM: https://linear.app/features
 * CREATED: 2026-01-31
 *
 * Export all card-related components and types.
 */

// Base card components (composable primitives)
export {
  LinearCard,
  LinearCardHeader,
  LinearCardLabel,
  LinearCardDescription,
  LinearCardContent,
  LinearCardFooter,
  LinearCardArrow,
} from "./linear-card";

// Feature card (complete composite component)
export {
  LinearFeatureCard,
  LinearFeatureGrid,
  LinearFullWidthCardWrapper,
} from "./linear-feature-card";

// Types
export type {
  LinearCardProps,
  LinearFeatureCardProps,
  LinearCardHeaderProps,
  LinearCardLabelProps,
  LinearCardDescriptionProps,
  LinearCardContentProps,
  LinearCardFooterProps,
  LinearCardArrowProps,
  LinearFeatureGridProps,
  FeatureCardData,
} from "./linear-card.types";

// Sample data
export { sampleFeatureCards } from "./linear-card.types";
