'use client'

import { cn } from '@/lib/utils'

interface EtienneFooterProps {
  className?: string
}

export function EtienneFooter({ className }: EtienneFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn('px-4 py-4', className)}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '16px',
        backgroundColor: 'white',
      }}
    >
      {/* Copyright */}
      <div className="text-[12px] text-black">
        <span>© </span>
        <span>{currentYear} </span>
        <span>Etienne Planeix</span>
      </div>

      {/* Social Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
        <a
          href="https://www.instagram.com/eplaneix/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/40 hover:text-black transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/etienne-planeix-05119176/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/40 hover:text-black transition-colors"
        >
          Linkedin
        </a>
        <a
          href="https://www.behance.net/thatfrenchguy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/40 hover:text-black transition-colors"
        >
          Behance
        </a>
      </div>

      {/* Contact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', textAlign: 'right' }}>
        <a
          href="mailto:e.planeix@gmail.com"
          className="text-black/40 hover:text-black transition-colors"
        >
          e.planeix@gmail.com
        </a>
        <a
          href="tel:+31621613350"
          className="text-black/40 hover:text-black transition-colors"
        >
          (+31) 6 216 133 50
        </a>
      </div>
    </footer>
  )
}
