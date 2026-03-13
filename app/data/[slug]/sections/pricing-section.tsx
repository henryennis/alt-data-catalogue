import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DatasetDetail } from '@/lib/types'

export function PricingSection({
  creditAmount,
  creditUnit,
  deliveryMethods,
}: Pick<DatasetDetail, 'creditAmount' | 'creditUnit' | 'deliveryMethods'>) {
  return (
    <section id="pricing" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Pricing & Access
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Pay-Per-Use Credits
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        No subscriptions. No minimums. Query what you need, pay for what you
        use.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-primary/30 p-6">
          <p className="text-[10px] text-primary font-mono uppercase tracking-wider mb-2">
            Credit Cost
          </p>
          <p className="text-3xl font-medium text-foreground font-mono mb-1">
            {creditAmount}{' '}
            <span className="text-base text-muted-foreground">
              {creditUnit}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Per API query or bulk row batch
          </p>
        </div>
        <div className="border border-border p-6">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
            Volume Discount
          </p>
          <p className="text-3xl font-medium text-foreground font-mono mb-1">
            Up to 40%
          </p>
          <p className="text-xs text-muted-foreground">
            For enterprise annual commitments
          </p>
        </div>
      </div>

      <div className="border border-border p-6">
        <p className="text-sm font-medium text-foreground mb-4">
          Access Methods
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {deliveryMethods.map((method) => (
            <div key={method} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary shrink-0" />
              <span className="text-sm text-foreground/80">{method}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6 text-sm gap-2"
        >
          <a href="mailto:hello@example.com">
            Start Free Trial <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-transparent h-10 px-6 text-sm"
        >
          <a href="mailto:hello@example.com">Contact Sales</a>
        </Button>
      </div>
    </section>
  )
}
