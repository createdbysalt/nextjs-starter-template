'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CarouselProject {
  id: string
  name: string
  slug: string
  image: string
  color?: string
}

interface Carousel3DProps {
  projects: CarouselProject[]
  className?: string
}

/**
 * Carousel3D - 3D rotating carousel of project cards
 * Recreates the etienne.studio homepage effect
 */
export function Carousel3D({ projects, className }: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Rotation state
  const rotationY = useMotionValue(0)
  const smoothRotation = useSpring(rotationY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

  // Calculate angle per card
  const anglePerCard = 360 / projects.length
  const radius = 530 // Matches original

  // Auto-rotation when not dragging
  useEffect(() => {
    if (isDragging) return

    let animationId: number
    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const delta = (now - lastTime) / 1000
      lastTime = now

      // Slow auto-rotation (5 degrees per second)
      rotationY.set(rotationY.get() + delta * 5)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isDragging, rotationY])

  // Handle drag
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const deltaX = clientX - centerX

    // Convert drag to rotation
    rotationY.set(rotationY.get() + deltaX * 0.5)
  }

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: '1400px',
      }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleDrag}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleDrag}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateY: smoothRotation,
        }}
      >
        {projects.map((project, index) => {
          const angle = index * anglePerCard

          return (
            <CarouselCard
              key={project.id}
              project={project}
              angle={angle}
              radius={radius}
              parentRotation={smoothRotation}
            />
          )
        })}
      </motion.div>

      {/* Center dark area (like original) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[50%] h-[50%] bg-black rounded-sm"
          style={{ maxWidth: '600px', maxHeight: '400px' }}
        />
      </div>
    </div>
  )
}

interface CarouselCardProps {
  project: CarouselProject
  angle: number
  radius: number
  parentRotation: ReturnType<typeof useMotionValue<number>>
}

function CarouselCard({ project, angle, radius, parentRotation }: CarouselCardProps) {
  // Calculate if card is facing front
  const opacity = useTransform(parentRotation, (rotation) => {
    const cardAngle = (angle + rotation) % 360
    const normalizedAngle = cardAngle < 0 ? cardAngle + 360 : cardAngle

    // Cards at back (around 180°) are less visible
    if (normalizedAngle > 90 && normalizedAngle < 270) {
      return 0.3
    }
    return 1
  })

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        opacity,
      }}
    >
      <Link
        href={`/cases/${project.slug}`}
        className="block relative overflow-hidden group cursor-pointer"
        style={{
          width: '280px',
          height: '380px',
        }}
      >
        <div className="relative w-full h-full bg-neutral-100 overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="280px"
          />
        </div>

        {/* Hover overlay with project name */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-4">
          <span className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {project.name}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/**
 * SimpleCarousel - Fallback horizontal scroll carousel for reduced motion
 */
export function SimpleCarousel({
  projects,
  className,
}: {
  projects: CarouselProject[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 py-8',
        'scrollbar-hide',
        className
      )}
    >
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/cases/${project.slug}`}
          className="flex-shrink-0 snap-center"
        >
          <div className="relative w-[280px] h-[380px] bg-neutral-100 overflow-hidden group">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="280px"
            />
          </div>
          <p className="mt-2 text-[12px] text-black/60">{project.name}</p>
        </Link>
      ))}
    </div>
  )
}

// Default projects matching the original site
export const defaultEtienneProjects: CarouselProject[] = [
  {
    id: '1',
    name: 'Studio Pomelo',
    slug: 'studiopomelo',
    image: '/projects/studiopomelo.jpg',
  },
  {
    id: '2',
    name: 'Bret',
    slug: 'bret',
    image: '/projects/bret.jpg',
  },
  {
    id: '3',
    name: 'Recsound',
    slug: 'recsound',
    image: '/projects/recsound.jpg',
  },
  {
    id: '4',
    name: 'Archive',
    slug: 'archive',
    image: '/projects/archive.jpg',
  },
  {
    id: '5',
    name: 'Seepje',
    slug: 'seepje',
    image: '/projects/seepje.jpg',
  },
]
