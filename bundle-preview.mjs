import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'out')

const pages = [
  { id: 'home', file: 'index.html', route: '/' },
  { id: 'pillars', file: 'pillars.html', route: '/pillars' },
  { id: 'approach', file: 'approach.html', route: '/approach' },
  { id: 'work', file: 'work.html', route: '/work' },
  { id: 'jewellery', file: 'work/premium-jewellery.html', route: '/work/premium-jewellery' },
  { id: 'operator', file: 'work/route-service-operator.html', route: '/work/route-service-operator' },
  { id: 'contact', file: 'contact.html', route: '/contact' },
  { id: 'privacy', file: 'privacy.html', route: '/privacy' },
  { id: 'terms', file: 'terms.html', route: '/terms' },
]

/* Inline the stylesheet and turn the font URLs into data URIs. */
const cssFile = readFileSync(path.join(OUT, 'index.html'), 'utf8').match(
  /_next\/static\/css\/([^"]+\.css)/,
)[1]
let css = readFileSync(path.join(OUT, '_next/static/css', cssFile), 'utf8')
css = css.replace(/url\(\/_next\/static\/media\/([^)]+\.woff2)\)/g, (_, file) => {
  const data = readFileSync(path.join(OUT, '_next/static/media', file)).toString('base64')
  return `url(data:font/woff2;base64,${data})`
})

/*
  next/font puts its custom properties on a class applied to <html>. The preview
  keeps only the body markup, so lift those declarations onto :root.
*/
const fontVars = [...css.matchAll(/\.__variable_[A-Za-z0-9_-]+\s*\{([^}]*)\}/g)]
  .map((m) => m[1])
  .join(';')
css += `\n:root{${fontVars}}\n`

const sections = pages
  .map(({ id, file }) => {
    const html = readFileSync(path.join(OUT, file), 'utf8')
    let body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'))
    body = body.replace(/<script[\s\S]*?<\/script>/g, '')
    body = body.replace(/<template[\s\S]*?<\/template>/g, '')

    /*
      Framer Motion writes its pre-animation state inline while rendering. Strip
      those declarations and tag the element, so the preview runs the same reveal
      from a small intersection observer rather than shipping the whole runtime.
    */
    body = body.replace(/<(\w+)([^>]*?)>/g, (tag, name, attrs) => {
      const style = attrs.match(/style="([^"]*)"/)
      if (!style || !/(^|;)\s*opacity\s*:\s*0\s*(;|$)/.test(style[1])) return tag
      const cleaned = style[1]
        .split(';')
        .filter((d) => !/^\s*opacity\s*:\s*0\s*$/.test(d) && !/^\s*transform\s*:/.test(d))
        .join(';')
        .trim()
      let next = attrs.replace(/style="[^"]*"/, cleaned ? `style="${cleaned}"` : '')
      next = next.match(/class="/)
        ? next.replace(/class="/, 'class="pv-reveal ')
        : `${next} class="pv-reveal"`
      return `<${name}${next}>`
    })

    body = body.replace(/href="(\/[^"]*)"/g, (m, href) => `href="#" data-route="${href}"`)
    return `<section class="pv-page" id="pv-${id}"${id === 'home' ? '' : ' hidden'}>${body}</section>`
  })
  .join('\n')

/*
  The brand marks repeat on every page and their traced paths are the largest
  thing in the file. Hoist each distinct mark into one <symbol> and point the
  copies at it with <use>, which keeps currentColor working.
*/
function dedupeMarks(html) {
  const counts = new Map()
  html.replace(/<svg\b[^>]*>([\s\S]*?)<\/svg>/g, (_, inner) => {
    counts.set(inner, (counts.get(inner) ?? 0) + 1)
    return ''
  })

  const seen = new Map()
  const symbols = []
  const out = html.replace(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/g, (match, attrs, inner) => {
    if ((counts.get(inner) ?? 0) < 2) return match
    let id = seen.get(inner)
    if (!id) {
      id = `mark-${seen.size + 1}`
      seen.set(inner, id)
      const viewBox = attrs.match(/viewBox="([^"]+)"/)
      symbols.push(`<symbol id="${id}"${viewBox ? ` viewBox="${viewBox[1]}"` : ''}>${inner}</symbol>`)
    }
    return `<svg${attrs}><use href="#${id}"/></svg>`
  })

  return symbols.length
    ? `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${symbols.join('')}</defs></svg>\n${out}`
    : out
}

