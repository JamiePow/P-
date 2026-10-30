import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'
import { insightsPublished } from '@/lib/insights'

/* Every public route, and nothing that no longer exists. /pillars, /approach
   and /work were retired when the two shells were converged; /approach is
   redirected to /how-we-work in next.config.mjs. */

const routes = [
  '',
  '/what-we-do',
  '/solutions',
  '/how-we-work',
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/cookies',
  '/terms',
  /* Listed only once something is written. While the section is empty the
     route 404s, so listing it would advertise a page that is not there. */
  ...(insightsPublished ? ['/insights'] : []),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
}
