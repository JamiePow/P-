import Link from 'next/link'
import { Plate, Reveal } from './Parts'
import type { Division as D } from '@/lib/group'

/*
  One division of the group.

  This replaces the previous Entry component, which laid the businesses out as
  an offset editorial spread. That read as a magazine feature, not as a group
  site. A corporate group lists its companies in a register: a rule, an index
  number, the name, the market, what it is, where it stands, and a route in.
  Same shape every time, down the page, so four divisions can be compared at a
  glance rather than admired one at a time.

  There is no per-division colour. The verticals are divisions of P& Group
  Ltd, not separate brands, and no brand values exist for them — every colour
  the earlier version carried was invented. The group's red is the only accent
  on the page, and it marks structure, not ownership.
*/
export default function Division({ d, index }: { d: D; index: number }) {
  const n = String(index + 1).padStart(2, '0')

  return (
    <Reveal
      as="article"
      className="g-div"
      index={index}
      margin="0px 0px -80px 0px"
    >
      <p className="g-div__n g-label" aria-hidden="true">
        {n}
      </p>

      <Plate name={d.plate} className="g-div__img" />

      <div className="g-div__body">
        <h3 className="g-div__name">{d.name}</h3>
        <p className="g-div__sector g-label">{d.sector}</p>
        <p className="g-div__summary">{d.summary}</p>
        <p className="g-div__text">{d.body}</p>

        <dl className="g-div__meta">
          <div>
            <dt className="g-label">Status</dt>
            <dd>{d.status}</dd>
          </div>
          <div>
            <dt className="g-label">Proof</dt>
            <dd>{d.proof}</dd>
          </div>
        </dl>

        {/* A route out only where one genuinely exists. */}
        {d.href ? (
          <Link className="g-div__go" href={d.href}>
            {/* Descriptive anchor text: "More on P& Atelier" tells a crawler
                and a screen reader what is at the other end. */}
            <span>More on {d.name}</span>
            <i aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </Reveal>
  )
}
