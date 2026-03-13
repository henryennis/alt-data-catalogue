// Type guard functions for union types

type FeatureId = 'catalogue' | 'access' | 'pricing' | 'secure' | 'analytics'

export function isFeatureId(value: unknown): value is FeatureId {
  return (
    typeof value === 'string' &&
    ['catalogue', 'access', 'pricing', 'secure', 'analytics'].includes(value)
  )
}
