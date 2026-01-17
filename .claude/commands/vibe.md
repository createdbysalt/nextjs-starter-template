# Vibe: Rapid React Prototyping

Create React components for rapid prototyping and Webflow translation.

## Skills to Load
1. `vercel/react-component-patterns` - Modern React structure
2. `webflow-adapters/vercel-to-webflow-bridge` - Filter for Webflow compatibility
3. `project-specific/salt-studio-conventions` - Internal standards

## Process

1. **Gather Context**
   Ask user:
   - "What component are we building?"
   - "Is this a wireframe or high-fidelity?"
   - "Any specific animations needed?"

2. **Create Component File**
   - Location: `prototype/src/components/[ComponentName].jsx`
   - Use functional components
   - Props mirror future CMS fields
   - Add `data-webflow-*` attributes for translation

3. **Apply Webflow Bridge Filter**
   - Remove shadcn/ui complex components
   - Simplify to flat structure
   - Use Webflow-friendly class names
   - Add translation notes inline

4. **Create Mock Data**
   - Location: `prototype/src/data/mock[ComponentName]Data.js`
   - Structure = future CMS schema
   - Add comments noting field types

5. **Add to Page**
   - Import into relevant page file
   - Pass mock data as props

6. **Document Translation**
   - Add inline comments for Webflow mapping
   - Note any state → interaction conversions

## Component Template
````jsx
/**
 * [COMPONENT NAME]
 * 
 * WEBFLOW TRANSLATION NOTES:
 * - Component type: [Section/Container/Element]
 * - CMS ready: [Yes/No]
 * - Animations: [filename.js or "None"]
 * 
 * STRUCTURE:
 * [Brief description of layout]
 */

export function ComponentName({ 
  prop1,  // → CMS: [Field Type]
  prop2,  // → CMS: [Field Type]
}) {
  return (
    <section 
      className="component-name"
      data-webflow-name="Component Section"
    >
      <div className="component-name__container">
        {/* Webflow: Container, max-width: 1200px */}
        
        <h2 className="component-name__heading">
          {/* Webflow CMS: Heading, bound to [field] */}
          {prop1}
        </h2>
        
      </div>
    </section>
  );
}
````

## Mock Data Template
````javascript
/**
 * MOCK DATA for [ComponentName]
 * 
 * This structure becomes Webflow CMS Collection: "[Collection Name]"
 * 
 * CMS Fields:
 * - [field1]: [Type] - [Description]
 * - [field2]: [Type] - [Description]
 */

export const mock[ComponentName]Data = {
  prop1: "Value",  // → CMS Field: [name] (PlainText)
  prop2: "Value",  // → CMS Field: [name] (PlainText)
};
````

## Output

After creating component:
````
✅ Component created: Hero.jsx

📁 Files:
- prototype/src/components/Hero.jsx
- prototype/src/data/mockHeroData.js

🔧 Next steps:
1. Run: cd prototype && pnpm dev
2. View: http://localhost:5173
3. When ready: /translate Hero.jsx

💡 Tip: Use /gsap-animation to add interactions
````

## Allowed Tools
- create_file (component + mock data)
- view (read existing components)
- edit (update imports in pages)