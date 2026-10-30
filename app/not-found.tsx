import type { Metadata } from 'next'
import Link from 'next/link'
import { NAV, Shell } from '@/components/c04/Chrome'

/*
  The 404, for a URL that matches no route and for notFound() raised from a
  page — which is how the unpublished Insights route behaves.

  This was Next's own error page until now: black Helvetica on white, no
  header, no footer, no way back into the site. A visitor who mistyped a URL
  landed somewhere that did not look like P& at all.
*/

export const metadata: Metadata = {
  /* The layout template appends the site name; naming it here doubled it. */
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <Shell>
      <header className="c4-ph">
        <div className="c4-shell">
          <p className="c4-eyebrow">404 · Not found</p>
          <div className="c4-ph__grid">
            <h1 className="c4-h1">
              That page is not here<span className="c4-stop">.</span>
            </h1>
            <div className="c4-ph__aside">
              <p className="c4-lead">
                It may have moved, or the address may have a typo in it. Everything on the site
                is one of the five below.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="c4-sec2">
        <div className="c4-shell">
          <div className="c4-rows c4-rows--top">
            {NAV.map((n, i) => (
              <div className="c4-row c4-row--faq" key={n.href}>
                <span className="c4-row__n">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="c4-row__name">
                  <Link href={n.href}>{n.label}</Link>
                </h2>
                <div className="c4-row__body" />
              </div>
            ))}
          </div>

          <div className="c4-cta">
            <p className="c4-cta__line">
              Or tell us what you were looking for and we will point you at it.
            </p>
            <Link className="c4-btn--line" href="/contact">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  )
}
