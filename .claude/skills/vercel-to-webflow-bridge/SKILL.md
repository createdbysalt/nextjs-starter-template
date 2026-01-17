# Vercel React to Webflow Translation Bridge

## Purpose
Filter and adapt Vercel/v0-generated React patterns for Webflow translation.

## Override Rules for Vercel Skills

When using Vercel React skills, apply these constraints to ensure Webflow compatibility:

### 1. Component Complexity Limits

**Vercel Pattern** (Advanced):
```jsx
// v0 might generate this (too complex for Webflow)
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function ProductTabs() {
  return (
    <Tabs defaultValue="features" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="features">...</TabsContent>
    </Tabs>
  )
}
```

**Webflow-Adapted Pattern** (Simplified):
```jsx
// Simplified for Webflow translation
export function ProductTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState('features');
  
  // TRANSLATION NOTE: This becomes Webflow Tabs element
  // Each tab = CMS Collection item
  
  return (
    <div className="tabs-wrapper" data-webflow-element="Tabs">
      <div className="tabs-menu" data-webflow-element="Tabs Menu">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-link ${activeTab === tab.id ? 'w--current' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            data-webflow-class="Tab Link"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`tab-pane ${activeTab === tab.id ? 'w--tab-active' : ''}`}
            data-webflow-class="Tab Pane"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2. shadcn/ui Component Substitutions

Vercel skills heavily use shadcn/ui. Map these to Webflow equivalents:

| shadcn/ui Component | Webflow Translation | Notes |
|---------------------|---------------------|-------|
| `<Card>` | Div Block "Card" | Just a div with styling |
| `<Button>` | Button/Link Block | Native Webflow element |
| `<Dialog>` | Modal with IX2 | Requires custom embed OR native Webflow lightbox |
| `<Accordion>` | Native Webflow Accordion | 1:1 mapping |
| `<Tabs>` | Native Webflow Tabs | 1:1 mapping |
| `<Select>` | Native Webflow Select | Style only |
| `<Form>` | Native Webflow Form | Use native + validation embed |
| `<Popover>` | Custom GSAP embed | Too complex for IX2 |
| `<Command>` | ❌ Not translatable | Skip in prototype |
| `<Sheet>` | Custom slide-in panel | GSAP embed required |

**Auto-Substitution Rule**:
When Vercel skill suggests shadcn/ui component, check table above. If "Custom embed" or "Not translatable", ask:
"This component requires custom code in Webflow. Should I:
(a) Create a simplified version using native Webflow elements
(b) Prototype it in React and mark for GSAP embed
(c) Skip this feature"

### 3. Styling Constraints

**Vercel Pattern** (CSS Modules / CSS-in-JS):
```jsx
import styles from './Hero.module.css'

export function Hero() {
  return <div className={styles.hero}>...</div>
}
```

**Webflow Pattern** (Utility/Class-based):
```jsx
export function Hero() {
  return (
    <div className="hero" data-webflow-class="Hero Section">
      {/* Webflow uses global classes, not CSS modules */}
    </div>
  )
}
```

**Enforcement**: Never use CSS Modules or styled-components in prototypes. All styles must be:
- Tailwind utility classes (for prototype)
- Named classes that map to Webflow class names
- Inline styles only for dynamic values

### 4. Data Fetching Patterns

**Vercel Pattern** (Server Components / API Routes):
```jsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <ProductGrid products={data} />
}
```

**Webflow Pattern** (Client-side / Static Mock):
```jsx
import { mockProducts } from '../data/mockProducts'

export function Page() {
  // TRANSLATION NOTE: In Webflow, this is CMS Collection
  // See: translation-docs/cms-models/products-collection.yaml
  
  return <ProductGrid products={mockProducts} />
}
```

**Rule**: Prototype data must be:
- Static JSON/JS files
- Structured as future CMS collections
- No async/await in components (Webflow has no SSR)

### 5. TypeScript Simplification

**Vercel Pattern** (Complex Types):
```typescript
interface ProductCardProps extends React.ComponentPropsWithoutRef<'div'> {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  onSelect?: (product: Product) => void
}
```

**Webflow Pattern** (Simple Props):
```typescript
interface ProductCardProps {
  // Only the data that becomes CMS fields
  title: string
  price: number
  image: string
  featured: boolean
  ctaText: string
  ctaLink: string
}
```

**Rule**: Props should map 1:1 to CMS fields. No event handlers, no variants (use separate components instead).

## Component Generation Workflow

When using Vercel skills to generate a component:

1. **Generate** with Vercel skill
2. **Filter** through this bridge skill automatically
3. **Add** Webflow translation notes
4. **Simplify** any complex patterns
5. **Document** in translation-docs/

## Example: Full Workflow
```bash
# User request
> /vibe
"Create a pricing table with 3 tiers using best React patterns"

