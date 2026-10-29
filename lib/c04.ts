/*
  Content layer for Concept 04.

  Every fact comes from the approved brief, the founding plan or the audited
  decision register. Anything not yet supplied is carried as a `provisional`
  marker rather than invented, and the components render those markers
  visibly. Illustrative figures carry their assumptions beside them.

  Kept separate from lib/data.ts so the concept can be reviewed, changed or
  thrown away without touching the existing site.
*/

export type Provisional = { provisional: string }
export const prov = (text: string): Provisional => ({ provisional: text })

export const meta = {
  concept: 'Concept 04',
  name: 'Elevated Editorial',
  shortName: 'P&',
  fullName: 'Pow & Partners',
  proposition: 'Give your people their week back.',
  support:
    'We help businesses connect their systems, remove repetitive work and recover valuable operating time.',
  reach: 'United Kingdom and Ireland',
  /* No address is published until one is verified. Content reads
     publicEmail() from lib/contact.ts, which returns null until then. */
} as const

/* The nine sections, used for the index strip and the running folio. */
export type Entry = { n: string; id: string; title: string; short: string }

export const contents: Entry[] = [
  { n: '01', id: 'hero', title: 'The proposition', short: 'Proposition' },
  { n: '02', id: 'problem', title: 'The problem', short: 'The problem' },
  { n: '03', id: 'changes', title: 'What changes', short: 'What changes' },
  { n: '04', id: 'solutions', title: 'Our solutions', short: 'Solutions' },
  { n: '05', id: 'difference', title: 'The P& difference', short: 'Difference' },
  { n: '06', id: 'approach', title: 'Our approach', short: 'Approach' },
  { n: '07', id: 'pricing', title: 'Commercial transparency', short: 'Pricing' },
  { n: '08', id: 'about', title: 'About P&', short: 'About' },
  { n: '09', id: 'closing', title: 'Start a conversation', short: 'Contact' },
]

/* ---------- art direction ----------
   Nothing is sourced or generated yet. Each placement below is a brief a
   photographer could shoot from, and each renders on the page as a plate
   carrying its own reference, subject, composition, lighting and ratio, at
   the size and in the position the final image will occupy. */

export type Shot = {
  ref: string
  place: string
  subject: string
  composition: string
  lighting: string
  ratio: string
  mobile: string
  /* Essential shots carry a section that cannot launch without them.
     Optional shots improve a section that reads without them. */
  essential: boolean
  /* Secondary frames are dropped below 760 so the phone keeps one image
     per chapter. The slot is not shown there, so it is not briefed for it. */
  desktopOnly?: boolean
}

