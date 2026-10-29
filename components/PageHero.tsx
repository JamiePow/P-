import type { ReactNode } from 'react'
import Reveal from './Reveal'
import Label from './Label'

type PageHeroProps = {
  label: string
  title: ReactNode
  standfirst?: string
  meta?: { label: string; value: string }[]
}

export default function PageHero({ label, title, standfirst, meta }: PageHeroProps) {
  return (
    <header className="shell pb-14 pt-32 sm:pt-40">
      <Reveal>
        <Label>{label}</Label>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-[18ch] text-[clamp(2.8rem,6.6vw,5.4rem)]">{title}</h1>
      </Reveal>
      {standfirst ? (
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-prose text-lg text-muted">{standfirst}</p>
        </Reveal>
      ) : null}
      {meta && meta.length > 0 ? (
        <Reveal delay={0.15}>
          <dl className="rule mt-12 grid gap-8 pt-7 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] uppercase tracking-label text-soft">
                  {item.label}
                </dt>
                <dd className="mt-2 font-display text-2xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}
    </header>
  )
}
