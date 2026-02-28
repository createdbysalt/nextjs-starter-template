# Code Conventions

**Stack**: Next.js 15 + TypeScript + Tailwind + shadcn/ui
**Updated**: 2026-01-21

---

## TypeScript Conventions

### Strict Mode

TypeScript strict mode is enabled. No exceptions.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Types vs Interfaces

```typescript
// Use `interface` for objects (extendable)
interface User {
  id: string
  name: string
  email: string
}

// Use `type` for unions and primitives
type Status = 'idle' | 'loading' | 'success' | 'error'
type ID = string | number
```

### Props Naming

```typescript
// Component props: ComponentNameProps
interface HeroSectionProps {
  title: string
  className?: string
}

// Function parameters: use descriptive names
function formatDate(date: Date, options: FormatOptions): string
```

### No `any` Type

```typescript
// ❌ Never
function handleData(data: any) {}

// ✅ Always type properly
function handleData(data: UserData) {}

// ✅ Use unknown for truly unknown data
function handleUnknown(data: unknown) {
  if (isUserData(data)) {
    // Now typed as UserData
  }
}
```

### Import Types

```typescript
// ✅ Use type imports when only importing types
import type { User, Post } from '@/types'

// ✅ Mix when importing both values and types
import { formatDate, type DateFormat } from '@/lib/date'
```

---

## React Conventions

### Component Structure

```typescript
// 1. Imports
import { cn } from '@/lib/utils'
import type { ComponentNameProps } from './types'

// 2. Types/Interfaces (if not imported)
interface ComponentNameProps {
  // ...
}

// 3. Component
export function ComponentName({ prop1, prop2, className }: ComponentNameProps) {
  // 4. Hooks (if client component)

  // 5. Derived state/computations

  // 6. Event handlers

  // 7. Return JSX
  return (
    <div className={cn('base-classes', className)}>
      {/* Content */}
    </div>
  )
}
```

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection` |
| Files (components) | kebab-case | `hero-section.tsx` |
| Files (pages) | kebab-case folders | `app/about/page.tsx` |
| Hooks | camelCase with use prefix | `useScrollPosition` |
| Utilities | camelCase | `formatDate` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| Types/Interfaces | PascalCase | `UserData` |

### Server vs Client Components

```typescript
// Server Component (default) - no directive needed
export function StaticContent() {
  return <div>Static content</div>
}

// Client Component - directive required
'use client'

import { useState } from 'react'

export function InteractiveContent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**Use 'use client' only when:**
- Using hooks (useState, useEffect, etc.)
- Using event handlers (onClick, onChange, etc.)
- Using browser APIs (window, localStorage, etc.)
- Using Framer Motion

### Props Destructuring

```typescript
// ✅ Destructure in function signature
export function Card({ title, description, className }: CardProps) {
  return <div className={className}>{title}</div>
}

// ❌ Don't use props.x repeatedly
export function Card(props: CardProps) {
  return <div className={props.className}>{props.title}</div>
}
```

---

## Styling Conventions

### Tailwind Classes Order

Follow logical grouping:

```tsx
<div
  className={cn(
    // Layout
    'flex items-center justify-between',
    // Sizing
    'w-full h-16',
    // Spacing
    'px-4 py-2 gap-4',
    // Colors
    'bg-background text-foreground',
    // Borders
    'border border-border rounded-lg',
    // Effects
    'shadow-sm hover:shadow-md',
    // Transitions
    'transition-shadow duration-200',
    // Responsive
    'md:px-6 lg:px-8',
    // Conditional
    isActive && 'ring-2 ring-primary'
  )}
>
```

### CSS Variables (Colors)

Use shadcn/ui color system:

```typescript
// ✅ Use semantic colors
'bg-background'
'text-foreground'
'bg-primary'
'text-primary-foreground'
'bg-muted'
'text-muted-foreground'
'border-border'
'bg-destructive'

// ❌ Don't use arbitrary colors
'bg-[#1a1a1a]'
'text-[#666]'
```

### Responsive Design

Mobile-first approach:

```typescript
// Base styles for mobile, then scale up
<div className="
  px-4          // Mobile
  md:px-6       // Tablet
  lg:px-8       // Desktop
">

// Common breakpoints
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

### No Custom CSS

```typescript
// ❌ Don't create CSS files
// styles/component.css

// ❌ Don't use inline styles
<div style={{ padding: 20 }}>

