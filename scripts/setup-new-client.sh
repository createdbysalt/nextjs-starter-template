#!/bin/bash
# Setup new client project from template (Next.js + pnpm)

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  SALT STUDIO - Next.js Client Project Setup                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed"
    echo ""
    echo "Install pnpm:"
    echo "  npm install -g pnpm"
    echo "  OR"
    echo "  curl -fsSL https://get.pnpm.io/install.sh | sh -"
    echo ""
    exit 1
fi

# Check pnpm version
PNPM_VERSION=$(pnpm --version)
REQUIRED_VERSION="9.0.0"
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PNPM_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "⚠️  Warning: pnpm version $PNPM_VERSION detected. Recommended: 9.x or higher"
    read -p "Continue anyway? (y/n): " continue_setup
    if [[ ! "$continue_setup" =~ ^[Yy]$ ]]; then
        echo "Aborting setup."
        exit 1
    fi
fi

echo "✅ pnpm $PNPM_VERSION detected"
echo ""

# Collect client information
echo "📋 Client Information"
echo "──────────────────────────────────────────────────────────────"
read -p "Client name (e.g., Acme Corporation): " CLIENT_NAME
read -p "Project codename (e.g., acme-corp): " PROJECT_CODENAME
read -p "Industry (e.g., Tech, Healthcare, Finance): " INDUSTRY
echo ""

echo "🌐 URLs"
echo "──────────────────────────────────────────────────────────────"
read -p "Production URL (optional, press Enter to skip): " PRODUCTION_URL
PRODUCTION_URL=${PRODUCTION_URL:-"TBD"}
echo ""

echo "🔧 Optional Integrations"
echo "──────────────────────────────────────────────────────────────"
read -p "Use Sanity CMS? (y/n): " USE_SANITY
read -p "Use Supabase? (y/n): " USE_SUPABASE
echo ""

# Generate dates
START_DATE=$(date +%Y-%m-%d)
LAST_UPDATED=$(date +%Y-%m-%d)

# Set CMS/DB choices
CMS_CHOICE="None"
DB_CHOICE="None"
if [[ "$USE_SANITY" =~ ^[Yy]$ ]]; then
    CMS_CHOICE="Sanity"
fi
if [[ "$USE_SUPABASE" =~ ^[Yy]$ ]]; then
    DB_CHOICE="Supabase"
fi

# Brand placeholders (will be filled in later)
PRIMARY_COLOR="{{PRIMARY_COLOR}}"
SECONDARY_COLOR="{{SECONDARY_COLOR}}"
ACCENT_COLOR="{{ACCENT_COLOR}}"
PRIMARY_HSL="{{PRIMARY_HSL}}"
SECONDARY_HSL="{{SECONDARY_HSL}}"
ACCENT_HSL="{{ACCENT_HSL}}"
HEADING_FONT="{{HEADING_FONT}}"
BODY_FONT="{{BODY_FONT}}"

echo "🔧 Customizing project files..."
echo "──────────────────────────────────────────────────────────────"

# Customize CLAUDE.md
echo "  → CLAUDE.md"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" CLAUDE.template.md | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" | \
sed "s/{{INDUSTRY}}/$INDUSTRY/g" | \
sed "s|{{PRODUCTION_URL}}|$PRODUCTION_URL|g" | \
sed "s|{{PREVIEW_URL}}|TBD|g" | \
sed "s/{{START_DATE}}/$START_DATE/g" | \
sed "s/{{LAST_UPDATED}}/$LAST_UPDATED/g" | \
sed "s/{{CMS_CHOICE}}/$CMS_CHOICE/g" | \
sed "s/{{DB_CHOICE}}/$DB_CHOICE/g" | \
sed "s/{{PRIMARY_COLOR}}/$PRIMARY_COLOR/g" | \
sed "s/{{SECONDARY_COLOR}}/$SECONDARY_COLOR/g" | \
sed "s/{{ACCENT_COLOR}}/$ACCENT_COLOR/g" | \
sed "s/{{PRIMARY_HSL}}/$PRIMARY_HSL/g" | \
sed "s/{{SECONDARY_HSL}}/$SECONDARY_HSL/g" | \
sed "s/{{ACCENT_HSL}}/$ACCENT_HSL/g" | \
sed "s/{{HEADING_FONT}}/$HEADING_FONT/g" | \
sed "s/{{BODY_FONT}}/$BODY_FONT/g" | \
sed "s/{{ICP_SUMMARY}}/Run \/icp to generate ICP profiles/g" | \
sed "s/{{CURRENT_FOCUS}}/Project setup and discovery/g" | \
sed "s/{{PROJECT_STATUS}}/In Discovery/g" > CLAUDE.md

