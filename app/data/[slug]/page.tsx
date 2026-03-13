import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { datasetPages, datasetData, getDatasetBySlug } from '@/lib/velite-data'
import DatasetDetailPage from './dataset-detail-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

// ---------------------------------------------------------------------------
// Precomputed slug-to-name map (shared across all dataset pages at build time)
// ---------------------------------------------------------------------------

const slugToName = Object.fromEntries(datasetData.map((d) => [d.slug, d.name]))
const validSlugs = datasetData.map((d) => d.slug)

// ---------------------------------------------------------------------------
// Static generation -- every dataset gets its own pre-rendered page
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return datasetData.map((d) => ({ slug: d.slug }))
}

// ---------------------------------------------------------------------------
// Dynamic metadata per dataset
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = getDatasetBySlug(slug)
  if (!data) return {}

  const title = `${data.name} — DataCatalogue`
  const description = data.description

  const ogImage = data.heroImage || '/og-default.png'

  return {
    title,
    description,
    keywords: data.tags,
    alternates: { canonical: `https://alt-data-catalogue.fly.dev/data/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: ogImage, alt: data.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ---------------------------------------------------------------------------
// RSC -- loads Velite data and passes everything to the client island
// ---------------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const data = getDatasetBySlug(slug)
  const page = datasetPages.find((p) => p.slug === slug)

  if (!data) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: data.name,
    description: data.description,
    url: `https://alt-data-catalogue.fly.dev/data/${data.slug}`,
    keywords: data.tags,
    license: data.license,
    provider: {
      '@type': 'Organization',
      name: data.vendor,
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
    },
    temporalCoverage: data.history,
    spatialCoverage: data.coverage,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DatasetDetailPage
        dataset={data}
        mdxCode={page?.body}
        slugToName={slugToName}
        validSlugs={validSlugs}
      />
    </>
  )
}
