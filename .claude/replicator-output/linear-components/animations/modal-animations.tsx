"use client";

import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

/**
 * Linear Modal/Dialog Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Dialog Open:
 * - From: opacity 0, translate(-50%, -49%) scale(0.95)
 * - To: opacity 1, translate(-50%, -50%) scale(1)
 * - Duration: 180ms
 * - Easing: ease
 *
 * Command Palette (Cmd+K):
 * - From: opacity 0, scale(0.96)
 * - To: opacity 1, scale(1)
 * - Duration: 150ms
 * - Easing: ease-out
 */

// Dialog animation variants
export const dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: "-49%",
    x: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: "-50%",
    x: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: "-49%",
    x: "-50%",
  },
};

const dialogTransition = {
  duration: 0.18,
  ease: "easeInOut" as const,
};

// Backdrop animation variants
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const backdropTransition = {
  duration: 0.18,
  ease: "easeInOut" as const,
};

interface AnimatedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedDialog - Linear-style modal dialog with scale and fade animation
 *
 * Usage:
 * ```tsx
 * <AnimatedDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <h2>Dialog Title</h2>
 *   <p>Dialog content</p>
 * </AnimatedDialog>
 * ```
 */
export function AnimatedDialog({
  isOpen,
  onClose,
  children,
  className,
}: AnimatedDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={backdropTransition}
            onClick={onClose}
          />
          {/* Dialog */}
          <motion.div
            className={`fixed left-1/2 top-1/2 z-50 ${className || ""}`}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={dialogTransition}
            style={{ transformOrigin: "center center" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Command Palette Animation Variants
 * Slightly different from dialog - faster, simpler scale
 */
export const commandPaletteVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    x: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    x: "-50%",
  },
};

const commandPaletteTransition = {
  duration: 0.15,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

// Bounce animation for hitting boundaries
export const commandPaletteBounceVariants = {
  bounce: {
    scale: [1, 0.98, 1],
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
};

interface AnimatedCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedCommandPalette - Linear-style command palette (Cmd+K)
 *
 * Usage:
 * ```tsx
 * <AnimatedCommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <input type="text" placeholder="Type a command..." />
 *   <CommandList />
 * </AnimatedCommandPalette>
 * ```
 */
export function AnimatedCommandPalette({
  isOpen,
  onClose,
  children,
  className,
}: AnimatedCommandPaletteProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={backdropTransition}
            onClick={onClose}
          />
          <motion.div
            className={`fixed left-1/2 top-[20%] z-50 ${className || ""}`}
            variants={commandPaletteVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={commandPaletteTransition}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Context Menu Animation Variants
 * - From: opacity 0, scale(0.9)
 * - To: opacity 1, scale(1)
 * - Duration: 120ms
 */
export const contextMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

const contextMenuTransition = {
  duration: 0.12,
  ease: "easeOut" as const,
};

interface AnimatedContextMenuProps extends HTMLMotionProps<"div"> {
  isOpen: boolean;
  children: ReactNode;
}

/**
 * AnimatedContextMenu - Linear-style context menu
 */
export const AnimatedContextMenu = forwardRef<
  HTMLDivElement,
  AnimatedContextMenuProps
>(function AnimatedContextMenu(
  { isOpen, children, className, ...props },
  ref
) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className={className}
          variants={contextMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={contextMenuTransition}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/**
 * Dropdown Menu Animation Variants
 * - From: opacity 0, scale(0.95)
 * - To: opacity 1, scale(1)
 * - Duration: 150ms
 */
export const dropdownMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

const dropdownMenuTransition = {
  duration: 0.15,
  ease: "easeOut" as const,
};

export const AnimatedDropdownMenu = forwardRef<
  HTMLDivElement,
  AnimatedContextMenuProps
>(function AnimatedDropdownMenu(
  { isOpen, children, className, ...props },
  ref
) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className={className}
          variants={dropdownMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={dropdownMenuTransition}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/**
 * Tooltip Animation Variants
 * - From: opacity 0, scale(0.9)
 * - To: opacity 1, scale(1)
 * - Duration: 150ms
 */
export const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

const tooltipTransition = {
  duration: 0.15,
  ease: "easeOut" as const,
};

interface AnimatedTooltipProps extends HTMLMotionProps<"div"> {
  isVisible: boolean;
  children: ReactNode;
}

export const AnimatedTooltip = forwardRef<HTMLDivElement, AnimatedTooltipProps>(
  function AnimatedTooltip({ isVisible, children, className, ...props }, ref) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={className}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={tooltipTransition}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

/**
 * useModalAnimation - Hook for applying Linear modal animation to any element
 */
export function useModalAnimation(type: "dialog" | "command" | "context" | "dropdown" | "tooltip" = "dialog") {
  const variants = {
    dialog: dialogVariants,
    command: commandPaletteVariants,
    context: contextMenuVariants,
    dropdown: dropdownMenuVariants,
    tooltip: tooltipVariants,
  };

  const transitions = {
    dialog: dialogTransition,
    command: commandPaletteTransition,
    context: contextMenuTransition,
    dropdown: dropdownMenuTransition,
    tooltip: tooltipTransition,
  };

  return {
    variants: variants[type],
    initial: "hidden" as const,
    animate: "visible" as const,
    exit: "exit" as const,
    transition: transitions[type],
  };
}