# Customize package.json
echo "  → package.json"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" package.template.json | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" > package.json

# Customize README.md
echo "  → README.md"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" README.template.md | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" | \
sed "s/{{INDUSTRY}}/$INDUSTRY/g" | \
sed "s|{{PRODUCTION_URL}}|$PRODUCTION_URL|g" | \
sed "s/{{START_DATE}}/$START_DATE/g" | \
sed "s/{{PROJECT_STATUS}}/In Discovery/g" > README.md

# Create .env.local
echo "  → .env.local"
cat > .env.local << EOF
# Site Configuration
NEXT_PUBLIC_SITE_URL=$PRODUCTION_URL

# Project Information
CLIENT_NAME=$CLIENT_NAME
PROJECT_CODENAME=$PROJECT_CODENAME
INDUSTRY=$INDUSTRY

EOF

# Add Sanity config if selected
if [[ "$USE_SANITY" =~ ^[Yy]$ ]]; then
cat >> .env.local << EOF
# Sanity CMS
# Get these from: sanity.io/manage → Project Settings
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

EOF
fi

# Add Supabase config if selected
if [[ "$USE_SUPABASE" =~ ^[Yy]$ ]]; then
cat >> .env.local << EOF
# Supabase
# Get these from: supabase.com → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

EOF
fi

cat >> .env.local << EOF
# Created: $START_DATE
EOF

# Create project directories
echo "  → project/$PROJECT_CODENAME/"
mkdir -p "project/$PROJECT_CODENAME/inputs"
mkdir -p "project/$PROJECT_CODENAME/outputs"/{1_discovery,2_audience,3_architecture,4_design,5_copy,6_review}

# Create project status file
cat > "project/$PROJECT_CODENAME/_project_status.json" << EOF
{
  "project_id": "$PROJECT_CODENAME",
  "client_name": "$CLIENT_NAME",
  "industry": "$INDUSTRY",
  "created_date": "$START_DATE",
  "last_updated": "$START_DATE",
  "status": "discovery",
  "phases": {
    "discovery": "not_started",
    "audience": "not_started",
    "architecture": "not_started",
    "design": "not_started",
    "copy": "not_started",
    "review": "not_started"
  }
}
EOF

# Create brand guidelines
echo "  → design-system/brand-guidelines.md"
mkdir -p design-system/tokens
cat > design-system/brand-guidelines.md << EOF
# $CLIENT_NAME Brand Guidelines

**Project**: $PROJECT_CODENAME
**Industry**: $INDUSTRY
**Last Updated**: $LAST_UPDATED

---

## Brand Overview

