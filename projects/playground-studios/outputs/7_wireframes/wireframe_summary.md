# Wireframe Summary: Playground Studios

**Generated:** January 17, 2026
**Website:** ontheplayground.studio
**Status:** Ready for Webflow Build

---

## Executive Summary

Complete wireframe package for Playground Studios website with **CMS-first architecture** ensuring Barrett can easily update portfolio and content without developer assistance.

### Key Metrics

| Metric | Value |
|--------|-------|
| Total Pages | 6 (5 static + 1 CMS template) |
| CMS Coverage | 72% of dynamic sections |
| Collections | 3 (Project, ClientLogo, Service) |
| Total Sections | 24 |
| Estimated Elements | ~290 |
| Reusable Components | 4 (project-card, contact-cta, filter-bar, page-header) |

---

## Page Overview

| Page | URL | Priority | Sections | CMS-Powered |
|------|-----|----------|----------|-------------|
| Homepage | `/` | CRITICAL | 5 | 2 (40%) |
| Work | `/work` | CRITICAL | 3 | 1 (33%) |
| Work Detail | `/work/[slug]` | HIGH | 5 | 4 (80%) |
| About | `/about` | HIGH | 5 | 0 (0%) |
| Services | `/services` | MEDIUM | 4 | 1 (25%) |
| Contact | `/contact` | CRITICAL | 4 | 0 (0%) |

---

## CMS Architecture

### Collections

#### 1. Project (CRITICAL)
- **Purpose:** Portfolio pieces - the core of Playground's business
- **Items Needed:** 15-25 for launch
- **Used On:** Homepage (featured), Work (all), Work Detail (template)

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| name | PlainText | Yes | Project title |
| slug | Slug | Yes | URL path |
| clientName | PlainText | Yes | Client brand name |
| category | Option | Yes | Brand / Hospitality / Studio |
| heroImage | Image | Yes | Main project image |
| description | RichText | Yes | 2-4 sentences |
| servicesProvided | PlainText | No | Comma-separated services |
| year | PlainText | No | Year completed |
| galleryImages | MultiImage | Yes | 6-15 project images |
| isFeatured | Switch | No | Show on homepage |
| sortOrder | Number | No | Display order |

#### 2. ClientLogo (HIGH)
- **Purpose:** Social proof logo bar
- **Items Needed:** 8-15
- **Used On:** Homepage

| Field | Type | Required |
|-------|------|----------|
| name | PlainText | Yes |
| logo | Image | Yes |
| isActive | Switch | No |
| sortOrder | Number | No |

#### 3. Service (MEDIUM)
- **Purpose:** Service offerings with category grouping
- **Items Needed:** 8-10
- **Used On:** Services page

| Field | Type | Required |
|-------|------|----------|
| name | PlainText | Yes |
| category | Option | Yes |
| shortDescription | PlainText | No |
| icon | Image | No |
| relatedProjectRef | Reference | No |
| sortOrder | Number | No |
| isActive | Switch | No |

---

## Page Wireframes

### 1. Homepage (`/`)

**One Job:** Orient visitors and route them to portfolio or contact within 5 seconds

**Sections:**
1. **Hero** - Full-viewport with background image, headline, dual CTAs
2. **Client Logos** (CMS) - 8 logos in horizontal row
3. **Featured Work** (CMS) - 6 project cards in grid
4. **Brief Intro** - 2-3 sentence studio description
5. **Contact CTA** - Dark section with conversion invitation

**Special Features:**
- DVTK-style ASCII text scramble loading animation (GSAP)
- Transparent navigation on hero
- Staggered card entrance animations

### 2. Work (`/work`)

**One Job:** Showcase portfolio breadth and quality, invite deeper exploration

**Sections:**
1. **Page Header** - Simple title, optional subtitle
2. **Project Grid** (CMS) - All projects with category filter bar
3. **Contact CTA** - Reuses homepage component

**Special Features:**
- Category filter (All | Brand | Hospitality | Studio)
- Finsweet CMS Filter recommended
- 3-column grid (responsive to 2, then 1)

### 3. Work Detail (`/work/[slug]`)

**One Job:** Deep dive on specific project, prove relevant capability

**Sections:**
1. **Project Hero** (CMS) - Full-width hero image with title overlay
2. **Project Info** (CMS) - Description, services, category, year
3. **Image Gallery** (CMS) - 6-15 images from galleryImages field
4. **Next Project** (CMS) - Teaser for next portfolio item
5. **Contact CTA** - Light variant

**CMS Bindings:** 80% of page content is CMS-driven

### 4. About (`/about`)

**One Job:** Humanize the studio, build trust and connection

**Sections:**
1. **Hero/Intro** - Hook line and opening paragraph
2. **Origin Story** - The Portland playground story (2-column layout)
3. **Process Philosophy** - Play on Set → Get in the Box → Go Home
4. **Founder Bio** - Barrett Shutt photo and biography
5. **Contact CTA** - Dark variant

**Note:** Static content - brand-centric narrative that rarely changes

### 5. Services (`/services`)

**One Job:** Clarify offerings, help visitors self-qualify

**Sections:**
1. **Intro** - Full-service positioning statement
2. **Service Categories** (CMS) - Three-column grid by category
3. **How We Work** - Discovery → Production → Delivery process
4. **Contact CTA** - Dark variant

