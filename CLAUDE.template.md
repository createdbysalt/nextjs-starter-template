# {{CLIENT_NAME}} Website Project

## Project Overview

- **Client**: {{CLIENT_NAME}}
- **Project Codename**: {{PROJECT_CODENAME}}
- **Industry**: {{INDUSTRY}}
- **Production URL**: {{PRODUCTION_URL}}
- **Preview URL**: {{PREVIEW_URL}}
- **Project Start**: {{START_DATE}}
- **Project Status**: {{PROJECT_STATUS}}

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.x (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animations | Framer Motion |
| CMS | {{CMS_CHOICE}} |
| Database | {{DB_CHOICE}} |
| Deployment | Vercel |
| Package Manager | pnpm 9.x |
| Node Version | 20.x |

## Operational Commands

**Development:**
```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # ESLint check
pnpm typecheck    # TypeScript check
pnpm format       # Format with Prettier
```

**Workflow Commands:**
```bash
/discover         # Extract client DNA from materials
/icp              # Develop ideal customer profiles
/strategy         # Create site architecture
/brief            # Generate design direction
/copy             # Write page copy
/vibe             # Rapid component prototyping
/build            # Structured component creation
/page             # Create Next.js pages
/motion           # Add Framer Motion animations
/review           # Conversion audit
/deploy           # Deploy to Vercel
/ship             # Full build → deploy pipeline
```

**Velocity Shortcuts:**
| Shortcut | What It Does |
|----------|--------------|
| `qplan` | Analyze task, list files to modify. NO CODE. |
| `qbuild` | Implement the plan with TypeScript/Tailwind |
| `qship` | Build + lint + typecheck + commit + push |
| `qfix` | Read error, find cause, apply fix |

## Role & Behavior

You are a Next.js specialist working on {{CLIENT_NAME}}'s website. You write production-grade TypeScript with a focus on performance and developer experience.

**Your Principles:**
1. **TypeScript Strict** — No `any` types, ever
2. **Server Components First** — Only use `'use client'` when necessary
3. **Tailwind Only** — No CSS modules or inline styles
4. **shadcn/ui First** — Use existing components before building custom
5. **Performance Matters** — Think about bundle size and Core Web Vitals
6. **Accessibility Required** — WCAG 2.1 AA compliance

## Project Structure

```
{{PROJECT_CODENAME}}/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── (marketing)/         # Marketing pages
│   │   └── api/                  # API routes
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── sections/             # Page sections
│   │   ├── layout/               # Header, Footer, Nav
│   │   └── forms/                # Form components
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   └── animations.ts         # Framer Motion presets
│   ├── hooks/                    # Custom React hooks
│   ├── styles/
│   │   └── globals.css           # Tailwind + CSS variables
│   └── types/                    # TypeScript types
├── public/                       # Static assets
├── outputs/                      # Strategy outputs
│   ├── 1_discovery/
│   ├── 2_audience/
│   ├── 3_architecture/
│   ├── 4_design/
│   ├── 5_copy/
│   └── 6_review/
└── CLAUDE.md                     # This file
```

## Brand Guidelines

**Primary Brand Colors:**
- Primary: {{PRIMARY_COLOR}}
- Secondary: {{SECONDARY_COLOR}}
- Accent: {{ACCENT_COLOR}}

**Typography:**
- Headings: {{HEADING_FONT}}
- Body: {{BODY_FONT}}

**CSS Variables (in globals.css):**
```css
:root {
  --primary: {{PRIMARY_HSL}};
  --secondary: {{SECONDARY_HSL}};
  --accent: {{ACCENT_HSL}};
}
```

**Detailed Guidelines**: See `design-system/brand-guidelines.md`

## Critical Documentation

*(Do not hallucinate features. Read these files for ground truth)*

| Document | Path |
|----------|------|
| Brand Guidelines | `design-system/brand-guidelines.md` |
| Design Tokens | `design-system/tokens/` |
| Component Library | `design-system/components.md` |
| Workflow Guide | `docs/WORKFLOW.md` |
| Deployment Guide | `docs/DEPLOYMENT.md` |
| Conventions | `docs/CONVENTIONS.md` |

## Non-Negotiable Standards

### TypeScript
- Strict mode enabled
- No `any` types — define proper interfaces
- Props interfaces named `ComponentNameProps`
- Use `type` for unions, `interface` for objects

### React Components
- Server Components by default
- `'use client'` only when hooks/events needed
- Functional components only
- Props must have TypeScript interface
- Use `cn()` for class composition

### Styling
- Tailwind utility classes only
- No CSS modules or styled-components
- Colors via CSS variables (shadcn/ui pattern)
- Responsive: Mobile-first (`sm:`, `md:`, `lg:`)

### Animations
- Framer Motion for complex animations
- Tailwind transitions for simple effects
- Always respect `prefers-reduced-motion`
- Keep durations under 500ms for UI feedback

### Performance
- Images via `next/image` with proper sizing
- Fonts via `next/font`
- Dynamic imports for heavy components
- Avoid unnecessary client-side JavaScript

## Component Template

```typescript
// src/components/sections/[name]-section.tsx
import { cn } from '@/lib/utils'

interface [Name]SectionProps {
  // props
  className?: string
}

export function [Name]Section({
  // destructure
  className,
}: [Name]SectionProps) {
  return (
    <section className={cn('py-24 lg:py-32', className)}>
      <div className="container px-4 md:px-6">
        {/* Content */}
      </div>
    </section>
  )
}
```

## Page Template

```typescript
// src/app/[route]/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | {{CLIENT_NAME}}',
  description: 'Page description.',
}

export default function PageName() {
  return (
    <main>
      {/* Sections */}
    </main>
  )
}
```

## Common Patterns

### Data Fetching
```typescript
// Server Component (default)
async function getData() {
  const res = await fetch('...', { next: { revalidate: 3600 } })
  return res.json()
}
```

### Loading State
```typescript
// app/[route]/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <Skeleton className="h-64 w-full" />
}
```

### Error State
```typescript
// app/[route]/error.tsx
'use client'

export default function Error({ reset }: { reset: () => void }) {
  return <button onClick={reset}>Try again</button>
}
```

## Things to Avoid

- ❌ Using `any` type
- ❌ Creating CSS modules or inline styles
- ❌ Skipping loading/error states
- ❌ Ignoring accessibility
- ❌ Over-engineering simple components
- ❌ Adding features not requested
- ❌ `console.log` in production code

## ICP Context

{{ICP_SUMMARY}}

## Current Focus

{{CURRENT_FOCUS}}

---

**Last Updated**: {{LAST_UPDATED}}
