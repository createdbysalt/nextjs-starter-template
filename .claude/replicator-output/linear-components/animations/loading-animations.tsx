"use client";

import { motion } from "framer-motion";

/**
 * Linear Loading Animation Tokens
 * Extracted from linear.app 2026-01-31
 *
 * Cursor Blink:
 * - Duration: 1.25s
 * - Easing: step-end
 * - Iterations: infinite
 *
 * Verified Badge Rotation:
 * - Duration: 6s
 * - Easing: linear
 * - Iterations: infinite
 *
 * Scrollbar Fade:
 * - Duration: 120ms
 * - Easing: ease-in
 */

/**
 * BlinkingCursor - Text input cursor animation
 *
 * Usage:
 * ```tsx
 * <BlinkingCursor />
 * ```
 */
export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      className={`inline-block w-0.5 h-5 bg-current ${className || ""}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1.25,
        ease: "linear",
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    />
  );
}

/**
 * RotatingBadge - Slow rotating element (like verified badge)
 */
export function RotatingBadge({
  children,
  duration = 6,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseLoader - Subtle pulse animation for loading states
 */
export function PulseLoader({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-full bg-current ${className || ""}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}

/**
 * Skeleton Loader - Shimmer effect for content placeholders
 */
export function SkeletonLoader({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) {
  return (
    <motion.div
      className={`bg-gray-800 rounded ${className || ""}`}
      style={{ width, height }}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: 1.5,
        ease: "linear",
        repeat: Infinity,
      }}
      initial={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

/**
 * SpinnerLoader - Simple rotating spinner
 */
export function SpinnerLoader({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/**
 * DotsLoader - Three bouncing dots
 */
export function DotsLoader({ className }: { className?: string }) {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-4, 0, -4] },
  };

  return (
    <div className={`flex gap-1 ${className || ""}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-current"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * ScrollbarIndicator - Fading scrollbar
 */
export function ScrollbarIndicator({
  isVisible,
  className,
}: {
  isVisible: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`${className || ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.12,
        ease: "easeIn",
      }}
    />
  );
}

/**
 * ProgressBar - Animated progress indicator
 */
export function ProgressBar({
  progress,
  className,
}: {
  progress: number; // 0-100
  className?: string;
}) {
  return (
    <div className={`h-1 bg-gray-800 rounded-full overflow-hidden ${className || ""}`}>
      <motion.div
        className="h-full bg-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
    </div>
  );
}

/**
 * TypewriterText - Text that types character by character
 */
export function TypewriterText({
  text,
  speed = 50,
  className,
}: {
  text: string;
  speed?: number; // ms per character
  className?: string;
}) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * (speed / 1000),
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * CircularProgress - Circular progress indicator
 */
export function CircularProgress({
  progress,
  size = 40,
  strokeWidth = 3,
  className,
}: {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className={className}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.2}
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  );
}

/**
 * IndeterminateProgress - Progress bar with unknown completion
 */
export function IndeterminateProgress({ className }: { className?: string }) {
  return (
    <div className={`h-1 bg-gray-800 rounded-full overflow-hidden ${className || ""}`}>
      <motion.div
        className="h-full w-1/3 bg-blue-500 rounded-full"
        animate={{
          x: ["-100%", "400%"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
