"use client"

import { useRef, useState, ReactNode, MouseEvent } from 'react'

interface ShinyCardProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

/**
 * ShinyCard - A card component with cursor-following shine effect
 * Inspired by GitHub card styles and Animata's shiny card effect
 */
export default function ShinyCard({
  children,
  className = '',
  containerClassName = '',
}: ShinyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Shine effect - light mode (dark gradient) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 dark:opacity-0"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.25), transparent 40%)`,
        }}
      />
      {/* Shine effect - dark mode (light gradient) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 dark:opacity-(--shine-opacity)"
        style={{
          '--shine-opacity': opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.3), transparent 40%)`,
        } as React.CSSProperties}
      />

      {/* Content */}
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  )
}
