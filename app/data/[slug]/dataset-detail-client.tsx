'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  ArrowLeft,
  FileText,
  Database,
  Code,
  BarChart3,
  CreditCard,
  ChevronRight,
  GitBranch,
  Scale,
  FlaskConical,
  Shield,
} from 'lucide-react'
import type { DatasetDetail } from '@/lib/types'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import { OverviewSection } from './sections/overview-section'
import { SchemaSection } from './sections/schema-section'
import { SLASection } from './sections/sla-section'
import { PricingSection } from './sections/pricing-section'

// ---------------------------------------------------------------------------
// Skeleton placeholder for lazy-loaded sections
// ---------------------------------------------------------------------------

function SectionSkeleton({ label }: { label: string }) {
  return (
    <section className="scroll-mt-20" aria-label={`Loading ${label}`}>
      <div className="h-4 w-32 bg-muted/30 animate-pulse mb-3" />
      <div className="h-8 w-64 bg-muted/20 animate-pulse mb-4" />
      <div className="h-4 w-96 bg-muted/10 animate-pulse mb-6" />
      <div className="h-48 bg-muted/5 animate-pulse" />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Lazy-loaded heavy below-fold sections
// ---------------------------------------------------------------------------

const CodeSection = dynamic(
  () =>
    import('./sections/code-section').then((m) => ({
      default: m.CodeSection,
    })),
  { loading: () => <SectionSkeleton label="Code Examples" /> }
)

const EmpiricalSection = dynamic(
  () =>
    import('./sections/empirical-section').then((m) => ({
      default: m.EmpiricalSection,
    })),
  { loading: () => <SectionSkeleton label="Empirical Profile" /> }
)

const LineageSection = dynamic(
  () =>
    import('./sections/lineage-section').then((m) => ({
      default: m.LineageSection,
    })),
  { loading: () => <SectionSkeleton label="Data Lineage" /> }
)

const ComplianceSection = dynamic(
  () =>
    import('./sections/compliance-section').then((m) => ({
      default: m.ComplianceSection,
    })),
  { loading: () => <SectionSkeleton label="Compliance" /> }
)

const BacktestSection = dynamic(
  () =>
    import('./sections/backtest-section').then((m) => ({
      default: m.BacktestSection,
    })),
  { loading: () => <SectionSkeleton label="Backtest Guide" /> }
)

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'schema', label: 'Data Dictionary', icon: Database },
  { id: 'code', label: 'Code Examples', icon: Code },
  { id: 'empirical', label: 'Empirical Profile', icon: BarChart3 },
  { id: 'lineage', label: 'Data Lineage', icon: GitBranch },
  { id: 'compliance', label: 'Compliance', icon: Scale },
  { id: 'backtest', label: 'Backtest Guide', icon: FlaskConical },
  { id: 'sla', label: 'SLA & Reliability', icon: Shield },
  { id: 'pricing', label: 'Pricing & Access', icon: CreditCard },
] as const

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface DatasetDetailPageProps {
  dataset: DatasetDetail
  mdxCode?: string
  /** Map of slug → display name from the catalogue */
  slugToName?: Record<string, string>
  /** Slugs that have content pages (won't 404) */
  validSlugs?: string[]
}

