import React from 'react'
import { cn } from '@/lib/utils'
import { Clock, AlertTriangle } from 'lucide-react'
import type { DatasetDetail } from '@/lib/types'
import { MDXContent } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx/dataset-components'
import { ErrorBoundary } from '@/components/error-boundary'

export function OverviewSection({
  dataset,
  mdxCode,
}: {
  dataset: DatasetDetail
  mdxCode?: string
}) {
  return (
    <section id="overview" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Overview
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        About this dataset
      </h2>
      {mdxCode ? (
        <div className="mb-8 max-w-3xl">
          <ErrorBoundary
            fallback={
              <p className="text-muted-foreground leading-relaxed">
                {dataset.longDescription}
              </p>
            }
          >
            <MDXContent code={mdxCode} components={mdxComponents} />
          </ErrorBoundary>
        </div>
      ) : (
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {dataset.longDescription}
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Frequency', value: dataset.frequency },
          { label: 'Coverage', value: dataset.coverage },
          { label: 'History', value: dataset.history },
          { label: 'Update Schedule', value: dataset.updateSchedule },
        ].map((item) => (
          <div key={item.label} className="border border-border p-4">
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <p className="text-sm text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
            Asset Classes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dataset.assetClasses.map((ac) => (
              <span
                key={ac}
                className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-mono"
              >
                {ac}
              </span>
            ))}
          </div>
        </div>
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
            Delivery Methods
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dataset.deliveryMethods.map((dm) => (
              <span
                key={dm}
                className="text-[10px] bg-muted text-foreground px-2 py-0.5 font-mono"
              >
                {dm}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-border p-4 flex items-start gap-3">
          <div
            className={cn(
              'p-1.5',
              dataset.pointInTime ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <Clock
              className={cn(
                'h-4 w-4',
                dataset.pointInTime ? 'text-primary' : 'text-muted-foreground'
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-0.5">
              Point-in-Time Correct
            </p>
            <p className="text-xs text-muted-foreground">
              {dataset.pointInTime
                ? 'This dataset preserves as-of-date values. No lookahead bias in backtests.'
                : 'This dataset may include restated values. Use caution in point-in-time research.'}
            </p>
          </div>
        </div>
        <div className="border border-border p-4 flex items-start gap-3">
          <div
            className={cn(
              'p-1.5',
              dataset.survivorshipBiasFree ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <AlertTriangle
              className={cn(
                'h-4 w-4',
                dataset.survivorshipBiasFree
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-0.5">
              Survivorship Bias Free
            </p>
            <p className="text-xs text-muted-foreground">
              {dataset.survivorshipBiasFree
                ? 'Includes delisted and defunct entities. Full historical universe preserved.'
                : 'Contains only currently active entities. Consider supplementing with delisted data.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
