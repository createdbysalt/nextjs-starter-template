# Linear Animation Extraction

Extracted from `https://linear.app` on 2026-01-31

## Overview

This package contains Framer Motion implementations of Linear's micro-interactions and page animations, reverse-engineered using WAAPI queries and CSS stylesheet analysis.

## Extraction Method

- **Tier 1 (WAAPI)**: Captured active animations via `document.getAnimations()`
- **Tier 2 (CSS Analysis)**: Extracted transition/animation rules from stylesheets
- **Tier 3 (Visual)**: Observed hover/active states through browser DevTools

## Key Findings

### Easing Curves

Linear uses a custom easing curve for most UI transitions:

```
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

This is referred to as "Linear Standard" in this package. It provides a smooth, professional feel that's slightly faster than the default CSS `ease`.

### Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `instant` | 100ms | Very fast micro-interactions |
| `fast` | 120ms | Context menus, scrollbars |
| `quick` | 150ms | Dropdowns, command palette |
| `normal` | 160ms | Buttons, hamburger icon |
| `standard` | 180ms | Dialogs, modals |
| `relaxed` | 200ms | Feature cards, general transitions |
| `slow` | 250ms | Sidebar collapse, video controls |
| `imageLoad` | 800ms | Image fade-in on load |

### Scale Values

| Context | Scale | Notes |
|---------|-------|-------|
| Button active | 0.97 | Pressed state |
| Menu enter | 0.9 | Context menu entrance |
| Dialog enter | 0.95 | Modal entrance |
| Dropdown | 0.98 | Header dropdown panels |
| Card hover | 1.02 | Feature card hover |

## Components

### Button Animations

```tsx
import { AnimatedButton } from "./button-animations";

<AnimatedButton variant="primary">
  Get started
</AnimatedButton>
```

**Animations:**
- Hover: `filter: brightness(1.1)`
- Active: `scale: 0.97, filter: brightness(0.98)`
- Duration: 160ms
- Easing: Linear Standard

### Card Animations

```tsx
import { AnimatedFeatureCard } from "./card-animations";

<AnimatedFeatureCard>
  <h3>Feature Title</h3>
  <p>Description</p>
</AnimatedFeatureCard>
```

**Animations:**
- Hover: `scale: 1.02, filter: brightness(1.25)`
- Duration: 200ms
- Easing: ease-out

### Modal/Dialog Animations

```tsx
import { AnimatedDialog } from "./modal-animations";

<AnimatedDialog isOpen={isOpen} onClose={close}>
  <DialogContent />
</AnimatedDialog>
```

**Animations:**
- Enter: `opacity: 0, scale: 0.95` -> `opacity: 1, scale: 1`
- Exit: reverse
- Duration: 180ms
- Easing: ease

### Navigation Animations

```tsx
import { AnimatedNavLink } from "./navigation-animations";

<AnimatedNavLink href="/features" isActive={pathname === "/features"}>
  Features
</AnimatedNavLink>
```

**Animations:**
- Hover: Color transitions from `rgb(138, 143, 152)` to `rgb(247, 248, 248)`
- Duration: 100ms
- Easing: Linear Standard

### Page-Level Animations

```tsx
import { FadeInOnView, StaggerContainer, StaggerItem } from "./page-animations";

<FadeInOnView>
  <h2>Section Title</h2>
</FadeInOnView>

<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>{item.name}</StaggerItem>
  ))}
</StaggerContainer>
```

### Loading Animations

```tsx
import { SpinnerLoader, SkeletonLoader, BlinkingCursor } from "./loading-animations";

<SpinnerLoader size={24} />
<SkeletonLoader width={200} height={20} />
<BlinkingCursor />
```

## CSS Variable Reference

Linear uses CSS custom properties for theming. Key animation-related variables:

```css
--shadow-large: /* Used on card hover */
--color-text-primary: rgb(247, 248, 248);
--color-text-secondary: rgb(181, 181, 181);
--color-text-tertiary: rgb(138, 143, 152);
--color-bg-primary: rgb(8, 9, 10);
--color-bg-secondary: rgb(15, 16, 17);
--color-bg-tertiary: rgb(22, 23, 24);
--color-bg-quaternary: rgb(40, 40, 44);
```

## Integration with Tailwind

For Tailwind CSS 4, add these tokens to your `app.css`:

```css
@theme {
  --ease-linear-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-instant: 100ms;
  --duration-fast: 120ms;
  --duration-quick: 150ms;
  --duration-normal: 160ms;
  --duration-standard: 180ms;
  --duration-relaxed: 200ms;
  --duration-slow: 250ms;
}
```

Then use in your components:

```tsx
<button className="transition-all duration-normal ease-linear-standard">
  Click me
</button>
```

## Files

- `animation-spec.json` - Raw extracted animation data
- `button-animations.tsx` - Button hover/tap effects
- `card-animations.tsx` - Feature card hover effects
- `modal-animations.tsx` - Dialog/dropdown/tooltip animations
- `navigation-animations.tsx` - Nav link and mobile menu animations
- `page-animations.tsx` - Viewport-triggered and scroll-linked animations
- `loading-animations.tsx` - Spinners, skeletons, progress indicators
- `index.ts` - Barrel exports

## Notes

1. All components use `"use client"` directive for Next.js App Router compatibility
2. Framer Motion 12.x API is used (compatible with React 19)
3. TypeScript types are included for all components
4. Animations use `will-change: transform` internally for GPU acceleration
