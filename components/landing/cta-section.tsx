'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/animate-in'

export function CtaSection() {
  return (
    <section
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="cta-heading"
    >
      <AnimateIn className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
          Get Started
        </p>
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4 text-balance"
        >
          Data discovery, simplified
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed text-balance">
          Stop negotiating vendor contracts. Start querying the data you need,
          when you need it. Pay only for what you use.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base gap-2"
          >
            <Link href="/data">
              Explore the catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 h-12 text-base bg-transparent"
          >
            <a href="mailto:hello@example.com">Request a demo</a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          No credit card required. Pay-per-use credits.
        </p>
      </AnimateIn>
    </section>
  )
}
