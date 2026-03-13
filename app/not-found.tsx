import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      {/* Brand mark */}
      <div className="mb-8 font-mono text-sm font-medium tracking-widest text-primary">
        DATACATALOGUE
      </div>

      {/* Error code */}
      <h1 className="mb-2 font-mono text-6xl font-bold tracking-tight">404</h1>

      {/* Message */}
      <p className="mb-8 max-w-md text-center font-mono text-muted-foreground">
        The page you requested could not be found. It may have been moved or no
        longer exists.
      </p>

      {/* Divider */}
      <div className="mb-8 h-px w-24 border-t border-border" />

      {/* Navigation links */}
      <div className="flex gap-6 font-mono text-sm">
        <Link
          href="/"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/data"
          className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Data Catalogue
        </Link>
      </div>
    </main>
  )
}
