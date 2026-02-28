'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project } from './ProjectList'

interface ImageStackProps {
  projects: Project[]
  activeProject: Project | null
  className?: string
}

/**
 * ImageStack - Recreates the stacked image gallery effect
 * Original uses Canvas/WebGL, this uses Framer Motion for a similar feel
 */
export function ImageStack({
  projects,
  activeProject,
  className,
}: ImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleImages, setVisibleImages] = useState<Project[]>([])
  const { scrollYProgress } = useScroll()

  // Calculate which images to show based on scroll position
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1])

  useEffect(() => {
    // When active project changes, add it to the visible stack
    if (activeProject) {
      setVisibleImages((prev) => {
        // If already at top, don't re-add
        if (prev[prev.length - 1]?.id === activeProject.id) {
          return prev
        }
        // Add to top of stack, keep last 5
        const newStack = [...prev, activeProject].slice(-5)
        return newStack
      })
    }
  }, [activeProject])

  // Scroll-based image cycling when no hover
  useEffect(() => {
    if (activeProject) return // Don't cycle when hovering

    const unsubscribe = scrollIndex.on('change', (value) => {
      const index = Math.floor(value) % projects.length
      const project = projects[index]
      if (project) {
        setVisibleImages((prev) => {
          if (prev[prev.length - 1]?.id === project.id) return prev
          return [...prev, project].slice(-5)
        })
      }
    })

    return () => unsubscribe()
  }, [scrollIndex, projects, activeProject])

  // Initialize with first few images
  useEffect(() => {
    setVisibleImages(projects.slice(0, 3))
  }, [projects])

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none',
        className
      )}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '280px', height: '400px' }}>
        <AnimatePresence mode="popLayout">
          {visibleImages.map((project, index) => {
            const stackIndex = visibleImages.length - 1 - index
            const isTop = index === visibleImages.length - 1

            return (
              <motion.div
                key={`${project.id}-${index}`}
                initial={{
                  y: 100,
                  scale: 0.9,
                  opacity: 0,
                  rotateX: -10,
                }}
                animate={{
                  y: stackIndex * -15,
                  scale: 1 - stackIndex * 0.02,
                  opacity: isTop ? 1 : 0.8 - stackIndex * 0.15,
                  rotateX: 0,
                  zIndex: visibleImages.length - stackIndex,
                }}
                exit={{
                  y: -50,
                  opacity: 0,
                  scale: 1.05,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transformOrigin: 'center bottom',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                    priority={isTop}
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* "OPEN PROJECT" label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activeProject ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <span className="text-[11px] font-medium uppercase tracking-wide text-white mix-blend-difference">
            Open Project
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * MobileImageStack - Simplified vertical scroll for mobile
 */
export function MobileImageStack({
  projects,
  className,
}: {
  projects: Project[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center gap-4 py-8', className)}>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative w-[90vw] max-w-[350px] aspect-[3/4] overflow-hidden"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="90vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
            <span className="text-[11px] font-medium uppercase text-white opacity-0 hover:opacity-100 transition-opacity">
              {project.number}/ {project.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