export default function DatasetDetailPage({
  dataset,
  mdxCode,
  slugToName = {},
  validSlugs = [],
}: DatasetDetailPageProps) {
  const validSlugSet = new Set(validSlugs)
  const sectionIds = NAV_ITEMS.map((item) => item.id)
  const activeSection = useScrollSpy(sectionIds)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/data"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to Data Catalogue"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-4 w-px bg-border" aria-hidden="true" />
            <div className="flex items-center gap-1.5 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                DataCatalogue
              </Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <Link
                href="/data"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Data
              </Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-foreground truncate max-w-48">
                {dataset.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 px-4"
            >
              <Link href="mailto:hello@example.com">Get Access</Link>
            </Button>
          </div>
        </div>
      </header>

      <div id="main-content" className="mx-auto max-w-7xl px-6 flex">
        {/* Sidebar */}
        <nav
          className="hidden lg:block w-56 shrink-0 py-8 pr-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
          aria-label="Page navigation"
        >
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-3 px-3">
            On This Page
          </p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById(item.id)
                      target?.scrollIntoView({ behavior: 'smooth' })
                      target?.setAttribute('tabindex', '-1')
                      target?.focus({ preventScroll: true })
                    }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors',
                      activeSection === item.id
                        ? 'text-primary bg-primary/5 border-l-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground border-l-2 border-transparent'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Dataset meta */}
          <div className="mt-8 border border-border p-4">
            <p className="text-[10px] text-primary font-mono uppercase tracking-wider mb-2">
              {dataset.vendor}
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  Credits
                </p>
                <p className="text-sm text-primary font-mono">
                  {dataset.creditAmount} {dataset.creditUnit}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  Frequency
                </p>
                <p className="text-sm text-foreground">{dataset.frequency}</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Main */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8 lg:border-l lg:border-border">
          {/* Dataset hero banner */}
          {(dataset.heroImage || dataset.vendorLogo) && (
            <div className="mb-10 border border-border overflow-hidden">
              {/* Hero image */}
              {dataset.heroImage && (
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-muted/20">
                  <Image
                    src={dataset.heroImage}
                    alt={`${dataset.name} representative imagery`}
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  {/* Vendor logo overlaid bottom-left */}
                  {dataset.vendorLogo && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-background border border-border overflow-hidden shrink-0 flex items-center justify-center relative">
                        <Image
                          src={dataset.vendorLogo}
                          alt={`${dataset.vendor} logo`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground/90 bg-background/60 backdrop-blur-sm px-2 py-0.5">
                        {dataset.vendor}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Vendor logo standalone if no hero */}
              {!dataset.heroImage && dataset.vendorLogo && (
                <div className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 border border-border overflow-hidden shrink-0 flex items-center justify-center relative">
                    <Image
                      src={dataset.vendorLogo}
                      alt={`${dataset.vendor} logo`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">
                      Data Provider
                    </p>
                    <p className="text-sm text-foreground">{dataset.vendor}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Page title */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-mono uppercase">
                {dataset.frequency}
              </span>
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 font-mono uppercase">
                {dataset.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-2">
              {dataset.name}
            </h1>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              by {dataset.vendor}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              {dataset.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {dataset.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            <OverviewSection dataset={dataset} mdxCode={mdxCode} />
            <div className="border-t border-border" />
            <SchemaSection fields={dataset.fields} />
            <div className="border-t border-border" />
            <CodeSection examples={dataset.codeExamples} />
            <div className="border-t border-border" />
            <EmpiricalSection empirical={dataset.empirical} />
            <div className="border-t border-border" />
            <LineageSection lineage={dataset.lineage} />
            <div className="border-t border-border" />
            <ComplianceSection
              compliance={dataset.compliance}
              versionPolicy={dataset.versionPolicy}
            />
            <div className="border-t border-border" />
            <BacktestSection backtestGuide={dataset.backtestGuide} />
            <div className="border-t border-border" />
            <SLASection sla={dataset.sla} license={dataset.license} />
            <div className="border-t border-border" />
            <PricingSection
              creditAmount={dataset.creditAmount}
              creditUnit={dataset.creditUnit}
              deliveryMethods={dataset.deliveryMethods}
            />
          </div>

          {/* Related datasets */}
          {dataset.relatedDatasets.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">
                Related Datasets
              </p>
              <div className="flex flex-wrap gap-2">
                {dataset.relatedDatasets.map((slug) => {
                  const name =
                    slugToName[slug] ??
                    slug
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')
                  const hasPage = validSlugSet.has(slug)

                  if (hasPage) {
                    return (
                      <Link
                        key={slug}
                        href={`/data/${slug}`}
                        className="text-xs font-mono text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary/5 transition-colors"
                      >
                        {name}
                      </Link>
                    )
                  }

                  return (
                    <span
                      key={slug}
                      className="text-xs font-mono text-muted-foreground border border-border px-3 py-1.5"
                    >
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
