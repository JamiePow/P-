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
    line: 'Work leaves on a van and comes back on paper. Nexus closes the gap between the job and the invoice.',
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
    line: 'Site work gets recorded twice and billed late. Blueprint ties what happened on site to the drawing revision.',
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
    line: 'A jeweller answers one question from three systems. Atelier puts the whole piece on a single record.',
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

/*
  ================================================================= COPY ====

  GOVERNING SOURCE: the founder brief of this session. Where it differs from
  PandP-business-plan.pdf (Sept 2026), the brief wins, as it instructs — and
  it differs materially. Those contradictions are listed in the delivery, not
  resolved quietly here. In short: the plan's positioning ("proves them inside
  real operating environments, then commercialises whatever survives"), its
  central rule ("nothing is sold that has not first been proven inside a
  business that was paying for the outcome"), its "five operators, four
  markets" framing and its five-part capability list have all been removed at
  the founder's instruction.

  What survives from the plan: "Ideas, made valuable." — its external line and
  the title of its closing page. Plus the two visual devices, the red full
  stop and the rule-and-caps eyebrow.

  The experience claim is the founder's own, stated in the brief: more than two
  decades across design, digital products, technology and commercial delivery,
  spanning local businesses and enterprise platforms. Nothing is added to it,
  no figures are invented, and no client or achievement is named.
*/


/* ==========================================================================
   PHOTOGRAPHY

   Unsplash, standard licence — free for commercial use, no permission or
   attribution required. Unsplash+ (paid) results were excluded. Two
   candidates were rejected on inspection rather than on their alt text: one
   carried a political placard, the other a third-party courier's livery.
   Everything below has been looked at.

   These are stand-ins for a commissioned shoot. They are other people's
   premises and staff, which is fine for stock and is not the same as
   photographing P&'s own businesses. Before launch they should be replaced,
   or at minimum downloaded and self-hosted rather than served from
   Unsplash's CDN.

   Each entry carries its own mobile crop. The hero's is a chosen frame
   rather than an automatic one: an entropy crop of the landscape original
   picked the wall and lost the walking figure.
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
  who: {
    id: 'photo-1763890869725-83a0af1d0b8a',
    alt: 'Someone working at a desk beside a wall of windows in late light.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=760&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/person-sitting-at-desk-by-large-window-wMeXDTl46Ho',
  },
  believe: {
    id: 'photo-1648824572347-517357c9c44e',
    alt: 'Two people in a shop looking at something together on a tablet.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=900&h=1400&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/two-men-in-a-store-looking-at-a-tablet-r--jcbaXgek',
  },
  think: {
    id: 'photo-1741181296065-8ab8a9883ffe',
    alt: 'A set square and a knife on a work surface in low sunlight.',
    w: 'w=1400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/triangle-ruler-and-utility-knife-sit-in-the-sunlight-hZej0jWoF8g',
  },
  nexus: {
    id: 'photo-1623235688294-31351ca7d358',
    alt: 'A van being loaded from the rear on a city street.',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=900&h=1200&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/a-truck-is-parked-on-the-side-of-the-road-c9p30E94OUU',
  },
  atelier: {
    id: 'photo-1786840320404-4c1c26980075',
    alt: 'A jeweller cutting metal with a saw at a workbench.',
    w: 'w=1400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/person-using-jewelers-saw-at-workbench-rIKWHwHWQrg',
  },
  blueprint: {
    id: 'photo-1768677903496-becc4be07258',
    alt: 'A worker checking steel reinforcement on a building site, seen from above.',
    w: 'w=2000&q=80&auto=format&fit=crop',
    m: 'w=1100&h=740&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/construction-worker-inspects-rebar-on-a-building-site-dSjrv4w1g1Q',
  },
  close: {
    id: 'photo-1717478101769-b9711eb577c0',
    alt: '',
    w: 'w=2400&q=80&auto=format&fit=crop',
    m: 'w=1100&h=900&q=80&auto=format&fit=crop&crop=entropy',
    credit: 'unsplash.com/photos/a-person-standing-in-front-of-a-concrete-wall-dm8yq6X3QyQ',
  },
}

export const src = (k: string, mobile = false) =>
  `${CDN}${img[k].id}?${mobile ? img[k].m : img[k].w}`

/* ------------------------------------------------------------------ 01 */
export const hero = {
  headline: 'Ideas, made valuable',
  support:
    'We put design, technology and commercial thinking in the same room, then use them to build products, businesses and experiences that make people’s lives easier.',
}

/* ------------------------------------------------------------------ 02 */
export const who = {
  eyebrow: 'Who we are',
  display: 'Two decades of building, and still most interested in what comes next',
  body:
    'P& runs on more than twenty years of designing, building and looking after digital products — for small local businesses and for enterprise platforms, which are not the same problem. The range is the useful part. We know what a small team can absorb, and what it takes to change something large without breaking it.',
}

/* ------------------------------------------------------------------ 03 */
export const believe = {
  eyebrow: 'What we believe',
  display: 'Technology should work for people',
  body:
    'The best software takes work away rather than adding it. It makes a complicated job feel simple and gives people back time they were losing. We automate gladly — the question we care about is who ends up better off.',
}

/* ------------------------------------------------------------------ 04 */
export const help = {
  eyebrow: 'How we think',
  display: 'How it looks, how it works, how it holds up',
  items: [
    [
      'How it looks',
      'If an interaction feels careless, people assume the product is too. Details are read as evidence.',
    ],
    [
      'How it works',
      'Impressive and awkward is a failure. The complicated part is the part that should feel simple.',
    ],
    [
      'How it holds up',
      'Something that works today but cannot grow is unfinished. We build for the version after this one.',
    ],
  ] as [string, string][],
  commercial:
    'We do this for our own businesses and for other people’s — designing, building and improving products, platforms and the experiences around them.',
}

/* ------------------------------------------------------------------ 05 */
export const portfolio = {
  eyebrow: 'What we are building',
  display: 'Three problems worth solving',
}

/* ------------------------------------------------------------------ 06 */
export const closing = {
  display: 'Tell us what you are building, or what you want to make better',
  cta: 'Start a conversation',
  signoff: 'Ideas, made valuable',
}

export const nav = [
  { href: '#businesses', label: 'Businesses' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]
