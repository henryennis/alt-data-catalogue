'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Database } from 'lucide-react'
import { AnimateIn } from '@/components/animate-in'
import type { CatalogueDataset } from '@/lib/types'

interface TerminalSectionProps {
  datasets?: CatalogueDataset[]
}

export function TerminalSection({
  datasets: initialDatasets,
}: TerminalSectionProps) {
  // Use provided datasets or fall back to example data
  const datasets =
    initialDatasets && initialDatasets.length > 0
      ? initialDatasets
      : ([
          {
            slug: 'brain-sentiment',
            name: 'Brain Sentiment Indicator',
            vendor: 'Brain Company',
            category: 'sentiment',
            description: 'Sentiment data',
            frequency: 'Daily',
            coverage: 'US Equities',
            history: '5 years',
            creditAmount: 0.02,
            creditUnit: 'credits/query',
            tags: [],
          },
          {
            slug: 'sec-filings',
            name: 'SEC EDGAR Filings',
            vendor: 'SEC',
            category: 'sec-filings',
            description: 'SEC filings',
            frequency: 'Daily',
            coverage: 'US Equities',
            history: '10 years',
            creditAmount: 0.01,
            creditUnit: 'credits/query',
            tags: [],
          },
          {
            slug: 'satellite-parking',
            name: 'Satellite Parking Lots',
            vendor: 'RS Metrics',
            category: 'satellite',
            description: 'Satellite imagery',
            frequency: 'Daily',
            coverage: 'US Retail',
            history: '3 years',
            creditAmount: 0.05,
            creditUnit: 'credits/query',
            tags: [],
          },
        ] as CatalogueDataset[])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [frequency, setFrequency] = useState('All')

  /** Derive unique category options from actual data */
  const categoryOptions = useMemo(() => {
    const ACRONYMS = new Set(['sec', 'api'])
    const raw = [...new Set(datasets.map((d) => d.category))].sort()
    return raw.map((c) =>
      c
        .split('-')
        .map((w) =>
          ACRONYMS.has(w)
            ? w.toUpperCase()
            : w.charAt(0).toUpperCase() + w.slice(1)
        )
        .join(' ')
    )
  }, [datasets])

  /** Derive unique frequency options from actual data */
  const frequencyOptions = useMemo(() => {
    return [...new Set(datasets.map((d) => d.frequency))].sort()
  }, [datasets])

  const results = useMemo(() => {
    let filtered = [...datasets]
    if (category !== 'All') {
      const normalise = (s: string) => s.toLowerCase().replace(/[\s-]+/g, '')
      filtered = filtered.filter(
        (d) => normalise(d.category) === normalise(category)
      )
    }
    if (frequency !== 'All') {
      filtered = filtered.filter((d) => d.frequency === frequency)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.vendor.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.coverage.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [query, category, frequency, datasets])

  // Show results as soon as any filter / query is active
  const hasSearched =
    query.trim() !== '' || category !== 'All' || frequency !== 'All'

  return (
    <section
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="terminal-heading"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <AnimateIn className="text-center mb-12">
          <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
            Data Explorer
          </p>
          <h2
            id="terminal-heading"
            className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4"
          >
            Search the catalogue
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find the signal you need across our curated alternative and
            traditional datasets.
          </p>
        </AnimateIn>

        {/* Terminal */}
        <AnimateIn delay={100}>
          <div className="border border-border bg-card overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <span className="text-xs text-muted-foreground font-mono">
                user@datacatalogue:~/data
              </span>
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              </div>
            </div>

            {/* Search input */}
            <div className="p-5">
              <label htmlFor="data-search" className="sr-only">
                Search for datasets
              </label>
              <textarea
                id="data-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                  }
                }}
                placeholder="Search for datasets... e.g. satellite imagery, SEC filings, social sentiment"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none min-h-[80px] leading-relaxed font-mono text-sm"
                aria-label="Dataset search query"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-5 py-4 border-t border-border bg-muted/20">
              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="category-select"
                    className="text-[10px] text-muted-foreground block mb-1.5 font-mono uppercase tracking-wider"
                  >
                    Category
                  </label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    <option>All</option>
                    {categoryOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="frequency-select"
                    className="text-[10px] text-muted-foreground block mb-1.5 font-mono uppercase tracking-wider"
                  >
                    Frequency
                  </label>
                  <select
                    id="frequency-select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    <option>All</option>
                    {frequencyOptions.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-mono self-end sm:self-center">
                Results update as you type
              </p>
            </div>

            {/* Results */}
            {hasSearched && (
              <div className="border-t border-border" aria-live="polite">
                <div className="px-5 py-3 bg-muted/10 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    {results.length} dataset{results.length !== 1 ? 's' : ''}{' '}
                    found
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {category !== 'All' &&
                      `category:${category.toLowerCase()} `}
                    {frequency !== 'All' && `freq:${frequency.toLowerCase()}`}
                  </span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {results.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th
                            scope="col"
                            className="px-5 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                          >
                            Dataset
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider hidden sm:table-cell"
                          >
                            Vendor
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                          >
                            Frequency
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider text-right"
                          >
                            Credits
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((d) => (
                          <tr
                            key={d.slug}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors group"
                          >
                            <td className="px-5 py-3">
                              <Link
                                href={`/data/${d.slug}`}
                                className="text-sm text-foreground group-hover:text-primary transition-colors"
                              >
                                {d.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-1 sm:hidden">
                                <span className="text-xs text-muted-foreground">
                                  {d.vendor}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                              {d.vendor}
                            </td>
                            <td className="px-5 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">
                              {d.frequency}
                            </td>
                            <td className="px-5 py-3 text-right">
                              <span className="text-primary font-mono text-xs">
                                {d.creditAmount} {d.creditUnit}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="px-5 py-12 text-center">
                      <Database className="h-6 w-6 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        No datasets match your query.
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
