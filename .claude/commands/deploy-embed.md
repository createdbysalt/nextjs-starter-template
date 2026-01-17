# Deploy Custom Code Embed to Webflow

Push GSAP animations or custom JavaScript to Webflow via API.

## Prerequisites

- [ ] Webflow MCP configured
- [ ] Embed file exists and is tested
- [ ] Dependencies identified
- [ ] Target location decided

## Process

1. **Read Embed File**
   Ask: "Which embed file?"
   Location: `webflow-embeds/animations/*.js` or `webflow-embeds/interactions/*.js`

2. **Validate Code**
   - Run ESLint
   - Check for console.logs (remove in production)
   - Verify IIFE wrapper exists
   - Check error handling

3. **Identify Dependencies**
   Parse code for external libraries:
   - GSAP Core
   - GSAP plugins (ScrollTrigger, etc.)
   - Other CDN scripts

4. **Choose Embed Location**
   Ask user:
````
   Where should this code run?
   (a) Site-wide (all pages)
   (b) Specific page: [page name]
   (c) Template page (affects all instances)
   
   Your choice:
````

5. **Generate Dependency Links**
````html
   <!-- GSAP dependencies -->
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
````

6. **Show Deployment Plan**
````
   📋 DEPLOYMENT PLAN
   
   File: hero-gsap.js
   Size: 2.4kb
   
   Dependencies:
   - GSAP Core (v3.12.5)
   - ScrollTrigger plugin
   
   Location: [Site-wide / Page: Homepage]
   Position: Before </body>
   
   Required Selectors in Webflow:
   - [data-gsap-animation="hero"] on Section
   - .hero__title on Heading
   
   Proceed? (yes/no)
````

7. **Deploy via API**
   
   **Site-wide:**
````javascript
   await webflow.updateSiteSettings({
     customCode: {
       head: dependencyScripts,
       footer: embedCode
     }
   });
````
   
   **Page-specific:**
````javascript
   await webflow.updatePageSettings(pageId, {
     customCode: {
       head: dependencyScripts,
       footer: embedCode
     }
   });
````

8. **Verify Deployment**
   - Check API response
   - Confirm code is in place
   - Note any warnings

9. **Report Results**

## Code Validation Rules

### Required: IIFE Wrapper
````javascript
// ✅ GOOD
(function() {
  'use strict';
  // Your code
})();

// ❌ BAD
// Global code without wrapper
````

### Required: Element Existence Checks
````javascript
// ✅ GOOD
const element = document.querySelector('[data-animation="hero"]');
if (!element) {
  console.warn('Element not found');
  return;
}

// ❌ BAD
const element = document.querySelector('[data-animation="hero"]');
gsap.to(element, {...}); // Could error if element is null
````

### Required: DOM Ready Check
````javascript
// ✅ GOOD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ❌ BAD
init(); // Might run before DOM is ready
````

## CDN Version Pinning

Always use exact versions:
````html
<!-- ✅ GOOD: Pinned version -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- ❌ BAD: Latest version (can break) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@latest/dist/gsap.min.js"></script>
````

## Output Format
````
✅ Custom code deployed to Webflow

📍 Location: Site-wide (footer)

📦 Dependencies Added:
- GSAP Core v3.12.5
- ScrollTrigger plugin v3.12.5

📝 Code Details:
- File: hero-gsap.js
- Size: 2.4kb minified
- Function: Hero entrance animation

⚠️  Required in Webflow Designer:
- Add attribute: data-gsap-animation="hero" to Hero Section
- Ensure classes: .hero__title, .hero__description, .btn exist

🔗 View in Webflow:
https://webflow.com/design/[site]/settings/custom-code

🧪 Testing Checklist:
- [ ] Publish site to staging
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile
- [ ] Check browser console for errors
- [ ] Verify 60fps performance

💡 Tip: Changes require publishing to see on live site
````

## Safety Features

### Preview Before Deploy
Always show the actual code that will be deployed:
````javascript
console.log('Code to be deployed:
\n
' + embedCode);
````

### Backup Existing Code
If overwriting existing custom code:
````javascript
const existing = await webflow.getSiteSettings();
if (existing.customCode.footer) {
  // Save backup
  await create_file(
    'webflow-api-cache/custom-code-backup.js',
    existing.customCode.footer
  );
  console.log('⚠️  Existing code backed up');
}
````

### Rollback Capability
Keep transaction log:
````json
{
  "action": "deploy_embed",
  "timestamp": "2026-01-17T10:30:00Z",
  "file": "hero-gsap.js",
  "location": "site-wide",
  "backup": "webflow-api-cache/custom-code-backup.js",
  "canRollback": true
}
````

## Allowed Tools
- mcp__webflow__updateSiteSettings
- mcp__webflow__updatePageSettings
- view (read embed file)
- bash (run linter)
- create_file (save backup)