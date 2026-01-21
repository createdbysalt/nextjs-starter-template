# /wireframe - Webflow Element Structure Planning

Generate page-by-page Webflow element structures from strategy outputs with CMS-first architecture.

## Skills to Load (MUST READ BEFORE GENERATING)

**CRITICAL: You MUST explicitly read each skill file BEFORE generating any wireframes.**

These skills contain essential standards for element planning, CMS architecture, and naming conventions. Referencing them is not enough - you must READ the actual file content.

### Step 1: Read All Skills First

```
READ THESE FILES BEFORE PROCEEDING:
────────────────────────────────────────────────────────────────
1. .claude/skills/webflow-element-planning/SKILL.md
   → Contains 7 frameworks for element structure and CMS binding

2. .claude/skills/client-first-patterns/SKILL.md
   → Contains class naming conventions and common patterns

3. .claude/skills/cms-best-practices/SKILL.md
   → Contains field type selection and collection architecture
────────────────────────────────────────────────────────────────
```

### Step 2: Apply Standards From Skills

After reading, ensure wireframes follow:
- Element mapping tables (from webflow-element-planning)
- Client-First class naming (from client-first-patterns)
- CMS field type decisions (from cms-best-practices)
- Quality checklists (from all skills)

```skill
.claude/skills/webflow-element-planning
```

```skill
.claude/skills/client-first-patterns
```

```skill
.claude/skills/cms-best-practices
```

## Agent to Invoke

```agent
.claude/agents/wireframe-architect
```

---

## Core Philosophy: CMS-First Architecture

**Every website should be easy for the client to maintain.**

This means:
- **Default to CMS** - If content might change, it should be CMS-powered
- **Minimize hardcoded content** - Only truly static elements (nav labels, legal footer) stay hardcoded
- **Plan for growth** - Structure that scales when client adds more items
- **Client empowerment** - Non-technical users can update content without developer help

### What Should Be CMS-Powered

```
ALWAYS CMS (Client must be able to update)
────────────────────────────────────────────────────────────────
- Blog posts / Articles / News
- Team members / Staff bios
- Services / Products / Offerings
- Testimonials / Reviews
- Case studies / Portfolio items
- FAQs / Help content
- Pricing tiers (if they change)
- Client logos / Partner logos
- Event listings
- Job openings
- Location/contact info (if multiple)
- Any repeating content blocks

CONSIDER CMS (Depends on client needs)
────────────────────────────────────────────────────────────────
- Hero headline/subheadline (if A/B testing or frequent updates)
- Feature blocks (if features evolve)
- CTA button text (if marketing tests copy)
- Section headers (if client wants control)
- Image galleries
- Statistics/metrics
- Awards/certifications

STATIC IS OKAY (Rarely changes, core to brand)
────────────────────────────────────────────────────────────────
- Navigation labels
- Footer legal text
- Company name/logo
- Core brand messaging (if stable)
- Page structural elements
```

---

## Process

### Phase 1: Load Strategy Context

Automatically load from `projects/[client]/outputs/`:

```
REQUIRED:
- client_dna.json         → Brand context, offerings
- page_briefs.json        → Section requirements per page
- *_copy.json            → Finalized copy content (if available)

RECOMMENDED:
- strategic_sitemap.json  → Page hierarchy, URLs
- component_specs.json    → Component definitions
- visual_system.json      → Design tokens

OPTIONAL:
- icp_profiles.json       → For content direction
```

**If page_briefs.json is missing:** Prompt user to run `/strategy` first.

**Copy Integration Protocol:**
- If `*_copy.json` exists: Use actual headlines, CTAs, and copy text in wireframes
- If copy missing: Use placeholders with clear annotation that copy is needed
- Replace `content_direction` fields with `content` fields when actual copy is available

### Phase 2: CMS Collection Planning

Before element structure, plan the CMS:

```
CMS PLANNING OUTPUT:
────────────────────────────────────────────────────────────────

1. COLLECTION INVENTORY
   List all collections this site needs:
   - BlogPost (for blog section)
   - TeamMember (for about page)
   - Service (for services page)
   - Testimonial (for social proof)
   - FAQ (for FAQ section)
   - CaseStudy (for portfolio)

2. FIELD MAPPING
   For each collection, define fields:

   BlogPost:
   - name (PlainText) → Title
   - slug (Slug) → URL
   - excerpt (PlainText) → Preview text
   - content (RichText) → Full article
   - thumbnail (Image) → Card image
   - heroImage (Image) → Article hero
   - authorRef (Reference → TeamMember)
   - categoryRef (Reference → Category)
   - publishDate (DateTime)
   - isFeatured (Switch)

3. REFERENCE RELATIONSHIPS
   - BlogPost → TeamMember (author)
   - BlogPost → Category (classification)
   - CaseStudy → Service (related service)

4. CMS-BOUND SECTIONS
   Map which page sections use which collections:
   - Homepage Hero: Static (or CMS for testing)
   - Homepage Features: Service collection (latest 3)
   - Homepage Testimonials: Testimonial collection (featured)
   - Blog Page: BlogPost collection (all, paginated)
   - About Team: TeamMember collection (all)
```

