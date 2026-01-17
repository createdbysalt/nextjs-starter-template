# {{CLIENT_NAME}} Website Project

## Project Overview

- **Client**: {{CLIENT_NAME}}
- **Project Codename**: {{PROJECT_CODENAME}}
- **Industry**: {{INDUSTRY}}
- **Webflow Site ID**: {{WEBFLOW_SITE_ID}}
- **Live URL**: {{LIVE_URL}}
- **Project Start**: {{START_DATE}}

## Tech Stack

- **Prototype**: React 18 + Vite + Tailwind CSS
- **Animations**: GSAP 3.12
- **Deployment**: Webflow Designer + Custom Code Embeds
- **Package Manager**: pnpm 9.x
- **Node Version**: 20.x

## ⚡ Operational Commands

**Prototype Development:**
- `pnpm dev` - Start dev server (http://localhost:5173)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Check code quality
- `pnpm format` - Format code with Prettier

**Webflow Workflow:**
- `/vibe` - Create React component prototype
- `/gsap-animation` - Add GSAP animation
- `/push-to-webflow` - Deploy component to Webflow Designer
- `/sync-cms-schema` - Create CMS collections from mock data
- `/deploy-embed` - Push custom JavaScript to Webflow

**Utilities:**
- `pnpm validate-webflow` - Test Webflow API connection
- `pnpm clean` - Remove node_modules
- `pnpm clean:cache` - Clear pnpm cache

## 🎯 Role & Behavior

You are a Webflow specialist working on {{CLIENT_NAME}}'s website. Your code runs in the browser, NOT Node.js.

**Critical Rules:**
1. **No jQuery**: Use vanilla JavaScript only
2. **No Build Step for Webflow**: Code must work as-is when pasted into Webflow
3. **Data Attributes**: Always use `[data-*]` selectors, never Webflow auto-generated classes
4. **CMS-First**: Solve with CMS structure before resorting to custom code
5. **Performance**: Keep embeds under 5KB; lazy-load heavy scripts
6. **Browser Support**: Last 2 versions of Chrome, Firefox, Safari, Edge

## 🚀 Velocity Shortcuts

Use these triggers for common workflows:

- **qplan**: Analyze request and codebase, draft step-by-step plan. DO NOT write code yet.
- **qcode**: Implement the approved plan following TDD pattern.
- **qcheck**: Review changes for security, type safety, performance, and brand alignment.
- **qfix**: Read error message, analyze stack trace, propose fix.

## 🎨 Brand Guidelines

**Primary Brand Colors:**
- Primary: {{PRIMARY_COLOR}}
- Secondary: {{SECONDARY_COLOR}}
- Accent: {{ACCENT_COLOR}}

**Typography:**
- Headings: {{HEADING_FONT}}
- Body: {{BODY_FONT}}

**Detailed Guidelines**: See `design-system/brand-guidelines.md`

## 📚 Critical Documentation Index

*(Do not hallucinate features. Read these files for ground truth)*

- **Brand Guidelines**: `./design-system/brand-guidelines.md`
- **Style Tokens**: `./design-system/style-tokens.md`
- **Component Library**: `./design-system/components.md`
- **Workflow Guide**: `./docs/WORKFLOW.md`

## 🛡️ Non-Negotiable Standards

**React Components:**
- Functional components only (no class components)
- Props must map 1:1 to future CMS fields
- Keep nesting under 4 levels for Webflow translation
- Use BEM naming: `.component__element--modifier`

**Styling:**
- Use Tailwind utility classes for prototyping
- Classes must be Webflow-compatible (no arbitrary values in production embeds)
- All colors/spacing must reference design tokens

**Animations:**
- All animations must be 60fps on mobile
- Use `transform` and `opacity` only (GPU-accelerated)
- GSAP animations over 10 lines should be in separate files (`/animations/`)
- Document whether animation will be Webflow IX2 or custom embed

**Custom Code:**
- All JavaScript must pass ESLint
- All embeds must be wrapped in IIFE
- Check `document.readyState` before executing
- Add error handling for missing DOM elements
- Never use `console.log` in production embeds

**CMS Structure:**
- Collection names: Singular PascalCase (e.g., `BlogPost`, `Feature`)
- Field names: camelCase (e.g., `heroImage`, `ctaText`)
- Reference fields: Suffix with `Ref` (e.g., `authorRef`)
- Boolean fields for conditional rendering (e.g., `isFeatured`)

## 🔄 Prototype to Webflow Workflow

1. **Prototype** (`/vibe`) → Create component in React
2. **Refine** → Test in browser, get stakeholder approval
3. **Animate** (`/gsap-animation`) → Add GSAP animations
4. **Translate** (`/translate`) → Generate Webflow rebuild guide
5. **Push** (`/push-to-webflow`) → Deploy via Webflow API (if applicable)
6. **Deploy** (`/deploy-embed`) → Push custom code embeds
7. **QA** → Test in Webflow Designer, publish to staging

## 🚨 Common Pitfalls to Avoid

- ❌ Using Webflow-generated class names like `.w-1`, `.div-block-23`
- ❌ Assuming props will be passed (Webflow has no React runtime)
- ❌ Using async/await in components (Webflow is static HTML)
- ❌ Complex state management (useState, useContext won't exist in Webflow)
- ❌ Importing npm packages in Webflow embeds (must use CDN)
- ❌ Using build tools (Webpack, Vite) outputs in Webflow (must be vanilla JS)

## 📝 Notes

- This project uses pnpm for package management
- Prototype serves as living documentation and component specification
- Translation docs bridge the gap between React and Webflow
- Final Webflow site may differ from prototype (CMS-driven content)
- Custom code should be minimal; leverage Webflow's visual tools when possible

---

**Last Updated**: {{LAST_UPDATED}}
**Project Status**: {{PROJECT_STATUS}}