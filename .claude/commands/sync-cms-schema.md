# Sync CMS Schema to Webflow

Create Webflow CMS collections from React component mock data.

## Prerequisites

- [ ] Webflow MCP configured
- [ ] Mock data file exists
- [ ] Environment variables set

## Process

1. **Load CMS Architect Agent**
   Use `cms-architect` persona for schema design

2. **Read Mock Data File**
   Ask: "Which mock data file?"
   Location: `prototype/src/data/mock*.js`

3. **Infer CMS Structure**
   Analyze data shape:
````javascript
   const data = {
     title: "Text",        // → PlainText
     price: 29,            // → Number
     image: "/img.jpg",    // → Image
     published: true,      // → Bool
     category: {...}       // → Reference
   };
````

4. **Design Collections**
   - Main collection for primary data
   - Referenced collections for relationships
   - Multi-reference for many-to-many

5. **Show Schema Plan**
   Display proposed collection structure
````yaml
   collection:
     name: Blog Posts
     fields:
       - title (PlainText)
       - body (RichText)
       - author (Reference → Authors)
       - tags (MultiReference → Tags)
````

6. **Get Approval**
   "Create these collections in Webflow? (yes/no)"

7. **Execute via Webflow API**
````javascript
   const collection = await webflow.createCollection({
     name: "Blog Posts",
     slug: "blog-posts",
     singularName: "Blog Post",
     fields: [...]
   });
````

8. **Populate Sample Data**
   Create 1-3 items from mock data

9. **Report Results**

## Field Type Inference

| JS Value | Inferred Type | Webflow Field |
|----------|---------------|---------------|
| "Short text" | string (< 100 chars) | PlainText |
| "Long text..." | string (> 100 chars) | RichText |
| "/page" or "https://..." | string (URL pattern) | Link |
| "/image.jpg" | string (image path) | Image |
| 42 | number | Number |
| true/false | boolean | Bool |
| "2026-01-17" | string (date pattern) | Date |
| [...strings] | array of primitives | Multi-reference |
| {...} | object | Reference |

## Special Cases

### Array of Objects → Separate Collection
````javascript
// Mock data
const product = {
  name: "Product",
  features: [
    { icon: "⚡", title: "Fast" },
    { icon: "🔒", title: "Secure" }
  ]
};

// Creates TWO collections:
// 1. Products (with multi-reference to Features)
// 2. Features (with icon, title fields)
````

### Nested References → Multiple Collections
````javascript
// Mock data
const post = {
  title: "Post Title",
  author: {
    name: "John Doe",
    avatar: "/john.jpg",
    bio: "..."
  }
};

// Creates TWO collections:
// 1. Blog Posts (with reference to Authors)
// 2. Authors (with name, avatar, bio)
````

## Output Format
````
✅ CMS Collections Created

📊 Collections:
1. Blog Posts
   - title (PlainText, required)
   - slug (PlainText, required, unique)
   - body (RichText)
   - published (Bool, default: false)
   - author (Reference → Authors)
   - tags (MultiReference → Tags)
   
2. Authors
   - name (PlainText, required)
   - bio (RichText)
   - avatar (Image)
   
3. Tags
   - name (PlainText, required)
   - slug (PlainText, required, unique)

📝 Sample Items Created:
- Blog Posts: 1 item
- Authors: 1 item
- Tags: 3 items

🔗 View in Designer:
https://webflow.com/design/[site]/cms

💾 Schema Saved:
- translation-docs/cms-models/blog-schema.yaml

🔧 Next Steps:
1. Review collections in Designer
2. Add more items or import data
3. Bind to components with /push-to-webflow
````

## Validation

Before creating collection:
- [ ] Collection name is singular
- [ ] Slug is valid (lowercase, hyphens)
- [ ] Required fields make sense
- [ ] No redundant data (normalized properly)
- [ ] References are correct direction

## Allowed Tools
- mcp__webflow__createCollection
- mcp__webflow__createCollectionItem
- view (read mock data)
- create_file (save schema YAML)