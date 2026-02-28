'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CathyFooterProps {
  className?: string
}

export function CathyFooter({ className }: CathyFooterProps) {
  return (
    <footer
      className={cn(
        'p-2',
        className
      )}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 52,
      }}
    >
      <motion.a
        href="mailto:cathy.dolle@live.fr"
        className="text-[11px] font-normal uppercase text-black hover:opacity-60 transition-opacity cursor-pointer"
        whileHover={{ x: -2 }}
        transition={{ duration: 0.2 }}
      >
        Contact
      </motion.a>
    </footer>
  )
}

/**
 * MobileFooter - About link positioned at bottom for mobile
 */
export function MobileFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'p-2 md:hidden',
        className
      )}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 52,
      }}
    >
      <button className="text-[11px] font-normal uppercase text-black hover:opacity-60 transition-opacity cursor-pointer">
        About
      </button>
    </footer>
  )
}
