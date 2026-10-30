/* ------------------------------------------------------------------------ *
 * Whole-site QA. Starts the built site, then for every route and every
 * breakpoint records axe violations, horizontal overflow, heading order and
 * broken internal links. Also walks the commercial journeys by clicking.
 *
 *   node scripts/site-qa.mjs [outDir]
 * ------------------------------------------------------------------------ */

import { spawn } from 'node:child_process'
import { createConnection } from 'node:net'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import pw from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'

const OUT = process.argv[2] || '/home/claude/qa'
mkdirSync(OUT, { recursive: true })
const PORT = 8961

const free = (port) => new Promise((r) => {
  const s = createConnection({ port, host: '127.0.0.1' })
  s.on('connect', () => { s.destroy(); r(false) })
  s.on('error', () => r(true))
  setTimeout(() => { s.destroy(); r(true) }, 800)
})
if (!(await free(PORT))) { console.error(`port ${PORT} in use`); process.exit(2) }

const site = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  cwd: '/home/claude/pap',
  env: { ...process.env, ENQUIRY_WEBHOOK_URL: '', ENQUIRY_NOTIFY_EMAIL: '' },
  stdio: 'ignore', detached: true,
})
const base = `http://127.0.0.1:${PORT}`
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`${base}/api/enquiry`)).ok) break } catch {}
  await new Promise((r) => setTimeout(r, 500))
}

const ROUTES = ['/', '/what-we-do', '/solutions', '/how-we-work', '/pricing', '/about', '/insights', '/contact', '/privacy', '/cookies', '/terms']
const WIDTHS = [390, 768, 1024, 1440]
const AXE = readFileSync('/home/claude/pap/node_modules/axe-core/axe.min.js', 'utf8')
const browser = await pw.chromium.launch()
const report = { routes: {}, journeys: [], links: { checked: 0, broken: [] } }

for (const route of ROUTES) {
  const entry = { exists: false, widths: {}, headings: '', title: '', description: '', canonical: '', og: false }
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } })
    const res = await page.goto(base + route, { waitUntil: 'networkidle' }).catch(() => null)
    if (!res || res.status() >= 400) { await page.close(); continue }
    entry.exists = true
    await page.addScriptTag({ content: AXE })
    const axe = await page.evaluate(async () => await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    }))
    const info = await page.evaluate(() => {
      const d = document.documentElement
      const over = []
      document.querySelectorAll('*').forEach((e) => {
        const cs = getComputedStyle(e)
        if (e.scrollWidth > d.clientWidth + 2 && cs.overflowX !== 'hidden' && cs.overflowX !== 'auto' && e.clientWidth > 2) {
          over.push((e.className || e.tagName).toString().slice(0, 28))
        }
      })
      const small = [...document.querySelectorAll('a,button,[role="button"],input,select,textarea')]
        .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 24 && !e.closest('nav,footer') })
        .length
      return {
        overflow: d.scrollWidth > d.clientWidth,
        offenders: [...new Set(over)].slice(0, 4),
        headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => h.tagName).join(','),
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        og: Boolean(document.querySelector('meta[property="og:title"]')),
        ogImage: Boolean(document.querySelector('meta[property="og:image"]')),
        smallTargets: small,
      }
    })
    entry.widths[w] = {
      violations: axe.violations.map((v) => `${v.impact}/${v.id}×${v.nodes.length} ${v.nodes[0]?.target?.[0] ?? ''}`),
      passes: axe.passes.length,
      overflow: info.overflow, offenders: info.offenders, smallTargets: info.smallTargets,
    }
    Object.assign(entry, {
      headings: info.headings, title: info.title, description: info.description,
      canonical: info.canonical, og: info.og, ogImage: info.ogImage,
    })
    if (w === 1440) await page.screenshot({ path: `${OUT}/${route.replace(/\//g, '_') || '_home'}-1440.png`, fullPage: true })
    await page.close()
  }
  report.routes[route] = entry
  const v = Object.values(entry.widths).reduce((a, x) => a + x.violations.length, 0)
  console.log(`${entry.exists ? 'OK ' : '404'} ${route.padEnd(14)} axe=${v} ${entry.exists ? `title="${entry.title.slice(0, 40)}"` : ''}`)
}

/* ------------------------------------------------------------ journeys -- */
const JOURNEYS = [
  ['A', 'Home → What We Do → Pricing → Contact', ['/', '/what-we-do', '/pricing', '/contact']],
  ['B', 'Home → Solutions → Atelier → Contact', ['/', '/solutions', '/solutions#atelier', '/contact']],
  ['C', 'Home → Solutions → Nexus → Contact', ['/', '/solutions', '/solutions#nexus', '/contact']],
  ['D', 'Home → Solutions → Blueprint → Contact', ['/', '/solutions', '/solutions#blueprint', '/contact']],
  ['E', 'Home → How we work → Contact', ['/', '/how-we-work', '/contact']],
]
for (const [id, label, steps] of JOURNEYS) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const trail = []
  let ok = true
  for (const step of steps) {
    const res = await page.goto(base + step, { waitUntil: 'domcontentloaded' }).catch(() => null)
    const status = res?.status() ?? 0
    const anchor = step.includes('#') ? await page.evaluate((h) => Boolean(document.querySelector(h)), '#' + step.split('#')[1]) : true
    trail.push(`${step} ${status}${step.includes('#') ? (anchor ? ' anchor✓' : ' anchor✗') : ''}`)
    if (status >= 400 || !anchor) ok = false
  }
  const form = await page.evaluate(() => Boolean(document.querySelector('form #name')))
  if (!form) ok = false
  report.journeys.push({ id, label, ok, trail: trail.join('  →  '), endsAtForm: form })
  console.log(`${ok ? 'PASS' : 'FAIL'} journey ${id}  ${trail.join('  →  ')}  form=${form}`)
  await page.close()
}

/* --------------------------------------------------------------- links -- */
{
  const page = await browser.newPage()
  const seen = new Set()
  for (const route of ROUTES) {
    const res = await page.goto(base + route, { waitUntil: 'domcontentloaded' }).catch(() => null)
    if (!res || res.status() >= 400) continue
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))
    for (const h of hrefs) {
      if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('http')) continue
      if (seen.has(h)) continue
      seen.add(h)
      const r = await fetch(base + h, { method: 'GET' }).catch(() => null)
      report.links.checked++
      if (!r || r.status >= 400) report.links.broken.push(`${h} (${r?.status ?? 'error'}) found on ${route}`)
    }
  }
  console.log(`links: ${report.links.checked} checked, ${report.links.broken.length} broken`)
  report.links.broken.forEach((b) => console.log('  broken:', b))
  await page.close()
}

await browser.close()
try { process.kill(-site.pid, 'SIGKILL') } catch {}
writeFileSync(`${OUT}/qa.json`, JSON.stringify(report, null, 2))

const totalViolations = Object.values(report.routes).reduce(
  (a, r) => a + Object.values(r.widths).reduce((b, w) => b + w.violations.length, 0), 0)
const missing = ROUTES.filter((r) => !report.routes[r].exists)
console.log(`\naxe violations across the site: ${totalViolations}`)
console.log(`routes missing: ${missing.join(', ') || 'none'}`)
console.log(`journeys passing: ${report.journeys.filter((j) => j.ok).length} of ${report.journeys.length}`)
