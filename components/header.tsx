'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Github, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen, closeMobileMenu])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !menuRef.current) return

    const menu = menuRef.current
    const focusableEls = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableEls.length > 0) {
      focusableEls[0].focus()
    }

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const first = focusableEls[0]
      const last = focusableEls[focusableEls.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
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

        {/* Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:text-foreground text-sm h-9 px-3"
                aria-label="Platform menu"
              >
                Platform{' '}
                <ChevronDown
                  className="h-3.5 w-3.5 opacity-50"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/data">Data Catalogue</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Research Lab (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Backtesting (Coming Soon)
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                API Access (Coming Soon)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground text-sm h-9 px-3"
          >
            <Link href="/data">Catalogue</Link>
          </Button>
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="https://github.com/henryennis/alt-data-catalogue"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="DataCatalogue on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span className="font-mono text-xs">GitHub</span>
          </Link>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm h-9 px-3"
          >
            <Link href="/data">Browse Catalogue</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 px-4"
          >
            <Link href="mailto:hello@example.com">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-border bg-background p-4"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            <Button
              asChild
              variant="ghost"
              className="justify-start text-muted-foreground"
            >
              <Link href="/data" onClick={closeMobileMenu}>
                Data Catalogue
              </Link>
            </Button>
            <div className="h-px bg-border my-2" role="separator" />
            <div className="flex items-center justify-between px-3">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/data" onClick={closeMobileMenu}>
                Browse Catalogue
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground">
              <Link href="mailto:hello@example.com" onClick={closeMobileMenu}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
