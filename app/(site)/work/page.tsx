import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Dot from '@/components/Dot'
import Placeholder from '@/components/Placeholder'
import CtaBand from '@/components/CtaBand'
import { proof } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'The two live operating environments behind Pow & Partners: a premium jewellery business and a route-service operator. Both are trading, and both are where the platforms are proven.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title={
          <>
            Businesses we help run, not case studies we wrote<Dot />
          </>
        }
        standfirst="P& starts from inside two live businesses. They are the test environments the platforms are proven in, and they are described here as they are, with client names held back until each is signed off."
      />

      <section className="shell">
        <div className="rule grid gap-px bg-hairline pt-px lg:grid-cols-2">
          {proof.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06} className="bg-page">
              <Link href={`/work/${item.slug}`} className="group flex h-full flex-col">
                <Placeholder
                  label={`${item.pillar} / ${item.sector}`}
                  alt={item.title}
                  ratio="16 / 10"
                />
                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <p className="font-mono text-[10px] uppercase tracking-label label-red">
                    {item.pillar}
                  </p>
                  <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.6rem,2.8vw,2.2rem)] transition-colors duration-300 ease-brand group-hover:text-accent">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-prose text-sm text-muted">{item.summary}</p>
                  <p className="rule mt-auto pt-5 font-mono text-[10px] uppercase tracking-label text-soft">
                    {item.status}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
