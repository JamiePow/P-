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
 * Whole-site QA. Starts the built site, then for every route and every
 * breakpoint records axe violations, horizontal overflow, heading order and
 * broken internal links. Also walks the commercial journeys by clicking.
 *
 *   node scripts/site-qa.mjs [outDir]
 * ------------------------------------------------------------------------ */

import { spawn } from 'node:child_process'
import { createConnection } from 'node:net'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'




const OUT = process.argv[2] || join(REPO, '.qa')
mkdirSync(OUT, { recursive: true })
const PORT = 9301

const free = (port) => new Promise((r) => {
  const s = createConnection({ port, host: '127.0.0.1' })
  s.on('connect', () => { s.destroy(); r(false) })
  s.on('error', () => r(true))
  setTimeout(() => { s.destroy(); r(true) }, 800)
})
if (!(await free(PORT))) { console.error(`port ${PORT} in use`); process.exit(2) }

const site = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  cwd: REPO,
  env: { ...process.env, ENQUIRY_WEBHOOK_URL: '', ENQUIRY_NOTIFY_EMAIL: '' },
  stdio: 'ignore', detached: true,
})
const base = `http://127.0.0.1:${PORT}`
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`${base}/api/enquiry`)).ok) break } catch {}
  await new Promise((r) => setTimeout(r, 500))
}

/* /insights is gated on there being something to read: while lib/insights.ts
   is empty the route 404s, is out of the sitemap and is disallowed in
   robots.txt. Adding the first entry restores it and this list with it. */
const INSIGHTS_PUBLISHED = /export const insights: Insight\[\] = \[\s*\]/.test(
  readFileSync(join(REPO, 'lib/insights.ts'), 'utf8'),
) === false
const ROUTES = ['/', '/what-we-do', '/solutions', '/how-we-work', '/pricing', '/about', '/contact', '/privacy', '/cookies', '/terms',
  ...(INSIGHTS_PUBLISHED ? ['/insights'] : [])]
const WIDTHS = [390, 768, 1024, 1440]
const AXE = readFileSync(join(REPO, 'node_modules/axe-core/axe.min.js'), 'utf8')
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
      /* Encoding regression. A literal \\u00a3 once reached two public pages,
         because a JSX attribute string is not a JavaScript string literal and
         does not process escape sequences. This walks the visible text, the
         title, the meta description and the structured data looking for
         anything that should have been a character and is still a code. */
      const BAD = /\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}|\uFFFD|Â£|â€|&(?:amp|lt|gt|quot|nbsp|pound|#\d+);/
      const encoding = []
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      let node
      while ((node = walker.nextNode())) {
        const tag = node.parentElement?.tagName
        if (tag === 'SCRIPT' || tag === 'STYLE') continue
        const t = node.nodeValue
        if (t && t.trim() && BAD.test(t)) encoding.push('text: ' + t.trim().slice(0, 70))
      }
      for (const [k, v] of [
        ['title', document.title],
        ['description', document.querySelector('meta[name="description"]')?.content || ''],
        ['og:title', document.querySelector('meta[property="og:title"]')?.content || ''],
        ['json-ld', [...document.querySelectorAll('script[type="application/ld+json"]')].map((n) => n.textContent).join(' ')],
      ]) {
        if (v && BAD.test(v)) encoding.push(k + ': ' + v.slice(0, 70))
      }

      return {
        encoding,
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
      encoding: info.encoding,
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
/* Encoding: report every distinct finding, per route, and fail loudly. */
const encodingFindings = []
for (const [route, entry] of Object.entries(report.routes)) {
  const all = new Set()
  for (const w of Object.values(entry.widths || {})) (w.encoding || []).forEach((e) => all.add(e))
  if (all.size) encodingFindings.push({ route, findings: [...all] })
}
if (encodingFindings.length) {
  console.log('\nENCODING DEFECTS')
  for (const f of encodingFindings) {
    console.log(`  ${f.route}`)
    f.findings.forEach((x) => console.log(`      ${x}`))
  }
}
report.encoding = encodingFindings

const missing = ROUTES.filter((r) => !report.routes[r].exists)
console.log(`\naxe violations across the site: ${totalViolations}`)
console.log(`routes missing: ${missing.join(', ') || 'none'}`)
console.log(`journeys passing: ${report.journeys.filter((j) => j.ok).length} of ${report.journeys.length}`)
console.log(`encoding defects: ${encodingFindings.length === 0 ? 'none' : encodingFindings.length + ' route(s)'}`)
