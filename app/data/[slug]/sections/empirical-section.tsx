import { cn } from '@/lib/utils'
import type { DatasetDetail } from '@/lib/types'

/** Default SLA target in minutes (4 hours). Used for freshness chart threshold. */
const DEFAULT_SLA_TARGET_MINUTES = 240

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function heatColor(completeness: number): string {
  if (completeness >= 98) return 'bg-primary'
  if (completeness >= 90) return 'bg-primary/70'
  if (completeness >= 75) return 'bg-primary/40'
  if (completeness >= 50) return 'bg-primary/20'
  if (completeness > 0) return 'bg-primary/10'
  return 'bg-muted/20'
}

export function EmpiricalSection({
  empirical,
}: {
  empirical: DatasetDetail['empirical']
}) {
  if (!empirical) return null

  // Group heatmap data by year
  const heatmapYears = [
    ...new Set((empirical.coverageHeatmap ?? []).map((c) => c.year)),
  ].sort()
  const heatmapMap = new Map(
    (empirical.coverageHeatmap ?? []).map((c) => [`${c.year}-${c.month}`, c])
  )

  // Freshness stats
  const latencies = (empirical.freshnessTimeline ?? []).map(
    (f) => f.latencyMinutes
  )
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 1
  const avgLatency =
    latencies.length > 0
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      : 0
  const slaTarget = DEFAULT_SLA_TARGET_MINUTES

  return (
    <section id="empirical" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Empirical Profile
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Data Quality & Statistics
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Measured statistics from the live dataset. Last updated{' '}
        {new Date(empirical.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        .
      </p>

      {/* Summary stats */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {[
          { label: 'Total Records', value: empirical.totalRecords },
          { label: 'Avg Daily', value: empirical.avgDailyRecords },
          { label: 'Unique Entities', value: empirical.uniqueEntities },
          { label: 'Null Rate', value: empirical.nullRate },
          { label: 'Median Age', value: empirical.medianRecordAge },
          {
            label: 'Fields',
            value: `${empirical.fieldCompleteness?.length ?? 0}`,
          },
        ].map((item) => (
          <div key={item.label} className="border border-border p-3">
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <p className="text-base font-medium text-foreground font-mono">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Field completeness bars */}
      <div className="mb-10">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Field Completeness
        </p>
        <div className="border border-border p-4">
          <div className="space-y-2.5">
            {(empirical.fieldCompleteness ?? []).map((fc) => (
              <div key={fc.field} className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-primary w-32 shrink-0 truncate">
                  {fc.field}
                </span>
                <div className="flex-1 h-2 bg-muted/30 relative overflow-hidden">
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 transition-all duration-700',
                      fc.pctFilled >= 99
                        ? 'bg-primary'
                        : fc.pctFilled >= 90
                          ? 'bg-primary/70'
                          : 'bg-primary/40'
                    )}
                    style={{ width: `${fc.pctFilled}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-muted-foreground w-12 text-right shrink-0">
                  {fc.pctFilled}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field statistics -- expanded table */}
      <div className="mb-10">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Distribution Statistics
        </p>
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  'Field',
                  'Min',
                  'Max',
                  'Mean',
                  'Median',
                  'Std',
                  'Skew',
                  'Kurt.',
                  'Null %',
                  'Distinct',
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(empirical.fieldStats ?? []).map((stat, i) => (
                <tr
                  key={stat.field}
                  className={cn(
                    'border-b border-border last:border-0',
                    i % 2 === 0 ? '' : 'bg-muted/10'
                  )}
                >
                  <td className="p-3 font-mono text-xs text-primary whitespace-nowrap">
                    {stat.field}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.min}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.max}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.mean}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.median}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.std}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.skew}
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">
                    {stat.kurtosis}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {stat.nullPct}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {stat.distinctCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coverage heatmap */}
      <div className="mb-10">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Monthly Coverage Heatmap
        </p>
        <div className="border border-border p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-1.5 w-14"
                >
                  Year
                </th>
                {MONTH_LABELS.map((m) => (
                  <th
                    key={m}
                    scope="col"
                    className="text-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-1.5"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapYears.map((year) => (
                <tr key={year}>
                  <td className="text-[11px] font-mono text-foreground p-1.5">
                    {year}
                  </td>
                  {Array.from({ length: 12 }, (_, mi) => {
                    const entry = heatmapMap.get(`${year}-${mi + 1}`)
                    const comp = entry?.completeness ?? 0
                    const records = entry?.records ?? 0
                    return (
                      <td key={mi} className="p-1">
                        <div
                          className={cn(
                            'w-full aspect-square flex items-center justify-center',
                            heatColor(comp)
                          )}
                          title={`${year}-${String(mi + 1).padStart(2, '0')}: ${comp}% complete, ${(records / 1e6).toFixed(1)}M records`}
                        >
                          <span className="text-[8px] font-mono text-foreground/60">
                            {comp > 0 ? `${comp}` : ''}
                          </span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <span className="text-[10px] font-mono text-muted-foreground">
              Completeness:
            </span>
            {[
              { label: '0%', cls: 'bg-muted/20' },
              { label: '50%', cls: 'bg-primary/20' },
              { label: '75%', cls: 'bg-primary/40' },
              { label: '90%', cls: 'bg-primary/70' },
              { label: '98%+', cls: 'bg-primary' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <div className={cn('w-3 h-3', item.cls)} />
                <span className="text-[9px] font-mono text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery freshness timeline */}
      <div className="mb-10">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Delivery Freshness (Last 18 Days)
        </p>
        <div className="border border-border p-4">
          <div className="flex items-center gap-3 mb-4 text-[10px] font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-primary" />
              <span className="text-muted-foreground">Actual latency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-px border-t border-dashed border-muted-foreground" />
              <span className="text-muted-foreground">
                SLA target ({slaTarget}min)
              </span>
            </div>
            <span className="text-muted-foreground ml-auto">
              Avg: {avgLatency}min
            </span>
          </div>
          <div className="relative h-28">
            {/* SLA line */}
            <div
              className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/40"
              style={{ bottom: `${(slaTarget / (maxLatency * 1.15)) * 100}%` }}
            />
            {/* Bars */}
            <div className="flex items-end h-full gap-1">
              {(empirical.freshnessTimeline ?? []).map((point) => {
                const pct = (point.latencyMinutes / (maxLatency * 1.15)) * 100
                const overSla = point.latencyMinutes > slaTarget
                return (
                  <div
                    key={point.date}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <div
                      className={cn(
                        'w-full transition-all duration-500',
                        overSla ? 'bg-destructive/60' : 'bg-primary/60'
                      )}
                      style={{ height: `${pct}%` }}
                      title={`${point.date}: ${point.latencyMinutes}min`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-border">
            <span className="text-[9px] font-mono text-muted-foreground">
              {empirical.freshnessTimeline?.[0]?.date.slice(5)}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              Minutes from event to delivery
            </span>
            <span className="text-[9px] font-mono text-muted-foreground">
              {empirical.freshnessTimeline?.at(-1)?.date.slice(5)}
            </span>
          </div>
        </div>
      </div>

      {/* Coverage by year -- bar chart */}
      <div className="mb-10">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Annual Coverage Trend
        </p>
        <div className="border border-border p-4">
          <div className="flex items-end gap-2 h-28">
            {(empirical.coverageByYear ?? []).map((cy) => (
              <div
                key={cy.year}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <span className="text-[9px] font-mono text-muted-foreground">
                  {cy.completeness}%
                </span>
                <div className="w-full relative" style={{ height: '80px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-primary/15"
                    style={{ height: '100%' }}
                  />
                  <div
                    className="absolute bottom-0 w-full bg-primary transition-all duration-500"
                    style={{ height: `${cy.completeness}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground">
                  {cy.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample data */}
      <div>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Sample Data (First 5 Rows)
        </p>
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {Object.keys(empirical.sampleRows?.[0] ?? {}).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="text-left text-[10px] uppercase tracking-wider text-muted-foreground p-2.5 whitespace-nowrap"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(empirical.sampleRows ?? []).map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'border-b border-border last:border-0',
                    i % 2 === 0 ? '' : 'bg-muted/10'
                  )}
                >
                  {Object.values(row).map((val, j) => (
                    <td
                      key={j}
                      className="p-2.5 text-foreground/80 whitespace-nowrap"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
