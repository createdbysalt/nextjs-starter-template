#!/bin/bash
# Setup new client project from template (pnpm)

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  SALT STUDIO - Webflow Client Project Setup                 ║"
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

echo "🌐 Webflow Configuration"
echo "──────────────────────────────────────────────────────────────"
read -p "Webflow Site ID: " WEBFLOW_SITE_ID
read -p "Live URL (optional, press Enter to skip): " LIVE_URL
echo ""

# Generate dates
START_DATE=$(date +%Y-%m-%d)
LAST_UPDATED=$(date +%Y-%m-%d)

# Default values if empty
LIVE_URL=${LIVE_URL:-"TBD"}
STAGING_URL="TBD"

# Brand placeholders (will be filled in later)
PRIMARY_COLOR="{{PRIMARY_COLOR}}"
SECONDARY_COLOR="{{SECONDARY_COLOR}}"
ACCENT_COLOR="{{ACCENT_COLOR}}"
HEADING_FONT="{{HEADING_FONT}}"
BODY_FONT="{{BODY_FONT}}"

echo "🔧 Customizing project files..."
echo "──────────────────────────────────────────────────────────────"

# Customize CLAUDE.md
echo "  → CLAUDE.md"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" CLAUDE.template.md | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" | \
sed "s/{{INDUSTRY}}/$INDUSTRY/g" | \
sed "s/{{WEBFLOW_SITE_ID}}/$WEBFLOW_SITE_ID/g" | \
sed "s|{{LIVE_URL}}|$LIVE_URL|g" | \
sed "s/{{START_DATE}}/$START_DATE/g" | \
sed "s/{{LAST_UPDATED}}/$LAST_UPDATED/g" | \
sed "s/{{PRIMARY_COLOR}}/$PRIMARY_COLOR/g" | \
sed "s/{{SECONDARY_COLOR}}/$SECONDARY_COLOR/g" | \
sed "s/{{ACCENT_COLOR}}/$ACCENT_COLOR/g" | \
sed "s/{{HEADING_FONT}}/$HEADING_FONT/g" | \
sed "s/{{BODY_FONT}}/$BODY_FONT/g" | \
sed "s/{{PROJECT_STATUS}}/In Development/g" > CLAUDE.md

# Customize root package.json
echo "  → package.json"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" package.template.json | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" | \
sed "s/{{INDUSTRY}}/$INDUSTRY/g" > package.json

# Customize prototype package.json
echo "  → prototype/package.json"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" prototype/package.template.json | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" > prototype/package.json

# Customize README.md
echo "  → README.md"
sed "s/{{CLIENT_NAME}}/$CLIENT_NAME/g" README.template.md | \
sed "s/{{PROJECT_CODENAME}}/$PROJECT_CODENAME/g" | \
sed "s/{{INDUSTRY}}/$INDUSTRY/g" | \
sed "s/{{WEBFLOW_SITE_ID}}/$WEBFLOW_SITE_ID/g" | \
sed "s|{{LIVE_URL}}|$LIVE_URL|g" | \
sed "s|{{STAGING_URL}}|$STAGING_URL|g" | \
sed "s/{{START_DATE}}/$START_DATE/g" | \
sed "s/{{LAST_UPDATED}}/$LAST_UPDATED/g" | \
sed "s/{{PRIMARY_COLOR}}/$PRIMARY_COLOR/g" | \
sed "s/{{SECONDARY_COLOR}}/$SECONDARY_COLOR/g" | \
sed "s/{{ACCENT_COLOR}}/$ACCENT_COLOR/g" | \
sed "s/{{HEADING_FONT}}/$HEADING_FONT/g" | \
sed "s/{{BODY_FONT}}/$BODY_FONT/g" | \
sed "s/{{PROJECT_STATUS}}/In Development/g" > README.md

# Create .env
echo "  → .env"
cat > .env << EOF
# Webflow API Configuration
# Get your token from: Webflow Project Settings → Integrations → API Access
WEBFLOW_API_TOKEN=your_webflow_api_token_here
WEBFLOW_SITE_ID=$WEBFLOW_SITE_ID

# Project Information
CLIENT_NAME=$CLIENT_NAME
PROJECT_CODENAME=$PROJECT_CODENAME
INDUSTRY=$INDUSTRY

# Development
NODE_ENV=development
VITE_APP_NAME=$CLIENT_NAME

# Created: $START_DATE
EOF

# Create .mcp.json
echo "  → .mcp.json"
sed "s/{{WEBFLOW_SITE_ID}}/$WEBFLOW_SITE_ID/g" .mcp.template.json > .mcp.json

# Create brand guidelines
echo "  → design-system/brand-guidelines.md"
mkdir -p design-system
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
[Define primary target audience]

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
- Text: #[HEX]
- Border: #[HEX]

**Semantic Colors:**
- Success: #[HEX]
- Warning: #[HEX]
- Error: #[HEX]
- Info: #[HEX]

### Typography

**Headings:**
- Font Family: [Font name]
- Weights: [e.g., 700 Bold, 600 Semibold]
- Line Height: [e.g., 1.2]

**Body Text:**
- Font Family: [Font name]
- Weights: [e.g., 400 Regular, 500 Medium]
- Line Height: [e.g., 1.6]

**Font Sizes:**
- H1: [size]
- H2: [size]
- H3: [size]
- H4: [size]
- Body: [size]
- Small: [size]