export const photography: Shot[] = [
  {
    ref: 'IMG 01',
    place: 'Hero',
    subject: 'The people behind the processes',
    composition:
      'One professional absorbed in work in a contemporary operational environment. Eye level, 35mm, no eye contact with the camera.',
    lighting: 'Natural daylight, window side, no fill. Documentary, understated.',
    ratio: '4 / 5',
    mobile: '3 / 2',
    essential: true,
  },
  {
    ref: 'IMG 02',
    place: 'The problem',
    subject: 'The reality of disconnected operations',
    composition:
      'Two colleagues reconciling information across screens, paperwork and a spreadsheet. Over the shoulder, both hands visible.',
    lighting: 'Overhead daylight, unstaged. Complexity without exaggerated frustration.',
    ratio: '3 / 2',
    mobile: '3 / 2',
    essential: true,
  },
  {
    ref: 'IMG 03',
    place: 'What changes',
    subject: 'What recovered time looks like',
    composition:
      'An owner or operations manager working with their team rather than keying. Mid-conversation, standing, papers set aside.',
    lighting: 'Daylight, open room. Capacity, clarity and progress, not celebration.',
    ratio: '16 / 9',
    mobile: '3 / 2',
    essential: true,
  },
  {
    ref: 'IMG 04',
    place: 'Atelier',
    subject: 'Jewellery and specialist retail',
    composition:
      'A jeweller at a contemporary bench or in a premium workshop. Craft in the foreground, the operational reality of the business behind it. Portrait, shot close enough to see the hands working. No product branding in frame.',
    lighting: 'Raking side light, shallow depth, warm neutral grade.',
    ratio: '4 / 5',
    mobile: '3 / 2',
    essential: true,
  },
  {
    ref: 'IMG 05',
    place: 'Nexus',
    subject: 'Connected operations',
    composition:
      'A real logistics, field service or delivery environment. People coordinating work, a device in hand, a vehicle or loading bay in frame.',
    lighting: 'First light or late afternoon, available light only.',
    ratio: '16 / 9',
    mobile: '16 / 9',
    essential: true,
  },
  {
    ref: 'IMG 06',
    place: 'Blueprint',
    subject: 'Construction and subcontracting',
    composition:
      'A construction professional reviewing drawings, materials or site documentation. Organisation and accountability, not hard-hat cliché.',
    lighting: 'Site cabin or site edge, daylight, cool neutral grade.',
    ratio: '16 / 9',
    mobile: '16 / 9',
    essential: true,
  },
  {
    ref: 'IMG 07',
    place: 'Our approach',
    subject: 'Working together',
    composition:
      'A natural working session, two or three people around a printed process or a wall. Shot from behind or to the side. Not a boardroom.',
    lighting: 'Available light, warehouse or office interior.',
    ratio: '3 / 2',
    mobile: '3 / 2',
    essential: true,
  },
  {
    ref: 'IMG 08',
    place: 'About · Jamie Pow',
    subject: 'Founder portrait',
    composition: 'At work, not against a backdrop. Three quarter, hands in frame where natural.',
    lighting: 'Natural light, no studio. Genuine founder photography only.',
    ratio: '4 / 5',
    mobile: '4 / 5',
    essential: false,
  },
  {
    ref: 'IMG 09',
    place: 'About · Taylor Sullivan',
    subject: 'Founder portrait',
    composition: 'At work, not against a backdrop. Three quarter, hands in frame where natural.',
    lighting: 'Natural light, no studio. Genuine founder photography only.',
    ratio: '4 / 5',
    mobile: '4 / 5',
    essential: false,
  },
  {
    ref: 'IMG 10',
    place: 'About · Jack',
    subject: 'Founder portrait',
    composition: 'At work, not against a backdrop. Three quarter, hands in frame where natural.',
    lighting: 'Natural light, no studio. Genuine founder photography only.',
    ratio: '4 / 5',
    mobile: '4 / 5',
    essential: false,
  },
  {
    ref: 'IMG 11',
    place: 'Atelier · secondary',
    subject: 'The consultation, not the product',
    composition:
      'A premium showroom or consultation table, two people either side of it, a tray or a tablet between them. Shot wide enough to show the room. Natural human presence, no eye contact with the camera.',
    lighting: 'Window light across the table, warm neutral grade, shallow depth.',
    ratio: '3 / 2',
    mobile: '3 / 2',
    essential: false,
    desktopOnly: true,
  },
  {
    ref: 'IMG 12',
    place: 'Blueprint · secondary',
    subject: 'The site the records come from',
    composition:
      'A contemporary site in working order. Structure, materials and organisation legible. Shot from a distance that shows the scale of the job rather than a face.',
    lighting: 'Overcast or early light, cool neutral grade. No hard-hat portraiture.',
    ratio: '16 / 9',
    mobile: '16 / 9',
    essential: false,
    desktopOnly: true,
  },
]

/* An asset P& owns but which has not reached this workspace. It is recorded
   here rather than in a second list, so the inventory and the audit cannot
   disagree about what is missing. */
export type MissingAsset = { ref: string; place: string; what: string; blocking: boolean }

export const missingAssets: MissingAsset[] = [
  {
    ref: 'NXS 01',
    place: 'Nexus · product evidence',
    what:
      'Verified Nexus Routes product screenshots and logo. No Nexus Routes asset exists in this workspace and none has been supplied. The slot is held open and labelled; nothing has been drawn, recoloured or reconstructed.',
    blocking: false,
  },
]

export const shot = (ref: string): Shot =>
  photography.find((s) => s.ref === ref) as Shot

/* ---------- 02 the problem ---------- */

export const observations = [
  { n: '01', text: 'Someone keys the same order into three systems before lunch.', tag: 'Re-keying' },
  { n: '02', text: 'An invoice waits four days for a signed sheet to come back from a van.', tag: 'Cash delay' },
  { n: '03', text: 'Two people spend Friday reconciling a spreadsheet against the accounts.', tag: 'Reconciliation' },
  { n: '04', text: 'Nobody can say what this month looks like without opening five tabs.', tag: 'No single view' },
  { n: '05', text: "The stock figure on the website is yesterday's, and everyone works around it.", tag: 'Stale data' },
]

/* The arithmetic. Assumptions are printed beside the figures, and the result
   is labelled illustrative, because the audit is what produces a real one. */
export const calc = {
  defaultHours: 12,
  defaultShare: 60,
  weeksPerYear: 46,
  hoursPerDay: 7.5,
  assumptions:
    '46 working weeks a year, a 7.5 hour day. The share that could run without a person is yours to move: it is an illustration, not a forecast.',
  caveat:
    'Illustrative. The audit measures your real figure before anything is built, which is why it is chargeable.',
}

/* ---------- 03 what changes ---------- */

export const systemsLeft = [
  { id: 'accounting', name: 'Accounting', feeds: 'Invoices, credit control and the month to date' },
  { id: 'crm', name: 'CRM', feeds: 'Customers, contracts and what was promised' },
  { id: 'orders', name: 'Orders', feeds: 'What was bought, at what price, on what terms' },
]

