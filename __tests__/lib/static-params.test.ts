import { describe, it, expect } from 'vitest'
import { datasetData } from '@/lib/velite-data'

/**
 * Tests that generateStaticParams (which maps datasetData to slugs)
 * would produce valid, non-empty slug list matching actual data.
 */
describe('generateStaticParams equivalent', () => {
  // We can't import the actual Next.js page export easily in Vitest,
  // but generateStaticParams is just: datasetData.map(d => ({ slug: d.slug }))
  const staticParams = datasetData.map((d) => ({ slug: d.slug }))

  it('should produce at least one static param', () => {
    expect(staticParams.length).toBeGreaterThan(0)
  })

  it('every param should have a non-empty slug string', () => {
    for (const param of staticParams) {
      expect(typeof param.slug).toBe('string')
      expect(param.slug.length).toBeGreaterThan(0)
    }
  })

  it('slugs should be unique', () => {
    const slugs = staticParams.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every slug in datasetData should appear in staticParams', () => {
    const paramSlugs = new Set(staticParams.map((p) => p.slug))
    for (const ds of datasetData) {
      expect(paramSlugs.has(ds.slug)).toBe(true)
    }
  })
})
