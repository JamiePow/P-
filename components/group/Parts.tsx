'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/*
  Two small clients, shared by the homepage.

  Reveal marks its own element rather than wrapping children in an extra div,
  so a panel can be both the revealed element and the grid container. Without
  that the composition needs a wrapper per panel and the grid collapses.

  Ready fires once after mount and drives the hero's opening move: the plate
  settling from a slight overscale and the red rule drawing in. It is one
  gesture on load and nothing after it.
*/

type RevealProps = {
  as?: 'div' | 'section' | 'article' | 'figure'
  className?: string
  children: ReactNode
  margin?: string
}

export function Reveal({ as = 'div', className, children, margin = '0px 0px -90px 0px' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      el.dataset.revealed = 'true'
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          el.dataset.revealed = 'true'
          io.unobserve(el)
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])

  const Tag = as as 'div'
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} data-reveal className={className}>
      {children}
    </Tag>
  )
}

export function Ready({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 60)
    return () => window.clearTimeout(t)
  }, [])
  return (
    <div className="g" data-ready={ready ? 'true' : 'false'}>
      {children}
    </div>
  )
}