export const systemsRight = [
  { id: 'inventory', name: 'Inventory', feeds: 'What is actually on the shelf, now' },
  { id: 'fulfilment', name: 'Fulfilment', feeds: 'Jobs done, signatures, proof of delivery' },
  { id: 'reporting', name: 'Reporting', feeds: 'The numbers the business is run on' },
]

export const systems = [...systemsLeft, ...systemsRight]

export const changes = [
  {
    n: '01',
    name: 'Connect',
    body: 'One connection per system, built to the interface the vendor publishes, monitored once it is live.',
  },
  {
    n: '02',
    name: 'Unify',
    body: 'Customers, orders, stock and jobs agree with each other, so a number only has to be looked up once.',
  },
  {
    n: '03',
    name: 'Automate',
    body: 'The repeated steps run on their own. Your people keep the judgement and lose the keying.',
  },
]

/* What a customer can reasonably expect, in the brief's own words. */
export const outcomes = [
  'Less repetitive administration',
  'Fewer manual handoffs',
  'Better operational visibility',
  'More reliable information',
  'Faster processes',
  'More capacity without proportionally more headcount',
]

/* ---------- 04 solutions ---------- */

export type Solution = {
  n: string
  name: string
  sector: string
  /* The four things a prospective customer needs from a solution, in order.
     Anything Blueprint cannot yet evidence is marked proposed in the copy. */
  problem: string
  response: string
  improvement: string
  commercial: string
  status: string
  open?: boolean
  treatment: 'atelier' | 'nexus' | 'blueprint'
  does: string[]
  img: string
  imgB?: string
}

/* Capability lists are drawn from the founding plan for the same operating
   businesses. They are internal material and should be confirmed before
   publication; nothing here is a new service definition. */
export const solutions: Solution[] = [
  {
    n: '01',
    name: 'Atelier',
    sector: 'Jewellery and bridal',
    problem:
      'Stock, repairs, valuations and appointments live in four places, and the website disagrees with all of them.',
    response:
      'One record for the piece. The configurator, the jewellery data model, appointments, the client book and the repairs and valuations workflow all read from it and write back to it.',
    improvement:
      'Counter staff answer a question once instead of checking three systems. A valuation is issued from the record rather than rebuilt from memory, and the website shows what is actually in the case.',
    commercial:
      'Specialist retail sells on knowledge. Time spent reconciling systems is time not spent with a customer who is spending four figures.',
    status: 'Proved in live trading',
    treatment: 'atelier',
    img: 'IMG 04',
    imgB: 'IMG 11',
    does: [
      'Product configurator: metals, stones, settings, engraving',
      'A jewellery data model: carat, cut, clarity, hallmark, provenance',
      'Appointments and consultation types',
      'Clienteling: client book, wish lists, occasion reminders',
      'Repairs and valuations workflow',
      'Premium storefront architecture',
    ],
  },
  {
    n: '02',
    name: 'Nexus',
    sector: 'Field services, delivery and route operations',
    problem:
      'Work leaves on a van and comes back on paper, so the invoice is always a week behind the job.',
    response:
      'A connected operation. Customers and contracts, planning and dispatch, a driver workflow that captures proof where the work happens, and billing that reads from the same record. Nexus Routes is the route planning and delivery product within that scope, not the whole of it.',
    improvement:
      'Proof arrives with the job rather than after it. Billing runs from completed work instead of from a backlog of paperwork, and what actually happened on the road feeds the next plan.',
    commercial:
      'Every day between the work and the invoice is a day of someone else\u2019s cash. Shortening it is usually the cheapest working capital improvement an operator can make.',
    status: 'Proved in live trading',
    treatment: 'nexus',
    img: 'IMG 05',
    does: [
      'Customers and contracts, sites, subscriptions, self-serve portal',
      'Route and delivery planning, driver mobile workflow, proof of delivery',
      'Assets and service: register, scheduling, compliance cycles',
      'Billing and finance: recurring invoicing, credit control, dunning',
      'Operational analytics and customer health',
      'Automated customer communications',
    ],
  },
  {
    n: '03',
    name: 'Blueprint',
    sector: 'Construction subcontractors',
    problem:
      'Site hours, materials and variations recorded three times, and a valuation nobody can evidence.',
    response:
      'Proposed. Capture on site, against the job and against the drawing revision, so labour, materials, plant and variations accumulate into the application instead of being reconstructed for it.',
    improvement:
      'Proposed. The application is assembled from the record. A disputed variation is answered with the ticket that was signed at the time, by the person who signed it.',
    commercial:
      'Proposed. Unevidenced variations get written off. The case for Blueprint is the value of the ones currently being lost, and it should be tested against your figures rather than ours.',
    status: 'In development, capabilities proposed',
    open: true,
    treatment: 'blueprint',
    img: 'IMG 06',
    imgB: 'IMG 12',
    does: [
      'Site time and labour capture',
      'Materials and plant against the job',
      'Variations recorded where they happen',
      'Valuations with the evidence attached',
      'Subcontractor applications and payment',
      'A single view of the contract',
    ],
  },
]