### Phase 3: Page-by-Page Wireframing

For each page in priority order:

**1. Extract from Page Brief**
- Section list and purposes
- Content requirements
- Conversion goals
- CTA placements

**2. Map Sections to Structure**
- Apply Client-First patterns
- Identify CMS-bound elements
- Plan responsive behavior
- Mark animation opportunities

**3. Generate Element Tree**
- Complete hierarchy with classes
- CMS field bindings
- Content slots and direction
- Responsive specifications

### Phase 4: Output Generation

Generate to `projects/[client]/outputs/wireframes/`:

```
OUTPUT FILES:
────────────────────────────────────────────────────────────────

1. cms_architecture.json
   Complete CMS collection plan

2. {page}_wireframe.json
   Element tree for each page

3. webflow_element_plan.json
   Consolidated API-ready structure

4. wireframe_summary.md
   Human-readable overview

5. cms_content_checklist.md
   List of content client needs to provide

6. wireframe_annotations.js  ← NEW: For prototype mode
   Strategic reasoning for each section (client-facing)
```

### Phase 5: Generate Prototype Annotations

**For each section in the wireframe, extract strategic context:**

```javascript
// wireframe_annotations.js - Auto-generated from wireframe

export const annotations = {
  "hero": {
    sectionId: "hero",
    sectionName: "Hero Section",
    // From wireframe.sections[].purpose
    purpose: "Communicate who + what + vibe instantly",
    // Generated: WHY this section is placed here
    whyHere: "First section because visitors need immediate orientation. If they can't understand what you do in 5 seconds, they bounce.",
    // From wireframe.page_summary.primary_conversion_goal or section CTA
    conversionGoal: "Get 50%+ to click 'View Work' or 10-15% direct to 'Let's Talk'",
    // From wireframe.sections[].from_page_brief
    contentDirection: "Full-bleed portfolio image. The WORK is the hero.",
    // From wireframe.sections[].cms_binding
    cmsNote: "Static section - hardcoded in Webflow"
  },
  // ... more sections
};
```

**Annotation fields map from wireframe:**

| Annotation Field | Wireframe Source |
|------------------|------------------|
| `sectionId` | `sections[].section_id` |
| `sectionName` | `sections[].section_name` |
| `purpose` | `sections[].purpose` |
| `whyHere` | Generated from section placement + conversion psychology |
| `conversionGoal` | `page_summary.primary_conversion_goal` or `sections[].from_page_brief.cta` |
| `contentDirection` | `sections[].from_page_brief.content_direction` |
| `cmsNote` | `sections[].cms_binding` (null = static, object = CMS details) |

**The `whyHere` field uses these patterns:**

```
SECTION PLACEMENT REASONING:
────────────────────────────────────────────────────────────────

Hero (position 1):
→ "First section because visitors need immediate orientation."

Social Proof / Logos (position 2):
→ "After hero to answer 'Who trusts them?' Social proof early reduces skepticism."

Featured Work / Portfolio (position 3):
→ "After credibility, visitors want PROOF. Shows range and quality."

About / Intro (position 4):
→ "After showing work, humanizes the brand. Builds emotional connection."

CTA / Contact (last position):
→ "Page-ending CTA catches warm visitors who scrolled everything."

Testimonials (any position):
→ "Social proof from real customers. Addresses 'Does this actually work?'"

FAQ (late position):
→ "Addresses remaining objections for visitors still on the fence."

Pricing (mid-late position):
→ "After value established. Never show price before showing worth."
```

---

## Interaction Flow

### User Prompt Examples

**Generate for all pages:**
```
/wireframe Generate wireframes for all pages
```

**Generate for specific page:**
```
/wireframe Create wireframe for the homepage
```

**With CMS emphasis:**
```
/wireframe Homepage wireframe - make as much CMS-powered as possible
```

### Expected Response Format

