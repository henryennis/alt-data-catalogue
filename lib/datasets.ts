import type { DatasetDetail } from '@/lib/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getDatasetSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function validateRelatedDatasets(
  dataset: DatasetDetail,
  allDatasets: DatasetDetail[]
): { valid: string[]; broken: string[] } {
  const availableSlugs = new Set(allDatasets.map((d) => d.slug))
  const valid: string[] = []
  const broken: string[] = []

  for (const relatedSlug of dataset.relatedDatasets) {
    if (availableSlugs.has(relatedSlug)) {
      valid.push(relatedSlug)
    } else {
      broken.push(relatedSlug)
    }
  }

  return { valid, broken }
}
