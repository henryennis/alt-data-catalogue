import { cn } from '@/lib/utils'
import type { DatasetDetail } from '@/lib/types'

export function LineageSection({
  lineage,
}: {
  lineage: DatasetDetail['lineage']
}) {
  return (
    <section id="lineage" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Data Lineage
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Source to Delivery Pipeline
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Every transformation from raw signal to delivered record, with latency
        at each stage.
      </p>

      <div className="border border-border">
        {lineage.map((step, i) => (
          <div
            key={step.stage}
            className={cn(
              'flex items-stretch',
              i < lineage.length - 1 ? 'border-b border-border' : ''
            )}
          >
            {/* Stage number + connector */}
            <div className="w-14 shrink-0 flex flex-col items-center py-4 border-r border-border bg-muted/10">
              <div className="w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-mono font-medium">
                {i + 1}
              </div>
              {i < lineage.length - 1 && (
                <div className="flex-1 w-px bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  {step.stage}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 shrink-0 whitespace-nowrap">
                {step.latency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
