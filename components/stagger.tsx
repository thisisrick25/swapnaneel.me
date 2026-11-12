'use client'

import { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  hoverDim?: boolean
}

export function StaggerContainer({ children, className = '', hoverDim = false }: StaggerContainerProps) {
  return (
    <div className={`${className} ${hoverDim ? 'hover-dim' : ''}`}>
      {children}
    </div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  hoverDim?: boolean
}

export function StaggerItem({ children, className = '', hoverDim = false }: StaggerItemProps) {
  return (
    <div className={`${className} ${hoverDim ? 'hover-dim-item' : ''}`}>
      {children}
    </div>
  )
}
