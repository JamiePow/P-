import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Label from '@/components/Label'
import Dot from '@/components/Dot'
import Placeholder from '@/components/Placeholder'
import CtaBand from '@/components/CtaBand'
import { proof, site } from '@/lib/data'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return proof.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const item = proof.find((p) => p.slug === params.slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
  }
}

export default function ProofPage({ params }: Params) {
  const item = proof.find((p) => p.slug === params.slug)
  if (!item) notFound()

  const others = proof.filter((p) => p.slug !== item.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: item.title,
        about: item.sector,
        abstract: item.summary,
        creator: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/work` },
          {
            '@type': 'ListItem',
            position: 3,
            name: item.title,
            item: `${site.url}/work/${item.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label={`${item.pillar} / ${item.sector}`}
        title={item.title}
        standfirst={item.summary}
      />

      <section className="shell">
        <Reveal>
          <Placeholder
            label={`${item.pillar} / hero image`}
            alt={item.title}
            ratio="16 / 9"
            priority
          />
        </Reveal>
      </section>

      <section className="shell pt-24 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Label>What we did</Label>
            <ul className="rule mt-6">
              {item.scope.map((line) => (
                <li key={line} className="border-b border-hairline py-3 text-sm">
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-[10px] uppercase tracking-label text-soft">Status</p>
            <p className="mt-2 font-display text-xl">{item.status}</p>

            <dl className="rule mt-9 grid gap-5 pt-7">
              {item.evidence.map((line) => (
                <div key={line.label}>
                  <dt className="text-sm text-muted">{line.label}</dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-label label-red">
                    {line.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* The story runs as prose rather than headings and bullets. */}
          <article className="max-w-prose space-y-6 text-lg">
            {item.detail.map((para) => (
              <Reveal key={para.slice(0, 32)}>
                <p>{para}</p>
              </Reveal>
            ))}
            <Reveal>
              <p className="border-l-2 border-accent pl-6 font-display text-2xl leading-snug">
                &ldquo;[Client quote to be supplied once this write-up is approved.]&rdquo;
              </p>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="shell grid gap-6 pt-24 sm:grid-cols-2 lg:pt-28">
        <Reveal>
          <Placeholder label="Detail image / In the business" alt="Detail" ratio="4 / 3" />
        </Reveal>
        <Reveal delay={0.06}>
          <Placeholder label="Detail image / The interface" alt="Interface detail" ratio="4 / 3" />
        </Reveal>
      </section>

      <section className="shell pt-24 lg:pt-28">
        <Label>More work</Label>
        <ul className="rule mt-8">
          {others.map((other) => (
            <li key={other.slug} className="border-b border-hairline">
              <Link
                href={`/work/${other.slug}`}
                className="group flex flex-wrap items-baseline justify-between gap-4 py-7"
              >
                <span className="font-display text-2xl transition-colors duration-300 ease-brand group-hover:text-accent">
                  {other.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-soft">
                  {other.pillar}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        label="Similar work"
        title={`Working on something in ${item.sector.toLowerCase()}?`}
        body="We will tell you in the first call whether we have done this before and what it cost, or whether you would be better served by someone who has."
      />
    </>
  )
}
