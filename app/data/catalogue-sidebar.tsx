'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Search, ArrowRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Category {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}

export interface CatalogueSidebarProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

// ---------------------------------------------------------------------------
// Desktop sidebar
// ---------------------------------------------------------------------------

export function CatalogueSidebar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: CatalogueSidebarProps) {
  return (
    <nav
      className="hidden lg:block w-60 shrink-0 py-8 pr-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
      aria-label="Dataset categories"
    >
      {/* Search */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search datasets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-3 text-sm bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-mono"
          aria-label="Search datasets"
        />
      </div>

      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-3 px-3">
        Categories
      </p>
      <ul className="space-y-0.5">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left',
                  activeCategory === cat.id
                    ? 'text-primary bg-primary/5 border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground border-l-2 border-transparent'
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {cat.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Sidebar CTA */}
      <div className="mt-8 border border-border p-4">
        <p className="text-[10px] text-primary font-mono uppercase tracking-wider mb-2">
          Custom Data
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Need a dataset not in the catalogue? We source custom alternative data
          for institutional clients.
        </p>
        <Button
          asChild
          size="sm"
          className="w-full h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <a href="mailto:hello@example.com">
            Request Dataset <ArrowRight className="h-3 w-3" />
          </a>
        </Button>
      </div>
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Mobile search
// ---------------------------------------------------------------------------

export function MobileSearch({
  searchQuery,
  onSearchChange,
}: Pick<CatalogueSidebarProps, 'searchQuery' | 'onSearchChange'>) {
  return (
    <div className="lg:hidden relative mb-6">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="Search datasets..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full h-9 pl-9 pr-3 text-sm bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors font-mono"
        aria-label="Search datasets"
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile category pills
// ---------------------------------------------------------------------------

export function MobileCategoryPills({
  categories,
  activeCategory,
  onCategoryChange,
}: Pick<
  CatalogueSidebarProps,
  'categories' | 'activeCategory' | 'onCategoryChange'
>) {
  return (
    <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-6 px-6 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            'shrink-0 text-xs font-mono px-3 py-1.5 border transition-colors',
            activeCategory === cat.id
              ? 'border-primary text-primary bg-primary/5'
              : 'border-border text-muted-foreground hover:text-foreground'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
