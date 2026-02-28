"use client";

import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

/**
 * Linear Navigation Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Nav Link Hover:
 * - Duration: 100ms
 * - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 * - Default color: rgb(138, 143, 152)
 * - Hover color: rgb(247, 248, 248)
 *
 * Header Dropdown:
 * - Enter from right: translateX(var(--anim-amount)) -> translate(0)
 * - Scale in: scale(0.98) -> scale(1)
 * - Duration: ~150ms
 */

const LINEAR_EASING = [0.25, 0.46, 0.45, 0.94] as const;

// Navigation link variants
export const navLinkVariants = {
  initial: {
    color: "rgb(138, 143, 152)",
  },
  hover: {
    color: "rgb(247, 248, 248)",
  },
};

const navLinkTransition = {
  duration: 0.1,
  ease: LINEAR_EASING,
};

interface AnimatedNavLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

/**
 * AnimatedNavLink - Linear-style navigation link with color transition
 *
 * Usage:
 * ```tsx
 * <AnimatedNavLink href="/features">Features</AnimatedNavLink>
 * ```
 */
export const AnimatedNavLink = forwardRef<HTMLAnchorElement, AnimatedNavLinkProps>(
  function AnimatedNavLink({ children, isActive, className, ...props }, ref) {
    return (
      <motion.a
        ref={ref}
        className={className}
        variants={navLinkVariants}
        initial="initial"
        whileHover="hover"
        animate={isActive ? "hover" : "initial"}
        transition={navLinkTransition}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

/**
 * Header Dropdown Animation Variants
 * Supports enter from left, right, and scale
 */
export const headerDropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
  },
};

export const headerDropdownFromRightVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

export const headerDropdownFromLeftVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
  },
};

const headerDropdownTransition = {
  duration: 0.15,
  ease: "easeOut" as const,
};

interface AnimatedHeaderDropdownProps {
  isOpen: boolean;
  children: ReactNode;
  direction?: "scale" | "fromLeft" | "fromRight";
  className?: string;
}

/**
 * AnimatedHeaderDropdown - Linear-style header navigation dropdown
 *
 * Usage:
 * ```tsx
 * <AnimatedHeaderDropdown isOpen={isOpen} direction="fromRight">
 *   <DropdownContent />
 * </AnimatedHeaderDropdown>
 * ```
 */
export function AnimatedHeaderDropdown({
  isOpen,
  children,
  direction = "scale",
  className,
}: AnimatedHeaderDropdownProps) {
  const variants = {
    scale: headerDropdownVariants,
    fromLeft: headerDropdownFromLeftVariants,
    fromRight: headerDropdownFromRightVariants,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={className}
          variants={variants[direction]}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={headerDropdownTransition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Mobile Menu Animation Variants
 * - Fade in/out
 * - Duration: ~200ms
 */
export const mobileMenuVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const mobileMenuTransition = {
  duration: 0.2,
  ease: "easeInOut" as const,
};

interface AnimatedMobileMenuProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedMobileMenu - Linear-style mobile navigation menu
 */
export function AnimatedMobileMenu({
  isOpen,
  children,
  className,
}: AnimatedMobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={className}
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={mobileMenuTransition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hamburger Menu Icon Animation
 * - Rect elements animate on state change
 * - Duration: 160ms
 * - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 */
interface HamburgerIconProps {
  isOpen: boolean;
  className?: string;
}

export function AnimatedHamburgerIcon({ isOpen, className }: HamburgerIconProps) {
  const transition = {
    duration: 0.16,
    ease: LINEAR_EASING,
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={className}
      fill="none"
    >
      <motion.rect
        x="2"
        y="4"
        width="14"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4.5 : 0,
        }}
        transition={transition}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.rect
        x="2"
        y="8.25"
        width="14"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={transition}
      />
      <motion.rect
        x="2"
        y="12.5"
        width="14"
        height="1.5"
        rx="0.75"
        fill="currentColor"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4.5 : 0,
        }}
        transition={transition}
        style={{ originX: "50%", originY: "50%" }}
      />
    </svg>
  );
}

/**
 * Sidebar Navigation Item Animation
 * For collapsible sidebar sections
 */
export const sidebarItemVariants = {
  initial: {
    backgroundColor: "transparent",
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  active: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
};

interface AnimatedSidebarItemProps extends HTMLMotionProps<"button"> {
  isActive?: boolean;
  children: ReactNode;
}

export const AnimatedSidebarItem = forwardRef<
  HTMLButtonElement,
  AnimatedSidebarItemProps
>(function AnimatedSidebarItem(
  { isActive, children, className, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      className={className}
      variants={sidebarItemVariants}
      initial="initial"
      whileHover="hover"
      animate={isActive ? "active" : "initial"}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

/**
 * useNavLinkAnimation - Hook for applying Linear nav link animation
 */
export function useNavLinkAnimation(isActive?: boolean) {
  return {
    variants: navLinkVariants,
    initial: "initial" as const,
    whileHover: "hover" as const,
    animate: isActive ? ("hover" as const) : ("initial" as const),
    transition: navLinkTransition,
  };
}
