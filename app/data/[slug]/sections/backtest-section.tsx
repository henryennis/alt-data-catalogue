import { AlertTriangle } from 'lucide-react'
import type { DatasetDetail } from '@/lib/types'
import { CopyButton } from '@/components/copy-button'

export function BacktestSection({
  backtestGuide,
}: {
  backtestGuide: DatasetDetail['backtestGuide']
}) {
  return (
    <section id="backtest" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Backtest Integration
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Strategy Integration Guide
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        How to wire this dataset into your backtesting engine, with known
        limitations and warm-up requirements.
      </p>

      {/* Engine compatibility */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Compatible Engines
        </p>
        <div className="flex flex-wrap gap-2">
          {backtestGuide.engineCompatibility.map((engine) => (
            <span
              key={engine}
              className="text-[11px] font-mono border border-border px-3 py-1.5 text-foreground"
            >
              {engine}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
            Lookback Required
          </p>
          <p className="text-sm text-foreground">
            {backtestGuide.lookbackRequired}
          </p>
        </div>
        <div className="border border-border p-4">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
            Warm-up Period
          </p>
          <p className="text-sm text-foreground">
            {backtestGuide.warmupPeriod}
          </p>
        </div>
      </div>

      {/* Sample backtest */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Sample Strategy
        </p>
        <div className="border border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-xs font-mono text-muted-foreground">
              Python / LEAN
            </span>
            <CopyButton text={backtestGuide.sampleBacktest} />
          </div>
          <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground/80 bg-muted/20">
            <code>{backtestGuide.sampleBacktest}</code>
          </pre>
        </div>
      </div>

      {/* Known limitations */}
      <div>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Known Limitations
        </p>
        <div className="border border-border divide-y divide-border">
          {backtestGuide.knownLimitations.map((limitation, i) => (
            <div key={i} className="flex items-start gap-3 p-4">
              <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/80 leading-relaxed">
                {limitation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
