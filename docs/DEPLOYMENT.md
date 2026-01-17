# Deployment Guide

**For**: SALT STUDIO Webflow Projects  
**Stack**: React Prototype → Webflow Production  
**Updated**: 2026-01-16

---

## Deployment Overview
```
Development          → Translation        → Webflow         → Production
(React + pnpm dev)     (Docs/API)          (Designer)        (Published)
```

**Deployment methods:**
1. **Automated** - Via Webflow MCP API (recommended for simple components)
2. **Manual** - Rebuild in Webflow Designer (recommended for complex layouts)
3. **Hybrid** - Mix of both (most common)

---

## Pre-Deployment Checklist

### 1. Prototype Quality Check
```bash
# Run linter
pnpm lint

# Check formatting
pnpm format:check

# Build for production (catches build errors)
pnpm build
```

**Expected:** No errors, all checks pass.

### 2. Browser Testing

Test prototype in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile (Chrome DevTools device mode)

### 3. Animation Performance

- [ ] All animations 60fps on desktop
- [ ] All animations 60fps on mobile
- [ ] No layout shifts during animations
- [ ] Animations use only `transform` and `opacity`

### 4. Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader friendly (aria labels)
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus states visible

---

## Method 1: Automated Deployment (Webflow MCP)

### When to Use

- ✅ Simple components (hero, cards, forms)
- ✅ Flat structure (< 4 nesting levels)
- ✅ Standard layouts (flex, grid)
- ❌ Complex interactions (use manual)
- ❌ Custom animations (requires embeds)

### Deploy Component
```bash
# In Claude Code
> /push-to-webflow Hero.jsx

# Claude will:
# 1. Analyze JSX structure
# 2. Call Webflow API to create elements
# 3. Apply classes and styles
# 4. Return Designer link
```

**Expected output:**
```
✅ Created in Webflow Designer:
- Section: "Hero Section" (ID: abc123)
- Container: "Hero Container" (ID: def456)
- Heading H1: "Hero Title" (ID: ghi789)

🔗 Open in Designer:
https://webflow.com/design/acme-corp/xyz?nodeId=abc123
```

### Deploy CMS Collection
```bash
# In Claude Code
> /sync-cms-schema mockHeroData.js

# Claude will:
# 1. Analyze mock data structure
# 2. Create CMS collection via API
# 3. Add fields based on data types
# 4. Populate with sample data
```

**Expected output:**
```
✅ CMS Collection Created: "Hero Sections"

📋 Fields:
- Title (Plain Text) ← Required
- Description (Plain Text)
- CTA Text (Plain Text)
- Hero Image (Image)

🔗 Collection URL:
https://webflow.com/design/acme-corp/cms/collections/coll_123
```

---

## Method 2: Manual Deployment

### When to Use

- Complex layouts
- Fine-tuned responsive behavior
- Custom Webflow interactions (IX2)
- Client prefers visual control

### Generate Translation Guide
```bash
# In Claude Code
> /translate Hero.jsx

# Claude creates:
# translation-docs/components/Hero-webflow-guide.md
```

### Follow Step-by-Step Guide

**Example guide structure:**
```markdown
# Hero Section → Webflow

## 1. Create Section
- Add Section (name: "Hero Section")
- Display: Flex, Horizontal, Center
- Padding: 80px all sides

## 2. Add Container
- Add Container inside Section
- Max-width: 1200px
- Flex, Gap: 64px

## 3. Add Content Block...
```

**Rebuild manually in Webflow Designer following the guide.**

---

## Method 3: Deploy Custom Code (GSAP Animations)

### When to Use

- ✅ GSAP animations (ScrollTrigger, timelines)
- ✅ Complex interactions
- ✅ Dynamic form validation
- ❌ Simple hover states (use Webflow IX2)

### Deploy Animation Embed
```bash
# In Claude Code
> /deploy-embed heroTimeline.js

# Claude will:
# 1. Convert React GSAP to vanilla JS
# 2. Create webflow-embeds/animations/hero-gsap.js
# 3. Push via API (or provide code to paste)
```

### Manual Embed (if API fails)

1. Copy code from `webflow-embeds/animations/hero-gsap.js`

2. In Webflow:
   - Go to **Page Settings** → **Custom Code**
   - Paste in **Before </body> tag** section

3. Add GSAP CDN to **Head**:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```

4. Save and test

---

## CMS Content Population

### Create Collection Items

**Option A: Via Claude Code**
```bash
> /sync-cms-schema mockPricingData.js

