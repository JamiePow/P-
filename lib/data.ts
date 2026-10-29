/*
  Single content layer, written from the founding plan (September 2026).

  What is public here: the positioning, the operating loop, the three pillars
  and Labs, the four value layers, the partners, and the package bands, which
  were themselves benchmarked against published rate cards. What is not: the
  group financial model, the equity split, partner reward and anything in the
  plan marked confidential. Client names are left out until sign-off.
*/

export const site = {
  name: 'Pow & Partners',
  shortName: 'P&',
  tagline: 'Ideas, made valuable.',
  purpose: 'We build what comes next.',
  internalLine: 'Build it. Prove it. Scale it.',
  proposition:
    'P& identifies opportunities worth pursuing, builds technology and businesses around them, proves their value in live environments, then turns the strongest capabilities into scalable products, services and ventures.',
  description:
    'An innovation group that builds technology, customer experiences, products and businesses, proves them inside real operating environments, then commercialises the capability that survives contact with reality.',
  url: 'https://p-and.co.uk',
  /* Contact details live in lib/contact.ts and are not published until
     verified. Nothing here is a public address or number. */
  reach: 'United Kingdom and Ireland',
  device:
    'The ampersand is the brand. It is the join: technology and craft, insight and action, build and prove and scale. The red dot marks momentum, and what comes next.',
} as const

/* ---------- What the group is, and is not ---------- */

export type Denial = { claim: string; why: string }

export const isNot: Denial[] = [
  { claim: 'A design agency', why: 'Sells hours. Value caps at headcount.' },
  { claim: 'A software consultancy', why: "Builds other people's IP." },
  { claim: 'A venture fund', why: "Allocates capital it does not have." },
  { claim: 'A pure SaaS business', why: 'Needs capital and years before revenue.' },
  { claim: 'A branding studio', why: 'No compounding asset.' },
  { claim: 'A management consultancy', why: 'Advises, does not build or own.' },
]

export type ValueForm = { name: string; when: string; body: string }

export const valueForms: ValueForm[] = [
  { name: 'Fee', when: 'Services income today', body: 'The work clients pay for now.' },
  { name: 'Recurring', when: 'Software revenue tomorrow', body: 'What the work turns into once it is productised.' },
  { name: 'Equity', when: 'Ownership that compounds', body: 'The only form of value that is not capped by hours.' },
]

/* ---------- The operating loop ---------- */

export type Step = { n: string; name: string; body: string }

export const loop: Step[] = [
  {
    n: '01',
    name: 'Find',
    body: 'An opportunity worth pursuing, in a market a partner can already reach. Access before ideas.',
  },
  {
    n: '02',
    name: 'Build',
    body: 'The technology and the experience for one real business, with a real customer and a real deadline.',
  },
  {
    n: '03',
    name: 'Prove',
    body: 'Run it in a live operating environment until it measurably improves the business. No pilots, no demos.',
  },
  {
    n: '04',
    name: 'Productise',
    body: 'Separate what is reusable from what is specific. Package it, price it and document it as a product.',
  },
  {
    n: '05',
    name: 'Scale',
    body: 'Sell it to the rest of the market, or spin it out as a venture with its own capital and leadership.',
  },
]

export const loopRule =
  'Nothing is productised that has not first been proven inside a business that was paying for the outcome. That single rule is what separates P& from a group guessing at a product.'

/* ---------- Pillars and layers ---------- */

export type Pillar = {
  slug: string
  n: string
  name: string
  lead: string
  role: string
  summary: string
  body: string
  sells: string[]
  market: { label: string; value: string }[]
}

