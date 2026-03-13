import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'

// vi.hoisted ensures the variable is available when vi.mock factory runs
const mockToast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: mockToast,
}))

import { CopyButton } from '@/components/copy-button'

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call clipboard.writeText on click and show success toast', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<CopyButton text="hello world" />)
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('hello world')
      expect(mockToast.success).toHaveBeenCalledWith('Copied to clipboard')
    })
  })

  it('should show error toast when clipboard API fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    Object.assign(navigator, { clipboard: { writeText } })

    render(<CopyButton text="secret" />)
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        'Failed to copy to clipboard'
      )
    })
  })

  it('should update aria-label to "Copied" after successful copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<CopyButton text="test" />)
    const btn = screen.getByRole('button')

    expect(btn).toHaveAttribute('aria-label', 'Copy to clipboard')

    fireEvent.click(btn)

    await waitFor(() => {
      expect(btn).toHaveAttribute('aria-label', 'Copied')
    })
  })
})
