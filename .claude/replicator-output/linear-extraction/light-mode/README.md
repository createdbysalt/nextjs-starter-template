# Linear Light Mode Extraction

Extracted from https://linear.app on 2026-01-31

## Overview

Linear's marketing site defaults to dark mode, but includes a complete light mode theme accessible via the `data-theme` attribute. This extraction captures all light mode design tokens by forcing `data-theme="light"` on the document root.

## Files

```
light-mode/
  extraction/
    extracted-styles.json     # Complete light mode design tokens
    tailwind-tokens.css       # Tailwind CSS 4 compatible variables
    theme-comparison.json     # Dark vs light mode comparison
  screenshots/
    README.md                 # Screenshot locations and notes
```

## Key Findings

### Color Palette (Light Mode)

| Token | Value | Usage |
|-------|-------|-------|
| `--linear-bg-primary` | `#FFFFFF` | Main background |
| `--linear-bg-secondary` | `#f9f8f9` | Card backgrounds |
| `--linear-bg-muted` | `#f4f4f4` | Muted sections |
| `--linear-text-primary` | `rgb(40, 42, 48)` | Headings, body |
| `--linear-text-secondary` | `rgb(60, 65, 73)` | Secondary text |
| `--linear-text-tertiary` | `rgb(111, 110, 119)` | Muted text |
| `--linear-border-subtle` | `rgba(0, 0, 0, 0.05)` | Card borders |
| `--linear-border-medium` | `rgba(0, 0, 0, 0.08)` | Header border |

### Typography (Unchanged from Dark Mode)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Desktop) | 64px | 510 | 1.06 |
| H1 (Tablet) | 48px | 510 | 1.1 |
| H1 (Mobile) | 40px | 510 | 1.1 |
| H2 | 56px | 538 | 1.1 |
| H3 | 21px | 510 | 1.33 |
| Body | 17px | 400 | 1.6 |
| Caption | 13px | 400 | 1.5 |

### Shadows (Light Mode)

Lighter shadows for subtlety on white backgrounds:

```css
--linear-shadow-low: 0px 1px 4px -1px rgba(0, 0, 0, 0.09);
--linear-shadow-medium: 0px 3px 12px rgba(0, 0, 0, 0.09);
--linear-shadow-high: 0px 7px 24px rgba(0, 0, 0, 0.06);
```

### Buttons (Light Mode)

**Primary Button:**
- Background: `rgb(40, 42, 48)` (dark)
- Text: `#FFFFFF` (white)
- Border Radius: `8px`

**Secondary Button:**
- Background: `#FFFFFF` (white)
- Text: `rgb(40, 42, 48)` (dark)
- Border: `1px solid rgba(0, 0, 0, 0.16)`
- Shadow: `0px 1px 4px -1px rgba(0, 0, 0, 0.09)`

**Ghost Button:**
- Background: `transparent`
- Text: `rgb(111, 110, 119)` (tertiary)

### Header (Light Mode)

```css
background-color: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(0, 0, 0, 0.08);
height: 65px;
```

## Responsive Breakpoints

| Viewport | H1 Size | Section Padding |
|----------|---------|-----------------|
| 1440px | 64px | 160px |
| 768px | 48px | 64px |
| 375px | 40px | 48px |

## Implementation

### Enabling Light Mode

```javascript
// Force light mode
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.style.colorScheme = 'light';
```

### Using Tokens in Tailwind

```tsx
// In globals.css
@import './tailwind-tokens.css';

// In components
<div className="bg-linear-primary text-linear-primary">
  <h1 className="text-linear-primary">Light Mode Heading</h1>
  <p className="text-linear-tertiary">Secondary text</p>
</div>
```

### Theme Toggle Component

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

## Contrast Adjustments

Key differences between dark and light mode:

1. **Backgrounds**: Inverted from black to white
2. **Text**: Inverted from white to dark charcoal
3. **Borders**: Switch from `rgba(255,255,255,X)` to `rgba(0,0,0,X)`
4. **Shadows**: Lower opacity values for subtlety
5. **Buttons**: Primary inverts (dark bg on light mode)

## Font Stack

```css
--linear-font-sans: "Inter Variable", "SF Pro Display", -apple-system,
  BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
  "Cantarell", "Open Sans", "Helvetica Neue", sans-serif;

--linear-font-mono: "Berkeley Mono", ui-monospace, "SF Mono", "Menlo", monospace;
```

## Notes

- Linear's public marketing site shows dark mode by default
- Light mode is fully supported via theming system
- All accent/brand colors remain consistent between themes
- Typography sizing and weights are theme-agnostic