export const pillars: Pillar[] = [
  {
    slug: 'craft',
    n: 'Pillar 01',
    name: 'Craft',
    lead: 'Taylor Sullivan',
    role: 'Premium commerce IP, clienteling, configurators',
    summary:
      'Build one exceptional premium jewellery experience. Then sell the capability that made it possible to the several thousand jewellers who will never build it themselves.',
    body: 'The advantage is access, not the idea. Every vertical jewellery software vendor with real market presence is US headquartered and sells through quote-only pricing. Craft starts from inside a working premium jeweller, with real stock, real repairs, real valuations and real margin pressure, which is the one thing a software company serving this sector cannot buy.',
    sells: [
      'Bespoke product configurator, metals, stones, settings, engraving',
      'Jewellery product data model, carat, cut, clarity, hallmark, provenance',
      'Appointment booking with consultation types',
      'Digital clienteling, client book, wish lists, occasion reminders',
      'Repairs and valuations workflow',
      'Premium storefront architecture and theme system',
    ],
    market: [
      { label: 'UK jewellery retailers', value: '4,500' },
      { label: 'EU-27 jewellery retailers', value: '55,568' },
      { label: 'UK firms above £5m turnover', value: '~85' },
    ],
  },
  {
    slug: 'operations',
    n: 'Pillar 02',
    name: 'Operations',
    lead: 'Jack [surname]',
    role: 'Vertical SaaS, automation, recurring revenue, AI insight',
    summary:
      'A white-label operating platform for recurring, route-based service businesses. Already running inside one, already improving it.',
    body: 'Most vertical software companies are guessing. This one is not. The platform was specified by the people running a live workplace hydration operation, corrected by drivers and controllers, and paid for by an operation that needed it to work on Monday morning. The hard part now is subtraction: keeping what every route-service operator shares, configuring what differs by vertical, and removing what belongs to one company.',
    sells: [
      'Customer and contracts, sites, subscriptions, self-serve portal',
      'Route and delivery, planning, driver mobile workflow, proof of delivery',
      'Service and assets, asset register, scheduling, compliance cycles',
      'Billing and finance, recurring invoicing, credit control, dunning',
      'Analytics and AI insight, customer health, churn and growth signals',
      'Customer portal and automated communications',
    ],
    market: [
      { label: 'Water dispensers in Europe', value: '6.5m' },
      { label: 'European market revenue, 2024', value: '€2.3bn' },
      { label: 'Medium or large route operators, Europe', value: '5,500' },
    ],
  },
  {
    slug: 'commerce',
    n: 'Pillar 03',
    name: 'Commerce',
    lead: 'Jamie Pow',
    role: 'Generates cash and enterprise clients, builds delivery capability',
    summary:
      'Enterprise-quality commerce, delivered at materially greater speed and flexibility than a traditional transformation programme. The fastest route to cash in the group, and the engine that funds everything else.',
    body: 'The pitch is not that we build Shopify sites. It is that a premium retailer can now get enterprise-grade commerce in months rather than years, for a fraction of the cost, without accepting a worse result. Mainstream support for the previous generation of enterprise platforms ends between 2026 and 2028, which is a dated, verifiable window rather than an argument.',
    sells: [
      'Commerce strategy, service design, customer research',
      'UX, UI, brand experience and content design',
      'Shopify and Shopify Plus architecture, headless where it earns its place',
      'ERP, CRM, OMS, PIM, loyalty and payments integration',
      'CRO, experimentation, analytics, lifecycle and retention',
      'Internationalisation and checkout optimisation',
    ],
    market: [
      { label: 'UK Shopify Plus stores', value: '6,159' },
      { label: 'European B2C ecommerce, 2024', value: '€842bn' },
      { label: 'Magento stores since Q4 2021', value: '-31%' },
    ],
  },
]

export const labs = {
  name: 'Labs',
  role: 'R&D, group owned',
  summary: 'New ventures, new IP, equity upside.',
  body: 'Labs is not an idea bucket. It is a funnel with gates, budgets, time limits and a kill switch, and the discipline of the gates is worth more to the group than any individual venture inside them. Two ventures in flight at most, one past Validate at most, five gates, each with a written kill test.',
  gates: [
    { stage: 'Discover', time: '4 weeks', test: 'A named customer segment, ten problem interviews, evidence the market could support £5m of revenue, a named person willing to own it.' },
    { stage: 'Validate', time: '8 weeks', test: 'Twenty qualified conversations, five signed letters of intent or twenty-five paid pre-orders, a defensible wedge, a costed build plan.' },
    { stage: 'Build', time: '6 months', test: "Working product in customers' hands, three paying customers, unit economics modelled from real data." },
    { stage: 'Prove', time: '12 months', test: 'Retention data over two cohorts, payback under eighteen months, one repeatable acquisition channel.' },
    { stage: 'Scale', time: 'Open', test: 'Separate legal entity, its own board, its own funding plan.' },
  ],
}

export type Layer = { name: string; kind: string; craft: string; operations: string; commerce: string; labs: string }

export const layers: Layer[] = [
  {
    name: 'P& Services',
    kind: 'Fee income',
    craft: 'Jewellery commerce builds, growth retainers',
    operations: 'Implementation, integration, managed service',
    commerce: 'Launch, Evolve, Grow, Transform',
    labs: '',
  },
  {
    name: 'P& Software',
    kind: 'Recurring revenue',
    craft: 'Jewellery platform modules, configurator, clienteling',
    operations: 'The route-service operating platform',
    commerce: 'Accelerators, integrations, CRO tooling',
    labs: 'Venture platforms once proven',
  },
  {
    name: 'P& Ventures',
    kind: 'Equity ownership',
    craft: 'Growth shares in the anchor jewellery business',
    operations: 'Optionality on operator stakes',
    commerce: 'Equity-for-fee deals with high-conviction brands',
    labs: 'Whatever survives the gates',
  },
  {
    name: 'P& Labs',
    kind: 'Optionality',
    craft: 'Premium experience patterns reused everywhere',
    operations: 'Automation and AI-insight patterns',
    commerce: 'Enterprise relationships that seed new ventures',
    labs: 'The stage-gated pipeline itself',
  },
]

