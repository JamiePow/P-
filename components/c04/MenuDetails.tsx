'use client'

import { useEffect, useRef } from 'react'

/*
  The narrow-width menu's container.

  The menu is a native <details>, so it opens, closes and takes keyboard
  input without any script. The one thing the browser will not do for us is
  close it after a navigation: the links route client side, so the document
  is never replaced and the panel stays open over the page the visitor just
  asked for.

  This closes it when a link inside is activated. With scripting off the
  menu still works; the panel simply stays open, which is also what happens
  today and is harmless because that navigation is a full page load.
*/

export default function MenuDetails({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const close = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('a')) el.open = false
    }
    el.addEventListener('click', close)
    return () => el.removeEventListener('click', close)
  }, [])

  return (
    <details className={className} ref={ref}>
      {children}
    </details>
  )
}
