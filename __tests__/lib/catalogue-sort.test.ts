import { describe, it, expect } from 'vitest'
import { catalogueComparator, type SortKey } from '@/lib/catalogue-sort'
import type { CatalogueDataset } from '@/lib/types'

// Minimal dataset fixtures with varying field values for sort testing
const datasets: CatalogueDataset[] = [
  {
    slug: 'beta-dataset',
    name: 'Beta Dataset',
    vendor: 'Zeta Corp',
    category: 'satellite',
    description: 'Second alphabetically by name',
    frequency: 'Daily',
    coverage: 'Global',
    history: '3 years',
    creditAmount: 15,
    creditUnit: 'credits/query',
    tags: ['geo'],
  },
  {
    slug: 'alpha-dataset',
    name: 'Alpha Dataset',
    vendor: 'Acme Inc',
    category: 'sentiment',
    description: 'First alphabetically by name',
    frequency: 'Daily',
    coverage: 'US',
    history: '5 years',
    creditAmount: 200,
    creditUnit: 'credits/query',
    tags: ['nlp'],
  },
  {
    slug: 'gamma-dataset',
    name: 'Gamma Dataset',
    vendor: 'MidVendor',
    category: 'sec-filings',
    description: 'Third alphabetically by name',
    frequency: 'Quarterly',
    coverage: 'EU',
    history: '2 years',
    creditAmount: 5.5,
    creditUnit: 'credits/query',
    tags: ['regulatory'],
  },
]

function sortedNames(key: SortKey): string[] {
  return [...datasets].sort(catalogueComparator(key)).map((d) => d.name)
}

describe('catalogueComparator', () => {
  it('sorts by name alphabetically', () => {
    expect(sortedNames('name')).toEqual([
      'Alpha Dataset',
      'Beta Dataset',
      'Gamma Dataset',
    ])
  })

  it('sorts by vendor alphabetically', () => {
    const sorted = [...datasets].sort(catalogueComparator('vendor'))
    expect(sorted.map((d) => d.vendor)).toEqual([
      'Acme Inc',
      'MidVendor',
      'Zeta Corp',
    ])
  })

  it('sorts by credits numerically', () => {
    const sorted = [...datasets].sort(catalogueComparator('credits'))
    expect(sorted.map((d) => d.creditAmount)).toEqual([5.5, 15, 200])
  })

  it('sorts by frequency alphabetically', () => {
    const sorted = [...datasets].sort(catalogueComparator('frequency'))
    expect(sorted.map((d) => d.frequency)).toEqual([
      'Daily',
      'Daily',
      'Quarterly',
    ])
  })

  it('does not mutate the original array', () => {
    const original = [...datasets]
    const copy = [...datasets]
    copy.sort(catalogueComparator('credits'))
    expect(original).toEqual(datasets)
  })

  it('handles equal values stably', () => {
    const duplicated: CatalogueDataset[] = [
      { ...datasets[0], creditAmount: 10 },
      { ...datasets[1], creditAmount: 10 },
    ]
    const sorted = [...duplicated].sort(catalogueComparator('credits'))
    // Both have same credits, order should be preserved (stable sort)
    expect(sorted.map((d) => d.name)).toEqual(['Beta Dataset', 'Alpha Dataset'])
  })
})