```markdown
## Wireframe Generation: [Client Name]

### Context Loaded
- Client DNA: [client name, industry]
- Page Briefs: [X pages defined]
- Component Specs: [Available/Not available]
- Visual System: [Available/Not available]

### CMS Architecture Plan

**Collections Needed:**
| Collection | Purpose | Est. Items | Used On |
|------------|---------|------------|---------|
| Service | Service offerings | 6 | Homepage, Services |
| Testimonial | Client reviews | 12 | Homepage, About |
| TeamMember | Staff profiles | 8 | About |
| BlogPost | Articles | 20+ | Blog |
| FAQ | Help content | 15 | FAQ, Contact |

**CMS Coverage:**
- 7 of 12 sections are CMS-powered (58%)
- 4 of 5 page types have CMS content
- Client can update all dynamic content independently

### Page Wireframes

#### Homepage (Priority: Critical)
**Sections:** 7
**CMS-Powered:** 3 (Features, Testimonials, Blog Preview)
**Static:** 4 (Hero, CTA, About Preview, Footer)

[Section breakdown with element hierarchy...]

#### Services Page (Priority: Important)
**Sections:** 5
**CMS-Powered:** 4 (Hero service selector, Grid, Details, Related)
**Static:** 1 (CTA)

[Section breakdown...]

### Files Generated
- `projects/playground-studios/outputs/wireframes/cms_architecture.json`
- `projects/playground-studios/outputs/wireframes/homepage_wireframe.json`
- `projects/playground-studios/outputs/wireframes/services_wireframe.json`
- `projects/playground-studios/outputs/wireframes/wireframe_summary.md`
- `projects/playground-studios/outputs/wireframes/cms_content_checklist.md`
- `projects/playground-studios/outputs/wireframes/wireframe_annotations.js` ← Client-facing explanations

### Content Needed from Client

**For CMS Collections:**
- [ ] 6 service descriptions with icons
- [ ] 8 team member bios with photos
- [ ] 12 testimonial quotes with author info
- [ ] 15 FAQ questions and answers
- [ ] 3 blog posts for launch

**For Static Sections:**
- [ ] Hero headline and subheadline
- [ ] Company about paragraph
- [ ] CTA section copy

### Next Steps
1. **Review wireframes** - Check element structure matches needs
2. **Run `/sync-cms-schema`** - Create CMS collections in Webflow
3. **Run `/vibe`** - Prototype key sections in React
4. **Run `/copy`** - Generate content for sections
```

---

## CMS Content Checklist Template

Generate a checklist for the client to gather content:

```markdown
# Content Checklist: [Client Name]

**Website:** [URL]
**Prepared:** [Date]
**Deadline:** [If applicable]

---

## CMS Content Needed

### Services Collection (6 items)
For each service, please provide:
- [ ] Service name (50 chars max)
- [ ] Short description (150 chars, for cards)
- [ ] Full description (300-500 words)
- [ ] Icon or representative image (PNG, min 200x200)
- [ ] Key benefits (3-5 bullet points)
- [ ] CTA text (e.g., "Learn More", "Get Started")

**Template Row:**
| Name | Short Desc | Full Desc | Image | Benefits | CTA |
|------|------------|-----------|-------|----------|-----|
| Web Design | We create beautiful... | [Full text] | [file] | Fast, Modern, Responsive | Learn More |

---

### Testimonials Collection (8-12 items)
For each testimonial, please provide:
- [ ] Quote (50-150 words)
- [ ] Client name
- [ ] Client title/role
- [ ] Company name
- [ ] Headshot (JPG, square, min 200x200)
- [ ] Featured? (Yes/No - for homepage)

---

### Team Members Collection (8 items)
For each team member, please provide:
- [ ] Full name
- [ ] Role/title
- [ ] Bio (100-200 words)
- [ ] Professional headshot (JPG, min 400x400)
- [ ] LinkedIn URL (optional)
- [ ] Email (optional, for contact)

---

## Static Content Needed

### Homepage
- [ ] Hero headline (8-12 words)
- [ ] Hero subheadline (20-30 words)
- [ ] Primary CTA button text
- [ ] Secondary CTA button text
- [ ] About section paragraph (100-150 words)

### About Page
- [ ] Company story (300-500 words)
- [ ] Mission statement (50 words)
- [ ] Values (3-5 with descriptions)

---

## Images Needed

### Photography
- [ ] Hero background/featured image (1920x1080 min)
- [ ] About section image
- [ ] CTA section background (optional)

### Graphics
- [ ] Service icons (6)
- [ ] Social proof logos (if applicable)

---

## Content Guidelines

**Tone:** [From brand voice]
**Word counts are suggestions** - quality over quantity
**Images:** High resolution, well-lit, professional
**Deadline:** Please provide all content by [date]

---

**Questions?** Contact [your email]
```

---

## Integration Points

