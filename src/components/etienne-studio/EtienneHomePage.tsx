'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { EtienneHeader } from './EtienneHeader'
import { EtienneFooter } from './EtienneFooter'
import {
  Carousel3D,
  SimpleCarousel,
  defaultEtienneProjects,
  type CarouselProject,
} from './Carousel3D'

interface EtienneHomePageProps {
  projects?: CarouselProject[]
  className?: string
}

/**
 * EtienneHomePage - Full page recreation of etienne.studio
 *
 * Features:
 * - 3D rotating carousel of project cards
 * - Live clock in header
 * - Clean minimal typography (12px Neue Haas Grotesk)
 * - Responsive design
 */
export function EtienneHomePage({
  projects = defaultEtienneProjects,
  className,
}: EtienneHomePageProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div
      className={cn(
        'min-h-screen bg-white text-black antialiased overflow-hidden',
        className
      )}
    >
      {/* Header with navigation and clock */}
      <EtienneHeader />

      {/* Main content - 3D Carousel */}
      <main style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '32px', paddingBottom: '96px' }}>
        {prefersReducedMotion ? (
          <SimpleCarousel projects={projects} />
        ) : (
          <Carousel3D projects={projects} />
        )}
      </main>

      {/* Footer */}
      <EtienneFooter />
    </div>
  )
}