export const flywheel = [
  { title: 'Services fund products', body: 'Commerce cash pays for Operations engineering. No external capital required.' },
  { title: 'Live businesses prove products', body: 'Two of the three pillars are already trading. They are the test environments no competitor has.' },
  { title: 'Shared IP cuts delivery cost', body: 'Accelerators built once lift gross margin across every pillar that reuses them.' },
  { title: 'Ventures create equity', body: 'The only value form that is not capped by how many hours the group can sell.' },
]

/* ---------- Partners ---------- */

export type Partner = { name: string; role: string; pillar: string; body: string; owns: string[] }

export const partners: Partner[] = [
  {
    name: 'Jamie Pow',
    role: 'Founder and CEO',
    pillar: 'Commerce',
    body: 'Leads the group and the Commerce pillar. Carries group strategy, capital allocation, product and technology direction, brand, portfolio decisions and cross-pillar prioritisation.',
    owns: ['Group P&L and capital allocation', 'Commerce pillar', 'Product and technology strategy', 'Major partnerships'],
  },
  {
    name: 'Taylor Sullivan',
    role: 'Partner',
    pillar: 'Craft',
    body: "Owns the group's anchor jewellery business, which is the trading environment Atelier was built inside and corrected by.",
    owns: ['Craft pillar P&L', 'Trade relationships and sourcing', 'The proof environment', 'Premium retail experience standard'],
  },
  {
    name: 'Jack [surname]',
    role: 'Partner',
    pillar: 'Operations',
    body: 'Leads Operations and the field-service platform already running inside a live workplace hydration business, the single most valuable piece of evidence the group holds.',
    owns: ['Operations pillar P&L', 'The platform and its productisation', 'Route-service vertical relationships', 'Customer success and implementation'],
  },
]

/* ---------- Proof, packages, journal-free nav ---------- */

export type Proof = {
  slug: string
  sector: string
  title: string
  pillar: string
  summary: string
  scope: string[]
  status: string
  detail: string[]
  evidence: { label: string; value: string }[]
}

export const proof: Proof[] = [
  {
    slug: 'premium-jewellery',
    sector: 'Jewellery',
    pillar: 'Craft',
    title: 'A premium jeweller, rebuilt to be built from',
    status: 'Live, and the pattern for the platform',
    summary:
      'A Birmingham jewellery business with real stock, real repairs and real valuations. We rebuilt the commerce experience around it, and wrote every Craft-specific rule into configuration rather than code so the next jeweller can be configured, not rebuilt.',
    scope: ['Brand and customer experience', 'Commerce build', 'Configurator and product data model', 'Clienteling and appointments'],
    detail: [
      'The brief was never only the site. It was to build one exceptional premium jewellery experience, and to capture the reusable capability underneath it at the same time, because nothing gets productised that has not been proven inside a business paying for the outcome.',
      'That decision costs roughly 15 to 20% more engineering time up front. It is the single most important technical choice in the pillar. Skipping it turns a platform into a bespoke site with an expensive rebuild waiting behind it.',
      'The test we apply to every piece of work is simple. Would the second jeweller need this rebuilt, reconfigured, or not at all? Only reconfigured belongs in the platform.',
    ],
    evidence: [
      { label: 'Configurator, data model, clienteling', value: 'Platform candidates' },
      { label: 'Brand, art direction, in-store design', value: 'Stays as services' },
    ],
  },
  {
    slug: 'route-service-operator',
    sector: 'Workplace services',
    pillar: 'Operations',
    title: 'An operating platform, specified by the people running the routes',
    status: 'In production, generalising to a second operator',
    summary:
      'A workplace hydration operator running on a platform we built and deployed inside the business. Customers, contracts, routes, assets, service cycles, billing and insight, used to run a real operation rather than to demonstrate software.',
    scope: ['Platform product and architecture', 'Driver mobile workflow', 'Accounting and billing integration', 'Operational analytics'],
    detail: [
      "A vertical SaaS company's hardest problem is learning the domain. This platform skipped it. It was specified by people running the business, corrected by drivers and controllers, and paid for by an operation that needed it to work on Monday morning.",
      'What exists today is a deep, correct, single-tenant system. Turning it into something a second operator can use is an engineering programme, not a configuration exercise: keep what every route-service operator shares, configure what differs by vertical, and remove what belongs to one company.',
      'Sanitisation cycles and proof-of-delivery amendments are the tell. No horizontal field-service tool models them, because no horizontal tool has ever had to.',
    ],
    evidence: [
      { label: 'Routing engine, offline mobile, connectors', value: 'Becomes group IP' },
      { label: 'Named depots, routes and tariffs', value: 'Leaves the codebase' },
    ],
  },
]

