"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

/**
 * Linear Card Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Feature Card Hover:
 * - Duration: 200ms (filter), 160ms (transform)
 * - Easing: ease-out (filter), cubic-bezier(0.25, 0.46, 0.45, 0.94) (transform)
 * - Scale: 1.02
 * - Filter: brightness(125%)
 * - Box shadow: var(--shadow-large)
 */

// Easing curves
const LINEAR_EASING = [0.25, 0.46, 0.45, 0.94] as const;

// Card hover variants
export const featureCardVariants = {
  initial: {
    scale: 1,
    filter: "brightness(1)",
  },
  hover: {
    scale: 1.02,
    filter: "brightness(1.25)",
  },
};

// Card transition config
const cardTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

interface AnimatedFeatureCardProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  href?: string;
}

/**
 * AnimatedFeatureCard - Linear-style feature card with hover scale and brightness
 *
 * Usage:
 * ```tsx
 * <AnimatedFeatureCard>
 *   <h3>Feature Title</h3>
 *   <p>Feature description</p>
 * </AnimatedFeatureCard>
 * ```
 */
export const AnimatedFeatureCard = forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(function AnimatedFeatureCard({ children, className, ...props }, ref) {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={featureCardVariants}
      initial="initial"
      whileHover="hover"
      transition={cardTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
});

/**
 * AnimatedFeatureLink - Feature card that's also a link
 */
interface AnimatedFeatureLinkProps
  extends Omit<HTMLMotionProps<"a">, "children"> {
  children: React.ReactNode;
  href: string;
}

export const AnimatedFeatureLink = forwardRef<
  HTMLAnchorElement,
  AnimatedFeatureLinkProps
>(function AnimatedFeatureLink({ children, className, ...props }, ref) {
  return (
    <motion.a
      ref={ref}
      className={className}
      variants={featureCardVariants}
      initial="initial"
      whileHover="hover"
      transition={cardTransition}
      {...props}
    >
      {children}
    </motion.a>
  );
});

/**
 * Stats Card Hover - From Linear's stats module
 * - Filter: brightness(125%)
 * - Button background change on parent hover
 */
export const statsCardVariants = {
  initial: {
    filter: "brightness(1)",
  },
  hover: {
    filter: "brightness(1.25)",
  },
};

/**
 * Document/Link Card Hover
 * - Duration: 250ms
 * - Easing: ease
 * - Background and border color transition
 */
export const documentCardVariants = {
  initial: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
};

const documentCardTransition = {
  duration: 0.25,
  ease: "easeInOut" as const,
};

export const AnimatedDocumentCard = forwardRef<
  HTMLAnchorElement,
  AnimatedFeatureLinkProps
>(function AnimatedDocumentCard({ children, className, ...props }, ref) {
  return (
    <motion.a
      ref={ref}
      className={className}
      variants={documentCardVariants}
      initial="initial"
      whileHover="hover"
      transition={documentCardTransition}
      {...props}
    >
      {children}
    </motion.a>
  );
});

/**
 * useCardAnimation - Hook for applying Linear card animation to any element
 *
 * Usage:
 * ```tsx
 * const cardProps = useCardAnimation();
 * <motion.div {...cardProps}>Card content</motion.div>
 * ```
 */
export function useCardAnimation(variant: "feature" | "stats" | "document" = "feature") {
  const variants = {
    feature: featureCardVariants,
    stats: statsCardVariants,
    document: documentCardVariants,
  };

  const transitions = {
    feature: cardTransition,
    stats: cardTransition,
    document: documentCardTransition,
  };

  return {
    variants: variants[variant],
    initial: "initial" as const,
    whileHover: "hover" as const,
    transition: transitions[variant],
  };
}

/**
 * Notification Card with grayscale hover effect
 * When one card in a group is hovered, others become grayscale
 */
export const notificationCardVariants = {
  idle: {
    opacity: 1,
    filter: "grayscale(0)",
  },
  muted: {
    opacity: 0.2,
    filter: "grayscale(1)",
    backgroundColor: "rgba(var(--c), var(--c), var(--c), 0.1)",
  },
};

/**
 * Workflow/Integration Card Carousel Item
 * Used in the horizontal scrolling integration cards
 */
export const workflowCardVariants = {
  initial: {
    filter: "brightness(1)",
    y: 0,
  },
  hover: {
    filter: "brightness(1.05)",
    y: -4,
  },
};

export const AnimatedWorkflowCard = forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(function AnimatedWorkflowCard({ children, className, ...props }, ref) {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={workflowCardVariants}
      initial="initial"
      whileHover="hover"
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
