# LinearButton Component

Pixel-perfect replica of Linear's button component, extracted from https://linear.app/homepage

## Installation

Copy the component files to your project:

```bash
# Copy to your components directory
cp -r .claude/replicator-output/linear-components/button/* app/_features/shared/components/linear-button/
```

## Dependencies

This component requires:
- `class-variance-authority` (CVA)
- `@radix-ui/react-slot`
- `lucide-react` (for loader icon)
- `@repo/utils` (for `cn` utility)

## Usage

```tsx
import { LinearButton } from "@/app/_features/shared/components/linear-button";

// Primary CTA (invert variant - light button for dark backgrounds)
<LinearButton>Start building</LinearButton>

// Secondary (dark button)
<LinearButton variant="secondary">Contact sales</LinearButton>

// Navigation link (ghost)
<LinearButton variant="ghost" size="small">Product</LinearButton>

// With icon
<LinearButton>
  Get started
  <ArrowRight className="size-4" />
</LinearButton>

// As Next.js Link
<LinearButton asChild>
  <Link href="/signup">Sign up</Link>
</LinearButton>

// Loading state
<LinearButton loading>Processing...</LinearButton>
```

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `invert` | Light button (default) | Primary CTAs on dark backgrounds |
| `secondary` | Dark button | Secondary actions |
| `ghost` | Transparent | Navigation links |
| `link` | Underline on hover | Inline text links |

## Sizes

| Size | Height | Font Size | Padding | Border Radius |
|------|--------|-----------|---------|---------------|
| `small` | 32px | 13px | 12px | 8px |
| `default` | 40px | 15px | 16px | 10px |
| `iconSmall` | 32px | - | - | 8px |
| `icon` | 40px | - | - | 10px |

## Extracted Tokens

### Colors

```css
/* Invert (Primary) */
--linear-btn-invert-bg: rgb(230, 230, 230);
--linear-btn-invert-fg: rgb(8, 9, 10);

/* Secondary */
--linear-btn-secondary-bg: rgb(40, 40, 44);
--linear-btn-secondary-fg: rgb(247, 248, 248);
--linear-btn-secondary-border: rgb(62, 62, 68);

/* Ghost */
--linear-btn-ghost-fg: rgb(138, 143, 152);
```

### Animation

```css
--linear-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--linear-duration: 160ms;
--linear-duration-fast: 100ms; /* for ghost */
```

### Active State

Active press scales to `scale(0.98)`

## Files

| File | Description |
|------|-------------|
| `linear-button.tsx` | Main component with CVA variants |
| `linear-button.types.ts` | TypeScript types and token constants |
| `index.ts` | Barrel export |
| `extracted-styles.json` | Raw extraction data |
| `tailwind-tokens.css` | CSS custom properties for tokens |
| `linear-button.demo.tsx` | Usage examples |

## Tailwind Configuration

Add these tokens to your `app/globals.css` `@theme` block:

```css
@theme {
  --color-linear-btn-invert: rgb(230, 230, 230);
  --color-linear-btn-invert-foreground: rgb(8, 9, 10);
  --color-linear-btn-secondary: rgb(40, 40, 44);
  --color-linear-btn-secondary-foreground: rgb(247, 248, 248);
  --color-linear-btn-secondary-border: rgb(62, 62, 68);
  --color-linear-btn-ghost-foreground: rgb(138, 143, 152);
  --ease-linear-button: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Comparison with Salt Core Button

| Feature | LinearButton | Salt Core Button |
|---------|-------------|------------------|
| Default variant | `invert` (light) | `default` (primary) |
| Height | 40px | 36px (h-9) |
| Border radius | 10px | 6px (rounded-md) |
| Font weight | 510 | 500 |
| Transition | 160ms | 160ms |
| Active scale | 0.98 | 0.98 |

## Accessibility

- Uses semantic `<button>` element
- Supports `disabled` state with reduced opacity
- Focus states use `outline` (not custom focus rings)
- Supports `asChild` for rendering as links while maintaining button semantics
