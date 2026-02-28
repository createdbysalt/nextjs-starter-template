# Vercel Design System Extraction

**Source:** https://vercel.com
**Extracted:** 2026-01-31
**Method:** Browser automation with `getComputedStyle()` extraction

## Quick Start

Import the Tailwind tokens in your `globals.css`:

```css
@import './.claude/replicator-output/vercel-extraction/extraction/tailwind-tokens.css';
```

## Files

```
vercel-extraction/
├── README.md                           # This file
├── extraction/
│   ├── extracted-styles.json           # Complete style data by viewport
│   ├── tailwind-tokens.css             # CSS variables for Tailwind v4
│   ├── component-patterns.json         # Component structure patterns
│   └── assets-inventory.json           # Images and media catalog
└── screenshots/
    └── (screenshots saved to .playwright-mcp/)
```

## Typography System (Geist)

| Role | Desktop (1440px) | Mobile (375px) |
|------|------------------|----------------|
| Hero H1 | 48px / 600 / -2.4px | 40px / 510 / -0.88px |
| Section H2 | 40px / 600 / -2.4px | 40px / 538 / -0.6px |
| Card Title H3 | 32px / 600 / -1.28px | 24px / 510 / -0.288px |
| Feature H3 | 24px / 600 / -0.96px | 21px / 510 / -0.37px |
| Lead Paragraph | 20px / 400 / normal | 17px / 400 / normal |
| Body | 16px / 400 / normal | 15px / 400 / -0.165px |
| Small | 14px / 400 / normal | 13px / 500 / normal |
| Caption | 12px / 400 / normal | - |
| Code | 13px / 500 (Geist Mono) | - |

**Key Typography Patterns:**
- Tight letter-spacing on headings (-0.04em to -0.06em)
- Line heights close to 1:1 for large text
- Font weight 600 on desktop, variable 510-538 on smaller screens

## Color System

### Backgrounds
| Token | Value | Hex |
|-------|-------|-----|
| Primary | `rgb(255, 255, 255)` | `#FFFFFF` |
| Secondary | `rgb(250, 250, 250)` | `#FAFAFA` |
| Muted | `rgb(235, 235, 235)` | `#EBEBEB` |
| Inverted | `rgb(23, 23, 23)` | `#171717` |
| Accent (Blue) | `rgb(0, 112, 243)` | `#0070F3` |

### Text
| Token | Value | Hex |
|-------|-------|-----|
| Primary | `rgb(23, 23, 23)` | `#171717` |
| Secondary | `rgb(102, 102, 102)` | `#666666` |
| Muted | `rgb(168, 168, 168)` | `#A8A8A8` |
| Inverted | `rgb(255, 255, 255)` | `#FFFFFF` |
| Link | `rgb(0, 112, 243)` | `#0070F3` |

### Borders
| Token | Value |
|-------|-------|
| Subtle | `rgba(0, 0, 0, 0.08)` |
| Default | `rgb(235, 235, 235)` |

## Button Variants

### Primary (Dark)
```css
background: rgb(23, 23, 23);
color: rgb(255, 255, 255);
border-radius: 100px;  /* Pill shape */
height: 48px;
padding: 0px 14px;
font-size: 16px;
font-weight: 500;
transition: all 0.15s ease;
```

### Secondary (Light)
```css
background: rgb(255, 255, 255);
color: rgb(23, 23, 23);
border-radius: 100px;
height: 48px;
padding: 0px 14px;
```

### Small Button
```css
height: 32px;
padding: 0px 6px;
font-size: 14px;
border-radius: 6px;
```

### Pill Button
```css
height: 40px;
padding: 0px 10px;
font-size: 14px;
border-radius: 100px;
```

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | 64px | Vertical section spacing |
| Container padding | 0px / 24px | Edge padding (mobile) |
| Button padding sm | 0px 6px | Small buttons |
| Button padding md | 0px 10px | Medium buttons |
| Button padding lg | 0px 14px | Large buttons |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| None | 0px | - |
| Small | 4px | Subtle rounding |
| Default | 6px | Buttons, inputs |
| Medium | 8px | Cards |
| Large | 12px | Feature cards |
| Pill | 100px | CTA buttons |
| Full | 9999px | Fully rounded |
| Circle | 50% | Icon buttons |

## Shadows

Vercel uses very subtle shadows:

```css
/* Card shadow */
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px,
            rgba(0, 0, 0, 0.04) 0px 2px 2px 0px,
            rgb(250, 250, 250) 0px 0px 0px 1px;

/* Card hover */
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px,
            rgba(0, 0, 0, 0.04) 0px 2px 2px 0px,
            rgba(0, 0, 0, 0.04) 0px 8px 8px -8px,
            rgb(250, 250, 250) 0px 0px 0px 1px;
```

## Transitions

Standard transition timing:
```css
transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
```

Smooth easing for complex animations:
```css
transition: all 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99);
```

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| Desktop (1440px+) | Full typography scale, 0px edge padding |
| Tablet (768-1024px) | Adjusted heading sizes, 24px container padding |
| Mobile (375-767px) | Reduced typography, smaller buttons, 24px padding |

## Font Installation

For Next.js projects:

```tsx
// app/layout.tsx
import { GeistSans, GeistMono } from 'geist/font';

export default function RootLayout({ children }) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Install Geist fonts:
```bash
pnpm add geist
```

## Usage with Tailwind v4

The `tailwind-tokens.css` file exports CSS custom properties that can be used directly or mapped to Tailwind utilities:

```tsx
// Using CSS variables directly
<h1 className="text-[length:var(--text-hero)] font-semibold tracking-[var(--tracking-hero)]">
  Hero Title
</h1>

// Or use the utility classes defined in tailwind-tokens.css
<h1 className="text-hero">Hero Title</h1>
```
