import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'
import { isProduction } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  /* A preview or review deployment is closed to crawlers outright. Only a
     production deployment publishes an allow rule or a sitemap. */
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    /* The replacement homepage and its supporting pages are staged at their
       final paths and are not live. They carry a page level noindex as well;
       this is the second lock rather than the only one. */
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/concept-04', '/what-we-do', '/solutions', '/pricing', '/about', '/insights', '/cookies'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
