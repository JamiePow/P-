import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta, Plate, ProvWord, Row } from '@/components/c04/Parts'
import { accountability, ambition, partners, shot } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'About P&',
  description:
    'Three founding partners, three sectors. P& builds technology inside operating businesses, proves it there, and turns what survives into products.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <Shell current="/about">
      <PageHead
        n="04"
        folio="About P&"
        title={<>We built these inside businesses we had to run<span className="c4-stop">.</span></>}
        lead="Three founding partners, three sectors, and the same habit in each of them."
        aside={<p className="c4-body">{ambition}</p>}
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">The partners</h2>
          <div className="c4-people" style={{ marginTop: 'var(--s4)' }}>
            {partners.map((p, i) => (
              <article className="c4-person" key={p.name}>
                <Plate shot={shot(`IMG ${String(8 + i).padStart(2, '0')}`)} compact />
                <h3>
                  {p.name}
                  {'surname' in p && p.surname ? (
                    <>
                      {' '}
                      <ProvWord value={p.surname} />
                    </>
                  ) : null}
                </h3>
                <p className="role c4-label">{p.role}</p>
                <p className="c4-body">{p.body}</p>
              </article>
            ))}
          </div>
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
            line="If that is how you would want it done, the audit is where it starts."
            action="Start a conversation"
            href="/contact"
          />
        </div>
      </section>
    </Shell>
  )
}
