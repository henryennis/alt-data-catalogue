'use client'

import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Shared IntersectionObserver singleton
// All AnimateIn components use threshold 0.15, so a single observer suffices.
// Each element registers a callback; once it intersects, the callback fires,
// the element is unobserved, and its entry is removed from the map.
// ---------------------------------------------------------------------------

const callbacks = new Map<Element, () => void>()
let sharedObserver: IntersectionObserver | null = null

function getObserver(threshold: number): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target)
            cb?.()
            callbacks.delete(entry.target)
            sharedObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )
  }
  return sharedObserver
}

/**
 * Hook that detects when an element enters the viewport using a shared
 * IntersectionObserver. Fires once and then unregisters.
 *
 * @param threshold - Intersection threshold (default 0.15). All callers
 *   should use the same value since we share a single observer.
 */
export function useInView(threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getObserver(threshold)
    callbacks.set(el, () => setIsInView(true))
    observer.observe(el)

    return () => {
      callbacks.delete(el)
      observer.unobserve(el)
    }
  }, [threshold])

  return { ref, isInView }
}
