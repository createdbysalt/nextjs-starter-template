"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

/**
 * Linear Button Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Duration: 160ms
 * Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) - "Linear Standard"
 * Active scale: 0.97
 * Active filter: brightness(98%)
 */

// Easing curves extracted from Linear
export const LINEAR_EASING = {
  standard: [0.25, 0.46, 0.45, 0.94] as const,
  ease: "easeInOut" as const,
  easeOut: "easeOut" as const,
  easeIn: "easeIn" as const,
};

// Duration tokens (in seconds)
export const LINEAR_DURATION = {
  instant: 0.1,
  fast: 0.12,
  quick: 0.15,
  normal: 0.16,
  standard: 0.18,
  relaxed: 0.2,
  slow: 0.25,
};

// Button transition config
const buttonTransition = {
  duration: LINEAR_DURATION.normal,
  ease: LINEAR_EASING.standard,
};

// Button animation variants
export const buttonVariants = {
  initial: {},
  hover: {
    filter: "brightness(1.1)",
  },
  tap: {
    scale: 0.97,
    filter: "brightness(0.98)",
  },
};

type ButtonVariant =
  | "primary"
  | "secondary"
  | "invert"
  | "tertiary"
  | "ghost"
  | "glass"
  | "inline";

type ButtonSize = "small" | "default" | "large";

interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
}

/**
 * AnimatedButton - Linear-style button with hover and tap animations
 *
 * Usage:
 * ```tsx
 * <AnimatedButton variant="primary">
 *   Get started
 * </AnimatedButton>
 * ```
 */
export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  function AnimatedButton(
    { variant = "primary", size = "default", children, disabled, className, ...props },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        className={className}
        variants={buttonVariants}
        initial="initial"
        whileHover={disabled ? undefined : "hover"}
        whileTap={disabled ? undefined : "tap"}
        transition={buttonTransition}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

/**
 * AnimatedLink - Linear-style link button with hover and tap animations
 */
interface AnimatedLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href: string;
}

export const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  function AnimatedLink(
    { variant = "primary", size = "default", children, className, ...props },
    ref
  ) {
    return (
      <motion.a
        ref={ref}
        className={className}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={buttonTransition}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

/**
 * useButtonAnimation - Hook for applying Linear button animation to any element
 *
 * Usage:
 * ```tsx
 * const buttonProps = useButtonAnimation();
 * <motion.button {...buttonProps}>Click me</motion.button>
 * ```
 */
export function useButtonAnimation(disabled?: boolean) {
  return {
    variants: buttonVariants,
    initial: "initial" as const,
    whileHover: disabled ? undefined : ("hover" as const),
    whileTap: disabled ? undefined : ("tap" as const),
    transition: buttonTransition,
  };
}

/**
 * Primary Button (Invert style for dark backgrounds)
 * - Background: rgb(230, 230, 230)
 * - Color: rgb(8, 9, 10)
 * - Box shadow: subtle layered shadow
 */
export const invertButtonVariants = {
  initial: {
    backgroundColor: "rgb(230, 230, 230)",
    color: "rgb(8, 9, 10)",
    boxShadow:
      "rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px",
  },
  hover: {
    filter: "brightness(1.05)",
  },
  tap: {
    scale: 0.97,
  },
};

/**
 * Secondary Button
 * - Background: rgb(40, 40, 44)
 * - Color: rgb(247, 248, 248)
 * - Border: 1px solid rgb(62, 62, 68)
 */
export const secondaryButtonVariants = {
  initial: {
    backgroundColor: "rgb(40, 40, 44)",
    color: "rgb(247, 248, 248)",
    border: "1px solid rgb(62, 62, 68)",
  },
  hover: {
    backgroundColor: "rgb(50, 50, 55)",
    borderColor: "rgb(72, 72, 78)",
  },
  tap: {
    scale: 0.97,
    filter: "brightness(0.98)",
  },
};

/**
 * Ghost Button (transparent background)
 */
export const ghostButtonVariants = {
  initial: {
    backgroundColor: "transparent",
    color: "var(--color-text-tertiary)",
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-text-primary)",
  },
  tap: {
    scale: 0.97,
    backgroundColor: "var(--color-bg-quinary)",
  },
};
