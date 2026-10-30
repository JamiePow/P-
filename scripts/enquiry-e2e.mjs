import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

/* Portable paths. This file lives in <repo>/scripts, so the repo is one level
   up. Both the repo root and the Playwright entry point used to be absolute
   paths from the machine the script was written on, which meant the suite
   only ran there. */
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const require_ = createRequire(import.meta.url)
function loadPlaywright() {
  for (const id of ['/home/claude/.npm-global/lib/node_modules/playwright/index.js', 'playwright', 'playwright-core']) {
    try { return require_(id) } catch {}
  }
  throw new Error('Playwright not found. Run: npm install')
}
const pw = loadPlaywright()
/* ------------------------------------------------------------------------ *
 * End to end proof for the contact form.
 *
 * Starts a receiver that records every delivery, starts the built site
 * pointed at it, then drives the real form in a real browser. A 200 from the
 * site is not accepted as proof: each case asserts what the receiver holds.
 *
 *   node scripts/enquiry-e2e.mjs [outDir]
 * ------------------------------------------------------------------------ */

import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = process.argv[2] || join(REPO, '.e2e')
mkdirSync(OUT, { recursive: true })

/* Refuse to run against anything already listening. A stale server from a
   previous run keeps its in-process rate limit and duplicate state, which
   silently invalidates every case below. */
import { createConnection } from 'node:net'



async function portFree(port) {
  return new Promise((resolve) => {
    const sock = createConnection({ port, host: '127.0.0.1' })
    sock.on('connect', () => { sock.destroy(); resolve(false) })
    sock.on('error', () => resolve(true))
    setTimeout(() => { sock.destroy(); resolve(true) }, 800)
  })
}
for (const port of [9311, 9312, 9313, 9314]) {
  if (!(await portFree(port))) {
    console.error(`port ${port} is already in use. Stop it before running this suite.`)
    process.exit(2)
  }
}

const RECEIVER_PORT = 9311
const SITE_PORT = 9312
const NOTIFY = 'enquiries@example.invalid'

/* ------------------------------------------------------------- receiver -- */
const received = []
let mode = 'ok' // ok | fail | hang
const receiver = createServer((req, res) => {
  let body = ''
  req.on('data', (c) => (body += c))
  req.on('end', () => {
    if (mode === 'hang') return // never answers, exercises the timeout
    if (mode === 'fail') {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      return res.end('{"error":"downstream"}')
    }
    try {
      received.push({ at: new Date().toISOString(), auth: req.headers.authorization || null, body: JSON.parse(body) })
    } catch {
      received.push({ at: new Date().toISOString(), parseError: true, raw: body.slice(0, 200) })
    }
    res.writeHead(202, { 'Content-Type': 'application/json' })
    res.end('{"accepted":true}')
  })
})
await new Promise((r) => receiver.listen(RECEIVER_PORT, r))

/* ----------------------------------------------------------------- site -- */
const site = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(SITE_PORT)], {
  cwd: REPO,
  env: {
    ...process.env,
    ENQUIRY_WEBHOOK_URL: `http://127.0.0.1:${RECEIVER_PORT}/hook`,
    ENQUIRY_WEBHOOK_TOKEN: 'test-token-not-a-real-secret',
    ENQUIRY_NOTIFY_EMAIL: NOTIFY,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})
const serverLog = []
site.stdout.on('data', (d) => serverLog.push(String(d)))
site.stderr.on('data', (d) => serverLog.push(String(d)))

const base = `http://127.0.0.1:${SITE_PORT}`
let up = false
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`${base}/api/enquiry`)
    if (r.ok) { up = true; break }
  } catch {}
  await new Promise((r) => setTimeout(r, 500))
}
if (!up) {
  console.error('site did not start on', SITE_PORT, '\n', serverLog.join('').slice(0, 1200))
  try { process.kill(-site.pid, 'SIGKILL') } catch {}
  receiver.close()
  process.exit(2)
}

/* ---------------------------------------------------------------- cases -- */
const results = []
const browser = await pw.chromium.launch()

