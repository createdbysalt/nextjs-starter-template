# Prototype Environment Context

**Purpose**: React + GSAP prototyping environment for Webflow translation  
**Stack**: React 18, Vite, Tailwind CSS, GSAP 3.12  
**Goal**: Build interactive components that translate cleanly to Webflow

---

## Role When Working Here

You are a **React Prototype Developer** with Webflow expertise.

Your code must be:
1. **Webflow-translatable** (simple structure, under 4 nesting levels)
2. **Brand-compliant** (uses design system tokens)
3. **Performant** (60fps animations, optimized images)
4. **Production-ready** (no TODOs, no console.logs)

---

## Directory Structure
```
prototype/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx
│   │   ├── FeatureGrid.jsx
│   │   └── [ComponentName].jsx
│   ├── animations/          # GSAP animation logic
│   │   ├── heroTimeline.js
│   │   └── scrollTriggers.js
│   ├── pages/              # Full page compositions
│   │   ├── HomePage.jsx
│   │   └── AboutPage.jsx
│   ├── data/               # Mock data (becomes CMS)
│   │   ├── mockHeroData.js
│   │   └── mockFeaturesData.js
│   ├── styles/
│   │   └── main.css        # Global styles
│   ├── App.jsx             # Router/main app
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── vite.config.js
├── tailwind.config.js
├── package.json
└── CLAUDE.md              # This file
```

---

## Core Principles

### 1. Webflow Compatibility First

**Every component must be manually rebuildable in Webflow.**
```jsx
// ✅ GOOD: Simple, flat structure
export function Card({ title, description, image }) {
  return (
    <div className="card" data-webflow-name="Card">
      <img src={image} alt={title} />
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
    </div>
  );
}

// ❌ BAD: Too complex for Webflow
export function Card() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data } = useQuery(GET_DATA);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Complex state logic that won't exist in Webflow */}
    </motion.div>
  );
}
```

### 2. Props = Future CMS Fields

**Component props should map 1:1 to Webflow CMS fields.**
```jsx
// ✅ GOOD: Each prop is a CMS field
export function BlogPost({
  title,           // → CMS: Plain Text
  excerpt,         // → CMS: Plain Text
  featuredImage,   // → CMS: Image
  author,          // → CMS: Reference (Author collection)
  publishDate,     // → CMS: Date
  slug             // → CMS: Plain Text
}) {
  // ...
}

// ❌ BAD: Complex props that don't map to CMS
export function BlogPost({
  onUpdate,              // Webflow has no event handlers
  className,             // Webflow handles classes visually
  renderCustomFooter     // Webflow can't do custom renders
}) {
  // ...
}
```

### 3. Mock Data = CMS Schema

**Mock data structure becomes the CMS collection schema.**
```javascript
// data/mockBlogPosts.js

// This structure defines the CMS collection
export const blogPosts = [
  {
    id: 1,                    // → CMS: Auto-generated
    title: "Post Title",      // → CMS Field: Plain Text
    excerpt: "Summary...",    // → CMS Field: Plain Text
    featuredImage: "/img",    // → CMS Field: Image
    author: {                 // → CMS Field: Reference
      name: "John Doe",
      avatar: "/avatar.jpg"
    },
    publishDate: "2026-01-15", // → CMS Field: Date
    slug: "post-title"         // → CMS Field: Plain Text
  }
];

// This will generate YAML schema:
// collection:
//   name: Blog Posts
//   fields:
//     - title (Plain Text)
//     - excerpt (Plain Text)
//     - featuredImage (Image)
//     - author (Reference → Authors)
//     - publishDate (Date)
//     - slug (Plain Text)
```

---

## Component Patterns

