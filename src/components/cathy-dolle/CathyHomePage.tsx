'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { CathyHeader } from './CathyHeader'
import { CathyFooter, MobileFooter } from './CathyFooter'
import { ProjectList, defaultProjects, type Project } from './ProjectList'
import { ImageStack, MobileImageStack } from './ImageStack'
import { CustomCursor } from './CustomCursor'

interface CathyHomePageProps {
  projects?: Project[]
  className?: string
}

/**
 * CathyHomePage - Full page recreation of cathydolle.com
 *
 * Features:
 * - Split project list (left 1-6, right 7-12)
 * - Center image stack with scroll/hover animations
 * - Custom cursor
 * - About overlay panel
 * - Responsive: Mobile shows stacked images only
 */
export function CathyHomePage({
  projects = defaultProjects,
  className,
}: CathyHomePageProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative min-h-screen bg-white text-black antialiased overflow-x-hidden',
        className
      )}
    >
      {/* Custom Cursor - Desktop only */}
      {!isMobile && <CustomCursor />}

      {/* Header with navigation */}
      <CathyHeader />

      {/* Main content area */}
      <main className="relative min-h-screen">
        {isMobile ? (
          // Mobile: Stacked images in scroll view
          <MobileImageStack projects={projects} className="pt-12" />
        ) : (
          // Desktop: Split layout with center image stack
          <>
            {/* Project List - Left and Right columns */}
            <ProjectList
              projects={projects}
              onHover={setActiveProject}
              activeProject={activeProject}
            />

            {/* Center Image Stack */}
            <ImageStack
              projects={projects}
              activeProject={activeProject}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <CathyFooter />
      <MobileFooter />
    </div>
  )
}
