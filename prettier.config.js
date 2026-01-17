/** @type {import("prettier").Config} */
export default {
    // Line width
    printWidth: 100,
    
    // Use 2 spaces for indentation
    tabWidth: 2,
    useTabs: false,
    
    // Semicolons
    semi: true,
    
    // Use single quotes
    singleQuote: true,
    
    // Quote props only when necessary
    quoteProps: 'as-needed',
    
    // JSX quotes
    jsxSingleQuote: false,
    
    // Trailing commas (helps with git diffs)
    trailingComma: 'es5',
    
    // Spacing in objects
    bracketSpacing: true,
    
    // JSX brackets on same line
    bracketSameLine: false,
    
    // Arrow function parentheses
    arrowParens: 'avoid',
    
    // Prose wrap (for markdown)
    proseWrap: 'preserve',
    
    // HTML whitespace sensitivity
    htmlWhitespaceSensitivity: 'css',
    
    // Line endings (use LF for consistency across OS)
    endOfLine: 'lf',
    
    // Embedded language formatting
    embeddedLanguageFormatting: 'auto',
    
    // Plugins
    plugins: ['prettier-plugin-tailwindcss'],
    
    // File-specific overrides
    overrides: [
      {
        files: '*.md',
        options: {
          proseWrap: 'always',
          printWidth: 80,
        },
      },
      {
        files: '*.json',
        options: {
          printWidth: 80,
          tabWidth: 2,
        },
      },
    ],
  };