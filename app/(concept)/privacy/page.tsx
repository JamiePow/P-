import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { privacyPolicy, legalStatus } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What this site collects, what it does not, and what happens to an enquiry once it is sent.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <Shell>
      <PageHead
        n="08"
        folio="Legal"
        title={<>Privacy<span className="c4-stop">.</span></>}
        lead="What happens to the details you send us, and what this website does not collect."
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
          <p className="c4-label">Last updated {privacyPolicy.updated}</p>
          {privacyPolicy.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {privacyPolicy.sections.map((s) => (
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
