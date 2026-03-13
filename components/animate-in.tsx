'use client'

import React from 'react'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface AnimateInProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
  as?: 'div' | 'section' | 'article'
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  ...props
}: AnimateInProps) {
  const { ref, isInView } = useInView()

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
