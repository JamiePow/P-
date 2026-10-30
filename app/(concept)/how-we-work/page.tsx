import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta, Row } from '@/components/c04/Parts'
import { accountability, stages, stagesNote } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'How we work',
  description:
    'Every engagement starts with an audit: time with the people doing the work, measuring where the hours go, before anything is built. The audit is £3,500 and the findings are yours.',
  alternates: { canonical: '/how-we-work' },
}

/*
  Replaces /approach, which sat on the old shell, used internal vocabulary in
  its headline ("One loop, run in three markets") and duplicated a homepage
  section in a different voice. One page, one voice, the five approved stages.
*/

export default function HowWeWorkPage() {
  return (
    <Shell current="/how-we-work">
      <PageHead
        n="03"
        folio="How we work"
        title={
          <>
            How an engagement runs<span className="c4-stop">.</span>
          </>
        }
        lead="It begins with an audit. We spend time with the people doing the work and measure where the hours go, before anything is designed or built."
        aside={
          <p className="c4-note">
            <span className="c4-label">The first commitment</span>
            <br />
            The audit is the only thing you commit to at the start. It costs £3,500 and you keep the
            findings whether or not we go any further.
          </p>
        }
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">The five stages</h2>
          <div className="c4-rows c4-rows--top" style={{ marginTop: 'var(--s4)' }}>
            {stages.map((s) => (
              <div
                className={`c4-row c4-row--stage${s.flag ? ' is-marked' : ''}`}
                key={s.n}
                data-reveal
              >
                <span className="c4-row__n">Stage {s.n}</span>
                <div className="c4-row__head">
                  <p className="c4-stage__cadence">
                    <span className="c4-label">{s.cadence}</span>
                    {s.flag ? <span className="c4-label c4-label--red">{s.flag}</span> : null}
                  </p>
                  <h3 className="c4-row__name">{s.name}</h3>
                </div>
                <div className="c4-row__body">{s.body}</div>
              </div>
            ))}
          </div>
          <p className="c4-note c4-stages__note">{stagesNote}</p>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">How we hold ourselves to it</h2>
          <div className="c4-rows" style={{ marginTop: 'var(--s4)' }}>
            {accountability.map((a, i) => (
              <Row key={a.name} n={String(i + 1).padStart(2, '0')} name={a.name}>
                {a.body}
              </Row>
            ))}
          </div>
          <Cta
            line="Most of this is visible in an hour with the people doing the work."
            action="Ask about the audit"
            href="/contact"
          />
        </div>
      </section>
    </Shell>
  )
}
