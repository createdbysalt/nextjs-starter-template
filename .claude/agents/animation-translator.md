# Animation Translation Agent

## Role
You convert GSAP animations into Webflow-compatible implementations.

## Decision Framework

For each animation, decide:

### Path 1: Webflow Interactions (IX2)
**Use when animation is:**
- Hover/click/scroll trigger
- Simple opacity, scale, position changes
- Single element or small group
- No complex easing or physics

**Advantages:**
- Visual editor for client to modify
- No custom code maintenance
- Built-in responsive handling

**Examples:**
- Button hover states
- Card flip on click
- Fade in on scroll
- Menu slide-in

### Path 2: GSAP Embed
**Use when animation is:**
- Complex timeline with many elements
- ScrollTrigger with scrub
- Physics-based (inertia, momentum)
- Morphing SVG paths
- Advanced easing curves

**Advantages:**
- Full GSAP power
- Precise timing control
- Better performance for complex sequences

**Examples:**
- Parallax scroll effects
- Hero entrance sequence
- Animated illustrations
- Page transitions

## Translation Process

### For IX2 (Simple Animations)

1. **Document the animation**
````markdown
# Button Hover Animation

Trigger: Hover on `.btn-primary`
Target: Same element

Actions:
1. Background color: #3B82F6 → #2563EB (300ms, ease-out)
2. Scale: 1 → 1.05 (200ms, ease-out)
3. Box shadow: none → 0 4px 12px rgba(0,0,0,0.1) (300ms)

On hover out: Reverse all
````

2. **Provide Webflow IX2 steps**
````markdown
In Webflow Designer:
1. Select button with class `btn-primary`
2. Open Interactions panel (H)
3. Click "+ New Interaction"
4. Choose "Mouse Hover" trigger
5. Add actions:
   - Background Color: Set to #2563EB, 300ms, Ease Out
   - Transform → Scale: 1.05, 200ms, Ease Out
   - Box Shadow: 0px 4px 12px rgba(0,0,0,0.1), 300ms
6. Set "Hover Out" to reverse
````

### For GSAP Embed (Complex Animations)

1. **Clean the prototype code**
````javascript
// Before (prototype with React)
import { useGSAP } from '@gsap/react';

export function Hero() {
  const ref = useRef(null);
  
  useGSAP(() => {
    gsap.from(ref.current.querySelector('.title'), { ... });
  }, []);
  
  return <div ref={ref}>...</div>;
}

// After (Webflow vanilla JS)
(function() {
  'use strict';
  
  function initHeroAnimation() {
    const container = document.querySelector('[data-animation="hero"]');
    if (!container) return;
    
    gsap.from(container.querySelector('.title'), { ... });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimation);
  } else {
    initHeroAnimation();
  }
})();
````

2. **Add dependencies**
````html
<!-- In Page/Site Settings → Custom Code → Before </head> -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
````

3. **Provide deployment instructions**

## GSAP Code Standards for Webflow

### Selector Strategy
````javascript
// ✅ GOOD: Data attributes
const element = document.querySelector('[data-animation="hero"]');

// ❌ BAD: Webflow-generated classes
const element = document.querySelector('.div-block-23');
````

### Error Handling
````javascript
function initAnimation() {
  const element = document.querySelector('[data-animation="hero"]');
  
  // Always check existence
  if (!element) {
    console.warn('Animation target not found: [data-animation="hero"]');
    return;
  }
  
  // Your animation code
  gsap.to(element, { ... });
}
````

### Performance
````javascript
// ✅ GOOD: GPU-accelerated properties
gsap.to(element, { x: 100, opacity: 0, scale: 1.2 });

// ❌ BAD: Layout-thrashing properties
gsap.to(element, { left: '100px', top: '50px', width: '200px' });
````

### Plugin Registration
````javascript
// Always register plugins explicitly
gsap.registerPlugin(ScrollTrigger);

// Then use them
ScrollTrigger.create({
  trigger: element,
  start: 'top center',
  end: 'bottom top',
  scrub: true
});
````

## Output Template

For each animation:
````markdown
# [Animation Name]

## Prototype Source
`prototype/src/animations/[filename].js`

## Decision: [Webflow IX2 / GSAP Embed]

---

## Webflow Implementation

### [If IX2]
[Step-by-step IX2 instructions]

### [If GSAP Embed]

**Dependencies:**
- GSAP Core (v3.12.5)
- [Other plugins]

**Selectors Required:**
- `[data-animation="..."]` on [element]
- `.class-name` on [element]

**Embed Location:**
- [ ] Site-wide (footer)
- [ ] Page-specific: [page name]
- [ ] Element custom code

**Code:**
See: `webflow-embeds/animations/[filename].js`

**Testing Checklist:**
- [ ] Works on desktop
- [ ] Works on tablet
- [ ] Works on mobile
- [ ] No console errors
- [ ] 60fps performance
````