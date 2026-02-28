# Component Development Guide

**Stack**: Next.js 15 + TypeScript + shadcn/ui + Framer Motion
**Updated**: 2026-01-21

---

## Component Architecture

### Server vs Client Components

```
┌─────────────────────────────────────────────────────────────┐
│  Server Components (Default)                                │
│  ├── Static content                                         │
│  ├── Data fetching                                          │
│  ├── Accessing backend resources                            │
│  └── Keeping sensitive info on server                       │
├─────────────────────────────────────────────────────────────┤
│  Client Components ('use client')                           │
│  ├── Interactivity (onClick, onChange)                      │
│  ├── React hooks (useState, useEffect)                      │
│  ├── Browser APIs (window, localStorage)                    │
│  └── Framer Motion animations                               │
└─────────────────────────────────────────────────────────────┘
```

**Rule**: Start with Server Components. Add `'use client'` only when needed.

---

## Component Categories

### 1. UI Components (`src/components/ui/`)

Base-level reusable components from shadcn/ui.

```bash
# Add shadcn components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

**Usage:**
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Button variant="default" size="lg">
  Get Started
</Button>
```

### 2. Section Components (`src/components/sections/`)

Full-width page sections (Hero, Features, Testimonials, etc.).

**Template:**
```typescript
// src/components/sections/hero-section.tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  className?: string
}

export function HeroSection({
  title,
  description,
  primaryCTA,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn('py-24 lg:py-32', className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
          <Button size="lg" asChild>
            <a href={primaryCTA.href}>{primaryCTA.text}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### 3. Layout Components (`src/components/layout/`)

Header, Footer, Navigation, Sidebar.

**Example:**
```typescript
// src/components/layout/header.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Logo
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/services" className="text-sm font-medium">
            Services
          </Link>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
```

### 4. Form Components (`src/components/forms/`)

Form-related components with validation.

**Example:**
```typescript
// src/components/forms/contact-form.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)

    try {
      // Submit logic here
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Your email" required />
      <Textarea name="message" placeholder="Your message" required />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
      {status === 'success' && (
        <p className="text-sm text-green-600">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-destructive">Failed to send. Please try again.</p>
      )}
    </form>
  )
}
```

---

## Component Patterns

### Props Interface Pattern

```typescript
// Always define props interface
interface ComponentNameProps {
  // Required props
  title: string
  items: Item[]

  // Optional props with defaults
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string

  // Children (when needed)
  children?: React.ReactNode
}

export function ComponentName({
  title,
  items,
  variant = 'default',
  size = 'md',
  className,
}: ComponentNameProps) {
  // ...
}
```

### Composition Pattern

```typescript
// Card with composable parts
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {feature.content}
      </CardContent>
    </Card>
  )
}
```

### Class Merging Pattern

```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

function Button({ variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
    >
      Click me
    </button>
  )
}
```

---

## Animation Patterns

### Basic Framer Motion

```typescript
'use client'

import { motion } from 'framer-motion'

export function AnimatedSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

### Staggered Children

```typescript
'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function StaggeredList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Scroll-Triggered Animation

```typescript
'use client'

import { motion } from 'framer-motion'

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### Reduced Motion Support

```typescript
'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AccessibleAnimation() {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

---

## Data Fetching Patterns

### Server Component Fetching

```typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  })
  return res.json()
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </main>
  )
}
```

### Server Actions

```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // Save to database
  await db.insert({ name, email })

  revalidatePath('/contacts')
  return { success: true }
}
```

```typescript
// components/forms/signup-form.tsx
'use client'

import { submitForm } from '@/app/actions'

export function SignupForm() {
  return (
    <form action={submitForm}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

---

## Common Components Checklist

### Essential Components

- [ ] `Header` - Navigation and logo
- [ ] `Footer` - Links and copyright
- [ ] `HeroSection` - Page hero
- [ ] `CTASection` - Call-to-action
- [ ] `ContactForm` - Contact form with validation

### Marketing Components

- [ ] `FeatureGrid` - Feature cards grid
- [ ] `TestimonialsCarousel` - Customer testimonials
- [ ] `PricingTable` - Pricing tiers
- [ ] `FAQAccordion` - Frequently asked questions
- [ ] `TeamGrid` - Team member cards

### UI Components (via shadcn)

```bash
# Install commonly used components
pnpm dlx shadcn@latest add button card input textarea
pnpm dlx shadcn@latest add accordion alert badge
pnpm dlx shadcn@latest add dialog dropdown-menu sheet
pnpm dlx shadcn@latest add form label select checkbox
```

---

## Component Checklist

Before shipping a component:

- [ ] TypeScript interface defined
- [ ] Props documented with JSDoc (for complex props)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard nav, aria labels)
- [ ] Loading states handled (if async)
- [ ] Error states handled (if async)
- [ ] Animation respects `prefers-reduced-motion`
- [ ] `className` prop exposed for customization
- [ ] No hardcoded content (use props)

---

**See also**: `docs/CONVENTIONS.md` for naming and style conventions.
