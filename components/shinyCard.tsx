"use client"

import { useRef, useState, ReactNode, MouseEvent } from 'react'

interface ShinyCardProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  as?: 'div' | 'a' | 'article'
}

/**
 * ShinyCard - A card component with cursor-following shine effect
 * Inspired by GitHub card styles and Animata's shiny card effect
 */
export default function ShinyCard({
  children,
  className = '',
  containerClassName = '',
  as: Component = 'div',
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

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Shine effect layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  )
}