### Mission Statement
[Add client's mission statement]

### Target Audience
[Define primary target audience - run /icp for detailed profiles]

### Brand Personality
[Describe brand personality traits]

---

## Visual Identity

### Color Palette

**Primary Colors:**
- Primary: #[HEX] - [Usage description]
- Secondary: #[HEX] - [Usage description]
- Accent: #[HEX] - [Usage description]

**Neutral Colors:**
- Background: #[HEX]
- Foreground: #[HEX]
- Muted: #[HEX]

### Typography

**Headings:**
- Font Family: [Font name]
- Weights: [e.g., 700 Bold, 600 Semibold]

**Body Text:**
- Font Family: [Font name]
- Weights: [e.g., 400 Regular, 500 Medium]

### Spacing System

Using Tailwind defaults:
- Section padding: py-24 lg:py-32
- Container: container px-4 md:px-6
- Component gaps: gap-4, gap-6, gap-8

---

## Voice & Tone

### Brand Voice
[Describe overall brand voice - run /discover to extract from client materials]

### Tone Guidelines

**Professional Contexts:**
[How to communicate in professional settings]

**Casual Contexts:**
[How to communicate in casual settings]

---

**For questions about brand guidelines, contact**: [Brand Manager Name/Email]
EOF

# Create TypeScript tokens
echo "  → design-system/tokens/colors.ts"
cat > design-system/tokens/colors.ts << EOF
// $CLIENT_NAME Color Tokens
// Generated: $LAST_UPDATED
// Update these values after completing /brief

export const colors = {
  // Brand Colors (update with actual values)
  primary: {
    DEFAULT: '#1a365d',
    foreground: '#ffffff',
  },
  secondary: {
    DEFAULT: '#2b77ad',
    foreground: '#ffffff',
  },
  accent: {
    DEFAULT: '#ed8936',
    foreground: '#ffffff',
  },

  // Semantic Colors
  destructive: {
    DEFAULT: '#ef4444',
    foreground: '#ffffff',
  },
  success: {
    DEFAULT: '#22c55e',
    foreground: '#ffffff',
  },

  // Neutral Colors
  background: '#ffffff',
  foreground: '#0a0a0a',
  muted: {
    DEFAULT: '#f5f5f5',
    foreground: '#737373',
  },
  border: '#e5e5e5',
}

// HSL values for CSS variables (shadcn/ui compatible)
export const hslColors = {
  primary: '217 54% 23%',
  secondary: '207 60% 42%',
  accent: '28 85% 57%',
  // Add more as needed
}
EOF

echo "  → design-system/tokens/typography.ts"
cat > design-system/tokens/typography.ts << EOF
// $CLIENT_NAME Typography Tokens
// Generated: $LAST_UPDATED

export const typography = {
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}
EOF

# Install dependencies
echo ""
echo "📦 Installing dependencies with pnpm..."
echo "──────────────────────────────────────────────────────────────"
pnpm install

# Initialize shadcn/ui
echo ""
echo "🎨 Initializing shadcn/ui..."
echo "──────────────────────────────────────────────────────────────"
pnpm dlx shadcn@latest init -y || true

# Add common shadcn components
echo ""
echo "📦 Adding common shadcn/ui components..."
pnpm dlx shadcn@latest add button card input textarea || true

# Initialize git if not already
echo ""
echo "🌳 Checking git repository..."
echo "──────────────────────────────────────────────────────────────"
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial setup for $CLIENT_NAME ($PROJECT_CODENAME)

- Client: $CLIENT_NAME
- Industry: $INDUSTRY
- Tech Stack: Next.js 15 + TypeScript + Tailwind + shadcn/ui
- Created: $START_DATE"

    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
    git add .
    git commit -m "Configure project for $CLIENT_NAME

- Updated CLAUDE.md with client info
- Created output directories
- Set up design tokens" || true
fi

# Clean up template files
echo ""
echo "🧹 Cleaning up template files..."
echo "──────────────────────────────────────────────────────────────"
rm -f CLAUDE.template.md
rm -f package.template.json
rm -f README.template.md
rm -f .mcp.template.json
rm -f .env.template

echo "✅ Template files removed"

# Success message
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Project: $CLIENT_NAME ($PROJECT_CODENAME)"
echo "🏭 Industry: $INDUSTRY"
echo "🛠️  Stack: Next.js 15 + TypeScript + Tailwind + shadcn/ui"
if [[ "$USE_SANITY" =~ ^[Yy]$ ]]; then
    echo "📝 CMS: Sanity (configure in .env.local)"
fi
if [[ "$USE_SUPABASE" =~ ^[Yy]$ ]]; then
    echo "🗄️  Database: Supabase (configure in .env.local)"
fi
echo ""
echo "🚀 Next Steps:"
echo "──────────────────────────────────────────────────────────────"
echo "1. Configure environment variables in .env.local"
echo ""
echo "2. Start discovery workflow:"
echo "   /discover - Extract client DNA from intake materials"
echo "   /icp      - Develop ideal customer profiles"
echo ""
echo "3. Start the dev server:"
echo "   pnpm dev"
echo ""
echo "📚 Documentation:"
echo "   • CLAUDE.md - Project context for Claude Code"
echo "   • docs/WORKFLOW.md - Development workflow"
echo "   • docs/DEPLOYMENT.md - Vercel deployment"
echo ""
echo "💡 Key Commands:"
echo "   /discover   - Client discovery"
echo "   /icp        - ICP development"
echo "   /strategy   - Site architecture"
echo "   /brief      - Design direction"
echo "   /vibe       - Rapid prototyping"
echo "   /page       - Create pages"
echo "   /deploy     - Deploy to Vercel"
echo ""
echo "──────────────────────────────────────────────────────────────"
echo "Happy building! 🚀"
echo ""
