import Link from 'next/link'
import type { Metadata } from 'next'
import { Monogram } from '@/components/Brand'
import Header from '@/components/group/Header'
import Business from '@/components/group/Business'
import { Plate, Ready, Reveal } from '@/components/group/Parts'
import { believe, closing, featured, help, hero, img, portfolio, src, who } from '@/lib/group'
import { site } from '@/lib/data'

import '../group.css'

/*
  The P& group homepage.

  Six moments, no two sharing a shape: a figure inside an ambitious space;
  a band with the headline crossing its edge; one italic sentence at full
  viewport; a held detail with three principles stepping past it; three
  businesses in three treatments; the red field into the black.

  Every section opens with a red rule and letterspaced caps, and every
  display statement closes with a red full stop. Both devices are taken from
  the business plan, not invented for the site.

  The photography is licensed stock standing in for a commissioned shoot; the
  register and its caveats are in lib/group.ts.

  This page shares no layout, component or stylesheet with the rest of the
  site; the remaining pages still render from c04.css and are unchanged.
*/

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Ideas, made valuable` },
  description:
    'We put design, technology and commercial thinking in the same room, then use them to build products, businesses and experiences that make people’s lives easier.',
}

export default function Home() {
  return (
    <Ready>
      <a className="g-skip" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* --------------------------------------------- 01 · the hero --- */}
        <section className="g-hero on-dark" aria-labelledby="g-hero-h">
          <div className="g-hero__img">
            <picture>
              <source media="(max-width: 860px)" srcSet={src('hero', true)} />
              <img
                src={src('hero')}
                alt={img.hero.alt}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <div className="g-hero__in">
            <div>
              <div className="g-hero__rule" aria-hidden="true" />
              <h1 className="g-hero__h" id="g-hero-h">
                {hero.headline}
                <span className="g-dot">.</span>
              </h1>
            </div>
            <p className="g-hero__sub">{hero.support}</p>
          </div>

          <p className="g-hero__cue" aria-hidden="true">
            Scroll
          </p>
        </section>

        {/* ------------------------------------------ 02 · who we are --- */}
        <section className="g-who" aria-labelledby="g-who-h">
          <div className="g-who__band">
            <Plate name="who" className="g-who__plate" />
            <div className="g-who__over">
              <Reveal as="div">
                <h2 className="g-who__h" id="g-who-h">
                  {who.display}
                  <span className="g-dot">.</span>
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="g-who__wrap">
            <div className="g-who__grid">
              <Reveal>
                <p className="g-eyebrow">{who.eyebrow}</p>
              </Reveal>
              <Reveal className="g-who__text" index={1}>
                <p>{who.body}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------- 03 · what we believe --- */}
        <section className="g-believe on-dark" aria-labelledby="g-believe-h">
          <div className="g-believe__img">
            <Plate name="believe" />
          </div>
          <div className="g-believe__in">
            <Reveal>
              <p className="g-eyebrow">{believe.eyebrow}</p>
            </Reveal>
            <Reveal as="div" index={1}>
              <h2 className="g-believe__h" id="g-believe-h">
                {believe.display}
                <span className="g-dot">.</span>
              </h2>
            </Reveal>
            <Reveal className="g-believe__text" index={2}>
              <p>{believe.body}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------- 04 · how we think --- */}
        <section className="g-think" aria-labelledby="g-think-h">
          <div className="g-think__grid">
            <Plate name="think" className="g-think__fig" />
            <div>
              <div className="g-think__head">
                <Reveal>
                  <p className="g-eyebrow">{help.eyebrow}</p>
                </Reveal>
                <Reveal as="div" index={1}>
                  <h2 className="g-display g-think__h" id="g-think-h">
                    {help.display}
                    <span className="g-dot">.</span>
                  </h2>
                </Reveal>
              </div>

              {help.items.map(([name, body], i) => (
                <Reveal key={name} className="g-step" index={i}>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </Reveal>
              ))}

              <Reveal className="g-think__comm">
                <p>{help.commercial}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ----------------------------------- 05 · what we are building - */}
        <section id="businesses" aria-labelledby="g-folio-h">
          <Reveal className="g-folio__head">
            <p className="g-eyebrow">{portfolio.eyebrow}</p>
            <h2 className="g-display g-folio__h" id="g-folio-h">
              {portfolio.display}
              <span className="g-dot">.</span>
            </h2>
          </Reveal>

          {featured.map((b, i) => (
            <Business
              key={b.key}
              b={b}
              treatment={(['band', 'split', 'offset'] as const)[i % 3]}
            />
          ))}
        </section>

        {/* ---------------------------------------------- 06 · close ---- */}
        <div className="g-red">
          <Reveal className="g-red__in">
            <span className="g-red__mark">
              <Monogram />
            </span>
            <p className="g-red__line">{closing.signoff}.</p>
          </Reveal>
        </div>

        <section className="g-close on-dark" aria-labelledby="g-close-h">
          <div className="g-close__img">
            <Plate name="close" />
          </div>
          <Reveal className="g-close__in">
            <div>
              <p className="g-eyebrow">Start here</p>
              <h2 className="g-display g-close__h" id="g-close-h">
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
        <div className="g-foot__in g-label">
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