# Automatically creates items from mock data
```

**Option B: Manually in Webflow**
1. Go to CMS → Collections
2. Select collection
3. Click **Add Item**
4. Fill in fields
5. Set to **Published**

### Bind to Components

1. Select element in Designer
2. Click **Get text from...** or **Get image from...**
3. Select CMS field
4. Repeat for all dynamic content

**Pro tip:** Use collection list to show multiple items (e.g., blog posts, pricing tiers).

---

## Testing in Webflow

### Staging Testing

1. **Preview Mode**: Test without publishing
   - Click **Preview** button in Designer
   - Test all interactions
   - Check all breakpoints

2. **Staging Domain**: Publish to Webflow subdomain
   - Go to **Publish** → **Publish to Webflow.io**
   - Share staging URL with client
   - Gather feedback

### QA Checklist

- [ ] All components match prototype
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] CMS data binds correctly
- [ ] Custom code has no console errors
- [ ] Animations work smoothly
- [ ] Forms submit correctly
- [ ] Links go to correct pages
- [ ] SEO meta tags present
- [ ] Favicon loads

---

## Publishing to Production

### Pre-Publish

1. **Set Custom Domain** (if not already done):
   - Go to **Publish** → **Publish to Custom Domain**
   - Follow DNS setup instructions

2. **SEO Settings**:
   - Page title tags
   - Meta descriptions
   - Open Graph images
   - XML sitemap enabled

3. **Performance Check**:
   - Images optimized (WebP format)
   - Custom code minified
   - No unnecessary scripts

### Publish
```
Webflow Designer → Publish button → Publish to [domain.com]
```

**Wait 1-2 minutes for CDN propagation.**

### Post-Publish Verification

- [ ] Visit live URL
- [ ] Test on real mobile device
- [ ] Check Google PageSpeed Insights
- [ ] Verify analytics tracking (if applicable)
- [ ] Test forms with real submissions

---

## Rollback Procedure

### If something breaks in production:

1. **Revert to previous version**:
   - Webflow keeps version history
   - Go to **Settings** → **Backup**
   - Restore previous version

2. **Fix and republish**:
   - Make fixes in Designer
   - Test in preview
   - Republish

**Webflow doesn't have true "rollback" - you restore a backup.**

---

## Deployment Workflows (Common Scenarios)

### New Page

1. Create in `prototype/src/pages/NewPage.jsx`
2. Test locally: `pnpm dev`
3. Generate guide: `/translate NewPage.jsx`
4. Create page in Webflow: **Pages** → **Add Page**
5. Rebuild from guide
6. Publish

### Update Component

1. Edit in `prototype/src/components/Component.jsx`
2. Test changes locally
3. Regenerate guide: `/translate Component.jsx`
4. Update in Webflow Designer
5. Publish

### Add Animation

1. Create in `prototype/src/animations/newAnimation.js`
2. Test in prototype
3. Deploy: `/deploy-embed newAnimation.js`
4. Add to Webflow custom code
5. Publish

### Fix Bug

1. Identify issue (prototype vs Webflow)
2. If prototype: Fix in React, re-translate
3. If Webflow: Fix in Designer directly
4. Test thoroughly
5. Publish

---

## Performance Optimization

### Before Publishing
```bash
# Check prototype build size
pnpm build

# Review bundle
ls -lh prototype/dist/assets/

# Large files? Optimize:
# - Compress images
# - Remove unused code
# - Split large components
```

### In Webflow

- **Images**: Use Webflow's image optimization (automatic WebP)
- **Custom Code**: Minify before embedding
- **Fonts**: Limit to 2-3 font families
- **Scripts**: Load non-critical scripts async

**Target metrics:**
- First Contentful Paint: < 1.5s
- Total Blocking Time: < 300ms
- Cumulative Layout Shift: < 0.1

---

## Monitoring & Maintenance

### Post-Launch

1. **Set up monitoring**:
   - Webflow analytics (built-in)
   - Google Analytics 4 (if required)
   - Uptime monitoring (UptimeRobot, Pingdom)

2. **Schedule reviews**:
   - Weekly: Check forms, links
   - Monthly: Performance audit
   - Quarterly: Content updates

### Updating from Template

If SALT STUDIO releases skill updates:
```bash
./scripts/sync-template-updates.sh

# Review changes
git diff .claude/

# Commit if beneficial
git commit -m "Update Claude skills from template"
```

---

## Troubleshooting Deployments

### Issue: API deployment fails

**Check:**
```bash
pnpm validate-webflow
```

**Common causes:**
- Expired API token
- Insufficient permissions
- Rate limit exceeded (wait 1 hour)

### Issue: Custom code doesn't work in Webflow

**Check:**
1. Browser console for errors (F12)
2. GSAP CDN loaded before your code
3. Selectors match Webflow classes exactly
4. Code wrapped in IIFE: `(function() { ... })()`
5. `document.readyState` check present

### Issue: CMS binding shows wrong data

**Check:**
1. Collection list wrapper present
2. Correct field selected in binding
3. Item published (not draft)
4. Collection template page configured

### Issue: Animations laggy

**Check:**
1. Using `transform` and `opacity` only
2. Not animating `width`, `height`, `top`, `left`
3. GPU acceleration: `will-change: transform`
4. Reduce complexity on mobile

---

## Deployment Command Reference
```bash
# Development
pnpm dev                    # Start prototype server
pnpm build                  # Build prototype
pnpm preview                # Preview production build

# Quality
pnpm lint                   # Check code quality
pnpm format                 # Format code
pnpm validate-webflow       # Test Webflow API

# Claude Code
/translate [Component.jsx]  # Generate rebuild guide
/push-to-webflow [Component.jsx]  # API deploy
/sync-cms-schema [mockData.js]    # Create CMS
/deploy-embed [animation.js]      # Deploy custom code
```

---

## Client Handoff

### When handing off to client:

1. **Documentation package**:
   - Brand guidelines
   - Component guide
   - CMS content guide
   - Contact info for support

2. **Webflow access**:
   - Transfer site ownership (if applicable)
   - OR grant client "Editor" access
   - Train on CMS content updates

3. **Repository** (optional):
   - Transfer GitHub repo to client
   - OR archive internally
   - Include README with setup instructions

---

**Questions?** See `docs/TROUBLESHOOTING.md` or contact SALT STUDIO.