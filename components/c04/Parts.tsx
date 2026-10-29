/*
  Concept 04 primitives.

  Six pieces carry almost the whole page: the eyebrow, the section head, the
  hairline row, the art-direction plate, the chip and the call to action.
  Everything else is composition. Keeping them here is what stops the concept
  drifting back into a page of cards.
*/

import type { CSSProperties, ReactNode } from 'react'
import type { Provisional, Shot } from '@/lib/c04'

/* The eyebrow: a short red rule, then the folio, on one line. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="c4-eyebrow">{children}</p>
}

/* An inline marker for a word that has not been supplied or approved. */
export function PW({ children }: { children: ReactNode }) {
  return <span className="c4-pw">{children}</span>
}

export function ProvWord({ value }: { value: Provisional }) {
  return <PW>{value.provisional}</PW>
}

/*
  The art-direction plate.

  Not a grey rectangle standing in for a picture. It occupies the exact space
  and ratio the photograph will occupy, carries its own reference number, and
  prints the brief a photographer would shoot from: subject, composition,
  lighting and ratio. The faint thirds mark the frame. It is set in the page's
  own type, so the layout can be judged before a single image exists.
*/
export function Plate({
  shot,
  className = '',
  compact = false,
}: {
  shot: Shot
  className?: string
  compact?: boolean
}) {
  const style = { '--ar': shot.ratio, '--ar-m': shot.mobile } as CSSProperties
  return (
    <figure className={`c4-plate${compact ? ' c4-plate--compact' : ''} ${className}`} style={style}>
      <span className="c4-plate__guides" aria-hidden="true" />
      <span className="c4-plate__ref">{shot.ref}</span>
      <p className="c4-plate__subject">{shot.subject}</p>
      <div className="c4-plate__spec">
        <p>{shot.composition}</p>
        <p className="c4-plate__meta">
          <span>{shot.lighting}</span>
          <span>{shot.ratio.replace(' / ', ':')} · to be commissioned</span>
        </p>
      </div>
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

/* The index strip. The contents list from the proposal, compressed into a
   single band under the hero so that the right column can carry a picture.
   It is still the document's contents, and it is still navigation. */
export function IndexStrip({
  items,
}: {
  items: { n: string; id: string; short: string }[]
}) {
  return (
    <nav className="c4-index" aria-label="Contents">
      {items.map((c) => (
        <a key={c.id} href={`#${c.id}`}>
          <span className="n">{c.n}</span>
          <span className="t">{c.short}</span>
        </a>
      ))}
    </nav>
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
