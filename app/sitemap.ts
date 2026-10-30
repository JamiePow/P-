import type { MetadataRoute } from 'next'
import { site } from '@/lib/data'

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
  '/insights',
  '/contact',
  '/privacy',
  '/cookies',
  '/terms',
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
