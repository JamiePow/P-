import type { Metadata } from 'next'
import '../globals.css'
import { display, sans, mono } from '../fonts'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { site } from '@/lib/data'
import { publicEmail } from '@/lib/contact'
import { robotsPolicy } from '@/lib/env'

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
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.purpose}`,
    description: site.description,
    images: ['/og.png'],
  },
  alternates: { canonical: '/' },
  robots: robotsPolicy,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      slogan: site.tagline,
      description: site.description,
      areaServed: ['GB', 'IE'],
      /* email and telephone are omitted until a mailbox exists and a
         real message has been received through it. A structured data
         field is a claim, and an unverified one is a false claim. */
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
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {/* Marks the document as able to run the reveal. Without this the
            reveal styles never apply and every section is simply visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
