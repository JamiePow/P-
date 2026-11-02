/*
  P& group homepage — content.

  PRIMARY SOURCE: ~/Desktop/For Taylor/PandP-business-plan.pdf
  "P& — Business Plan", CONFIDENTIAL · SEPTEMBER 2026, 18pp.

  Every statement below is traceable to that document and the page is named
  against it. Nothing is invented and nothing is reconstructed from memory.

  What is deliberately NOT carried across, because the document is marked
  confidential and most of it is not public material: the shareholder
  framework and equity splits, partner reward, the authority matrix, market
  sizing, named competitors and their liquidation figures, and the identity of
  the proof environments. The plan is explicit that Crafted Studio and
  Aquathirst remain with Taylor and Jack on written commercial terms, so the
  site describes them by what they are rather than naming them as group
  assets.

  Naming discipline, from p.03 of the plan: the brand is P& or POW & PARTNERS.
  Never P&P.
*/

export type Stage = 'In market' | 'In development' | 'Partnership'

export type Business = {
  key: string
  name: string
  sector: string
  line: string
  stage: Stage
  accent: string
  accentNote: string
  href: string | null
  hrefLabel: string
  external?: boolean
  plate: string
  source: string
  featured: boolean
}

/*
  A note on which businesses these are.

  The plan names four trading verticals — P& Atelier, P& Nexus, P& The
  Boutique and P& The Concierge — plus P& The Lab and Pow XD. Blueprint does
  not appear in it; it exists only in this repository's own lib/c04.ts, as a
  construction vertical marked "In development". The three featured here are
  the three Jamie asked for, and the discrepancy is flagged in the delivery
  rather than quietly resolved either way.
*/
export const businesses: Business[] = [
  {
    key: 'nexus',
    name: 'Nexus Routes',
    sector: 'Field service and delivery',
    line: 'Planning, dispatch and proof of delivery, built inside a live route operation.',
    stage: 'In market',
    accent: '#0F3D3E',
    accentNote: 'Established. Extracted from the live Nexus brand assets.',
    href: '/solutions#nexus',
    hrefLabel: 'Explore',
    plate: 'nexus',
    source: 'Plan p.06 — "Built for and running inside" its proof environment, trading.',
    featured: true,
  },
  {
    key: 'blueprint',
    name: 'Blueprint',
    sector: 'Construction',
    line: 'Site capture tied to the drawing revision, so an application builds itself.',
    stage: 'In development',
    accent: '#15395B',
    accentNote: 'Proposed. Cyanotype — the blue a drawing is printed in.',
    href: '/solutions#blueprint',
    hrefLabel: 'Explore',
    plate: 'blueprint',
    source: 'lib/c04.ts — "In development". Not present in the business plan.',
    featured: true,
  },
  {
    key: 'atelier',
    name: 'Atelier',
    sector: 'Jewellery and bridal',
    line: 'Jewellery commerce, built for a working premium jeweller and proved in its trading.',
    stage: 'In market',
    accent: '#0D6B62',
    accentNote: 'Proposed. Verdigris — see the note on Tiffany in the delivery.',
    href: '/solutions#atelier',
    hrefLabel: 'Explore',
    plate: 'atelier',
    source: 'Plan p.06 — jewellery commerce, proof environment trading.',
    featured: true,
  },
]

export const featured = businesses.filter((b) => b.featured)

/* ---------------------------------------------------------------- 01 hero
   "Internally: build it, prove it, scale it. Externally: ideas, made
   valuable." — plan p.03. The closing page of the plan is titled with the
   same line, so it is the group's external statement rather than a phrase
   lifted out of a paragraph. */
export const hero = {
  headline: 'Ideas, made valuable',
  support:
    'An innovation group that builds technology, brands and businesses, and proves them in live trading before selling them to anyone.',
  source: 'Plan p.03 (external line) and p.03 positioning.',
}

/* ------------------------------------------------------------ 02 who we are
   "Five operators. Four markets. One group." — plan p.04. "P& is unusual in
   that each partner arrives with a live commercial position rather than a
   plan to build one. The group exists to connect them, and to take what each
   has built and sell it to the rest of its market." */
export const who = {
  eyebrow: 'Who we are',
  display: 'Five operators. Four markets. One group',
  body:
    'Each partner arrives with a business already trading rather than a plan to build one, and with the access that comes with it. P& connects them, supplies the design and delivery craft, and takes what each has proved to the rest of its market.',
  source: 'Plan p.04 — The Partners; p.06 — Pow XD supplies the craft.',
}

/* ------------------------------------------------------------- 03 the ethos
   Set in italic in the plan, which is where this treatment comes from. The
   supporting line is the plan's own justification for it, with the ownership
   claim removed: the plan says "a business we also own", but it also records
   that the proof environments stay with their partners, so the public line
   says what is true of the systems rather than of the ownership. */
export const believe = {
  eyebrow: 'What we believe',
  display:
    'Nothing is sold that has not first been proven inside a business that was paying for the outcome',
  body:
    'No pilots. It means we can point at a business running the systems we built, and show you what they did to its numbers.',
  source: 'Plan p.03 — the loop rule, set in italic, and its justification.',
}

/* -------------------------------------------------------- 04 how we help
   The plan states the capability as five things, not three territories, and
   states them four times: "branding, design, integration, delivery and
   ongoing maintenance". They are presented here as the plan presents them —
   one package, proved first — rather than reorganised into invented
   groupings. */
export const help = {
  eyebrow: 'How we work with brands',
  display: 'The same five things, proved on our own businesses first',
  items: [
    ['Branding', 'The identity and the story a business goes to market with.'],
    ['Design', 'Products, storefronts and experiences people want to use.'],
    ['Integration', 'Making the systems a business already runs work together.'],
    ['Delivery', 'Hands-on build and launch, against a real deadline.'],
    ['Maintenance', 'Staying with it afterwards, where the value settles.'],
  ] as [string, string][],
  source: 'Plan p.02, p.03 and p.06 — "the same five things", stated verbatim.',
}

/* ----------------------------------------------------------- 05 portfolio */
export const portfolio = {
  eyebrow: 'Our businesses',
  display: 'Where the thinking is proved',
}

/* --------------------------------------------------------------- 06 close */
export const closing = {
  display: 'Tell us what you are building',
  cta: 'Start a conversation',
}

export const nav = [
  { href: '#businesses', label: 'Businesses' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
