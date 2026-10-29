/* ------------------------------------------------------------------------ *
 * Solutions.tsx
 *
 * Three solutions, one design system, three compositions.
 *
 * Everything here uses the approved P& palette, Instrument Serif for display,
 * Inter for body and IBM Plex Mono for technical labels. There is no product
 * logo, no product palette and no product typeface anywhere in this file.
 * The three compositions differ in structure and subject, which is where the
 * differentiation is supposed to come from:
 *
 *   Atelier    intimate and asymmetric. A tall portrait holds the left, the
 *              copy sits in a short measure, and the jewellery data model is
 *              set as a small precise specimen.
 *   Nexus      wide and horizontal. A landscape band, a full-width operational
 *              flow, and the commercial beats in a structured row.
 *   Blueprint  a drawing sheet. Title block, references, dimension rules and
 *              a document hierarchy, used as an editorial device.
 * ------------------------------------------------------------------------ */

import { Chip, Plate } from './Parts'
import { AtelierSpec, BlueprintArt, BlueprintArtTall, NexusArt, NexusArtTall } from './SolutionArt'
import { missingAssets, shot, type Solution } from '@/lib/c04'

/* The four commercial beats, in the order a buyer needs them. */
function Beats({ s, variant }: { s: Solution; variant: 'stack' | 'row' | 'sheet' }) {
  const beats: [string, string][] = [
    ['The problem', s.problem],
    ['What we build', s.response],
    ['What changes', s.improvement],
    ['Why it is worth it', s.commercial],
  ]
  if (variant === 'sheet') {
    return (
      <div className="c4-bp__beats">
        {beats.map(([k, v], i) => (
          <div className="c4-bp__beat" key={k}>
            <span className="c4-bp__ref">{String.fromCharCode(65 + i)}</span>
            <span className="c4-label">{k}</span>
            <p className="c4-body">{v}</p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={variant === 'row' ? 'c4-beats c4-beats--row' : 'c4-beats'}>
      {beats.map(([k, v], i) => (
        <div className="c4-beat" key={k}>
          <span className="c4-label">
            {String(i + 1).padStart(2, '0')} · {k}
          </span>
          <p className={i === 0 ? 'c4-beat__lead' : 'c4-body'}>{v}</p>
        </div>
      ))}
    </div>
  )
}

function Does({ items, cols }: { items: string[]; cols?: boolean }) {
  return (
    <div className="c4-does">
      <p className="c4-label">What it covers</p>
      <ul className={cols ? 'c4-does__list c4-does__list--two' : 'c4-does__list'}>
        {items.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  )
}

function Head({ s }: { s: Solution }) {
  return (
    <div className="c4-sol__head">
      <p className="c4-label">
        Solution {s.n} · {s.sector}
      </p>
      <h3 className="c4-sol__name">{s.name}</h3>
    </div>
  )
}

/* ------------------------------------------------------------- Atelier -- */

function Atelier({ s }: { s: Solution }) {
  return (
    <article className="c4-atl" id={s.name.toLowerCase()} data-reveal>
      <div className="c4-atl__left">
        <div className="c4-atl__fig">
          <Plate shot={shot(s.img)} compact />
        </div>
        <AtelierSpec />
        {s.imgB ? (
          <div className="c4-atl__fig2">
            <Plate shot={shot(s.imgB)} compact />
          </div>
        ) : null}
      </div>
      <div className="c4-atl__right">
        <div className="c4-atl__copy">
          <Head s={s} />
          <Beats s={s} variant="stack" />
          <p className="c4-sol__status">
            <Chip open={s.open}>{s.status}</Chip>
          </p>
        </div>
        <Does items={s.does} />
      </div>
    </article>
  )
}

/* --------------------------------------------------------------- Nexus -- */

function Nexus({ s }: { s: Solution }) {
  const gap = missingAssets.find((m) => m.place.startsWith('Nexus'))
  return (
    <article className="c4-nex" id={s.name.toLowerCase()} data-reveal>
      <div className="c4-nex__head">
        <Head s={s} />
        <p className="c4-sol__status">
          <Chip open={s.open}>{s.status}</Chip>
        </p>
      </div>
      <div className="c4-nex__band">
        <Plate shot={shot(s.img)} compact />
      </div>
      <div className="c4-nex__flow">
        <p className="c4-label">How the work moves</p>
        <NexusArt />
        <NexusArtTall />
      </div>
      <Beats s={s} variant="row" />
      {gap ? (
        <div className="c4-nex__gap">
          <p className="c4-label">
            {gap.ref} · {gap.place}
          </p>
          <p className="c4-small">{gap.what}</p>
        </div>
      ) : null}
      <Does items={s.does} cols />
    </article>
  )
}

/* ----------------------------------------------------------- Blueprint -- */

function Blueprint({ s }: { s: Solution }) {
  return (
    <article className="c4-bp" id={s.name.toLowerCase()} data-reveal>
      <div className="c4-bp__sheet">
        <div className="c4-bp__title">
          <span className="c4-label">DWG · Solution {s.n}</span>
          <span className="c4-label">{s.sector}</span>
          <span className="c4-label">Status · proposed</span>
        </div>

        <div className="c4-bp__body">
          <div className="c4-bp__lead">
            <Head s={s} />
            <p className="c4-sol__status">
              <Chip open={s.open}>{s.status}</Chip>
            </p>
            <div className="c4-bp__art">
              <BlueprintArt />
              <BlueprintArtTall />
            </div>
          </div>

          <Beats s={s} variant="sheet" />

          <div className="c4-bp__figs">
            <Plate shot={shot(s.img)} compact />
            {s.imgB ? <Plate shot={shot(s.imgB)} compact /> : null}
          </div>

          <div className="c4-bp__does">
            <Does items={s.does} cols />
          </div>
        </div>

        <div className="c4-bp__foot">
          <span className="c4-label">Capabilities proposed, not released</span>
          <span className="c4-label">Drawing language used as an editorial device</span>
        </div>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------------- */

export default function Solutions({ items }: { items: Solution[] }) {
  return (
    <>
      {items.map((s) =>
        s.treatment === 'atelier' ? (
          <Atelier s={s} key={s.n} />
        ) : s.treatment === 'nexus' ? (
          <Nexus s={s} key={s.n} />
        ) : (
          <Blueprint s={s} key={s.n} />
        ),
      )}
    </>
  )
}
