/*
  Concept 04 primitives.

  Six pieces carry almost the whole page: the eyebrow, the section head, the
  hairline row, the art-direction plate, the chip and the call to action.
  Everything else is composition. Keeping them here is what stops the concept
  drifting back into a page of cards.
*/

import type { CSSProperties, ReactNode } from 'react'
import type { Shot } from '@/lib/c04'

/* The eyebrow: a short red rule, then the folio, on one line. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="c4-eyebrow">{children}</p>
}

/*
  The composed editorial plate.

  Not a grey rectangle, and no longer a brief printed at the customer. It
  occupies the exact space and ratio the photograph will occupy and presents
  its subject as an editorial caption set in the display face, with a red
  reference tick and a discreet format note. It is a deliberate device that
  reads as finished, and it is honestly labelled.

  The commissioning direction for each frame — composition, lighting, the
  delivered width — stays in lib/c04.ts for the asset register and for the
  photographer. None of it is rendered here.

  When a photograph arrives, pass `src` and the plate becomes the picture at
  the same ratio in the same place, so nothing in the layout moves.
*/
export function Plate({
  shot,
  className = '',
  variant = 'inset',
  src,
  priority = false,
}: {
  shot: Shot
  className?: string
  variant?: 'inset' | 'band' | 'portrait'
  src?: string
  priority?: boolean
}) {
  const style = { '--ar': shot.ratio, '--ar-m': shot.mobile } as CSSProperties
  const cls = `c4-plate c4-plate--${variant} ${className}`.trim()

  if (src) {
    return (
      <figure className={cls} style={style} data-filled="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={shot.subject}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
        />
      </figure>
    )
  }

  return (
    <figure className={cls} style={style}>
      <span className="c4-plate__rule" aria-hidden="true" />
      <span className="c4-plate__ref">{shot.ref}</span>
      <p className="c4-plate__subject">{shot.subject}</p>
      <span className="c4-plate__fmt">{shot.ratio.replace(' / ', ':')}</span>
    </figure>
  )
}

export function Chip({ children, open = false }: { children: ReactNode; open?: boolean }) {
  return (
    <span className="c4-chip">
      <span className={open ? 'c4-pip c4-pip--open' : 'c4-pip'} />
      {children}
    </span>
  )
}

/* The section head: folio and headline on the left, the standfirst opposite.
   The headline is set in the display face and closed by a red full stop. */
export function SectionHead({
  n,
  folio,
  title,
  stop = true,
  aside,
  id,
}: {
  n: string
  folio: string
  title: ReactNode
  stop?: boolean
  aside?: ReactNode
  id?: string
}) {
  return (
    <header className="c4-head" data-reveal>
      <div>
        <Eyebrow>
          {n} · {folio}
        </Eyebrow>
        <h2 className="c4-h2" id={id}>
          {title}
          {stop ? <span className="c4-stop">.</span> : null}
        </h2>
      </div>
      {aside ? <div className="c4-head__aside">{aside}</div> : <div />}
    </header>
  )
}

/* The hairline row. Numeral, name, description. On a phone the numeral and
   the name share a line and the description indents under both. */
export function Row({
  n,
  name,
  meta,
  children,
  lead = false,
}: {
  n: string
  name: ReactNode
  meta?: ReactNode
  children: ReactNode
  lead?: boolean
}) {
  return (
    <div className={lead ? 'c4-row c4-row--lead' : 'c4-row'} data-reveal>
      <span className="c4-row__n">{n}</span>
      <div className="c4-row__head">
        <h3 className="c4-row__name">{name}</h3>
        {meta ? <div className="c4-row__meta">{meta}</div> : null}
      </div>
      <div className="c4-row__body">{children}</div>
    </div>
  )
}

/* A call to action written as a continuation of the section above it, not as
   a banner. One line of reasoning, one action, one red hairline. */
export function Cta({
  line,
  action,
  href = '#closing',
}: {
  line: string
  action: string
  href?: string
}) {
  return (
    <div className="c4-cta" data-reveal>
      <p className="c4-cta__line">{line}</p>
      <a className="c4-btn--line" href={href}>
        {action}
      </a>
    </div>
  )
}