function record(name, expected, actual, pass, note = '') {
  results.push({ name, expected, actual, pass, note })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}\n      expected: ${expected}\n      actual:   ${actual}${note ? '\n      ' + note : ''}`)
}

async function fill(page, { name, email, company, message, type }, { fast = false, honeypot = false } = {}) {
  await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
  if (!fast) await page.waitForTimeout(3300) // clear the minimum fill time
  if (name !== undefined) await page.fill('#name', name)
  if (email !== undefined) await page.fill('#email', email)
  if (company !== undefined) await page.fill('#company', company)
  if (type !== undefined) await page.selectOption('#pillar', type)
  if (message !== undefined) await page.fill('#message', message)
  if (honeypot) await page.evaluate(() => { document.querySelector('#website').value = 'http://spam.example' })
}

const shot = (page, n) => page.screenshot({ path: `${OUT}/${n}.png` })

/* Resolves once the form has reached a terminal state, or times out. */
async function settle(page, ms = 12000) {
  try {
    await page.waitForFunction(() => {
      const body = document.body.innerText || ''
      if (/Thank you\./.test(body)) return true
      const a = document.querySelector('[role="alert"]')
      return Boolean(a && (a.innerText || '').trim().length > 0)
    }, null, { timeout: ms })
  } catch {}
}
const thanks = (page) => page.locator('text=Thank you.').first().isVisible().catch(() => false)
const alertText = async (page) => (await page.locator('[role="alert"]').first().innerText().catch(() => '')).trim()

/* 1 · a complete, valid submission */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const before = received.length
  await fill(page, { name: 'Dana Whitlock', email: 'dana@whitlock-plant.co.uk', company: 'Whitlock Plant Hire', type: 'operations', message: 'We run forty vans and the invoicing is a week behind the work. Where would you start?' })
  await page.click('button[type="submit"]')
  await settle(page)
  const ok = await thanks(page)
  const got = received.length - before
  const r = received[received.length - 1]
  const pass = ok && got === 1 && r?.body?.enquiry?.email === 'dana@whitlock-plant.co.uk' && r?.body?.notify === NOTIFY
  record('Valid submission is delivered and confirmed', 'thank you shown AND receiver holds 1 enquiry with the right email and notify address',
    `thank you=${ok}, receiver received ${got}, email=${r?.body?.enquiry?.email}, notify=${r?.body?.notify}, auth header present=${Boolean(r?.auth)}`, pass)
  await shot(page, '01-success')
  if (r) writeFileSync(`${OUT}/delivered-payload.json`, JSON.stringify(r, null, 2))
  await page.close()
}

/* 2 · an email address that is not one */
{
  const page = await browser.newPage()
  const before = received.length
  await fill(page, { name: 'Test', email: 'not-an-email', message: 'This message is long enough to pass the length check.' })
  await page.click('button[type="submit"]')
  await settle(page)
  const ok = await thanks(page)
  const msg = await alertText(page)
  const pass = !ok && /does not look right/i.test(await page.locator('#email-error').innerText().catch(() => '')) && received.length === before
  record('Invalid email is rejected', 'no thank you, a field level error, nothing delivered',
    `thank you=${ok}, summary="${msg.slice(0, 48)}", delivered=${received.length - before}`, pass)
  await shot(page, '02-invalid-email')
  await page.close()
}

/* 3 · required fields left empty */
{
  const page = await browser.newPage()
  const before = received.length
  await fill(page, {})
  await page.click('button[type="submit"]')
  await settle(page)
  const ok = await thanks(page)
  const focused = await page.evaluate(() => document.activeElement?.id)
  const pass = !ok && focused === 'name' && received.length === before
  record('Missing required fields are caught and focused', 'no thank you, focus moved to the first invalid field, nothing delivered',
    `thank you=${ok}, focus=${focused}, delivered=${received.length - before}`, pass)
  await shot(page, '03-missing-fields')
  await page.close()
}

/* 4 · the same enquiry sent twice */
{
  const page = await browser.newPage()
  const payload = { name: 'Repeat Sender', email: 'repeat@example.co.uk', message: 'Sending this one twice on purpose to check the duplicate guard.' }
  await fill(page, payload)
  await page.click('button[type="submit"]')
  await page.waitForTimeout(1200)
  const before = received.length
  const page2 = await browser.newPage()
  await fill(page2, payload)
  await page2.click('button[type="submit"]')
  await settle(page2)
  const ok2 = await thanks(page2)
  const pass = ok2 && received.length === before
  record('Duplicate submission is not delivered twice', 'visitor still sees thank you, receiver gets nothing further',
    `thank you=${ok2}, further deliveries=${received.length - before}`, pass)
  await shot(page2, '04-duplicate')
  await page.close(); await page2.close()
}

/* 5 · the honeypot */
{
  const page = await browser.newPage()
  const before = received.length
  await fill(page, { name: 'Bot', email: 'bot@example.com', message: 'Automated submission attempt for the honeypot check.' }, { honeypot: true })
  await page.click('button[type="submit"]')
  await page.waitForTimeout(1200)
  const pass = received.length === before
  record('Honeypot submission is discarded', 'nothing delivered', `delivered=${received.length - before}`, pass,
    'The bot is answered as though it succeeded, so a script cannot learn the field exists.')
  await page.close()
}

/* 6 · submitted faster than a person can type */
{
  const page = await browser.newPage()
  const before = received.length
  await fill(page, { name: 'Fast', email: 'fast@example.com', message: 'Submitted immediately, faster than a person could fill this in.' }, { fast: true })
  await page.click('button[type="submit"]')
  await page.waitForTimeout(1200)
  const pass = received.length === before
  record('Submission under the minimum fill time is discarded', 'nothing delivered', `delivered=${received.length - before}`, pass)
  await page.close()
}

/* 7 · the delivery target is down */
{
  mode = 'fail'
  const page = await browser.newPage()
  await fill(page, { name: 'Outage Test', email: 'outage@example.co.uk', message: 'Checking what the visitor sees when delivery fails downstream.' })
  await page.click('button[type="submit"]')
  await settle(page)
  const ok = await thanks(page)
  const msg = await alertText(page)
  const pass = !ok && /could not deliver/i.test(msg)
  record('Delivery failure is reported as a failure', 'no thank you, an error naming the email fallback',
    `thank you=${ok}, message="${msg.slice(0, 70)}"`, pass)
  await shot(page, '07-delivery-failure')
  await page.close()
  mode = 'ok'
}

/* 8 · rate limiting */
{
  const before = received.length
  const send = (n) => fetch(`${base}/api/enquiry`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
    body: JSON.stringify({ name: `Flood ${n}`, email: `flood${n}@example.com`, message: `Flood submission number ${n}, long enough to validate.`, elapsed: 5000 }),
  })
  const codes = []
  for (let i = 0; i < 11; i++) codes.push((await send(i)).status)
  const pass = codes.filter((c) => c === 429).length >= 2 && codes[0] === 200
  record('Rate limiting engages after repeated submissions', 'the first succeeds, later ones return 429',
    `status codes: ${codes.join(', ')}`, pass, `delivered before the limit: ${received.length - before}`)
}

/* 9 · keyboard only */
{
  const page = await browser.newPage()
  await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3300)
  const before = received.length
  await page.locator('#name').focus()
  await page.keyboard.type('Keyboard Only')
  await page.keyboard.press('Tab'); await page.keyboard.type('keys@example.co.uk')
  await page.keyboard.press('Tab'); await page.keyboard.type('Keys Ltd')
  await page.keyboard.press('Tab'); await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Tab'); await page.keyboard.type('Completed without touching the mouse at any point.')
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
    if (await page.evaluate(() => document.activeElement?.tagName === 'BUTTON' && document.activeElement?.type === 'submit')) break
  }
  await page.keyboard.press('Enter')
  await settle(page)
  const ok = await thanks(page)
  const pass = ok && received.length === before + 1
  record('Keyboard only submission', 'completed with the keyboard alone and delivered',
    `thank you=${ok}, delivered=${received.length - before}`, pass)
  await shot(page, '09-keyboard')
  await page.close()
}

/* 10 · a phone. Every browser case shares the loopback address, so this one
      runs against its own instance to keep it independent of the limiter. */
{
  const mob = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '9314'], {
    cwd: REPO,
    env: { ...process.env, ENQUIRY_WEBHOOK_URL: `http://127.0.0.1:${RECEIVER_PORT}/hook`, ENQUIRY_NOTIFY_EMAIL: NOTIFY },
    stdio: 'ignore',
    detached: true,
  })
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch('http://127.0.0.1:9314/api/enquiry'); if (r.ok) break } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const before = received.length
  await page.goto('http://127.0.0.1:9314/contact', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3300)
  await page.fill('#name', 'Mobile Sender')
  await page.fill('#email', 'mobile@example.co.uk')
  await page.fill('#message', 'Sent from a 390 pixel viewport with touch enabled.')
  await page.tap('button[type="submit"]')
  await settle(page)
  const ok = await thanks(page)
  const pass = ok && received.length === before + 1
  record('Mobile submission at 390px', 'completed and delivered', `thank you=${ok}, delivered=${received.length - before}`, pass)
  await shot(page, '10-mobile')
  await page.close()
  try { process.kill(-mob.pid, 'SIGKILL') } catch {}
}

