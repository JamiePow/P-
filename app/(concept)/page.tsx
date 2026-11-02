import Link from 'next/link'
import type { Metadata } from 'next'
import { Monogram } from '@/components/Brand'
import Header from '@/components/group/Header'
import Card from '@/components/group/Card'
import { Ready, Reveal } from '@/components/group/Parts'
import { believe, closing, featured, help, hero, portfolio, who } from '@/lib/group'
import { site } from '@/lib/data'

import '../group.css'

/*
  The P& group homepage.

  Six sections, in the order the brand argues for rather than the order the
  portfolio does: the brand, who we are, what we believe, how we work with
  brands, the businesses, the conversation.

  The previous version opened with the portfolio and gave each business a
  full-bleed panel, which made P& read as a holding company presenting three
  products. The business plan lists "a holding company — owns businesses; does
  not make them better" under What P& is NOT, so that framing was wrong at the
  source. The portfolio is now one curated row near the end.

  Every display statement closes with a red full stop, and every section opens
  with a red rule and letterspaced caps, because that is how the plan sets its
  own pages. Both devices are the brand's, not decoration.

  This page shares no layout, component or stylesheet with the rest of the
  site; the remaining pages still render from c04.css and are unchanged.
*/

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Ideas, made valuable` },
  description:
    'An innovation group that builds technology, brands and businesses, and proves them in live trading before selling them to anyone.',
}

export default function Home() {
  return (
    <Ready>
      <a className="g-skip" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* ------------------------------------------- 01 · the brand ---- */}
        <section className="g-hero on-dark" aria-labelledby="g-hero-h">
          <div className="g-hero__plate">
            <picture>
              <source media="(max-width: 860px)" srcSet="/plates/hero-tall.webp" />
              <img
                src="/plates/hero-wide.webp"
                alt="Daylight raking across a plaster wall. Temporary material study, pending commissioned photography."
                width={2000}
                height={1125}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <div className="g-hero__inner">
            <div className="g-hero__rule" aria-hidden="true" />
            <h1 className="g-hero__h" id="g-hero-h">
              {hero.headline}
              <span className="g-dot">.</span>
            </h1>
            <p className="g-hero__sub">{hero.support}</p>
          </div>

          <div className="g-hero__cue" aria-hidden="true">
            <span>Scroll</span>
            <i />
          </div>
        </section>

        {/* ------------------------------------------- 02 · who we are --- */}
        <section className="g-who" aria-labelledby="g-who-h">
          <Reveal className="g-who__body">
            <p className="g-eyebrow" id="g-who-h">
              {who.eyebrow}
            </p>
            <h2 className="g-display g-who__display">
              {who.display}
              <span className="g-dot">.</span>
            </h2>
            <p className="g-who__text">{who.body}</p>
          </Reveal>

          <Reveal as="figure" className="g-who__plate">
            <img
              src="/plates/group-tall.webp"
              alt="Worked stone under soft top light. Temporary material study, pending commissioned photography."
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </section>

        {/* ------------------------------------------- 03 · the ethos ---- */}
        <Reveal as="section" className="g-believe on-dark" margin="0px 0px -140px 0px">
          <div className="g-believe__plate">
            <picture>
              <source media="(max-width: 860px)" srcSet="/plates/hall-tall.webp" />
              <img
                src="/plates/hall-wide.webp"
                alt="A colonnade receding, daylight falling between the piers. Temporary material study, pending commissioned photography."
                width={2000}
                height={1125}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div className="g-believe__inner">
            <p className="g-eyebrow">{believe.eyebrow}</p>
            <p className="g-display g-believe__display">
              {believe.display}
              <span className="g-dot">.</span>
            </p>
            <p className="g-believe__text">{believe.body}</p>
          </div>
        </Reveal>

        {/* ------------------------------------- 04 · working with brands  */}
        <section className="g-help" aria-labelledby="g-help-h">
          <Reveal className="g-help__head">
            <p className="g-eyebrow" id="g-help-h">
              {help.eyebrow}
            </p>
            <h2 className="g-display g-help__display">
              {help.display}
              <span className="g-dot">.</span>
            </h2>
          </Reveal>

          <Reveal className="g-help__run">
            {help.items.map(([name, body]) => (
              <div className="g-help__item" key={name}>
                <h3>{name}</h3>
                <p>{body}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ------------------------------------------ 05 · the portfolio - */}
        <section className="g-folio" id="businesses" aria-labelledby="g-folio-h">
          <Reveal className="g-folio__head">
            <p className="g-eyebrow" id="g-folio-h">
              {portfolio.eyebrow}
            </p>
            <h2 className="g-display g-folio__display">
              {portfolio.display}
              <span className="g-dot">.</span>
            </h2>
          </Reveal>

          <div className="g-folio__grid">
            {featured.map((b, i) => (
              <Card key={b.key} b={b} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* ------------------------------------------ 06 · the close ----- */}
        <div className="g-red">
          <Reveal className="g-red__inner">
            <span className="g-red__mark">
              <Monogram />
            </span>
            <p className="g-red__line">
              One group. Distinct identities<span className="g-dot">.</span>
            </p>
          </Reveal>
        </div>

        <section className="g-close on-dark" aria-labelledby="g-close-h">
          <div className="g-close__plate">
            <img
              src="/plates/close-wide.webp"
              alt=""
              width={2000}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
          <Reveal className="g-close__inner">
            <div>
              <p className="g-eyebrow">Start here</p>
              <h2 className="g-display g-close__line" id="g-close-h">
                {closing.display}
                <span className="g-dot">.</span>
              </h2>
            </div>
            <Link className="g-close__cta" href="/contact">
              <span>{closing.cta}</span>
              <i aria-hidden="true" />
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="g-foot">
        <div className="g-foot__inner g-label">
          <span>
            {site.name} · {new Date().getFullYear()}
          </span>
          <nav className="g-foot__links" aria-label="Legal">
            <Link href="/about">About</Link>
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
