/* ------------------------------------------------------------------------ *
 * lib/legal.ts
 *
 * Drafts for the three legal pages, written against what the website
 * actually does rather than against a template.
 *
 * Verified on 29 October 2026 by loading every route in a clean browser
 * profile: no cookies are set, nothing is written to local or session
 * storage, and no request leaves the site's own origin. The cookie policy
 * says so because that is true today, and it has to be revisited the moment
 * analytics are added.
 *
 * Anything only P& can supply is marked with NEEDS, and renders on the page
 * as a visible placeholder rather than as plausible-looking text.
 * ------------------------------------------------------------------------ */

import { site } from './data'
import { publicEmail } from './contact'

export const NEEDS = {
  entity: 'registered company name',
  number: 'company number',
  address: 'registered address',
  retention: 'retention period in months',
  reviewer: 'legal adviser',
} as const

export const legalStatus =
  'Draft for owner review. The wording describes what the website does today and has not been reviewed by a legal adviser.'

export type Section = { h: string; p: string[]; list?: string[] }

/* --------------------------------------------------------------- cookies -- */

export const cookiePolicy: { updated: string; intro: string[]; sections: Section[]; table: [string, string, string][] } = {
  updated: '29 October 2026',
  intro: [
    'This site sets no cookies. It does not use local storage, session storage or any similar technology, and it loads nothing from another company.',
    'That was checked rather than assumed: every page was loaded in a clean browser profile and the result was no cookies, no stored values and no requests leaving this site.',
  ],
  sections: [
    {
      h: 'Why there is no banner',
      p: [
        'A consent banner is required when a site stores or reads information on a device for anything other than a strictly necessary purpose. This site stores nothing, so there is nothing to ask permission for.',
        'If analytics are added later, that changes. This page and the privacy policy would both be updated before any measurement is switched on, and a consent mechanism would be added where one is required.',
      ],
    },
    {
      h: 'What happens when you send an enquiry',
      p: [
        'The contact form posts what you type to this site, which passes it to the mailbox that receives enquiries. Nothing is stored in your browser as part of that, and no identifier is set.',
        'The form counts how long the page has been open before you submit, and it holds that number only for the length of the request. It is used to tell an automated submission from a person, and it is not stored.',
      ],
    },
    {
      h: 'Third parties',
      p: [
        'None are loaded. Typefaces are served from this site rather than from a font service, and there is no analytics, advertising, chat, video or social embed anywhere on it.',
      ],
    },
  ],
  table: [
    ['Cookies set by this site', 'None', 'Verified across every page on 29 October 2026'],
    ['Cookies set by third parties', 'None', 'No third-party request is made'],
    ['Local and session storage', 'Not used', 'Verified across every page'],
    ['Analytics', 'Not implemented', 'See the privacy policy if this changes'],
  ],
}

/* --------------------------------------------------------------- privacy -- */

export const privacyPolicy: { updated: string; intro: string[]; sections: Section[] } = {
  updated: '29 October 2026',
  intro: [
    `This explains what ${site.name} does with personal information collected through this website. It covers the website only.`,
  ],
  sections: [
    {
      h: 'What we collect',
      p: [
        'Only what you send us through the contact form: your name, your email address, your company if you give one, what the enquiry concerns, and the message you write.',
        'The request also carries the page you sent it from and the page you arrived from, which we keep with the enquiry so we know where it came from. We do not collect anything else, and we do not build a profile of visitors.',
      ],
    },
    {
      h: 'Why we hold it',
      p: [
        'To reply to you and to keep a record of the enquiry and what we agreed. The lawful basis is our legitimate interest in responding to someone who has approached us about work, and in keeping a record of our own commercial dealings.',
      ],
    },
    {
      h: 'Who sees it',
      p: [
        `Enquiries are delivered to the mailbox the partners read${publicEmail() ? ` (${publicEmail()})` : ''}. We do not sell personal information, and we do not pass it to anyone for their own marketing.`,
        'The enquiry passes through our hosting provider and our email provider on its way to us. Both act on our instructions. [[processors]]',
      ],
    },
    {
      h: 'How long we keep it',
      p: [
        'Enquiries are kept for [[retention]] and then deleted, unless they became a piece of work, in which case they are kept with the records for that work.',
      ],
    },
    {
      h: 'Your rights',
      p: [
        'You can ask what we hold about you, ask for it to be corrected, ask for it to be deleted, ask us to stop using it, and ask for a copy in a portable form. You can also object to our using it on the basis of legitimate interest.',
        `Use the contact form${publicEmail() ? ` or write to ${publicEmail()}` : ''} and we will deal with it within one month. If you are not satisfied with how we handle it, you can complain to the Information Commissioner's Office.`,
      ],
    },
    {
      h: 'Cookies and measurement',
      p: [
        'This site sets no cookies and runs no analytics. The cookie policy sets out what was checked and when.',
      ],
    },
    {
      h: 'Who is responsible',
      p: ['The data controller is [[entity]], company number [[number]], registered at [[address]].'],
    },
  ],
}

/* ----------------------------------------------------------------- terms -- */

export const websiteTerms: { updated: string; intro: string[]; sections: Section[] } = {
  updated: '29 October 2026',
  intro: [
    'These terms cover the use of this website. They are not the terms of any engagement, which are agreed separately and in writing.',
  ],
  sections: [
    {
      h: 'What this site is',
      p: [
        `This website describes what ${site.name} does and how to get in touch. Nothing on it is an offer capable of acceptance, and nothing on it forms a contract.`,
      ],
    },
    {
      h: 'Prices',
      p: [
        'Published prices exclude VAT and are indicative of our standard packages. Implementation is quoted from the audit rather than from an average, so the figure for a particular business is the one in its proposal, not the one on this page.',
        'We may change published prices. The price that applies to an engagement is the one in the signed proposal.',
      ],
    },
    {
      h: 'Product status',
      p: [
        'Where a product is described as in development, its capabilities are proposed rather than released, and the website says so at the point the product is described. Nothing described as in development is available to buy.',
      ],
    },
    {
      h: 'Accuracy',
      p: [
        'We keep this site accurate and current, and we do not guarantee that it is free of error or always available. Where a figure is illustrative, the page says so.',
      ],
    },
    {
      h: 'Our material',
      p: [
        `The text, design, images and code on this site belong to [[entity]] unless stated otherwise. You may read it, link to it and quote it with attribution. You may not reproduce it as your own.`,
      ],
    },
    {
      h: 'Liability',
      p: [
        'We do not exclude liability for death or personal injury caused by negligence, or for fraud. Beyond that, we are not liable for loss arising from the use of this website, which is provided for information.',
      ],
    },
    {
      h: 'Law',
      p: ['These terms are governed by the law of [[jurisdiction]] and subject to its courts.'],
    },
  ],
}
