'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/animate-in'

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Announcement */}
        <AnimateIn delay={0}>
          <a
            href="#changelog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm mb-8 hover:border-muted-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="New datasets now available in the catalogue"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">
              New datasets now available
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-muted-foreground"
              aria-hidden="true"
            />
          </a>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6 text-balance">
            Data discovery,{' '}
            <span className="text-primary">simplified</span>
          </h1>
        </AnimateIn>

        {/* Subheadline */}
        <AnimateIn delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Browse and explore curated datasets with detailed profiles, schema
            documentation, and code examples.
          </p>
        </AnimateIn>

        {/* CTAs */}
        <AnimateIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base"
            >
              <Link href="/data">Explore the catalogue</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 h-12 text-base bg-transparent"
            >
              <Link href="/data/global-satellite-foot-traffic">
                View documentation
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required. Pay-per-use credits.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
