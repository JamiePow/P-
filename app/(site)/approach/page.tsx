import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Label from '@/components/Label'
import Dot from '@/components/Dot'
import Placeholder from '@/components/Placeholder'
import CtaBand from '@/components/CtaBand'
import { flywheel, loop, loopRule, pricingRule, site } from '@/lib/data'
import { pricingNote, tierViews } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How Pow & Partners works: one loop run in three markets, the rule that governs what gets productised, and the package bands for Commerce, Craft and Operations.',
  alternates: { canonical: '/approach' },
}

const principles = [
  {
    n: '01',
    title: 'Access before ideas',
    body: 'We only start where a partner can already reach the market. An idea without a route to a first customer is a hobby, and the group has enough of those to choose from.',
  },
  {
    n: '02',
    title: 'Prove it in a business that pays',
    body: 'Nothing is productised on the strength of a pilot. It has to run inside a live operation, for a customer who is paying for the outcome, until the numbers move.',
  },
  {
    n: '03',
    title: 'Separate the reusable from the specific',
    body: 'Client-specific rules live in configuration, not in code. That discipline costs roughly 15 to 20% more engineering time up front, and it is what turns a bespoke build into a platform.',
  },
  {
    n: '04',
    title: 'Fewer people, closer to the work',
    body: 'The people in the first meeting are the people who do the work. No London tower, no six layers of management, no utilisation target that forces the wrong people onto the job.',
  },
]

export default function ApproachPage() {
  return (
    <>
      <PageHero
        label="Approach"
        title={
          <>
            One loop, run in three markets<Dot />
          </>
        }
        standfirst="Every pillar runs the same five steps. What differs is the market, the lead partner and the speed. The discipline comes from the loop being identical: a capability that cannot survive step three never reaches step four."
        meta={[
          { label: 'Typical engagement', value: '3 to 12 months' },
          { label: 'Team size', value: '2 to 8 people' },
          { label: 'Working across', value: site.reach },
        ]}
      />

      {/* The loop */}
      <section id="loop" className="shell">
        <Reveal>
          <ol className="rule grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {loop.map((step, index) => (
              <li key={step.n}>
                <Reveal delay={index * 0.05}>
                  <p className="font-mono text-[10px] tracking-label label-red">{step.n}</p>
                  <h2 className="mt-3 font-display text-2xl">{step.name}</h2>
                  <p className="mt-3 text-sm text-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-16">
            <p className="font-mono text-[10px] uppercase tracking-label label-red">
              The rule that makes it work
            </p>
            <p className="max-w-prose font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.28]">
              {loopRule}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="shell pt-20">
        <Reveal>
          <Placeholder
            label="Studio image / People &amp; partnership"
            alt="The Pow and Partners team at work"
            ratio="16 / 9"
          />
        </Reveal>
      </section>

      {/* Principles */}
      <section className="shell pt-28 lg:pt-36">
        <Reveal>
          <Label>Principles</Label>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-7 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
            Four things we hold to<Dot />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-x-20">
          {principles.map((principle, index) => (
            <Reveal key={principle.n} delay={index * 0.05}>
              <article className="rule pt-7">
                <p className="font-mono text-[10px] tracking-label label-red">{principle.n}</p>
                <h3 className="mt-4 font-display text-2xl">{principle.title}</h3>
                <p className="mt-4 max-w-prose text-muted">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why it compounds */}
      <section className="on-dark mt-28">
        <div className="shell py-24 lg:py-28">
          <Reveal>
            <Label>Why it compounds</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
              Each turn makes the next one cheaper<Dot />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-muted">
              The flywheel is not a metaphor here, it is a cost curve. Every capability built once
              and reused reduces the delivery cost of the next engagement in every other pillar.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {flywheel.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="bg-[var(--c-page)]">
                <article className="h-full p-7">
                  <h3 className="font-mono text-[10px] uppercase tracking-label label-red">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages
          The agency engagement bands that used to render here are a different
          commercial model from the approved subscription tiers, and showing
          both told visitors two different prices for P&. The data stays in
          lib/data.ts for reference; the public surface is the pricing page. */}
      <section id="packages" className="shell pt-28 lg:pt-36">
        <Reveal>
          <Label>Packages and price</Label>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-7 max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
            Published, because the alternative is quote-only<Dot />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-prose text-muted">
            Three subscription tiers with their implementation fees, written down rather than
            quoted on request. Every vendor we benchmarked in these markets sells through opaque,
            quote-only pricing, which is precisely why ours is on the website.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rule mt-12">
            {tierViews.map((t) => (
              <article
                key={t.slug}
                className="grid gap-4 border-b border-hairline py-6 lg:grid-cols-[0.22fr_1fr_0.42fr] lg:gap-10"
              >
                <div>
                  <h3 className="font-display text-xl">{t.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-soft">
                    {t.n}
                  </p>
                </div>
                <p className="max-w-prose text-sm text-muted">{t.forWho}</p>
                <div className="lg:text-right">
                  <p className="text-sm tabular-nums">{t.monthly} a month</p>
                  <p className="mt-1 text-sm tabular-nums text-muted">
                    or {t.annual} a year, saving {t.saving}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-soft">
                    {t.implementation} implementation
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-prose text-sm text-muted">{pricingNote}</p>
        </Reveal>
      </section>

      <CtaBand
        label="Working together"
        title="Bring us the version that is not solved yet"
        body="The useful conversations tend to start before the brief is tidy. If you can describe the problem, that is enough to begin."
      />
    </>
  )
}
