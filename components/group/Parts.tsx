'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { img, src } from '@/lib/group'

/*
  The small clients the homepage is built from.

  Reveal marks its own element rather than wrapping children in an extra div,
  so a section can be both the revealed element and the grid container.

  Plate is the image primitive. It carries an art-directed mobile crop via
  <picture>, and the reveal is a clip-path wipe with the photograph easing
  down in scale inside it — frame and contents moving at different rates,
  which is what separates a reveal from a fade.

  next/image is deliberately absent from this codebase, and a composed crop
  per breakpoint is what <picture> does natively.
*/

type RevealProps = {
  as?: 'div' | 'section' | 'article' | 'figure'
  className?: string
  children: ReactNode
  margin?: string
  /** Stagger siblings by this many ms, capped at four steps. */
  index?: number
}

function useReveal(margin: string, index?: number) {
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
          if (index) el.style.transitionDelay = `${Math.min(index, 4) * 90}ms`
          el.dataset.revealed = 'true'
          io.unobserve(el)
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin, index])
  return ref
}

export function Reveal({
  as = 'div',
  className,
  children,
  margin = '0px 0px -90px 0px',
  index,
}: RevealProps) {
  const ref = useReveal(margin, index)
  const Tag = as as 'div'
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} data-reveal className={className}>
      {children}
    </Tag>
  )
}

export function Plate({
  name,
  className,
  priority,
  sizes,
}: {
  name: keyof typeof img | string
  className?: string
  priority?: boolean
  /** Width the mobile source applies below. */
  sizes?: string
}) {
  const ref = useReveal('0px 0px -60px 0px')
  const meta = img[name]
  const media = sizes ?? '(max-width: 860px)'
  return (
    <figure
      ref={ref as React.Ref<HTMLElement>}
      data-plate
      className={className}
      {...(priority ? {} : { 'data-reveal-plate': 'true' })}
    >
      <picture>
        <source media={media} srcSet={src(name as string, true)} />
        <img
          src={src(name as string)}
          alt={meta.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' as const } : {})}
        />
      </picture>
    </figure>
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
