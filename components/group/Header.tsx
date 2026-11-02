'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogoHorizontal } from '@/components/Brand'
import { nav } from '@/lib/group'

/*
  The header.

  Two states and no height change: transparent and light while the hero is
  behind it, ivory with dark type once it has gone. The switch is a scroll
  listener rather than an observer because it has to fire on load too, when
  the browser restores a scroll position partway down the page.

  Below 860px the links collapse into a full-screen sheet. The sheet traps
  nothing and locks nothing except body scroll, closes on Escape and on
  navigation, and the toggle carries aria-expanded so it is announced.
*/
export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hide, setHide] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > window.innerHeight * 0.86)
      /* Retract on the way down, return on the way up. Never while the sheet
         is open, and never past the hero's top, or the header disappears
         before there is anything to scroll back to. */
      setHide(y > window.innerHeight && y > last + 4)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className="g-head"
        data-solid={solid ? 'true' : 'false'}
        data-hide={hide && !open ? 'true' : 'false'}
      >
        <Link href="/" className="g-head__mark" aria-label="Pow & Partners, home">
          <LogoHorizontal />
        </Link>

        <nav className="g-head__nav" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="g-head__link">
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="g-head__toggle"
          aria-expanded={open}
          aria-controls="g-sheet"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      <div className="g-sheet" id="g-sheet" data-open={open ? 'true' : 'false'} aria-hidden={!open}>
        <button type="button" className="g-sheet__close" onClick={() => setOpen(false)}>
          Close
        </button>
        <nav aria-label="Primary, expanded">
          <ul className="g-sheet__list">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="g-sheet__link"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
