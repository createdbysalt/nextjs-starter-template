'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CustomCursorProps {
  className?: string
}

/**
 * CustomCursor - Recreates the small square outline cursor
 * Follows mouse with smooth spring animation
 */
export function CustomCursor({ className }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isClickable)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleElementHover)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleElementHover)
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference',
        className
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ duration: 0.15 }}
    >
      {/* Small square outline - matches original */}
      <div
        className={cn(
          'relative -translate-x-1/2 -translate-y-1/2 border border-white transition-all duration-150',
          isHovering ? 'w-4 h-4' : 'w-2.5 h-2.5'
        )}
      />
    </motion.div>
  )
}
