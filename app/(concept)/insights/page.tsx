import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { notFound } from 'next/navigation'
import { insights, insightsPublished } from '@/lib/insights'
import { robotsPolicy } from '@/lib/env'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Notes on connected operations, written from the work rather than from the category. Nothing is published until it has been used.',
  alternates: { canonical: '/insights' },
  /* A second lock, independent of the 404 and of robots.txt. */
  robots: insightsPublished ? robotsPolicy : { index: false, follow: false },
}

export default function InsightsPage() {
  /* Nothing is written yet. Rather than publish an empty state explaining
     that, which read as development commentary on a customer-facing page,
     the route is simply not there until the first piece exists. */
  if (!insightsPublished) notFound()

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
        </div>
      </section>
    </Shell>
  )
}
