import type { Metadata } from 'next'
import { LogoHorizontal, Monogram } from '@/components/Brand'
import Folio from '@/components/c04/Folio'
import SystemsFigure from '@/components/c04/SystemsFigure'
import ValueCalc from '@/components/c04/ValueCalc'
import Solutions from '@/components/c04/Solutions'
import { publicEmail } from '@/lib/contact'
import { deployEnv } from '@/lib/env'
import {
  Chip,
  Cta,
  Eyebrow,
  IndexStrip,
  Plate,
  ProvWord,
  Row,
  SectionHead,
} from '@/components/c04/Parts'
import {
  accountability,
  ambition,
  changes,
  commitments,
  commitmentsOpen,
  contents,
  ctas,
  meta,
  observations,
  outcomes,
  partners,
  pricingNote,
  shot,
  solutions,
  solutionsDisclosure,
  stages,
  stagesNote,
  systems,
  terms,
  tiers,
} from '@/lib/c04'

export const metadata: Metadata = {
  title: { absolute: 'Pow & Partners | Give your people their week back' },
  description:
    'P& helps businesses connect the systems they already run, remove repetitive work and recover operating time. Published pricing, and an audit you keep either way.',
  alternates: { canonical: '/' },
}

export default function ConceptFour() {
  return (
    <>
      <Folio />

      <main>
        {/* ================================================= 01 HERO ===== */}
        <section className="c4-hero c4-shell" id="hero">
          <Monogram className="c4-mark-crop" />
          <Eyebrow>
            {meta.fullName} · {meta.reach}
          </Eyebrow>
          <h1 className="c4-h1">
            Give your people
            <br />
            their <em>week</em> back<span className="c4-stop">.</span>
          </h1>

          {/* The technical layer, as part of the environment rather than as a
              dashboard: the systems named once, on one line, under the claim. */}
          <p className="c4-hero__systems">
            <span className="c4-label">The systems you already run</span>
            <span className="c4-hero__list">
              {systems.map((s) => (
                <span key={s.id}>{s.name}</span>
              ))}
            </span>
          </p>

          <div className="c4-hero__grid">
            <div className="c4-hero__copy">
              <p className="c4-lead">{meta.support}</p>
              <div className="c4-hero__actions">
                <a href="#changes" className="c4-btn">
                  See what changes
                </a>
                <a href="#closing" className="c4-btn--line">
                  Start a conversation
                </a>
              </div>
            </div>
            <div className="c4-hero__fig">
              <Plate shot={shot('IMG 01')} />
            </div>
          </div>

          <IndexStrip items={contents} />
        </section>

        {/* ============================================== 02 PROBLEM ===== */}
        <section className="c4-sec" id="problem">
          <div className="c4-shell">
            <SectionHead
              n="02"
              folio="The problem"
              title={
                <>
                  Nothing is broken.
                  <br />
                  Everything is separate
                </>
              }
              aside={
                <p className="c4-body">
                  Each system does its job. The cost sits in the handover between them, and it is
                  paid in people&rsquo;s attention rather than in licence fees, which is why it
                  never appears on a budget line.
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

            {/* The arithmetic, beside the people doing it. */}
            <div className="c4-split" data-reveal>
              <Plate shot={shot('IMG 02')} />
              <div>
                <p className="c4-label">The arithmetic</p>
                <h3 className="c4-h3 c4-split__h">
                  Move the figure to yours and see the year<span className="c4-stop">.</span>
                </h3>
                <ValueCalc />
              </div>
            </div>

            <Cta line={ctas.problem.line} action={ctas.problem.action} />
          </div>
        </section>

        {/* ============================================== 03 CHANGES ===== */}
        <section className="c4-sec on-white" id="changes">
          <div className="c4-shell">
            <SectionHead
              n="03"
              folio="What changes"
              title={<>Connect. Unify. Automate</>}
              aside={
                <p className="c4-body">
                  We start with the systems you already run. Replacement is a last resort, not an
                  opening position. The work is in the space between them, which is exactly where
                  nobody has ever been accountable.
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

            <div className="c4-expect" data-reveal>
              <div className="c4-expect__copy">
                <p className="c4-label">What you could reasonably expect</p>
                <h3 className="c4-h3 c4-expect__h">
                  Capacity, rather than a saving<span className="c4-stop">.</span>
                </h3>
                <ul className="c4-expect__list">
                  {outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <p className="c4-note c4-expect__note">
                  Stated as direction, not as a figure. The size of each one is what the audit
                  measures, and what Measure checks afterwards.
                </p>
              </div>
              <Plate shot={shot('IMG 03')} />
            </div>
          </div>
        </section>

        {/* ============================================ 04 SOLUTIONS ===== */}
        <section className="c4-sec" id="solutions">
          <div className="c4-shell">
            <SectionHead
              n="04"
              folio="Our solutions"
              title={
                <>
                  Built inside the sector,
                  <br />
                  not for it
                </>
              }
              aside={<p className="c4-body">{solutionsDisclosure}</p>}
            />

            <Solutions items={solutions} />

            <Cta line={ctas.solutions.line} action={ctas.solutions.action} />
          </div>
        </section>

        {/* =========================================== 05 DIFFERENCE ===== */}
        <section
          className="c4-sec on-red"
          id="difference"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <Monogram className="c4-mark-crop" />
          <div className="c4-shell" style={{ position: 'relative' }}>
            <Eyebrow>05 · The P&amp; difference</Eyebrow>
            <h2 className="c4-h1 c4-diff__h" data-reveal>
              We do not build business cases on redundancies<span className="c4-stop">.</span>
            </h2>
            <p className="c4-body c4-diff__body">
              Every automation vendor implies headcount reduction, and most buyers hear it whether
              or not it is said. We would rather say the opposite plainly, once, and be held to it.
            </p>

            <div className="c4-rows c4-rows--commit">
              {commitments.map((c) => (
                <div className="c4-row c4-row--commit" key={c.n} data-reveal>
                  <span className="c4-row__n">Commitment {c.n}</span>
                  <p className="c4-commit">{c.text}</p>
                </div>
              ))}
              <div className="c4-row c4-row--commit" data-reveal>
                <span className="c4-row__n">04 to 06</span>
                <p className="c4-commit c4-commit--open">
                  <ProvWord value={commitmentsOpen} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= 06 APPROACH ===== */}
        <section className="c4-sec" id="approach">
          <div className="c4-shell">
            <SectionHead
              n="06"
              folio="Our approach"
              title={
                <>
                  It starts by counting,
                  <br />
                  not by selling
                </>
              }
              aside={
                <p className="c4-body">
                  The audit is chargeable at £3,500 because the finding has value whether or not
                  you go on with us. Whether it is credited against implementation has not been
                  settled, and the page will say so until it is.
                </p>
              }
            />

            <div className="c4-figure--wide" data-reveal>
              <Plate shot={shot('IMG 07')} />
            </div>

            <div className="c4-rows c4-rows--top">
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

            <Cta line={ctas.approach.line} action={ctas.approach.action} />
          </div>
        </section>

        {/* ============================================== 07 PRICING ===== */}
        <section className="c4-sec" id="pricing">
          <div className="c4-shell">
            <SectionHead
              n="07"
              folio="Commercial transparency"
              title={
                <>
                  The prices are
                  <br />
                  on the website
                </>
              }
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
                  {'open' in t && t.open ? (
                    <p className="c4-open">
                      <span className="c4-label">Not yet decided</span>
                      {t.open}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <Cta line={ctas.pricing.line} action={ctas.pricing.action} />
          </div>
        </section>

        {/* ================================================ 08 ABOUT ===== */}
        <section className="c4-sec on-warm" id="about">
          <div className="c4-shell">
            <SectionHead
              n="08"
              folio="About P&"
              title={
                <>
                  We built these inside
                  <br />
                  businesses we had to run
                </>
              }
              aside={
                <p className="c4-body">
                  Three founding partners, three sectors, and the same habit in each of them. Build
                  the thing, run it on Monday morning, then find out what it is actually worth.
                </p>
              }
            />

            <div className="c4-people">
              {partners.map((p, i) => (
                <div className="c4-person" key={p.name} data-reveal>
                  <Plate shot={shot(`IMG ${String(8 + i).padStart(2, '0')}`)} compact />
                  <h3 className="c4-h3">
                    {p.name}
                    {p.surname ? (
                      <>
                        {' '}
                        <ProvWord value={p.surname} />
                      </>
                    ) : null}
                  </h3>
                  <p className="c4-label role">{p.role}</p>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>

            {/* Credibility stated as method, because there is no third party
                proof to show and none will be invented. */}
            <div className="c4-rows c4-rows--top">
              {accountability.map((a, i) => (
                <Row key={a.name} n={`0${i + 1}`} name={a.name}>
                  {a.body}
                </Row>
              ))}
            </div>

            <div className="c4-amb" data-reveal>
              <p className="c4-label">The wider group</p>
              <p className="c4-lead">P&amp; builds what comes next. {ambition}</p>
            </div>
          </div>
        </section>

        {/* ============================================== 09 CLOSING ===== */}
        <section className="c4-close on-black" id="closing">
          <div className="c4-shell">
            <Eyebrow>09 · Start a conversation</Eyebrow>
            <h2 className="c4-close__h" data-reveal>
              Tell us where the <em>week</em> goes<span className="c4-stop">.</span>
            </h2>
            <p className="c4-body c4-close__body">
              An hour with the people doing the work is usually enough to see where it is going. If
              it is not worth fixing, we will say so.
            </p>
            <div className="c4-hero__actions">
              <a href="/contact" className="c4-btn">
                Start a conversation
              </a>
              <a href="#pricing" className="c4-btn--line">
                See the pricing first
              </a>
            </div>

            <div className="c4-close__foot">
              <LogoHorizontal label="Pow and Partners" />
              <p className="c4-label">
                {publicEmail() ? `${publicEmail()} · ` : ''}
                {meta.reach}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================== FOOTER ===== */}
      <footer className="c4-foot on-black">
        <div className="c4-shell">
          <div className="c4-foot__top">
            <div className="c4-foot__brand">
              <p className="c4-label">Pow &amp; Partners</p>
              <p>
                P&amp; is a technology, innovation and commercial development group. We identify
                opportunities, build the technology around them, prove it in live operations, and
                turn what works into products and businesses.
              </p>
            </div>
            <div>
              <h4>Solutions</h4>
              <ul>
                <li>
                  <a href="#solutions">Atelier</a>
                </li>
                <li>
                  <a href="#solutions">Nexus</a>
                </li>
                <li>
                  <a href="#solutions">Blueprint</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#approach">Approach</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="/contact">Start a conversation</a>
                </li>
                <li>
                  <a href="#hero">{meta.reach}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="c4-foot__base">
            <span className="c4-label">© 2026 Pow &amp; Partners</span>
            <span className="c4-label">
              Registered in <span className="c4-pw">country</span> · Company number{' '}
              <span className="c4-pw">00000000</span>
            </span>
            <span className="c4-label">{deployEnv === 'production' ? meta.reach : 'Review build · not public'}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
