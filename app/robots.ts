import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'
import { isProduction } from '@/lib/env'
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
  /* A preview or review deployment is closed to crawlers outright. Only a
     production deployment publishes an allow rule or a sitemap. */
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  const disallow = ['/api/', ...(insightsPublished ? [] : ['/insights'])]

  return {
    rules: { userAgent: '*', allow: '/', disallow },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
