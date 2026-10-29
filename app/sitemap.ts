import type { MetadataRoute } from 'next'
import { proof, site } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/pillars', '/approach', '/work', '/contact', '/privacy', '/terms']
  const now = new Date()

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...proof.map((item) => ({
      url: `${site.url}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
