'use client'

import Link from 'next/link'

export default function DataError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      {/* Brand mark */}
      <div className="mb-8 font-mono text-sm font-medium tracking-widest text-primary">
        DATACATALOGUE
      </div>

      {/* Error code */}
      <h1 className="mb-2 font-mono text-6xl font-bold tracking-tight">
        Error
      </h1>

      {/* Message */}
      <p className="mb-2 max-w-md text-center font-mono text-muted-foreground">
        Failed to load data. The dataset or catalogue could not be retrieved at
        this time.
      </p>

      {error.digest && (
        <p className="mb-8 font-mono text-xs text-muted-foreground/60">
          Digest: {error.digest}
        </p>
      )}

      {!error.digest && <div className="mb-8" />}

      {/* Divider */}
      <div className="mb-8 h-px w-24 border-t border-border" />

      {/* Actions */}
      <div className="flex gap-6 font-mono text-sm">
        <button
          onClick={reset}
          className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
        >
          Try Again
        </button>
        <Link
          href="/data"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Data Catalogue
        </Link>
        <Link
          href="/"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Home
        </Link>
      </div>
    </main>
  )
}
