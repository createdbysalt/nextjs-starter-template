/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        // Client-First container widths
        maxWidth: {
          'container-small': '960px',
          'container-medium': '1280px',
          'container-large': '1440px',
        },
        
        // Client-First spacing scale
        spacing: {
          'section-small': '2.5rem',    // 40px
          'section-medium': '5rem',     // 80px
          'section-large': '7.5rem',    // 120px
          'section-huge': '10rem',      // 160px
        },
        
        // Brand colors (default - will be customized per client)
        colors: {
          'brand': {
            'primary': '#3B82F6',
            'primary-hover': '#2563EB',
            'secondary': '#10B981',
            'secondary-hover': '#059669',
            'accent': '#F59E0B',
          },
          'neutral': {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        },
        
        // Client-First typography
        fontSize: {
          'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],      // 56px
          'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],        // 48px
          'h3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],        // 32px
          'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],      // 24px
          'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],     // 20px
          'h6': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],        // 16px
          'regular': ['1rem', { lineHeight: '1.6' }],                      // 16px
          'small': ['0.875rem', { lineHeight: '1.5' }],                    // 14px
          'tiny': ['0.75rem', { lineHeight: '1.4' }],                      // 12px
        },
        
        // Animation defaults
        transitionDuration: {
          'fast': '150ms',
          'base': '300ms',
          'slow': '500ms',
        },
        
        // Z-index scale
        zIndex: {
          'dropdown': '1000',
          'sticky': '1020',
          'fixed': '1030',
          'modal': '1040',
          'popover': '1050',
          'tooltip': '1060',
        },
      },
    },
    plugins: [],
  }