/**
 * Isolated layout for inspiration pages
 * Uses inline styles to override dark theme
 */
export default function InspoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        position: 'relative',
        colorScheme: 'light',
        // CSS variables for light theme
        ['--background' as string]: '0 0% 100%',
        ['--foreground' as string]: '0 0% 0%',
      }}
    >
      {children}
    </div>
  )
}
