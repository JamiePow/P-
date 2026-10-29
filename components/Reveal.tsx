'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type RevealProps = { children: ReactNode; delay?: number; className?: string }

/*
  Restrained scroll reveal. The movement is small on purpose.

  This used to be a framer-motion component, which put about 45KB of
  JavaScript on every page of the site for one fade. The same effect is a
  CSS transition and an IntersectionObserver, which is what the concept
  route already does. Nothing about the result changed.

  Reduced motion is honoured in CSS as well as here, so the fallback holds
  even before this component hydrates.
*/
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      el.dataset.revealed = 'true'
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.style.transitionDelay = `${delay}s`
          el.dataset.revealed = 'true'
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}
