import { Skeleton } from '@/components/ui/skeleton'

export default function DatasetDetailLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-4 rounded-none" />
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-16 rounded-none" />
              <Skeleton className="h-3 w-3 rounded-none" />
              <Skeleton className="h-4 w-10 rounded-none" />
              <Skeleton className="h-3 w-3 rounded-none" />
              <Skeleton className="h-4 w-32 rounded-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-none" />
            <Skeleton className="h-9 w-24 rounded-none" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 flex">
        {/* Sidebar */}
        <nav className="hidden lg:block w-56 shrink-0 py-8 pr-6 sticky top-14 h-[calc(100vh-3.5rem)]">
          <Skeleton className="h-3 w-24 rounded-none mb-3 ml-3" />
          {/* Nav items */}
          <div className="space-y-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                <Skeleton className="h-3.5 w-3.5 rounded-none shrink-0" />
                <Skeleton className="h-4 w-28 rounded-none" />
              </div>
            ))}
          </div>

          {/* Dataset meta skeleton */}
          <div className="mt-8 border border-border p-4">
            <Skeleton className="h-3 w-24 rounded-none mb-2" />
            <div className="space-y-2">
              <div>
                <Skeleton className="h-2.5 w-14 rounded-none mb-1" />
                <Skeleton className="h-4 w-16 rounded-none" />
              </div>
              <div>
                <Skeleton className="h-2.5 w-18 rounded-none mb-1" />
                <Skeleton className="h-4 w-12 rounded-none" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8 lg:border-l lg:border-border">
          {/* Hero banner skeleton */}
          <div className="mb-10 border border-border overflow-hidden">
            <Skeleton className="h-48 sm:h-56 md:h-64 w-full rounded-none" />
          </div>

          {/* Page title skeleton */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-5 w-16 rounded-none" />
              <Skeleton className="h-5 w-20 rounded-none" />
            </div>
            <Skeleton className="h-9 w-72 rounded-none mb-2" />
            <Skeleton className="h-4 w-32 rounded-none mb-4" />
            <Skeleton className="h-5 w-full max-w-3xl rounded-none mb-1" />
            <Skeleton className="h-5 w-4/5 max-w-3xl rounded-none" />
            <div className="flex flex-wrap gap-1.5 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-20 rounded-none" />
              ))}
            </div>
          </div>

          {/* Overview section skeleton */}
          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-4 w-4 rounded-none" />
                <Skeleton className="h-5 w-24 rounded-none" />
              </div>
              {/* Key metrics row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border border-border p-4">
                    <Skeleton className="h-2.5 w-16 rounded-none mb-2" />
                    <Skeleton className="h-5 w-24 rounded-none" />
                  </div>
                ))}
              </div>
              {/* Content block */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-5/6 rounded-none" />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-3/4 rounded-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
