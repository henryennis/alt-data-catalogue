'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { DatasetDetail } from '@/lib/types'
import { CopyButton } from '@/components/copy-button'

export function CodeSection({
  examples,
}: {
  examples: DatasetDetail['codeExamples']
}) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <section id="code" className="scroll-mt-20">
      <p className="text-xs text-primary font-mono uppercase tracking-wider mb-3">
        Code Examples
      </p>
      <h2 className="text-2xl font-medium text-foreground tracking-tight mb-4">
        Quick Start
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        Get started with a few lines of code. Available in Python, C#, and SQL.
      </p>

      <div className="border border-border">
        <div className="flex items-center justify-between border-b border-border px-4">
          <div className="flex" role="tablist">
            {examples.map((ex, i) => (
              <button
                key={ex.language}
                type="button"
                role="tab"
                id={`tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${i}`}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'px-4 py-2.5 text-xs font-mono transition-colors border-b-2 -mb-px',
                  activeTab === i
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                )}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <CopyButton text={examples[activeTab].code} />
        </div>
        <pre
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground/80 bg-muted/20"
        >
          <code>{examples[activeTab].code}</code>
        </pre>
      </div>
    </section>
  )
}
