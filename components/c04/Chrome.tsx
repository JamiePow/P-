import Link from 'next/link'
import { LogoHorizontal } from '@/components/Brand'
import { meta } from '@/lib/c04'
import { publicEmail, contact } from '@/lib/contact'

/* ------------------------------------------------------------------------ *
 * The chrome. One header, one footer, every page.
 *
 * Previously the homepage carried its own sticky folio whose links were all
 * in-page anchors, so the only page reachable from the front of the site was
 * the contact page — and that sat on a second shell with its own header,
 * footer and brand line. There is now one of each, and every link in them
 * goes to a real page.
 * ------------------------------------------------------------------------ */

export const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
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
          <Link
            href="/contact"
            className="c4-head2__cta"
            aria-current={current === '/contact' ? 'page' : undefined}
          >
            Start a conversation
          </Link>
        </nav>

        {/*
          The narrow-width menu. The inline links are hidden below 900, which
          previously left a phone with no way to reach any page but contact.

          A native <details> rather than a scripted menu: it opens and closes
          with the keyboard, is announced correctly, and works with scripting
          off, which the rest of this site also does.
        */}
        <details className="c4-menu">
          <summary>
            <span className="c4-menu__label">Menu</span>
            <span className="c4-menu__bars" aria-hidden="true" />
          </summary>
          <div className="c4-menu__panel">
            <nav aria-label="Primary, narrow screens">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={current === n.href ? 'page' : undefined}
                >
                  {n.label}
                </Link>
              ))}
              <Link href="/contact" className="c4-menu__cta">
                Start a conversation
              </Link>
            </nav>
          </div>
        </details>
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
  const email = publicEmail()
  return (
    <footer className="c4-foot on-black">
      <div className="c4-shell">
        <div className="c4-foot__top">
          <div className="c4-foot__brand">
            <p className="c4-label">Pow &amp; Partners</p>
            <p>{meta.support}</p>
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
                <Link href="/how-we-work">How we work</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {email ? (
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
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
        {/* No registration line until the details are verified. A footer
            without a company number is unremarkable; one carrying 00000000
            is not. Nothing here is invented. */}
        <div className="c4-foot__base">
          <span className="c4-label">© {new Date().getFullYear()} Pow &amp; Partners</span>
          <span className="c4-label">{contact.reach}</span>
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
