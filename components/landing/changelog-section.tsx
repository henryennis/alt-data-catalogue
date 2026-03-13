'use client'

import { AnimateIn } from '@/components/animate-in'

const updates = [
  {
    id: '01',
    date: '2025.12.16',
    title: 'Growing Catalogue',
    description:
      'The catalogue continues to expand across alternative, fundamental, and price data.',
    highlight: true,
  },
  {
    id: '02',
    date: '2025.12.04',
    title: 'Pay-Per-Use Credits',
    description:
      'New credit-based pricing. Only pay for the data you actually consume.',
    highlight: false,
  },
  {
    id: '03',
    date: '2025.11.21',
    title: 'Satellite Imagery Feed',
    description:
      'Real-time satellite data for supply chain, agriculture, and energy analysis.',
    highlight: false,
  },
  {
    id: '04',
    date: '2025.11.13',
    title: 'Signal Decay Analytics',
    description:
      'Built-in tools to measure alpha half-life across any dataset.',
    highlight: false,
  },
] as const

export function ChangelogSection() {
  return (
    <section
      id="changelog"
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="changelog-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
              Latest Updates
            </p>
            <h2
              id="changelog-heading"
              className="text-3xl md:text-4xl font-medium text-foreground tracking-tight"
            >
              Changelog
            </h2>
          </div>
        </div>

        {/* Updates grid */}
        <AnimateIn
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          delay={100}
        >
          {updates.map((update) => (
            <article
              key={update.id}
              className="relative border border-border p-5 hover:border-muted-foreground/30 transition-colors"
              role="listitem"
            >
              <span
                className="absolute -top-2.5 right-4 text-[10px] text-muted-foreground bg-background px-1 font-mono"
                aria-label={`Update ${update.id}`}
              >
                {update.id}
              </span>
              <time
                dateTime={update.date.replace(/\./g, '-')}
                className={`inline-block text-[10px] px-2 py-1 mb-4 font-mono border ${
                  update.highlight
                    ? 'border-primary text-primary'
                    : 'border-border text-muted-foreground'
                }`}
              >
                [{update.date}]
              </time>
              <h3
                className={`text-sm font-medium mb-2 ${update.highlight ? 'text-primary' : 'text-foreground'}`}
              >
                {update.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {update.description}
              </p>
            </article>
          ))}
        </AnimateIn>
      </div>
    </section>
  )
}
