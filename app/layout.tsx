import type { Metadata } from 'next'
import { display, sans } from './fonts'
import { site } from '@/lib/data'
import { publicEmail } from '@/lib/contact'
import { robotsPolicy } from '@/lib/env'
import './c04.css'

/*
  The root layout. One shell, every page.

  It was previously the (concept) route group's layout, which meant the app
  had no root layout at all and Next refused to render a branded 404 for an
  unmatched URL. The group folder stays — route groups do not appear in a
  URL — but the document shell now lives at the root where it belongs, and
  app/not-found.tsx inherits it.

  There used to be two: this one for the concept, and a second under
  app/(site) carrying its own header, footer, type scale, brand line and
  stylesheet. A visitor who clicked the primary call to action crossed
  between them. The second shell has been retired and its pages — contact,
  how we work, privacy and terms — now live here.

  The reference proposal embeds Instrument Serif and Inter and no monospace,
  so two families load rather than three.
*/

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.purpose}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.purpose}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}. Give your people their week back.` }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  /* Indexable only on a production deployment. A review build is not. */
  robots: robotsPolicy,
}

/* Organisation and website markup. Email and telephone are omitted until a
   mailbox exists and a real message has arrived through it: a structured data
   field is a claim, and an unverified one is a false claim. No registered
   address and no company number appear until they are verified. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      areaServed: ['GB', 'IE'],
      ...(publicEmail() ? { email: publicEmail() } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en-GB',
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body className="c4">
        {/* Marks the document as able to run the reveal. Without this the
            reveal styles never apply and every section is simply visible,
            which is the correct behaviour with scripting off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