const marked = dedupeMarks(sections)
const routeMap = JSON.stringify(Object.fromEntries(pages.map((p) => [p.route, p.id])))

const previewCss = `
.pv-reveal{opacity:0;transform:translateY(14px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1)}
.pv-reveal.pv-in{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){.pv-reveal{opacity:1;transform:none;transition:none}}
/* The mobile menu needs the app runtime, so the preview keeps the nav visible at every width. */
@media (max-width:767px){
  .pv-page div:has(> nav[aria-label="Primary"]){flex-wrap:wrap}
  .pv-page nav[aria-label="Primary"]{display:flex;flex:1 0 100%;gap:18px;margin-top:12px;font-size:10px;letter-spacing:.14em;align-items:center;white-space:nowrap}
  .pv-page button[aria-label="Open menu"]{display:none}
}
.pv-note{position:fixed;bottom:0;left:0;right:0;z-index:80;background:#0d0d0d;color:rgba(250,248,245,.6);font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;padding:10px 22px;display:flex;gap:24px;justify-content:space-between;align-items:center;border-top:1px solid rgba(250,248,245,.14)}
.pv-note b{color:#faf8f5;font-weight:500}
.pv-note b em{color:#ff0000;font-style:normal}
.pv-note span{text-align:right}
@media (max-width:640px){.pv-note span{display:none}}
body{padding-bottom:42px}
`

const note =
  '<p class="pv-note"><b>Pow <em>&amp;</em> Partners</b> <span>Static preview. Links between pages work.</span></p>'

const script = `<script>
(function(){
  var routes = ${routeMap};
  var observer = 'IntersectionObserver' in window ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('pv-in'); observer.unobserve(entry.target) }
    })
  }, { rootMargin: '0px 0px -80px 0px' }) : null

  function watch(root){
    if(!root) return
    var items = root.querySelectorAll('.pv-reveal:not(.pv-in)')
    if(!observer){ items.forEach(function(el){ el.classList.add('pv-in') }); return }
    items.forEach(function(el){ observer.observe(el) })
  }

  function show(id){
    document.querySelectorAll('.pv-page').forEach(function(section){
      section.hidden = section.id !== 'pv-' + id
    })
    window.scrollTo(0, 0)
    watch(document.getElementById('pv-' + id))
  }

  document.addEventListener('click', function(e){
    var link = e.target.closest('a[data-route]')
    if(!link) return
    var route = link.getAttribute('data-route')
    e.preventDefault()
    var hash = route.indexOf('#')
    if(hash > -1){
      var base = route.slice(0, hash) || '/'
      var id = routes[base] || 'home'
      show(id)
      var target = document.querySelector('#pv-' + id + ' #' + route.slice(hash + 1))
      if(target) target.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if(routes[route]) show(routes[route])
  })

  watch(document.getElementById('pv-home'))
})()
</script>`

/* Fragment for the hosted artifact: the platform supplies the document shell. */
const fragment = `<title>Pow &amp; Partners</title>
<style>
${css}
${previewCss}
</style>
${marked}
${note}
${script}
`

/* Standalone file: a complete document that can be emailed or opened from disk. */
const standalone = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pow &amp; Partners</title>
<meta name="description" content="Pow &amp; Partners. We build what comes next. Website preview.">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0}
img{max-width:100%}
[hidden]{display:none!important}
${css}
${previewCss}
</style>
</head>
<body>
${marked}
${note}
${script}
</body>
</html>
`

writeFileSync('/home/claude/out/preview.html', fragment)
writeFileSync('/home/claude/out/pow-and-partners-preview.html', standalone)
console.log(
  'fragment',
  (fragment.length / 1024).toFixed(0) + 'kb',
  '/ standalone',
  (standalone.length / 1024).toFixed(0) + 'kb',
)
