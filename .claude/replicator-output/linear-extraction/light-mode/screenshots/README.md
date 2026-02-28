# Linear Light Mode Screenshots

Screenshots captured at viewports: 1440px, 768px, 375px

## Screenshot Locations

The screenshots were captured using Playwright MCP and are saved in the `.playwright-mcp/` directory at the project root:

- `.playwright-mcp/linear-light-1440-full.png` - Full page at 1440px (desktop)
- `.playwright-mcp/linear-light-768.png` - Viewport at 768px (tablet)
- `.playwright-mcp/linear-light-375.png` - Viewport at 375px (mobile)
- `.playwright-mcp/linear-light-mode-attempt-1440.png` - Initial light mode verification

## How Light Mode Was Extracted

Linear's marketing site defaults to dark mode. Light mode was activated by:

```javascript
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.style.colorScheme = 'light';
```

This triggers Linear's built-in theming system which applies the light mode color palette.

## Key Observations

### Light Mode Characteristics

1. **Background**: Pure white (#FFFFFF) primary, with subtle gray tones for elevation
2. **Text**: Dark charcoal (rgb(40, 42, 48)) for primary text, grays for secondary
3. **Borders**: Use rgba(0, 0, 0, X) with low opacity values (0.05-0.16)
4. **Shadows**: Subtle, using rgba(0, 0, 0, 0.09) base color

### Contrast Differences from Dark Mode

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Background | #000/dark grays | #FFF/light grays |
| Primary text | White/light | rgb(40, 42, 48) |
| Borders | rgba(255,255,255,X) | rgba(0,0,0,X) |
| Shadows | More prominent | Subtle |
| Header | rgba(0,0,0,0.8) | rgba(255,255,255,0.8) |

### Typography Unchanged

Font families, sizes, weights, and line heights remain consistent between themes.
Only colors change.
