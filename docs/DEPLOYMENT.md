# Deployment Guide

**For**: SALT STUDIO Next.js Projects
**Stack**: Next.js + TypeScript + Vercel
**Updated**: 2026-01-21

---

## Deployment Overview

```
Development     → Build      → Preview       → Production
(localhost:3000)  (next build)  (Vercel PR)    (main branch)
```

**Deployment method**: Vercel (Git-based automatic deployments)

---

## Pre-Deployment Checklist

### 1. Code Quality Check

```bash
# Run all checks
pnpm validate

# Or individually:
pnpm lint         # ESLint check
pnpm typecheck    # TypeScript check
pnpm build        # Production build
```

**Expected:** No errors, all checks pass.

### 2. Environment Variables

Verify all required environment variables are set:

```bash
# Check .env.local exists
cat .env.local

# Required variables:
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Optional (if using):**
- Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Browser Testing

Test in development:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile (Chrome DevTools device mode)

### 4. Performance Check

```bash
# Build and analyze
pnpm build

# Check .next/analyze/ if bundle analyzer is enabled
```

**Target metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### 5. Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus states visible
- [ ] Alt text on all images

---

## Vercel Setup (One-Time)

### 1. Connect Repository

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Link project
vercel link
```

Or connect via Vercel Dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git repository
3. Select framework: Next.js
4. Deploy

### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com

# Optional
NEXT_PUBLIC_SANITY_PROJECT_ID = your_id
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = your_token

NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_key
SUPABASE_SERVICE_ROLE_KEY = your_service_key
```

### 3. Configure Build Settings

**Framework Preset**: Next.js
**Build Command**: `pnpm build`
**Output Directory**: (auto-detected)
**Install Command**: `pnpm install`

---

## Deployment Workflows

### Preview Deployments (Pull Requests)

Every pull request automatically creates a preview deployment:

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes
# ...

# Commit and push
git add .
git commit -m "Add new component"
git push -u origin feature/new-component

# Create PR
gh pr create --title "Add new component"

# Vercel automatically deploys preview
# URL format: https://project-git-branch-team.vercel.app
```

**Preview URL shared in PR comments automatically.**

### Production Deployment (Main Branch)

```bash
# Merge PR to main (triggers production deploy)
gh pr merge

# Or push directly to main (not recommended)
git checkout main
git merge feature/new-component
git push origin main
```

**Production deploys to your custom domain.**

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Using /deploy Command

The `/deploy` command automates the deployment workflow:

```
You: /deploy

Claude:
Running pre-flight checks...
✅ TypeScript: No errors
✅ ESLint: Passed
✅ Build: Successful
✅ Environment: Variables configured

Deploying to Vercel...

✅ Deployed!
🔗 Preview: https://project-abc123.vercel.app
🔗 Production: https://your-domain.com
```

---

## Domain Configuration

### Add Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add domain: `your-domain.com`
3. Configure DNS:

**Option A: Vercel DNS (Recommended)**
- Add Vercel nameservers to your registrar

**Option B: External DNS**
- Add A record: `76.76.21.21`
- Add CNAME record: `cname.vercel-dns.com`

### SSL Certificate

Vercel automatically provisions SSL certificates. No configuration needed.

---

## Environment Configuration

### Per-Environment Variables

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_SITE_URL` | localhost:3000 | Preview URL | Production URL |
| `NODE_ENV` | development | production | production |

### Sensitive Variables

Never commit sensitive variables. Set in Vercel Dashboard only:

- `SANITY_API_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`
- API keys, secrets

---

## Deployment Best Practices

### Do's

- [ ] Run `pnpm validate` before every deploy
- [ ] Use preview deployments for all changes
- [ ] Test preview URLs on real devices
- [ ] Keep environment variables in Vercel (not Git)
- [ ] Use semantic commit messages
- [ ] Document breaking changes

### Don'ts

- [ ] Push directly to main without testing
- [ ] Skip TypeScript/lint checks
- [ ] Deploy on Friday afternoons
- [ ] Commit .env files with secrets
- [ ] Ignore build warnings

---

## Monitoring & Analytics

### Vercel Analytics

Enable in `next.config.ts`:

```typescript
const nextConfig = {
  // Vercel Analytics
  analyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
}
```

### Speed Insights

```bash
# Install
pnpm add @vercel/speed-insights

# Add to root layout
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Error Tracking

Consider adding Sentry for error tracking:

```bash
pnpm add @sentry/nextjs
```

---

## Rollback Procedure

### Via Vercel Dashboard

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Via Git

```bash
# Revert commit
git revert HEAD

# Push
git push origin main

# Creates new deployment with previous state
```

---

## Troubleshooting

### Build Fails

```bash
# Check build locally first
pnpm build

# Common issues:
# - TypeScript errors
# - Missing environment variables
# - Import path issues

# Clear cache and retry
rm -rf .next
pnpm build
```

### Environment Variables Not Working

1. Check variable names start with `NEXT_PUBLIC_` for client-side
2. Verify variables are set in Vercel Dashboard
3. Redeploy after changing variables

### Deployment Stuck

1. Check Vercel Dashboard for build logs
2. Cancel deployment if needed
3. Check for infinite loops in build process

### Domain Not Working

1. Verify DNS propagation: `dig your-domain.com`
2. Check SSL certificate status in Vercel
3. Wait up to 48 hours for DNS propagation

---

## Deployment Checklist Template

```markdown
## Pre-Deploy
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] Tested locally in Chrome, Firefox, Safari
- [ ] Tested on mobile viewport
- [ ] Environment variables verified

## Post-Deploy
- [ ] Preview URL works
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] No console errors
- [ ] Performance acceptable

## Production
- [ ] Final client approval received
- [ ] Production domain configured
- [ ] SSL certificate active
- [ ] Monitoring enabled
```

---

## Command Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server

# Quality
pnpm lint             # ESLint
pnpm typecheck        # TypeScript
pnpm validate         # All checks + build

# Deployment
vercel                # Deploy to preview
vercel --prod         # Deploy to production
vercel env pull       # Pull env vars

# Claude Code
/deploy               # Automated deployment flow
/ship                 # Build + commit + deploy
```

---

**Questions?** See `docs/TROUBLESHOOTING.md` or contact SALT STUDIO.
