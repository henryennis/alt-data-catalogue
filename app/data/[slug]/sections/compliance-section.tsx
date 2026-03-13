import { cn } from '@/lib/utils'
import type { DatasetDetail } from '@/lib/types'

export function ComplianceSection({
  compliance,
  versionPolicy,
}: {
  compliance: DatasetDetail['compliance']
  versionPolicy: DatasetDetail['versionPolicy']
}) {
  const complianceFlags = [
    {
      label: 'Redistribution',
      value: compliance.redistributionAllowed,
      trueText: 'Allowed',
      falseText: 'Not permitted',
    },
    {
      label: 'Derived Works',
      value: compliance.derivedWorksAllowed,
      trueText: 'Allowed in proprietary strategies',
      falseText: 'Not permitted',
    },
    {
      label: 'PII Present',
      value: compliance.piiPresent,
      trueText: 'Contains PII',
      falseText: 'No PII',
    },
    {
      label: 'GDPR Compliant',
      value: compliance.gdprCompliant,
      trueText: 'Fully compliant',
      falseText: 'Non-compliant',
    },
    {
      label: 'Audit Trail',
      value: compliance.auditTrail,
      trueText: 'Full audit logging available',
      falseText: 'Not available',
    },
  ]

  return (
    <section id="compliance" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Compliance & Versioning
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Regulatory & Data Governance
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Licensing rights, regulatory classification, versioning policy, and data
        governance controls.
      </p>

      {/* Compliance flags */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {complianceFlags.map((flag) => (
          <div
            key={flag.label}
            className="border border-border p-4 flex items-start gap-3"
          >
            <div
              className={cn(
                'mt-0.5 w-2 h-2 shrink-0',
                flag.label === 'PII Present'
                  ? flag.value
                    ? 'bg-destructive'
                    : 'bg-primary'
                  : flag.value
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
              )}
            />
            <div>
              <p className="text-xs font-medium text-foreground mb-0.5">
                {flag.label}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {flag.value ? flag.trueText : flag.falseText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory classification */}
      <div className="border border-border p-4 mb-8">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
          Regulatory Classification
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {compliance.regulatoryClassification}
        </p>
      </div>

      {/* Data retention */}
      <div className="border border-border p-4 mb-8">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
          Data Retention Policy
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {compliance.dataRetentionPolicy}
        </p>
      </div>

      {/* Version policy */}
      <div className="border border-border p-4">
        <p className="text-[10px] text-primary font-mono uppercase tracking-wider mb-3">
          Version Policy
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Current Version
            </p>
            <p className="text-sm font-mono text-foreground">
              {versionPolicy.currentVersion}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Release Date
            </p>
            <p className="text-sm font-mono text-foreground">
              {versionPolicy.releaseDate}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Revision Window
            </p>
            <p className="text-sm text-foreground/80">
              {versionPolicy.revisionWindow}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Historical Restated
            </p>
            <p className="text-sm font-mono text-foreground">
              {versionPolicy.historicalRestated ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-3 mt-3 space-y-3">
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Deprecation Policy
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {versionPolicy.deprecationPolicy}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Breaking Changes
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {versionPolicy.breakingChanges}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