### Basic Component Template
```jsx
/**
 * [Component Name]
 * 
 * WEBFLOW TRANSLATION:
 * - Element type: Section / Div / etc.
 * - CMS binding: Yes/No
 * - Animation: [Animation file name if applicable]
 * 
 * BRAND COMPLIANCE:
 * - Colors: Uses --color-primary, --color-secondary
 * - Typography: Uses --text-* tokens
 * - Spacing: Uses --space-* tokens
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { componentAnimation } from '../animations/componentAnimation';

export function ComponentName({ 
  prop1,  // Description and CMS field type
  prop2   // Description and CMS field type
}) {
  const componentRef = useRef(null);
  
  // Animation (if needed)
  useGSAP(() => {
    if (componentRef.current) {
      componentAnimation(componentRef.current);
    }
  }, []);
  
  return (
    <section 
      ref={componentRef}
      className="component-name"
      data-webflow-name="Component Name"
      data-gsap-animation="component-entrance"
    >
      <div className="component-name__container">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Naming Conventions

**File names:** PascalCase
```
Hero.jsx
FeatureGrid.jsx
PricingTable.jsx
```

**Component names:** PascalCase (match file name)
```jsx
export function Hero() { }
export function FeatureGrid() { }
```

**Class names:** BEM (Block Element Modifier)
```css
.hero                  /* Block */
.hero__title           /* Element */
.hero__title--large    /* Modifier */
```

**Data attributes:** kebab-case
```jsx
data-webflow-name="Hero Section"
data-gsap-animation="hero-entrance"
data-cms-item="blog-post"
```

---

## Styling Guidelines

### Tailwind Usage

**Use Tailwind for prototyping, but keep Webflow in mind.**
```jsx
// ✅ GOOD: Standard Tailwind classes that map to Webflow
<div className="flex items-center justify-between p-8 gap-4">

// ⚠️ CAUTION: Arbitrary values won't translate
<div className="p-[23px] text-[#3B82F6]">
// Better: Use design tokens
<div className="p-6 text-primary">

// ❌ AVOID: Complex Tailwind that has no Webflow equivalent
<div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
```

### Class Mapping to Webflow

**When component is translated, Tailwind classes become Webflow classes:**
```jsx
// React prototype
<div className="hero flex items-center p-8">

// Webflow translation
Element: Div Block
Class: "hero"
Settings:
  - Display: Flex
  - Align Items: Center
  - Padding: 64px (all sides)
```

### Custom CSS

**Avoid when possible. If needed, keep it simple.**
```css
/* ✅ GOOD: Simple, Webflow-compatible */
.hero__gradient {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
}

/* ❌ BAD: Complex CSS that's hard to replicate */
.hero__complex {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  backdrop-filter: blur(10px) saturate(180%);
  mask-image: radial-gradient(circle, black 50%, transparent);
}
```

---

## Animation Patterns

### GSAP Standards

**Location:** `src/animations/[name].js`

**Template:**
```javascript
import gsap from 'gsap';

/**
 * [Animation Name]
 * 
 * Trigger: [page load / scroll / hover / click]
 * Duration: [total duration]
 * Webflow: [Will be IX2 / Custom embed]
 */

export function animationName(element) {
  // Safety check
  if (!element) {
    console.warn('Animation target element not found');
    return;
  }
  
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 0.6
    }
  });
  
  tl.from(element.querySelector('.target'), {
    opacity: 0,
    y: 50
  });
  
  return tl;
}
```

### Performance Rules

**ONLY animate these properties (GPU-accelerated):**
- `opacity`
- `transform` (translateX, translateY, scale, rotate)

**NEVER animate:**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `padding`, `margin`
- `background-position`
```javascript
// ✅ GOOD: 60fps
gsap.to(element, {
  opacity: 1,
  y: 0,
  scale: 1.1
});

// ❌ BAD: Causes layout reflow, janky
gsap.to(element, {
  width: '500px',
  top: '100px',
  padding: '20px'
});
```

### Webflow Translation Notes

**Add comments for Webflow translation:**
```javascript
/**
 * Hero Entrance Animation
 * 
 * WEBFLOW DECISION: Custom Embed (too complex for IX2)
 * 
 * Why: Staggered timeline with custom easing
 * Dependencies: GSAP Core
 * File: webflow-embeds/animations/hero-entrance.js
 * 
 * Selectors needed in Webflow:
 * - [data-gsap-animation="hero-entrance"] on <section>
 * - .hero__title on heading
 * - .hero__description on paragraph
 * - .btn on button
 */
