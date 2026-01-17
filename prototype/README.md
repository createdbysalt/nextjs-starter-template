# Webflow Prototype - Client First

React + GSAP prototyping environment using Finsweet's Client-First class system.

## Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Development

### Creating Components

All components must use Client-First class naming:
```jsx
<div className="section_hero">
  <div className="padding-global">
    <div className="container-large">
      <div className="padding-section-large">
        {/* Your content */}
      </div>
    </div>
  </div>
</div>
```

### Adding Animations

Use GSAP for animations. Place animation logic in `src/animations/`:
```javascript
// src/animations/heroTimeline.js
import gsap from 'gsap';

export function heroAnimation(container) {
  gsap.from(container.querySelector('.heading-style-h1'), {
    opacity: 0,
    y: 50,
    duration: 0.8,
  });
}
```

### Claude Code Commands

Use these commands in Claude CLI:

- `/vibe` - Create a new component
- `/gsap-animation` - Add GSAP animation
- `/translate` - Generate Webflow rebuild guide

## Structure
```
src/
├── components/      # React components (Client-First compliant)
├── animations/      # GSAP animation logic
├── pages/           # Page-level components
├── data/            # Mock data (becomes CMS schema)
├── styles/          # CSS files
└── App.jsx          # Main app component
```

## Client-First Resources

- [Documentation](https://www.finsweet.com/client-first/docs)
- [Class List](https://www.finsweet.com/client-first/docs/class-list)
- [Video Tutorials](https://www.youtube.com/finsweet)

## Notes

- This prototype uses Client-First class names for 1:1 Webflow translation
- Custom styles should be minimal - use Client-First globals when possible
- All animations must be 60fps (use `transform` and `opacity` only)
```

---

## Complete File Tree

Here's what the full prototype directory should look like:
```
prototype/
├── .eslintrc.cjs                      # ✅ NEW
├── .prettierrc                        # ✅ NEW
├── index.html                         # ✅ NEW
├── package.template.json              # (already provided)
├── postcss.config.js                  # ✅ NEW
├── README.md                          # ✅ NEW
├── tailwind.config.js                 # ✅ UPDATED
├── vite.config.js                     # ✅ NEW
│
├── public/
│   └── vite.svg                       # (Vite default)
│
└── src/
    ├── main.jsx                       # ✅ NEW (entry point)
    ├── App.jsx                        # ✅ (already complete)
    ├── index.css                      # ✅ NEW
    │
    ├── components/                    # Empty (ready for components)
    │   └── .gitkeep
    │
    ├── animations/                    # Empty (ready for GSAP)
    │   └── .gitkeep
    │
    ├── pages/                         # Empty (ready for pages)
    │   └── .gitkeep
    │
    ├── data/                          # Empty (ready for mock data)
    │   └── .gitkeep
    │
    └── styles/
        └── client-first-base.css      # ✅ (already complete)