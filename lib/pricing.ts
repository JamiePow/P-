/* ------------------------------------------------------------------------ *
 * lib/pricing.ts
 *
 * The single source of truth for P& subscription pricing.
 *
 * Approved on 29 October 2026:
 *
 *   Essential   £295 a month    £4,500 implementation
 *   Standard    £595 a month    £8,500 implementation
 *   Pro       £1,150 a month   £12,500 implementation
 *
 * Annual billing is ten months' equivalent. The annual figure and the saving
 * are derived from the monthly figure rather than typed, so the three numbers
 * cannot drift apart. Changing a monthly price changes everything downstream.
 *
 * The agency engagement packages in lib/data.ts are a different commercial
 * model. They are retained for reference and are no longer shown publicly.
 * ------------------------------------------------------------------------ */

export const ANNUAL_MONTHS = 10

export type Tier = {
  n: string
  slug: 'essential' | 'standard' | 'pro'
  name: string
  /** Monthly subscription in whole pounds, excluding VAT. */
  monthly: number
  /** Implementation fee in whole pounds, excluding VAT. Separate from the subscription. */
  implementation: number
  forWho: string
}

export const tiers: Tier[] = [
  {
    n: 'Tier 01',
    slug: 'essential',
    name: 'Essential',
    monthly: 295,
    implementation: 4500,
    forWho: 'One site, a handful of systems, a small office team.',
  },
  {
    n: 'Tier 02',
    slug: 'standard',
    name: 'Standard',
    monthly: 595,
    implementation: 8500,
    forWho: 'A growing operation with a fleet, a warehouse or both.',
  },
  {
    n: 'Tier 03',
    slug: 'pro',
    name: 'Pro',
    monthly: 1150,
    implementation: 12500,
    forWho: 'Several sites, fleets or trading entities under one group.',
  },
]

export const money = (n: number) => `£${n.toLocaleString('en-GB')}`

/** Ten months' equivalent, billed annually. */
export const annual = (t: Tier) => t.monthly * ANNUAL_MONTHS

/** What twelve monthly payments would have cost, less the annual price. */
export const annualSaving = (t: Tier) => t.monthly * 12 - annual(t)

export type TierView = {
  n: string
  slug: Tier['slug']
  name: string
  monthly: string
  annual: string
  saving: string
  implementation: string
  forWho: string
}

export const view = (t: Tier): TierView => ({
  n: t.n,
  slug: t.slug,
  name: t.name,
  monthly: money(t.monthly),
  annual: money(annual(t)),
  saving: money(annualSaving(t)),
  implementation: money(t.implementation),
  forWho: t.forWho,
})

export const tierViews = tiers.map(view)

/* ---------------------------------------------------------------- terms -- *
 * Only settled terms appear here.
 *
 * Two commercial decisions are outstanding: whether the audit fee is credited
 * against implementation, and what each tier includes beyond the scale it is
 * sized for. Neither is invented and neither is described on the page. They
 * are carried in the handover instead, because a buyer should not be reading
 * about what we have not decided. The page states the price and the scale the
 * tier is sized for, and stops.
 */

export const AUDIT_FEE = 3500

export const commercialTerms = [
  {
    name: `The audit, ${money(AUDIT_FEE)}`,
    body: 'Paid up front. You keep the finding whether or not we build anything: it names the systems, the handovers and the hours.',
  },
  {
    name: 'Implementation',
    body: 'A separate one-off fee, quoted per tier and charged alongside the subscription rather than inside it. Half on signature, half at go-live.',
  },
  {
    name: 'The subscription',
    body: 'Starts at go-live, not before. It covers monitoring, support and the next improvement, every month it runs. Billed monthly, or annually at ten months’ equivalent.',
  },
]

/* ------------------------------------------------------------- sentences -- *
 * Prose that names a price, derived from the figures above rather than typed.
 *
 * These existed as hardcoded strings inside JSX attributes, which is how a
 * literal \u00a3 escape reached two public pages: a JSX attribute string is
 * not a JavaScript string literal, so it does not process escape sequences.
 * Deriving them from money() removes that whole class of problem and stops
 * the prose drifting from the table if a price ever changes.
 */

const cheapest = tiers.reduce((a, b) => (a.monthly <= b.monthly ? a : b))

export const entryPricingLine =
  `Subscriptions start at ${money(cheapest.monthly)} a month. Implementation is quoted by tier and ` +
  `starts at ${money(cheapest.implementation)}. Before either, the audit is ${money(AUDIT_FEE)} and ` +
  `the findings are yours.`

export const auditCommitmentLine =
  `The audit is the only thing you commit to at the start. It costs ${money(AUDIT_FEE)} and the ` +
  `findings are yours.`

export const pricingNote =
  `All prices exclude VAT. Implementation is charged separately from the subscription and is not included in it. Annual billing is twelve months for the price of ${ANNUAL_MONTHS}.`
