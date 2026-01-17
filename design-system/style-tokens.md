# {{CLIENT_NAME}} Style Tokens

CSS variables and design tokens for {{CLIENT_NAME}} website.

**Project**: {{PROJECT_CODENAME}}  
**Framework**: Client-First v2  
**Last Updated**: {{LAST_UPDATED}}

---

## How to Use

These tokens should be used in:
1. **React Prototypes** → Reference in Tailwind config
2. **Webflow** → Apply in Style Guide and global CSS
3. **Custom CSS** → Use CSS variables

---

## Color Tokens

### CSS Variables
```css
:root {
  /* Primary Colors */
  --color-primary: {{PRIMARY_COLOR}};            /* e.g., #3B82F6 */
  --color-primary-hover: #[HEX];                  /* Darker shade */
  --color-primary-active: #[HEX];                 /* Even darker */
  
  /* Secondary Colors */
  --color-secondary: {{SECONDARY_COLOR}};         /* e.g., #10B981 */
  --color-secondary-hover: #[HEX];
  
  /* Accent Colors */
  --color-accent: {{ACCENT_COLOR}};               /* e.g., #F59E0B */
  --color-accent-hover: #[HEX];
  
  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-black: #000000;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Background Colors */
  --color-background: #FFFFFF;
  --color-background-alt: #F9FAFB;
  
  /* Text Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-text-inverse: #FFFFFF;
  
  /* Border Colors */
  --color-border: #E5E7EB;
  --color-border-hover: #D1D5DB;
}
```

### Tailwind Config Mapping
```javascript
// tailwind.config.js
colors: {
  'brand': {
    'primary': '{{PRIMARY_COLOR}}',
    'secondary': '{{SECONDARY_COLOR}}',
    'accent': '{{ACCENT_COLOR}}',
  },
  'neutral': {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... etc
  }
}
```

### Webflow Style Guide

In Webflow Designer → Style Guide → Colors:
1. Create color: "Brand Primary" → `{{PRIMARY_COLOR}}`
2. Create color: "Brand Secondary" → `{{SECONDARY_COLOR}}`
3. Create color: "Brand Accent" → `{{ACCENT_COLOR}}`
4. Add all neutral grays (50-900)

---

## Typography Tokens

### Font Families
```css
:root {
  --font-heading: {{HEADING_FONT}}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: {{BODY_FONT}}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Courier New', monospace;
}
```

### Font Sizes
```css
:root {
  /* Headings */
  --text-h1: 3.5rem;      /* 56px */
  --text-h2: 3rem;        /* 48px */
  --text-h3: 2rem;        /* 32px */
  --text-h4: 1.5rem;      /* 24px */
  --text-h5: 1.25rem;     /* 20px */
  --text-h6: 1rem;        /* 16px */
  
  /* Body Text */
  --text-xl: 1.25rem;     /* 20px */
  --text-lg: 1.125rem;    /* 18px */
  --text-base: 1rem;      /* 16px */
  --text-sm: 0.875rem;    /* 14px */
  --text-xs: 0.75rem;     /* 12px */
}
```

### Font Weights
```css
:root {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Line Heights
```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Tailwind Config Mapping
```javascript
// tailwind.config.js
fontSize: {
  'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
  'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
  // ... etc
}
```

---

## Spacing Tokens

### Spacing Scale
```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-8: 2rem;        /* 32px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-32: 8rem;       /* 128px */
  
  /* Section Padding (Client-First) */
  --padding-section-small: 2.5rem;    /* 40px */
  --padding-section-medium: 5rem;     /* 80px */
  --padding-section-large: 7.5rem;    /* 120px */
  --padding-section-huge: 10rem;      /* 160px */
  
  /* Global Padding (Client-First) */
  --padding-global: 2.5rem;           /* 40px - sides */
}
```

### Container Widths (Client-First)
```css
:root {
  --container-small: 960px;
  --container-medium: 1280px;
  --container-large: 1440px;
}
```

---

## Border & Radius Tokens

### Border Radius
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 1rem;      /* 16px */
  --radius-xl: 1.5rem;    /* 24px */
  --radius-2xl: 2rem;     /* 32px */
  --radius-full: 9999px;  /* Pill shape */
}
```

### Border Width
```css
:root {
  --border-thin: 1px;
  --border-default: 2px;
  --border-thick: 4px;
}
```

---

## Shadow Tokens
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-none: none;
}
```

---

## Z-Index Scale
```css
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

---

## Transition Tokens
```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
  
  /* Timing Functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Breakpoints
```css
:root {
  --breakpoint-mobile-portrait: 479px;
  --breakpoint-mobile-landscape: 767px;
  --breakpoint-tablet: 991px;
  --breakpoint-desktop: 1279px;
  --breakpoint-wide: 1440px;
}
```

### Tailwind Config
```javascript
screens: {
  'sm': '480px',    // Mobile landscape
  'md': '768px',    // Tablet
  'lg': '992px',    // Desktop
  'xl': '1280px',   // Wide
  '2xl': '1440px',  // Ultra-wide
}
```

---

## Usage Examples

### In React (Tailwind)
```jsx
<div className="container-large padding-section-medium">
  <h1 className="text-h1 text-brand-primary">
    Hero Title
  </h1>
  <button className="bg-brand-primary hover:bg-brand-primary-hover rounded-lg">
    Click Me
  </button>
</div>
```

### In Webflow (Client-First)
```html
<!-- Section structure -->
<div class="section_hero">
  <div class="padding-global">
    <div class="container-large">
      <div class="padding-section-large">
        <h1 class="heading-style-h1">Hero Title</h1>
      </div>
    </div>
  </div>
</div>
```

### In Custom CSS
```css
.custom-card {
  background: var(--color-background);
  border: var(--border-default) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}

.custom-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
```

---

## Webflow Global CSS Embed

Add this to Webflow Site Settings → Custom Code → Head:
```html
<style>
:root {
  /* Copy all CSS variables from above */
  --color-primary: {{PRIMARY_COLOR}};
  /* ... etc */
}

/* Apply to Client-First classes */
.button-primary {
  background-color: var(--color-primary);
  transition: var(--transition-base);
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}
</style>
```

---

## Maintenance

**When to Update:**
- Brand refresh or rebrand
- Adding new component patterns
- Responsive breakpoint adjustments
- Accessibility improvements

**How to Update:**
1. Update this file
2. Update `brand-guidelines.md`
3. Update Tailwind config
4. Update Webflow Style Guide
5. Test on existing components
6. Commit changes with description

---

## Resources

- **Tailwind Config**: `prototype/tailwind.config.js`
- **Client-First Base**: `prototype/src/styles/client-first-base.css`
- **Webflow Style Guide**: [Link to Webflow site]
- **Figma Design Tokens**: [Link to Figma file]