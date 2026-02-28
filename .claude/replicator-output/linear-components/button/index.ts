/**
 * LinearButton Component
 * Pixel-perfect replica of Linear's button component
 *
 * @example
 * import { LinearButton } from './linear-button'
 *
 * // Primary CTA
 * <LinearButton>Start building</LinearButton>
 *
 * // Secondary
 * <LinearButton variant="secondary">Contact sales</LinearButton>
 *
 * // Nav ghost link
 * <LinearButton variant="ghost" size="small">Product</LinearButton>
 */

export { LinearButton, linearButtonVariants } from "./linear-button";
export type {
  LinearButtonProps,
  LinearButtonVariant,
  LinearButtonSize,
  LINEAR_BUTTON_TOKENS,
} from "./linear-button.types";
