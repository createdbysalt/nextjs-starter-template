"use client";

import { motion, useScroll, useTransform, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef, type ReactNode } from "react";

/**
 * Linear Page-Level Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Viewport-Triggered Fade-In:
 * - Used for CTA sections, feature cards entering viewport
 * - Duration: 500ms
 * - Delay: 100ms
 * - Easing: ease
 *
 * Image Load Animation:
 * - Duration: 800ms
 * - Easing: ease
 * - FillMode: both
 *
 * Marquee Scroll:
 * - Duration: 60s (infinite)
 * - Easing: linear
 */

// Fade-in on viewport enter
export const fadeInViewportVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeInTransition = {
  duration: 0.5,
  delay: 0.1,
  ease: "easeInOut" as const,
};

interface FadeInOnViewProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  amount?: number;
}

/**
 * FadeInOnView - Element fades in when entering viewport
 *
 * Usage:
 * ```tsx
 * <FadeInOnView>
 *   <h2>Section Title</h2>
 * </FadeInOnView>
 * ```
 */
export const FadeInOnView = forwardRef<HTMLDivElement, FadeInOnViewProps>(
  function FadeInOnView(
    { children, delay = 0.1, once = true, amount = 0.3, className, ...props },
    ref
  ) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={fadeInViewportVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        transition={{ ...fadeInTransition, delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

/**
 * Staggered Children Animation
 * For lists and grids that animate in sequence
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
}

/**
 * StaggerContainer - Container for staggered child animations
 *
 * Usage:
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem>Item 1</StaggerItem>
 *   <StaggerItem>Item 2</StaggerItem>
 *   <StaggerItem>Item 3</StaggerItem>
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  initialDelay = 0.2,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Child item that animates in sequence
 */
export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={staggerItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Marquee Animation - Continuous horizontal scroll
 */
interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  duration = 60,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const x = direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"];

  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        className="flex"
        animate={{ x }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Image Fade-In Animation
 * Triggers when image loads
 */
interface AnimatedImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
}

export const AnimatedImage = forwardRef<HTMLImageElement, AnimatedImageProps>(
  function AnimatedImage({ src, alt, className, ...props }, ref) {
    return (
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        {...props}
      />
    );
  }
);

/**
 * Scroll-Linked Parallax Section
 * Content moves at different rate than scroll
 */
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0.5 = half speed, 2 = double speed
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Scroll-Linked Fade
 * Opacity changes based on scroll position
 */
interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
}

export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity }}>{children}</motion.div>
    </div>
  );
}

/**
 * CTA Section Animation
 * - Fade in with slight delay
 * - Used for call-to-action sections
 */
export const ctaVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: "easeInOut",
    },
  },
};

export function AnimatedCTA({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero Title Animation
 * Words animate in with stagger
 */
interface AnimatedHeroTitleProps {
  text: string;
  className?: string;
}

export function AnimatedHeroTitle({ text, className }: AnimatedHeroTitleProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/**
 * Collapsible/Accordion Animation
 * - Height and opacity animation
 * - Duration: 250ms (expand), 200ms (collapse)
 */
export const collapsibleVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    y: -8,
  },
  expanded: {
    opacity: 1,
    height: "auto",
    y: 0,
  },
};

interface CollapsibleContentProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export function CollapsibleContent({
  isOpen,
  children,
  className,
}: CollapsibleContentProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={className}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={collapsibleVariants}
          transition={{
            duration: isOpen ? 0.25 : 0.2,
            ease: isOpen ? "easeOut" : "easeIn",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Chevron Rotation Animation
 * - Duration: 120ms
 * - Easing: ease
 */
interface AnimatedChevronProps {
  isOpen: boolean;
  className?: string;
}

export function AnimatedChevron({ isOpen, className }: AnimatedChevronProps) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.12, ease: "easeInOut" }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
