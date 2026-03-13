'use client'

import { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({
  text,
  label = 'Copy to clipboard',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
      console.error('Copy failed:', err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors',
        className
      )}
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-primary" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Clipboard className="h-3 w-3" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
