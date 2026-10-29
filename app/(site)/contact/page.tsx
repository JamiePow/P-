import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Label from '@/components/Label'
import Dot from '@/components/Dot'
import ContactForm from '@/components/ContactForm'
import { contact, publicEmail } from '@/lib/contact'
import { deliveryConfigured, notifyAddress } from '@/lib/enquiry'

/* Enquiries are open only when there is somewhere for one to go. */
const enquiriesOpen = () => deliveryConfigured() && Boolean(notifyAddress())
import { site } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Pow & Partners. Working across the United Kingdom and Ireland.',
  alternates: { canonical: '/contact' },
}

const faqs = [
  {
    q: 'How quickly can you start?',
    a: 'Usually within three to four weeks. Framing work can often begin sooner, because it needs two people rather than a full team.',
  },
  {
    q: 'Do you work with smaller businesses?',
    a: 'Yes, where the ambition is clear and the decision maker is in the room. The stage matters less to us than whether someone can say yes.',
  },
  {
    q: 'Who owns the work?',
    a: 'You own everything specific to your business, on final payment. Reusable platform components stay with P&, which is what keeps the price where it is. That split is written into the contract, not left to be argued about later.',
  },
  {
    q: 'Will you take equity instead of fees?',
    a: 'Occasionally, and only where we would have taken the work anyway. It is a deliberate decision at group level rather than a discount mechanism.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        label="Contact"
        title={
          <>
            Start a conversation<Dot />
          </>
        }
        standfirst="Tell us what you are trying to build and where it is stuck. One of the partners replies, usually the same day."
      />

      <section className="shell grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <ContactForm fallbackEmail={publicEmail()} enabled={enquiriesOpen()} />

        <div>
          {/* The form is the channel. An email address appears here only
              once a mailbox exists and a real message has arrived through
              it; until then publicEmail() returns null and nothing is
              printed. There is no public telephone number or address. */}
          <div className="rule pt-10">
            <Label>How this reaches us</Label>
            <p className="mt-6 font-display text-2xl">
              The form goes straight to the partners.
            </p>
            <p className="mt-4 max-w-prose text-sm text-muted">
              We read everything that comes in and reply within one working day. Tell us the
              systems you run and what is costing you time, and we will say what we would look at
              first.
            </p>
            {publicEmail() ? (
              <p className="mt-6">
                <a href={`mailto:${publicEmail()}`} className="font-display text-xl hover:text-accent">
                  {publicEmail()}
                </a>
              </p>
            ) : null}
          </div>

          <div className="rule mt-12 pt-10">
            <Label>Where we work</Label>
            <p className="mt-6 font-display text-2xl">{contact.reach}</p>
            <p className="mt-4 max-w-prose text-sm text-muted">
              We work with operators across the United Kingdom and Ireland, on site and remotely.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pt-28 lg:pt-36">
        <Reveal>
          <Label>Common questions</Label>
        </Reveal>
        <div className="rule mt-10">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.05}>
              <article className="grid gap-4 border-b border-hairline py-8 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
                <h2 className="font-display text-xl">{faq.q}</h2>
                <p className="max-w-prose text-muted">{faq.a}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-accent mt-28">
        <div className="shell py-20">
          <p className="font-display text-[clamp(2rem,5vw,3.6rem)]">
            Ideas, made valuable<Dot />
          </p>
        </div>
      </section>
    </>
  )
}
