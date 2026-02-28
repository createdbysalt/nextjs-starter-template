'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EtienneHeaderProps {
  className?: string
}

export function EtienneHeader({ className }: EtienneHeaderProps) {
  const [time, setTime] = useState<string>('')

  // Live clock - updates every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={cn('px-4 py-2', className)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-[12px] font-semibold text-black hover:opacity-60 transition-opacity"
      >
        <span className="hidden md:inline">Etienne Planeix</span>
        <span className="md:hidden">Etienne</span>
      </Link>

      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <Link
          href="/work"
          className="text-[12px] text-black/40 hover:text-black transition-colors"
        >
          Work
        </Link>
        <Link
          href="/archive"
          className="text-[12px] text-black/40 hover:text-black transition-colors"
        >
          Archive
        </Link>
        <Link
          href="/info"
          className="text-[12px] text-black/40 hover:text-black transition-colors"
        >
          Info
        </Link>
      </nav>

      {/* Live Clock */}
      <div className="text-[12px] font-semibold text-black/50 tabular-nums">
        {time}
      </div>
    </header>
  )
}
