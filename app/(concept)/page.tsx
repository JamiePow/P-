import type { Metadata } from 'next'
import Link from 'next/link'
import { Monogram } from '@/components/Brand'
import { Header, Footer } from '@/components/c04/Chrome'
import SystemsFigure from '@/components/c04/SystemsFigure'
import ValueCalc from '@/components/c04/ValueCalc'
import WorkflowFigure from '@/components/c04/WorkflowFigure'
import { Chip, Cta, Eyebrow, Plate, Row, SectionHead } from '@/components/c04/Parts'
import {
  accountability,
  ambition,
  changes,
  commitments,
  ctas,
  difference,
  meta,
  observations,
  outcomes,
  partners,
  pricingNote,
  shot,
  solutions,
  solutionsDisclosure,
  systems,
  terms,
  tiers,
  workflows,
  workflowsNote,
} from '@/lib/c04'

export const metadata: Metadata = {
  title: { absolute: 'Pow & Partners | Give your people their week back' },
  description:
    'P& connects the systems businesses already run, removes repetitive work and returns operating time. Published pricing, and an audit you keep either way.',
  alternates: { canonical: '/' },
}

/*
  The homepage, in eight movements.

  Previously nine sections of near-identical shape, twenty screens long, whose
  header and footer linked only to anchors on this page. The rhythm now
  alternates ground and visual type so no two neighbours look alike, and every
  link goes to a real page through the shared chrome.
*/

