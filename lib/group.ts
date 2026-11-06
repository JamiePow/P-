/*
  P& group site — content.

  PRIMARY SOURCE: ~/Desktop/For Taylor/PandP-business-plan.pdf
  "P& — Business plan and shareholder structure", CONFIDENTIAL · SEPTEMBER
  2026, 18pp. Read in full on 6 November 2026.

  WHAT CHANGED, AND WHY
  ---------------------
  The previous version of this file carried three businesses called "Nexus
  Routes", "Atelier" and "Blueprint", each with its own invented brand colour.
  None of that was right. The group's actual divisions are P& Atelier, P&
  Nexus, P& The Boutique, P& The Concierge, P& The Lab and Pow XD. "Nexus
  Routes" is not a name that exists anywhere in the business, and the three
  colour values were proposals of mine that were never approved.

  On instruction (6 Nov 2026) the site shows four of them for now — Atelier,
  Nexus, Blueprint and The Lab — with The Lab framed as the group's innovation
  lab rather than as the foundry-with-a-shareholding that the plan describes.

  BLUEPRINT IS FLAGGED, NOT INVENTED. P& Blueprint does not appear in the
  September 2026 plan, which lists The Boutique and The Concierge as verticals
  three and four. Blueprint was named by the founder on 6 Nov 2026 and is
  carried here as an in-development construction and trade vertical, described
  only from what this repository already claimed for it. Its positioning line
  needs confirming before launch.

  NO PER-BUSINESS BRAND COLOURS. The plan contains no colour values of any
  kind, and there are no brand files for these names anywhere on the machine.
  That is not an omission — the verticals are divisions of P& Group Ltd, not
  separate brands. The site therefore carries one identity. Every previous
  "business colour" in this file was invented and has been removed rather than
  replaced.

  CONFIDENTIAL MATERIAL NOT CARRIED ACROSS: the shareholder framework and
  equity splits, partner reward and the authority matrix, The Lab's slice of
  each vertical, market sizing and named competitors, and the identity of the
  proof environments. The plan is explicit that Crafted Studio and Aquathirst
  remain with Taylor and Jack on written commercial terms, so the site
  describes the proof environments by what they are rather than naming them.

  NAMING DISCIPLINE, from p.03 of the plan: the brand is P& or POW & PARTNERS.
  Never P&P — in any document, deck, contract, email signature or domain.
*/

export type Status = 'Trading' | 'In development' | 'Group function'

export type Division = {
  key: string
  /** Full legal-style name, as the plan writes it. */
  name: string
  /** The market, in the words a search for it would use. */
  sector: string
  /** What it actually is. One sentence, no adjectives spare. */
  summary: string
  /** The longer description. This is the page's indexable substance. */
  body: string
  status: Status
  /** Where the proof stands. Described, never named. */
  proof: string
  href: string | null
  plate: string
}

export const divisions: Division[] = [
  {
    key: 'atelier',
    name: 'P& Atelier',
    sector: 'Jewellery and bridal commerce',
    summary:
      'A commerce platform for engagement rings, diamonds and fine jewellery.',
    body:
      'Built on Shopify, with the APIs a generic store cannot offer: stone and setting configuration, diamond search, appointments, clienteling, valuations and aftercare treated as part of the experience rather than bolted on afterwards. Engagement and bridal is the highest-consideration purchase in the category, and the one where a generic storefront is most obviously the wrong tool.',
    status: 'Trading',
    proof:
      'Built for a working jewellery business and trading on the platform today.',
    href: '/solutions#atelier',
    plate: 'atelier',
  },
  {
    key: 'nexus',
    name: 'P& Nexus',
    sector: 'Operations and commercial control',
    summary:
      'One screen that shows an operator what their business is actually doing.',
    body:
      'Connected directly to Xero and Stripe, Nexus puts subscriptions, revenue, invoiced-against-paid, proof of delivery and the team on the road in a single view — instead of exporting three systems into a spreadsheet every Monday. First markets are water cooling and hydration, office coffee and vending: operators running the same shape of business on the same weekly rhythm.',
    status: 'Trading',
    proof:
      'Built for a working route and field operation, and running inside it today.',
    href: '/solutions#nexus',
    plate: 'nexus',
  },
  {
    key: 'blueprint',
    name: 'P& Blueprint',
    sector: 'Construction and trade',
    summary:
      'Projects, people, stock and cash flow in one picture, for small trade businesses.',
    body:
      'The same operating problem as Nexus, in a market that runs on jobs rather than routes: what is on site, who is on it, what has been ordered, what has been invoiced and what is still owed. In development, and the vertical with the least proof behind it so far.',
    status: 'In development',
    proof: 'In development. No proof environment confirmed.',
    href: null,
    plate: 'blueprint',
  },
  {
    key: 'lab',
    name: 'P& The Lab',
    sector: 'Innovation and applied research',
    summary:
      'Where the group tests new technology and decides what is worth building.',
    body:
      'The Lab is how P& stays ahead of its own roadmap. It evaluates emerging technology against real operating problems, reviews where each of our markets is moving, and runs the experiments that decide whether something becomes a feature, a product or the next vertical. It is the part of the group whose job is to be wrong early and cheaply, so the trading businesses are not wrong late and expensively.',
    status: 'Group function',
    proof: 'Group function. Feeds every vertical.',
    href: null,
    plate: 'lab',
  },
]

