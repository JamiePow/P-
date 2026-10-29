import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { insights } from '@/lib/insights'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Notes on connected operations, written from the work rather than from the category. Nothing is published until it has been used.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <Shell current="/insights">
      <PageHead
        n="05"
        folio="Insights"
        title={<>Written from the work<span className="c4-stop">.</span></>}
        lead="Notes on connected operations, taken from engagements rather than from the category."
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          {insights.length === 0 ? (
            <div className="c4-empty">
              <p className="c4-label">Nothing published yet</p>
              <p className="c4-body" style={{ maxWidth: '46ch' }}>
                This page is built and the route is live. It is empty because nothing has been
                written yet, and a page of invented thought leadership would be worse than an
                honest gap.
              </p>
              <p className="c4-body" style={{ maxWidth: '46ch' }}>
                Pieces drop in through the content file with a title, a date, a standfirst and a
                body. No layout work is needed to publish the first one.
              </p>
              <Link className="c4-btn--line" href="/contact">
                Ask us something instead
              </Link>
            </div>
          ) : (
            <div className="c4-rows">
              {insights.map((item) => (
                <article className="c4-row" key={item.slug}>
                  <span className="c4-row__n">{item.date}</span>
                  <div className="c4-row__head">
                    <h2 className="c4-row__name">{item.title}</h2>
                  </div>
                  <div className="c4-row__body">{item.standfirst}</div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Shell>
  )
}
