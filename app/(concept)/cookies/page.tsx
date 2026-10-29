import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { cookiePolicy, legalStatus } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description:
    'This site sets no cookies, uses no storage and loads nothing from another company. What was checked, and when.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <Shell>
      <PageHead
        n="06"
        folio="Legal"
        title={<>Cookies<span className="c4-stop">.</span></>}
        lead="There are none. That was checked rather than assumed."
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
          <p className="c4-label">Last updated {cookiePolicy.updated}</p>
          {cookiePolicy.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <table>
            <thead>
              <tr>
                <th>What</th>
                <th>Status</th>
                <th>How we know</th>
              </tr>
            </thead>
            <tbody>
              {cookiePolicy.table.map(([a, b, c]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td>{b}</td>
                  <td>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {cookiePolicy.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} style={{ marginTop: 'var(--s2)' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}