/* ==========================================================================
   PHOTOGRAPHY

   Unsplash, standard licence — free for commercial use, no permission or
   attribution required. Unsplash+ (paid) results were excluded. Every image
   below has been looked at, not accepted on its alt text: two earlier
   candidates were rejected on inspection, one carrying a political placard
   and one a third-party courier's livery.

   These are stand-ins for a commissioned shoot. They are other people's
   premises and staff, which is fine for stock and is not the same as
   photographing P&'s own businesses. Before launch they should be replaced,
   or at minimum downloaded and self-hosted rather than served from
   Unsplash's CDN.
   ========================================================================== */

const CDN = 'https://images.unsplash.com/'

export type Img = {
  id: string
  alt: string
  /** Desktop query. */
  w: string
  /** Mobile query — an art-directed crop, not a squeeze of the wide one. */
  m: string
  credit: string
}

export const img: Record<string, Img> = {
  hero: {
    id: 'photo-1717478054835-519ace54a229',
    alt: 'A person walking through a daylit concrete walkway.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=900&h=1500&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.55',
    credit: 'unsplash.com/photos/a-person-walking-down-a-walkway-in-a-building-dTtg0z3z_jQ',
  },
  group: {
    id: 'photo-1763890869725-83a0af1d0b8a',
    alt: 'Someone working at a desk beside a wall of windows in late light.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=760&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/person-sitting-at-desk-by-large-window-wMeXDTl46Ho',
  },
  model: {
    id: 'photo-1741181296065-8ab8a9883ffe',
    alt: 'A set square and a knife on a work surface in low sunlight.',
    w: 'w=1400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/triangle-ruler-and-utility-knife-sit-in-the-sunlight-hZej0jWoF8g',
  },
  atelier: {
    id: 'photo-1786840320404-4c1c26980075',
    alt: 'A jeweller cutting metal with a saw at a workbench.',
    w: 'w=1400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/person-using-jewelers-saw-at-workbench-rIKWHwHWQrg',
  },
  nexus: {
    id: 'photo-1623235688294-31351ca7d358',
    alt: 'A van being loaded from the rear on a city street.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=900&h=1200&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/a-truck-is-parked-on-the-side-of-the-road-c9p30E94OUU',
  },
  blueprint: {
    id: 'photo-1768677903496-becc4be07258',
    alt: 'A worker checking steel reinforcement on a building site, seen from above.',
    w: 'w=2000&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/construction-worker-inspects-rebar-on-a-building-site-dSjrv4w1g1Q',
  },
  lab: {
    id: '',
    alt: 'Awaiting photography.',
    w: '',
    m: '',
    credit: 'UNSOURCED — needs the browser on the user’s machine.',
  },
  close: {
    id: 'photo-1717478101769-b9711eb577c0',
    alt: '',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=900&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/a-person-standing-in-front-of-a-concrete-wall-dm8yq6X3QyQ',
  },
}

/*
  Concept rendering only. With NEXT_PUBLIC_CONCEPT_LOCAL_PLATES=1 the page
  serves the generated plates from public/plates instead of the photography,
  so the composition can be judged in an environment that cannot reach an
  image host. Stand-ins for layout, not art direction; never set in a real
  build.
*/
const LOCAL_PLATE: Record<string, string> = {
  hero: 'dawn',
  group: 'wall',
  model: 'studio',
  atelier: 'atelier',
  nexus: 'nexus',
  blueprint: 'blueprint',
  lab: 'hall',
  close: 'close',
}
const LOCAL = process.env.NEXT_PUBLIC_CONCEPT_LOCAL_PLATES === '1'

