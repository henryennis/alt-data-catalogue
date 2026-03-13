import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock sonner (toast library) before importing CopyButton
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

import { CopyButton } from '@/components/copy-button'

/**
 * Smoke tests for component rendering.
 * Ensures basic components render without crashing.
 */
describe('Component Smoke Tests', () => {
  it('should render a simple div', () => {
    render(<div data-testid="test-div">Test Content</div>)
    expect(screen.getByTestId('test-div')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should handle basic React elements', () => {
    const TestComponent = () => <p data-testid="test-para">Rendered</p>

    render(<TestComponent />)
    expect(screen.getByTestId('test-para')).toBeInTheDocument()
  })

  describe('CopyButton', () => {
    it('should render without crashing', () => {
      render(<CopyButton text="hello" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Copy')).toBeInTheDocument()
    })

    it('should use custom label as aria-label', () => {
      render(<CopyButton text="hello" label="Copy code" />)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Copy code'
      )
    })
  })
})
