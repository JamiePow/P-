import { NextResponse } from 'next/server'
import {
  deliver,
  limits,
  deliveryConfigured,
  fingerprint,
  isDuplicate,
  looksAutomated,
  notifyAddress,
  rateLimit,
  validate,
} from '@/lib/enquiry'

/* The handler needs a request, so it cannot be prerendered. */
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/* Logs carry the outcome and a truncated fingerprint. They never carry the
   name, the email address, the message or any configured secret. */
function log(outcome: string, extra: Record<string, string | number> = {}) {
  const parts = Object.entries(extra).map(([k, v]) => `${k}=${v}`)
  console.info(`[enquiry] ${outcome}${parts.length ? ' ' + parts.join(' ') : ''}`)
}

function clientKey(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') || ''
  const ip = fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  return ip
}

export async function POST(req: Request) {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    log('rejected', { reason: 'malformed-json' })
    return NextResponse.json({ ok: false, message: 'That submission could not be read.' }, { status: 400 })
  }

  /* 1 · spam. Answered the same way as a success would look to a bot, so a
        script cannot tell the honeypot caught it, but nothing is delivered. */
  const automated = looksAutomated(raw)
  if (automated) {
    log('discarded', { reason: automated })
    return NextResponse.json({ ok: true, message: 'Thank you.' }, { status: 200 })
  }

  /* 2 · rate limit, before any work is done on the payload. */
  const { allowed, retryAfter } = rateLimit(clientKey(req))
  if (!allowed) {
    log('rejected', { reason: 'rate-limited' })
    return NextResponse.json(
      { ok: false, message: 'That is several enquiries in a short time. Please try again shortly, or email us directly.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  /* 3 · server side validation, independent of anything the browser did. */
  const result = validate(raw)
  if (!result.ok) {
    log('rejected', { reason: 'validation', fields: Object.keys(result.errors).join('+') })
    return NextResponse.json(
      { ok: false, message: 'Some details need another look.', errors: result.errors },
      { status: 422 },
    )
  }
  const enquiry = result.value

  /* 4 · the same enquiry twice is treated as delivered, not sent twice. */
  const fp = fingerprint(enquiry)
  if (isDuplicate(fp)) {
    log('duplicate', { fp })
    return NextResponse.json({ ok: true, message: 'We already have this one.', duplicate: true }, { status: 200 })
  }

  /* 5 · nothing is reported as sent unless there is somewhere for it to go. */
  if (!deliveryConfigured() || !notifyAddress()) {
    log('failed', { reason: 'not-configured', fp })
    return NextResponse.json(
      {
        ok: false,
        message: 'We could not deliver that just now. Please email us directly and we will pick it up from there.',
        code: 'delivery-unconfigured',
      },
      { status: 503 },
    )
  }

  /* 6 · deliver, and report only what actually happened. */
  const delivery = await deliver(enquiry)
  if (!delivery.delivered) {
    log('failed', { reason: delivery.detail, fp })
    return NextResponse.json(
      {
        ok: false,
        message: 'We could not deliver that just now. Please email us directly and we will pick it up from there.',
        code: 'delivery-failed',
      },
      { status: 502 },
    )
  }

  log('delivered', { fp, type: enquiry.type, via: delivery.target ?? 'unknown' })
  return NextResponse.json({ ok: true, message: 'Thank you.' }, { status: 200 })
}

export async function GET() {
  /* A readiness probe for the deployment checklist. It reports whether a
     delivery target and a recipient exist, and never what they are. */
  return NextResponse.json({
    ok: true,
    deliveryConfigured: deliveryConfigured(),
    notifyConfigured: Boolean(notifyAddress()),
    limits,
  })
}
