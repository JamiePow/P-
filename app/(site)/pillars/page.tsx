import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Label from '@/components/Label'
import Dot from '@/components/Dot'
import CtaBand from '@/components/CtaBand'
import { labs, layers, partners, pillars } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Pillars',
  description:
    'Craft, Operations and Commerce are the three markets Pow & Partners sells into. Labs is the pipeline behind them. Each pillar has a lead partner and a live commercial position.',
  alternates: { canonical: '/pillars' },
}

export default function PillarsPage() {
  return (
    <>
      <PageHero
        label="The group"
        title={
          <>
            Three pillars are the markets<Dot /> Four layers are the value<Dot />
          </>
        }
        standfirst="A pillar is a market P& sells into. A layer is a form of value the group accumulates. Every pillar deposits into more than one layer, which is exactly why no partner can succeed alone."
      />

      {/* The four value layers */}
      <section id="layers" className="shell">
        <Reveal>
          <div className="overflow-x-auto">
            <table className="figures w-full min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col" className="!text-left">
                    Craft
                  </th>
                  <th scope="col" className="!text-left">
                    Operations
                  </th>
                  <th scope="col" className="!text-left">
                    Commerce
                  </th>
                  <th scope="col" className="!text-left">
                    Labs
                  </th>
                </tr>
              </thead>
              <tbody>
                {layers.map((layer) => (
                  <tr key={layer.name}>
                    <td className="!text-left align-top">
                      <span className="block font-medium">{layer.name}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-label text-soft">
                        {layer.kind}
                      </span>
                    </td>
                    <td className="!text-left align-top text-muted">{layer.craft}</td>
                    <td className="!text-left align-top text-muted">{layer.operations}</td>
                    <td className="!text-left align-top text-muted">{layer.commerce}</td>
                    <td className="!text-left align-top text-muted">{layer.labs || 'Not yet'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-prose text-sm text-muted">
            Read it down the columns, not across the rows. The partner who only looks along their
            own row will consistently undervalue the group.
          </p>
        </Reveal>
      </section>

      {/* Each pillar in full */}
      {pillars.map((pillar, index) => (
        <section
          key={pillar.slug}
          id={pillar.slug}
          className={index % 2 === 1 ? 'on-dark mt-28' : 'mt-28'}
        >
          <div className={`shell ${index % 2 === 1 ? 'py-24 lg:py-28' : ''}`}>
            <Reveal>
              <Label>{pillar.n}</Label>
            </Reveal>
            <div className="mt-7 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <Reveal delay={0.05}>
                  <h2 className="text-[clamp(3rem,6vw,5rem)]">
                    {pillar.name}
                    <Dot />
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-label label-red">
                    Lead partner: {pillar.lead}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-label text-soft">
                    {pillar.role}
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <dl className="rule mt-10 grid gap-5 pt-7">
                    {pillar.market.map((m) => (
                      <div key={m.label} className="flex items-baseline justify-between gap-6">
                        <dt className="font-mono text-[10px] uppercase tracking-label text-soft">
                          {m.label}
                        </dt>
                        <dd className="font-display text-2xl tabular-nums">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              <div>
                <Reveal delay={0.06}>
                  <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.26]">
                    {pillar.summary}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-7 max-w-prose text-muted">{pillar.body}</p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-10 font-mono text-[10px] uppercase tracking-label text-soft">
                    What we sell
                  </p>
                  <ul className="rule mt-5">
                    {pillar.sells.map((item) => (
                      <li key={item} className="border-b border-hairline py-3 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Labs */}
      <section id="labs" className="shell mt-28">
        <Reveal>
          <Label>R &amp; D, group owned</Label>
        </Reveal>
        <div className="mt-7 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(3rem,6vw,5rem)]">
                {labs.name}
                <Dot />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-label label-red">
                {labs.summary}
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.06}>
              <p className="max-w-prose text-muted">{labs.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-x-auto">
                <table className="figures mt-9 w-full min-w-[560px]">
                  <thead>
                    <tr>
                      <th scope="col">Gate</th>
                      <th scope="col">Max time</th>
                      <th scope="col" className="!text-left">
                        Evidence required to pass
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {labs.gates.map((gate) => (
                      <tr key={gate.stage}>
                        <td className="!text-left font-medium">{gate.stage}</td>
                        <td className="font-mono text-xs">{gate.time}</td>
                        <td className="!text-left text-muted">{gate.test}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="shell pt-28 lg:pt-36">
        <Reveal>
          <Label>The partners</Label>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-7 max-w-[22ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
            Each partner arrives with a live position, not a plan to enter one<Dot />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-hairline lg:grid-cols-3">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={index * 0.06} className="bg-page">
              <article className="h-full p-7 lg:p-9">
                <p className="font-mono text-[10px] uppercase tracking-label label-red">
                  {partner.role}
                </p>
                <h3 className="mt-5 font-display text-2xl">{partner.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-soft">
                  Pillar: {partner.pillar}
                </p>
                <p className="mt-6 text-sm text-muted">{partner.body}</p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-label text-soft">Owns</p>
                <ul className="rule mt-4">
                  {partner.owns.map((item) => (
                    <li key={item} className="border-b border-hairline py-2.5 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-prose text-sm text-muted">
            Prices, packages and how an engagement is shaped are set out on the{' '}
            <Link href="/approach#packages" className="border-b border-accent">
              approach page
            </Link>
            .
          </p>
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
