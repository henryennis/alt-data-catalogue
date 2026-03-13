import { useState, useEffect } from 'react'

/**
 * Custom hook to track which section is currently in view using IntersectionObserver.
 *
 * @param sectionIds - Array of section IDs to observe. Does not need to be
 *   referentially stable — the hook serialises the values internally so the
 *   observer is only recreated when the actual IDs change.
 * @param rootMargin - Root margin for IntersectionObserver
 * @returns The ID of the currently active (visible) section
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  rootMargin: string = '-20% 0px -60% 0px'
): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  // Serialise the IDs so the effect only re-runs when the actual values
  // change, not when a new array reference is created on every render.
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    const ids = idsKey.split(',')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin }
    )

    for (const sectionId of ids) {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [idsKey, rootMargin])

  return activeSection
}
