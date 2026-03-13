'use client'

import { useInView } from '@/hooks/use-in-view'
import { AnimateIn } from '@/components/animate-in'
import { cn } from '@/lib/utils'

const benchmarks: readonly {
  name: string
  score: number
  percentage: number
  highlight?: boolean
  badge?: string
}[] = [
  { name: 'Manual Vendor Negotiation', score: 2, percentage: 8 },
  {
    name: 'DataCatalogue',
    score: 3,
    percentage: 12,
    highlight: true,
    badge: 'Growing',
  },
  { name: 'Bloomberg Terminal', score: 8, percentage: 32 },
  { name: 'Quandl / Nasdaq Data Link', score: 18, percentage: 72 },
  { name: 'Refinitiv DataScope', score: 25, percentage: 100 },
]

const stats = [
  { value: '3', label: 'Datasets' },
  { value: '3', label: 'Vendors' },
  { value: '$0.01', label: 'Per query' },
  { value: '< 50ms', label: 'Latency' },
] as const

function AnimatedBar({
  percentage,
  highlight,
  delay,
}: {
  percentage: number
  highlight?: boolean
  delay: number
}) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className="h-3 bg-muted overflow-hidden"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full transition-all ease-out',
          highlight ? 'bg-primary' : 'bg-muted-foreground/30',
          isInView ? 'duration-1000' : 'duration-0'
        )}
        style={{
          width: isInView ? `${percentage}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'bg-background p-6 text-center transition-all duration-500 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
      role="listitem"
    >
      <div className="text-2xl md:text-3xl text-primary font-medium tabular-nums mb-1">
        {value}
      </div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export function PerformanceSection() {
  return (
    <section
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="performance-heading"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <AnimateIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
                Data Coverage
              </p>
              <h2
                id="performance-heading"
                className="text-3xl md:text-4xl font-medium text-foreground tracking-tight"
              >
                Datasets accessible per platform
              </h2>
            </div>
            <div
              className="text-xs text-muted-foreground font-mono md:text-right"
              aria-label="Benchmark metadata"
            >
              <p>Metric: Coverage</p>
              <p>Status: Updated Q4 2025</p>
            </div>
          </div>
        </AnimateIn>

        {/* Benchmark bars */}
        <div
          className="space-y-5 mb-12"
          role="list"
          aria-label="Data coverage comparison"
        >
          {benchmarks.map((item, idx) => (
            <div key={item.name} role="listitem">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-mono ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {item.name}
                  </span>
                  {item.badge && (
                    <span
                      className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-mono uppercase"
                      aria-label={item.badge}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm font-mono tabular-nums ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {item.score}
                </span>
              </div>
              <AnimatedBar
                percentage={item.percentage}
                highlight={item.highlight}
                delay={idx * 150}
              />
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border"
          role="list"
          aria-label="Platform statistics"
        >
          {stats.map((stat, idx) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
