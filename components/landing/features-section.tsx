'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Database, Zap, Shield, LineChart, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimateIn } from '@/components/animate-in'

const PillarCube = dynamic(
  () =>
    import('@/components/pillar-cube').then((m) => ({ default: m.PillarCube })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-md mx-auto flex items-center justify-center">
        <div className="text-xs font-mono text-muted-foreground">
          Loading...
        </div>
      </div>
    ),
  }
)

const features = [
  {
    id: 'catalogue',
    icon: Database,
    title: 'Curated Datasets',
    bullets: [
      'Satellite imagery, sentiment, SEC filings, and more',
      'Curated from premium data vendors',
      'Point-in-time data to eliminate look-ahead bias',
    ],
  },
  {
    id: 'access',
    icon: Layers,
    title: 'Instant Cloud Access',
    bullets: [
      'Stream any dataset directly into your research',
      'Unified API across all asset classes and vendors',
      'No downloads, no infrastructure, no waiting',
    ],
  },
  {
    id: 'pricing',
    icon: Zap,
    title: 'Pay-Per-Use Credits',
    bullets: [
      'Only pay for the data you actually consume',
      'No annual contracts or minimum commitments',
      'Transparent usage metering in real-time',
    ],
  },
  {
    id: 'secure',
    icon: Shield,
    title: 'Institutional Grade',
    bullets: [
      'SOC 2 compliant infrastructure',
      'Your research and strategies remain your IP',
      'Full audit trail for compliance teams',
    ],
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: 'Built-In Analytics',
    bullets: [
      'Explore dataset coverage, quality, and history',
      'Signal decay and correlation analysis',
      'Backtest directly against any dataset',
    ],
  },
] as const

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState('catalogue')

  const activeContent = useMemo(
    () => features.find((f) => f.id === activeFeature),
    [activeFeature]
  )

  return (
    <section className="py-20 md:py-28" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <AnimateIn className="mb-16 max-w-2xl">
          <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
            Core Platform
          </p>
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4"
          >
            Every edge starts with better data
          </h2>
          <p className="text-muted-foreground text-lg">
            A growing catalogue of curated datasets. Satellite imagery,
            sentiment analysis, SEC filings, and more — all documented with
            schema, examples, and empirical profiles.
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center items-center order-2 lg:order-1">
            <PillarCube activeFeature={activeFeature} />
          </div>

          {/* Feature tabs + panel */}
          <div className="order-1 lg:order-2">
            <div
              className="space-y-2"
              role="tablist"
              aria-label="Data platform features"
            >
              {features.map((feature) => {
                const isActive = activeFeature === feature.id
                return (
                  <button
                    key={feature.id}
                    id={`tab-${feature.id}`}
                    onClick={() => setActiveFeature(feature.id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${feature.id}`}
                    className={cn(
                      'w-full text-left px-5 py-4 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-transparent border-border hover:border-muted-foreground/30'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <feature.icon
                        className={cn(
                          'h-5 w-5 mt-0.5 shrink-0',
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        )}
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-medium text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Tab panel rendered outside the tablist */}
            {activeContent && (
              <ul
                className="mt-4 px-5 space-y-2"
                role="tabpanel"
                id={`panel-${activeContent.id}`}
                aria-labelledby={`tab-${activeContent.id}`}
              >
                {activeContent.bullets.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span
                      className="text-primary text-xs mt-1"
                      aria-hidden="true"
                    >
                      &#9632;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