/* The jewellery data model, set as a specimen. Tactile, and specific to the
   sector in a way no stock illustration would be. */
export const atelierSpec = ['Carat', 'Cut', 'Clarity', 'Hallmark', 'Provenance']

export const solutionsDisclosure =
  'Atelier and Nexus were developed and proved within operating businesses connected to P& partners. They are not independent client references. Blueprint remains in development and its capabilities are described as proposed.'

/* ---------- 05 the difference ---------- */

export const commitments = [
  {
    n: '01',
    text: 'We start with the systems you already run. Replacement is a last resort, not an opening position.',
  },
  {
    n: '02',
    text: 'We measure the hours returned, and we do not build business cases on redundancies.',
  },
  { n: '03', text: 'Our prices are published.' },
]

export const commitmentsOpen = prov(
  'Commitments 04, 05 and 06 from the approved brief drop in here, one line each',
)

/* ---------- 06 approach ---------- */

export const stages = [
  {
    n: '01',
    cadence: 'Before anything is built',
    flag: '',
    name: 'Discover and audit',
    body: 'We sit with the people doing the work and count where the hours actually go. The finding stands on its own, and you keep it either way.',
  },
  {
    n: '02',
    cadence: 'First weeks',
    flag: '',
    name: 'Connect',
    body: 'The first connections go in, usually the two that hurt most, built to the interfaces your vendors publish.',
  },
  {
    n: '03',
    cadence: 'Then',
    flag: '',
    name: 'Unify',
    body: 'One record, agreed across systems, so reporting stops being an argument about whose number is right.',
  },
  {
    n: '04',
    cadence: 'Against the baseline',
    flag: 'Where the promise is tested',
    name: 'Measure',
    body: 'Hours returned, counted against the baseline taken in the audit. This is the stage that decides whether any of it was worth doing, which is why it is a stage rather than a report.',
  },
  {
    n: '05',
    cadence: 'Every month it runs',
    flag: '',
    name: 'Improve',
    body: 'The subscription pays for the next improvement. The work does not stop at go-live, because the operation does not either.',
  },
]

export const stagesNote =
  'Week numbers are indicative. What moves a timeline is whether your systems publish an interface, how clean the data is, how much access we get to the people who do the work, and how quickly your own suppliers answer.'

/* ---------- 07 pricing ---------- */

/* Pricing is owned by lib/pricing.ts and re-exported here so the concept
   content layer has one shape to render. There is no second set of numbers. */
export { tierViews as tiers, commercialTerms as terms, pricingNote, inclusionsOpen } from './pricing'

/* ---------- 08 about ---------- */

export const partners = [
  {
    name: 'Jamie Pow',
    role: 'Founder · Commerce',
    body: 'Leads the group, the commerce practice and the technology direction.',
  },
  {
    name: 'Taylor Sullivan',
    role: 'Partner · Jewellery and bridal',
    body: 'Owns the trading business Atelier was built inside, and corrected by.',
  },
  {
    name: 'Jack',
    surname: prov('surname'),
    role: 'Partner · Field and route operations',
    body: 'Runs the operation Nexus was specified by, and fixed in, on live routes.',
  },
]

export const ambition =
  'Systems integration is how we start with most clients, and it is not the limit of what the group does. We develop software products, build commerce and operating platforms, and take ownership positions in the businesses we help to build. Integration is the first proposition, not the ceiling.'

/* How we hold ourselves to it. Stated as method, not as credential. */
export const accountability = [
  {
    name: 'You keep the finding',
    body: 'The audit is a document you own, whether or not you go on with us. It names the systems, the handovers and the hours.',
  },
  {
    name: 'We work to published interfaces',
    body: 'Connections are built to what your vendors publish, so nothing we build depends on a private arrangement we cannot support.',
  },
  {
    name: 'The baseline is written down first',
    body: 'Measure is a stage, not a report at the end. The number it is measured against is agreed before anything is built.',
  },
]

/* ---------- calls to action, written as continuations ---------- */

export const ctas = {
  problem: {
    line: 'Most of this is visible in an hour with the people doing the work.',
    action: 'Start a conversation',
  },
  solutions: {
    line: 'If one of these looks like your business, that is the quickest way in.',
    action: 'Tell us which one',
  },
  approach: {
    line: 'The audit is the first step, and the only one you pay for before you know anything.',
    action: 'Ask about the audit',
  },
  pricing: {
    line: 'Not sure which tier. Tell us the systems and we will say which one fits.',
    action: 'Ask about pricing',
  },
}