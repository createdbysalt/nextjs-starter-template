# Translate Component to Webflow

Convert React component into step-by-step Webflow Designer rebuild guide.

## Process

1. **Read Component**
   Ask: "Which component?" (e.g., `Hero.jsx`)
   Load from: `prototype/src/components/`

2. **Analyze Structure**
   - Parse JSX tree
   - Identify props → CMS fields
   - Find loops → CMS collections
   - Note conditionals → combo classes
   - Locate animations → separate docs

3. **Generate Webflow Rebuild Guide**
   Create: `translation-docs/components/[Name]-webflow-guide.md`
   
   Include:
   - Step-by-step element creation
   - Class names and styling
   - Responsive breakpoints
   - CMS binding instructions

4. **Generate CMS Schema** (if component has props)
   Create: `translation-docs/cms-models/[name]-collection.yaml`
   
   Map:
   - String props → PlainText/RichText
   - URLs → Link fields
   - Booleans → Bool fields
   - Arrays → Multi-references

5. **Cross-Reference Animations**
   If component uses animations:
   - Link to animation spec docs
   - Note which animations are IX2 vs embeds

## Translation Rules

### JSX → Webflow Element Map
````javascript
<section> → Section
<div> → Div Block
<h1>-<h6> → Heading (with tag)
<p> → Paragraph
<a> → Link Block
<button> → Button
<img> → Image
<ul>, <ol> → List
<li> → List Item
````

### Props → CMS Fields
````javascript
// React prop
title: string → CMS: Plain Text

price: number → CMS: Number

imageSrc: string → CMS: Image

published: boolean → CMS: Bool

category: {name, slug} → CMS: Reference to Categories collection

tags: string[] → CMS: Multi-reference to Tags collection
````

### Loops → CMS Collections
````jsx
// React
{items.map(item => <Card {...item} />)}

// Webflow
Create ONE Card element
Set as "Collection List" 
Bind to CMS collection
````

### Conditional Rendering → Combo Classes
````jsx
// React
<div className={`card ${featured ? 'card--featured' : ''}`}>

// Webflow
Base class: "Card"
Combo class: "Featured" (applied conditionally via CMS bool field)
````

## Guide Template
````markdown
# [Component Name] → Webflow Rebuild Guide

## Source
`prototype/src/components/[ComponentName].jsx`

## Overview
[Brief description of component purpose and layout]

---

## Step 1: Create Section

1. Add Section to page
   - Name: "[Component Name] Section"
   - Class: `[component-name]`

2. Settings:
   - Display: Flex
   - Direction: [Horizontal/Vertical]
   - Align: [Center/Start/End]
   - Padding: [value]

---

## Step 2: Add Container

1. Add Container inside Section
   - Name: "[Component Name] Container"
   - Class: `[component-name]__container`

2. Settings:
   - Max Width: [value]
   - [Other layout properties]

---

## Step 3: Add Content Elements

### Element: [Heading]
1. Add Heading H[1-6]
   - Class: `[component-name]__[element]`
   - **CMS Binding**: Get text from `[field-name]`

2. Styling:
   - Font Size: [value]
   - Font Weight: [value]
   - Color: [value]

### Element: [Another Element]
[Repeat structure above]

---

## Responsive Design

### Tablet (≤991px)
- [Component Name] Section: [changes]
- [Element]: [changes]

### Mobile Landscape (≤767px)
- [Changes]

### Mobile Portrait (≤479px)
- [Changes]

---

## CMS Integration

**Collection Name**: [Collection Name]

**Structure**: See `translation-docs/cms-models/[name]-collection.yaml`

**Binding Instructions**:
1. Select [element]
2. Click "Get [text/image/link] from..."
3. Choose Collection: [collection name]
4. Select Field: [field name]

---

## Animations

[If applicable, list and link to animation specs]

- [Animation name]: See `translation-docs/animations/[name]-spec.md`

---

## Testing Checklist

- [ ] All elements created and styled
- [ ] CMS bindings working
- [ ] Responsive on all breakpoints
- [ ] Matches prototype design
- [ ] Interactions working (if any)
````

## CMS Schema YAML Template
````yaml
# CMS Collection Schema
# Component: [Component Name]
# Generated from: prototype/src/data/mock[ComponentName]Data.js

collection:
  name: [Collection Name]
  slug: [collection-slug]
  singularName: [Item Name]
  
fields:
  - name: [Field Display Name]
    slug: [field-slug]
    type: [PlainText|RichText|Image|Number|Link|Date|Bool|Reference|MultiReference]
    required: [true|false]
    helpText: "[Guidance for content editors]"
    default: [value if applicable]
    validation:
      maxLength: [if applicable]
      
  # Reference example
  - name: Category
    slug: category
    type: Reference
    collection: categories
    required: false
    
  # Multi-reference example
  - name: Tags
    slug: tags
    type: MultiReference
    collection: tags
    required: false
````

## Output
````
✅ Translation guide created

📁 Files Generated:
- translation-docs/components/Hero-webflow-guide.md
- translation-docs/cms-models/hero-collection.yaml

📋 Summary:
- Elements to create: 7
- CMS collection: "Hero Sections" (5 fields)
- Responsive breakpoints: 3
- Animations referenced: 1 (hero-entrance-spec.md)

🔧 Next Steps:
1. Open Webflow Designer
2. Follow step-by-step guide
3. Create CMS collection from YAML
4. Bind CMS fields
5. Test on all breakpoints

💡 Tip: Use /push-to-webflow Hero.jsx to automate this process via API
````

## Allowed Tools
- view (read component and mock data)
- create_file (generate guides)
- grep (find related files)