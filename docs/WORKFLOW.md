# Next.js Development Workflow Guide

**Stack**: Next.js 15 + TypeScript + Tailwind + shadcn/ui
**For**: SALT STUDIO Projects
**Updated**: 2026-01-21

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Daily Workflow](#daily-workflow)
3. [Phase-by-Phase Guide](#phase-by-phase-guide)
4. [Claude Code Commands Reference](#claude-code-commands-reference)
5. [Common Scenarios](#common-scenarios)
6. [Best Practices](#best-practices)

---

## Quick Start

### First Time Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment template
cp .env.template .env.local

# 3. Start development server
pnpm dev
```

**Open in browser**: http://localhost:3000

---

## Daily Workflow

### Morning Routine

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
pnpm install

# 3. Start dev server
pnpm dev
```

### During Development

```
┌─────────────────────────────────────────────────────────────┐
│  Strategy (outputs/)         → Implementation (src/)        │
│  ↓                                                          │
│  Discovery → ICP → Architecture → Design → Code → Deploy    │
└─────────────────────────────────────────────────────────────┘
```

**Key Principle**: Strategy informs implementation. Run `/discover` and `/icp` before building.

---

## Phase-by-Phase Guide

---

### Phase 1: Discovery & Strategy

**Goal**: Understand client, audience, and site architecture

#### 1.1 Client Discovery

```
You: /discover

Claude: Analyzing client materials...
Creating outputs/1_discovery/client-dna.json
Creating outputs/1_discovery/brand-voice.json
```

#### 1.2 ICP Development

```
You: /icp

Claude: Building ideal customer profiles...
Creating outputs/2_audience/icp-profiles.json
Creating outputs/2_audience/user-journey.json
```

#### 1.3 Site Strategy

```
You: /strategy

Claude: Designing site architecture...
Creating outputs/3_architecture/strategic-sitemap.json
Creating outputs/3_architecture/page-briefs.json
```

---

### Phase 2: Design Direction

**Goal**: Define visual system and component specifications

#### 2.1 Design Brief

```
You: /brief

Claude: Creating design direction...
Creating outputs/4_design/design-brief.json
Creating outputs/4_design/visual-system.json
```

#### 2.2 Update Design Tokens

Based on `/brief` output, update:
- `design-system/tokens/colors.ts`
- `design-system/tokens/typography.ts`
- `src/styles/globals.css`

---

### Phase 3: Component Development

**Goal**: Build React components with TypeScript

#### 3.1 Rapid Prototyping

```
You: /vibe

Claude: What are we building?

You: Hero section with:
- Main heading (H1)
- Subheading paragraph
- Primary CTA button
- Secondary text link
- Right side: Product screenshot
- Background: Gradient

Claude: [Creates TypeScript component with Tailwind]
```

**Output:**
```
src/components/sections/hero-section.tsx
```

#### 3.2 Structured Component Creation

```
You: /build features-grid

Claude: [Follows component architecture guidelines]
Creating src/components/sections/features-grid.tsx
```

#### 3.3 Page Creation

```
You: /page about

Claude: Creating About page...
src/app/about/page.tsx
src/app/about/loading.tsx
```

---

### Phase 4: Animation & Polish

**Goal**: Add Framer Motion animations

#### 4.1 Animation Creation

```
You: /motion hero-entrance

Claude: What should animate?

You: On page load:
- Title fades up (0.8s)
- Description follows (0.4s delay)
- Buttons scale in (0.2s after)
- Image slides from right

Claude: [Creates animation variants and applies to component]
```

#### 4.2 Preview Animations

```bash
pnpm dev
# Navigate to page
# Test with reduced motion setting
```

---

### Phase 5: Copywriting

**Goal**: Write conversion-focused page copy

#### 5.1 Generate Copy

```
You: /copy

Claude: Writing copy for page briefs...
Creating outputs/5_copy/homepage-copy.json
Creating outputs/5_copy/about-copy.json
```

#### 5.2 Apply Copy to Components

Update components with generated copy from `outputs/5_copy/`

---

### Phase 6: Review & Deploy

**Goal**: Quality assurance and deployment

#### 6.1 Conversion Review

```
You: /review

Claude: Auditing for conversion optimization...
Creating outputs/6_review/conversion-audit.json
```

#### 6.2 Code Quality Check

```bash
pnpm validate
# Runs: lint + typecheck + build
```

#### 6.3 Deploy

```
You: /deploy

Claude: Running pre-flight checks...
✅ TypeScript: No errors
✅ ESLint: Passed
✅ Build: Successful

Deploying to Vercel...
✅ Preview URL: https://project-abc123.vercel.app
```

---

## Claude Code Commands Reference

### Strategy Commands

| Command | Purpose | Output Location |
|---------|---------|-----------------|
| `/discover` | Extract client DNA | `outputs/1_discovery/` |
| `/icp` | Build customer profiles | `outputs/2_audience/` |
| `/strategy` | Design site architecture | `outputs/3_architecture/` |
| `/brief` | Create design direction | `outputs/4_design/` |
| `/copy` | Write page copy | `outputs/5_copy/` |
| `/review` | Conversion audit | `outputs/6_review/` |

### Implementation Commands

| Command | Purpose | Output Location |
|---------|---------|-----------------|
| `/vibe` | Rapid prototyping | `src/components/` |
| `/build` | Structured components | `src/components/` |
| `/page` | Create Next.js pages | `src/app/` |
| `/motion` | Add animations | Component updates |
| `/deploy` | Deploy to Vercel | Vercel |
| `/ship` | Full pipeline | Build → Deploy |

### Velocity Shortcuts

| Shortcut | Action |
|----------|--------|
| `qplan` | Analyze task, list files to modify. NO CODE. |
| `qbuild` | Implement the plan with TypeScript/Tailwind |
| `qship` | Build + lint + typecheck + commit + push |
| `qfix` | Read error, find cause, apply fix |

---

## Common Scenarios

### Scenario 1: Building a New Page

```bash
# 1. Ensure strategy exists
/strategy  # If not done

# 2. Create page
/page services

# 3. Build sections
/vibe
"Hero with service tagline and CTA"

/vibe
"Services grid with 6 cards"

/vibe
"Testimonials carousel"

# 4. Add animations
/motion

# 5. Write copy
/copy

# 6. Review and deploy
/review
/deploy
```

### Scenario 2: Adding a Component

```bash
# 1. Create component
/build pricing-table

# 2. Add to page
# Edit src/app/pricing/page.tsx

# 3. Test
pnpm dev

# 4. Ship
qship
```

### Scenario 3: Client Requests Change

```bash
# 1. Make change
"Change hero CTA color to brand accent"

# 2. Quick ship
qship
```

### Scenario 4: Fix a Bug

```bash
# 1. Identify and fix
qfix

# 2. Test
pnpm dev

# 3. Deploy
qship
```

---

## Best Practices

### TypeScript

```typescript
// ✅ DO: Define interfaces
interface HeroSectionProps {
  title: string
  description: string
  className?: string
}

// ❌ DON'T: Use any
function Hero(props: any) // Never do this
```

### Components

```typescript
// ✅ DO: Server Components by default
export function FeatureCard({ feature }: Props) {
  return <div>...</div>
}

// ✅ DO: Client only when needed
'use client'
export function ContactForm() {
  const [state, setState] = useState()
  return <form>...</form>
}
```

### Styling

```typescript
// ✅ DO: Tailwind utilities
<div className="flex items-center gap-4 p-6">

// ✅ DO: Use cn() for conditional classes
<button className={cn(
  'px-4 py-2 rounded-lg',
  variant === 'primary' && 'bg-primary text-white'
)}>

// ❌ DON'T: CSS modules or inline styles
<div style={{ padding: 24 }}>
```

### Performance

```typescript
// ✅ DO: Use next/image
import Image from 'next/image'
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />

// ✅ DO: Dynamic imports for heavy components
const Chart = dynamic(() => import('./Chart'), { ssr: false })

// ❌ DON'T: Import everything
import * as Icons from 'lucide-react' // Bad
import { ArrowRight } from 'lucide-react' // Good
```

### Animations

```typescript
// ✅ DO: Respect reduced motion
const prefersReducedMotion = useReducedMotion()

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 }
}

// ✅ DO: Keep durations short for UI feedback
transition={{ duration: 0.3 }}

// ❌ DON'T: Animate layout properties
animate={{ width: 500 }} // Causes reflow
```

---

## File Organization

```
src/
├── app/                    # Pages and layouts
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── (marketing)/        # Route group
│   │   ├── about/
│   │   ├── services/
│   │   └── contact/
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections
│   │   ├── hero-section.tsx
│   │   └── features-grid.tsx
│   ├── layout/             # Header, Footer, Nav
│   └── forms/              # Form components
├── lib/
│   ├── utils.ts            # cn() and utilities
│   └── animations.ts       # Framer Motion presets
├── hooks/                  # Custom React hooks
├── styles/
│   └── globals.css         # Tailwind + CSS variables
└── types/                  # TypeScript types
```

---

## Getting Help

### Documentation

- **Setup**: `docs/SETUP.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Components**: `docs/COMPONENTS.md`
- **Conventions**: `docs/CONVENTIONS.md`

### Common Questions

**Q: When should I use 'use client'?**
A: Only when using hooks (useState, useEffect), event handlers, or browser APIs.

**Q: How do I add a shadcn/ui component?**
A: `pnpm dlx shadcn@latest add [component-name]`

**Q: Where do strategy outputs go?**
A: `outputs/` directory, organized by phase.

**Q: How do I handle forms?**
A: Use Server Actions with shadcn/ui form components.

---

**Need help?** Contact SALT STUDIO or check `docs/TROUBLESHOOTING.md`

---

**Document Version**: 2.0.0
**Last Updated**: 2026-01-21
