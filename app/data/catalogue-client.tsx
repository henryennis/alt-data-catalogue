'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import type { CatalogueDataset } from '@/lib/types'
import { catalogueComparator, type SortKey } from '@/lib/catalogue-sort'
import { useDebounce } from '@/hooks/use-debounce'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  CatalogueSidebar,
  MobileSearch,
  MobileCategoryPills,
  type Category,
} from './catalogue-sidebar'
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Satellite,
  MessageSquare,
  FileText,
  Globe,
  BarChart3,
  Cloud,
  Landmark,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Categories -- computed from data
// ---------------------------------------------------------------------------

function computeCategories(datasets: CatalogueDataset[]): Category[] {
  const categoryMap = new Map<
    string,
    {
      label: string
      icon: React.ComponentType<{ className?: string }>
      count: number
    }
  >()

  // Initialize with known categories
  const knownCategories: Record<
    string,
    { label: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    satellite: { label: 'Satellite & Geospatial', icon: Satellite },
    sentiment: { label: 'Sentiment & NLP', icon: MessageSquare },
    'sec-filings': { label: 'SEC Filings & Regulatory', icon: FileText },
    'web-data': { label: 'Web & Social', icon: Globe },
    fundamental: { label: 'Fundamental & Financials', icon: BarChart3 },
    weather: { label: 'Weather & Environmental', icon: Cloud },
    macro: { label: 'Macro & Economic', icon: Landmark },
    options: { label: 'Options & Derivatives', icon: TrendingUp },
    realtime: { label: 'Real-Time & Tick', icon: Zap },
  }

  for (const [catId, catInfo] of Object.entries(knownCategories)) {
    categoryMap.set(catId, { ...catInfo, count: 0 })
  }

  // Count datasets per category
  for (const dataset of datasets) {
    if (categoryMap.has(dataset.category)) {
      const cat = categoryMap.get(dataset.category)!
      cat.count++
    } else {
      // Add new category if not in known list (with generic icon)
      categoryMap.set(dataset.category, {
        label: dataset.category,
        icon: Database,
        count: 1,
      })
    }
  }

  // Build final array
  const categories: Category[] = [
    {
      id: 'all',
      label: 'All Datasets',
      icon: Database,
      count: datasets.length,
    },
  ]

  for (const [id, cat] of categoryMap.entries()) {
    categories.push({ id, ...cat })
  }

  return categories
}

// ---------------------------------------------------------------------------
// Dataset card
// ---------------------------------------------------------------------------

