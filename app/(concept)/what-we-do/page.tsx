import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta, Row } from '@/components/c04/Parts'
import SystemsFigure from '@/components/c04/SystemsFigure'
import { auditCommitmentLine, changes, ctas, observations, outcomes, stages } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'P& connects the systems a business already runs, removes repetitive work and recovers operating time. The audit comes first, and you keep it either way.',
  alternates: { canonical: '/what-we-do' },
}

export default function WhatWeDo() {
  return (
    <Shell current="/what-we-do">
      <PageHead
        n="01"
        folio="What we do"
        title={<>We connect what you already run<span className="c4-stop">.</span></>}
        lead="Every system in the business does its job. The time disappears in the handovers between them, and it never appears on a budget line."
        aside={
          <p className="c4-body">
            Replacement is a last resort rather than an opening position. We start with the systems
            in use, build to the interfaces their vendors publish, and remove the keying between
            them.
          </p>
        }
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">What it looks like now</h2>
          <ul className="c4-obs" style={{ marginTop: 'var(--s4)' }}>
            {observations.map((o) => (
              <li key={o.n}>
                <span className="c4-label">{o.n}</span>
                <span className="c4-obs__t">{o.text}</span>
                <span className="c4-label">{o.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">What changes</h2>
          <div className="c4-grid3" style={{ marginTop: 'var(--s4)' }}>
            {changes.map((c) => (
              <article className="c4-card" key={c.n}>
                <p className="c4-label">{c.n}</p>
                <h3>{c.name}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 'var(--s6)' }}>
            <SystemsFigure />
          </div>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell c4-split">
          <div>
            <h2 className="c4-eyebrow">What you can expect</h2>
            <p className="c4-body" style={{ marginTop: 'var(--s3)' }}>
              Stated as outcomes rather than as figures. We do not publish savings percentages we
              have not measured in your business.
            </p>
          </div>
          <ul className="c4-does__list">
            {outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">How the work runs</h2>
          <div className="c4-rows" style={{ marginTop: 'var(--s4)' }}>
            {stages.map((s) => (
              <Row key={s.n} n={`Stage ${s.n}`} name={s.name} meta={<span className="c4-label">{s.cadence}</span>}>
                {s.body}
              </Row>
            ))}
          </div>
          <Cta line={auditCommitmentLine} action="Ask about the audit" href="/contact" />
        </div>
      </section>
    </Shell>
  )
}
