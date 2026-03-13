// Content adapter — re-exports Velite collections with stable types.
// When adding a new Velite collection, add a re-export here.
// Velite validates all data at build time, so no runtime validation is needed.

import {
  datasetPages as _datasetPages,
  datasetData as _datasetData,
} from '#velite'

import type { DatasetDetail, CatalogueDataset } from '@/lib/types'

export const datasetPages = _datasetPages

export const datasetData: DatasetDetail[] = _datasetData

// ---------------------------------------------------------------------------
// Derived catalogue (4.1) — eliminates content/catalogue.json
// ---------------------------------------------------------------------------

export const catalogueEntries: { datasets: CatalogueDataset[] } = {
  datasets: _datasetData.map((d) => ({
    slug: d.slug,
    name: d.name,
    vendor: d.vendor,
    category: d.category,
    description: d.description,
    frequency: d.frequency,
    coverage: d.coverage,
    history: d.history,
    creditAmount: d.creditAmount,
    creditUnit: d.creditUnit,
    tags: [...d.tags],
  })),
}

// ---------------------------------------------------------------------------
// Lookup index (4.8) — O(1) dataset lookup by slug
// ---------------------------------------------------------------------------

const datasetBySlug = new Map<string, DatasetDetail>(
  _datasetData.map((d) => [d.slug, d])
)

export function getDatasetBySlug(slug: string): DatasetDetail | undefined {
  return datasetBySlug.get(slug)
}

// ---------------------------------------------------------------------------
// Build-time integrity checks (4.7 + 4.10)
// ---------------------------------------------------------------------------

if (typeof process !== 'undefined') {
  const allSlugs = new Set(_datasetData.map((d) => d.slug))

  // 4.7 — Validate relatedDatasets references
  for (const ds of _datasetData) {
    for (const related of ds.relatedDatasets) {
      if (!allSlugs.has(related)) {
        console.warn(
          `[velite-data] Broken relatedDatasets reference: "${ds.slug}" references "${related}" which does not exist`
        )
      }
    }
  }

  // 4.10 — Validate sampleRow keys against fields array
  for (const ds of _datasetData) {
    const fieldNames = new Set(ds.fields.map((f) => f.name))
    for (const [rowIdx, row] of ds.empirical.sampleRows.entries()) {
      for (const key of Object.keys(row)) {
        if (!fieldNames.has(key)) {
          console.warn(
            `[velite-data] Sample row key mismatch: "${ds.slug}" sampleRows[${rowIdx}] has key "${key}" not in fields array`
          )
        }
      }
    }
  }
}