function DatasetCard({ dataset }: { dataset: CatalogueDataset }) {
  const slug = dataset.slug
  return (
    <Link
      href={`/data/${slug}`}
      className="block border border-border p-5 hover:border-primary/30 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {dataset.name}
          </h3>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">
            {dataset.vendor}
          </p>
        </div>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-mono uppercase shrink-0">
          {dataset.frequency}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {dataset.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Coverage
            </p>
            <p className="text-xs text-foreground mt-0.5">{dataset.coverage}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              History
            </p>
            <p className="text-xs text-foreground mt-0.5">{dataset.history}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Credits
            </p>
            <p className="text-xs text-primary font-mono mt-0.5">
              {dataset.creditAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border">
        {dataset.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Client island -- interactive filtering, search, category selection
// ---------------------------------------------------------------------------

interface CatalogueClientProps {
  datasets: CatalogueDataset[]
  buildDate: string
}

const VALID_SORT_KEYS: readonly string[] = [
  'name',
  'vendor',
  'credits',
  'frequency',
]

function isValidSortKey(value: string): value is SortKey {
  return VALID_SORT_KEYS.includes(value)
}

export default function CatalogueClient({
  datasets,
  buildDate,
}: CatalogueClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize state from URL search params
  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get('category') ?? 'all'
  )
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get('q') ?? ''
  )
  const [sortBy, setSortBy] = useState<SortKey>(() => {
    const param = searchParams.get('sort')
    return param && isValidSortKey(param) ? param : 'name'
  })
  // Track whether the user has explicitly changed the sort option.
  // When false and a search query is active, Fuse.js relevance order is preserved.
  const [userChangedSort, setUserChangedSort] = useState(() =>
    searchParams.has('sort')
  )
  const debouncedSearchQuery = useDebounce(searchQuery, 200)

  // Sync state changes to URL search params
  const syncToUrl = useCallback(
    (category: string, query: string, sort: SortKey, sortChanged: boolean) => {
      const params = new URLSearchParams()
      if (category !== 'all') params.set('category', category)
      if (query) params.set('q', query)
      if (sortChanged && sort !== 'name') params.set('sort', sort)
      const qs = params.toString()
      router.replace(qs ? `?${qs}` : '/data', { scroll: false })
    },
    [router]
  )

  useEffect(() => {
    syncToUrl(activeCategory, debouncedSearchQuery, sortBy, userChangedSort)
  }, [activeCategory, debouncedSearchQuery, sortBy, userChangedSort, syncToUrl])

  // Compute categories and last updated date from data
  const categories = useMemo(() => computeCategories(datasets), [datasets])

  const lastUpdatedDate = useMemo(() => new Date(buildDate), [buildDate])

  // Initialize Fuse search index
  const fuseInstance = useMemo(() => {
    return new Fuse(datasets, {
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
  }, [datasets])

  const filteredDatasets = useMemo(() => {
    const hasSearch = debouncedSearchQuery.trim().length > 0

    // When searching, start from Fuse.js results to preserve relevance order
    if (hasSearch) {
      const searchResults = fuseInstance.search(debouncedSearchQuery)
      let results =
        activeCategory !== 'all'
          ? searchResults
              .filter((r) => r.item.category === activeCategory)
              .map((r) => r.item)
          : searchResults.map((r) => r.item)

      // Only apply explicit sort when user has changed the sort option;
      // otherwise preserve Fuse.js relevance ranking
      if (userChangedSort) {
        results = [...results].sort(catalogueComparator(sortBy))
      }
      return results
    }

    // No search — filter by category and sort
    let results = datasets
    if (activeCategory !== 'all') {
      results = results.filter((d) => d.category === activeCategory)
    }
    results = [...results].sort(catalogueComparator(sortBy))
    return results
  }, [
    datasets,
    activeCategory,
    debouncedSearchQuery,
    sortBy,
    userChangedSort,
    fuseInstance,
  ])

  const activeLabel =
    categories.find((c) => c.id === activeCategory)?.label ?? 'All Datasets'

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to homepage"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-4 w-px bg-border" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center bg-primary"
                aria-hidden="true"
              >
                <span className="text-sm font-semibold text-primary-foreground">
                  A
                </span>
              </div>
              <span className="font-medium">DataCatalogue</span>
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                / Data Catalogue
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-primary font-mono uppercase tracking-wider hidden md:inline">
              {datasets.length} datasets
            </span>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 px-4"
            >
              <Link href="mailto:hello@example.com">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div id="main-content" className="mx-auto max-w-7xl px-6 flex">
        <CatalogueSidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8 lg:border-l lg:border-border">
          {/* Page header */}
          <div className="mb-8">
            <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
              Data Catalogue
            </p>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              {activeCategory === 'all'
                ? 'Every edge starts with better data'
                : activeLabel}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {activeCategory === 'all'
                ? `Browse ${datasets.length} alternative datasets. Satellite imagery, sentiment, SEC filings, web traffic, and more. Pay only for what you query.`
                : `Explore ${categories.find((c) => c.id === activeCategory)?.count ?? 0} datasets in ${activeLabel.toLowerCase()}.`}
            </p>
          </div>

          <MobileSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <MobileCategoryPills
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Results count */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <p className="text-xs text-muted-foreground font-mono">
              {filteredDatasets.length}{' '}
              {filteredDatasets.length === 1 ? 'dataset' : 'datasets'} found
              {searchQuery && (
                <span className="text-primary">
                  {' '}
                  for &quot;{searchQuery}&quot;
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortKey)
                  setUserChangedSort(true)
                }}
                className="text-xs font-mono bg-transparent border border-border text-foreground px-2 py-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                aria-label="Sort datasets"
              >
                <option value="name">Name</option>
                <option value="vendor">Vendor</option>
                <option value="credits">Credits</option>
                <option value="frequency">Frequency</option>
              </select>
            </div>
          </div>

          {/* Dataset grid */}
          {filteredDatasets.length > 0 ? (
            <div
              className="grid gap-4 md:grid-cols-2"
              aria-live="polite"
              aria-label="Search results"
            >
              {filteredDatasets.map((dataset) => (
                <DatasetCard key={dataset.slug} dataset={dataset} />
              ))}
            </div>
          ) : (
            <div
              className="border border-border p-12 text-center"
              aria-live="polite"
            >
              <Database className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-foreground mb-2">No datasets found</p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search query or browse a different category.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 border border-primary/30 bg-primary/5 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-primary font-mono uppercase tracking-wider mb-2">
                  Missing something?
                </p>
                <p className="text-sm text-foreground">
                  We add new datasets every week. Request custom data sourcing
                  for your fund.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-transparent h-9 text-sm gap-1.5"
                >
                  <Link href="mailto:hello@example.com">
                    Contact for API Access{' '}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm px-4"
                >
                  <Link href="mailto:hello@example.com">Request Dataset</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-8 mt-12 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              DataCatalogue Data Catalogue / {datasets.length} datasets indexed /
              Last updated{' '}
              {`${String(lastUpdatedDate.getMonth() + 1).padStart(2, '0')}.${String(lastUpdatedDate.getFullYear()).slice(-2)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
