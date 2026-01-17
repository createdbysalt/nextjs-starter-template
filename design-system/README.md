# Design System Documentation

This folder contains the brand guidelines and design tokens for this Webflow project.

## Files Overview

| File | Purpose | When to Fill |
|------|---------|--------------|
| `brand-guidelines.md` | Complete brand identity documentation | During client onboarding |
| `style-tokens.md` | CSS variables and design tokens | Before prototyping |
| `components.md` | Component library specifications | As components are built |

## Setup Checklist

### 1. Brand Guidelines (`brand-guidelines.md`)

- [ ] Add client's mission statement and brand overview
- [ ] Define target audience and personas
- [ ] Document brand personality traits
- [ ] Add color palette (primary, secondary, accent, neutrals)
- [ ] Define typography (fonts, sizes, weights)
- [ ] Add spacing and layout guidelines
- [ ] Document voice and tone
- [ ] Add imagery guidelines
- [ ] Include logo usage rules
- [ ] Add do's and don'ts examples

### 2. Style Tokens (`style-tokens.md`)

- [ ] Convert brand colors to CSS variables
- [ ] Map typography to CSS values
- [ ] Define spacing scale
- [ ] Set border radius values
- [ ] Define shadow system
- [ ] Add breakpoint definitions
- [ ] Map to Tailwind config
- [ ] Update Client-First variables

### 3. Component Library (`components.md`)

- [ ] Document each component as it's built
- [ ] Add variants and states
- [ ] Include accessibility notes
- [ ] Link to Figma/design files
- [ ] Add usage examples

## How to Use

### For Claude Code

These files are automatically loaded by Claude Code skills. When you run:
```bash
/vibe "Create a hero section"
```

Claude will:
1. Read `brand-guidelines.md` for colors, fonts, tone
2. Read `style-tokens.md` for exact CSS values
3. Read `components.md` for existing component patterns
4. Generate Client-First compliant, brand-accurate code

### For Developers

Reference these files when:
- Prototyping new components
- Writing custom CSS
- Making design decisions
- Ensuring brand consistency

### For Clients

These files serve as:
- Single source of truth for brand
- Handoff documentation
- Style guide for content team
- Reference for future developers

## Workflow
```
1. Client provides brand assets → Fill in templates
2. Review with client → Get approval
3. Claude Code reads templates → Generates compliant code
4. Build in Webflow → Reference for consistency
```

## Tips

- **Be Specific**: "Blue" vs "#3B82F6" - exact values prevent errors
- **Add Examples**: Show correct usage with screenshots/code
- **Keep Updated**: Update as the project evolves
- **Link Assets**: Reference Figma files, font CDNs, etc.
- **Version Control**: Commit changes to track evolution

## Template Placeholders

Look for these placeholders and replace them:

- `{{CLIENT_NAME}}` - Client's company name
- `{{PRIMARY_COLOR}}` - Brand primary color (hex)
- `{{SECONDARY_COLOR}}` - Brand secondary color (hex)
- `{{HEADING_FONT}}` - Heading font family
- `{{BODY_FONT}}` - Body font family
- `[Add X here]` - Sections needing content

## Resources

- [Finsweet Client-First](https://www.finsweet.com/client-first)
- [Webflow Style Guide](https://webflow.com/blog/style-guide)
- [Design Tokens W3C](https://www.w3.org/community/design-tokens/)