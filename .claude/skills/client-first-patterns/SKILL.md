# Client-First Class System for Webflow

**Framework:** Finsweet Client-First v2  
**Purpose:** Standardized class naming for Webflow projects

## Philosophy

Client-First is the industry standard for professional Webflow development. All prototypes MUST use Client-First class names to enable 1:1 translation to Webflow.

## Core Naming Rules

### 1. Section Classes (Top-Level Containers)

Format: `section_name`
```jsx
// ✅ Correct
<div className="section_hero">
<div className="section_features">
<div className="section_pricing">
<div className="section_footer">

// ❌ Wrong
<div className="hero">
<div className="features-section">
```

### 2. Component Classes (Reusable Elements)

Format: `name_component`
```jsx
// ✅ Correct
<div className="card_component">
<div className="testimonial_component">
<div className="cta_component">

// ❌ Wrong
<div className="card">
<div className="testimonial-card">
```

### 3. Element Classes (Within Components)

Format: `element-name` or `component-element`
```jsx
// ✅ Correct - Generic elements
<h1 className="heading-style-h1">
<p className="text-style-regular">
<a className="button-primary">

// ✅ Correct - Component-specific elements
<div className="card-image">
<div className="card-content">
<h3 className="card-title">

// ❌ Wrong
<h1 className="hero__title">
<div className="card__image">
```

### 4. State Classes

Format: `is-state`
```jsx
// ✅ Correct
<div className="button-primary is-active">
<div className="accordion_component is-open">
<div className="nav-link is-current">

// ❌ Wrong
<div className="button--active">
<div className="accordion--open">
```

## Global Classes (Pre-defined by Client-First)

These classes are part of the Client-First framework and should be used as-is:

### Layout & Spacing
```jsx
// Page wrapper (required on every page)
<div className="page-wrapper">

// Global horizontal padding
<div className="padding-global">

// Containers (choose one per section)
<div className="container-small">   {/* 960px */}
<div className="container-medium">  {/* 1280px */}
<div className="container-large">   {/* 1440px */}

// Vertical section padding (choose one per section)
<div className="padding-section-small">   {/* 40px */}
<div className="padding-section-medium">  {/* 80px */}
<div className="padding-section-large">   {/* 120px */}
<div className="padding-section-huge">    {/* 160px */}

// Margins
<div className="margin-top margin-small">
<div className="margin-bottom margin-medium">
<div className="margin-vertical margin-large">
```

### Typography
```jsx
// Headings (use these instead of h1-h6)
<h1 className="heading-style-h1">
<h2 className="heading-style-h2">
<h3 className="heading-style-h3">
<h4 className="heading-style-h4">
<h5 className="heading-style-h5">
<h6 className="heading-style-h6">

// Text sizes
<p className="text-size-regular">
<p className="text-size-small">
<p className="text-size-tiny">

// Text styles
<a className="text-style-link">
<blockquote className="text-style-quote">
```

### Utilities
```jsx
// Responsive visibility
<div className="hide-mobile-portrait">
<div className="hide-mobile-landscape">
<div className="hide-tablet">
<div className="hide-desktop">

// Text alignment
<div className="text-align-center">
<div className="text-align-right">
```

## Standard Page Structure Template

Every page MUST follow this structure:
```jsx
export function StandardPage() {
  return (
    <div className="page-wrapper">
      {/* Section example */}
      <div className="section_hero">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              
              {/* Content here */}
              <h1 className="heading-style-h1">Hero Title</h1>
              <p className="text-size-regular">Description text</p>
              <a href="#" className="button-primary">Call to Action</a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Component Patterns

### Hero Section
```jsx
<div className="section_hero">
  <div className="padding-global">
    <div className="container-large">
      <div className="padding-section-large">
        <div className="hero_component">
          <div className="hero-content">
            <h1 className="heading-style-h1">Title</h1>
            <p className="text-size-regular">Description</p>
            <a href="#" className="button-primary">CTA</a>
          </div>
          <div className="hero-image-wrapper">
            <img src="..." alt="..." className="hero-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Feature Cards Grid
```jsx
<div className="section_features">
  <div className="padding-global">
    <div className="container-large">
      <div className="padding-section-medium">
        
        <div className="features_component">
          <h2 className="heading-style-h2 text-align-center">Features</h2>
          
          <div className="features-grid">
            <div className="card_component">
              <div className="card-icon-wrapper">
                <img src="..." alt="" className="card-icon" />
              </div>
              <h3 className="card-title">Feature Title</h3>
              <p className="card-description">Feature description</p>
            </div>
            {/* More cards */}
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
```

## Combo Classes

Webflow allows multiple classes on one element. Use this for variations:
```jsx
// Primary button
<a className="button-primary">Click Me</a>

// Primary button that's also large
<a className="button-primary button-large">Click Me</a>

// Card that's featured
<div className="card_component is-featured">
```

## Common Mistakes to Avoid

❌ **Using BEM syntax:**
```jsx
<div className="hero__content">  {/* Wrong */}
```

✅ **Use Client-First syntax:**
```jsx
<div className="hero-content">   {/* Correct */}
```

❌ **Creating custom padding/margin:**
```jsx
<div style={{ padding: '80px 0' }}>  {/* Wrong */}
```

✅ **Use global classes:**
```jsx
<div className="padding-section-medium">  {/* Correct */}
```

❌ **Inconsistent naming:**
```jsx
<div className="section_hero">
  <div className="heroContent">  {/* Wrong - camelCase */}
</div>
```

✅ **Consistent kebab-case:**
```jsx
<div className="section_hero">
  <div className="hero-content">  {/* Correct */}
</div>
```

## Integration with GSAP

GSAP selectors should target Client-First classes:
```javascript
// ✅ Correct
gsap.from('.heading-style-h1', { opacity: 0 });
gsap.to('.button-primary', { scale: 1.05 });

// ❌ Wrong - Don't target utility classes
gsap.from('.padding-global', { opacity: 0 });
```

## Webflow Translation

Client-First classes in React → Webflow classes are 1:1:

| React | Webflow |
|-------|---------|
| `className="section_hero"` | Class: "section_hero" |
| `className="container-large"` | Class: "container-large" |
| `className="heading-style-h1"` | Class: "heading-style-h1" |

**No translation needed** - just rebuild the structure!

## Resources

- **Client-First Documentation:** https://www.finsweet.com/client-first/docs
- **Class Cheat Sheet:** https://www.finsweet.com/client-first/docs/class-list
- **Video Tutorials:** https://www.youtube.com/finsweet

## When to Deviate

You can create custom classes ONLY for:
- Component-specific styling not covered by globals
- Custom animations
- Brand-specific elements

Always prefix custom classes clearly:
```jsx
<div className="acme-custom-header">  {/* Client-specific */}
```