export type Package = {
  name: string
  scope: string
  price: string
  cycle: string
  note?: string
}

export type PackageSet = { pillar: string; intro: string; items: Package[] }

export const packages: PackageSet[] = [
  {
    pillar: 'Commerce',
    intro:
      'Launch and Transform are the entry points. Evolve is the one designed to compound, turning a one-off project into a continuous delivery model and a multi-year relationship.',
    items: [
      {
        name: 'Launch',
        scope: 'Net-new experience, platform build or migration. Strategy, UX, UI, build, integration, launch.',
        price: '£85k to £600k',
        cycle: '4 to 7 months',
      },
      {
        name: 'Evolve',
        scope: 'Ongoing design, product and engineering as a dedicated pod. Continuous release, quarterly roadmap.',
        price: '£12k to £45k per month',
        cycle: 'Continuous',
        note: 'The strategic product',
      },
      {
        name: 'Grow',
        scope: 'CRO, experimentation, lifecycle, analytics and performance. Sold alongside Evolve, rarely alone.',
        price: '£8k to £25k per month',
        cycle: 'Continuous',
      },
      {
        name: 'Transform',
        scope: 'Major replatform or enterprise change programme. Discovery, architecture, phased migration, change management.',
        price: '£250k to £750k+',
        cycle: '6 to 12 months',
      },
    ],
  },
  {
    pillar: 'Craft',
    intro:
      'Five ways in, one way to stay. The objective of every engagement is to end on Platform, the only line with a software multiple attached to it.',
    items: [
      {
        name: 'Launch',
        scope: 'New premium storefront, brand-level UX and the jewellery product data model.',
        price: '£28k to £55k',
        cycle: '10 to 14 weeks',
      },
      {
        name: 'Growth',
        scope: 'Ongoing design, build, CRO, lifecycle and merchandising support.',
        price: '£4.5k to £9.5k per month',
        cycle: 'Continuous',
      },
      {
        name: 'Transformation',
        scope: 'Replatform, ERP, POS and stock integration, clienteling, appointments, repairs and valuations.',
        price: '£75k to £180k',
        cycle: 'Project',
      },
      {
        name: 'Platform',
        scope: 'The productised jewellery module suite, licensed and configured.',
        price: '£8k to £20k onboarding, then £950 to £2,400 per month',
        cycle: 'Licence',
        note: 'Where every engagement should end',
      },
      {
        name: 'Managed Growth',
        scope: "The client's entire digital function, run by P&. Strategy, build, growth, support.",
        price: '£6k to £15k per month',
        cycle: 'Continuous',
      },
    ],
  },
  {
    pillar: 'Operations',
    intro:
      'Price the fleet, not the seat. Route operators have few office users and many vehicles, so per-seat pricing underprices the value and caps the account. A platform base fee, a per-vehicle fee and a small per-service-point fee all grow as the operator grows.',
    items: [
      {
        name: 'Core',
        scope: 'Customer and contracts, route and delivery, service and assets, billing and finance.',
        price: '£750 per month, plus £45 per vehicle',
        cycle: 'Licence',
      },
      {
        name: 'Growth',
        scope: 'Core, plus analytics and AI insight, customer portal and automated communications.',
        price: '£1,500 per month, plus £55 per vehicle',
        cycle: 'Licence',
        note: 'The tier the model is built on',
      },
      {
        name: 'Pro',
        scope: 'Growth, plus sales opportunities and upsell prompts from usage data.',
        price: '£3,000 per month, plus £65 per vehicle',
        cycle: 'Licence',
      },
      {
        name: 'Enterprise',
        scope: 'Negotiated commercial terms for multi-depot and multi-vertical operators.',
        price: 'From £8,000 per month',
        cycle: 'Licence',
      },
    ],
  },
]

export const pricingRule =
  'Implementation is charged, not absorbed. Data migration from spreadsheets and legacy systems is the single biggest cost and risk in onboarding, it filters out unserious buyers, and because the customer has paid, it materially improves the odds they complete it.'

/* ---------- Navigation ---------- */

export type NavItem = { href: string; label: string }

export const primaryNav: NavItem[] = [
  { href: '/pillars', label: 'Pillars' },
  { href: '/approach', label: 'Approach' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Group',
    links: [
      { href: '/approach', label: 'Approach' },
      { href: '/pillars', label: 'Pillars' },
      { href: '/work', label: 'Work' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Pillars',
    links: [
      { href: '/pillars#craft', label: 'Craft' },
      { href: '/pillars#operations', label: 'Operations' },
      { href: '/pillars#commerce', label: 'Commerce' },
      { href: '/pillars#labs', label: 'Labs' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/approach#loop', label: 'The loop' },
      { href: '/approach#packages', label: 'Packages and price bands' },
      { href: '/approach#layers', label: 'How value accumulates' },
    ],
  },
]