export function heroEntrance(container) {
  // ...
}
```

---

## Data Management

### Mock Data Structure

**File:** `src/data/mock[Entity]Data.js`
```javascript
/**
 * Mock data for [Entity Name]
 * 
 * CMS COLLECTION: [Collection Name]
 * FIELDS: See inline comments
 * 
 * This structure will be used to generate:
 * - translation-docs/cms-models/[entity]-collection.yaml
 */

export const entityData = [
  {
    // Each property = CMS field
    id: 1,                      // Auto-generated by Webflow
    
    // Text fields
    title: "Example Title",     // Type: Plain Text, Required
    description: "...",         // Type: Plain Text
    
    // Rich text (if needed)
    content: "<p>HTML...</p>",  // Type: Rich Text
    
    // Media
    image: "/path/to/image.jpg", // Type: Image
    
    // Dates
    publishDate: "2026-01-15",  // Type: Date
    
    // Booleans (for conditional rendering)
    featured: true,             // Type: Bool
    
    // References (relationships)
    categoryRef: 5,             // Type: Reference → Categories collection
    
    // Multi-reference
    tagRefs: [1, 3, 7],        // Type: Multi-reference → Tags collection
    
    // Numbers
    price: 29.99,              // Type: Number
    
    // URLs/Links
    externalLink: "https://...", // Type: Link
    slug: "example-title"       // Type: Plain Text (for URL)
  }
];
```

### Importing Data
```jsx
// In component
import { entityData } from '../data/mockEntityData';

export function EntityList() {
  return (
    <div className="entity-list">
      {entityData.map(item => (
        <EntityCard key={item.id} {...item} />
      ))}
    </div>
  );
}
```

---

## File Organization

### When to Create New Files

**New Component:**
```bash
# If component is reusable and >50 lines
src/components/ComponentName.jsx

# If component is page-specific
src/pages/PageName.jsx
```

**New Animation:**
```bash
# If animation is >10 lines or reusable
src/animations/animationName.js

# If animation is inline, keep in component
```

**New Data:**
```bash
# Create separate file for each entity/collection
src/data/mockHeroData.js
src/data/mockFeaturesData.js
src/data/mockBlogPosts.js
```

### Import Order
```jsx
// 1. External dependencies
import { useState, useRef } from 'react';
import gsap from 'gsap';

// 2. Internal components
import { Button } from './Button';
import { Card } from './Card';

// 3. Animations
import { heroAnimation } from '../animations/heroTimeline';

// 4. Data
import { heroData } from '../data/mockHeroData';

// 5. Styles (if not using Tailwind exclusively)
import './Hero.css';
```

---

## Development Workflow

### Starting Development
```bash
# 1. Navigate to prototype
cd prototype

# 2. Install dependencies (first time only)
pnpm install

# 3. Start dev server
pnpm dev

# Browser opens at: http://localhost:5173
```

### Hot Reload

Changes auto-reload in browser (Vite HMR):
- ✅ Component changes
- ✅ Style changes
- ✅ Data changes
- ⚠️ Config changes require server restart

### Building for Production
```bash
# Test production build
pnpm build
pnpm preview

# Preview opens at: http://localhost:4173
```

---

## Integration with Design System

### Loading Design Tokens

**In `tailwind.config.js`:**
```javascript
// Import tokens from design system
const tokens = {
  colors: {
    primary: '#3B82F6',      // From ../design-system/style-tokens.md
    secondary: '#10B981',
    accent: '#F59E0B'
  },
  spacing: {
    // Map --space-* tokens
  },
  fontSize: {
    // Map --text-* tokens
  }
};

module.exports = {
  theme: {
    extend: tokens
  }
};
```

**In components:**
```jsx
// Reference design system tokens via Tailwind
<h1 className="text-5xl font-heading text-gray-900">
  {/* text-5xl = --text-5xl from design system */}
  {/* font-heading = --font-heading from design system */}