# Claude process:
1. Load Vercel react-component-patterns skill
2. Load webflow-bridge skill (this file)
3. Generate component using Vercel patterns
4. Apply bridge filters:
   - Remove shadcn/ui imports
   - Simplify to flat structure
   - Add data-webflow-* attributes
   - Create mock data = CMS schema
5. Output both:
   - Component code (filtered)
   - Translation doc
```

## Auto-Reject Patterns

These Vercel patterns should trigger immediate simplification:

❌ **Server Actions**
❌ **Suspense boundaries**
❌ **useTransition/useOptimistic**
❌ **Middleware**
❌ **Dynamic imports** (unless for code splitting)
❌ **API routes** (prototype uses mock data)

## Auto-Accept Patterns

These Vercel patterns work great for Webflow:

✅ **Functional components**
✅ **Props-based design**
✅ **Tailwind utility classes**
✅ **Responsive design patterns**
✅ **Semantic HTML**
✅ **Accessibility attributes**

## Integration with Existing Skills

This bridge skill works in combination with:
- `gsap-webflow-translation/SKILL.md` for animations
- `webflow-patterns/SKILL.md` for final structure
- `react-prototype-patterns/SKILL.md` for component architecture

## Usage

Add to component generation commands:
```markdown
# In .claude/commands/vibe.md

