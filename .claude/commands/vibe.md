# Vibe: Rapid React Prototyping

Create React components for rapid prototyping and Webflow translation.

---

## Visual Modes

**Wireframes use MINIMAL styling by default:**

| Mode | File | When to Use |
|------|------|-------------|
| **Wireframe** | `wireframe.css` | Structure validation, layout testing |
| **Styled** | `main.css` | Visual design, client presentation |

### Wireframe Mode (Default for `/vibe`)
- Black, white, grey only
- Grey placeholder images with icon
- Thin, small typography (weight: 300)
- Section labels in corners
- Focus on layout, not aesthetics

### Toggle in App.jsx
```jsx
// Wireframe mode (default)
import './styles/wireframe.css';

// Styled mode (for visual design)
// import './styles/main.css';
```

---

## Skills to Load (MUST READ BEFORE BUILDING)

**CRITICAL: You MUST explicitly read each skill file BEFORE building any components.**

These skills contain essential standards for class naming, React patterns, and Webflow structure. Referencing them is not enough - you must READ the actual file content.

### Step 1: Read All Skills First

```
READ THESE FILES BEFORE PROCEEDING:
────────────────────────────────────────────────────────────────
1. .claude/skills/client-first-patterns/SKILL.md
   → Contains class naming conventions and common patterns

2. .claude/skills/react-best-practices/SKILL.md
   → Contains React component patterns and performance tips

3. .claude/skills/webflow-element-planning/SKILL.md
   → Contains element structure and CMS binding frameworks
────────────────────────────────────────────────────────────────
```

### Step 2: Apply Standards From Skills

After reading, ensure components follow:
- Client-First class naming (from client-first-patterns)
- React functional component patterns (from react-best-practices)
- Element hierarchy matching wireframes (from webflow-element-planning)

```skill
.claude/skills/client-first-patterns
```

```skill
.claude/skills/react-best-practices
```

```skill
.claude/skills/webflow-element-planning
```

---

## Phase 1: Auto-Load Context

Before asking what to build, automatically check for strategy outputs:

```
AUTO-LOAD SEQUENCE:
────────────────────────────────────────────────────────────────

1. Check for wireframes (highest priority):
   projects/[client]/outputs/wireframes/*_wireframe.json
   → If found: Extract element structure and classes

2. Check for wireframe annotations:
   projects/[client]/outputs/wireframes/wireframe_annotations.js
   → If found: Copy to prototype/src/data/ for interactive labels

3. Check for page briefs:
   projects/[client]/outputs/page_briefs.json
   → If found: Extract section requirements

4. Check for component specs:
   projects/[client]/outputs/component_specs.json
   → If found: Extract component definitions

5. Check for visual system:
   projects/[client]/outputs/visual_system.json
   → If found: Extract design tokens

6. Check for CMS architecture:
   projects/[client]/outputs/wireframes/cms_architecture.json
   → If found: Extract field bindings for mock data

7. Check for copy drafts:
   projects/[client]/outputs/copy/*.md
   → If found: Use actual copy instead of placeholder
```

### Wireframe Annotations Integration

**If `wireframe_annotations.js` exists:**
1. Copy to `prototype/src/data/wireframeAnnotations.js`
2. Wrap sections with `<WireframeAnnotation>` component
3. Clients can click section labels to see strategic reasoning

```jsx
// Auto-generated wrapper for client education
<WireframeAnnotation {...annotations.hero}>
  <Hero {...mockHeroData} />
</WireframeAnnotation>
```

### Context-Aware Behavior

**If wireframe exists:**
```
"Building from wireframe: Hero section for homepage"
"Element structure loaded: 12 elements, 8 classes"
"CMS bindings: testimonials collection (3 items)"
```

**If page brief exists but no wireframe:**
```
"I see Hero section defined in page brief. Building that."
"Content requirements: Headline, Subheadline, CTA, Image"
```

**If nothing exists:**
```
"What component are we building?"
"Is this a wireframe or high-fidelity?"
"Any specific animations needed?"
```

---

## Phase 2: Gather Context

### Smart Component Detection

