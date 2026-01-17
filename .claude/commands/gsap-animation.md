# GSAP Animation Creation

Create GSAP animations for React prototypes that can be embedded in Webflow.

## Skills to Load
- `gsap-webflow-translation` - Translation patterns
- `webflow-adapters/animation-patterns` - Webflow compatibility

## Process

1. **Gather Requirements**
   Ask:
   - "What should animate?" (element description)
   - "What triggers it?" (load, scroll, hover, click)
   - "Easing preference?" (power, back, elastic, bounce)
   - "Duration?" (fast < 0.3s, medium 0.3-0.6s, slow > 0.6s)

2. **Create Animation File**
   - Location: `prototype/src/animations/[name].js`
   - Export reusable function
   - Use data attributes, not classes

3. **Integrate with Component**
   - Add `useGSAP` hook
   - Add `data-gsap-animation` attribute
   - Document selectors needed

4. **Create Webflow Translation Doc**
   - Location: `translation-docs/animations/[name]-spec.md`
   - Decision: IX2 or GSAP embed?
   - If embed: create vanilla JS version

5. **Generate Webflow Embed Version** (if complex)
   - Location: `webflow-embeds/animations/[name].js`
   - Convert React hooks to vanilla JS
   - Add IIFE wrapper
   - Add error handling

## Animation Template (Prototype)
````javascript
// prototype/src/animations/[name].js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * [ANIMATION NAME]
 * 
 * Trigger: [page load, scroll, hover, click]
 * Targets: [description of elements]
 * Duration: [total time]
 * 
 * WEBFLOW TRANSLATION:
 * Decision: [Webflow IX2 / GSAP Embed]
 * See: translation-docs/animations/[name]-spec.md
 */

export function [animationName](containerElement) {
  // Validate element exists
  if (!containerElement) {
    console.warn('[animationName]: Container element not found');
    return;
  }
  
  // Get target elements using data attributes
  const target = containerElement.querySelector('[data-anim="target"]');
  
  if (!target) {
    console.warn('[animationName]: Target element not found');
    return;
  }
  
  // Create animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerElement,
      start: 'top center',
      end: 'bottom top',
      scrub: true,
      markers: false // Set true for debugging
    }
  });
  
  tl.from(target, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  return tl;
}
````

## Webflow Embed Template
````javascript
// webflow-embeds/animations/[name].js
/**
 * [ANIMATION NAME] - Webflow Embed
 * 
 * DEPENDENCIES:
 * - GSAP Core: https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js
 * - ScrollTrigger: https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js
 * 
 * SELECTORS REQUIRED:
 * - [data-gsap-animation="[name]"] on container element
 * - [data-anim="target"] on animated element
 * 
 * EMBED LOCATION:
 * Page Settings → Custom Code → Before </body>
 */

(function() {
  'use strict';
  
  function init[AnimationName]() {
    const containers = document.querySelectorAll('[data-gsap-animation="[name]"]');
    
    if (containers.length === 0) {
      console.warn('[animationName]: No containers found');
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    containers.forEach(container => {
      const target = container.querySelector('[data-anim="target"]');
      
      if (!target) return;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom top',
          scrub: true
        }
      });
      
      tl.from(target, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init[AnimationName]);
  } else {
    init[AnimationName]();
  }
})();
````

## Translation Doc Template
````markdown
# [Animation Name] - Translation Spec

## Prototype Source
`prototype/src/animations/[name].js`

## Analysis

**Complexity**: [Simple/Medium/Complex]
**Trigger**: [Page load/Scroll/Hover/Click]
**Elements**: [Number of animated elements]
**Plugins**: [GSAP Core/ScrollTrigger/Other]

## Decision: [Webflow IX2 ☐ / GSAP Embed ☑]

### Reasoning
[Why this path was chosen]

---

## [If Webflow IX2]

### Webflow Interactions Setup

1. **Create Interaction**
   - Name: "[Animation Name]"
   - Trigger: [Mouse Hover/Page Load/Scroll/Click]
   - Affects: [This element/Other elements]

2. **Actions**
   - Step 1: [Element] → [Property] from [start] to [end], [duration]ms, [easing]
   - Step 2: [Element] → [Property] from [start] to [end], [duration]ms, [easing]

3. **Required Classes/Structure**
   - Class: `[class-name]` on [element type]
   - Nested: `[class-name]` on [element type]

---

## [If GSAP Embed]

### Dependencies
Add to Page Settings → Custom Code → Before </head>:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

### Required Selectors
In Webflow Designer, add these attributes:
- `data-gsap-animation="[name]"` on [element description]
- `data-anim="target"` on [element description]

### Embed Code
Location: Page Settings → Custom Code → Before </body>

Code: See `webflow-embeds/animations/[name].js`

### Testing Checklist
- [ ] Animation plays on [trigger]
- [ ] Works on desktop (Chrome, Firefox, Safari)
- [ ] Works on tablet
- [ ] Works on mobile
- [ ] No console errors
- [ ] Maintains 60fps
````

## Output
````
✅ Animation created: heroEntrance

📁 Files:
- prototype/src/animations/heroEntrance.js
- translation-docs/animations/hero-entrance-spec.md
- webflow-embeds/animations/hero-entrance.js (embed version)

🎬 Animation Details:
- Trigger: Page load
- Duration: 1.6s total
- Easing: Power3 out
- Elements: 3 (title, description, button)

🔧 Next steps:
1. Test in prototype: pnpm dev
2. When approved: /deploy-embed hero-entrance.js

💡 Decision: GSAP Embed (too complex for IX2)
````

## Allowed Tools
- create_file (animation files + docs)
- view (read component structure)