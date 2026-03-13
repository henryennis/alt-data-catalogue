import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-16" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
          {/* Brand */}
          <div className="flex-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4"
              aria-label="DataCatalogue Home"
            >
              <div
                className="flex h-7 w-7 items-center justify-center bg-primary"
                aria-hidden="true"
              >
                <span className="text-sm font-semibold text-primary-foreground">
                  A
                </span>
              </div>
              <span className="text-foreground font-medium">DataCatalogue</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Data discovery, simplified.
            </p>
            <nav className="flex gap-4" aria-label="Social media">
              <Link
                href="https://github.com/henryennis/alt-data-catalogue"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </div>

          {/* Links */}
          <nav aria-labelledby="footer-platform">
            <h4
              id="footer-platform"
              className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4"
            >
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/data"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Data Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@example.com"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 DataCatalogue. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Legal">
            <Link
              href="mailto:hello@example.com"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Privacy
            </Link>
            <Link
              href="mailto:hello@example.com"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
