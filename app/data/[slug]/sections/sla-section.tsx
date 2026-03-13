import { Activity, Clock, Shield, FileText } from 'lucide-react'
import type { DatasetDetail } from '@/lib/types'

export function SLASection({
  sla,
  license,
}: {
  sla: DatasetDetail['sla']
  license: string
}) {
  const slaItems = [
    { label: 'Uptime Guarantee', value: sla.uptime, icon: Activity },
    { label: 'Delivery Latency', value: sla.deliveryLatency, icon: Clock },
    { label: 'Data Freshness', value: sla.freshness, icon: Clock },
    { label: 'Revision Policy', value: sla.revisionPolicy, icon: FileText },
    { label: 'Support Tier', value: sla.supportTier, icon: Shield },
  ]

  return (
    <section id="sla" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        SLA & Reliability
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Service Level Agreement
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Guaranteed service levels backed by our enterprise SLA. Penalties apply
        for breaches.
      </p>

      <div className="space-y-3 mb-8">
        {slaItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="border border-border p-4 flex items-start gap-4"
            >
              <div className="p-1.5 bg-primary/10 shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border border-border p-4">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
          License & Compliance
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">{license}</p>
      </div>
    </section>
  )
}