### Inputs From
- `/discover` → Client DNA, brand context
- `/icp` → Customer psychology for content direction
- `/strategy` → Page briefs, sitemap, content requirements
- `/brief` → Component specs, visual system

### Outputs To
- `/vibe` → Element structure informs React components
- `/sync-cms-schema` → CMS architecture for collection creation
- `/copy` → Content slots and direction
- `/push-to-webflow` → API-ready element structure
- `/translate` → Build documentation

---

## Quality Standards

### CMS Architecture
- [ ] Every repeating element uses CMS
- [ ] Client can update all dynamic content
- [ ] Reference relationships are logical
- [ ] Field types match content needs
- [ ] Collection names are semantic

### Element Structure
- [ ] Client-First naming throughout
- [ ] Maximum 4 levels of nesting
- [ ] All wrapper divs have purpose
- [ ] CMS bindings clearly marked
- [ ] Responsive behavior defined

### Deliverables
- [ ] Content checklist is client-friendly
- [ ] Wireframes are actionable
- [ ] CMS architecture is complete
- [ ] Next steps are clear

---

## Example: Full CMS Architecture Output

```json
{
  "cms_architecture": {
    "client_name": "Playground Studios",
    "generated_date": "2026-01-17",
    "cms_coverage_percentage": 65,

    "collections": [
      {
        "collection_name": "Service",
        "singular_name": "Service",
        "slug": "services",
        "purpose": "Company service offerings displayed on homepage and services page",
        "estimated_items": 6,
        "used_on_pages": ["homepage", "services"],

        "fields": [
          {
            "name": "name",
            "type": "PlainText",
            "required": true,
            "help_text": "Service name, e.g., 'Web Design'",
            "max_length": 50,
            "binds_to": ["card-title", "service-heading"]
          },
          {
            "name": "slug",
            "type": "Slug",
            "required": true,
            "auto_generate": true
          },
          {
            "name": "shortDescription",
            "type": "PlainText",
            "required": true,
            "help_text": "Brief description for card display",
            "max_length": 150,
            "binds_to": ["card-description"]
          },
          {
            "name": "fullDescription",
            "type": "RichText",
            "required": true,
            "help_text": "Full service description for detail page",
            "binds_to": ["service-content"]
          },
          {
            "name": "icon",
            "type": "Image",
            "required": true,
            "help_text": "Service icon (SVG or PNG, 200x200)",
            "binds_to": ["card-icon"]
          },
          {
            "name": "heroImage",
            "type": "Image",
            "required": false,
            "help_text": "Large image for service detail page",
            "binds_to": ["service-hero-image"]
          },
          {
            "name": "benefits",
            "type": "RichText",
            "required": false,
            "help_text": "Bullet list of key benefits",
            "binds_to": ["service-benefits"]
          },
          {
            "name": "ctaText",
            "type": "PlainText",
            "required": false,
            "help_text": "CTA button text, default 'Learn More'",
            "default": "Learn More",
            "binds_to": ["card-cta-text"]
          },
          {
            "name": "isFeatured",
            "type": "Switch",
            "required": false,
            "help_text": "Show on homepage featured section",
            "binds_to": ["conditional_visibility"]
          },
          {
            "name": "sortOrder",
            "type": "Number",
            "required": false,
            "help_text": "Display order (lower = first)",
            "binds_to": ["sort_order"]
          }
        ],

        "reference_fields": [],

        "collection_page_template": "services-template",
        "collection_list_locations": [
          {
            "page": "homepage",
            "section": "features",
            "filter": "isFeatured = true",
            "limit": 3,
            "sort": "sortOrder ascending"
          },
          {
            "page": "services",
            "section": "services-grid",
            "filter": "none",
            "limit": "all",
            "sort": "sortOrder ascending"
          }
        ]
      },

      {
        "collection_name": "Testimonial",
        "singular_name": "Testimonial",
        "slug": "testimonials",
        "purpose": "Client testimonials for social proof",
        "estimated_items": 12,
        "used_on_pages": ["homepage", "about"],

        "fields": [
          {
            "name": "quote",
            "type": "RichText",
            "required": true,
            "help_text": "Testimonial quote (50-150 words)",
            "binds_to": ["testimonial-quote"]
          },
          {
            "name": "authorName",
            "type": "PlainText",
            "required": true,
            "help_text": "Client's full name",
            "binds_to": ["testimonial-author"]
          },
          {
            "name": "authorRole",
            "type": "PlainText",
            "required": true,
            "help_text": "Client's title/role",
            "binds_to": ["testimonial-role"]
          },
          {
            "name": "companyName",
            "type": "PlainText",
            "required": false,
            "help_text": "Client's company",
            "binds_to": ["testimonial-company"]
          },
          {
            "name": "authorImage",
            "type": "Image",
            "required": false,
            "help_text": "Headshot (square, min 200x200)",
            "binds_to": ["testimonial-image"]
          },
          {
            "name": "isFeatured",
            "type": "Switch",
            "required": false,
            "help_text": "Show on homepage",
            "binds_to": ["conditional_visibility"]
          }
        ],

        "reference_fields": [],

        "collection_page_template": null,
        "collection_list_locations": [
          {
            "page": "homepage",
            "section": "testimonials",
            "filter": "isFeatured = true",
            "limit": 3,
            "sort": "random"
          },
          {
            "page": "about",
            "section": "testimonials",
            "filter": "none",
            "limit": 6,
            "sort": "created descending"
          }
        ]
      }
    ],

    "reference_relationships": [
      {
        "from_collection": "BlogPost",
        "field": "authorRef",
        "to_collection": "TeamMember",
        "relationship": "many-to-one",
        "purpose": "Link articles to authors"
      }
    ],

    "content_checklist_sections": [
      {
        "section": "Services",
        "items_needed": 6,
        "priority": "high",
        "fields_per_item": 8
      },
      {
        "section": "Testimonials",
        "items_needed": 12,
        "priority": "high",
        "fields_per_item": 6
      },
      {
        "section": "Team",
        "items_needed": 8,
        "priority": "medium",
        "fields_per_item": 5
      }
    ]
  }
}
```

