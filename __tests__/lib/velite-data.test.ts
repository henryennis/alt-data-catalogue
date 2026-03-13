import { describe, it, expect } from 'vitest'
import {
  datasetData,
  catalogueEntries,
  getDatasetBySlug,
} from '@/lib/velite-data'
import { validateRelatedDatasets } from '@/lib/datasets'

/**
 * Smoke tests for Velite data validation.
 * Ensures that data loaded from Velite conforms to expected structure
 * and that Zod validation in velite-data.ts has not silently broken.
 */
describe('Velite Data Validation', () => {
  describe('datasetData', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(datasetData)).toBe(true)
      expect(datasetData.length).toBeGreaterThan(0)
    })

    it('each dataset should have required top-level fields', () => {
      for (const ds of datasetData) {
        expect(ds).toHaveProperty('slug')
        expect(ds).toHaveProperty('name')
        expect(ds).toHaveProperty('fields')
        expect(ds).toHaveProperty('empirical')
        expect(ds).toHaveProperty('codeExamples')

        expect(typeof ds.slug).toBe('string')
        expect(typeof ds.name).toBe('string')
        expect(Array.isArray(ds.fields)).toBe(true)
        expect(Array.isArray(ds.codeExamples)).toBe(true)
        expect(typeof ds.empirical).toBe('object')
      }
    })

    it('each dataset slug should be unique', () => {
      const slugs = datasetData.map((d) => d.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })
  })

  describe('catalogueEntries (derived from datasetData)', () => {
    it('should have a datasets array with length > 0', () => {
      expect(Array.isArray(catalogueEntries.datasets)).toBe(true)
      expect(catalogueEntries.datasets.length).toBeGreaterThan(0)
    })

    it('should have the same count as datasetData', () => {
      expect(catalogueEntries.datasets.length).toBe(datasetData.length)
    })

    it('each catalogue entry should have slug, name, vendor, category, and creditAmount', () => {
      for (const entry of catalogueEntries.datasets) {
        expect(entry).toHaveProperty('slug')
        expect(entry).toHaveProperty('name')
        expect(entry).toHaveProperty('vendor')
        expect(entry).toHaveProperty('category')
        expect(entry).toHaveProperty('creditAmount')
        expect(entry).toHaveProperty('creditUnit')

        expect(typeof entry.slug).toBe('string')
        expect(typeof entry.name).toBe('string')
        expect(typeof entry.vendor).toBe('string')
        expect(typeof entry.category).toBe('string')
        expect(typeof entry.creditAmount).toBe('number')
        expect(typeof entry.creditUnit).toBe('string')
      }
    })
  })

  describe('getDatasetBySlug', () => {
    it('should return dataset for existing slug', () => {
      const first = datasetData[0]
      const found = getDatasetBySlug(first.slug)
      expect(found).toBeDefined()
      expect(found?.slug).toBe(first.slug)
    })

    it('should return undefined for non-existent slug', () => {
      expect(getDatasetBySlug('does-not-exist')).toBeUndefined()
    })
  })

  describe('validateRelatedDatasets', () => {
    it('should return valid and broken arrays for each dataset', () => {
      for (const ds of datasetData) {
        const result = validateRelatedDatasets(ds, datasetData)
        expect(result).toHaveProperty('valid')
        expect(result).toHaveProperty('broken')
        expect(Array.isArray(result.valid)).toBe(true)
        expect(Array.isArray(result.broken)).toBe(true)
        // Every slug in valid + broken should account for all relatedDatasets
        expect(result.valid.length + result.broken.length).toBe(
          ds.relatedDatasets.length
        )
      }
    })

    it('all valid related-dataset slugs should resolve to real datasets', () => {
      const allSlugs = new Set(datasetData.map((d) => d.slug))
      for (const ds of datasetData) {
        const { valid } = validateRelatedDatasets(ds, datasetData)
        for (const slug of valid) {
          expect(allSlugs.has(slug)).toBe(true)
        }
      }
    })
  })
})
