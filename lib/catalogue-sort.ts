import type { CatalogueDataset } from '@/lib/types'

export type SortKey = 'name' | 'vendor' | 'credits' | 'frequency'

export function catalogueComparator(
  sortBy: SortKey
): (a: CatalogueDataset, b: CatalogueDataset) => number {
  return (a, b) => {
    switch (sortBy) {
      case 'vendor':
        return a.vendor.localeCompare(b.vendor)
      case 'credits':
        return a.creditAmount - b.creditAmount
      case 'frequency':
        return a.frequency.localeCompare(b.frequency)
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  }
}
