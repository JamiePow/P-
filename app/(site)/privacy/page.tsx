import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Dot from '@/components/Dot'
import { site } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy',
  description: `How ${site.name} handles the information you send us.`,
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title={<>Privacy<Dot /></>}
        standfirst="What we collect, why we hold it, and how to have it removed."
      />
      <section className="shell max-w-prose space-y-6 pb-24 text-lg">
        <p>
          When you use the contact form we receive your name, email address, company and whatever
          you write in the message. We use it to reply and to keep a record of the enquiry. Nothing
          is sold or passed to third parties for marketing.
        </p>
        <p>
          Enquiries are kept for [retention period to be confirmed] and then deleted. This site
          sets no cookies and runs no analytics.
        </p>
        <p>
          To see what we hold or to have it removed, use the contact form. The data controller is{' '}
          {site.name}, [registered company details to be confirmed].
        </p>
        <p className="text-muted">
          This page is a working draft. The final wording should be reviewed by [legal adviser]
          before the site goes live.
        </p>
      </section>
    </>
  )
}
