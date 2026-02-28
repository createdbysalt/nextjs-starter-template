# Linear Card Components

**REPLICATED FROM:** https://linear.app/features
**CREATED:** 2026-01-31

## Overview

This package contains pixel-perfect replications of Linear's feature card components as seen on their `/features` page.

## Extracted Styles Summary

### Card Surface
| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `rgb(15, 16, 17)` | `bg-[rgb(15,16,17)]` |
| Border-radius | `16px` | `rounded-2xl` |
| Border | none | - |
| Box-shadow | none | - |
| Padding (desktop) | `32px 24px` | `py-8 px-6` |
| Padding (mobile) | `24px` | `p-6` |

### Typography - Label
| Property | Value | Tailwind |
|----------|-------|----------|
| Font-size | `13px` | `text-[13px]` |
| Font-weight | `510` | `font-medium` |
| Line-height | `1.5` | `leading-[1.5]` |
| Letter-spacing | `-0.01em` | `tracking-[-0.01em]` |
| Color | `rgb(138, 143, 152)` | `text-[rgb(138,143,152)]` |

### Typography - Description
| Property | Value | Tailwind |
|----------|-------|----------|
| Font-size | `15px` | `text-[15px]` |
| Font-weight | `510` | `font-medium` |
| Line-height | `1.6` | `leading-[1.6]` |
| Letter-spacing | `-0.011em` | `tracking-[-0.011em]` |
| Color | `rgb(247, 248, 248)` | `text-[rgb(247,248,248)]` |

### Transitions
```
filter 0.2s ease-out, transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Grid Layout
| Property | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|----------|------------------|----------------|----------------|
| Max-width | `1024px` | `100%` | `100%` |
| Padding | `0 24px` | `0 24px` | `0 24px` |
| Gap (horizontal) | `24px` | `24px` | - |
| Gap (vertical) | `32px` | `24px` | `24px` |
| Columns | 2 (half cards) | 1 | 1 |

## Files Generated

```
.claude/replicator-output/linear-components/card/
├── components/
│   ├── index.ts                    # Barrel export
│   ├── linear-card.tsx             # Base card primitives
│   ├── linear-card.types.ts        # TypeScript types
│   └── linear-feature-card.tsx     # Composite feature card
├── extraction/
│   ├── extracted-styles.json       # Raw extraction data
│   └── tailwind-tokens.css         # CSS tokens to add to globals.css
├── examples/
│   └── feature-cards-example.tsx   # Usage examples
└── README.md                       # This file
```

## Installation

### 1. Copy components to your feature folder

```bash
cp -r .claude/replicator-output/linear-components/card/components/* \
  app/_features/landing/components/
```

### 2. Add CSS tokens to globals.css

Copy the contents of `extraction/tailwind-tokens.css` into your `app/globals.css`:

```css
@theme {
  /* Linear Card Colors */
  --color-linear-page-bg: rgb(8, 9, 10);
  --color-linear-card-bg: rgb(15, 16, 17);
  --color-linear-text-primary: rgb(247, 248, 248);
  --color-linear-text-muted: rgb(138, 143, 152);
}
```

### 3. Import and use

```tsx
import {
  LinearFeatureCard,
  LinearFeatureGrid,
  LinearFullWidthCardWrapper,
} from "@/app/_features/landing/components";

export function FeaturesSection() {
  return (
    <LinearFeatureGrid>
      <LinearFullWidthCardWrapper>
        <LinearFeatureCard
          label="Planning"
          description="Set the product direction with projects and initiatives"
          href="/plan"
          variant="full"
        />
      </LinearFullWidthCardWrapper>

      <LinearFeatureCard
        label="AI"
        description="Streamline product development with AI-powered workflows"
        href="/ai"
        variant="half"
      />
    </LinearFeatureGrid>
  );
}
```

## Components

### LinearCard (Base)
The foundational card surface. Use for custom card layouts.

```tsx
<LinearCard interactive href="/feature">
  {/* Custom content */}
</LinearCard>
```

### LinearFeatureCard (Composite)
Complete feature card with label, description, and arrow.

Props:
- `label`: Category/type text (smaller, muted)
- `description`: Main text (larger, white)
- `variant`: `"full"` or `"half"`
- `href`: Link destination
- `backgroundImage`: Optional React node for background

### LinearFeatureGrid
Container for feature cards with proper max-width and gaps.

### LinearFullWidthCardWrapper
Wrapper to make a card span full width in the grid.

## Responsive Behavior

- **Desktop (1440px+):** 2-column grid for half cards, full width for full cards
- **Tablet (768px):** Single column, all cards full width
- **Mobile (375px):** Single column, all cards full width

## Color Reference

| Name | Value | Usage |
|------|-------|-------|
| Page Background | `rgb(8, 9, 10)` | Page/section background |
| Card Background | `rgb(15, 16, 17)` | Card surface |
| Primary Text | `rgb(247, 248, 248)` | Card descriptions |
| Muted Text | `rgb(138, 143, 152)` | Labels, arrows |
| Subtle Text | `rgb(98, 102, 109)` | Disabled states |

## Validation

Extraction verified at viewports:
- 1440px (Desktop)
- 768px (Tablet)
- 375px (Mobile)

All computed styles extracted using `getComputedStyle()` in browser.
