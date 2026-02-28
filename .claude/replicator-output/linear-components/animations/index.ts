/**
 * Linear Animation Components
 * Extracted from linear.app on 2026-01-31
 *
 * Complete Framer Motion implementations of Linear's micro-interactions
 * and page animations.
 *
 * Usage:
 * ```tsx
 * import {
 *   AnimatedButton,
 *   AnimatedDialog,
 *   FadeInOnView,
 *   LINEAR_EASING,
 * } from "@/animations";
 * ```
 */

// Button Animations
export {
  AnimatedButton,
  AnimatedLink,
  useButtonAnimation,
  buttonVariants,
  invertButtonVariants,
  secondaryButtonVariants,
  ghostButtonVariants,
  LINEAR_EASING,
  LINEAR_DURATION,
} from "./button-animations";

// Card Animations
export {
  AnimatedFeatureCard,
  AnimatedFeatureLink,
  AnimatedDocumentCard,
  AnimatedWorkflowCard,
  useCardAnimation,
  featureCardVariants,
  statsCardVariants,
  documentCardVariants,
  notificationCardVariants,
  workflowCardVariants,
} from "./card-animations";

// Modal/Dialog Animations
export {
  AnimatedDialog,
  AnimatedCommandPalette,
  AnimatedContextMenu,
  AnimatedDropdownMenu,
  AnimatedTooltip,
  useModalAnimation,
  dialogVariants,
  backdropVariants,
  commandPaletteVariants,
  commandPaletteBounceVariants,
  contextMenuVariants,
  dropdownMenuVariants,
  tooltipVariants,
} from "./modal-animations";

// Navigation Animations
export {
  AnimatedNavLink,
  AnimatedHeaderDropdown,
  AnimatedMobileMenu,
  AnimatedHamburgerIcon,
  AnimatedSidebarItem,
  useNavLinkAnimation,
  navLinkVariants,
  headerDropdownVariants,
  headerDropdownFromRightVariants,
  headerDropdownFromLeftVariants,
  mobileMenuVariants,
  sidebarItemVariants,
} from "./navigation-animations";

// Page-Level Animations
export {
  FadeInOnView,
  StaggerContainer,
  StaggerItem,
  Marquee,
  AnimatedImage,
  ParallaxSection,
  ScrollFade,
  AnimatedCTA,
  AnimatedHeroTitle,
  CollapsibleContent,
  AnimatedChevron,
  fadeInViewportVariants,
  staggerContainerVariants,
  staggerItemVariants,
  ctaVariants,
  collapsibleVariants,
} from "./page-animations";

// Loading Animations
export {
  BlinkingCursor,
  RotatingBadge,
  PulseLoader,
  SkeletonLoader,
  SpinnerLoader,
  DotsLoader,
  ScrollbarIndicator,
  ProgressBar,
  TypewriterText,
  CircularProgress,
  IndeterminateProgress,
} from "./loading-animations";

/**
 * Animation Tokens (CSS-compatible)
 *
 * Use these when you need raw values instead of components:
 *
 * ```tsx
 * const myTransition = {
 *   duration: ANIMATION_DURATION.normal,
 *   ease: ANIMATION_EASING.linearStandard,
 * };
 * ```
 */

export const ANIMATION_EASING = {
  /** Primary easing for most UI transitions */
  linearStandard: [0.25, 0.46, 0.45, 0.94] as const,
  /** Standard ease */
  ease: "easeInOut" as const,
  /** Entrance animations */
  easeOut: "easeOut" as const,
  /** Exit animations */
  easeIn: "easeIn" as const,
  /** Continuous animations */
  linear: "linear" as const,
} as const;

export const ANIMATION_DURATION = {
  /** Very fast micro-interactions (100ms) */
  instant: 0.1,
  /** Context menus, scrollbars (120ms) */
  fast: 0.12,
  /** Dropdowns, command palette (150ms) */
  quick: 0.15,
  /** Buttons, hamburger icon (160ms) */
  normal: 0.16,
  /** Dialogs, modals (180ms) */
  standard: 0.18,
  /** Feature cards, general transitions (200ms) */
  relaxed: 0.2,
  /** Sidebar collapse, video controls (250ms) */
  slow: 0.25,
  /** Image fade-in on load (800ms) */
  imageLoad: 0.8,
} as const;

export const ANIMATION_SCALE = {
  /** Button active state */
  buttonActive: 0.97,
  /** Context menu entrance */
  menuEnter: 0.9,
  /** Dialog entrance */
  dialogEnter: 0.95,
  /** Header dropdown */
  headerDropdown: 0.98,
  /** Card hover effect */
  cardHover: 1.02,
} as const;
