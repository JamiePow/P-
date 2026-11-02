import Link from 'next/link'
import { Plate, Reveal } from './Parts'
import type { Business as B } from '@/lib/group'

/*
  One business, in one of three treatments.

  The previous version gave all three the same card and changed only the
  colour, which is not differentiation. Each now has its own shape, its own
  crop ratio and its own relationship between type and photograph:

    band   full-bleed dark, type laid into the shadow side of the frame
    split  an intimate portrait, text held in a narrow column beside it
    offset a wide plate held off the right edge, the text block overlapping it

  The article re-points --accent and --mark, so the rule, the stage dot and
  the link underline all take the business's colour with no hardcoded value
  below this line.
*/

function Body({ b }: { b: B }) {
  const go = (
    <>
      <span>{b.hrefLabel}</span>
      <i aria-hidden="true" />
    </>
  )
  return (
    <div className="g-biz__text">
      <h3 className="g-biz__name">{b.name}</h3>
      <p className="g-biz__sector g-label">{b.sector}</p>
      <div className="g-biz__rule" aria-hidden="true" />
      <p className="g-biz__line">{b.line}</p>
      <div className="g-biz__foot">
        <span className="g-biz__stage g-label">{b.stage}</span>
        {b.href ? (
          b.external ? (
            <a className="g-biz__go" href={b.href} target="_blank" rel="noreferrer noopener">
              {go}
              <span className="g-sr"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link className="g-biz__go" href={b.href}>
              {go}
            </Link>
          )
        ) : (
          <Link className="g-biz__go" href="/contact">
            {go}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Business({
  b,
  treatment,
}: {
  b: B
  treatment: 'band' | 'split' | 'offset'
}) {
  const cls = `g-biz g-biz--${treatment} g-biz--${b.key}`

  if (treatment === 'band') {
    return (
      <Reveal as="article" className={`${cls} on-dark`} margin="0px 0px -120px 0px">
        <Plate name={b.plate} className="g-biz__img" />
        <Body b={b} />
      </Reveal>
    )
  }

  if (treatment === 'offset') {
    return (
      <Reveal as="article" className={cls}>
        <Plate name={b.plate} className="g-biz__img" />
        <Body b={b} />
      </Reveal>
    )
  }

  return (
    <Reveal as="article" className={cls}>
      <Body b={b} />
      <Plate name={b.plate} className="g-biz__img" />
    </Reveal>
  )
}
