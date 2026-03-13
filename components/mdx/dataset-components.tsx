import React from 'react'
import { cn } from '@/lib/utils'
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import type { ReactNode, ComponentType } from 'react'

// ---------------------------------------------------------------------------
// Callout -- for warnings, tips, info blocks in MDX content
// ---------------------------------------------------------------------------

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      border: 'border-primary/30',
      bg: 'bg-primary/5',
      icon: Info,
      iconColor: 'text-primary',
    },
    warning: {
      border: 'border-destructive/30',
      bg: 'bg-destructive/5',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    tip: {
      border: 'border-primary/30',
      bg: 'bg-primary/5',
      icon: CheckCircle2,
      iconColor: 'text-primary',
    },
  }
  const s = styles[type]
  const Icon = s.icon

  return (
    <div className={cn('border-l-2 p-4 my-4', s.border, s.bg)}>
      <div className="flex items-start gap-2.5">
        <Icon className={cn('h-4 w-4 mt-0.5 shrink-0', s.iconColor)} />
        <div>
          {title && (
            <p className="text-sm font-medium text-foreground mb-1">{title}</p>
          )}
          <div className="text-xs text-foreground/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DataPoint -- inline highlighted metric
// ---------------------------------------------------------------------------

interface DataPointProps {
  label: string
  value: string
}

export function DataPoint({ label, value }: DataPointProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-xs font-mono mx-0.5">
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-primary font-medium">{value}</span>
    </span>
  )
}

// ---------------------------------------------------------------------------
// FieldRef -- reference to a schema field inside prose
// ---------------------------------------------------------------------------

export function FieldRef({ children }: { children: ReactNode }) {
  return (
    <code className="text-[11px] font-mono bg-muted/40 text-primary px-1.5 py-0.5 border border-border">
      {children}
    </code>
  )
}

// ---------------------------------------------------------------------------
// UseCaseList -- structured list of use cases
// ---------------------------------------------------------------------------

export function UseCaseList({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border border-border divide-y divide-border">
      {children}
    </div>
  )
}

export function UseCase({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="p-4">
      <p className="text-sm font-medium text-foreground mb-1">{title}</p>
      <div className="text-xs text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Methodology -- for describing data processing methodology
// ---------------------------------------------------------------------------

export function Methodology({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border border-border p-4 bg-muted/10">
      <p className="text-[10px] text-primary font-mono uppercase tracking-wider mb-2">
        Methodology
      </p>
      <div className="text-xs text-foreground/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:text-xs [&>ol]:text-foreground/80 [&>ol]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:text-xs [&>ul]:text-foreground/80">
        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Default MDX overrides for standard HTML elements
// ---------------------------------------------------------------------------

export const mdxComponents: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl font-medium text-foreground tracking-tight mt-8 mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-medium text-foreground tracking-tight mt-6 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-base font-medium text-foreground tracking-tight mt-4 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-foreground/80 leading-relaxed mb-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-4 text-sm text-foreground/80 leading-relaxed mb-3 space-y-1"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-4 text-sm text-foreground/80 leading-relaxed mb-3 space-y-1"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-sm text-foreground/80" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="text-[11px] font-mono bg-muted/40 text-primary px-1 py-0.5"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="border border-border p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground/80 bg-muted/20 my-4"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-primary/30 pl-4 my-4 text-sm text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="border border-border overflow-x-auto my-4">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground p-3 border-b border-border bg-muted/30"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="p-3 text-xs text-foreground/80 border-b border-border last:border-0"
      {...props}
    >
      {children}
    </td>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),
  hr: () => <div className="border-t border-border my-6" />,
  // Custom components available in MDX
  Callout,
  DataPoint,
  FieldRef,
  UseCaseList,
  UseCase,
  Methodology,
} as Record<string, ComponentType<any>>