export const src = (k: string, mobile = false) => {
  /* A slot with no photograph yet must not take the page down with it. */
  if (!LOCAL && !img[k]?.id) return ''
  if (LOCAL) {
    const base = LOCAL_PLATE[k] ?? 'hall'
    const wide = ['hero', 'group', 'close']
    return `/plates/${base}-${wide.includes(k) && !mobile ? 'wide' : 'tall'}.webp`
  }
  return `${CDN}${img[k].id}?${mobile ? img[k].m : img[k].w}`
}

/* ==========================================================================
   COPY

   Structured as a corporate group site: what the group is, how it works, what
   it owns, how to reach it. Every section carries real indexable prose rather
   than a single display line, because the site has to rank as well as read.
   ========================================================================== */

/* ---------------------------------------------------------------- 01 */
export const hero = {
  /** H1. The plan's external line, p.03. */
  headline: 'Ideas, made valuable',
  standfirst:
    'P& is an innovation group. We build technology, brands and businesses, prove them inside real operating environments, then take what works to the rest of that market.',
  /** A factual strip under the masthead. Corporate sites earn trust here. */
  facts: [
    ['Group', 'P& Group Ltd'],
    ['Divisions', 'Four'],
    ['Trading', 'Two'],
    ['Founded', '2026'],
  ] as [string, string][],
}

/* ---------------------------------------------------------------- 02 */
export const group = {
  eyebrow: 'The group',
  heading: 'One company, four divisions, one way of working',
  body: [
    'P& Group Ltd is a single company. Each division goes to market under its own name, holds its own accountability and serves its own customers, but they are divisions rather than separate businesses — which is what lets work paid for once be reused across all of them.',
    'Every division sells the same five things into a different market: branding, design, integration, delivery and ongoing maintenance of a platform we have already proved on ourselves. That is what makes P& a group rather than four unrelated companies.',
  ],
  /** The five things. Short, scannable, and the page's keyword spine. */
  offer: [
    ['Branding', 'Identity, positioning and the language a business runs on.'],
    ['Design', 'Product and interface design, from first principle to final state.'],
    ['Integration', 'Connecting the systems a business already pays for.'],
    ['Delivery', 'Building it, shipping it and getting it into live use.'],
    ['Maintenance', 'Keeping it running, and moving it forward.'],
  ] as [string, string][],
}

/* ---------------------------------------------------------------- 03 */
export const model = {
  eyebrow: 'How the group works',
  heading: 'Build it once, for a real business. Then take it to that market',
  body:
    'Nothing is sold that has not first been proven inside a business that was paying for the outcome. It is the rule the whole group runs on, and the reason P& can walk into a conversation and point at a working system rather than a prototype.',
  steps: [
    ['Find', 'A problem inside a business we already own or can reach. Access before ideas.'],
    ['Build', 'Properly, for that one business, with a real customer and a real deadline.'],
    ['Prove', 'Run it in live trading until it measurably improves the business. No pilots.'],
    ['Productise', 'Separate what is reusable from what is specific. Package it and document it.'],
    ['Scale', 'Take it to the rest of that market — branding, design, integration, delivery, maintenance.'],
  ] as [string, string][],
}

/* ---------------------------------------------------------------- 04 */
export const portfolio = {
  eyebrow: 'Our businesses',
  heading: 'Four divisions, four markets',
  standfirst:
    'Two trading, one in development, and the lab that decides what comes next. Each one is led by a single accountable partner and built on the same platform discipline.',
  note:
    'Commercial terms and package pricing sit with each division, not with the group.',
}

/* ---------------------------------------------------------------- 05 */
export const belief = {
  eyebrow: 'What we believe',
  heading: 'Technology should work for people',
  body:
    'The best software takes work away rather than adding it. It makes a complicated job feel simple and gives people back time they were losing. We automate gladly — the question we care about is who ends up better off.',
}

/* ---------------------------------------------------------------- 06 */
export const contact = {
  eyebrow: 'Contact',
  heading: 'Contact the group',
  body:
    'For partnership, supplier and press enquiries, or to talk to one of the divisions directly.',
  cta: 'Get in touch',
  signoff: 'Ideas, made valuable',
}

export const nav = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '#businesses', label: 'Our businesses' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]