### Spacing System

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Border Radius

- Small: 4px
- Medium: 8px
- Large: 16px
- Full: 9999px (pill shape)

---

## Voice & Tone

### Brand Voice
[Describe overall brand voice]

### Tone Guidelines

**Professional Contexts:**
[How to communicate in professional settings]

**Casual Contexts:**
[How to communicate in casual settings]

**Error Messages:**
[How to communicate errors]

---

## Imagery Guidelines

### Photography Style
[Describe photography style]

### Illustration Style
[Describe illustration style if applicable]

### Icon Style
[Describe icon style]

---

## Usage Examples

### Do's ✅
- [Example of correct brand usage]
- [Example of correct brand usage]

### Don'ts ❌
- [Example of incorrect brand usage]
- [Example of incorrect brand usage]

---

**For questions about brand guidelines, contact**: [Brand Manager Name/Email]
EOF

# Create style tokens
echo "  → design-system/style-tokens.md"
cat > design-system/style-tokens.md << EOF
# $CLIENT_NAME Style Tokens

Design tokens for $CLIENT_NAME website. These values should be referenced in both React prototypes and Webflow builds.

**Last Updated**: $LAST_UPDATED

---

## Colors

### Brand Colors
\`\`\`css
/* Primary */
--color-primary: #[HEX];
--color-primary-hover: #[HEX];
--color-primary-active: #[HEX];

/* Secondary */
--color-secondary: #[HEX];
--color-secondary-hover: #[HEX];

/* Accent */
--color-accent: #[HEX];
\`\`\`

### Neutral Colors
\`\`\`css
--color-white: #FFFFFF;
--color-gray-50: #[HEX];
--color-gray-100: #[HEX];
--color-gray-200: #[HEX];
--color-gray-300: #[HEX];
--color-gray-400: #[HEX];
--color-gray-500: #[HEX];
--color-gray-600: #[HEX];
--color-gray-700: #[HEX];
--color-gray-800: #[HEX];
--color-gray-900: #[HEX];
--color-black: #000000;
\`\`\`

### Semantic Colors
\`\`\`css
--color-success: #[HEX];
--color-warning: #[HEX];
--color-error: #[HEX];
--color-info: #[HEX];
\`\`\`

---

## Typography

\`\`\`css
/* Font Families */
--font-heading: '[Font name]', sans-serif;
--font-body: '[Font name]', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
\`\`\`

---

## Spacing

\`\`\`css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
\`\`\`

---

## Border Radius

\`\`\`css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill shape */
\`\`\`

---

## Shadows

\`\`\`css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
\`\`\`

---

## Z-Index Scale

\`\`\`css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal: 1040;
--z-popover: 1050;
--z-tooltip: 1060;
\`\`\`

---

## Transitions

\`\`\`css
--transition-fast: 150ms ease-in-out;
--transition-base: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
\`\`\`

---

## Usage in React (Tailwind)

Map these tokens to Tailwind config:

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#[HEX]',
        secondary: '#[HEX]',
        // ... etc
      }
    }
  }
}
\`\`\`

## Usage in Webflow

Apply these as:
1. Webflow Style Guide colors
2. Global class styles
3. CSS embed variables
EOF

# Install dependencies
echo ""
echo "📦 Installing dependencies with pnpm..."
echo "──────────────────────────────────────────────────────────────"
pnpm install

echo "📦 Installing prototype dependencies..."
cd prototype
pnpm install
cd ..

# Initialize git
echo ""
echo "🌳 Initializing git repository..."
echo "──────────────────────────────────────────────────────────────"
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial setup for $CLIENT_NAME ($PROJECT_CODENAME)

- Client: $CLIENT_NAME
- Industry: $INDUSTRY
- Webflow Site: $WEBFLOW_SITE_ID
- Created: $START_DATE"
    
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Optional: Clean up template files
echo ""
echo "🧹 Cleaning up template files..."
echo "──────────────────────────────────────────────────────────────"
rm -f CLAUDE.template.md
rm -f package.template.json
rm -f prototype/package.template.json
rm -f .mcp.template.json
rm -f README.template.md

echo "✅ Template files removed"

# Success message
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Project: $CLIENT_NAME ($PROJECT_CODENAME)"
echo "🏭 Industry: $INDUSTRY"
echo "🌐 Webflow Site: $WEBFLOW_SITE_ID"
echo ""
echo "🚀 Next Steps:"
echo "──────────────────────────────────────────────────────────────"
echo "1. Add your Webflow API token to .env file"
echo "   • Get token: Webflow Project Settings → Integrations → API"
echo "   • Edit: .env (line 3)"
echo ""
echo "2. Complete brand guidelines:"
echo "   • design-system/brand-guidelines.md"
echo "   • design-system/style-tokens.md"
echo ""
echo "3. Test Webflow connection:"
echo "   pnpm validate-webflow"
echo ""
echo "4. Start prototyping:"
echo "   pnpm dev"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Project overview and commands"
echo "   • docs/WORKFLOW.md - Development workflow"
echo "   • docs/DEPLOYMENT.md - Deployment process"
echo ""
echo "💡 Claude Code Commands:"
echo "   /vibe              - Create React component"
echo "   /gsap-animation    - Add animation"
echo "   /push-to-webflow   - Deploy to Webflow"
echo ""
echo "──────────────────────────────────────────────────────────────"
echo "Happy building! 🎨"
echo ""