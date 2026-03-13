'use client'

import { useMemo } from 'react'
import * as runtime from 'react/jsx-runtime'
import type { ComponentType } from 'react'

// ---------------------------------------------------------------------------
// Evaluate Velite-compiled MDX code into a React component
// ---------------------------------------------------------------------------

function useMDXComponent(code: string): ComponentType<{
  components?: Record<string, ComponentType<Record<string, unknown>>>
}> {
  return useMemo(() => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
  }, [code])
}

// ---------------------------------------------------------------------------
// MDXContent -- renders compiled MDX with custom components
// ---------------------------------------------------------------------------

interface MDXContentProps {
  code: string
  components?: Record<string, ComponentType<Record<string, unknown>>>
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return (
    <div className="max-w-3xl">
      <Component components={components} />
    </div>
  )
}