/* 11 · nothing configured at all */
{
  const bare = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '9313'], {
    cwd: REPO,
    env: { ...process.env, ENQUIRY_WEBHOOK_URL: '', ENQUIRY_NOTIFY_EMAIL: '' },
    stdio: 'ignore',
    detached: true,
  })
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch('http://127.0.0.1:9313/api/enquiry'); if (r.ok) break } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  const page = await browser.newPage()
  await page.goto('http://127.0.0.1:9313/contact', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  /* The page now refuses before the visitor types rather than after. The
     fields are shown and disabled, the reason is stated, and the submit
     button cannot be pressed, so nobody writes a message that is going to
     fail. The old behaviour — fill it in, press send, receive an error —
     was correct but wasteful of the visitor's time. */
  const nameDisabled = await page.locator('#name').isDisabled()
  const sendDisabled = await page.locator('button[type="submit"]').isDisabled()
  const notice = (await page.locator('#enquiries-closed').innerText().catch(() => '')).trim()

  /* And the endpoint itself still fails closed for anything posted directly,
     which is what actually protects an enquiry from being lost. */
  const direct = await fetch('http://127.0.0.1:9313/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Unconfigured', email: 'unconfigured@example.co.uk',
      message: 'This is the exact case that used to report a false success.',
      elapsed: 9000,
    }),
  })
  const body = await direct.json()
  const probe = await (await fetch('http://127.0.0.1:9313/api/enquiry')).json()
  const ok = await thanks(page)
  const pass =
    !ok && nameDisabled && sendDisabled && /not open yet/i.test(notice) &&
    direct.status === 503 && body.ok === false && probe.deliveryConfigured === false
  record('With nothing configured nothing can be sent and nothing is lost',
    'form disabled with a stated reason, direct POST refused with 503, probe reports unconfigured',
    `fieldsDisabled=${nameDisabled}, sendDisabled=${sendDisabled}, directStatus=${direct.status}, bodyOk=${body.ok}, probe=${JSON.stringify(probe)}`, pass,
    'This is the defect from the previous audit. It is the case that used to show a thank you.')
  await shot(page, '11-unconfigured')
  await page.close()
  try { process.kill(-bare.pid, 'SIGKILL') } catch {}
}

/* ---------------------------------------------------------------- close -- */
await browser.close()
try { process.kill(-site.pid, 'SIGKILL') } catch {}
receiver.close()

const leaked = serverLog.join('').match(/test-token-not-a-real-secret|dana@whitlock-plant\.co\.uk|forty vans/g)
record('Server logs carry no secrets or personal data', 'no token, email address or message body in the log',
  leaked ? `found: ${[...new Set(leaked)].join(', ')}` : 'none found', !leaked)

const passed = results.filter((r) => r.pass).length
writeFileSync(`${OUT}/results.json`, JSON.stringify({ passed, total: results.length, results, received }, null, 2))
writeFileSync(`${OUT}/server.log`, serverLog.join(''))
console.log(`\n${passed} of ${results.length} passed`)
process.exit(passed === results.length ? 0 : 1)
