'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Wordmark from './Wordmark'
import { primaryNav } from '@/lib/data'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand ${
        scrolled ? 'bg-page/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className={`shell flex items-center justify-between py-5 ${scrolled ? 'rule border-t-0' : ''}`}>
        <Wordmark />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-300 ease-brand hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="font-mono text-[11px] uppercase tracking-label md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="rule bg-page md:hidden">
          <nav className="shell flex flex-col py-3" aria-label="Primary, mobile">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 font-display text-2xl last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
