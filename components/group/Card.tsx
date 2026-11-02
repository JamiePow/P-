import Link from 'next/link'
import { Reveal } from './Parts'
import type { Business } from '@/lib/group'

/*
  One portfolio entry, deliberately small.

  The previous pass gave each business a full-bleed panel, which made the
  homepage read as three product advertisements with a group brand attached.
  Here the portfolio is a curated row: a plate, a name, one line, a route out.
  The card re-points --accent and --mark, so the rule, the stage dot and the
  link underline all take the business's colour without a hardcoded value.
*/
export default function Card({ b, priority }: { b: Business; priority?: boolean }) {
  const alt = `${b.name} — ${b.sector}. Temporary material study, pending commissioned photography.`
  const go = (
    <>
      <span>{b.hrefLabel}</span>
      <i aria-hidden="true" />
    </>
  )

  return (
    <Reveal as="article" className={`g-card g-card--${b.key}`}>
      <figure className="g-card__plate">
        <picture>
          <source media="(max-width: 860px)" srcSet={`/plates/${b.plate}-wide.webp`} />
          <img
            src={`/plates/${b.plate}-tall.webp`}
            alt={alt}
            width={1200}
            height={1500}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>
      </figure>

      <div className="g-card__rule" aria-hidden="true" />
      <h3 className="g-card__name">{b.name}</h3>
      <p className="g-card__sector g-label">{b.sector}</p>
      <p className="g-card__line">{b.line}</p>

      <div className="g-card__foot">
        <span className="g-card__stage g-label">{b.stage}</span>
        {b.href ? (
          b.external ? (
            <a className="g-card__go" href={b.href} target="_blank" rel="noreferrer noopener">
              {go}
              <span className="g-sr"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link className="g-card__go" href={b.href}>
              {go}
            </Link>
          )
        ) : (
          <Link className="g-card__go" href="/contact">
            {go}
          </Link>
        )}
      </div>
    </Reveal>
  )
}
