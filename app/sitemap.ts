import type { MetadataRoute } from 'next'
import { datasetData } from '@/lib/velite-data'

const BASE_URL = 'https://alt-data-catalogue.fly.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/data`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]

  const datasetPages: MetadataRoute.Sitemap = datasetData.map((d) => ({
    url: `${BASE_URL}/data/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...datasetPages]
}