// ❌ Don't use CSS modules
import styles from './component.module.css'

// ✅ Use Tailwind only
<div className="p-5">
```

---

## File Structure Conventions

### Component Files

```
src/components/
├── ui/                     # shadcn/ui components (don't modify)
│   ├── button.tsx
│   └── card.tsx
├── sections/               # Page sections
│   ├── hero-section.tsx
│   └── features-grid.tsx
├── layout/                 # Layout components
│   ├── header.tsx
│   └── footer.tsx
└── forms/                  # Form components
    └── contact-form.tsx
```

### Page Files

```
src/app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── loading.tsx             # Global loading
├── error.tsx               # Global error
├── not-found.tsx           # 404 page
├── (marketing)/            # Route group (no URL segment)
│   ├── about/
│   │   └── page.tsx
│   └── services/
│       └── page.tsx
└── api/                    # API routes
    └── contact/
        └── route.ts
```

### Exports

```typescript
// ✅ Named exports for components
export function HeroSection() {}

// ✅ Default export only for pages
export default function HomePage() {}

// ❌ Don't mix
export default function Component() {}  // In component files
```

---

## Import Conventions

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. External libraries
import { motion } from 'framer-motion'

// 3. Internal - components
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'

// 4. Internal - utilities
import { cn } from '@/lib/utils'

// 5. Types (type imports last)
import type { User } from '@/types'
```

### Path Aliases

```typescript
// ✅ Use path aliases
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ Don't use relative paths
import { Button } from '../../../components/ui/button'
```

---

## Naming Conventions Summary

| Item | Convention | Example |
|------|------------|---------|
| **Files** | | |
| Component files | kebab-case | `hero-section.tsx` |
| Page files | `page.tsx` in folder | `app/about/page.tsx` |
| Utility files | kebab-case | `format-date.ts` |
| Type files | kebab-case | `user-types.ts` |
| **Code** | | |
| Components | PascalCase | `HeroSection` |
| Props interfaces | PascalCase + Props | `HeroSectionProps` |
| Functions | camelCase | `formatDate` |
| Hooks | camelCase + use | `useScrollPosition` |
| Constants | SCREAMING_SNAKE | `MAX_RETRIES` |
| CSS classes | kebab-case | `hero-section` |
| **Git** | | |
| Branches | kebab-case | `feature/add-hero` |
| Commits | imperative | `Add hero section` |

---

## Git Conventions

### Branch Naming

```
feature/description    # New features
fix/description        # Bug fixes
refactor/description   # Code refactoring
docs/description       # Documentation
```

### Commit Messages

```
Add hero section with CTA buttons
Fix mobile navigation menu overlap
Refactor pricing table component
Update deployment documentation
```

**Format**: Imperative mood, present tense, no period.

### Pull Request Template

```markdown
## Summary
- Added hero section
- Implemented responsive design
- Added Framer Motion animations

## Test Plan
- [ ] Desktop Chrome
- [ ] Mobile Safari
- [ ] Reduced motion setting
```

---

## Performance Conventions

### Images

```typescript
// ✅ Always use next/image
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>

// ❌ Don't use img tags
<img src="/hero.jpg" alt="Hero" />
```

### Dynamic Imports

```typescript
// ✅ Lazy load heavy components
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), {
  loading: () => <Skeleton />,
  ssr: false, // If it uses browser APIs
})

// ✅ Lazy load icons
import { lazy } from 'react'
const Icon = lazy(() => import('lucide-react').then(m => ({ default: m.ArrowRight })))
```

### Bundle Size

```typescript
// ✅ Import only what you need
import { ArrowRight, Check } from 'lucide-react'

// ❌ Don't import entire libraries
import * as Icons from 'lucide-react'
import _ from 'lodash'
```

---

## Accessibility Conventions

### Semantic HTML

```typescript
// ✅ Use semantic elements
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>

// ❌ Don't use divs for everything
<div className="header">
<div className="navigation">
```

### ARIA Labels

```typescript
// ✅ Add labels where needed
<button aria-label="Close menu">
  <X />
</button>

<nav aria-label="Main navigation">
```

### Focus Management

```typescript
// ✅ Visible focus states (Tailwind handles this)
<button className="focus:ring-2 focus:ring-primary focus:outline-none">

// ✅ Skip links for keyboard users
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

**These conventions ensure consistent, maintainable, and high-quality code across all SALT STUDIO projects.**
