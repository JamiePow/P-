/* ------------------------------------------------------------------------ *
 * lib/enquiry.ts
 *
 * Validation, spam checks and delivery for the contact form, kept out of the
 * route handler so both can be tested on their own.
 *
 * The rule this module exists to enforce: an enquiry is only ever reported
 * as sent once a delivery target has accepted it. If nothing is configured,
 * the submission fails loudly rather than quietly.
 * ------------------------------------------------------------------------ */

import { createHash } from 'node:crypto'

export const ENQUIRY_TYPES = ['craft', 'operations', 'commerce', 'other'] as const
export type EnquiryType = (typeof ENQUIRY_TYPES)[number]

export type Enquiry = {
  name: string
  email: string
  company: string
  type: EnquiryType
  message: string
  receivedAt: string
  /* Non-sensitive attribution only. No cookies, no identifiers, no message. */
  source: { referer: string; page: string }
}

export type Validated = { ok: true; value: Enquiry } | { ok: false; errors: Record<string, string> }

const MAX = { name: 120, email: 254, company: 160, message: 4000 }
const MIN_MESSAGE = 12

/* A deliberately plain check. The only way to know an address works is to
   send to it, so this rejects what is obviously wrong and nothing more. */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export function validate(raw: unknown): Validated {
  const errors: Record<string, string> = {}
  const d = (raw ?? {}) as Record<string, unknown>
  const str = (k: string) => (typeof d[k] === 'string' ? (d[k] as string).trim() : '')

  const name = str('name')
  const email = str('email')
  const company = str('company')
  const message = str('message')
  const type = str('type') || str('pillar')

  if (!name) errors.name = 'Please add your name.'
  else if (name.length > MAX.name) errors.name = 'That name is longer than we can store.'

  if (!email) errors.email = 'Please add an email address so we can reply.'
  else if (email.length > MAX.email || !EMAIL.test(email))
    errors.email = 'That email address does not look right.'

  if (company.length > MAX.company) errors.company = 'That company name is longer than we can store.'

  if (!message) errors.message = 'Please tell us a little about the project.'
  else if (message.length < MIN_MESSAGE) errors.message = 'A line or two more would help us reply usefully.'
  else if (message.length > MAX.message) errors.message = 'That message is longer than we can store.'

  const t = (ENQUIRY_TYPES as readonly string[]).includes(type) ? (type as EnquiryType) : 'other'

  if (Object.keys(errors).length) return { ok: false, errors }

  return {
    ok: true,
    value: {
      name, email, company, type: t, message,
      receivedAt: new Date().toISOString(),
      source: { referer: str('referer').slice(0, 300), page: str('page').slice(0, 300) },
    },
  }
}

/* ----------------------------------------------------------------- spam -- *
 * Two checks, neither of which asks the visitor to prove anything.
 *   website  a honeypot field, hidden from people and from screen readers
 *   elapsed  the milliseconds between the form rendering and submitting
 * A human filling in five fields takes longer than three seconds.          */

export const MIN_ELAPSED_MS = 3000

export function looksAutomated(raw: unknown): string | null {
  const d = (raw ?? {}) as Record<string, unknown>
  if (typeof d.website === 'string' && d.website.trim() !== '') return 'honeypot'
  const elapsed = Number(d.elapsed)
  if (!Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) return 'too-fast'
  return null
}

/* ------------------------------------------------------- rate and repeat -- *
 * In-process counters. They hold for a single instance, which is the right
 * shape for the traffic this site will see, and they are documented as a
 * limitation rather than presented as a distributed rate limiter.          */

type Hit = { count: number; first: number }
const WINDOW_MS = 10 * 60 * 1000
/* Eight rather than five, because an office or a mobile carrier can put
   several genuine visitors behind one address. A single enquirer sends one. */
const MAX_PER_WINDOW = 8
const DUPLICATE_MS = 30 * 60 * 1000

const hits = new Map<string, Hit>()
const seen = new Map<string, number>()

function sweep(now: number) {
  hits.forEach((v, k) => { if (now - v.first > WINDOW_MS) hits.delete(k) })
  seen.forEach((t, k) => { if (now - t > DUPLICATE_MS) seen.delete(k) })
}

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  sweep(now)
  const h = hits.get(key)
  if (!h || now - h.first > WINDOW_MS) {
    hits.set(key, { count: 1, first: now })
    return { allowed: true, retryAfter: 0 }
  }
  h.count += 1
  if (h.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - h.first)) / 1000) }
  }
  return { allowed: true, retryAfter: 0 }
}

export function fingerprint(e: Enquiry) {
  return createHash('sha256').update(`${e.email.toLowerCase()}|${e.message}`).digest('hex').slice(0, 32)
}

export function isDuplicate(fp: string, now = Date.now()): boolean {
  sweep(now)
  if (seen.has(fp)) return true
  seen.set(fp, now)
  return false
}

/* The configured limits, for the readiness probe. An operator checking a
   deployment can see what is enforced without reading the source. */
export const limits = {
  windowMinutes: WINDOW_MS / 60000,
  maxPerWindow: MAX_PER_WINDOW,
  duplicateWindowMinutes: DUPLICATE_MS / 60000,
  minFillSeconds: MIN_ELAPSED_MS / 1000,
  /* These counters live in this process. On a single long running Node
     server, which is what the enquiry route requires, that is the whole
     deployment. On a platform that spreads requests across short lived
     instances they are per instance, and the effective limit is this
     number multiplied by the number of warm instances. */
  scope: 'in-process',
}

/* Test seam. Only the tests call this. */
export function __resetCounters() {
  hits.clear()
  seen.clear()
}

/* ------------------------------------------------------------- delivery -- *
 * Provider agnostic on purpose. P& point ENQUIRY_WEBHOOK_URL at whatever
 * they already pay for: a CRM endpoint, an automation hook, or a
 * transactional email API. No vendor is chosen here and no SDK is added.  */

export type Delivery = { delivered: boolean; target: string | null; detail: string }

export function deliveryConfigured(env = process.env): boolean {
  return Boolean(env.ENQUIRY_WEBHOOK_URL)
}

export function notifyAddress(env = process.env): string | null {
  return env.ENQUIRY_NOTIFY_EMAIL || null
}

export async function deliver(e: Enquiry, env = process.env): Promise<Delivery> {
  const url = env.ENQUIRY_WEBHOOK_URL
  if (!url) return { delivered: false, target: null, detail: 'no-delivery-target-configured' }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (env.ENQUIRY_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${env.ENQUIRY_WEBHOOK_TOKEN}`

  const body = {
    notify: notifyAddress(env),
    subject: `Enquiry from ${e.name}${e.company ? ` at ${e.company}` : ''}`,
    enquiry: {
      name: e.name,
      company: e.company || null,
      email: e.email,
      type: e.type,
      message: e.message,
      receivedAt: e.receivedAt,
      source: e.source,
    },
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    if (!res.ok) {
      return { delivered: false, target: 'webhook', detail: `webhook-status-${res.status}` }
    }
    return { delivered: true, target: 'webhook', detail: `webhook-status-${res.status}` }
  } catch (err) {
    const reason = err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'network'
    return { delivered: false, target: 'webhook', detail: `webhook-${reason}` }
  } finally {
    clearTimeout(timer)
  }
}
