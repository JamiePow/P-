import Link from 'next/link'
import Reveal from './Reveal'
import Label from './Label'
import Dot from './Dot'
import { site } from '@/lib/data'
import { publicEmail } from '@/lib/contact'

type CtaBandProps = { label?: string; title?: string; body?: string; action?: string }

export default function CtaBand({
  label = 'Next step',
  title = 'Tell us what you are trying to build',
  body = 'A first conversation is thirty minutes and costs nothing. If we are the wrong fit we will say so, and usually point you at someone better placed.',
  action = 'Start a conversation',
}: CtaBandProps) {
  return (
    <section className="on-dark mt-28">
      <div className="shell grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <Reveal>
            <Label>{label}</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 max-w-[14ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
              {title}
              <Dot />
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col justify-end">
          <Reveal delay={0.1}>
            <p className="max-w-prose text-muted">{body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-b border-accent pb-2 font-mono text-[11px] uppercase tracking-label transition-colors duration-300 ease-brand hover:label-red"
              >
                {action}
                <span className="transition-transform duration-300 ease-brand group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              {publicEmail() ? (
                <a
                  href={`mailto:${publicEmail()}`}
                  className="font-sans text-sm text-muted transition-colors duration-300 ease-brand hover:text-[var(--c-ink)]"
                >
                  {publicEmail()}
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