If strategy outputs are loaded, extract:
- Section name and purpose
- Content slots and requirements
- CMS field mappings
- Design token references
- Responsive behavior notes

### Manual Input (if no strategy context)

Ask user:
- "What component are we building?"
- "Is this a wireframe or high-fidelity?"
- "Any specific animations needed?"

---

## Phase 3: Create Component

### File Location
`prototype/src/components/[ComponentName].jsx`

### Structure Requirements
- Use functional components only
- Props mirror CMS fields exactly
- Apply Client-First class names
- Add `data-webflow-*` attributes
- Keep nesting under 4 levels

### Component Template (Client-First)

```jsx
/**
 * [COMPONENT NAME]
 *
 * SOURCE: wireframes/[page]_wireframe.json (if applicable)
 * PAGE: [page name]
 * SECTION: [section_id]
 *
 * WEBFLOW TRANSLATION:
 * - Element type: Section
 * - Classes: section_[name], padding-global, container-large
 * - CMS: [Yes - Collection: X / No - static]
 * - Animations: [IX2 / GSAP / None]
 *
 * STRUCTURE:
 * section_hero
 *   └─ padding-global
 *      └─ container-large
 *         └─ padding-section-large
 *            └─ hero_component
 *               ├─ hero-content
 *               └─ hero-image-wrapper
 */

export function Hero({
  headline,      // → CMS: PlainText or static
  subheadline,   // → CMS: PlainText or static
  primaryCta,    // → CMS: PlainText (button text)
  primaryCtaUrl, // → CMS: Link
  secondaryCta,  // → CMS: PlainText (button text)
  secondaryCtaUrl, // → CMS: Link
  heroImage,     // → CMS: Image
  heroImageAlt,  // → CMS: PlainText (from image alt)
}) {
  return (
    <section className="section_hero">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">

            <div className="hero_component">
              {/* Content column */}
              <div className="hero-content">
                <h1 className="heading-style-h1">
                  {headline}
                </h1>

                <p className="text-size-regular hero-description">
                  {subheadline}
                </p>

                <div className="hero-cta-wrapper">
                  <a href={primaryCtaUrl} className="button-primary">
                    {primaryCta}
                  </a>
                  {secondaryCta && (
                    <a href={secondaryCtaUrl} className="button-secondary">
                      {secondaryCta}
                    </a>
                  )}
                </div>
              </div>

              {/* Image column */}
              <div className="hero-image-wrapper">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="hero-image"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Phase 4: Create Mock Data

### File Location
`prototype/src/data/mock[ComponentName]Data.js`

### Structure from CMS Architecture

If `cms_architecture.json` exists, extract field definitions:

```javascript
/**
 * MOCK DATA: Hero Section
 *
 * CMS STATUS: Static (hardcoded in Webflow)
 *
 * This mock data mirrors the content structure.
 * For CMS-bound components, structure matches collection fields.
 */

export const mockHeroData = {
  // Static content (from page brief or copy)
  headline: "Build Websites That Grow With You",
  subheadline: "We create conversion-focused websites that your team can actually maintain. No developer required for updates.",

  // CTAs
  primaryCta: "Get Started",
  primaryCtaUrl: "/contact",
  secondaryCta: "See Our Work",
  secondaryCtaUrl: "/portfolio",

  // Media
  heroImage: "/images/hero-placeholder.jpg",
  heroImageAlt: "Team collaborating on website design",
};
```

### CMS-Bound Mock Data

```javascript
/**
 * MOCK DATA: Testimonials Section
 *
 * CMS STATUS: Dynamic
 * COLLECTION: Testimonial
 * FILTER: isFeatured = true
 * LIMIT: 3
 *
 * In Webflow: This becomes a Collection List bound to Testimonial collection
 */

