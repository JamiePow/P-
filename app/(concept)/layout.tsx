import type { Metadata } from 'next'
import { display, sans } from './fonts'
import { site } from '@/lib/data'
import { robotsPolicy } from '@/lib/env'
import './c04.css'

/*
  A second root layout, for the concept work only.

  The reference proposal embeds Instrument Serif and Inter and no monospace,
  so this route loads two families rather than three. The site routes keep
  IBM Plex Mono through their own layout, unchanged.

  Concept 04 is a creative exploration, so it is kept out of the live site's
  chrome entirely: no site header, no site footer, no global stylesheet. The
  existing routes keep their own root layout under app/(site), and their URLs
  are unchanged. Nothing here is indexed.
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

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body className="c4">{children}</body>
    </html>
  )
}
