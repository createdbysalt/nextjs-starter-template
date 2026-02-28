'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CathyHeaderProps {
  className?: string
}

export function CathyHeader({ className }: CathyHeaderProps) {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'p-2',
          className
        )}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 52,
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 'normal' }}>
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <h1 className="text-black">Cathy Dolle</h1>
          </Link>

          {/* View Toggle - Desktop only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="cursor-pointer text-black">List</button>
            <span className="text-neutral-400">Slider</span>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="cursor-pointer hidden md:block hover:opacity-60 transition-opacity"
            >
              about
            </button>

            <Link
              href="/shop"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <svg
                width="16"
                height="11"
                viewBox="0 0 359 237"
                fill="currentColor"
                className="text-black"
              >
                <rect x="0" y="0" width="160" height="110" />
                <rect x="199" y="0" width="160" height="110" />
                <rect x="0" y="127" width="160" height="110" />
                <rect x="199" y="127" width="160" height="110" />
              </svg>
              <span>Shop</span>
            </Link>

            <Link
              href="/playground"
              className="cursor-pointer hover:opacity-60 transition-opacity"
            >
              Playground
            </Link>
          </nav>
        </div>
      </header>

      {/* About Panel Overlay */}
      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="max-w-xl mx-auto pt-32 px-8 text-[11px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-normal uppercase mb-6">Designer & Coder</h3>
              <p className="font-normal leading-relaxed mb-8">
                Cathy Dolle is a designer and front-end developer who creates
                simple, thoughtful digital experiences with a minimalist,
                detail-driven approach. She enjoys shaping quiet, refined
                identities and occasionally shares her creative process on Twitch.
              </p>

              <p className="font-normal text-neutral-500 mb-8">
                Developed by Martin Cantony
              </p>

              <div className="flex flex-col gap-2 font-normal">
                <a
                  href="mailto:cathy.dolle@live.fr"
                  className="hover:opacity-60 transition-opacity"
                >
                  cathy.dolle@live.fr
                </a>
                <a
                  href="https://www.instagram.com/katy_v4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href="https://www.twitch.tv/katy_v4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  Twitch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
