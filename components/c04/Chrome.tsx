import Link from 'next/link'
import { LogoHorizontal } from '@/components/Brand'
import { meta } from '@/lib/c04'
import { publicEmail } from '@/lib/contact'

/* ------------------------------------------------------------------------ *
 * Shared chrome for the supporting pages.
 *
 * The homepage keeps its own sticky folio, because it has nine sections and
 * a progress rule to show. These pages do not, so they take a plain header
 * of the same materials: the monogram, the label face, a hairline and the
 * one red rule under the call to action.
 * ------------------------------------------------------------------------ */

export const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
]

export function Header({ current }: { current?: string }) {
  return (
    <header className="c4-head2">
      <div className="c4-shell c4-head2__bar">
        <Link href="/" className="c4-head2__mark" aria-label="Pow and Partners, home">
          <LogoHorizontal />
        </Link>
        <nav className="c4-head2__nav" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current === n.href ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="c4-head2__cta">
            Start a conversation
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function PageHead({
  n,
  folio,
  title,
  lead,
  aside,
}: {
  n: string
  folio: string
  title: React.ReactNode
  lead?: string
  aside?: React.ReactNode
}) {
  return (
    <header className="c4-ph">
      <div className="c4-shell">
        <p className="c4-eyebrow">
          {n} · {folio}
        </p>
        <div className="c4-ph__grid">
          <h1 className="c4-h1">{title}</h1>
          <div className="c4-ph__aside">
            {lead ? <p className="c4-lead">{lead}</p> : null}
            {aside}
          </div>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="c4-foot on-black">
      <div className="c4-shell">
        <div className="c4-foot__top">
          <div className="c4-foot__brand">
            <p className="c4-label">Pow &amp; Partners</p>
            <p>
              P&amp; is a technology, innovation and commercial development group. We identify
              opportunities, build the technology around them, prove it in live operations, and turn
              what works into products and businesses.
            </p>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              <li>
                <Link href="/solutions#atelier">Atelier</Link>
              </li>
              <li>
                <Link href="/solutions#nexus">Nexus</Link>
              </li>
              <li>
                <Link href="/solutions#blueprint">Blueprint</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/what-we-do">What we do</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {publicEmail() ? (
                <li>
                  <a href={`mailto:${publicEmail()}`}>{publicEmail()}</a>
                </li>
              ) : null}
              <li>
                <Link href="/contact">Start a conversation</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="c4-foot__base">
          <span className="c4-label">© 2026 Pow &amp; Partners</span>
          <span className="c4-label">
            Registered in <span className="c4-pw">country</span> · Company number{' '}
            <span className="c4-pw">00000000</span>
          </span>
          <span className="c4-label">{meta.reach}</span>
        </div>
      </div>
    </footer>
  )
}

export function Shell({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="c4-skip">
        Skip to content
      </a>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
