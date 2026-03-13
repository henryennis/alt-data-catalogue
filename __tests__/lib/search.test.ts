import { describe, it, expect } from 'vitest'
import Fuse from 'fuse.js'
import { catalogueEntries } from '@/lib/velite-data'
import type { CatalogueDataset } from '@/lib/types'

/**
 * Tests for the Fuse.js fuzzy search used in the catalogue page.
 * The Fuse config mirrors catalogue-client.tsx.
 */
describe('Catalogue Fuse.js search', () => {
  const datasets = catalogueEntries.datasets

  const fuse = new Fuse<CatalogueDataset>(datasets, {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'vendor', weight: 0.2 },
      { name: 'description', weight: 0.2 },
      { name: 'tags', weight: 0.1 },
      { name: 'category', weight: 0.05 },
      { name: 'coverage', weight: 0.05 },
    ],
    threshold: 0.4,
    minMatchCharLength: 2,
  })

  it('should return results for "satellite"', () => {
    const results = fuse.search('satellite')
    expect(results.length).toBeGreaterThan(0)
    // At least one result should reference satellite in name or category
    const hasSatelliteMatch = results.some(
      (r) =>
        r.item.name.toLowerCase().includes('satellite') ||
        r.item.category.toLowerCase().includes('satellite')
    )
    expect(hasSatelliteMatch).toBe(true)
  })

  it('should return results when searching by vendor name', () => {
    // Pick the first dataset's vendor and search for it
    const vendorName = datasets[0].vendor
    const results = fuse.search(vendorName)
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.item.vendor === vendorName)).toBe(true)
  })

  it('should return empty results for a nonsensical query', () => {
    const results = fuse.search('xyzzyplugh')
    expect(results.length).toBe(0)
  })

  it('should handle an empty query gracefully', () => {
    const results = fuse.search('')
    expect(results.length).toBe(0)
  })
})
