import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'
import { indexingAllowed } from '@/lib/env'
import { insightsPublished } from '@/lib/insights'

/*
  Crawl rules.

  This file previously disallowed /what-we-do, /solutions, /pricing, /about,
  /cookies and /concept-04, from when the replacement pages were staged at
  their final paths alongside the old site. Those pages are now the site. Left
  as it was, a production deployment would have told every crawler not to read
  most of it.

  What remains disallowed is the API route, which has nothing to index, and
  the Insights section while it is empty — that route also returns a 404 and
  carries a page-level noindex, so this is the third lock rather than the only
  one. Publishing the first piece lifts all three together.
*/

export default function robots(): MetadataRoute.Robots {
  /* Any build that has not declared launch is closed to crawlers outright,
     production included — the production URL is used for review too, so the
     environment alone cannot mean "ready to be found". Only a production
     deployment with ALLOW_INDEXING=1 publishes an allow rule or a sitemap. */
  if (!indexingAllowed) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  const disallow = ['/api/', ...(insightsPublished ? [] : ['/insights'])]

  return {
    rules: { userAgent: '*', allow: '/', disallow },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