When generating React components:
1. Use Vercel react-component-patterns skill for structure
2. IMMEDIATELY filter through webflow-bridge skill
3. Only output Webflow-compatible patterns
4. Add translation notes inline
```

## Detailed Pattern Examples

### Example 1: Feature Grid

**Vercel Generation:**
```jsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {features.map(feature => (
        <Card key={feature.id}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
```

**After Bridge Filter:**
```jsx
/**
 * COMPONENT: Feature Grid
 * VERCEL ORIGIN: shadcn Card pattern
 * WEBFLOW ADAPTATION: Div blocks in grid
 */

export function FeatureGrid({ features }) {
  // WEBFLOW NOTE: Grid = Webflow Grid element (3 columns)
  // Each card = CMS Collection item "Features"
  
  return (
    <div 
      className="features-grid"
      data-webflow-element="Grid"
      data-webflow-columns="3"
    >
      {features.map(feature => (
        <div 
          key={feature.id}
          className="feature-card"
          data-webflow-class="Feature Card"
          data-cms-item="feature"
        >
          <div className="feature-card__header">
            <h3 
              className="feature-card__title"
              data-cms-bind="title"
            >
              {feature.title}
            </h3>
            <p 
              className="feature-card__description"
              data-cms-bind="description"
            >
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Mock data = CMS schema
export const mockFeatures = [
  {
    id: 1,
    title: "Fast Performance",     // → CMS: Plain Text
    description: "Lightning quick"  // → CMS: Plain Text
  },
  // ...
];
```

### Example 2: Contact Form

**Vercel Generation:**
```jsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema)
  })
  
  return (
    <Form {...form}>
      <FormField name="email" render={({field}) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input {...field} />
        </FormItem>
      )} />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

**After Bridge Filter:**
```jsx
/**
 * COMPONENT: Contact Form
 * VERCEL ORIGIN: react-hook-form + shadcn Form
 * WEBFLOW ADAPTATION: Native Webflow form + custom validation
 */

export function ContactForm({ onSubmit }) {
  // WEBFLOW NOTE: Use native Webflow form element
  // Add custom validation via: webflow-embeds/interactions/form-validation.js
  
  return (
    <form 
      className="contact-form"
      data-webflow-element="Form"
      onSubmit={onSubmit}
    >
      <div className="form__field">
        <label 
          htmlFor="email"
          className="form__label"
        >
          Email
        </label>
        <input 
          type="email"
          id="email"
          name="email"
          className="form__input"
          placeholder="your@email.com"
          required
        />
      </div>
      
      <div className="form__field">
        <label 
          htmlFor="message"
          className="form__label"
        >
          Message
        </label>
        <textarea 
          id="message"
          name="message"
          className="form__textarea"
          rows={5}
          required
        />
      </div>
      
      <button 
        type="submit"
        className="btn btn--primary"
        data-webflow-class="Button Primary"
      >
        Send Message
      </button>
    </form>
  );
}
```

### Example 3: Pricing Table with Dialog

**Vercel Generation:**
```jsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

export function PricingTable() {
  return (
    <div className="grid grid-cols-3">
      {tiers.map(tier => (
        <Card key={tier.id}>
          <h3>{tier.name}</h3>
          <p>${tier.price}/mo</p>
          <Dialog>
            <DialogTrigger>See Details</DialogTrigger>
            <DialogContent>
              <p>{tier.fullDescription}</p>
            </DialogContent>
          </Dialog>
        </Card>
      ))}
    </div>
  )
}
```

**After Bridge Filter:**
```jsx
/**
 * COMPONENT: Pricing Table
 * VERCEL ORIGIN: shadcn Dialog + Card
 * WEBFLOW ADAPTATION: Simplified - no modal in prototype
 * 
 * DECISION: Skip modal for now, or use Webflow lightbox manually
 */

export function PricingTable({ tiers }) {
  // WEBFLOW NOTE: Dialog removed - too complex for automatic translation
  // Options:
  // (a) Use Webflow's native lightbox (set up manually)
  // (b) Create GSAP modal embed
  // (c) Link to separate details page
  
  return (
    <div 
      className="pricing-grid"
      data-webflow-element="Grid"
      data-webflow-columns="3"
    >
      {tiers.map(tier => (
        <div 
          key={tier.id}
          className="pricing-card"
          data-webflow-class="Pricing Card"
        >
          <h3 className="pricing-card__name">
            {tier.name}
          </h3>
          
          <div className="pricing-card__price">
            <span className="price__amount">${tier.price}</span>
            <span className="price__period">/mo</span>
          </div>
          
          <p className="pricing-card__description">
            {tier.shortDescription}
          </p>
          
          {/* WEBFLOW: Replace Dialog with simple link */}
          <a 
            href={`/pricing/${tier.slug}`}
            className="btn btn--secondary"
          >
            See Details
          </a>
        </div>
      ))}
    </div>
  );
}
```

## Critical Reminders

### Always Apply These Filters

1. **Remove all shadcn/ui imports** → Replace with simple divs
2. **Remove complex hooks** → useState only for interaction demos
3. **Remove server-side patterns** → Use static mock data
4. **Add data-webflow-* attributes** → Enable translation tracking
5. **Create mock data structure** → This becomes CMS schema

### When in Doubt

If you're unsure whether a Vercel pattern is Webflow-compatible:

**Ask yourself:**
- Can this be built with Webflow's visual editor?
- Does this require server-side code?
- Would a non-technical client be able to edit this in CMS?

**If NO to any → Simplify or mark for custom embed**

### Quality Checklist

Before outputting component:
- [ ] No shadcn/ui components
- [ ] No complex TypeScript types
- [ ] Props map to CMS fields
- [ ] Classes are global (not CSS modules)
- [ ] data-webflow-* attributes added
- [ ] Mock data structure documented
- [ ] Translation notes included inline

## Error Messages

When rejecting a Vercel pattern:
```
⚠️  WEBFLOW COMPATIBILITY ISSUE

Pattern: [Pattern name]
Reason: [Why it won't work in Webflow]

Options:
1. Simplify to [alternative pattern]
2. Mark for GSAP custom embed
3. Use Webflow native [element] instead

Recommendation: [Best option for this case]
```

## Success Messages

When successfully filtering:
```
✅ Component filtered for Webflow

Original: Vercel v0 pattern with shadcn/ui
Adapted: Webflow-compatible structure

Changes made:
- Removed: [List of removed patterns]
- Added: [List of Webflow adaptations]
- CMS ready: [Yes/No]

Next: /translate [ComponentName].jsx
```