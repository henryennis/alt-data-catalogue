import { Skeleton } from '@/components/ui/skeleton'

export default function CatalogueLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-4 rounded-none" />
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-7 w-7 rounded-none" />
              <Skeleton className="h-4 w-20 rounded-none" />
              <Skeleton className="h-4 w-28 rounded-none hidden sm:block" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24 rounded-none hidden md:block" />
            <Skeleton className="h-9 w-9 rounded-none" />
            <Skeleton className="h-9 w-24 rounded-none" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 flex">
        {/* Sidebar */}
        <nav className="hidden lg:block w-60 shrink-0 py-8 pr-6 sticky top-14 h-[calc(100vh-3.5rem)]">
          {/* Search skeleton */}
          <Skeleton className="h-9 w-full rounded-none mb-6" />

          <Skeleton className="h-3 w-20 rounded-none mb-3 ml-3" />
          {/* Category items */}
          <div className="space-y-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                <Skeleton className="h-3.5 w-3.5 rounded-none shrink-0" />
                <Skeleton className="h-4 flex-1 rounded-none" />
                <Skeleton className="h-3 w-5 rounded-none" />
              </div>
            ))}
          </div>

          {/* Sidebar CTA skeleton */}
          <div className="mt-8 border border-border p-4">
            <Skeleton className="h-3 w-24 rounded-none mb-2" />
            <Skeleton className="h-3 w-full rounded-none mb-1" />
            <Skeleton className="h-3 w-3/4 rounded-none mb-3" />
            <Skeleton className="h-8 w-full rounded-none" />
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8 lg:border-l lg:border-border">
          {/* Page header */}
          <div className="mb-8">
            <Skeleton className="h-3 w-28 rounded-none mb-3" />
            <Skeleton className="h-9 w-80 rounded-none mb-4" />
            <Skeleton className="h-5 w-full max-w-2xl rounded-none mb-1" />
            <Skeleton className="h-5 w-3/4 max-w-2xl rounded-none" />
          </div>

          {/* Mobile search skeleton */}
          <Skeleton className="lg:hidden h-9 w-full rounded-none mb-6" />

          {/* Mobile category pills skeleton */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-6 px-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-28 rounded-none shrink-0" />
            ))}
          </div>

          {/* Results count bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <Skeleton className="h-3 w-32 rounded-none" />
            <Skeleton className="h-6 w-28 rounded-none" />
          </div>

          {/* Dataset grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Skeleton className="h-4 w-40 rounded-none mb-1" />
                    <Skeleton className="h-3 w-24 rounded-none" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-none" />
                </div>
                <Skeleton className="h-3 w-full rounded-none mb-1" />
                <Skeleton className="h-3 w-5/6 rounded-none mb-4" />
                <div className="flex items-center gap-4">
                  <div>
                    <Skeleton className="h-2.5 w-16 rounded-none mb-1" />
                    <Skeleton className="h-3 w-20 rounded-none" />
                  </div>
                  <div>
                    <Skeleton className="h-2.5 w-12 rounded-none mb-1" />
                    <Skeleton className="h-3 w-16 rounded-none" />
                  </div>
                  <div>
                    <Skeleton className="h-2.5 w-14 rounded-none mb-1" />
                    <Skeleton className="h-3 w-10 rounded-none" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16 rounded-none" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
