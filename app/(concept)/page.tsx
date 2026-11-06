import Link from 'next/link'
import type { Metadata } from 'next'
import { Monogram } from '@/components/Brand'
import Header from '@/components/group/Header'
import Division from '@/components/group/Division'
import { Plate, Ready, Reveal } from '@/components/group/Parts'
import { belief, contact, divisions, group, hero, model, portfolio } from '@/lib/group'
import { site } from '@/lib/data'

import '../group.css'

/*
  The P& group homepage.

  Structured as a corporate group site rather than an editorial feature: what
  the group is, what it sells, how it works, which divisions it holds, and how
  to reach it. Each section is a real section with a real heading and real
  prose — the previous version carried one display line per screen, which read
  well and ranked for nothing.

  Section order is deliberate and conventional, because conventional is what
  a group site is for. A visitor who has never heard of P& should be able to
  answer "what is this company, and what does it own" inside two screens.

  No package pricing anywhere. Commercial terms belong to each division's own
  site, not to the group.
*/

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Innovation group | Ideas, made valuable` },
  description:
    'P& is an innovation group building technology, brands and businesses across jewellery commerce, operations software and construction. We prove platforms inside real trading businesses, then take them to market.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Innovation group`,
    description:
      'An innovation group building technology, brands and businesses. Four divisions, four markets, one way of working.',
  },
}

export default function Home() {
  return (
    <Ready>
      <a className="g-skip" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* ------------------------------------------- 01 · masthead --- */}
        <section className="g-mast on-dark" aria-labelledby="g-mast-h">
          <div className="g-mast__img">
            <Plate name="hero" className="g-mast__plate" priority />
          </div>

          <div className="g-mast__in">
            <div className="g-mast__rule" aria-hidden="true" />
            <h1 className="g-mast__h" id="g-mast-h">
              {hero.headline}
              <span className="g-dot">.</span>
            </h1>
            <p className="g-mast__sub">{hero.standfirst}</p>
          </div>

          <dl className="g-facts">
            {hero.facts.map(([k, v]) => (
              <div key={k} className="g-facts__i">
                <dt className="g-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------ 02 · the group --- */}
        <section className="g-sec g-group" aria-labelledby="g-group-h">
          <div className="g-sec__in">
            <Reveal className="g-sec__head">
              <p className="g-eyebrow">{group.eyebrow}</p>
              <h2 className="g-display g-sec__h" id="g-group-h">
                {group.heading}
                <span className="g-dot">.</span>
              </h2>
            </Reveal>

            <div className="g-group__grid">
              <Reveal className="g-group__text" index={1}>
                {group.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </Reveal>

              <Reveal className="g-group__offer" as="div" index={2}>
                <h3 className="g-offer__h g-label">What every division sells</h3>
                <dl>
                  {group.offer.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --------------------------------------------- 03 · model --- */}
        <section className="g-sec g-model" aria-labelledby="g-model-h">
          <div className="g-sec__in">
            <div className="g-model__grid">
              <Plate name="model" className="g-model__fig" />

              <div>
                <Reveal className="g-sec__head">
                  <p className="g-eyebrow">{model.eyebrow}</p>
                  <h2 className="g-display g-sec__h" id="g-model-h">
                    {model.heading}
                    <span className="g-dot">.</span>
                  </h2>
                  <p className="g-model__lead">{model.body}</p>
                </Reveal>

                {/* Reveal renders the <li> itself: wrapping each item in a
                    div put non-<li> children directly inside the <ol>. */}
                <ol className="g-steps">
                  {model.steps.map(([name, body], i) => (
                    <Reveal as="li" key={name} className="g-step" index={i}>
                      <span className="g-step__n g-label" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3>{name}</h3>
                      <p>{body}</p>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- 04 · businesses --- */}
        <section className="g-sec g-folio" id="businesses" aria-labelledby="g-folio-h">
          <div className="g-sec__in">
            <Reveal className="g-sec__head">
              <p className="g-eyebrow">{portfolio.eyebrow}</p>
              <h2 className="g-display g-sec__h" id="g-folio-h">
                {portfolio.heading}
                <span className="g-dot">.</span>
              </h2>
              <p className="g-folio__lead">{portfolio.standfirst}</p>
            </Reveal>

            <div className="g-folio__list">
              {divisions.map((d, i) => (
                <Division key={d.key} d={d} index={i} />
              ))}
            </div>

            <p className="g-folio__note">{portfolio.note}</p>
          </div>
        </section>

        {/* -------------------------------------------- 05 · belief --- */}
        <section className="g-belief on-dark" aria-labelledby="g-belief-h">
          <div className="g-belief__in">
            <Reveal>
              <p className="g-eyebrow">{belief.eyebrow}</p>
            </Reveal>
            <Reveal as="div" index={1}>
              <h2 className="g-belief__h" id="g-belief-h">
                {belief.heading}
                <span className="g-dot">.</span>
              </h2>
            </Reveal>
            <Reveal className="g-belief__text" index={2}>
              <p>{belief.body}</p>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------- 06 · close --- */}
        <div className="g-red">
          <Reveal className="g-red__in">
            <span className="g-red__mark">
              <Monogram />
            </span>
            <p className="g-red__line">{contact.signoff}.</p>
          </Reveal>
        </div>

        <section className="g-close on-dark" aria-labelledby="g-close-h">
          <Plate name="close" className="g-close__img" />
          <Reveal className="g-close__in">
            <div>
              <p className="g-eyebrow">{contact.eyebrow}</p>
              <h2 className="g-display g-close__h" id="g-close-h">
                {contact.heading}
                <span className="g-dot">.</span>
              </h2>
              <p className="g-close__text">{contact.body}</p>
            </div>
            <Link className="g-close__cta" href="/contact">
              <span>{contact.cta}</span>
              <i aria-hidden="true" />
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="g-foot">
        <div className="g-foot__in g-label">
          <span>
            {site.name} · {new Date().getFullYear()}
          </span>
          <nav className="g-foot__links" aria-label="Legal">
            <Link href="/about">About</Link>
            <Link href="/what-we-do">What we do</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </Ready>
  )
}
