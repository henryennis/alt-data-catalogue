import { Suspense } from 'react'
import type { Metadata } from 'next'
import { catalogueEntries } from '@/lib/velite-data'
import type { CatalogueDataset } from '@/lib/types'
import CatalogueClient from './catalogue-client'

// ---------------------------------------------------------------------------
// Static metadata for catalogue page
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Data Catalogue — DataCatalogue',
  description:
    'Browse curated datasets with detailed profiles. Satellite imagery, sentiment analysis, SEC filings, and more — schema docs, code examples, and empirical statistics.',
  openGraph: {
    title: 'Data Catalogue — DataCatalogue',
    description:
      'Browse curated datasets with detailed profiles and documentation.',
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'DataCatalogue Data Catalogue',
      },
    ],
  },
  alternates: { canonical: 'https://alt-data-catalogue.fly.dev/data' },
}

// ---------------------------------------------------------------------------
// RSC -- loads catalogue data at build time, passes to client island
// ---------------------------------------------------------------------------

export default function DataCataloguePage() {
  const datasets: CatalogueDataset[] = catalogueEntries?.datasets ?? []
  const buildDate = new Date().toISOString()
  return (
    <Suspense>
      <CatalogueClient datasets={datasets} buildDate={buildDate} />
    </Suspense>
  )
}