**Service Categories:**
- Creative Development (Concept, Story, Positioning, Mood Boards)
- Production (Photography, Video, Commercial, Social)
- Post-Production (Editing, Color Grading, Retouching, Sound)

### 6. Contact (`/contact`)

**One Job:** Capture lead information and start conversation

**Sections:**
1. **Headline** - Warm welcome headline and subtitle
2. **Contact Form** - Webflow Forms with 6 fields
3. **What to Expect** - Response time expectations
4. **Alternative Contact** - Email, Instagram, Location

**Form Fields:**
- Name* (required)
- Email* (required)
- Company/Brand (optional)
- Project Type (dropdown, optional)
- Budget Range (dropdown, optional)
- Message* (textarea, required)

---

## Reusable Components

### 1. project-card
Used on: Homepage, Work page
- Image wrapper with hover overlay
- Title, client name, category tag
- Linked to project detail page

### 2. contact-cta
Used on: All pages except Contact
- Dark background variant (is-dark)
- Centered headline and CTA button
- Consistent "Let's Talk" conversion point

### 3. filter-button
Used on: Work page
- Horizontal pill buttons
- Active state styling
- Data attributes for Finsweet Filter

### 4. page-header
Used on: Work, Services, Contact
- Consistent page title treatment
- Optional subtitle

---

## Naming Convention

All classes follow **Client-First** naming:

```
section_{section-name}           → Section wrapper
{section-name}_component         → Main component container
{section-name}_list             → Collection list wrapper
{component}_image               → Image element
{component}_title               → Title/heading
{component}_content             → Content wrapper

Utility classes:
padding-global                   → Consistent horizontal padding
container-large/medium/small     → Max-width containers
padding-section-small/medium/large → Vertical section padding
heading-style-h1/h2/h3/h4        → Typography scale
text-size-small/regular/large    → Body text scale
text-style-muted                 → Secondary text color
text-color-white                 → White text on dark
button is-primary/secondary/inverse → Button variants
is-dark                          → Dark section modifier
```

---

## Animation Plan

| Element | Animation | Implementation |
|---------|-----------|----------------|
| Loading intro | ASCII text scramble | GSAP custom embed |
| Hero content | Staggered fade-up | GSAP or Webflow IX2 |
| Client logos | Fade on scroll | Webflow IX2 |
| Project cards | Stagger fade-up | Webflow IX2 |
| Project card hover | Subtle scale (1.02) | CSS transition |
| Process steps | Stagger on scroll | Webflow IX2 |
| Next project image | Scale on hover | CSS transition |

---

## Content Requirements

### From Client

**CMS Content (CRITICAL):**
- [ ] 15-20 portfolio projects with images and descriptions
- [ ] 8 client logos (SVG or PNG, transparent)
- [ ] 8-10 service descriptions

**Static Content (HIGH):**
- [ ] Homepage hero headline and subhead
- [ ] Homepage brief intro paragraph
- [ ] About page origin story (exists in approved copy)
- [ ] About page founder bio paragraphs
- [ ] **Updated founder headshot** (flagged as missing)
- [ ] Services intro paragraph
- [ ] Contact page copy

### Image Specifications

| Image Type | Dimensions | Format | Max Size |
|------------|------------|--------|----------|
| Hero images | 1920x1280 min | JPG | 500KB |
| Gallery images | 1600px min edge | JPG | 300KB |
| Client logos | Any size | SVG/PNG | 50KB |
| Founder headshot | 800x800 min | JPG | 200KB |

---

## Files Generated

```
outputs/wireframes/
├── cms_architecture.json        → CMS collection plan
├── homepage_wireframe.json      → Homepage element tree
├── work_wireframe.json          → Work page element tree
├── work_detail_wireframe.json   → Project detail template
├── about_wireframe.json         → About page element tree
├── services_wireframe.json      → Services page element tree
├── contact_wireframe.json       → Contact page element tree
├── cms_content_checklist.md     → Client content gathering guide
└── wireframe_summary.md         → This file
```

---

## Next Steps

### Immediate
1. **Review wireframes** - Validate element structure matches needs
2. **Run `/sync-cms-schema`** - Create CMS collections in Webflow
3. **Share content checklist** - Send `cms_content_checklist.md` to client

### Parallel Tracks
4. **Run `/vibe`** - Prototype Hero and project-card components
5. **Run `/copy`** - Generate copy for static sections if needed
6. **Gather content** - Client provides portfolio projects and logos

### Webflow Build
7. **Create page structure** - Build pages following wireframe hierarchy
8. **Style components** - Apply visual system to elements
9. **Bind CMS fields** - Connect collection fields to elements
10. **Add animations** - Implement IX2 interactions
11. **Deploy custom code** - Loading animation GSAP embed

---

## Quality Checklist

- [x] All pages have wireframes
- [x] CMS collections defined with all fields
- [x] Client-First naming convention applied
- [x] Responsive behavior specified
- [x] Animation opportunities identified
- [x] Content requirements documented
- [x] Client content checklist created
- [ ] Client review complete
- [ ] Webflow build started

---

*Generated by `/wireframe` command for Playground Studios*