</h1>
```

---

## Testing Guidelines

### Manual Testing Checklist

Before considering component "done":

- [ ] **Desktop**: Test at 1920px, 1440px, 1280px
- [ ] **Tablet**: Test at 1024px, 768px
- [ ] **Mobile**: Test at 375px, 414px
- [ ] **Animations**: Smooth 60fps (check DevTools Performance)
- [ ] **Images**: All load correctly
- [ ] **Links**: All functional (even if mock)
- [ ] **Text**: No lorem ipsum (use real or realistic copy)
- [ ] **Responsive**: Layout doesn't break at any size
- [ ] **Accessibility**: Keyboard navigable, good contrast

### Browser Testing

**Primary:**
- Chrome (latest)

**Before client presentation:**
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Common Patterns

### Conditional Rendering
```jsx
// ✅ GOOD: Simple conditional for Webflow
{featured && (
  <div className="badge">Featured</div>
)}

// In Webflow: Use Conditional Visibility on badge element
// Condition: featured field = true
```

### Lists/Loops
```jsx
// ✅ GOOD: Maps to Webflow Collection List
{features.map(feature => (
  <FeatureCard key={feature.id} {...feature} />
))}

// In Webflow:
// 1. Create Collection List
// 2. Bind to Features collection
// 3. Style the Collection Item (represents FeatureCard)
```

### Links
```jsx
// ✅ GOOD: Simple links that work in Webflow
<a href={link} className="btn btn--primary">
  {ctaText}
</a>

// ❌ BAD: React Router links don't exist in Webflow
<Link to="/about">About</Link>

// Instead: Use regular <a> tags with href
```

---

## Webflow Translation Hints

### Data Attributes for Documentation

**Add these to help with translation:**
```jsx
<section 
  className="hero"
  data-webflow-name="Hero Section"           // What to name in Webflow
  data-webflow-element="Section"             // Element type
  data-gsap-animation="hero-entrance"        // Animation identifier
  data-cms-binding="hero-sections"           // CMS collection to bind
>
```

### Comments for Complex Logic
```jsx
{/* 
  WEBFLOW NOTE: This alternating layout is achieved with:
  - Collection List set to 2 columns
  - Combo class .feature-card--reverse on even items
  - Flex direction: row-reverse on .feature-card--reverse
*/}
<div className={`feature-card ${index % 2 === 0 ? 'feature-card--reverse' : ''}`}>
```

---

## Quality Standards

### Before Committing

- [ ] No `console.log()` statements
- [ ] No commented-out code
- [ ] No TODO comments (create GitHub issue instead)
- [ ] All components have JSDoc comments
- [ ] All animations are performant (60fps)
- [ ] Code is formatted (`pnpm format`)
- [ ] No linter errors (`pnpm lint`)
- [ ] Brand guidelines followed
- [ ] Tested in browser

### Code Review Checklist

- [ ] Component is under 4 nesting levels
- [ ] Props map to CMS fields
- [ ] Classes use BEM naming
- [ ] Animations use transform/opacity only
- [ ] No complex React patterns (Context, Suspense, etc.)
- [ ] Mock data structure is CMS-ready
- [ ] Responsive behavior tested

---

## Don't

❌ Use complex React patterns (Webflow won't support)  
❌ Assume props will be passed (Webflow is static HTML)  
❌ Use npm packages in production (Webflow needs CDN)  
❌ Animate width, height, top, left  
❌ Nest components more than 4 levels deep  
❌ Hardcode values (use design tokens)  
❌ Leave console.logs in code  

## Do

✅ Keep components simple and flat  
✅ Use props that map to CMS fields  
✅ Reference design system tokens  
✅ Add data-webflow-* attributes  
✅ Document complex translation logic  
✅ Test responsive behavior  
✅ Use GSAP for animations (Webflow-compatible)  
✅ Format code before committing  

---

**Remember**: This prototype is a **specification** for the Webflow build. Make it beautiful, interactive, and brand-compliant, but keep it simple enough to rebuild manually if needed.

---

**Last Updated**: {{LAST_UPDATED}}  
**Maintained by**: SALT STUDIO