---

## React Prototype Wireframe Mode

For client presentations and structure validation, the wireframe can be viewed as an interactive React prototype.

### Running Wireframe Mode

```bash
cd prototype
pnpm dev
# Opens at http://localhost:5173
```

### Wireframe Styling

The prototype includes two style modes:

```jsx
// In App.jsx - toggle between modes:
// import './styles/main.css';        // Full visual design
import './styles/wireframe.css';       // Minimal wireframe mode (default)
```

**Wireframe mode features:**
- Black, white, and grey color palette only
- Thin, minimal typography (14px base)
- Grey placeholder images (no actual photos)
- Focus on layout and hierarchy
- Interactive annotation labels

### Client-Facing Annotation Labels

Each section has a clickable label that explains the strategic reasoning:

```jsx
<WireframeAnnotation {...annotations.hero}>
  <Hero {...heroData} />
</WireframeAnnotation>
```

**Annotation popup displays:**
- **Section Name**: Human-readable section label
- **Purpose**: Why this section exists (conversion psychology)
- **Why Here**: Strategic placement reasoning
- **Conversion Goal**: Expected user behavior metrics
- **Content Direction**: What content goes here
- **CMS Note**: Whether it's dynamic (CMS) or static (hardcoded)

### Annotation Data Structure

Annotations live in `src/data/wireframeAnnotations.js`:

```javascript
export const annotations = {
  hero: {
    sectionId: 'hero',
    sectionName: 'Hero Section',
    purpose: 'First thing visitors see. Must communicate who + what in 5 seconds.',
    whyHere: 'Hero is first because visitors decide instantly whether to stay.',
    conversionGoal: '50%+ click View Work, 10-15% go straight to contact.',
    contentDirection: 'Full-bleed portfolio image. Work is the hero.',
    cmsNote: 'Static content - edit directly in Webflow.'
  },
  // ... more sections
};

export const workPageAnnotations = { /* ... */ };
export const aboutPageAnnotations = { /* ... */ };
export const servicesPageAnnotations = { /* ... */ };
export const contactPageAnnotations = { /* ... */ };
```

### Navigation

The prototype uses hash-based routing:

- **Homepage**: `http://localhost:5173/` or `#/`
- **Work**: `#/work`
- **About**: `#/about`
- **Services**: `#/services`
- **Contact**: `#/contact`

All internal links use hash format (`href="#/work"`) for prototype navigation.

### Wireframe CSS Variables

```css
:root {
  --wf-black: #1a1a1a;
  --wf-dark-grey: #4a4a4a;
  --wf-mid-grey: #999999;
  --wf-light-grey: #e5e5e5;
  --wf-off-white: #f5f5f5;
  --wf-white: #ffffff;
  --wf-placeholder: #d4d4d4;
}
```

### Client Presentation Tips

1. **Run locally** - Share screen or deploy to staging
2. **Explain annotation labels** - "Click any section label to see why it's there"
3. **Focus on structure** - Remind client this is layout, not final design
4. **Walk through pages** - Navigate using the header menu
5. **Highlight CMS vs Static** - Show which content they can update themselves
