import {
  SlidersHorizontal,
  TrendingUp,
  Database,
  Server,
  Lock,
  Globe,
} from 'lucide-react'
import { AnimateIn } from '@/components/animate-in'

const features = [
  {
    icon: SlidersHorizontal,
    title: 'Parameter Sweep',
    description:
      'Exhaustively explore strategy parameter space with grid search across thousands of combinations against any dataset.',
    tag: 'Optimization',
  },
  {
    icon: TrendingUp,
    title: 'Walk-Forward Analysis',
    description:
      'Validate signal robustness with rolling out-of-sample testing to prevent overfitting on alternative data.',
    tag: 'Validation',
  },
  {
    icon: Database,
    title: 'Exclusive Datasets',
    description:
      'Access premium vendor partnerships including satellite imagery, NLP sentiment, and supply chain data.',
    tag: 'Data',
  },
  {
    icon: Server,
    title: 'On-Premise Deployment',
    description:
      'Deploy the full data pipeline on your own infrastructure. Zero data leaves your perimeter.',
    tag: 'Enterprise',
  },
  {
    icon: Lock,
    title: 'Institutional Security',
    description:
      'SOC 2 compliant with encrypted storage, audit trails, and role-based access for compliance teams.',
    tag: 'Compliance',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description:
      'Datasets spanning equities, options, futures, forex, and crypto across 70+ international exchanges.',
    tag: 'Coverage',
  },
] as const

const platformStats = [
  { value: '3', label: 'Data Vendors' },
  { value: '3', label: 'Datasets' },
] as const

export function InstitutionalSection() {
  return (
    <section
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="institutional-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <AnimateIn className="mb-16 max-w-2xl">
          <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
            Enterprise Features
          </p>
          <h2
            id="institutional-heading"
            className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4"
          >
            Built for institutional teams
          </h2>
          <p className="text-muted-foreground text-lg">
            Enterprise-grade data infrastructure for teams that need
            reliable, well-documented dataset access at scale.
          </p>
        </AnimateIn>

        {/* Features grid */}
        <AnimateIn
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          delay={100}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              role="listitem"
              className="group p-6 border border-border bg-card/30 hover:border-primary/30 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <feature.icon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </AnimateIn>

        {/* Platform stats */}
        <AnimateIn className="grid grid-cols-2 gap-px bg-border border border-border max-w-md mx-auto">
          <div
            role="list"
            aria-label="Platform statistics"
            className="contents"
          >
            {platformStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background p-6 text-center"
                role="listitem"
              >
                <div className="text-2xl md:text-3xl text-primary font-medium mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
