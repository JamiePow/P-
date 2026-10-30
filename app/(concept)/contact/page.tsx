import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import ContactForm from '@/components/ContactForm'
import { contact, publicEmail, enquiriesOpen } from '@/lib/contact'

/*
  Rendered per request rather than prerendered.

  Whether enquiries are open depends on two environment variables that the
  API route also reads. If this page were baked at build time, setting a
  mailbox on the host without a rebuild would leave a disabled form in front
  of a working endpoint — the page and the endpoint would disagree about
  whether enquiries are open, which is the class of bug this whole flow
  exists to prevent.
*/
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Start a conversation',
  description:
    'Tell us which systems you run and where the time goes, and we will tell you what we would look at first. Working across the United Kingdom and Ireland.',
  alternates: { canonical: '/contact' },
}

/*
  Moved onto the shared shell. It previously ran on a second root layout with
  its own header, footer, type scale and brand line, which meant the primary
  call to action on every page led somewhere that looked like another company.

  The form itself is unchanged apart from its class names: same validation,
  same spam handling, same error announcement, same refusal to report success
  without a 200 from the server.
*/

const faqs = [
  {
    q: 'What happens after I send this?',
    a: 'One of the partners reads it and replies, usually within one working day. If it is clearly not something we can help with, we will say so rather than booking a call to tell you.',
  },
  {
    q: 'How quickly can you start?',
    a: 'Usually within three to four weeks. The audit can often begin sooner, because it needs two people rather than a full team.',
  },
  {
    q: 'Do you work with smaller businesses?',
    a: 'Yes, where the ambition is clear and the decision maker is in the room. The stage matters less to us than whether someone can say yes.',
  },
  {
    q: 'Who owns the work?',
    a: 'You own everything specific to your business, on final payment. Reusable platform components stay with P&, which is what keeps the price where it is. That split is written into the contract rather than left to be argued about later.',
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
    <Shell current="/contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHead
        n="07"
        folio="Contact"
        title={
          <>
            Start a conversation<span className="c4-stop">.</span>
          </>
        }
        lead="Tell us which systems you run and where the time goes, and we will tell you what we would look at first. If we do not think there is enough in it to be worth doing, we will say so."
      />

      <section className="c4-sec2">
        <div className="c4-shell c4-contact">
          <div>
            <ContactForm fallbackEmail={publicEmail()} enabled={enquiriesOpen()} />
          </div>

          <aside className="c4-contact__aside">
            <div>
              <p className="c4-label">How this reaches us</p>
              <p className="c4-contact__h">The form goes straight to the partners.</p>
              <p className="c4-small">
                We read everything that comes in and reply within one working day. Tell us the
                systems you run and what is costing you time, and we will say what we would look at
                first.
              </p>
              {publicEmail() ? (
                <p className="c4-contact__mail">
                  <a href={`mailto:${publicEmail()}`}>{publicEmail()}</a>
                </p>
              ) : null}
            </div>

            <div>
              <p className="c4-label">Where we work</p>
              <p className="c4-contact__h">{contact.reach}</p>
              <p className="c4-small">
                We work with operators across the United Kingdom and Ireland, on site and remotely.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="c4-sec2">
        <div className="c4-shell">
          <h2 className="c4-eyebrow">Common questions</h2>
          <div className="c4-rows c4-rows--top" style={{ marginTop: 'var(--s4)' }}>
            {faqs.map((faq, i) => (
              <div className="c4-row c4-row--faq" key={faq.q} data-reveal>
                <span className="c4-row__n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="c4-row__name">{faq.q}</h3>
                <div className="c4-row__body">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}