export const mockTestimonialsData = {
  sectionHeading: "What Our Clients Say",
  sectionSubheading: "Real results from real partnerships",

  // This array becomes a Collection List in Webflow
  testimonials: [
    {
      // → CMS Field: quote (RichText)
      quote: "Working with Playground Studios transformed our online presence. The website they built is not only beautiful but incredibly easy for our team to update.",

      // → CMS Field: authorName (PlainText)
      authorName: "Sarah Johnson",

      // → CMS Field: authorRole (PlainText)
      authorRole: "Marketing Director",

      // → CMS Field: companyName (PlainText)
      companyName: "TechFlow Inc.",

      // → CMS Field: authorImage (Image)
      authorImage: "/images/testimonial-1.jpg",

      // → CMS Field: isFeatured (Switch) - used for filtering
      isFeatured: true,
    },
    // ... more testimonials
  ],
};
```

---

## Phase 5: Add to Page

Import component into relevant page file:

```jsx
// prototype/src/pages/Home.jsx
import { Hero } from '../components/Hero';
import { mockHeroData } from '../data/mockHeroData';

export function Home() {
  return (
    <div className="page-wrapper">
      <Hero {...mockHeroData} />
      {/* More sections */}
    </div>
  );
}
```

---

## Phase 6: Document for Translation

### Inline Translation Comments

Add comments that help with Webflow rebuild:

```jsx
{/*
  WEBFLOW: Collection List
  Collection: Testimonial
  Filter: isFeatured = true
  Limit: 3
  Sort: Created (Descending)
*/}
{testimonials.map((item, index) => (
  <div key={index} className="testimonial_component">
    {/* WEBFLOW: Bound to 'quote' field */}
    <blockquote className="testimonial-quote">
      {item.quote}
    </blockquote>

    {/* WEBFLOW: Bound to 'authorName' field */}
    <p className="testimonial-author">{item.authorName}</p>
  </div>
))}
```

### Translation Notes Header

```jsx
/**
 * WEBFLOW TRANSLATION GUIDE
 * ═══════════════════════════════════════════════════════════════
 *
 * ELEMENT HIERARCHY:
 * Section (section_testimonials)
 *   └─ Div (padding-global)
 *      └─ Container (container-large)
 *         └─ Div (padding-section-medium)
 *            └─ Div (testimonials_component)
 *               ├─ Div (testimonials-header)
 *               │  ├─ H2 (heading-style-h2)
 *               │  └─ P (text-size-regular)
 *               └─ Collection List (testimonials-grid)
 *                  └─ Collection Item (testimonial_component)
 *                     ├─ Blockquote (testimonial-quote) → quote
 *                     ├─ P (testimonial-author) → authorName
 *                     └─ P (testimonial-role) → authorRole
 *
 * CMS SETUP:
 * 1. Create 'Testimonial' collection with fields listed above
 * 2. Add Collection List to section
 * 3. Bind fields to text elements
 * 4. Set filter: isFeatured = true
 * 5. Set limit: 3
 *
 * RESPONSIVE:
 * Desktop: 3-column grid
 * Tablet: 2-column grid
 * Mobile: 1-column stack
 *
 * ANIMATIONS:
 * - Stagger entrance: 0.1s delay between cards
 * - Implementation: Webflow IX2 (scroll into view trigger)
 * ═══════════════════════════════════════════════════════════════
 */
```

---

## Output Summary

After creating component:

```
✅ Component created: Hero.jsx

📂 Context Loaded:
- Wireframe: homepage_wireframe.json (section: hero)
- Page Brief: Homepage Hero requirements
- Visual System: Typography and spacing tokens
- CMS: Static section (no CMS binding)

📁 Files Created:
- prototype/src/components/Hero.jsx
- prototype/src/data/mockHeroData.js
- Updated: prototype/src/pages/Home.jsx

🎨 Styling:
- Classes: 12 Client-First classes applied
- Responsive: Desktop → Tablet → Mobile defined
- Tokens: Using design system spacing

🔧 Next Steps:
1. Run: cd prototype && pnpm dev
2. View: http://localhost:5173
3. When ready: /translate Hero.jsx
4. Add animations: /gsap-animation Hero.jsx

📊 CMS Notes:
- This section is static (no CMS)
- For dynamic content, mock data would map to collection fields
```

---

## Allowed Tools
- Read (load strategy context)
- Write (create component + mock data)
- Edit (update page imports)
- Glob (find existing components)
