# Troubleshooting Guide

**For**: SALT STUDIO Webflow Projects  
**Updated**: 2026-01-16

---

## Quick Diagnostics

Run these commands first:
```bash
# Check versions
node --version    # Need 20.x+
pnpm --version    # Need 9.x+
claude --version  # Should be latest

# Check setup
pnpm validate-webflow  # Tests Webflow API
ls -la .claude/        # Verifies Claude Code config
cat .env | grep TOKEN  # Check token (don't share output!)
```

---

## Installation & Setup Issues

### "pnpm: command not found"

**Cause:** pnpm not installed globally

**Solution:**
```bash
# Install via npm
npm install -g pnpm

# OR via standalone installer (recommended)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Verify
pnpm --version
```

**If still not found after install:**
```bash
# Add to PATH (in ~/.zshrc or ~/.bashrc)
export PATH="$HOME/.local/share/pnpm:$PATH"

# Reload shell
source ~/.zshrc  # or source ~/.bashrc
```

---

### "Error: Cannot find module 'react'"

**Cause:** Dependencies not installed

**Solution:**
```bash
# Clean install
rm -rf node_modules prototype/node_modules
rm pnpm-lock.yaml

# Reinstall
pnpm install
cd prototype && pnpm install && cd ..

# Try again
pnpm dev
```

---

### "setup-new-client.sh: Permission denied"

**Cause:** Script not executable

**Solution:**
```bash
chmod +x scripts/*.sh

# Now run
./scripts/setup-new-client.sh
```

---

## Webflow API Issues

### "WEBFLOW_API_TOKEN not configured"

**Cause:** `.env` file missing or token not set

**Solution:**
```bash
# Check .env exists
ls -la .env

# If missing, create from template
cp .env.template .env

# Edit and add your token (line 3)
nano .env  # or use your editor

# Token should look like:
WEBFLOW_API_TOKEN=wf_abc123def456ghi789jkl012mno345
```

**Get token:**
1. Webflow Project → Settings → Integrations → API Access
2. Generate token with "Designer API" scope
3. Copy and paste (you'll only see it once!)

---

### "Connection failed (HTTP 401)"

**Cause:** Invalid or expired token

**Solution:**
```bash
# Test current token
pnpm validate-webflow

# If fails, generate new token:
# 1. Go to Webflow → Project Settings → API
# 2. Revoke old token
# 3. Generate new token
# 4. Update .env with new token
# 5. Test again
```

---

### "Connection failed (HTTP 404)"

**Cause:** Incorrect site ID

**Solution:**
```bash
# Find your site ID in Webflow:
# 1. Go to Project Settings
# 2. Look at URL: /design/[SITE_ID]/
# 3. Copy the SITE_ID

# Update .env (line 4)
WEBFLOW_SITE_ID=your_correct_site_id_here

# Test
pnpm validate-webflow
```

---

### "Rate limit exceeded"

**Cause:** Too many API calls in short time

**Solution:**
- Wait 1 hour
- Reduce parallel API calls
- Use manual deployment for complex operations

**Webflow limits:**
- 60 requests per minute
- 10 concurrent requests

---

## Prototype Development Issues

### Port 5173 already in use

**Cause:** Another Vite instance running

**Solution:**
```bash
# Find and kill process
lsof -i :5173
kill -9 [PID]

# OR use different port
cd prototype
pnpm dev --port 3000
```

---

### "Failed to resolve import"

**Cause:** Path alias not configured or wrong path

**Solution:**
```bash
# Check vite.config.js has resolve.alias

# If importing from src:
import { Hero } from './components/Hero'  # ✅
import { Hero } from 'components/Hero'     # ❌ (needs alias)

# If using alias, add to vite.config.js:
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

### Tailwind classes not working

**Cause:** Tailwind not configured or content paths wrong

**Solution:**
```bash
# Check tailwind.config.js exists
ls -la prototype/tailwind.config.js

# Content should include all files:
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // ...
}

# Restart dev server
pnpm dev
```

---

### GSAP animations don't play

**Cause:** GSAP not imported or DOM not ready

**Solution:**
```javascript
// ❌ Wrong
function Component() {
  gsap.to('.element', { x: 100 })
  return <div className="element">Text</div>
}

// ✅ Correct
import { useGSAP } from '@gsap/react'

function Component() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    gsap.to('.element', { x: 100 })
  }, { scope: containerRef })
  
  return (
    <div ref={containerRef}>
      <div className="element">Text</div>
    </div>
  )
}
```

---

## Claude Code Issues

### Claude doesn't see `.claude/` skills

**Cause:** Skills not loaded or malformed

**Solution:**
```bash
# Check structure
ls -la .claude/skills/

# Should show folders with SKILL.md files
# Example: .claude/skills/webflow-adapters/SKILL.md

# If empty, sync from template
./scripts/sync-template-updates.sh

# Test in Claude Code
claude "What skills do you have?"
```

---

### `/vibe` command not found

**Cause:** Command file missing or not loaded

**Solution:**
```bash
# Check commands exist
ls -la .claude/commands/

# Should include vibe.md

# If missing:
./scripts/sync-template-updates.sh

# Restart Claude Code session
# Exit and re-enter: claude
```

---

### MCP tools not working

**Cause:** `.mcp.json` misconfigured or servers not installed

**Solution:**
```bash
# Verify .mcp.json exists
cat .mcp.json

# Test with debug flag
claude --mcp-debug

# Check for errors in output

