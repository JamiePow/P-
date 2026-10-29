'use client'

/*
  The folio.

  A document carries a running head: where you are, and how far through. The
  site does the same. The bar holds the mark and the navigation; the line
  under it carries the current section and a red hairline that tracks
  progress. It is page furniture made useful rather than decoration.

  This component also switches the reveal on. Until it mounts, every element
  is at its resting state, so a static render, a printed page and a visitor
  with scripting off all see the finished page rather than an empty one.
*/

import { useEffect, useRef, useState } from 'react'
import { LogoHorizontal } from '@/components/Brand'
import { contents, type Entry } from '@/lib/c04'

export default function Folio() {
  const [current, setCurrent] = useState<Entry>(contents[0])
  const bar = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const root = document.querySelector('.c4') as HTMLElement | null
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Reveal, only once the script is running. */
    let io: IntersectionObserver | null = null
    if (!reduce && 'IntersectionObserver' in window) {
      root.setAttribute('data-reveal', 'on')
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in')
              io?.unobserve(e.target)
            }
          })
        },
        { rootMargin: '0px 0px -12% 0px' },
      )
      root.querySelectorAll('[data-reveal]').forEach((el) => io?.observe(el))
    }

    /* The running head and the progress hairline. */
    const sections = contents
      .map((c) => ({ ...c, el: document.getElementById(c.id) }))
      .filter((c) => c.el)

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY + 140
        let found = sections[0]
        for (const s of sections) if (s.el && s.el.offsetTop <= y) found = s
        setCurrent((prev) => (prev.id === found.id ? prev : found))

        const max = document.body.scrollHeight - window.innerHeight
        const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        bar.current?.style.setProperty('width', `${(pct * 100).toFixed(2)}%`)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      io?.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="c4-folio">
      <div className="c4-shell">
        <div className="c4-folio__bar">
          <a href="#hero" className="c4-folio__mark" aria-label="Pow and Partners, top of page">
            <LogoHorizontal />
          </a>
          {/* On a phone the inline links give way to an index the visitor
              opens. It is a details element, so it needs no script, keeps
              keyboard operation and stays in the document's own language. */}
          <details className="c4-menu" ref={menu}>
            <summary>Index</summary>
            <ul>
              {contents.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    onClick={() => {
                      if (menu.current) menu.current.open = false
                    }}
                  >
                    <span className="n">{c.n}</span>
                    <span className="t">{c.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <nav className="c4-folio__nav" aria-label="Sections">
            <a href="#changes">What changes</a>
            <a href="#solutions">Solutions</a>
            <a href="#approach">Approach</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#closing" className="c4-folio__cta">
              Start a conversation
            </a>
          </nav>
        </div>
        <div className="c4-folio__run">
          <span aria-live="polite">
            {current.n} · {current.title}
          </span>
          <span>P&amp; · Elevated Editorial · 09 sections</span>
        </div>
      </div>
      <span className="c4-folio__progress" ref={bar} aria-hidden="true" />
    </header>
  )
}
