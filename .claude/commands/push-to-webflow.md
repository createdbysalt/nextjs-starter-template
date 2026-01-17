# Push Component to Webflow via API

Automatically create Webflow Designer elements from React component using Webflow MCP.

## Prerequisites

Check before running:
- [ ] Webflow MCP server configured (`.mcp.json`)
- [ ] `WEBFLOW_API_TOKEN` environment variable set
- [ ] `WEBFLOW_SITE_ID` environment variable set
- [ ] Component file exists in prototype
- [ ] Translation decision made (create static or CMS-bound?)

## Process

1. **Load Required Skills**
   - `webflow-official/webflow-designer-api`
   - `automation/react-to-webflow-api`
   - `webflow-adapters/vercel-to-webflow-bridge`

2. **Read Component File**
   Ask: "Which component?" (e.g., `Hero.jsx`)
   Parse structure, extract props

3. **Analyze for CMS**
   - If component has props → Ask about CMS collection
   - If component has `.map()` → Requires CMS collection

4. **Generate API Call Plan**
   Create element tree:
   - Parent → child hierarchy
   - Class names
   - Text content
   - Style properties

5. **Show Plan to User**
````
   📋 DEPLOYMENT PLAN
   
   Component: Hero.jsx
   Target: [site-name]
   
   ELEMENTS TO CREATE:
   ├─ Section "Hero Section"
   │  ├─ Container
   │  │  ├─ Heading H1 [CMS: title]
   │  │  ├─ Paragraph [CMS: description]
   │  │  └─ Button [CMS: ctaText, ctaLink]
   
   CMS COLLECTION: "Hero Sections" (4 fields)
   API CALLS: ~8
   
   Proceed? (yes/no)
````

6. **Execute** (if approved)
   - Create elements via Webflow API
   - Apply styles
   - Set up CMS bindings (if applicable)
   - Cache all responses

7. **Report Results**
   - Success/failure status
   - Designer link to view
   - Element IDs for reference

## API Call Sequence

### 1. Create Parent Section
````javascript
const section = await webflow.createElement({
  type: 'Section',
  name: 'Hero Section',
  styles: {
    display: 'flex',
    padding: '80px',
    alignItems: 'center'
  }
});
````

### 2. Create Children (in order)
````javascript
const container = await webflow.createElement({
  type: 'DivBlock',
  parent: section._id,
  name: 'Hero Container',
  styles: { maxWidth: '1200px' }
});

const heading = await webflow.createElement({
  type: 'Heading',
  tag: 'h1',
  parent: container._id,
  text: props.title || 'Placeholder Title',
  className: 'hero__title'
});
````

### 3. Apply CMS Bindings (if collection)
````javascript
await webflow.bindToCollection({
  elementId: heading._id,
  collectionId: heroCollection._id,
  fieldSlug: 'title'
});
````

## Safety Checks

**STOP execution if:**
- API returns error
- Required environment variables missing
- Element creation fails
- User hasn't confirmed plan

**Rollback if:**
- Error occurs mid-creation
- User cancels during execution

## Error Handling
````javascript
const transaction = {
  operations: [],
  rollback: async function() {
    for (const op of this.operations.reverse()) {
      await webflow.deleteElement(op.elementId);
    }
  }
};

try {
  const section = await webflow.createElement({...});
  transaction.operations.push({ elementId: section._id });
  
  // ... more operations
  
} catch (error) {
  console.error('Deployment failed:', error);
  await transaction.rollback();
  throw error;
}
````

## Output Format
````
✅ Component deployed to Webflow

📦 Elements Created:
- Section "Hero Section" (ID: 6579abc...)
- Container "Hero Container" (ID: 6579def...)
- Heading H1 "Hero Title" (ID: 6579ghi...)
- Paragraph "Hero Description" (ID: 6579jkl...)
- Button "CTA" (ID: 6579mno...)

🗄️  CMS Collection:
- Name: "Hero Sections"
- Fields: 4
- Items: 1 (sample data)

🔗 View in Designer:
https://webflow.com/design/[site-name]?pageId=xyz&nodeId=6579abc...

⚠️  Next Steps:
1. Review elements in Designer
2. Adjust styling if needed
3. Add more CMS items
4. Publish when ready

💡 Tip: Elements are created in "Draft" state
````

## Cache Structure

Save to: `webflow-api-cache/[component-name]-deployment.json`
````json
{
  "component": "Hero",
  "timestamp": "2026-01-17T10:30:00Z",
  "siteId": "6579...",
  "elements": [
    {
      "type": "Section",
      "id": "6579abc...",
      "name": "Hero Section",
      "className": "hero"
    }
  ],
  "collection": {
    "id": "6579xyz...",
    "name": "Hero Sections",
    "fields": [...]
  }
}
````

## Allowed Tools
- mcp__webflow__* (all Webflow MCP tools)
- view (read component)
- create_file (cache responses)

## Limitations

**Can create:**
- Sections, Div Blocks, Headings, Paragraphs
- Buttons, Links, Images
- Basic styling

**Cannot create (yet):**
- Complex interactions (use /deploy-embed instead)
- Custom code embeds (use /deploy-embed)
- Webflow Tabs/Accordions (create manually)