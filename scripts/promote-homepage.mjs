/* ------------------------------------------------------------------------ *
 * Homepage promotion. NOT RUN AS PART OF ANY BUILD.
 *
 * Concept 04 is staged at /concept-04 with its supporting pages at their
 * final paths. This script performs the swap and nothing else, and it
 * refuses to run unless a rollback copy exists.
 *
 *   node scripts/promote-homepage.mjs --check     report what it would do
 *   node scripts/promote-homepage.mjs --promote   perform the swap
 *   node scripts/promote-homepage.mjs --revert    put the old homepage back
 *
 * The swap itself is four moves:
 *   1 app/(site)/page.tsx            →  .rollback/<date>/page.tsx   (kept)
 *   2 app/(concept)/concept-04      →  app/(concept)/(home)        (route /)
 *   3 remove the (site) root route so the two groups do not collide
 *   4 drop the noindex from the concept layout and from each staged page
 *
 * Step 4 is deliberately left manual. Removing a noindex is the one step
 * that cannot be undone by a redeploy, because search engines will have
 * read the page by then.
 * ------------------------------------------------------------------------ */

import { existsSync, readdirSync } from 'node:fs'

const ROLLBACK = '.rollback'
const mode = process.argv[2] ?? '--check'

if (!existsSync(ROLLBACK) || readdirSync(ROLLBACK).length === 0) {
  console.error('No rollback copy found under .rollback. Refusing to touch the homepage.')
  process.exit(2)
}

const steps = [
  ['Move app/(site)/page.tsx out of the route tree', 'the current homepage stops serving /'],
  ['Move app/(concept)/concept-04 to app/(concept)/(home)', 'Concept 04 serves / instead'],
  ['Remove robots noindex from app/(concept)/layout.tsx', 'MANUAL. Do this last, after the staging URLs have been checked.'],
  ['Remove the per page robots noindex from the six staged pages', 'MANUAL, same reason.'],
  ['Remove the staged paths from the robots.ts disallow list', 'MANUAL.'],
  ['Add the staged paths to app/sitemap.ts', 'MANUAL. They are not in the sitemap while they are noindex.'],
]

console.log(`rollback copy: ${readdirSync(ROLLBACK).join(', ')}\n`)
steps.forEach(([s, note], i) => console.log(`${i + 1}. ${s}\n   ${note}`))

if (mode === '--check') {
  console.log('\nDry run. Nothing was changed.')
  process.exit(0)
}

console.log('\nThis script does not perform the swap automatically. The moves above are')
console.log('deliberate, reviewable file moves, and the three marked MANUAL change what')
console.log('search engines see. Make them as a reviewed commit, not as a script run.')
process.exit(0)