# If Webflow MCP missing:
# It will auto-install via npx, but check:
npx @webflow/mcp-server-webflow --version
```

---

## Webflow Designer Issues

### Custom code not executing

**Cause:** Script errors, wrong placement, or selector mismatch

**Solution:**

1. **Check browser console** (F12 → Console tab)
   - Look for JavaScript errors
   - Fix errors in code

2. **Verify GSAP CDN loaded**:
```html
<!-- In Webflow: Page Settings → Head -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
```

3. **Check selectors match Webflow classes**:
```javascript
// ❌ Wrong (React class name)
gsap.to('.hero__title', ...)

// ✅ Correct (Webflow class name)
gsap.to('.hero-title', ...)  // Check actual class in Designer
```

4. **Verify code placement**:
   - Animation code: **Before </body>** tag
   - Tracking code: **Head** section
   - NEVER in "Before </head>" (rare cases only)

---

### CMS items not showing

**Cause:** Collection list not configured or filters applied

**Solution:**

1. **Check collection list wrapper**:
   - Element must be a **Collection List**
   - Correct collection selected
   - At least 1 published item exists

2. **Check filters**:
   - Settings → Filters
   - Remove unnecessary filters
   - Verify filter logic correct

3. **Check item status**:
   - Go to CMS → Collection
   - Ensure items are **Published** (not Drafted or Archived)

---

### Responsive design broken

**Cause:** Breakpoint inheritance not set correctly

**Solution:**

1. **Check inheritance**:
   - Desktop styles inherit to all breakpoints
   - Only override what's needed per breakpoint

2. **Common fixes**:
   - Set Flex direction on each breakpoint
   - Adjust padding/margins per breakpoint
   - Hide/show elements with Display property

3. **Test strategy**:
   - Start with Desktop (992px+)
   - Then Tablet (768-991px)
   - Then Mobile Landscape (480-767px)
   - Finally Mobile Portrait (<480px)

---

## Performance Issues

### Slow page load

**Diagnose:**
```bash
# Check prototype build size
pnpm build
ls -lh prototype/dist/assets/

# Test with Chrome DevTools:
# 1. Open site in Chrome
# 2. F12 → Network tab
# 3. Refresh page
# 4. Look for large files (red flags: >1MB)
```

**Common culprits:**
- Unoptimized images (compress to WebP)
- Too many fonts (limit to 2-3)
- Large JavaScript bundles (remove unused code)
- Blocking scripts (use `async` or `defer`)

**Fix in Webflow:**
1. Compress images before upload
2. Use Webflow's responsive images
3. Minify custom code
4. Load non-critical scripts async

---

### Janky animations

**Cause:** Animating expensive properties

**Solution:**
```javascript
// ❌ Bad (causes reflow/repaint)
gsap.to('.element', {
  width: '500px',
  height: '300px',
  top: '100px',
  left: '50px',
})

// ✅ Good (GPU accelerated)
gsap.to('.element', {
  scaleX: 2,
  scaleY: 1.5,
  x: 100,
  y: 50,
  opacity: 0.5,
})
```

**Only animate:**
- `transform` (translate, scale, rotate)
- `opacity`

**Never animate:**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

---

## Git Issues

### "fatal: not a git repository"

**Cause:** Git not initialized

**Solution:**
```bash
git init
git add .
git commit -m "Initial commit"
```

---

### Merge conflicts in pnpm-lock.yaml

**Cause:** Different dependencies installed

**Solution:**
```bash
# Accept their version
git checkout --theirs pnpm-lock.yaml

# Regenerate lock file
rm pnpm-lock.yaml
pnpm install

# Commit
git add pnpm-lock.yaml
git commit -m "Regenerate pnpm lock file"
```

---

## Common Error Messages

### "ERR_PNPM_OUTDATED_LOCKFILE"

**Solution:**
```bash
pnpm install --force
```

---

### "EACCES: permission denied"

**Solution:**
```bash
# Fix permissions
sudo chown -R $(whoami) ~/.pnpm-store

# OR reinstall pnpm
npm uninstall -g pnpm
npm install -g pnpm
```

---

### "Module not found: Can't resolve 'gsap'"

**Solution:**
```bash
cd prototype
pnpm add gsap @gsap/react
cd ..
pnpm dev
```

---

## Getting Help

### Check These First

1. **Documentation**:
   - `docs/SETUP.md` - Setup instructions
   - `docs/WORKFLOW.md` - Development workflow
   - `docs/DEPLOYMENT.md` - Deployment process

2. **Logs**:
```bash
# Check recent errors
pnpm dev 2>&1 | tee dev.log

# Check Webflow API response
curl -H "Authorization: Bearer $WEBFLOW_API_TOKEN" \
     "https://api.webflow.com/sites/$WEBFLOW_SITE_ID"
```

3. **Common resources**:
   - [Webflow University](https://university.webflow.com/)
   - [GSAP Docs](https://gsap.com/docs/v3/)
   - [pnpm Docs](https://pnpm.io/)
   - [Claude Code Docs](https://code.claude.com/docs/)

### Contact SALT STUDIO

**Email**: hello@createdbysalt.com  
**GitHub**: @createdbysalt

When contacting, please include:
- Error message (full text)
- Steps to reproduce
- Screenshots (if relevant)
- Output of version checks:
```bash
  node --version
  pnpm --version
  claude --version
```

---

**Pro tip:** 90% of issues are solved by:
```bash
pnpm clean && pnpm install && pnpm dev
```

When in doubt, clean install! 🧹