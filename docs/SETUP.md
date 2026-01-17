# Initial Setup Guide

**For**: SALT STUDIO Webflow Client Projects  
**Updated**: 2026-01-16

---

## Prerequisites

### Required Software

| Software | Version | Installation |
|----------|---------|--------------|
| Node.js | 20.x+ | [nodejs.org](https://nodejs.org/) |
| pnpm | 9.x+ | `npm install -g pnpm` |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| Claude Code CLI | Latest | [code.claude.com](https://code.claude.com/) |

**Verify installations:**
```bash
node --version   # Should show v20.x.x
pnpm --version   # Should show 9.x.x
git --version    # Any recent version
claude --version # Should show latest
```

---

## Step 1: Create Project from Template

### Option A: GitHub Template (Recommended)
```bash
# If template is marked as GitHub template:
gh repo create client-name-website \
  --template salt-studio/salt-studio-webflow-template \
  --private

cd client-name-website
```

### Option B: Manual Clone
```bash
git clone https://github.com/salt-studio/salt-studio-webflow-template.git client-name-website
cd client-name-website
rm -rf .git
git init
```

---

## Step 2: Run Automated Setup
```bash
./scripts/setup-new-client.sh
```

**You'll be prompted for:**
- Client name (e.g., "Acme Corporation")
- Project codename (e.g., "acme-corp") - used in package names
- Industry (e.g., "Tech", "Healthcare")
- Webflow Site ID (from Webflow project settings)
- Live URL (optional, can add later)

**What this does:**
- ✅ Creates `CLAUDE.md` with client info
- ✅ Creates `package.json` files with client names
- ✅ Creates `.env` file with placeholders
- ✅ Creates `.mcp.json` for Webflow MCP
- ✅ Creates brand guidelines templates
- ✅ Installs all dependencies with pnpm
- ✅ Initializes git repository

**Expected output:**
```
✅ Setup Complete!

📋 Project: Acme Corporation (acme-corp)
🏭 Industry: Tech
🌐 Webflow Site: 65a1b2c3d4e5
```

---

## Step 3: Configure Webflow API

### Get Webflow API Token

1. Open your Webflow project
2. Go to **Project Settings** → **Integrations** → **API Access**
3. Click **Generate API Token**
4. Select scopes:
   - ✅ `sites:read`
   - ✅ `sites:write`
   - ✅ `cms:read`
   - ✅ `cms:write`
   - ✅ `pages:read`
   - ✅ `pages:write`
5. Copy the token (you'll only see it once)

### Add Token to .env
```bash
# Edit .env file
# Replace line 3:
WEBFLOW_API_TOKEN=your_webflow_api_token_here

# With your actual token:
WEBFLOW_API_TOKEN=wf_abc123xyz...
```

### Test Connection
```bash
pnpm validate-webflow
```

**Expected output:**
```
✅ Connection successful!

📊 Site Info:
Acme Corporation Website

✅ You're ready to use Webflow MCP tools
```

**If connection fails:**
- Check token is correct in `.env`
- Verify site ID is correct
- Ensure API scopes include Designer API
- Check token hasn't expired

---

## Step 4: Configure Claude Code

### Install Claude Code CLI (if not installed)
```bash
# macOS/Linux
curl -fsSL https://install.claude.com/cli/latest | sh

# Verify
claude --version
```

### Configure MCP Servers

Claude Code will automatically detect `.mcp.json` in the project root.

**Test MCP connection:**
```bash
claude "Test Webflow MCP connection"
```

**Expected:** Claude should confirm it can access Webflow MCP tools.

---

## Step 5: Complete Brand Setup

### Add Client Brand Guidelines

Edit `design-system/brand-guidelines.md`:
```markdown
# Client Name Brand Guidelines

## Color Palette
- Primary: #3B82F6 (Bright Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)

## Typography
- Headings: Inter Bold
- Body: Inter Regular

## Voice & Tone
Professional yet approachable...
```

### Add Style Tokens

Edit `design-system/style-tokens.md`:
```css
/* Replace placeholders with actual values */
--color-primary: #3B82F6;
--color-secondary: #10B981;
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Update CLAUDE.md

Edit `CLAUDE.md` (search for `{{` placeholders):
```markdown
# Before
**Primary Brand Colors:**
- Primary: {{PRIMARY_COLOR}}

# After
**Primary Brand Colors:**
- Primary: #3B82F6 (Bright Blue)
```

---

## Step 6: Start Development
```bash
# Start prototype dev server
pnpm dev
```

**Opens:** http://localhost:5173

**What you'll see:**
- Empty React app ready for components
- Hot reload enabled
- Tailwind CSS configured
- GSAP ready to use

---

## Step 7: Verify Everything Works

### Checklist

- [ ] Prototype server starts without errors
- [ ] Claude Code recognizes `.claude/` configuration
- [ ] Webflow API connection successful
- [ ] Brand guidelines documented
- [ ] Git repository initialized

### Test Claude Code Integration
```bash
# Open Claude Code in project directory
claude

# Try a command
> /vibe

# Claude should respond with component creation workflow
```

---

## Common Setup Issues

### Issue: "pnpm: command not found"

**Solution:**
```bash
npm install -g pnpm
# OR
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Issue: "WEBFLOW_API_TOKEN not configured"

**Solution:**
1. Check `.env` file exists in project root
2. Verify token is on line 3 (not still placeholder)
3. Token should start with `wf_`
4. No quotes around token value

### Issue: Prototype fails to start

**Solution:**
```bash
# Clean install
pnpm clean
pnpm install
cd prototype && pnpm install && cd ..
pnpm dev
```

### Issue: Claude Code doesn't see skills

**Solution:**
```bash
# Verify .claude/ directory structure
ls -la .claude/

# Should show:
# agents/
# commands/
# hooks/
# skills/
# settings.json

# If missing, re-clone template
```

---

## Next Steps

Once setup is complete:

1. **Read workflow guide**: `docs/WORKFLOW.md`
2. **Create first component**: Run `/vibe` in Claude Code
3. **Test in browser**: `pnpm dev` → http://localhost:5173
4. **Review deployment process**: `docs/DEPLOYMENT.md`

---

## Directory Structure After Setup
```
client-name-website/
├── .env                        ✅ Configured with real token
├── .mcp.json                   ✅ Configured with site ID
├── CLAUDE.md                   ✅ Customized for client
├── package.json                ✅ Has client name
├── prototype/
│   ├── package.json            ✅ Has client name
│   └── src/                    ✅ Ready for components
├── design-system/
│   ├── brand-guidelines.md     ✅ Filled with client brand
│   └── style-tokens.md         ✅ Filled with real values
└── .claude/                    ✅ All skills loaded
```

---

**Need help?** See `docs/TROUBLESHOOTING.md` or contact SALT STUDIO team.