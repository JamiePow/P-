/* ------------------------------------------------------------------------ *
 * lib/contact.ts
 *
 * Every public contact detail passes through here.
 *
 * The business mailbox does not exist yet. Until it does, and until a real
 * message has been received through it, publicEmail() returns null and the
 * website offers the enquiry form instead of an address. Nothing in the
 * application may print an email address that has not been verified.
 *
 * To go live:
 *   1 create the mailbox
 *   2 set NEXT_PUBLIC_CONTACT_EMAIL and ENQUIRY_NOTIFY_EMAIL in the host
 *   3 send one real enquiry and confirm it arrives
 *   4 set CONTACT_EMAIL_VERIFIED=true
 *
 * Step 4 is a separate switch on purpose. Configuring an address proves
 * nothing; receiving a message through it does.
 * ------------------------------------------------------------------------ */

const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null

/* Deliberately not NEXT_PUBLIC. Verification is an operational fact, set by
   whoever ran the test, and it is read at build time on the server. */
const verified = process.env.CONTACT_EMAIL_VERIFIED === 'true'

export const contact = {
  /** The address to show publicly, or null while none is verified. */
  email: verified ? configured : null,
  /** Whether an address is configured at all, regardless of verification. */
  configured: Boolean(configured),
  verified,
  /* No public telephone number and no public address at launch. Company
     registration details go in the legal pages once they are verified, and
     nowhere else. */
  phone: null as string | null,
  address: null as string | null,
  /** The market served. A commercial statement, not a location. */
  reach: 'United Kingdom and Ireland',
} as const

/** The only sanctioned way to print an email address in public content. */
export function publicEmail(): string | null {
  return contact.email
}

/** For copy that needs to name the channel without naming an address. */
export const contactRoute = '/contact'
