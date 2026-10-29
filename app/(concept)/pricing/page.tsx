import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta } from '@/components/c04/Parts'
import ValueCalc from '@/components/c04/ValueCalc'
import { ctas, inclusionsOpen, pricingNote, terms, tiers } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Three tiers with published monthly, annual and implementation figures. Essential £295, Standard £595, Pro £1,150 a month, excluding VAT.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <Shell current="/pricing">
      <PageHead
        n="03"
        folio="Commercial transparency"
        title={<>The prices are on the website<span className="c4-stop">.</span></>}
        lead="Published rather than quoted on request, because a price you have to ask for is a price that moves."
        aside={<p className="c4-body">{pricingNote}</p>}
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          <div className="c4-prices">
            {tiers.map((t) => (
              <article className="c4-price" key={t.slug}>
                <p className="c4-price__n">
                  {t.n} · {t.name}
                </p>
                <p className="c4-price__fig">{t.monthly}</p>
                <p className="c4-price__per">
                  a month, or {t.annual} a year
                  <br />
                  <span className="c4-label">Saving {t.saving} against twelve monthly payments</span>
                </p>
                <p className="c4-price__for">{t.forWho}</p>
                <p className="c4-label" style={{ marginTop: 'var(--s3)' }}>
                  Implementation, one off
                </p>
                <p className="c4-price__impl">{t.implementation}</p>
              </article>
            ))}
          </div>

          <div className="c4-terms">
            {terms.map((t) => (
              <article key={t.name}>
                <h3>{t.name}</h3>
                <p>{t.body}</p>
                {'open' in t && t.open ? (
                  <p className="c4-open">
                    <span className="c4-label">Not yet decided</span>
                    {t.open}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <p className="c4-note" style={{ marginTop: 'var(--s5)', maxWidth: '58ch' }}>
            {inclusionsOpen}
          </p>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">What the time is worth</h2>
          <div style={{ marginTop: 'var(--s4)' }}>
            <ValueCalc />
          </div>
          <Cta line={ctas.pricing.line} action={ctas.pricing.action} href="/contact" />
        </div>
      </section>
    </Shell>
  )
}