export default function Home() {
  return (
    <>
      <a href="#main" className="c4-skip">
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* =============================================== 01 HERO ===== */}
        <section className="c4-hero" id="hero">
          <div className="c4-shell">
            <Monogram className="c4-mark-crop" />
            <Eyebrow>
              {meta.fullName} · {meta.reach}
            </Eyebrow>
            <h1 className="c4-h1">
              Give your people
              <br />
              their <em>week</em> back<span className="c4-stop">.</span>
            </h1>

            {/* The systems named once, on one line, as part of the
                environment rather than as a dashboard. */}
            <p className="c4-hero__systems">
              <span className="c4-label">The systems you already run</span>
              <span className="c4-hero__list">
                {systems.map((s) => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </span>
            </p>

            {/* Introduction and actions on one row, which is what fills the
                space that used to sit empty under the introduction. */}
            <div className="c4-hero__row">
              <p className="c4-lead">{meta.support}</p>
              <div className="c4-hero__actions">
                <Link href="/contact" className="c4-btn">
                  Start a conversation
                </Link>
                <Link href="/what-we-do" className="c4-btn--line">
                  See what changes
                </Link>
              </div>
            </div>
          </div>

          {/* The one element on the site that breaks the shell. */}
          <div className="c4-bleed c4-hero__band">
            <Plate shot={shot('IMG 01')} variant="band" priority />
          </div>
        </section>

        {/* ============================================ 02 PROBLEM ===== */}
        <section className="c4-sec" id="problem">
          <div className="c4-shell">
            <SectionHead
              n="02"
              folio="The problem"
              title={<>Where the time goes</>}
              aside={
                <p className="c4-body">
                  Every system in the business does its job. The time disappears in the handovers
                  between them, and because it is paid in people&rsquo;s attention rather than in
                  licence fees, it never appears on a budget line.
                </p>
              }
            />
            <div className="c4-rows c4-rows--top">
              {observations.map((o) => (
                <div className="c4-row c4-row--obs" key={o.n} data-reveal>
                  <span className="c4-row__n">{o.n}</span>
                  <p className="c4-obs">{o.text}</p>
                  <p className="c4-obs-tag">{o.tag}</p>
                </div>
              ))}
            </div>

            <div className="c4-split c4-split--solo" data-reveal>
              <div>
                <p className="c4-label">The arithmetic</p>
                <h3 className="c4-h3 c4-split__h">
                  What those hours are worth over a year<span className="c4-stop">.</span>
                </h3>
                <p className="c4-note c4-split__hint">Set both figures to match your operation.</p>
                <ValueCalc />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ 03 CHANGES ===== */}
        <section className="c4-sec on-white" id="changes">
          <div className="c4-shell">
            <SectionHead
              n="03"
              folio="What changes"
              title={<>What actually changes</>}
              aside={
                <p className="c4-body">
                  We start with the systems you already run. Replacing one is a last resort. The
                  work is in the space between them, which is exactly where nobody has ever been
                  accountable.
                </p>
              }
            />
            <SystemsFigure />
            <div className="c4-rows c4-rows--top">
              {changes.map((c) => (
                <Row key={c.n} n={c.n} name={c.name}>
                  {c.body}
                </Row>
              ))}
            </div>

            <div className="c4-expect c4-expect--solo" data-reveal>
              <div className="c4-expect__copy">
                <p className="c4-label">What you should expect</p>
                <ul className="c4-expect__list">
                  {outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <p className="c4-note c4-expect__note">
                  Stated as direction rather than as a figure. The size of each one is what the
                  audit measures, and what Measure checks afterwards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================== 04 IN PRACTICE ===== */}
        <section className="c4-sec on-warm" id="in-practice">
          <div className="c4-shell">
            <SectionHead
              n="04"
              folio="In practice"
              title={<>Three sequences, end to end</>}
              aside={
                <p className="c4-body">
                  What connecting systems actually looks like in a working business. Each one runs
                  from the problem to the measure that would tell you whether it worked.
                </p>
              }
            />
            {workflows.map((w) => (
              <WorkflowFigure key={w.n} w={w} />
            ))}
            <p className="c4-note c4-stages__note">{workflowsNote}</p>
          </div>
        </section>

        {/* ========================================== 05 SOLUTIONS ===== */}
        <section className="c4-sec" id="solutions">
          <div className="c4-shell">
            <SectionHead
              n="05"
              folio="Our solutions"
              title={
                <>
                  Three platforms, each built
                  <br />
                  inside a working business
                </>
              }
              aside={
                <p className="c4-body">
                  Atelier was built inside a premium jeweller. Nexus was built inside a route-based
                  service operation. Blueprint is being built with construction subcontractors now.
                  Each one started as something a business we run needed working on a Monday
                  morning.
                </p>
              }
            />

            {/* A preview, not the whole of it. The three full compositions
                live on /solutions; repeating them here made this one section
                thirty-six per cent of the homepage. */}
            <div className="c4-solprev">
              {solutions.map((sol) => (
                <article className="c4-solprev__item" key={sol.n} data-reveal>
                  <p className="c4-label">
                    Solution {sol.n} · {sol.sector}
                  </p>
                  <h3 className="c4-solprev__name">{sol.name}</h3>
                  <p className="c4-solprev__who">{sol.whoFor}</p>
                  <p className="c4-solprev__status">
                    <Chip open={sol.open}>{sol.status}</Chip>
                  </p>
                  <Link className="c4-btn--line" href={`/solutions#${sol.name.toLowerCase()}`}>
                    {sol.name} in full
                  </Link>
                </article>
              ))}
            </div>

            <p className="c4-note c4-stages__note">{solutionsDisclosure}</p>

            <Cta line={ctas.solutions.line} action={ctas.solutions.action} href="/contact" />
          </div>
        </section>

        {/* ========================================= 06 DIFFERENCE ===== */}
        <section
          className="c4-sec on-red"
          id="difference"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <Monogram className="c4-mark-crop" />
          <div className="c4-shell" style={{ position: 'relative' }}>
            <Eyebrow>06 · The P&amp; difference</Eyebrow>
            <h2 className="c4-h1 c4-diff__h" data-reveal>
              {difference.lead}
              <span className="c4-stop">.</span>
            </h2>
            <p className="c4-body c4-diff__body">{difference.support}</p>

            <div className="c4-rows--commit">
              {commitments.map((c) => (
                <div className="c4-row c4-row--commit" key={c.n} data-reveal>
                  <span className="c4-row__n">Commitment {c.n}</span>
                  <p className="c4-commit">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================= 06b THE PARTNERS ===== */}
        <section className="c4-sec on-warm" id="partners">
          <div className="c4-shell">
            <SectionHead
              n="07"
              folio="Who you would work with"
              title={<>Three partners, three operating businesses</>}
              aside={
                <p className="c4-body">
                  Everything P&amp; sells was built inside one of them and corrected by the people
                  using it, which is the part a supplier cannot buy. {ambition}
                </p>
              }
            />

            <div className="c4-people2">
              {partners.map((p, i) => (
                <div className="c4-person2" key={p.name} data-reveal>
                  <Plate shot={shot(`IMG 0${4 + i}`)} variant="portrait" />
                  <h3 className="c4-person2__name">{p.name}</h3>
                  <p className="c4-label role">{p.role}</p>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>

            <div className="c4-rows c4-rows--top">
              {accountability.map((a, i) => (
                <Row key={a.name} n={`0${i + 1}`} name={a.name}>
                  {a.body}
                </Row>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ 08 PRICING ===== */}
        <section className="c4-sec" id="pricing">
          <div className="c4-shell">
            <SectionHead
              n="08"
              folio="Pricing"
              title={<>Published pricing</>}
              aside={<p className="c4-body">{pricingNote}</p>}
            />

            <div className="c4-prices">
              {tiers.map((t) => (
                <div className="c4-price" key={t.slug} data-reveal>
                  <p className="c4-price__n">
                    {t.n} · {t.name}
                  </p>
                  <p className="c4-price__fig">{t.monthly}</p>
                  <p className="c4-price__per">
                    a month, or {t.annual} a year
                    <br />
                    <span className="c4-label">Saving {t.saving}</span>
                  </p>
                  <p className="c4-price__for">{t.forWho}</p>
                  <p className="c4-price__impl">
                    <span className="c4-label">Implementation, one off</span>
                    {t.implementation}
                  </p>
                </div>
              ))}
            </div>

            <div className="c4-terms on-black" data-reveal>
              {terms.map((t) => (
                <div key={t.name}>
                  <h4>{t.name}</h4>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>

            <Cta line={ctas.pricing.line} action={ctas.pricing.action} href="/contact" />
          </div>
        </section>

        {/* ============================================ 09 CLOSING ===== */}
        <section className="c4-close on-black" id="closing">
          <div className="c4-shell">
            <Eyebrow>09 · Start a conversation</Eyebrow>
            <h2 className="c4-close__h" data-reveal>
              Start a <em>conversation</em>
              <span className="c4-stop">.</span>
            </h2>
            <p className="c4-body c4-close__body">
              Tell us which systems you run and where the time goes, and we will tell you what we
              would look at first. If we do not think there is enough in it to be worth doing, we
              will say so.
            </p>
            <div className="c4-hero__actions">
              <Link href="/contact" className="c4-btn">
                Start a conversation
              </Link>
              <Link href="/pricing" className="c4-btn--line">
                See the pricing first
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
