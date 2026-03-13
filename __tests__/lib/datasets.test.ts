import { describe, it, expect } from 'vitest'
import { getDatasetSlug, validateRelatedDatasets } from '@/lib/datasets'
import { datasetData, getDatasetBySlug } from '@/lib/velite-data'
import type { DatasetDetail } from '@/lib/types'

describe('datasets helpers', () => {
  describe('getDatasetSlug', () => {
    it('should convert a name to a kebab-case slug', () => {
      expect(getDatasetSlug('Global Satellite Foot Traffic')).toBe(
        'global-satellite-foot-traffic'
      )
    })

    it('should strip leading and trailing hyphens', () => {
      expect(getDatasetSlug('---hello world---')).toBe('hello-world')
    })

    it('should collapse consecutive non-alphanumeric chars into one hyphen', () => {
      expect(getDatasetSlug('SEC 13-F   Holdings!!')).toBe('sec-13-f-holdings')
    })
  })

  describe('getDatasetBySlug', () => {
    it('should return the dataset matching the slug', () => {
      const first = datasetData[0]
      const found = getDatasetBySlug(first.slug)
      expect(found).toBeDefined()
      expect(found?.slug).toBe(first.slug)
    })

    it('should return undefined for a non-existent slug', () => {
      expect(getDatasetBySlug('does-not-exist')).toBeUndefined()
    })
  })

  describe('validateRelatedDatasets', () => {
    it('should classify related slugs as valid or broken', () => {
      const fakeDatasets = [
        { slug: 'a', relatedDatasets: ['b', 'c'] },
        { slug: 'b', relatedDatasets: [] },
      ] as DatasetDetail[]

      const result = validateRelatedDatasets(fakeDatasets[0], fakeDatasets)
      expect(result.valid).toEqual(['b'])
      expect(result.broken).toEqual(['c'])
    })

    it('should return empty arrays when there are no related datasets', () => {
      const ds = { slug: 'x', relatedDatasets: [] } as unknown as DatasetDetail
      const result = validateRelatedDatasets(ds, [ds])
      expect(result.valid).toEqual([])
      expect(result.broken).toEqual([])
    })
  })
})
