import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Dot from '@/components/Dot'
import { site } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms',
  description: `Terms of use for the ${site.name} website.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title={<>Terms<Dot /></>}
        standfirst="The terms on which this site is provided, separate from any contract for work."
      />
      <section className="shell max-w-prose space-y-6 pb-24 text-lg">
        <p>
          The content on this site is provided for information. Market figures are drawn from
          published sources and from the group&rsquo;s own modelling, and are given as at the date
          of publication. Price bands are indicative for scoping and are not an offer.
        </p>
        <p>
          Work described here was carried out for clients who have agreed to it being described.
          Trade marks and design work shown remain the property of their respective owners. Nothing
          on this site forms a contract. Engagements are governed by a separate agreement signed by
          both parties.
        </p>
        <p>
          {site.name} is registered in [country], company number [00000000], at [registered
          address to be confirmed].
        </p>
        <p className="text-muted">
          This page is a working draft. The final wording should be reviewed by [legal adviser]
          before the site goes live.
        </p>
      </section>
    </>
  )
}
