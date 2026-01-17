# React to Webflow API Translation

Automated conversion of React components to Webflow Designer API calls.

## Core Translation Engine

### Component Analysis
```javascript
// Example React component
export function FeatureGrid({ features }) {
  return (
    <section className="features">
      <h2 className="features__heading">Our Features</h2>
      <div className="features__grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-card">
            <img src={feature.icon} alt="" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Translation Steps**:

1. **Root Element** (`<section>`)
```javascript
   const section = await webflow.createElement({
     type: 'Section',
     name: 'Features Section',
     className: 'features'
   })
```

2. **Heading** (`<h2>`)
```javascript
   const heading = await webflow.createElement({
     type: 'Heading',
     tag: 'h2',
     parent: section._id,
     text: 'Our Features',
     className: 'features__heading'
   })
```

3. **Grid Container** (`<div>`)
```javascript
   const grid = await webflow.createElement({
     type: 'DivBlock',
     parent: section._id,
     className: 'features__grid',
     styles: {
       display: 'grid',
       gridTemplateColumns: 'repeat(3, 1fr)',
       gap: '32px'
     }
   })
```

4. **Loop Detection** (`{features.map()}`)
   **CRITICAL**: This indicates CMS usage
```javascript
   // Don't create 3 static cards
   // Instead: Create ONE card, bind to CMS collection
   
   const card = await webflow.createElement({
     type: 'DivBlock',
     parent: grid._id,
     className: 'feature-card',
     cmsBinding: {
       collection: 'features', // Collection slug
       layout: 'grid-item'
     }
   })
   
   // Create child elements with CMS bindings
   const image = await webflow.createElement({
     type: 'Image',
     parent: card._id,
     cmsBinding: {
       field: 'icon' // Binds to 'icon' field in collection
     }
   })
   
   const title = await webflow.createElement({
     type: 'Heading',
     tag: 'h3',
     parent: card._id,
     cmsBinding: {
       field: 'title'
     }
   })
```

## Tailwind to Webflow Styles

Built-in translation table:

| Tailwind Class | Webflow Style API |
|---------------|-------------------|
| `flex` | `{ display: 'flex' }` |
| `flex-col` | `{ flexDirection: 'column' }` |
| `items-center` | `{ alignItems: 'center' }` |
| `justify-between` | `{ justifyContent: 'space-between' }` |
| `gap-4` | `{ gap: '16px' }` |
| `p-8` | `{ padding: '64px' }` |
| `px-4` | `{ paddingLeft: '16px', paddingRight: '16px' }` |
| `max-w-6xl` | `{ maxWidth: '1152px' }` |
| `grid` | `{ display: 'grid' }` |
| `grid-cols-3` | `{ gridTemplateColumns: 'repeat(3, 1fr)' }` |
| `rounded-lg` | `{ borderRadius: '8px' }` |
| `shadow-xl` | `{ boxShadow: '0 20px 25px rgba(0,0,0,0.15)' }` |

**Conversion function**:
```javascript
function tailwindToWebflowStyles(classNames) {
  const classes = classNames.split(' ');
  const styles = {};
  
  classes.forEach(cls => {
    const mapping = TAILWIND_MAP[cls];
    if (mapping) {
      Object.assign(styles, mapping);
    }
  });
  
  return styles;
}
```

## CMS Detection Patterns

Automatically detect when to create CMS collections:

### Pattern 1: Array Mapping
```jsx
{items.map(item => <Card {...item} />)}
```
**Action**: Create CMS collection "Items", bind Card to it

### Pattern 2: Props with Multiple Fields
```jsx
function Hero({ title, description, image, ctaText, ctaLink }) {
```
**Action**: Create CMS collection "Hero Sections" with 5 fields

### Pattern 3: Nested Data Structures
```jsx
const products = [
  {
    name: "Product 1",
    category: { name: "Electronics", slug: "electronics" }
  }
]
```
**Action**: Create TWO collections with reference field

## API Call Batching

To avoid rate limits, batch operations:
```javascript
// Bad: Sequential API calls (slow)
for (const element of elements) {
  await webflow.createElement(element)
}

// Good: Batch operations
const batch = elements.map(el => ({
  operation: 'create',
  type: 'element',
  data: el
}))

await webflow.batch(batch)
```

## Rollback Strategy

Track all API calls for potential rollback:
```javascript
const transaction = {
  id: Date.now(),
  operations: [],
  rollback: async function() {
    // Delete in reverse order
    for (const op of this.operations.reverse()) {
      if (op.type === 'create') {
        await webflow.deleteElement(op.result._id)
      }
    }
  }
}

// Track each operation
const section = await webflow.createElement(...)
transaction.operations.push({
  type: 'create',
  elementType: 'Section',
  result: section
})

// If error occurs, rollback
try {
  // ... more operations
} catch (error) {
  await transaction.rollback()
  throw error
}
```