import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { websiteTerms, legalStatus } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms on which this website is provided.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <Shell>
      <PageHead
        n="08"
        folio="Legal"
        title={<>Website terms<span className="c4-stop">.</span></>}
        lead="The terms on which this website is provided. They do not govern any engagement, which is contracted separately."
        aside={
          <p className="c4-note">
            <span className="c4-label">Status</span>
            <br />
            {legalStatus}
          </p>
        }
      />

      <section className="c4-sec2">
        <div className="c4-shell c4-legal">
          <p className="c4-label">Last updated {websiteTerms.updated}</p>
          {websiteTerms.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {websiteTerms.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} style={{ marginTop: 'var(--s2)' }}>
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}
