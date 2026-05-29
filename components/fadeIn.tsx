'use client'

import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number // kept for backwards compatibility of props
  className?: string
}

export default function FadeIn({ children, delay, className = '' }: FadeInProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
