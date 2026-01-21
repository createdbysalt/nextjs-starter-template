# Webflow Development Workflow Guide

**Stack**: React + GSAP → Webflow  
**For**: SALT STUDIO Webflow Projects  
**Updated**: 2026-01-16

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Daily Workflow](#daily-workflow)
3. [Phase-by-Phase Guide](#phase-by-phase-guide)
4. [Claude Code Commands Reference](#claude-code-commands-reference)
5. [Common Scenarios](#common-scenarios)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Quick Start

### First Time Setup
````bash
# 1. Open project in terminal
cd client-name-website

# 2. Verify Webflow connection
pnpm validate-webflow

# 3. Start prototype server
pnpm dev
````

**Open in browser**: http://localhost:5173

---

## Daily Workflow

### Morning Routine
````bash
# 1. Pull latest changes (if team project)
git pull origin main

# 2. Install any new dependencies
pnpm install

# 3. Start dev server
pnpm dev
````

### During Development
````
┌─────────────────────────────────────────────────────────┐
│  React Prototype (Browser: localhost:5173)             │
│  ↓ (iterate fast)                                       │
│  Claude Code (Terminal)                                 │
│  ↓ (translate when ready)                               │
│  Webflow Designer (Browser: webflow.com/design/...)    │
└─────────────────────────────────────────────────────────┘
````

**Key Principle**: Build and test in React first. Only move to Webflow when component is approved.

---

## Phase-by-Phase Guide

---

## Phase 1: Prototype in React

**Time Estimate**: 30 mins - 2 hours per component  
**Goal**: Create interactive, approved component

### Step 1.1: Start with Claude Code

Open Claude Code CLI in your project directory:
````bash
# Option A: Direct command
claude

# Option B: VS Code Command Palette
# Cmd+Shift+P → "Claude: Open Chat"
````

### Step 1.2: Create Component

**Example: Hero Section**
````
You: /vibe

Claude: What are we building?

You: Hero section with:
- Main heading (H1)
- Subheading paragraph
- Primary CTA button
- Secondary CTA button (text link)
- Right side: Large product image
- Background: Subtle gradient
- Mobile: Stack vertically

Claude: [Creates files and shows preview]
````

**Claude Creates:**
````
prototype/src/components/Hero.jsx
prototype/src/data/mockHeroData.js
````

### Step 1.3: Preview in Browser
````bash
# If dev server not running:
pnpm dev
````

**Navigate to**: http://localhost:5173

**What to check:**
- ✅ Layout matches requirements
- ✅ Responsive (resize browser)
- ✅ Text is readable
- ✅ Buttons are clickable
- ✅ Images load

### Step 1.4: Iterate

**Making changes:**
````
You: The heading is too small. Make it 56px on desktop, 36px on mobile.

Claude: [Updates Hero.jsx with new font sizes]

You: Add more spacing between the heading and subheading.

Claude: [Updates spacing]
````

**Changes auto-reload in browser** (Vite HMR)

### Step 1.5: Add Mock Data

**Check the mock data file:**
````javascript
// prototype/src/data/mockHeroData.js
export const heroData = {
  title: "Transform Your Business with AI",
  description: "The leading platform for modern teams to automate workflows and boost productivity.",
  primaryCTA: {
    text: "Start Free Trial",
    link: "/signup"
  },
  secondaryCTA: {
    text: "Watch Demo",
    link: "/demo"
  },
  image: "/hero-product.png"
};
````

**Important**: This structure becomes your Webflow CMS schema later.

---

## Phase 2: Add Animations

**Time Estimate**: 15-45 mins per animation  
**Goal**: Professional, performant animations

### Step 2.1: Plan Animation

**Before creating**, answer:
1. What triggers it? (page load, scroll, hover, click)
2. What animates? (which elements)
3. How does it move? (fade, slide, scale, rotate)
4. How long? (duration)
5. What easing? (smooth, bouncy, sharp)

### Step 2.2: Create with Claude Code
````
You: /gsap-animation

Claude: What should animate?

You: On page load:
- Hero title fades in from bottom (50px up), 0.8s, smooth easing
- Description follows 0.4s later, same animation
- Buttons fade in and scale up (0.9 to 1) 0.3s after description
- Image slides in from right (100px), happens with buttons
- Overall timeline is 1.6 seconds

Claude: [Creates animation file]
````

**Claude Creates:**
````
prototype/src/animations/heroTimeline.js
````

**And integrates into component:**
````jsx
// Hero.jsx (updated)
import { useGSAP } from '@gsap/react';
import { heroAnimation } from '../animations/heroTimeline';

export function Hero(props) {
  const heroRef = useRef(null);
  
  useGSAP(() => {
    heroAnimation(heroRef.current);
  }, []);
  
  return (
    <section ref={heroRef} data-gsap-animation="hero-entrance">
      {/* ... */}
    </section>
  );
}
````

### Step 2.3: Test Animation

**In browser:**
1. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
2. Watch animation play
3. Check different screen sizes
4. Test on actual mobile device (use local network IP)

**Performance check:**
- Open DevTools → Performance tab
- Record while animation plays
- Look for 60fps (green line)
- Red = performance issue

**Common fixes:**
- ❌ Don't animate: `width`, `height`, `top`, `left`
- ✅ Do animate: `transform`, `opacity`

### Step 2.4: Refine
````
You: The animation feels too fast. Make the whole timeline 2 seconds instead of 1.6.

Claude: [Adjusts durations proportionally]

You: The image should bounce slightly when it arrives.

Claude: [Changes easing to 'back.out(1.7)']
````

---

## Phase 3: Get Approval

**Time Estimate**: 5 mins - 2 days (depends on client)  
**Goal**: Stakeholder sign-off before Webflow build

### Step 3.1: Share Prototype

**Option A: Local Network (same office)**
````bash
# Find your local IP
ipconfig getifaddr en0  # Mac
hostname -I             # Linux
ipconfig               # Windows (look for IPv4)

# Share URL like:
http://192.168.1.100:5173
````

**Option B: Deploy to Vercel/Netlify (remote client)**
````bash
# Build static site
cd prototype
pnpm build

# Deploy (one-time setup)
pnpm add -g vercel
vercel

# Share the URL Vercel provides
````

### Step 3.2: Gather Feedback

**Use a checklist:**
````markdown
## Hero Section Review

**Content:**
- [ ] Heading text accurate
- [ ] CTA copy matches brand voice
- [ ] Image is final version

**Design:**
- [ ] Colors match brand guidelines
- [ ] Font sizes appropriate
- [ ] Spacing feels balanced

**Animation:**
- [ ] Speed feels right (not too fast/slow)
- [ ] Motion is smooth
- [ ] Works on mobile

**Functionality:**
- [ ] Buttons link to correct pages
- [ ] Responsive on all devices
````

### Step 3.3: Iterate Based on Feedback
````
Client: "Can we make the CTA button larger and more prominent?"

You: Make the primary CTA button 20% larger with more padding

Claude: [Updates button styles]
````

**Repeat until approved** ✅

---

## Phase 4: Translate to Webflow

**Time Estimate**: 15-60 mins per component  
**Goal**: Webflow rebuild specification or automated deployment

### Option A: Automated Translation (Webflow MCP)

**Requirements:**
- Webflow API connected (check with `pnpm validate-webflow`)
- `.mcp.json` configured
- Claude Code with MCP enabled

**Command:**
````
You: /push-to-webflow Hero.jsx

Claude: 
Analyzing component structure...
Creating elements in Webflow Designer...

✅ Created:
- Section: "Hero Section" (ID: abc123)
- Container: "Hero Container" (ID: def456)
- Heading H1: "Hero Title" (ID: ghi789)
- Paragraph: "Hero Description" (ID: jkl012)
- Button: "CTA Primary" (ID: mno345)
- Image: "Hero Image" (ID: pqr678)

🔗 View in Designer:
https://webflow.com/design/client-site?nodeId=abc123

Next: Add content and bind CMS fields
````

**Then:**
1. Click the Designer link
2. Review the structure
3. Add actual content (or bind to CMS)
4. Adjust styles if needed

### Option B: Manual Translation (Documentation)

**When to use:**
- Webflow MCP not available
- Complex component needs manual work
- You prefer manual control

**Command:**
````
You: /translate Hero.jsx

Claude: [Creates detailed rebuild guide]
````

**Claude Creates:**
````
translation-docs/components/Hero-webflow-guide.md
translation-docs/cms-models/hero-collection.yaml
````

**Example guide excerpt:**
````markdown
# Hero Section - Webflow Build Guide

## Step 1: Create Section

1. In Webflow Designer, click "+" in Layers panel
2. Add Section
3. Name it: "Hero Section"
4. Class: `hero`

**Settings:**
- Display: Flex
- Direction: Horizontal
- Align: Center
- Padding: 80px (all sides)

## Step 2: Add Container

1. Inside Hero Section, add Div Block
2. Name: "Hero Container"
3. Class: `hero__container`

**Settings:**
- Max Width: 1200px
- Display: Flex
- Gap: 64px

[... continues with all elements ...]
````

**Follow guide step-by-step in Webflow Designer**

### Step 4.2: Create CMS Collections (if needed)

**Check if component uses dynamic data:**
````javascript
// If mockData is an array or has multiple items
// = Needs CMS collection

export const heroData = {
  // Single hero = Static content (no CMS needed)
};

export const features = [
  // Array = CMS collection needed
  { id: 1, title: "Feature 1" },
  { id: 2, title: "Feature 2" },
];
````

**Command:**
````
You: /sync-cms-schema mockFeaturesData.js

Claude:
Analyzing data structure...
Creating CMS collection "Features"...

✅ Collection Created:
Name: Features
Slug: features

Fields:
- title (Plain Text)
- description (Plain Text)
- icon (Image)

Sample item created from mock data.

🔗 View Collection:
https://webflow.com/design/client-site/cms/collections/xyz
````

**Or manually:**
1. Follow YAML schema in `translation-docs/cms-models/`
2. In Webflow: CMS → Add Collection
3. Create fields as specified
4. Add sample items

---

## Phase 5: Deploy Custom Code

**Time Estimate**: 10-30 mins  
**Goal**: GSAP animations running in Webflow

### Step 5.1: Prepare Animation for Webflow

**Command:**
````
You: /deploy-embed heroTimeline.js

Claude:
Converting React GSAP to vanilla JavaScript...
Adding GSAP dependencies...
Creating Webflow-ready embed...

✅ Created: webflow-embeds/animations/hero-gsap.js

Dependencies needed:
- GSAP Core: https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js

Ready to deploy!
````

### Step 5.2: Add to Webflow

**Method A: Via API (if MCP enabled)**
````
Claude: Pushing code to Webflow...

✅ Deployed to: Site Settings → Custom Code → Footer

Verify at: https://webflow.com/design/client-site/settings/custom-code
````

**Method B: Manual Copy-Paste**

1. Open file: `webflow-embeds/animations/hero-gsap.js`
2. Copy entire contents
3. In Webflow Designer:
   - Settings (gear icon) → Custom Code
   - Or Page Settings → Custom Code
   - Paste in "Before </body> tag" section
4. Add GSAP dependency in "Head Code" section:
````html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
````

### Step 5.3: Test in Webflow

1. Click "Preview" in Webflow
2. Watch animation
3. Check browser console (F12) for errors
4. Test on different devices

**Common issues:**
````javascript
// ❌ Error: "Cannot find element"
// Fix: Check data-gsap-animation attribute is on correct element

// ❌ Error: "gsap is not defined"  
// Fix: Add GSAP CDN to head code

// ❌ Animation doesn't play
// Fix: Check selectors match Webflow classes
````

---

## Phase 6: QA & Publish

**Time Estimate**: 30 mins - 2 hours  
**Goal**: Bug-free, polished site

### Step 6.1: Pre-Publish Checklist
````markdown
## Technical QA

**Functionality:**
- [ ] All links work (internal and external)
- [ ] Forms submit correctly
- [ ] CMS content displays properly
- [ ] Custom code runs without errors (check console)

**Responsive:**
- [ ] Desktop (1920px)
- [ ] Laptop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

**Browsers:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Performance:**
- [ ] Page load < 3 seconds
- [ ] Images optimized (WebP when possible)
- [ ] Animations 60fps
- [ ] No console errors

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Alt text on images
- [ ] Color contrast ratio passes (use browser inspector)
- [ ] Screen reader friendly (test with VoiceOver/NVDA)

## Content QA

- [ ] All text is final copy (no lorem ipsum)
- [ ] Brand colors accurate
- [ ] Typography matches guidelines
- [ ] All images are final versions
- [ ] SEO: Page titles set
- [ ] SEO: Meta descriptions set
- [ ] SEO: OG images set
````

### Step 6.2: Publish to Staging

1. In Webflow Designer: Click "Publish"
2. Select "Staging" if available
3. Get staging URL (e.g., `client-site.webflow.io`)
4. Share with client for final approval

### Step 6.3: Publish to Production

**After client approval:**

1. Webflow Designer → Publish
2. Select custom domain
3. Wait for DNS propagation (~5 mins)
4. Test live site
5. Celebrate! 🎉

---

## Claude Code Commands Reference

### Component Creation
````bash
/vibe
# Creates React component with mock data
# Use for: Any UI component

Example: 
  /vibe
  "Create a pricing table with 3 tiers"
````

### Animations
````bash
/gsap-animation
# Creates GSAP animation file
# Use for: Page load, scroll, hover, click animations

Example:
  /gsap-animation
  "Fade in pricing cards on scroll with stagger effect"
````

### Translation
````bash
/translate [ComponentName.jsx]
# Generates Webflow rebuild documentation
# Use for: Manual Webflow builds

Example:
  /translate Hero.jsx
````
````bash
/push-to-webflow [ComponentName.jsx]
# Deploys component to Webflow via API
# Use for: Automated Webflow builds (requires MCP)

Example:
  /push-to-webflow PricingTable.jsx
````

### CMS
````bash
/sync-cms-schema [mockDataFile.js]
# Creates Webflow CMS collection from mock data
# Use for: Dynamic content (blog posts, products, team members)

Example:
  /sync-cms-schema mockBlogPosts.js
````

### Custom Code
````bash
/deploy-embed [animationFile.js]
# Converts and deploys GSAP animation to Webflow
# Use for: Custom animations beyond Webflow IX2

Example:
  /deploy-embed parallaxScroll.js
````

### Code Quality
````bash
/review
# Reviews recent code changes for quality, security, performance
# Use for: Before pushing to Webflow

Example:
  /review
````

---

## Common Scenarios

### Scenario 1: Building a New Page
````bash
# 1. Create page component
/vibe
"Homepage with hero, features grid (3 cols), testimonials carousel, CTA section"

# 2. Add animations
/gsap-animation
"Features grid items fade in on scroll with stagger"

# 3. Test and iterate in browser
pnpm dev

# 4. Get approval (share prototype)

# 5. Deploy to Webflow
/push-to-webflow HomePage.jsx

# 6. Create CMS collections (if needed)
/sync-cms-schema mockTestimonials.js

# 7. Deploy animations
/deploy-embed featuresScroll.js

# 8. QA and publish
````

**Time**: 3-6 hours for full page

---

### Scenario 2: Updating Existing Component
````bash
# 1. Make changes in prototype
# Edit: prototype/src/components/Hero.jsx

# 2. Test in browser
pnpm dev

# 3. Re-translate
/translate Hero.jsx

# 4. Update manually in Webflow Designer
# (Follow updated guide in translation-docs/)

# Or auto-update:
/push-to-webflow Hero.jsx
````

**Time**: 15-45 mins

---

### Scenario 3: Adding New Animation
````bash
# 1. Create animation
/gsap-animation
"Product images parallax on scroll"

# 2. Test in prototype
pnpm dev

# 3. Deploy to Webflow
/deploy-embed productParallax.js

# 4. Test in Webflow preview
````

**Time**: 20-40 mins

---

### Scenario 4: Client Requests Change

**Client**: "The hero button should be green, not blue"
````bash
# 1. Update in prototype
You: Change the hero primary button color to #10B981 (green)

Claude: [Updates button styling]

# 2. Test
pnpm dev

# 3. Get re-approval

# 4. Update in Webflow
# Manual: Update button class in Webflow Designer
# Or: /push-to-webflow Hero.jsx (if using MCP)
````

**Time**: 5-15 mins

---

## Troubleshooting

### Prototype Issues

#### Dev server won't start
````bash
# 1. Kill any processes on port 5173
lsof -ti:5173 | xargs kill -9

# 2. Clear cache and reinstall
pnpm clean
pnpm install
cd prototype && pnpm install

# 3. Try again
pnpm dev
````

#### Changes not appearing in browser
````bash
# 1. Hard refresh
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# 2. Clear Vite cache
rm -rf prototype/.vite

# 3. Restart dev server
pnpm dev
````

#### TypeScript/ESLint errors
````bash
# Fix automatically
pnpm lint:fix
pnpm format

# If still broken, check:
cat prototype/src/components/[Component].jsx
# Look for syntax errors
````

---

### Webflow Issues

#### Animation not working

**Check 1: GSAP loaded?**
````javascript
// In browser console (F12):
typeof gsap
// Should show: "object"
// If "undefined": GSAP CDN not loaded
````

**Fix**: Add to Webflow Page Settings → Custom Code → Head:
````html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
````

**Check 2: Selectors correct?**
````javascript
// In browser console:
document.querySelector('[data-gsap-animation="hero-entrance"]')
// Should show: <section>...</section>
// If null: selector doesn't match
````

**Fix**: Verify `data-gsap-animation` attribute in Webflow matches animation code

**Check 3: Code running?**
````javascript
// Add to top of animation code:
console.log('Animation script loaded');

// Refresh Webflow preview, check console
````

---

#### CMS items not showing

**Check 1: Collection bound?**
1. Select element in Webflow
2. Settings panel → "Get content from..."
3. Verify collection selected

**Check 2: Items published?**
1. CMS → Collections → [Your Collection]
2. Check items have green "Published" badge
3. If draft (orange), click to publish

**Check 3: Filters applied?**
1. Check collection list settings
2. "Filter Settings" → verify no restrictive filters

---

#### Styles look different than prototype

**Common causes:**

1. **Webflow default styles override yours**
   - Fix: Use combo classes for specificity
   
2. **Typography reset differences**
   - Fix: Set exact font sizes, line heights, weights
   
3. **Box model differences**
   - Fix: Set explicit padding/margin instead of relying on defaults

**Best practice**: Open prototype and Webflow side-by-side, match pixel-by-pixel

---

### Performance Issues

#### Slow animations
````javascript
// ❌ BAD (causes reflow)
gsap.to(element, { width: '500px' })
gsap.to(element, { top: '100px' })

// ✅ GOOD (GPU accelerated)
gsap.to(element, { scaleX: 1.5 })
gsap.to(element, { y: '100px' })
````

#### Large images
````bash
# Optimize images before upload
# Use: https://squoosh.app/

# Target:
# - JPEG/WebP quality: 80-85%
# - Max width: 2400px
# - File size: < 500KB
````

#### Too many animations

**Rule**: Max 3-5 animations per viewport at once

**Fix**: Use `scrollTrigger` to animate only when visible

---

## Best Practices

### Do's ✅

**Component Structure:**
- Keep components under 4 levels of nesting
- Use semantic HTML (`<section>`, `<article>`, `<nav>`)
- Add `data-webflow-*` attributes for documentation

**Naming:**
- Use BEM: `.component__element--modifier`
- Be descriptive: `.pricing-card__title` not `.pc-t`
- Match prototype classes to Webflow classes

**Performance:**
- Optimize images before prototyping
- Keep animations under 1 second
- Use `transform` and `opacity` only

**Workflow:**
- Get approval on prototype before building in Webflow
- Test on real devices, not just browser DevTools
- Document any custom logic in comments

### Don'ts ❌

**Component Structure:**
- Don't use deeply nested divs (>4 levels)
- Don't use Webflow auto-generated classes (`.w-1`)
- Don't mix CSS modules and global styles

**Data:**
- Don't hardcode content that should be CMS
- Don't assume props in Webflow (it's static HTML)
- Don't use JavaScript state in production embeds

**Performance:**
- Don't animate `width`, `height`, `top`, `left`
- Don't use heavy libraries (moment.js → use date-fns)
- Don't load everything on page load (lazy load)

**Workflow:**
- Don't build in Webflow before prototype approval
- Don't skip mobile testing
- Don't deploy without QA checklist

---

## Quick Reference

### File Locations
````
Key Files You'll Edit:
├── prototype/src/components/       # React components
├── prototype/src/animations/       # GSAP animations  
├── prototype/src/data/             # Mock data (becomes CMS)
└── design-system/                  # Brand guidelines

Generated Files (Don't Edit):
├── translation-docs/               # Auto-generated guides
├── webflow-embeds/                 # Auto-generated embeds
└── webflow-api-cache/              # API response cache
````

### Terminal Commands
````bash
# Development
pnpm dev                # Start dev server
pnpm build              # Build for production
pnpm preview            # Preview build

# Code Quality
pnpm lint               # Check code
pnpm lint:fix           # Fix code
pnpm format             # Format code

# Utilities
pnpm validate-webflow   # Test Webflow API
pnpm clean              # Clear node_modules
````

### Browser DevTools
````
Check Animation Performance:
1. F12 → Performance tab
2. Click Record
3. Trigger animation
4. Stop recording
5. Look for: 60fps (green) = good, <60fps (red) = bad

Check Console Errors:
1. F12 → Console tab
2. Look for red errors
3. Fix before publishing
````

---

## Getting Help

### Documentation

- **Setup Guide**: `docs/SETUP.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Brand Guidelines**: `design-system/brand-guidelines.md`

### Common Questions

**Q: Can I use npm instead of pnpm?**  
A: Technically yes, but pnpm is required for consistency. Use conversion script if needed.

**Q: Do I need Claude Code?**  
A: No, but it's highly recommended. You can write components manually.

**Q: Can I use other animation libraries?**  
A: Yes, but GSAP is recommended for Webflow compatibility.

**Q: How do I hand off to client?**  
A: Transfer Webflow site ownership + optionally give them the repo.

---

**Need help?** Contact SALT STUDIO team or check `docs/TROUBLESHOOTING.md`

---

**Document Version**: 1.0.0  
**Last Updated**: 2026-01-16